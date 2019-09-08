<?php

class MotokaPageWrapper extends SmartHTMLPage{
    /** @param HomePageAccessingData $page */
    public function __construct($page)
    {
        $page_html = $page."";
        $header = $page->header();
        $title = $page->get_title();
        $reader_for_current_user = $page->readerForCurrentUser();
        $page_bg_color = $page->get_background_color();

        parent::__construct();
        $this->set_title($title. " - Romeoswedding.com");
        $this->add_inline_css_to_body(new PageCSS());
        $this->add_inline_css_to_body(ResponsiveCSSForComponent::getAllAsOneString());
        //$this->add_child_to_body(ui::sections()->header());
        $this->add_child_to_body(
            (new SmartHeader())->add_child($header)
        );


        $this->add_child_to_body(
            ui::html()->div()->set_inner_html($page_html
                /*.
                ui::sections()->footer($reader_for_current_user)*/
            )
                ->add_class(ui::css_classes()->below_header_area())
        );



        //all content that is going to the dialog box - lightbox [shd be last and not positioned and hidden]
        $this->add_child_to_body(
            ui::html()->footer_form(ui::forms()->login(),ui::css_classes()->js_login_dialog())
        );
        $this->add_child_to_body(
            ui::html()->footer_form(ui::forms()->create_account(),ui::css_classes()->js_sign_up_dialog())
        );
        $this->add_child_to_body(
            ui::html()->footer_form(ui::forms()->edit_post_title2(),ui::css_classes()->js_edit_title_dialog())
        );
        $this->add_child_to_body(
            ui::html()->footer_form(ui::forms()->edit_post_content2(),ui::css_classes()->js_edit_content_dialog())
        );
        $this->add_child_to_body(
            ui::html()->footer_form(ui::forms()->edit_post_picture2(),ui::css_classes()->js_edit_picture_dialog())            
        );
        $this->add_child_to_body(
            ui::html()->div(
                "EDIT EXTENDED CONTENT DIALOG"//"".ui::forms()->edit_post_title()
            )->add_class(ui::css_classes()->js_edit_extended_post_content_dialog())->add_class(ui::css_classes()->chap_footer())
        );
        
        $this->add_child_to_body(
            ui::html()->div(
                new CollectionOfRomeoTabs(ui::readers()->admin_tabs(),2,"DO BROWSE",ui::html()->div())
            )->padding("1.0em 1.5em")->add_class(ui::css_classes()->js_global_menu_items())->visibility_hidden()
        );
        
        $this->add_style_to_body("background-color", $page_bg_color);
        $this->body()
            //->set_attribute('onScrollSetSlideUp',ui::class_selector()->chap_footer())
            ->set_attribute('onDblClickSetSlideUp',ui::class_selector()->chap_footer())
        ;


        //set body attributes
        //$this->body()->set_attribute("OnClickSetSlideUp",".".ui::css_classes()->chap_footer());

        //$this->body()->set_attribute("onload","javascript:alert('great');");

        //$this->add_inline_javascript_to_head(file_get_contents("js/load_indicator.js"));

        $this->add_js_libs();
        
        
    }

    private function add_js_libs()
    {
        $this->add_inline_javascript_to_body(file_get_contents("js/libs/jquery-3.3.1.min.js"));
        $this->add_inline_javascript_to_body(file_get_contents("js/libs/jevent10.js"));
        $this->add_inline_javascript_to_body(file_get_contents("js/libs/chapsap3.js"));


        $this->add_inline_javascript_to_body(file_get_contents("js/app/env.js"));
        $this->add_inline_javascript_to_body(file_get_contents("js/app/url.js"));
        $this->add_inline_javascript_to_body(file_get_contents("js/app/_interaction2.js"));
        $this->add_inline_javascript_to_body(file_get_contents("js/app/interaction.lightbox.js"));
    }

}
