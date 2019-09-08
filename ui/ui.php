<?php
class ui{
    public static function kickers(){
        return new KickerFactory();
    }
    public static function pages(){
        return new PageFactory();
    }

    public static function sections()
    {
        return new SectionFactory();
    }

    public static function links()
    {
        return new LinkFactory();
    }

    public static function urls()
    {
        return new UrlFactory();
    }

    public static function browser_fields()
    {
        return app::browser_fields();
    }

    public static function page_layouts()
    {
        return new PageLayoutFactory();
    }

    public static function row_layouts()
    {
        return new RowLayoutFactory();
    }

    
    public static function html()
    {
        //todo: we dont need more than one instance
        return new HtmlElementFactory();
    }
    
    public static function chap_sap(){
        return new FactoryForChapSapUtils();
    }

    public static function forms()
    {
        return new FormFactory();
    }

    public static function buttons()
    {
        return new ButtonFactory();
    }

    public static function cmds()
    {
        return new CmdFactory();
    }

    public static function exception()
    {
        return new UIExceptionFactory();
    }

    public static function images()
    {
        return new ImageFactory();
    }

    public static function pickers()
    {
        return new PickerFactory();
    }

    public static function lists()
    {
        return new ListFactory();
    }

    public static function choose_content_if_not_empty($reader,$normal_content)
    {
        return $reader->count() > 0 ? $normal_content : ui::html()->div()->add_child("DID NOT FIND ANY CONTENT IN THIS CATEGORY")->font_size("3.0em")->padding("1.0em")->color(ui::colors()->bg())->line_height("1.2em");
    }

    public static function time_in_seconds($timestamp)
    {
        return new TimeInSeconds($timestamp);
    }
   public static function time_posted($timestamp){       
       return sprintf(
           "%s - %s",
           ui::time_in_seconds($timestamp)->asTimeAgo(),date('D M d, Y',$timestamp) );
   }
    public static function time_posted_from_reader($item_reader){
        return self::time_posted($item_reader->timestamp());
    }
    
    public static function css_classes()
    {
        return new CSSClassFactory();
    }
    public static function class_selector()
    {
        return new CSSClassFactory(true);
    }
    
    public static function form_names()
    {
        return new FormNameFactory();
    }
    

    public static function error_html()
    {
        $html = new SmartDiv();
        $html
            ->add_class(ui::css_classes()->error_message_host());
        return $html;
    }

    public static function form_feedback()
    {
        return new FormFeedbackFactory();
    }

    public static function date_from_timestamp($timestamp)
    {
        return date("D d M, Y", intval($timestamp));
    }

    public static function colors()
    {
        return new ColorFactory();
    }

    public static function external_urls()
    {
        return new ExternalUrls();
    }

    public static function section_banners()
    {
        return new SectionBanners();
    }

    public static function section_ids()
    {
        return new StaticSectionIds();
    }

    public static function text_with_contrast_colors($string, $string1)
    {
        $container = new SmartSpan();

        $item1 = new SmartSpan();
        $item1->add_child($string)->width_auto()->color(ui::colors()->header_bg());

        $container->add_child($item1."&nbsp;");

        $item2 = new SmartSpan();
        $item2->add_child($string1)->width_auto();
        $container->add_child($item2);

        return $container;
    }
    public static function h2_with_contrast_colors($string, $string1){
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors($string,$string1));
    }

    public static function page_headers()
    {
        return new PageHeaderFactory();
    }

    public static function _1px_dashed_ddd()
    {
        return "1px dashed #ddd";
    }

    public static function height_of_careers()
    {
        return "5.0em";
    }

    public static function _1px_solid_form_border()
    {
        return "1px solid ".ui::colors()->form_border();
    }

    public static function responsive_css()
    {
        return new FactoryForResponsiveCSS();
    }
    
    public static function select_boxes()
    {
        return new FactoryForSelectBoxes();
    }

    /**
     *@param \ReaderForValuesStoredInArray $reader_for_item 
     * @return DomainObject */
    public static function domain_object($reader_for_item)
    {
        $item_type_code = $reader_for_item->item_type_code();
        
        $type_code_object = null;
        switch($item_type_code){
            case app::item_type_codes()->product():
                $type_code_object = new DomainProduct($reader_for_item);
                break;
            case app::item_type_codes()->work():
                $type_code_object = new DomainWork($reader_for_item);
                break;
            case app::item_type_codes()->facility():
                $type_code_object = new DomainFacility($reader_for_item);
                break;
            case app::item_type_codes()->article():
                $type_code_object = new DomainArticle($reader_for_item);
                break;
            case app::item_type_codes()->event():
                $type_code_object = new DomainEvent($reader_for_item);
                break;
            case app::item_type_codes()->profile():
                $type_code_object = new DomainProfile($reader_for_item);
                break;
            default:
                $type_code_object = new DomainNullObject($reader_for_item);
                break;
        }
        return $type_code_object;
    }

    public static function index_based_css()
    {
        return new FactoryForIndexBasedCSS();
    }

    public static function borders()
    {
        return new FactoryForBorders();
    }

    public static function font_sizes()
    {
        return new FactoryForFontSizes();
    }

    public static function readers()
    {
        return new FactoryForUIReaders();
    }

    public static function resp_values_for_class($class_name)
    {
        $vals = new ResponsiveValuesForCSSProperty();
        $vals->setCSSElement(CSSElementOfClass($class_name));
        return $vals;
    }

    public static function resp_values_for_type($class_name)
    {
        $vals = new ResponsiveValuesForCSSProperty();
        $vals->setCSSElement(CSSElementOfType($class_name));
        return $vals;
    }

    public static function fragments($return_only_id=false)
    {
        return new FragmentFactory($return_only_id);
    }

    public static function page_html()
    {
        return new PageHtmlFactory();
    }
    public static function page_tabs()
    {
        return new PageTabFactory();
    }

    public static function assets()
    {
        return new FactoryForAssets();
    }

    public static function builders()
    {
        return new FactoryForBuilders();
    }

    /** 
     * @param SmartHTMLElement $html_element 
     * @return SmartHTMLElement 
     */
    public static function decorate_as_selectable_element($html_element,$value_to_append, $value_of_name_attribute_where_to_append_to_value)
    {
        $random_element_id = join("_",["element",rand(1000,9999)]);
        $footer_element_id = join("-",[$random_element_id,"footer"]);
        $selector_indicator_id = join("-",[$random_element_id,"selection-indicator"]);

        $toolbar_id = join("-",[$random_element_id,"toolbar"]);
        
        $html_element
            ->set_id($random_element_id)
            ->cursor_pointer()
            ->set_attribute("onClickToggleClass", ui::css_classes()->chap_selected_item()."/#$random_element_id")
            ->set_attribute("onClickToggleAppendToValue",$value_to_append. sprintf("/[name=%s]",$value_of_name_attribute_where_to_append_to_value))
            ->set_attribute("onClickSetEffects","slideToggle:#$selector_indicator_id;fadeToggle:#$toolbar_id");
        
        return $html_element;
        
        
    }

    public static function arrays()
    {
        return new FactoryForArrays();
    }

}
class FactoryForArrays{

    public function ads()
    {
        $dir = "assets/ads";
        $ads_arr = scandir($dir);
        if(is_array($ads_arr)){
            $ads_arr = array_filter($ads_arr,function($item){
                return $item != "." && $item != "..";
            });
            $ads_arr = array_values($ads_arr);
            return $ads_arr;
        }
        else{
            return [];
        }
       
    }
}

class FactoryForBuilders{

    public function adminItemToolbar()
    {
        return new BuilderForAdminItemToolbar();
    }
    public function adminItemInlineToolbar($item_reader)
    {
        return new BuilderForAdminItemInlineToolbar($item_reader);
    }

    public function selected_days_toolbar()
    {
        return new ToolbarBuilderForCSVDays();
    }


}

class FactoryForAssets{

    public function bg()
    {
        return "bg3.png";
    }
}
class PageTabFactory{
    private function make_tab($content,$element_id_or_fragment,$slide_down){
        return
        ui::html()->toaster_link(
            $content,
            "#"
        )
            ->add_class(ui::css_classes()->chap_top_tabs())
            ->set_id($element_id_or_fragment)
            ->set_attribute("onClickSetEffects",
                join("",[
                    "slideUp:.",ui::css_classes()->chap_mains(),
                    ";",
                    "slideDown:",$slide_down
                ])
            )
            ->set_attribute("onClickSetBorderBottomColor",
                join(
                    "",[
                        "transparent:.",
                        ui::css_classes()->chap_top_tabs(),
                        ";",
                        "white:#",
                        $element_id_or_fragment
                    ]
                )
            );
    }

    public function tab_wrapper($content){
        return
            ui::html()->div(
                $content
            )
                ->add_class(ui::css_classes()->chap_search_bar_toggle_item())
                ->background_color(ui::colors()->header_bg())
                ->padding_bottom("1px") //so that underline not sacked into contnet
                ->margin_left("-1px")//hack
                ->position_fixed()
                ->z_index("1")
                ->width_100percent()
                ->margin_top("-2px")
                ->text_align_center()
                ->font_weight_bold()
                ->color("white")                
            ;
    }

    public function home()
    {
        return $this->tab_wrapper("SHOP | FACILITIES | PORTFOLIOS | ARTICLES");

    }

    public function admin_drafts()
    {
        return $this->tab_wrapper("DRAFTS");
    }
    public function admin_add_post()
    {
        return $this->tab_wrapper("NEW POST");
    }
    public function admin_items($category, $sub_category_from_browser)
    {
        $category = strtoupper($category);        
        $sub_category = $sub_category_from_browser ? str_replace("_"," ",$sub_category_from_browser) : "$category - ALL TYPES";

        return $this->tab_wrapper(
            ui::html()->div($sub_category)->font_weight_bold()->text_align_center()->background_color(ui::colors()->header_bg()->mix_white(10))->border_top("2px solid ".ui::colors()->header_bg()->mix_black(10))
        );
    }
}
class FactoryForChapSapUtils{
    public function showFooter($js_edit_title_dialog)
    {
        return join("", ["slideUp:",ui::class_selector()->chap_footer(),";","slideToggle:",$js_edit_title_dialog]);
    }

    public function arrs_attribute_params($arr_pairs_of_value_where_selector)
    {

        $final_string = array_reduce($arr_pairs_of_value_where_selector,function ($carry,$item){
            $new_value = htmlspecialchars($item[0]);
            $selector = htmlspecialchars($item[1]);
            return $carry . "&" . $new_value . "/" . $selector;
        });
        return substr($final_string,1);
    }
    public function attribute_params($new_value,$where_selector){
        return htmlspecialchars($new_value) . "/" . htmlspecialchars($where_selector);
    }

    public function set_html($new_html, $where_selector)
    {
        return htmlspecialchars($new_html) . "/" . htmlspecialchars($where_selector);
    }
}

class PageHtmlFactory{

    private function wrap_mains($content){
        return
        ui::html()->div(
            $content
        )->margin_top("2.0em"); //todo: changed from 3.0em, revert if not work well for some pages
    }    
    public function home($reader_for_posts_latest_1,$reader_for_depts)
    {
        return
        ui::page_tabs()->home()
        .
        $this->wrap_mains(
            ui::html()->make_main(
                ui::lists()->stream_on_landing_page($reader_for_posts_latest_1),
                ui::fragments(true)->chap_recent()
            )
            .
            ui::html()->make_main(
                ui::lists()->departments($reader_for_depts),
                ui::fragments(true)->chap_categories()
            )
            .
            ui::html()->make_main(
                ui::html()->div(
                    "".ui::forms()->login()
                    .
                    ui::html()->div(
                        ui::html()->toaster_link(
                            "Create account","#"
                        )->set_attribute("onclick","return false;")->set_attribute(
                            "onClickSetEffects",
                            "slideDown:".ui::fragments()->chap_footer_join()
                        )
                    )->padding("1.0em")
                )
                    ->max_width("300px")
                    ->margin_auto()
                    ->set_attribute("OnClickSetSlideUp",".".ui::css_classes()->chap_footer())
                .
                ui::html()->div(
                    ui::html()->div(
                        ui::html()->heading3("Create an account")
                        .
                        "".ui::forms()->create_account()
                    )->max_width("300px")->margin_auto()
                )->set_id(ui::fragments(true)->chap_footer_join())->add_class(ui::css_classes()->chap_footer())

                ,
                ui::fragments(true)->chap_login_main()
            )
        );

    }
   
    public function admin_switcher($page_tabs,$main_1,$main_2){
        return
            $page_tabs
            .
            $this->wrap_mains(
                ui::html()->make_main(
                    $main_1,
                    ui::fragments(true)->chap_main_products()
                )->max_width("98%")->margin_auto()
                .
                ui::html()->make_main(
                    ui::html()->div(
                        $main_2
                    )

                    ,
                    ui::fragments(true)->chap_main_product_categories()
                )->max_width("98%")->margin_auto()->display_none()

                .
                //footer 2
                ui::html()->make_floating_btn_host(
                    ui::html()->span(":::")
                        ->add_class(ui::css_classes()->chap_footer_floating_button())
                        ->set_attribute(
                            "onClickSetSlideToggle",
                            join(",",[ui::fragments()->chap_main_products(),ui::fragments()->chap_main_product_categories()])
                        )->set_attribute("onClickSetEffects","scrollToTop:html,body")
                    ,
                    ""

                )

            );
    }

    public function admin_items($reader_for_posts,$page_tabs,$widget_for_advertise_item){
        return $this->admin_switcher($page_tabs,new ListOfAdminItems($reader_for_posts),$widget_for_advertise_item);
    }
   
}
class FragmentFactory{
    private $hashtag = "#";
    public function __construct($return_only_id=false)
    {
        $this->hashtag = $return_only_id ? "" : "#";
    }

    private function makeFragment($identifier)
    {
        return $this->hashtag.$identifier;
    }
    public function chap_recent()
    {
        return $this->makeFragment(__FUNCTION__);
    }
    public function chap_categories()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_recent_tab()
    {
        return $this->makeFragment(__FUNCTION__);
    }
    public function chap_categories_tab()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_login_tab()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_login_main()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_footer_join()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_main_admin_published()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_main_admin_categories()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_admin_stream_tab()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_main_products()
    {
        return $this->makeFragment(__FUNCTION__);
    }
    public function chap_main_product_categories()
    {
        return $this->makeFragment(__FUNCTION__);
    }

    public function chap_alternative_header1()
    {
        return $this->makeFragment(__FUNCTION__);
    }

}
class FactoryForUIReaders{

    public function chapsapp_home()
    {
        return app::reader(
            array(
                array(
                    app::values()->content() => "Recent",
                    app::values()->url() => ui::fragments()->chap_recent()
                ),
                array(
                    app::values()->content() => "Categories",
                    app::values()->url() => ui::fragments()->chap_categories()
                )
            )
        );
    }

    public function admin_tabs()
    {
        return app::reader(
            array(
                array(
                    app::values()->content() => "Published",
                    app::values()->url() => ui::urls()->adminViewPostsPublished()
                ),
                array(
                    app::values()->content() => "Drafts",
                    app::values()->url() => ui::urls()->adminViewPosts()
                ),
                array(
                    app::values()->content() => "Products",
                    app::values()->url() => ui::urls()->adminProducts()
                ),
                array(
                    app::values()->content() => "Facilities",
                    app::values()->url() => ui::urls()->adminFacilities()
                ),
                array(
                    app::values()->content() => "Work",
                    app::values()->url() => ui::urls()->adminWork()
                ),
                array(
                    app::values()->content() => "Service Providers",
                    app::values()->url() => ui::urls()->adminProfiles()
                ),
                array(
                    app::values()->content() => "Photos",
                    app::values()->url() => ui::urls()->adminPhotos()
                ),
                array(
                    app::values()->content() => "Tips",
                    app::values()->url() => ui::urls()->adminTips()
                ),
                array(
                    app::values()->content() => "Status",
                    app::values()->url() => ui::urls()->adminStatusUpdates()
                ),
                array(
                    app::values()->content() => "Music",
                    app::values()->url() => ui::urls()->adminStatusUpdates()
                ),
                array(
                    app::values()->content() => "Videos",
                    app::values()->url() => ui::urls()->adminStatusUpdates()
                ),
                array(
                    app::values()->content() => "Set Up",
                    app::values()->url() => ui::urls()->adminStatusUpdates()
                ),
                array(
                    app::values()->content() => "Upload",
                    app::values()->url() => ui::urls()->adminAddPost()
                )
            )
        );
    }

    public function advertise_tabs()
    {
        return app::reader(
            array(
                array(
                    app::values()->content() => new FormForPostProductPhoto(),
                    app::values()->url() => ui::urls()->adminViewPostsPublished()
                ),
                array(
                    app::values()->content() => new FormForPostFacilityPhoto(),
                    app::values()->url() => ui::urls()->adminViewPosts()
                ),
                array(
                    app::values()->content() => new FormForPostProfilePhoto(),
                    app::values()->url() => ui::urls()->adminViewPosts()
                ),
                array(
                    app::values()->content() => new FormForPostWorkPhoto(),
                    app::values()->url() => ui::urls()->adminViewPosts()
                )
            )
        );
    }

    public function share_tabs()
    {
        return app::reader(
            array(
                array(
                    app::values()->content() => new FormForPostEventPhoto(),
                    app::values()->url() => ui::urls()->adminViewPostsPublished()
                ),
                array(
                    app::values()->content() => new FormForPostArticlePhoto(),
                    app::values()->url() => ui::urls()->adminViewPosts()
                )
            )
        );
    }

    public function hire_tabs()
    {
        return app::reader(
            array(
                array(
                    app::values()->content() => "Service Providers",
                    app::values()->url() => ui::urls()->adminViewPostsPublished()
                ),
                array(
                    app::values()->content() => "Facilities",
                    app::values()->url() => ui::urls()->adminViewPosts()
                ),
                array(
                    app::values()->content() => "Items",
                    app::values()->url() => ui::urls()->adminViewPosts()
                )
            )
        );
    }

    public function buy_tabs()
    {
        return app::reader(
            array(
                array(
                    app::values()->content() => "Items",
                    app::values()->url() => ui::urls()->adminViewPostsPublished()
                )
            )
        );
    }

    public function editor_tabs($post_id)
    {
        return app::reader(
            array(
                array(
                    app::values()->content() => "Title",
                    app::values()->url() => ui::urls()->adminEditPostTitle($post_id)->add_is_iframe()
                ),
                array(
                    app::values()->content() => "Photo",
                    app::values()->url() => ui::urls()->adminEditPostImage($post_id)->add_is_iframe()
                ),
                array(
                    app::values()->content() => "Intro",
                    app::values()->url() => ui::urls()->adminEditPostContent($post_id)->add_is_iframe()
                ),
                array(
                    app::values()->content() => "Details",
                    app::values()->url() => ui::urls()->adminEditExtendedPostContent($post_id)->add_is_iframe()
                ),
                array(
                    app::values()->content() => "Preview",
                    app::values()->url() => ui::urls()->adminEditPostPreview($post_id)->add_is_iframe()
                ),
                array(
                    app::values()->content() => ui::forms()->publish_post($post_id),
                    app::values()->url() => ui::urls()->adminViewPostsPublished()
                ),
                array(
                    app::values()->content() => ui::forms()->delete_post($post_id),
                    app::values()->url() => ui::urls()->adminViewPostsPublished()
                )
            )
        );
    }
}

class FactoryForFontSizes{

    public function body()
    {
        return "17";
    }

    public function secondary_text()
    {
        return "0.9em";
    }
}
class FactoryForBorders{

    public function panel()
    {
        return sprintf("1px solid %s !important",ui::colors()->panel_border());
    }

    public function primary_engagement()
    {
        return sprintf("1px solid %s !important",ui::colors()->primary_engagement()->mix(ui::colors()->black(),5));
    }
}
class FactoryForIndexBasedCSS{

    public function romeo_department($page_css_base_class){

        return new CSSForRomeoDepartment($page_css_base_class);
    }

    public function romeo_stream_item($page_css_base_class){
        return new CSSForRomeoStreamItem($page_css_base_class);
    }
}

class FactoryForResponsiveCSS{

    public function body()
    {

        new ResponsiveFontSizeForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSElement(
                CSSElementOfType("body")
            )->
            setFor240(app::utils()->font_size_calc(240))->
            setFor320(app::utils()->font_size_calc(320))->
            setFor360(app::utils()->font_size_calc(360))->
            setFor480(app::utils()->font_size_calc(480))->
            setFor540(app::utils()->font_size_calc(540))->
            setFor600(app::utils()->font_size_calc(600))->
            setFor720(app::utils()->font_size_calc(720))->
            setFor768(app::utils()->font_size_calc(768))->
            setFor800(app::utils()->font_size_calc(800))->
            setFor854(app::utils()->font_size_calc(854))->
            setFor960(app::utils()->font_size_calc(960))->
            setFor1200(app::utils()->font_size_calc(1200))->
            setFor1280(app::utils()->font_size_calc(1280))->
            setFor1320(app::utils()->font_size_calc(1320))
        );


    }

    //todo: delete
    public function home_page()
    {

        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSElement(
                CSSElementOfClass(ui::css_classes()->home_row1_left_col())->
                or_class(ui::css_classes()->home_row1_right_col())
            )->
            setFor480("80%")->setFor960("25%")
        );

        new ResponsiveMarginForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSElement(
                CSSElementOfClass(ui::css_classes()->home_row1_left_col())->
                or_class(ui::css_classes()->home_row1_right_col())
            )->
            setFor480("0px 10%")->setFor960("0px")
        );

        //middle column of row1
        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSElement(
                CSSElementOfClass(ui::css_classes()->home_row1_middle_col())
            )->
            setFor480("80%")->setFor960("50%")
        );
        new ResponsiveMarginForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSElement(
                CSSElementOfClass(ui::css_classes()->home_row1_middle_col())
            )->
            setFor480("0px 10%")->setFor960("0%")
        );

        //ROW 2
        //middle column of row1
        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSElement(
                CSSElementOfClass(ui::css_classes()->home_row2_left_col())->
                or_class(ui::css_classes()->home_row2_right_col())
            )->
            setForDefault("100%")->setFor480("50%")
        );
    }

    public function post_details_page(){
        //row1-left col
        new ResponsiveDisplayForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->post_details_page_row1_left_col())->
            setForDefault("none")->setFor960("inline-block")
        );
        
        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->post_details_page_row1_left_col())->
            setForDefault("100%")->setFor960("25%")
        );

        //row1-middle col

        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->post_details_page_row1_middle_col())->
            setForDefault("100%")->setFor960("50%")
        );

        //row1-right
        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->post_details_page_row1_right_col())->
            setForDefault("100%")->setFor960("25%")
        );

        //overall page layout
        new ResponsiveMarginForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->layout_for_post_details_page())->
            setForDefault("0%")->setFor480("0% 10%")->setFor960("0%")
        );

        //article details
        new ResponsiveMarginForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->post_details_page_center_stage())->
            setForDefault("4px 8px")->setFor960("4px 1.0em")
        );

    }

    public function page_footer()
    {
        //row1-col1
        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->page_footer_row1_col1())->
            setForDefault("100%")->setFor480("50%")->setFor600("40%")->setFor720("30%")->setFor960("25%")
        );
        //row1-col2
        new ResponsiveWidthForElement(
            (new ResponsiveValuesForCSSProperty())->
            setCSSClass(ui::css_classes()->page_footer_row1_col2())->
            setForDefault("100%")->setFor480("50%")->setFor600("60%")->setFor720("70%")->setFor960("75%")
        );
    }
}

class PageHeaderFactory{
    public static function home(){
        return new PageHeaderForHome();
    }
    public static function admin(){

        return new PageHeaderForAdmin();
    }
}

class StaticSectionIds{
    public function contact_info(){
        return __FUNCTION__;
    }    
}

class ExternalUrls{
    public function our_facebook_page(){
        return "https://www.facebook.com/romeos_wedding";
    }
    public function our_twitter_page(){
        return "https://twitter.com/romeos_wedding";
    }
    public function our_youtube_channel(){
        return "https://www.youtube.com/channel/romeos_wedding";
    }
}

class SectionBanners{
    private function icon_for_proposition(){
        $icon = new SmartSpan();
        $icon->width_auto();
        $icon->border("0.5em solid ".ui::colors()->section_descriptor())->margin_left("0.5em");

        $icon->border_bottom_color("transparent")->border_right_color("transparent")->border_left_color("transparent");
        return $icon;
    }
    private function createBanner($title, $proposition)
    {
        $layout = new SmartDiv();
        $layout->add_child(ui::html()->heading2()->add_child($title)->color("auto"));
        $layout->add_child(
            ui::html()->div()->add_child(
                //$this->icon_for_proposition().
                $proposition
            )->
            //background_color("darkslategrey")->
            background_color(ui::colors()->section_descriptor())->
            color("white")->border_radius("5px")->padding("0.5em")
        );
        $layout->line_height("1.0em")->background_color("#fff")->
        color("#444")->font_variant("initial")->margin_bottom("-0.8em");

        $layout->add_child(
            ui::html()->div()->add_child(
                $this->icon_for_proposition()
            )
        );

        $layout->padding("4px 0.5em")->margin_top("8px");
        return $layout;
    }
    #----------------
    public function about_us()
    {
        return
            $this->createBanner(
                "ABOUT US","Here is a brief about this website"
            );
    }

    public function contact_us()
    {
        return
            $this->createBanner(
                "CONTACT US","Get in touch with us so we can help you import a car, make a purchase, review a car or seller of your interest"
            );
    }

}