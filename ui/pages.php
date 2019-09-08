<?php

abstract class HomePageAccessingData extends CmdForGetDataPage{
    //todo: base class for all pages
    public function header()
    {
        return ui::page_headers()->home();
    }

    private $page_title = '';
    protected function set_title($new_page_title){
        $this->page_title = $new_page_title;
        return $this;
    }

    public function get_title(){
        return $this->page_title;
    }
    
    private $reader_for_current_user;
    public function readerForCurrentUser(){
        if($this->reader_for_current_user){
            return $this->reader_for_current_user;
        }
        return app::reader(array());
    }

    public function get_background_color()
    {
        return ui::colors()->bg();
        //return ui::colors()->white();
    }

    /** @param \ReaderForValuesStoredInArray $reader_for_current_user */
    protected function storeReaderForCurrentUser($reader_for_current_user)
    {
        ui::exception()->throwIfNotReader($reader_for_current_user);
        $this->reader_for_current_user = $reader_for_current_user->get_reader_for_item_1();
    }

    protected function packMoreRemoteProcedureArguments(){
        $_REQUEST[app::values()->function_names()] = join(",",
            $this->array_of_procedures()
        );
    }
    abstract protected function array_of_procedures();
    protected function unpackError($error)
    {
        $this->html = $error;
        return $error;
    }
    protected function unpackContent($reader_for_content)
    {
        $this->html = $this->getHtmlFromReaderForContent($reader_for_content);
        return parent::unpackContent($reader_for_content);
    }
    /** @param \ReaderForValuesStoredInArray $reader_for_content */
    abstract protected function getHtmlFromReaderForContent($reader_for_content);

    private $html = '';
    public function __toString()
    {
        $this->execute();
        return $this->html."";
    }
    
}
abstract class HomePageForAdminAccessingData extends HomePageAccessingData{
    public function header()
    {
        return ui::page_headers()->admin();
    }

    public function get_background_color()
    {
        return ui::colors()->admin_page_bg();
    }
    
    protected function storeReaderForCurrentUser($reader_for_current_user)
    {
        parent::storeReaderForCurrentUser($reader_for_current_user);
        
        ui::urls()->loginPage()->gotoAddressIf(
            $reader_for_current_user->count() <= 0
        );        
    }
    
}

abstract class BaseClassForAdminHomePage extends HomePageForAdminAccessingData{
    private $page_layout;
    private $left_col_layout;
    protected function pageLayout(){
        return $this->page_layout;
    }
    protected function leftColumnLayout(){
        return $this->left_col_layout;
    }
    public function __construct()
    {
        $this->page_layout = ui::page_layouts()->home_obsolete();
        $this->left_col_layout = new LayoutForTwoColumns();

        $this->left_col_layout->leftColumn()->width("20%");
        $this->left_col_layout->rightColumn()->width("80%");
    }

    protected function array_of_procedures()
    {
        return array(
            app::values()->get_categories(),
            app::values()->get_pages(),
            app::values()->get_types_of_posts()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_categories = $reader_for_content->get_reader_for_item_1();
        $reader_for_pages = $reader_for_content->get_reader_for_item_2();
        $reader_for_sections = $reader_for_content->get_reader_for_item_3();

        $this->leftColumnLayout()->leftColumn()->add_child(ui::sections()->total_content());
        

        $this->leftColumnLayout()->rightColumn()->add_child(
            $this->middle_content($reader_for_categories, $reader_for_pages, $reader_for_sections)
        );

        $this->pageLayout()->leftColumn()->add_child($this->leftColumnLayout());
        $this->pageLayout()->rightColumn()->add_child(ui::sections()->admin_navigation_box());
        return $this->pageLayout()."";
    }
    abstract protected function middle_content($reader_for_categories, $reader_for_pages, $reader_for_sections);
}
class HomePageForAdmin0 extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->item_types(),
            app::values()->product_types(),
            app::values()->work_types(),
            app::values()->facility_types(),
            app::values()->event_types(),
            app::values()->article_types(),
            app::values()->profile_types(),
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $final_layout = ui::page_layouts()->admin();
        
        $box_for_item_type = ui::select_boxes()->item_type($reader_for_content->get_reader_for_item_2());
        //$box_for_product_type = ui::select_boxes()->product_type($reader_for_content->get_reader_for_item_3());
        $box_for_work_type = ui::select_boxes()->work_type($reader_for_content->get_reader_for_item_4());
        $box_for_facility_type = ui::select_boxes()->facility_type($reader_for_content->get_reader_for_item_5());
        $box_for_event_type = ui::select_boxes()->event_type($reader_for_content->get_reader_for_item_6());
        $box_for_article_type = ui::select_boxes()->article_type($reader_for_content->get_reader_for_item_7());
        $box_for_profile_type = ui::select_boxes()->profile_type($reader_for_content->get_reader_for_item_8());


        $form_dummy = new LayoutForNColumns();
        $form_dummy->addNewColumn()->add_child(new FormForCreateProduct($reader_for_content->get_reader_for_item_3()));
        $form_dummy->addNewColumn()->add_child(new FormForCreateWork($reader_for_content->get_reader_for_item_4()));
        $form_dummy->addNewColumn()->add_child(new FormForCreateFacility($reader_for_content->get_reader_for_item_5()));
        $form_dummy->addNewColumn()->add_child(new FormForCreateEvent($reader_for_content->get_reader_for_item_6()));
        $form_dummy->addNewColumn()->add_child(new FormForCreateArticle($reader_for_content->get_reader_for_item_7()));
        $form_dummy->addNewColumn()->add_child(new FormForCreateProfile($reader_for_content->get_reader_for_item_8()));

        return $form_dummy;

        //TODO: place to create a new post
        return ui::forms()->start_new_post(new ReaderForValuesStoredInArray(array()))."";
        
        //place to view created posts as stream
        
        //$final_layout->leftColumn()->add_child("form for start new post");
        //ui::forms()->start_new_post()
        //$final_layout->leftColumn()->add_child($this->linksToAddOtherObjects()->margin_bottom("1.0em"));
        //$final_layout->rightColumn()->add_child("RIGHT content e.g. statistics");
        
        return $final_layout;
    }

    protected function linksToAddOtherObjects()
    {
        return new GlobalNavigationForAdmin();
    }

}


class HomePageForAdmin extends HomePageForAdminViewPostsPublished{
    /*protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_posts()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        ui::urls()->adminViewPostsPublished()->gotoAddress();
        return "admin page";
    }*/
}

class HomePageForSuperAdmin extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->super_admin_get_days_with_posts(),
            //app::values()->super_admin_get_users_with_posts()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        //return new ListOfAdminPublishedItems($reader_for_content->get_reader_for_item_2());

        $reader_for_days_with_posts = $reader_for_content->get_reader_for_item_2();
        $html_days_with_posts = "";
        foreach ($reader_for_days_with_posts->get_array() as $arr_item_info){
            $item_reader = app::reader($arr_item_info);
            $html_days_with_posts .= ui::urls()->super_admin()->toLink($item_reader->date_in_full())->display_block()->border_bottom(ui::borders()->panel())->padding("1.0em");
        }
        //-------
        $reader_for_users_with_posts = $reader_for_content->get_reader_for_item_3();
        $html_users_with_posts = "";
        foreach ($reader_for_days_with_posts->get_array() as $arr_item_info){
            $item_reader = app::reader($arr_item_info);
            $html_users_with_posts .= ui::urls()->super_admin()->toLink(
                $item_reader->author_name()
            )->display_block()->border_bottom(ui::borders()->panel())->padding("1.0em");
        }


        //------
        return
            ui::html()->div(
                ui::html()->heading3("Select day")
                .
                ui::html()->div(
                    $html_days_with_posts
                )
            )->background_color("#fff")->border(ui::borders()->panel())->padding("1.0em")
            .
            ui::html()->div(
                ui::html()->heading3("Select Person")
                .
                ui::html()->div(
                    $html_days_with_posts
                )
            )->background_color("#fff")->border(ui::borders()->panel())->padding("1.0em");
            ;


    }
}

class HomePageForSuperAdminDailyPerformance extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->super_admin_get_days_with_posts(),
            //app::values()->super_admin_get_users_with_posts()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {


        $reader_for_days_with_posts = $reader_for_content->get_reader_for_item_2();
        $html_days_with_posts = "";
        foreach ($reader_for_days_with_posts->get_array() as $arr_item_info){
            $item_reader = app::reader($arr_item_info);
            $checkbox = new CustomCheckBox($item_reader->date_in_full(),$item_reader->date_in_full(),app::values()->csv_selected_days());
            
            $html_days_with_posts .= 
                $checkbox 
                . 
                ui::html()->make_footer(
                    ui::builders()->selected_days_toolbar()->addShowPosts()->getHtml()
                    ,
                    $checkbox->get_checkbox_toolbar_id()
                )
            

            ;
        }

        //------
        return ui::page_html()->admin_switcher(
            ui::page_tabs()->tab_wrapper("ROMEO - DAILY PERFORMANCE")
            ,
            ui::html()->div(
                ui::html()->notification_header("SELECT DAYS OF YOUR INTEREST")
                .
                ui::html()->div(
                    $html_days_with_posts
                )
            )->background_color("#fff")->border(ui::borders()->panel())->padding("1.0em")
            ,
            new ListOfSuperAdminMenuItems()
        );






    }
}

class HomePageForAdminProducts extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->product_types(),
            app::values()->products()


        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        //=================

        return ui::page_html()->admin_items(
            $reader_for_posts,            
            ui::page_tabs()->admin_items("PRODUCTS",app::browser_fields()->product_type_code()->value()),
            new WidgetForAdvertiseProduct(
                $reader_for_sub_types,
                ui::html()->span()->width("33%")->display_inline_block(),
                app::browser_fields()->product_type_code()->value()
            )
        );

    }

}

class HomePageForAdminFacilities extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->facility_types(),
            app::values()->facilities()


        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        //=================
        return ui::page_html()->admin_items(
            $reader_for_posts,            
            ui::page_tabs()->admin_items("FACILITIES",app::browser_fields()->facility_type_code()->value()),
            new WidgetForAdvertiseFacility(
                $reader_for_sub_types,
                ui::html()->span()->width("33%")->display_inline_block(),
                app::browser_fields()->facility_type_code()->value()
            )
        );

    }

}

class HomePageForAdminWork extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->work_types(),
            app::values()->work()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        //=================
        return ui::page_html()->admin_items(
            $reader_for_posts,            
            ui::page_tabs()->admin_items("WORK",app::browser_fields()->work_type_code()->value()),
            new WidgetForAdvertiseWork(
                $reader_for_sub_types,
                ui::html()->span()->width("33%")->display_inline_block(),
                app::browser_fields()->work_type_code()->value()
            )
        );

    }

}

class HomePageForAdminProfiles extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->profile_types(),
            app::values()->profiles()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        //=================
        return ui::page_html()->admin_items(
            $reader_for_posts,            
            ui::page_tabs()->admin_items("SERVICE PROVIDERS",app::browser_fields()->profile_type_code()->value()),
            new WidgetForAdvertiseServiceProvider(
                $reader_for_sub_types,
                ui::html()->span()->width("33%")->display_inline_block(),
                app::browser_fields()->profile_type_code()->value()
            )
        );

    }

}

class HomePageForAdminPhotos extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->event_types(),
            app::values()->events()

        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        //=================
        return ui::page_html()->admin_items(
            $reader_for_posts,            
            ui::page_tabs()->admin_items("PHOTOS",app::browser_fields()->event_type_code()->value()),
            new WidgetForShareWeddingPhotos(
                $reader_for_sub_types,
                ui::html()->span()->width("33%")->display_inline_block(),
                app::browser_fields()->event_type_code()->value()
            )
        );

    }
    
}

class HomePageForAdminTips extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->article_types(),
            app::values()->articles()

        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        //=================
        return ui::page_html()->admin_items(
            $reader_for_posts,            
            ui::page_tabs()->admin_items("ARTICLES",app::browser_fields()->article_type_code()->value()),
            new WidgetForShareWeddingTips(
                $reader_for_sub_types,
                ui::html()->span()->width("33%")->display_inline_block(),
                app::browser_fields()->article_type_code()->value()
            )
        );

    }

}

class HomePageForAdminStatusUpdates extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->status_types(),
            app::values()->status_updates()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        //=================
        return ui::page_html()->admin_items(
            $reader_for_posts,            
            ui::page_tabs()->admin_items("STATUS",app::browser_fields()->status_type_code()->value()),
            new WidgetForShareStatusUpdates(
                $reader_for_sub_types,
                ui::html()->span()->width("33%")->display_inline_block(),
                app::browser_fields()->status_type_code()->value()
            )
        );

    }

}

abstract class HomePageForAdminSection extends HomePageForAdminAccessingData{
    
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_types_of_posts(),
            app::values()->get_cars(),
            app::values()->get_posts_for_car_exporters(),

            app::values()->admin_get_stats_per_section(),
            app::values()->admin_get_stats_per_year(),
            app::values()->admin_get_stats_per_month(),
            app::values()->admin_get_stats_per_week(),
            app::values()->admin_get_stats_per_day()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $this->reader_for_sections = $reader_for_content->get_reader_for_item_2();
        $this->reader_for_cars = $reader_for_content->get_reader_for_item_3();
        $this->reader_for_car_exporters = $reader_for_content->get_reader_for_item_4();

        $reader_for_stats_per_section = $reader_for_content->get_reader_for_item_5();
        $reader_for_stats_per_year = $reader_for_content->get_reader_for_item_6();
        $reader_for_stats_per_month = $reader_for_content->get_reader_for_item_7();
        $reader_for_stats_per_week = $reader_for_content->get_reader_for_item_8();
        $reader_for_stats_per_day = $reader_for_content->get_reader_for_item_9();

        $final_layout = ui::page_layouts()->admin();
        $final_layout->leftColumn()->add_child(
            $this->form_for_add_post()
        );
        $final_layout->leftColumn()->add_child($this->navigationBelowForm());
        $final_layout->rightColumn()->add_child(
            $this->stats(
                $reader_for_stats_per_year, $reader_for_stats_per_month,
                $reader_for_stats_per_week, $reader_for_stats_per_day,
                $reader_for_stats_per_section
            )
        );
        return $final_layout;
    }

    private function stats($reader_for_stats_per_year, $reader_for_stats_per_month, $reader_for_stats_per_week, $reader_for_stats_per_day, $reader_for_stats_per_section)
    {
        $layout_daily_stats = new LayoutForNRows();
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_year($reader_for_stats_per_year));
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_month($reader_for_stats_per_month));
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_week($reader_for_stats_per_week));
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_day($reader_for_stats_per_day));
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_section($reader_for_stats_per_section));
        return $layout_daily_stats;
    }

    abstract protected function form_for_add_post();

    private function navigationBelowForm()
    {
        return new GlobalNavigationForAdmin();
    }

}


class HomePageForCreateAccount extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "CREATE YOUR ACCOUNT","",ui::forms()->create_account(),""
        );

    }
}

class HomePageForLogin extends HomePageAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        ui::urls()->home()->gotoAddress();
        return new LayoutForDepartment(
            "LOGIN","",ui::forms()->login(),""
        );
    }
}

class HomePageForAdminViewDraftPosts extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_posts(),
            app::values()->get_posts(),
            app::values()->item_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_draft_posts = $reader_for_content->get_reader_for_item_2();
        $reader_for_posts = $reader_for_content->get_reader_for_item_3();
        $reader_for_item_types = $reader_for_content->get_reader_for_item_4();

        $right_content = new LayoutForNRows();
        $right_content->addNewRow()->add_child(ui::html()->heading2()->add_child(ui::text_with_contrast_colors("RECENTLY","PUBLISHED")));
       
        return ui::page_html()->admin_switcher(
            ui::page_tabs()->admin_drafts(),

            ui::html()->notice_header(
                ui::html()->span_auto("Switch views:&nbsp;")
                .
                ui::urls()->adminViewPosts()->toLink("Manage")
                .
                "&nbsp;|&nbsp;"
                .
                ui::urls()->adminPreviewDraftPosts()->toLink("Preview")
            )->margin_bottom("1.0em")
            .
            $this->render_the_posts($reader_for_draft_posts),
            new CollectionOfChapVerticalTabs(ui::readers()->admin_tabs(),1,"",ui::html()->div())
        );

    }

    protected function render_the_posts($reader_for_draft_posts)
    {
        return new ListOfAdminDraftItems($reader_for_draft_posts);
    }
}
class HomePageForAdminPreviewDraftPosts extends HomePageForAdminViewDraftPosts{
    protected function render_the_posts($reader_for_draft_posts)
    {
        return ui::lists()->stream_on_landing_page($reader_for_draft_posts);
    }
}

class HomePageForAdminViewPostsPublished extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            $this->cmd_for_get_posts()
            
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        //return "hello world";
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();

        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_posts = $reader_for_content->get_reader_for_item_2();

        return ui::page_html()->admin_switcher(

            ui::page_tabs()->tab_wrapper($this->getPageTabContent()),
            new ListOfAdminPublishedItems($reader_for_posts)
        .
            ui::html()->div(
                //navigation
            //todo: put them in a list, consider putting them in the fixed header. Add optional search query
                ui::html()->paginator("Next",ui::urls()->adminViewPostsPublished(),1)
                .
                ui::html()->paginator("Back",ui::urls()->adminViewPostsPublished(),-1)
                .
                ui::html()->paginator("Refresh",ui::urls()->adminViewPostsPublished(),0)
            )

            ,
            $this->get_main_2()

        );
    }

    protected function cmd_for_get_posts()
    {
        return app::values()->get_posts_by_current_user();
    }

    protected function get_main_2()
    {
        return new CollectionOfChapVerticalTabs(ui::readers()->admin_tabs(), 1, "", ui::html()->div()->background_color("#fff"))
        .
        ui::html()->div(
            ui::urls()->super_admin()->toLink("SUPER ADMIN")
        )->background_color("#fff")->border(ui::borders()->panel());
    }

    protected function getPageTabContent()
    {
        return "PUBLISHED";
    }
}

class HomePageForSuperAdminPostsPublishedOnSelectedDays extends HomePageForAdminViewPostsPublished{
    protected function cmd_for_get_posts()
    {
        return app::values()->super_admin_get_posts_published_on_selected_days();
    }
    protected function get_main_2()
    {
        return new ListOfSuperAdminMenuItems();
    }
    protected function getPageTabContent()
    {
        return "DAILY PERFORMANCE / POSTS PUBLISHED";
    }
}

class HomePageForAdminStatistics extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->admin_get_stats_per_section(),
            app::values()->admin_get_stats_per_year(),
            app::values()->admin_get_stats_per_month(),
            app::values()->admin_get_stats_per_week(),
            app::values()->admin_get_stats_per_day()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_stats_per_section = $reader_for_content->get_reader_for_item_2();
        $reader_for_stats_per_year = $reader_for_content->get_reader_for_item_3();
        $reader_for_stats_per_month = $reader_for_content->get_reader_for_item_4();
        $reader_for_stats_per_week = $reader_for_content->get_reader_for_item_5();
        $reader_for_stats_per_day = $reader_for_content->get_reader_for_item_6();
        

        //load any saved data
        $layout = new LayoutForNRows();

        $layout->addNewRow()->add_child(ui::lists()->stats_per_section($reader_for_stats_per_section));
        $layout->addNewRow()->add_child(ui::lists()->stats_per_week($reader_for_stats_per_week));

        $layout_daily_stats = new LayoutForNRows();
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_year($reader_for_stats_per_year));
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_month($reader_for_stats_per_month));
        $layout_daily_stats->addNewRow()->add_child(ui::lists()->stats_per_day($reader_for_stats_per_day));
        

        $final_layout = ui::page_layouts()->admin();
        $final_layout->leftColumn()->add_child($layout);

        $final_layout->rightColumn()->add_child($layout_daily_stats);

        //$final_layout->rightColumn()->add_child(ui::html()->heading3()->add_child("RECENTLY PUBLISHED"));
        
        return $final_layout;
    }
}


class PageForAdminAddImages extends BaseClassForAdminHomePage{
    protected function middle_content($reader_for_categories, $reader_for_pages, $reader_for_sections)
    {
        return ui::forms()->add_picture();
    }
}


class HomePageForAdminEditPost0 extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_post(),
            app::values()->work_types(),
            app::values()->item_types(),
            
            app::values()->product_types(),
            app::values()->facility_types(),
            app::values()->work_types(),
            app::values()->event_types(),
            app::values()->profile_types(),
            app::values()->article_types()
            
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        //ui::urls()->home()->gotoAddress();


        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);


        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        /** @var ReaderForValuesStoredInArray $reader_for_post */
        $reader_for_post = $reader_for_post->get_reader_for_item_1();
        $reader_for_work_types = $reader_for_content->get_reader_for_item_3();
        $reader_for_item_types = $reader_for_content->get_reader_for_item_4();

        $reader_for_product_types = $reader_for_content->get_reader_for_item_5();
        $reader_for_facility_types = $reader_for_content->get_reader_for_item_6();
        $reader_for_work_types = $reader_for_content->get_reader_for_item_7();
        $reader_for_event_types = $reader_for_content->get_reader_for_item_8();
        $reader_for_profile_types = $reader_for_content->get_reader_for_item_9();
        $reader_for_article_types = $reader_for_content->get_reader_for_item_10();
        //================= THE NEW CODE
        $type_specific_data = ui::html()->div();
        switch ($reader_for_post->item_type_code()){
            default:
                $type_specific_data->add_child(ui::forms()->add_photo_credits($reader_for_post,$reader_for_work_types));
                break;
            case app::item_type_codes()->product():
                $type_specific_data->add_child(new FormForEditProductType($reader_for_product_types));
                break;
            case app::item_type_codes()->facility():
                $type_specific_data->add_child(new FormForEditFacilityType($reader_for_facility_types));
                break;
            case app::item_type_codes()->work():
                $type_specific_data->add_child(new FormForEditWorkType($reader_for_work_types));
                break;
            case app::item_type_codes()->event():
                $type_specific_data->add_child(new FormForEditEventType($reader_for_event_types));
                break;
            case app::item_type_codes()->profile():
                $type_specific_data->add_child(new FormForEditProfileType($reader_for_profile_types));
                break;
            case app::item_type_codes()->article():
                $type_specific_data->add_child(new FormForEditArticleType($reader_for_article_types));
                break;
        }
        
        //return $type_specific_data;



        //====== THE OLD CODE
        $editing_iframe = ui::html()->iframe();
        $editing_iframe->set_src(
            ui::urls()->adminEditPostPreview($reader_for_post->file_name())->add_is_iframe()
        )->
        set_attribute("name","my_iframe")->
        set_attribute("onload","javascript:hide_load_indicator(); this.style.display = 'block';")->
        background_color_inherit();

        //the urls

        $my_layout = new LayoutForNColumns();
        $my_layout->addNewColumn()->add_child(
            $this->header_tool_bar($reader_for_post)
        )->border_bottom("5px solid #888");

        $my_layout->addNewColumn()->add_child(
            ui::urls()->asset("busy-indicator-blue.gif")->toImage()->width("32px")->vertical_align_middle().
            ui::html()->span()->add_child("&nbsp;Loading.. Please Wait..")->width_auto()->vertical_align_middle()
        )->set_id('load_indicator')->background_color("#ffc")->text_align_center();

        $my_layout->addNewColumn()->add_child(ui::html()->div()->add_child(
            ui::html()->div()->add_child(
                $editing_iframe->width("100%")->height("120%")
            )->padding("0.0em 0.0em")/*->height("65%")*/
        )->width("100%")
        );

        $my_layout->background_color("#fff")->max_width("960px")->margin_auto();


        $my_layout->border(ui::borders()->panel());

        //return new PhotoCreditsEditor($reader_for_post,$reader_for_work_types) . $my_layout;

        return new LayoutForDepartment(
            sprintf('%s',$reader_for_post->title()),
            ui::html()->panel_header("NEW PAGE").
            new ListOfItemTypes($reader_for_item_types),
            $my_layout,
            $type_specific_data
        );

    }

    private function header_tool_bar($reader_for_post)
    {
        $toolbar = ui::html()->div()->add_child(
        //change title
            ui::html()->span()->add_child(
                ui::urls()->adminEditPostTitle($reader_for_post->file_name())->
                toLinkTargetingIframe('Title')
            )->width_auto()->padding_right("0.5em")->border_right("1px dashed #ddd")->margin_right("0.5em") .


            ui::html()->span()->add_child(
                ui::urls()->adminEditPostImage($reader_for_post->file_name())->
                toLinkTargetingIframe('Pic')
            )->add_class(ui::css_classes()->link_targeting_iframe_in_edit_post()) .


            ui::html()->span()->add_child(
                ui::urls()->adminEditPostContent($reader_for_post->file_name())->
                toLinkTargetingIframe('Intro')
            )->add_class(ui::css_classes()->link_targeting_iframe_in_edit_post()) .

            ui::html()->span()->add_child(
                ui::urls()->adminEditExtendedPostContent($reader_for_post->file_name())->
                toLinkTargetingIframe('Details')
            )->add_class(ui::css_classes()->link_targeting_iframe_in_edit_post()) .

            ui::html()->span()->add_child(
                ui::urls()->adminEditPostPreview($reader_for_post->file_name())->
                toLinkTargetingIframe('Preview')
            )->add_class(ui::css_classes()->link_targeting_iframe_in_edit_post()) .

            ui::html()->span()->add_child(
                ui::forms()->publish_post($reader_for_post->file_name())
            )->width_auto()->padding_right("0.5em")->border_right("1px dashed #ddd")->margin_right("0.5em") .
            ui::html()->span()->add_child(
                ui::forms()->delete_post($reader_for_post->file_name())
            )->width_auto()
        )->padding("0px 1.0em")->text_align_right();

        return ui::html()->panel_header($toolbar);
    }
}

class HomePageForAdminEditPost extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {        
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_post(),
            app::values()->work_types(),
            app::values()->item_types(),

            app::values()->product_types(),
            app::values()->facility_types(),
            app::values()->work_types(),
            app::values()->event_types(),
            app::values()->profile_types(),
            app::values()->article_types()

        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        /** @var ReaderForValuesStoredInArray $reader_for_post */
        $reader_for_post = $reader_for_post->get_reader_for_item_1();

        $reader_for_work_types = $reader_for_content->get_reader_for_item_3();
        $reader_for_item_types = $reader_for_content->get_reader_for_item_4();

        $reader_for_product_types = $reader_for_content->get_reader_for_item_5();
        $reader_for_facility_types = $reader_for_content->get_reader_for_item_6();
        $reader_for_work_types = $reader_for_content->get_reader_for_item_7();
        $reader_for_event_types = $reader_for_content->get_reader_for_item_8();
        $reader_for_profile_types = $reader_for_content->get_reader_for_item_9();
        $reader_for_article_types = $reader_for_content->get_reader_for_item_10();
        //================= THE NEW CODE

        $post_content = $reader_for_post->content() ? $reader_for_post->content() : "<br/>No content yet. Tap here to edit";
        $image_alt = $reader_for_post->title() ? $reader_for_post->title() : "NO IMAGE YET. Will display here once you upload one";


        return ui::page_html()->admin_switcher(
            ui::page_tabs()->tab_wrapper("EDITING POST..")
            ,

            ui::html()->div(
                ui::html()->notification_header("Tap the section you want to edit")
            )->margin_bottom("0.5em")
            .
            ui::html()->div(
                ui::html()->heading3($reader_for_post->title())
                    ->cursor_pointer()
                    ->set_attribute(
                        'onClickSetValue',
                        ui::chap_sap()->attribute_params($reader_for_post->title(),"input[name=title]")
                    )
                    ->set_attribute("onClickSetEffects",ui::chap_sap()->showFooter(ui::class_selector()->js_edit_title_dialog()))
                    //->set_attribute("onMouseEnterSetHtml","Click to edit title:.chap_search_bar_toggle_item")
                    //->set_attribute("onMouseLeaveSetHtml","Editing post..:.chap_search_bar_toggle_item")
                .
                ui::html()->div(
                    ui::urls()->view_image($reader_for_post->picture_file_name())->toImage()->set_alt($image_alt)
                        ->cursor_pointer()
                        ->set_attribute("onClickSetEffects",ui::chap_sap()->showFooter(ui::class_selector()->js_edit_picture_dialog()))
                )
                .
                ui::html()->long_text($post_content)
                    ->cursor_pointer()
                    ->set_attribute("onClickSetEffects",ui::chap_sap()->showFooter(ui::class_selector()->js_edit_content_dialog()))
                    ->set_attribute("onClickSetHtml",ui::chap_sap()->set_html($reader_for_post->content(),"textarea[name=content]"))
                /*.
                ui::html()->div("details")
                    ->cursor_pointer()
                    ->set_attribute("onClickSetEffects",ui::chap_sap()->showFooter(ui::class_selector()->js_edit_extended_post_content_dialog()))
                */

            )->font_variant("initial")->background_color("white")->padding("0.5em 1.5em")->line_height("1.8em")->border(ui::borders()->panel())->border_radius("0.5em")
            ,
            new CollectionOfChapVerticalTabs(ui::readers()->admin_tabs(),1,"",ui::html()->div()->background_color("#fff"))
        );


    }


}


class HomePageForAdminEditPostPreview extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_post(),
            app::values()->get_extended_post_tokens(),
            app::values()->get_photo_credits_for_post()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        $reader_for_post = $reader_for_post->get_reader_for_item_1();
        $reader_for_extended_post_tokens = $reader_for_content->get_reader_for_item_3();
        $reader_for_photo_credits = $reader_for_content->get_reader_for_item_4();


        $preview = ui::html()->div()->add_child(
            ui::sections()->article_details_in_preview_mode($reader_for_post,$reader_for_photo_credits).
            ui::sections()->extended_post_tokens($reader_for_extended_post_tokens)
        );
        app::exit_if_frame($preview);
        return $preview;
    }
}


class HomePageForAdminEditPostTitle extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_post()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {        

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        $reader_for_post = $reader_for_post->get_reader_for_item_1();

        $form = ui::forms()->edit_post_title($reader_for_post);
        app::exit_if_frame($form);
        return ui::html()->div()->add_child($form)->max_width("960px")->margin_auto();
    }
}

class HomePageForAdminEditPostPhoto extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_post()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        $reader_for_post = $reader_for_post->get_reader_for_item_1();

        $form = ui::forms()->edit_post_picture($reader_for_post);
        app::exit_if_frame($form);

        return ui::html()->div()->add_child($form)->max_width("960px")->margin_auto();
    }
}

class HomePageForAdminEditPostContent extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_post()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        $reader_for_post = $reader_for_post->get_reader_for_item_1();

        $form = ui::forms()->edit_post_content($reader_for_post);
        app::exit_if_frame($form);

        return ui::html()->div()->add_child($form)->max_width("960px")->margin_auto();
    }
}

class HomePageForAdminEditExtendedPostContent extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_extended_post_content()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        $reader_for_post = $reader_for_post->get_reader_for_item_1();

        $form = ui::forms()->edit_extended_post_content($reader_for_post);
        app::exit_if_frame($form);

        return ui::html()->div()->add_child($form)->max_width("960px")->margin_auto();
    }
}
class HomePageForAdminEditPostPicture extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_draft_post()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_post = $reader_for_content->get_reader_for_item_2();
        $reader_for_post = $reader_for_post->get_reader_for_item_1();

        $final_layout = ui::page_layouts()->admin_edit_post();
        $final_layout->add_child(
        ui::html()->div()->add_child(
            ui::forms()->edit_post_picture($reader_for_post)
        )->max_width("960px")->margin_auto()
        );
        return $final_layout;
    }
}

class HomePageForAddProduct extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->product_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $selector = new ListOfProductTypeToCreate($reader_for_types);        
        return new LayoutForDepartment(
            "CREATE PAGE FOR",
            "Allows you create a page for your product. Each Item should have its own page",
            $selector,""
        );
    }
}
class HomePageForAddProductOfType extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->product_type()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
               
        return new LayoutForDepartment(
            sprintf("CREATE PAGE FOR %s",$reader_for_type->product_type_as_single()),
            "",
            $form = new FormForCreateProduct($reader_for_type),
            ""
        );
    }
}

class HomePageForAddFacility extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->facility_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $selector = new ListOfFacilityTypeToCreate($reader_for_types);
        return new LayoutForDepartment(
            "CREATE PAGE FOR",
            "",
            $selector,""
        );
    }
}

class HomePageForAddFacilityOfType extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->facility_type()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();

        return new LayoutForDepartment(
            sprintf("CREATE PAGE FOR %s",$reader_for_type->facility_type_as_single()),
            "",
            $form = new FormForCreateFacility($reader_for_type),
            ""
        );
    }
}


class HomePageForAddWork extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->work_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $selector = new ListOfWorkTypeToCreate($reader_for_types);
        return new LayoutForDepartment(
            "CREATE PAGE FOR WORK TYPE",
            "",
            $selector,""
        );
    }
}

class HomePageForAddWorkOfType extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->work_type()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();

        return new LayoutForDepartment(
            sprintf("CREATE PAGE FOR %s",$reader_for_type->work_type_as_single()),
            "",
            $form = new FormForCreateWork($reader_for_type),
            ""
        );
    }
}
class HomePageForAdminAddPost extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->item_types(),
            app::values()->product_types(),
            app::values()->facility_types(),
            app::values()->work_types(),
            app::values()->article_types(),
            app::values()->profile_types(),
            app::values()->event_types(),
            app::values()->status_types()

        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();
        $this->storeReaderForCurrentUser($reader_for_current_user);
        $reader_for_sub_types = $reader_for_content->get_reader_for_item_2();

        $item_type_code_to_create = ui::browser_fields()->item_type_code();
        if(strlen(trim($item_type_code_to_create)) < 1){
            ui::urls()->adminAddProduct()->gotoAddress();
        }

        $item_types_to_create =
            $item_type_code_to_create == app::item_type_codes()->product() ?
                new ListOfProductTypeToCreate($reader_for_content->get_reader_for_item_3())
                :
                ($item_type_code_to_create == app::item_type_codes()->facility() ?
                    new ListOfFacilityTypeToCreate($reader_for_content->get_reader_for_item_4())
                    :
                    ($item_type_code_to_create == app::item_type_codes()->work() ?
                        new ListOfWorkTypeToCreate($reader_for_content->get_reader_for_item_5())
                        :
                        ($item_type_code_to_create == app::item_type_codes()->article() ?
                            new ListOfArticleTypeToCreate($reader_for_content->get_reader_for_item_6())
                            :
                            ($item_type_code_to_create == app::item_type_codes()->profile() ?
                                new ListOfProfileTypeToCreate($reader_for_content->get_reader_for_item_7())
                                :
                                ($item_type_code_to_create == app::item_type_codes()->event() ?
                                    new ListOfEventTypeToCreate($reader_for_content->get_reader_for_item_8())
                                    :
                                    ($item_type_code_to_create == app::item_type_codes()->status_update() ?
                                        new ListOfStatusTypeToCreate($reader_for_content->get_reader_for_item_9())
                                        :
                                        ui::html()->heading1()->add_child( "CHOOSE THE TYPE OF CONTENT YOU WANT TO UPLOAD <br/> BY TAPPING THE BUTTON AT THE BOTTOM RIGHT")->font_size("1.5em")
                                    )
                                )
                            )
                        )
                    )
                );
        // new ListOfArticleTypeToCreate($reader_for_content->get_reader_for_item_3());

        //=================
        return ui::page_html()->admin_switcher(
            ui::page_tabs()->admin_add_post()
            ,
            $item_types_to_create,
            new WidgetForAdvertiseItem($reader_for_sub_types,ui::html()->span()->width("33%"),app::browser_fields()->item_type_code()->value())
        );

    }

}

class HomePageForAddArticle extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->article_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $selector = new ListOfArticleTypeToCreate($reader_for_types);
        return new LayoutForDepartment(
            "NEW ARTICLE: CHOOSE TYPE",
            "",
            $selector,""
        );
    }
}

class HomePageForAddArticleOfType extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->article_type()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();

        return new LayoutForDepartment(
            sprintf("CREATE ARTICLE TYPE: %s",$reader_for_type->article_type_as_single()),
            "",
            $form = new FormForCreateArticle($reader_for_type),
            ""
        );
    }
}

class HomePageForAddEvent extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->event_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $selector = new ListOfEventTypeToCreate($reader_for_types);
        return new LayoutForDepartment(
            "CREATE PAGE FOR EVENT TYPE",
            "",
            $selector,""
        );
    }
}

class HomePageForAddEventOfType extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->event_type()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();

        return new LayoutForDepartment(
            sprintf("CREATE PAGE FOR : %s",$reader_for_type->event_type_as_single()),
            "",
            $form = new FormForCreateEvent($reader_for_type),
            ""
        );
    }
}


class HomePageForAddProfile extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->profile_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $selector = new ListOfProfileTypeToCreate($reader_for_types);
        return new LayoutForDepartment(
            "CREATE PAGE FOR",
            "",
            $selector,""
        );
    }
}

class HomePageForAddStatusUpdate extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->status_types()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $selector = new ListOfStatusTypes($reader_for_types);
        return new LayoutForDepartment(
            "CHOOSE STATUS UPDATE",
            "",
            $selector,""
        );
    }
}

class HomePageForAddProfileOfType extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->profile_type()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();

        return new LayoutForDepartment(
            sprintf("CREATE PAGE FOR : %s",$reader_for_type->profile_type_as_single()),
            "",
            $form = new FormForCreateProfile($reader_for_type),
            ""
        );
    }
}

class HomePageForAddStatusUpdateOfType extends HomePageForAdminAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->status_type()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();

        return new LayoutForDepartment(
            sprintf("UPDATE : %s",$reader_for_type->status_type()),
            "",
            $form = new FormForCreateStatusUpdate($reader_for_type),
            ""
        );
    }
}


class HomePageForPost extends HomePageAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->get_post(),            
            app::values()->get_extended_post_tokens(),
            app::values()->departments(),
            app::values()->register_the_view(),
            app::values()->update_item_score(),
            app::values()->get_related_posts(),
            //app::values()->get_comments_for_post(),
            //app::values()->get_photo_credits_for_post()
        );
    }


    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_post = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();                
        $reader_for_extended_post_tokens = $reader_for_content->get_reader_for_item_3();
        $reader_for_depts = $reader_for_content->get_reader_for_item_4();

        //$reader_for_comments = $reader_for_content->get_reader_for_item_5();
       // $reader_for_photo_credits = $reader_for_content->get_reader_for_item_6();

        $reader_for_related_posts = $reader_for_content->get_reader_for_item_7();

        $this->set_title($reader_for_post->title());

        $image_alt = $reader_for_post->title();
        $post_content = $reader_for_post->content();

        return ui::page_html()->admin_switcher(
            ui::page_tabs()->tab_wrapper("VIEWING POST..")
            ,

            ui::html()->div(
                ui::html()->notification_header("Tap the post to like, comment, or share")
            )->margin_bottom("0.5em")
            .
            ui::html()->span(ui::html()->div(
                //the main post
                ui::html()->div(
                    ui::html()->heading3($reader_for_post->title())
                    .
                    ui::html()->div(
                        ui::urls()->view_image($reader_for_post->picture_file_name())->toImage()->set_alt($image_alt)
                    )
                    .
                    ui::html()->long_text($post_content)

                )->font_variant("initial")->background_color("white")->padding("0.5em 1.5em")->line_height("1.8em")->border(ui::borders()->panel())->border_radius("0.5em")
            )->padding_right("1%"))->width("66.6%")
            .
            ui::html()->span(ui::html()->div(
            // related posts
                new ListOfAdminPublishedItems($reader_for_related_posts)
            ))->width("33.3%")



            ,
            ui::lists()->departments($reader_for_depts)
        );

        return ui::page_html()->admin_switcher(
            ui::page_tabs()->home()
            ,
            $this->getCenterState($reader_for_post, $reader_for_extended_post_tokens,$reader_for_photo_credits)
            ,
            ui::html()->panel_header_at_top("COMMENTS")->margin_top("8px").
            new ListOfCommentsForAPost($reader_for_comments).
            ui::forms()->post_comment(ui::browser_fields()->file_name()->value())->margin_top("1.0em")
        );

    }

    private function getCenterState($reader_for_main_post, $reader_for_extended_post_tokens,$reader_for_photo_credits)
    {
        return ui::html()->div()->add_child(
            ui::sections()->article_details($reader_for_main_post,$reader_for_photo_credits) .
            ui::sections()->extended_post_tokens($reader_for_extended_post_tokens)
        );
    }
}


class HomePageForSearch extends HomePageAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->get_posts_by_search_query()
        );
    }


    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        /** @var ReaderForValuesStoredInArray $reader_for_user */
        $reader_for_posts = $reader_for_content->get_reader_for_item_2();
        $this->set_title("Search for wedding goodies, service providers, and ideas for your wedding");

        //print_r($reader_for_posts);exit;


        return ui::page_html()->admin_switcher(
            ui::page_tabs()->tab_wrapper("SEARCH RESULTS")
            ,
            ui::lists()->stream_on_landing_page($reader_for_posts)
            ,
            "filter by: people | posts"//new ListOfRomeoUsers($reader_for_users_except)
        );

    }

}

class HomePageForUser extends HomePageAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->get_user(),
            app::values()->get_posts_by_user(),
            app::values()->get_users_except()
        );
    }


    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        /** @var ReaderForValuesStoredInArray $reader_for_user */
        $reader_for_user = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $reader_for_user_posts = $reader_for_content->get_reader_for_item_3();
        $reader_for_users_except = $reader_for_content->get_reader_for_item_4();
        $this->set_title($reader_for_user->full_name());
        

        return ui::page_html()->admin_switcher(
            ui::page_tabs()->tab_wrapper($reader_for_user->full_name())
            ,

            ui::html()->notification_header("Last Updated | Wed 12th Jun 2019")->background_color("white")
            .
            ui::html()->notification_header("Call:- +256 772 124 356")->background_color("white")
            .
            //todo: these tabs are only added if the person has items in their store [call api call called get tabs
            ui::html()->notification_header("SHOP | ARTICLES | FACILITIES | PORTFOLIO | PHOTOS | STATUS | ABOUT")->background_color("white")
            .
            ui::lists()->stream_on_landing_page($reader_for_user_posts)
            ,
            new ListOfRomeoUsers($reader_for_users_except)
        );

    }

}

class HomePageForWebsite extends HomePageAccessingData{
    protected function array_of_procedures()
    {
        return array(
            app::values()->get_current_user(),
            app::values()->get_posts_latest_1(),
            app::values()->departments(),

            app::values()->item_types(),
            app::values()->product_types(),
            app::values()->work_types(),
            app::values()->facility_types(),
            app::values()->event_types(),
            app::values()->article_types(),
            app::values()->profile_types(),
            app::values()->status_types(),
            app::values()->most_views(),
            app::values()->most_likes(),
            app::values()->most_comments(),
            app::values()->most_recent()
        );
    }
    
    public function get_title()
    {
        return "Romeos Wedding - Everything you need for your wedding - Ideas, Service Providers";
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_current_user = $reader_for_content->get_reader_for_item_1();

        $email_adddress = count($reader_for_current_user->get_array()) > 0 ? $reader_for_current_user->get_array()[0]['email_address']:"";
        if($email_adddress){
            ui::urls()->adminPage()->gotoAddress();
        }



        $this->storeReaderForCurrentUser($reader_for_current_user);

        $reader_for_posts_latest_1 = $reader_for_content->get_reader_for_item_2();        
        $reader_for_depts = $reader_for_content->get_reader_for_item_3();
        $reader_for_item_types = $reader_for_content->get_reader_for_item_4();

        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        /*$dir = "assets/ads";
        $ads_arr = scandir($dir);
        $ads_arr = array_filter($ads_arr,function($item){
            return $item != "." && $item != "..";
        });
        $ads_arr = array_values($ads_arr);

        $ads_arr = ui::arrays()->ads();*/
        //print json_encode($ads_arr);exit;

        //$img_url = new URLForAds("UG_W23_JA_SX_Generic_712x384pxx.png");
        //return $img_url->toImage();


        $job = new BabaRenderer();
        //setting up renderer
        $job->add_array($reader_for_depts->get_array(),"departments");
        $job->add_array($reader_for_posts_latest_1->get_array(),"posts");
        $job->add_array($reader_for_item_types->get_array(),"item_types");
        $job->add_array(ui::arrays()->ads(),"ads_array");

        $job->add_renderer(new BabaRendererForDepartment1,"department_render1");
        $job->add_renderer(new BabaRendererForPostsAt30Percent(),"post_renderer_30_percent_1");
        $job->add_renderer(new BabaRendererForPostsAt20Percent(),"post_renderer_20_percent_1");
        $job->add_renderer(new BabaRendererForPostsAt50Percent(),"post_renderer_50_percent_1");
        $job->add_renderer(new BabaRendererForPostsAt16Percent(),"post_renderer_16_percent_1");
        $job->add_renderer(new BabaRendererForNavItemTypes(),"rend_item_types");
        $job->add_renderer(new BabaRendererForPictureAds50Percent(),"rend_picture_ads_50_percent");
        $job->add_renderer(new BabaRendererForPictureAds100Percent(),"rend_picture_ads_100_percent");

        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
        return ui::page_html()->admin_switcher(
            ui::page_tabs()->tab_wrapper($job->pull(8,"item_types","rend_item_types"))
            //ui::page_tabs()->home()
            ,
            $this->get_page_1($job).$this->get_page_1($job).$this->get_page_1($job)


            ,

            ui::html()->div(
                ui::html()->span(
                    ui::html()->div(
                        $job->pull(5, "departments","department_render1")
                    )
                )->width("30%")
                .
                ui::html()->span(
                    ui::html()->div(
                        $job->pull(5, "departments","department_render1")
                    )
                )->width("40%")
                .
                ui::html()->span(
                    ui::html()->div(
                        $job->pull(5, "departments","department_render1")
                    )
                )->width("30%")
            )->background_color("#fff")->border(ui::borders()->panel())

        );
        
    }

    /**
     * @param $job
     * @return string
     */
    private function get_page_1($job)
    {
        return ui::html()->div(
            ui::html()->div(
                $job->pull(6, "posts", "post_renderer_16_percent_1")
            )->border_top(ui::borders()->panel())->border_bottom(ui::borders()->panel())
            .
            ui::html()->span(
                ui::html()->div(
                    $job->pull(1, "posts", "post_renderer_20_percent_1")
                )->padding("2px")
                .
                ui::html()->div(
                    $job->pull(1, "ads_array", "rend_picture_ads_100_percent")
                )->padding("2px")
                .
                ui::html()->div(
                    $job->pull(1, "posts", "post_renderer_30_percent_1")
                )->padding("2px")
            )->width("25%")
            .
            ui::html()->span(
                ui::html()->div(
                    $job->pull(1, "posts", "post_renderer_50_percent_1")
                //ui::lists()->stream_on_landing_page($reader_for_posts_latest_1)
                )->padding("2px")
            )->width("45%")
            .
            ui::html()->span(
                ui::html()->div(
                    $job->pull(1, "ads_array", "rend_picture_ads_100_percent")
                )->padding("2px")
                .
                ui::html()->div(
                    $job->pull(2, "posts", "post_renderer_30_percent_1")
                )->padding("2px")
                .
                ui::html()->div(
                    $job->pull(1, "posts", "post_renderer_30_percent_1")
                )->padding("2px")
            )->width("30%")
            .
            ui::html()->div(
                $job->pull(2, "ads_array", "rend_picture_ads_50_percent")
            )->border_top(ui::borders()->panel())
            .
            ui::html()->div(
                $job->pull(6, "posts", "post_renderer_16_percent_1")
            )->border_bottom(ui::borders()->panel())

        )->background_color("#fff")
        .
        ui::html()->div(

            $job->pull(2, "ads_array", "rend_picture_ads_50_percent")
        )->background_color("#fff")->border_top("1px solid #ddd")->margin_top("4px")
        .
        ui::html()->div(
            $job->pull(6, "posts", "post_renderer_16_percent_1")
        )->border_top(ui::borders()->panel())->border_bottom(ui::borders()->panel())


            ;
    }
}

class HomePageForAboutUs extends HomePageAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return "About Us";
    }
}

class HomePageForDepartment extends HomePageAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->department(),
            app::values()->products_in_department(),
            app::values()->work_in_department(),
            app::values()->facilities_in_department(),
            app::values()->events_in_department(),
            app::values()->profiles_in_department(),
            app::values()->articles_in_department(),

            app::values()->departments()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        $reader_for_department = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $reader_for_products = $reader_for_content->get_reader_for_item_3();
        $reader_for_work = $reader_for_content->get_reader_for_item_4();
        $reader_for_facilities = $reader_for_content->get_reader_for_item_5();
        $reader_for_events = $reader_for_content->get_reader_for_item_6();
        $reader_for_profiles = $reader_for_content->get_reader_for_item_7();
        $reader_for_articles = $reader_for_content->get_reader_for_item_8();

        $reader_for_depts = $reader_for_content->get_reader_for_item_9();

        $dept_description = $reader_for_department->department_description();
        $this->set_title($dept_description);

        return ui::page_html()->admin_switcher(
            ui::page_tabs()->tab_wrapper($dept_description)
            ,
            new StreamOfPostsAt20Percent($reader_for_products)
            .
            new StreamOfPostsAt20Percent($reader_for_work)
            .
            new StreamOfPostsAt20Percent($reader_for_facilities)
            .
            new StreamOfPostsAt20Percent($reader_for_events)
            .
            new StreamOfPostsAt20Percent($reader_for_profiles)
            .
            new StreamOfPostsAt20Percent($reader_for_articles)
            ,
            ui::lists()->departments($reader_for_depts)
        );

    }
}
abstract class HomePageForItemType extends HomePageAccessingData{

}

class HomePageForProducts extends HomePageForItemType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->product_types(),
            app::values()->products(),
            app::values()->departments()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_items = $reader_for_content->get_reader_for_item_3();
        $reader_for_departments = $reader_for_content->get_reader_for_item_4();

        $this->set_title("Items for Sale, Hire - for Your Wedding");

        $reader_for_items = ui::choose_content_if_not_empty($reader_for_items, ui::lists()->public_view_of_published_posts($reader_for_items) );

        return new LayoutForDepartment(
            "Buy or Hire these Items",
            ui::lists()->product_types($reader_for_types),
            $reader_for_items,
            new ListOfDepartments($reader_for_departments)
        );
    }
}

class HomePageForFacilities extends HomePageForItemType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->facility_types(),
            app::values()->facilities(),
            app::values()->departments()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_items = $reader_for_content->get_reader_for_item_3();
        $reader_for_departments = $reader_for_content->get_reader_for_item_4();

        $this->set_title("Hire or Book Facilities - for Your Wedding");

        $reader_for_items = ui::choose_content_if_not_empty($reader_for_items, ui::lists()->public_view_of_published_posts($reader_for_items) );

        return new LayoutForDepartment(
            "Facilities for Hire - For Your Wedding",
            ui::lists()->facility_types($reader_for_types),
            $reader_for_items,
            new ListOfDepartments($reader_for_departments)
        );
    }
}

class HomePageForWork extends HomePageForItemType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->work_types(),
            app::values()->work(),
            app::values()->departments()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_items = $reader_for_content->get_reader_for_item_3();
        $reader_for_departments = $reader_for_content->get_reader_for_item_4();

        $this->set_title("Past Works");

        $reader_for_items = ui::choose_content_if_not_empty($reader_for_items, ui::lists()->public_view_of_published_posts($reader_for_items) );

        return new LayoutForDepartment(
            "Past Works",
            ui::lists()->work_types($reader_for_types),
            $reader_for_items,
            new ListOfDepartments($reader_for_departments)
        );
    }
}
class HomePageForArticles extends HomePageForItemType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->article_types(),
            app::values()->articles(),
            app::values()->departments()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_items = $reader_for_content->get_reader_for_item_3();
        $reader_for_departments = $reader_for_content->get_reader_for_item_4();

        $this->set_title("Articles, Tips & Ideas - for Your Wedding");

        $reader_for_items = ui::choose_content_if_not_empty($reader_for_items, ui::lists()->public_view_of_published_posts($reader_for_items) );

        return new LayoutForDepartment(
            "Articles, Tips & Ideas - for your wedding",
            ui::lists()->article_types($reader_for_types),
            $reader_for_items,
            new ListOfDepartments($reader_for_departments)
        );
    }
}

class HomePageForProfiles extends HomePageForItemType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->profile_types(),
            app::values()->profiles()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_items = $reader_for_content->get_reader_for_item_3();

        $this->set_title("Hire Service Providers - for Your Wedding");

        $reader_for_items = ui::choose_content_if_not_empty($reader_for_items, ui::lists()->public_view_of_published_posts($reader_for_items) );

        return new LayoutForDepartment(
            "Hire Service Providers - for your Big Day",
            ui::lists()->profile_types($reader_for_types),
            $reader_for_items,
            "Right"
        );
    }
}

class HomePageForEvents extends HomePageForItemType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->event_types(),
            app::values()->events()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_types = $reader_for_content->get_reader_for_item_2();
        $reader_for_items = $reader_for_content->get_reader_for_item_3();

        $this->set_title("Past & Upcoming Wedding Events");

        $reader_for_items = ui::choose_content_if_not_empty($reader_for_items, ui::lists()->public_view_of_published_posts($reader_for_items) );

        return new LayoutForDepartment(
            "Past & Upcoming Wedding Events",
            ui::lists()->event_types($reader_for_types),
            $reader_for_items,
            "Right"
        );
    }
}

abstract class HomePageForSomethingType extends HomePageAccessingData{

}

class HomePageForEventType extends HomePageForSomethingType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->event_type(),
            app::values()->events_by_type(),
            app::values()->get_posts_latest_1(),
            app::values()->get_posts_latest_2()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_event_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $events_by_type = $reader_for_content->get_reader_for_item_3();
        $header = $reader_for_event_type->event_type_as_plural();

        $reader_for_posts_latest_1 = $reader_for_content->get_reader_for_item_4();
        $reader_for_posts_latest_2 = $reader_for_content->get_reader_for_item_5();

        $this->set_title($header);

        $events_by_type = ui::choose_content_if_not_empty($events_by_type, ui::lists()->public_view_of_published_posts($events_by_type) );

        return new LayoutForDepartment(
            $header,
            new StreamOfPostsAt20Percent($reader_for_posts_latest_1),
            $events_by_type,
            new StreamOfPostsAt30Percent($reader_for_posts_latest_2)
        );
    }
}

class HomePageForArticleType extends HomePageForSomethingType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->article_type(),
            app::values()->articles_by_type(),

            app::values()->get_posts_latest_1(),
            app::values()->get_posts_latest_2()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_article_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $articles_by_type = $reader_for_content->get_reader_for_item_3();
        $header = $reader_for_article_type->article_type_as_plural();

        $reader_for_posts_latest_1 = $reader_for_content->get_reader_for_item_4();
        $reader_for_posts_latest_2 = $reader_for_content->get_reader_for_item_5();

        $this->set_title($header);

        $articles_by_type = ui::choose_content_if_not_empty($articles_by_type,ui::lists()->public_view_of_published_posts($articles_by_type));

        return new LayoutForDepartment(
            $header,
            new StreamOfPostsAt20Percent($reader_for_posts_latest_1),
            $articles_by_type,
            new StreamOfPostsAt30Percent($reader_for_posts_latest_2)
        );
    }
}

class HomePageForProfileType extends HomePageForSomethingType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->profile_type(),
            app::values()->profiles_by_type(),

            app::values()->get_posts_latest_1(),
            app::values()->get_posts_latest_2()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_profile_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $profiles_by_type = $reader_for_content->get_reader_for_item_3();
        $header = $reader_for_profile_type->profile_type_as_plural();

        $reader_for_posts_latest_1 = $reader_for_content->get_reader_for_item_4();
        $reader_for_posts_latest_2 = $reader_for_content->get_reader_for_item_5();

        $this->set_title($header);

        $profiles_by_type = ui::choose_content_if_not_empty($profiles_by_type,ui::lists()->public_view_of_published_posts($profiles_by_type));

        return new LayoutForDepartment(
            $header,
            new StreamOfPostsAt20Percent($reader_for_posts_latest_1),
            $profiles_by_type,
            new StreamOfPostsAt30Percent($reader_for_posts_latest_2)
        );
    }
}

class HomePageForWorkType extends HomePageForSomethingType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->work_type(),
            app::values()->work_by_type(),

            app::values()->get_posts_latest_1(),
            app::values()->get_posts_latest_2()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_work_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $work_by_type = $reader_for_content->get_reader_for_item_3();
        $header = $reader_for_work_type->work_type_as_plural();

        $reader_for_posts_latest_1 = $reader_for_content->get_reader_for_item_4();
        $reader_for_posts_latest_2 = $reader_for_content->get_reader_for_item_5();

        $this->set_title($header);

        $work_by_type = ui::choose_content_if_not_empty($work_by_type,ui::lists()->public_view_of_published_posts($work_by_type));

        return new LayoutForDepartment(
            $header,
            new StreamOfPostsAt20Percent($reader_for_posts_latest_1),
            $work_by_type,
            new StreamOfPostsAt30Percent($reader_for_posts_latest_2)
        );
    }
}

class HomePageForProductType extends HomePageForSomethingType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->product_type(),
            app::values()->products_by_type(),

            app::values()->product_types(),
            app::values()->departments()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_product_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $products_by_type = $reader_for_content->get_reader_for_item_3();
        $header = $reader_for_product_type->product_type_as_plural();

        $reader_for_product_types = $reader_for_content->get_reader_for_item_4();
        $reader_for_departments = $reader_for_content->get_reader_for_item_5();

        $this->set_title($header);

        $products_by_type = ui::choose_content_if_not_empty($products_by_type,ui::lists()->public_view_of_published_posts($products_by_type));

        return new LayoutForDepartment(
            $header,
            new ListOfProductTypes($reader_for_product_types),
            $products_by_type,
            new ListOfDepartments($reader_for_departments)
        );
    }
}

class HomePageForFacilityType extends HomePageForSomethingType{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user(),
            app::values()->facility_type(),
            app::values()->facilities_by_type(),

            app::values()->get_posts_latest_1(),
            app::values()->get_posts_latest_2()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {

        $reader_for_facility_type = $reader_for_content->get_reader_for_item_2()->get_reader_for_item_1();
        $facilities_by_type = $reader_for_content->get_reader_for_item_3();
        $header = $reader_for_facility_type->facility_type_as_plural();

        $reader_for_posts_latest_1 = $reader_for_content->get_reader_for_item_4();
        $reader_for_posts_latest_2 = $reader_for_content->get_reader_for_item_5();

        $this->set_title($header);

        $facilities_by_type = ui::choose_content_if_not_empty($facilities_by_type,ui::lists()->public_view_of_published_posts($facilities_by_type));

        return new LayoutForDepartment(
            $header,
            new StreamOfPostsAt20Percent($reader_for_posts_latest_1),
            $facilities_by_type,
            new StreamOfPostsAt30Percent($reader_for_posts_latest_2)
        );
    }
}


class HomePageForContactUs extends HomePageAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {        
        return " Contact Us";
    }

}


class HomePageForContentOnboarding extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()            
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "ON BOARDING",
            "left",
            "middle",
            "right"
        );
    }
}


class HomePageForContentPlanning extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Planning",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentResearchAndIdeation extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Research",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentCreation extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "CREATE CONTENT",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentEditing extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Editing",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentAudting extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Content Audit",
            "left",
            "assessing credibility, reports from users about credibility",
            "right"
        );
    }
}

class HomePageForQualityAndCredibility extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Quality and Credibility",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentExpertRoundUp extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Expert Round Up",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentInbound extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Inbound Content",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentPublishing extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Publishing",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentPromotion extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Promotion",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentMarketing extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Content Marketing",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForGuestPosts extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Guest Posts",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForStatisticsAndRecords extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Statistics and Records",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentOutdated extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "Outdated Content",
            "left",
            "middle",
            "right"
        );
    }
}

class HomePageForContentMemes extends HomePageForAdminAccessingData{
    protected function array_of_procedures(){
        return array(
            app::values()->get_current_user()
        );
    }

    protected function getHtmlFromReaderForContent($reader_for_content)
    {
        return new LayoutForDepartment(
            "MEMES",
            "left",
            "middle",
            "right"
        );
    }
}