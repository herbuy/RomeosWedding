<?php

class SectionForReviewsAndComments extends SmartDiv{
    public function __construct()
    {
        parent::__construct();        
        $this->border("1px solid #ccc")->margin_top("-1px")->padding("1.0em");

        $item = new SmartDiv();
        $item->add_child("this is some text for the post in the list")->padding("0.5em 0em")->border_bottom("1px solid #eee");
        $this->add_child($item->repeatNtimes(5)->asDiv()->font_weight_normal());

    }
}

class SectionForPreNav extends LayoutForNColumns{
    public function __construct()
    {
        parent::__construct();


        $this->addNewColumn()->add_child(ui::images()->logo()->width_100percent()->toLink(ui::urls()->home())->display_block())->width("45%")->display_inline_block()->vertical_align_top()->margin_top("-30px")->margin_left("-30px");
        $this->addNewColumn()->add_child(ui::sections()->searchForCars())->width("55%")->display_inline_block()->vertical_align_top();
        return $this;

    }
}

class SectionForTopNav extends SmartDiv{
    public function __construct()
    {
        parent::__construct();

        $recent_views = new SmartSpan();
        $recent_views->add_child("Menu item")->background_color("#333")->color("#fff")->font_weight_bold();
        $recent_views->border("1px solid #ccc")->padding("1.0em")->display_inline_block()->margin_top("-1px")->margin_left("-1px");
        $result = $recent_views->repeatNtimes(5);
        $wrapper = $result->asDiv();
        $wrapper->margin_left("1px")->margin_bottom("8px");
        $this->add_child($wrapper);

    }
}

class SectionForPostArticles extends SmartDiv{
    public function __construct()
    {
        parent::__construct();
        $this->add_child(ui::links()->adminPage()->add_child("Post or Update content"));
        $this->border("1px solid #ccc")->padding("1.0em")->margin_top("-1px")->background_color("#ffc");
    }
}

class SectionForTheFooter extends SmartFooter{
    
    public function __construct($reader_for_current_user)
    {
        parent::__construct();

        $row = (new LayoutForTwoColumns());
        $row->leftColumn()->add_class(ui::css_classes()->page_footer_row1_col1());
        $row->rightColumn()->add_class(ui::css_classes()->page_footer_row1_col2());

        $row->rightColumn()->add_child(
            ui::html()->div()->add_child(
                ui::html()->heading3()->add_child("Contacts")->set_id(ui::section_ids()->contact_info()).
                ui::sections()->contact_info()
            )

        )->margin_bottom("8px")->padding_bottom("8px");

        $row->leftColumn()->add_child($this->footerLinks($reader_for_current_user));

        $row_2 = $this->copyright_info()->text_align_center();

        $this->add_child($row);
        $this->add_child($row_2);
        
        $this->add_class(ui::css_classes()->page_footer());
    }

    private function copyright_info()
    {
        return ui::html()->div()->add_child(
            "Copyright &copy; 2018 - www.romeoswedding.com. All Rights Reserved"
        )->border_top("0px solid #eee")->padding_top("8px");
    }

    /** @param \ReaderForValuesStoredInArray $reader_for_current_user */
    private function footerLinks($reader_for_current_user)
    {
        $links = new LayoutForNRows();
        $links->addNewRow()->add_child_if(
            $reader_for_current_user->email_address(),
            ui::links()->adminPage()->add_child("Control Panel")
        );
        $links->addNewRow()->add_child_if_else(
            $reader_for_current_user->email_address(),
            ui::forms()->logout(),
            ui::links()->login()->add_child("Login")->add_class(ui::css_classes()->footer_link())
        );
        $links->addNewRow()->add_child(ui::urls()->createAccountPage()->toLink("Create Account")->add_class(ui::css_classes()->footer_link()));
        $links->addNewRow()->add_child(ui::urls()->about()->toLink("About this site")->add_class(ui::css_classes()->footer_link()));
        $links->addNewRow()->add_child(ui::urls()->contacts_us()->toLink("Contact Us")->add_class(ui::css_classes()->footer_link()));
        return $links;
    }
}

class SectionForAdminNavigationBox extends LayoutForNRows{
    public function __construct()
    {
        parent::__construct();

        $this->addNewRow()->add_child(ui::html()->heading3()->add_child("ADD NEW"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("Car Review"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("Exporter Review"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("Other Post"));

        $this->addNewRow()->add_child(ui::html()->heading3()->add_child("VIEW"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("Posts"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("Statistics"));
        //$this->addNewRow()->add_child(ui::);
    }
}

class SectionForTotalContent extends LayoutForNRows{
    public function __construct()
    {
        parent::__construct();

        $this->addNewRow()->add_child(ui::html()->heading3()->add_child("Right Now"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("68 Posts"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("39 pages"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("12 Categories"));
        $this->addNewRow()->add_child(ui::links()->manage_posts()->add_child("7 Tags"));        
    }
}

class SectionForArticleDetails extends LayoutForNRows{
    /** @param \ReaderForValuesStoredInArray $reader */
    public function __construct($reader,$reader_for_photo_credits)
    {
        
        $section_id_algos = (new FactoryForSectionAlgorithms($reader->section_id()))->implementor();

        ui::exception()->throwIfNotReader($reader);
        parent::__construct();


        $left_image = $section_id_algos->leftImage($reader);

        $this->addNewRow()->add_child(
            ui::html()->heading1()->add_child($reader->title())->line_height("1.1em")
            .
            ui::html()->secondary_text()->add_child(
                ui::date_from_timestamp($reader->timestamp())
            )->margin_bottom("4px")
            .
            ui::html()->div()->add_child_if(
                $left_image,
                $left_image . $this->credits($reader_for_photo_credits)
            )
        )->add_class(ui::css_classes()->romeo_department())->border_bottom_style("solid !important");


        $this->addNewRow()->add_child(ui::html()->div()->add_child(
            
            new SmartAutoStyledText($reader->content())
        
        )->line_height("1.3em")->margin_top("8px")
        )->add_class(ui::css_classes()->paragraph_text());
        
    }

    protected function get_max_width_for_image()
    {
        return "100%";
    }

    private function credits($reader_for_photo_credits)
    {
        $text = new ListOfPhotoCreditsForAPost($reader_for_photo_credits);
        return ui::html()->div()->add_child($text)->line_height("1.1em")->margin_bottom("1.0em")->margin_top("0.5em")->opacity("0.8");
    }
}
class SectionForArticleDetailsInPreviewMode extends SectionForArticleDetails{
    protected function get_max_width_for_image()
    {
        return "200px";
    }
}


class GlobalNavigationForAdmin extends SmartDiv{
    private function wrap_text($string)
    {
        $inner_text = ui::html()->span()->add_child($string)->width_auto();

        $list_item = new SmartListItem();
        $list_item->add_child($inner_text);
        $list_item
            ->set_style("list-style-image",
                sprintf("url(%s)", ui::urls()->asset("admin_item.png"))
            )
            ->set_style("list-style-position","outside")
        ;
        $list_item->margin_left("3.5em")->width_auto()->padding("0.5em 0px")->font_variant("all-small-caps");
        return $list_item;
        
    }
    public function __construct()
    {
        parent::__construct();

        $thi = new LayoutForNColumns();

        //$this->addNewRow()->add_child("MORE OPTIONS");
        $this->add_child(
            ui::html()->div()->add_child(
                ui::h2_with_contrast_colors("FULL","MENU").
                ui::html()->div()->add_child($thi)->
                background_color("#fff")->border("1px solid #ccc")->
                border_radius("0.5em")->padding_top("0.5em")
            )->background_color(ui::colors()->form_bg())->
            add_class(ui::css_classes()->element_with_box_shadow())->
            border_radius("1.0em")->
            border(ui::_1px_solid_form_border())->padding("0.5em 2.0em")->padding_bottom("1.5em")
        )->max_width("800px")->margin_auto();

    }

}

class SectionForEditPost extends LayoutForTwoColumns{
    public function __construct($reader_for_post,$reader_for_extended_post_tokens)
    {
        ui::exception()->throwIfNotReader($reader_for_post);
        ui::exception()->throwIfNotReader($reader_for_extended_post_tokens);
        
        parent::__construct();

        $this->leftColumn()->width("66%");
        $this->rightColumn()->width("33%");
        
        $domain_object = ui::domain_object($reader_for_post);


        $this->leftColumn()->add_child($domain_object->get_item_type_as_editor_banner())->background_color("#fff");
        $this->leftColumn()->add_child(
            $this->getLeftContent($reader_for_post, $reader_for_extended_post_tokens)
                ->add_class(ui::css_classes()->element_with_box_shadow())->border(ui::_1px_solid_form_border())->margin("1.0em 0.1em")
        );
        

        $this->rightColumn()->add_child(
            $this->getRightContent($reader_for_post)
                ->add_class(ui::css_classes()->element_with_box_shadow())->border(ui::_1px_solid_form_border())->margin("1.0em 0.1em")
        );
    }

    //todo: override depending on type of content
    private function getLeftContent($reader_for_post, $reader_for_extended_post_tokens)
    {
        return ui::html()->div()->add_child(
            ui::sections()->article_details_in_preview_mode($reader_for_post).
            ui::sections()->extended_post_tokens($reader_for_extended_post_tokens)
        )
            ->add_class(ui::css_classes()->card_background())
            ->add_class(ui::css_classes()->card_border_bottom())
            ->add_class(ui::css_classes()->card_border_right())
            ->add_class(ui::css_classes()->card_margin())
            ->add_class(ui::css_classes()->card_padding());
    }

    //todo: override depending on type of content
    private function getRightContent($reader_for_post)
    {
        return ui::html()->div()->add_child(
            ui::sections()->actions_for_edit_post($reader_for_post)
        )
            ->add_class(ui::css_classes()->card_background())
            ->add_class(ui::css_classes()->card_border_bottom())
            ->add_class(ui::css_classes()->card_border_right())
            ->add_class(ui::css_classes()->card_margin())
            ->add_class(ui::css_classes()->card_padding());
    }
}
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
class SectionAlgorithms{
    //todo: override SectionAlgorithms to provide different tool bars for different types of posts
    function linkForAdminEditPostTitle($file_name){
        return ui::links()->adminEditPostTitle($file_name)->add_child(
            ui::images()->edit_icon()->max_width("32px")->vertical_align_middle().
            "&rarr;Change Title or SECTION"
        );
    }
    function linkForAdminEditPostIntro($file_name){
        return  ui::links()->adminEditPostContent($file_name)->add_child(
            ui::images()->edit_icon()->max_width("32px")->vertical_align_middle().
            "&rarr;Edit Introduction"
        );
    }
    function linkForAdminEditPostFullDetails($file_name){
        return ui::links()->adminEditExtendedPostContent($file_name)->add_child(
            ui::images()->edit_icon()->max_width("32px")->vertical_align_middle().
            "&rarr;Edit full details"
        );
    }
    function formForEditPostPicture($reader_for_post){
        return ui::forms()->edit_post_picture($reader_for_post);
    }
    
    function formForEditPostVideo($reader_for_post){}

    function leftImage($reader_for_post){
        return $reader_for_post->picture_file_name() ? ui::urls()->view_image($reader_for_post->picture_file_name())->toImage() : "No Image";
    }

}
class SectionAlgorithmsForCarVideos extends SectionAlgorithms{
    function linkForAdminEditPostIntro($file_name){}
    function linkForAdminEditPostFullDetails($file_name){}
    function formForEditPostPicture($reader_for_post){}

    function formForEditPostVideo($reader_for_post){
        return ui::forms()->edit_post_video($reader_for_post);
    }
    
    /** @param \ReaderForValuesStoredInArray $reader_for_post */
    function leftImage($reader_for_post){        
        return new LinkToYoutubeVideoUsingIFrame($reader_for_post->youtube_video_id());
    }
}

class SectionAlgorithmsForCarPictures extends SectionAlgorithms{
    function linkForAdminEditPostIntro($file_name){}
    function linkForAdminEditPostFullDetails($file_name){}
    //function formForEditPostPicture($reader_for_post){}

}

class FactoryForSectionAlgorithms{
    private $implementor;

    /** @return SectionAlgorithms */
    public function implementor(){
        return $this->implementor;
    }
    public function __construct($section_id)
    {
        switch ($section_id){
            /*case app::section_ids()->car_videos():
                $this->implementor = new SectionAlgorithmsForCarVideos();
            break;*/
            
            default:
                $this->implementor =  new SectionAlgorithms();
            break;
        }
    }
}
//todo: override depending on type of content
class ListOfActionsForEditPost extends LayoutForNRows{
    public function __construct($reader_for_post)
    {
        ui::exception()->throwIfNotReader($reader_for_post);
        parent::__construct();
        
        $section_algos = (new FactoryForSectionAlgorithms($reader_for_post->section_id()))->implementor();


        $file_name = $reader_for_post->file_name();


        $title_gui = $section_algos->linkForAdminEditPostTitle($file_name);
        $this->addNewRowIf($title_gui)->add_child($title_gui)->border_bottom(ui::_1px_solid_form_border())->padding_bottom("0.5em")->margin_bottom("0.5em");

        $intro_gui = $section_algos->linkForAdminEditPostIntro($file_name);
        $this->addNewRowIf($intro_gui)->add_child($intro_gui)->border_bottom(ui::_1px_solid_form_border())->padding_bottom("0.5em")->margin_bottom("0.5em");

        $full_details_gui = $section_algos->linkForAdminEditPostFullDetails($file_name);
        $this->addNewRowIf($full_details_gui)->add_child($full_details_gui)->border_bottom(ui::_1px_solid_form_border())->padding_bottom("0.5em")->margin_bottom("0.5em");

        $form_for_edit_post_picture = $section_algos->formForEditPostPicture($reader_for_post);
        $this->addNewRowIf($form_for_edit_post_picture)->add_child($form_for_edit_post_picture)->border_bottom("8px solid #eee")->margin_bottom("16px");

        $form_for_edit_post_video = $section_algos->formForEditPostVideo($reader_for_post);
        $this->addNewRowIf($form_for_edit_post_video)->add_child($form_for_edit_post_video)->border_bottom("8px solid #eee")->margin_bottom("16px");


        $this->addNewRow()->add_child(
            ui::forms()->publish_post($file_name)
        );

        $this->addNewRow()->add_child(
            ui::forms()->delete_post($file_name)
        );


    }
}
