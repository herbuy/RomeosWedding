<?php


class PageHeaderForHome0 extends SmartDiv{
    public function __construct()
    {
        parent::__construct();
        $this->add_child($this->column_list());
        //some black separator
        /*$this->add_child(ui::html()->div()->background_color(
            //ui::colors()->header_bg()->LTimes(0.9)
            ui::colors()->footer_bg()
        )->height("16px")->box_shadow("-5px -5px 15px ".ui::colors()->header_bg()->LTimes(0.8))
        );*/
    }

    private function icon_and_text($icon,$text)
    {
        $layout = new LayoutForNColumns();
        $layout->addNewColumn()->add_child($icon)->width_auto()->margin_right("1.0em")->vertical_align_middle();
        $layout->addNewColumn()->add_child($text)->width_auto()->vertical_align_middle();
        return $layout;
    }

    private function column_list()
    {
        return ui::html()->div(
          ui::html()->span("MENU | LOGO").
          ui::html()->span("SEARCH | LOGIN | SIGNUP")
        );
        $layout = new LayoutForNColumns();

        $layout->addNewColumn()->add_child("Menu")->width_auto();
        $layout->addNewColumn()->add_child($this->getHtmlForLogo())->margin_top("0.7em")->font_size("1.3em")->width_auto()->padding("0px 1.0em")->font_variant("initial");

        /*$this->addLink1($layout);
        $this->addLink2($layout);
        $this->addLink3($layout);
        $this->addLink4($layout);
        $this->addLink5($layout);
        $this->addLink6($layout);
        $this->addLink7($layout);
        $this->addLink8($layout);
        $this->addLink9($layout);
        $this->addLink10($layout);
        $this->addLink11($layout);
        $this->addLink12($layout);
        $this->addLink13($layout);
        $this->addLink14($layout);
        $this->addLink15($layout);
        $this->addLink16($layout);
        $this->addLink17($layout);
        $this->addLink18($layout);
        $this->addLink19($layout);
        $this->addLink20($layout);
        $this->addLink21($layout);
        $this->addLink22($layout);
        $this->addLink23($layout);
        $this->addLink24($layout);
        $this->addLink25($layout);*/
        #======================
        //$layout->addNewColumn()->add_child($this->fbLink())->width_auto();
        //$layout->addNewColumn()->add_child($this->twitterLink())->width_auto();
        //$layout->addNewColumn()->add_child($this->youtubeLink())->width_auto();

        return $layout->
        background_color(ui::colors()->header_bg())->
        color("#fff")->
        font_weight_bold()/*->
        set_style(
            "background",
            sprintf(
                "linear-gradient(280deg,%s,%s)",ui::colors()->primary(),"#fff"
            )
        )->background_image_url(ui::urls()->asset("header_bg_image.jpg"))*/
            ;
    }

    /**
     * @param \LayoutForNColumns $layout
     * @param \UrlForResource $url_object
     *  @param \SmartImage $icon_object
     */
    protected function addLink($layout,$url_object,$icon_object,$text){
        $layout->addNewColumn()->add_child(
            $url_object->toLink()->add_child(
                $this->icon_and_text(
                    $icon_object->width("2.0em"),
                    $text
                )
            )->add_class(ui::css_classes()->header_nav_link())
        )->width_auto();
    }

    private function logo()
    {
        return ui::urls()->home()->toLink()->add_child(
            ui::images()->logo()->width("20em")
        )->add_class(ui::css_classes()->header_nav_link());
    }

    private function fbLink()
    {
        return (new SmartLink())->
        set_href(ui::external_urls()->our_facebook_page())->
        add_child(
            ui::images()->fb_icon()->width("3.0em")->margin("4px")
        );
    }

    private function twitterLink()
    {
        return (new SmartLink())->
        set_href(ui::external_urls()->our_twitter_page())->
        add_child(
            ui::images()->twitter_icon()->width("3.0em")->margin("4px")
        );
    }

    private function youtubeLink()
    {
        return (new SmartLink())->
        set_href(ui::external_urls()->our_youtube_channel())->
        add_child(
            ui::images()->youtube_icon()->width("3.0em")->margin("4px")
        );
    }

    protected function addLink1($layout)
    {
        $this->addLink($layout, ui::urls()->home(), ui::images()->home_icon_white(), "Home");
    }

    protected function addLink2($layout)
    {
        //$this->addLink($layout, ui::urls()->about(), ui::images()->about_icon_white(), "About");
    }

    protected function addLink3($layout)
    {
        return "";
    }

    protected function addLink4($layout)
    {
        //$this->addLink($layout, ui::urls()->contacts_us(), ui::images()->contact_icon_white(), "Contact Us");
    }

    protected function addLink5($layout)
    {
        $this->addLink($layout, ui::urls()->profiles(), ui::images()->about_icon_white(), "Service Providers");
    }
    protected function addLink6($layout)
    {
        $this->addLink($layout, ui::urls()->products(), ui::images()->about_icon_white(), "Buy or Hire");
    }
    protected function addLink7($layout)
    {
        //$this->addLink($layout, ui::urls()->facilities(), ui::images()->about_icon_white(), "Events");
    }

    protected function addLink8($layout)
    {
        $this->addLink($layout, ui::urls()->articles(), ui::images()->about_icon_white(), "Write Article");
    }

    protected function addLink9($layout)
    {        
        $this->addLink($layout, ui::urls()->work(), ui::images()->about_icon_white(), "Create Page");
    }
    protected function addLink10($layout)
    {
        $this->addLink($layout, ui::urls()->events(), ui::images()->about_icon_white(), "Add Status Update");
    }
    protected function addLink11($layout)
    {
        $this->addLink($layout, ui::urls()->events(), ui::images()->about_icon_white(), "Login");
    }
    protected function addLink12($layout)
    {
        $this->addLink($layout, ui::urls()->events(), ui::images()->about_icon_white(), "Sign Up");
    }
    protected function addLink13($layout)
    {
    }
    protected function addLink14($layout)
    {
    }
    protected function addLink15($layout)
    {
    }
    protected function addLink16($layout)
    {
    }
    protected function addLink17($layout)
    {
    }
    protected function addLink18($layout)
    {
    }
    protected function addLink19($layout)
    {
    }
    protected function addLink20($layout)
    {
    }
    protected function addLink21($layout)
    {
    }
    protected function addLink22($layout)
    {
    }
    protected function addLink23($layout)
    {
    }
    protected function addLink24($layout)
    {
    }
    protected function addLink25($layout)
    {

    }

    private function getHtmlForLogo()
    {
        //return $this->logo()

        $logo = ui::html()->span()->add_child("R")->width_auto() .
        ui::html()->span()->add_child("W")->width_auto()->color("#000") .
        ui::html()->span()->add_child(".com")->width_auto();

        return ui::urls()->home()->toLink()->add_child(
            $logo
        )->color(ui::colors()->white())->font_family("georgia,serif");
    }

}

class PageHeaderForHome extends SmartDiv{
    public function __construct()
    {
        parent::__construct();

        $this->add_child(
            $this->theSearchBar()->margin_top("-0.3em")->box_shadow("0px 0px 0px #ddd")->border_bottom("1px solid #ddd")->padding_bottom("4px")->padding_top("4px")->add_class(ui::css_classes()->chap_search_bar_toggle_item())->background_color("#fff")->display_none()
            .
            ui::html()->div(
                $this->default_header()
                .
                $this->alternative_header_1()->margin_top("-0.9em")
            )->add_class(ui::css_classes()->chap_search_bar_toggle_item())
        );
    }

    private function icon_and_text($icon,$text)
    {
        $layout = new LayoutForNColumns();
        $layout->addNewColumn()->add_child($icon)->width_auto()->margin_right("1.0em")->vertical_align_middle();
        $layout->addNewColumn()->add_child($text)->width_auto()->vertical_align_middle();
        return $layout;
    }

    protected function default_header()
    {
        return ui::html()->div(

            //logo area
            ui::html()->div(
                ui::html()->span($this->getMenu())
                    ->width_auto()
                    ->margin_right("0.5em")
                    ->set_attribute('onClickSetFadeIn',ui::fragments()->chap_alternative_header1())
                .
                ui::html()->span($this->getHtmlForLogo())
                    ->width_auto()
                    ->margin_right("1.0em")
                    ->vertical_align_middle()
                .
                ui::html()->span("Search")->margin_top("-0.5em")
                    ->width_auto()
                    ->cursor_pointer()
                    ->vertical_align_middle()
                    ->color("#fff")
                    ->set_attribute("onClickSetSlideToggle", ui::class_selector()->chap_search_bar_toggle_item())
                    ->float_right()                    
                    ->set_attribute("onClickSetFocus","input[name=search_query]")


            )->vertical_align_middle()->width_auto()->add_class(ui::css_classes()->page_header_col_1())->margin_bottom("8px")



        )
            ->padding("1.0em")
            ->background_color(ui::colors()->header_bg())
            ->color("#fff")
            ->font_weight_bold()
            ->position_relative()
            ;

    }


    protected function alternative_header_1()
    {
        return ui::html()->alternative_header1(
            
            ui::html()->span('Login')                
                ->width_auto()
                ->cursor_pointer()
                ->color('white')
                ->font_weight_bold()
                ->margin_right('1.0em')
                //->set_attribute("onClickSetFocus","[name=email_address]")
                ->set_attribute(
                    'onClickSetEffects',
                    join(';',[
                        "slideUp:".ui::class_selector()->chap_footer(),
                        "slideDown:".ui::class_selector()->js_login_dialog(),
                        "focus:[name=email_address]"

                    ]))
            .
            ui::html()->span('Sign Up')                
                ->width_auto()
                ->cursor_pointer()
                ->color('white')
                ->font_weight_bold()
                ->set_attribute(
                    'onClickSetEffects',
                    join(';',[
                        "slideUp:".ui::class_selector()->chap_footer(),
                        "slideDown:".ui::class_selector()->js_sign_up_dialog()
                    ]))
        );


    }

    /**
     * @param \LayoutForNColumns $layout
     * @param \UrlForResource $url_object
     *  @param \SmartImage $icon_object
     */
    protected function addLink($layout,$url_object,$icon_object,$text){
        $layout->addNewColumn()->add_child(
            $url_object->toLink()->add_child(
                $this->icon_and_text(
                    $icon_object->width("2.0em"),
                    $text
                )
            )->add_class(ui::css_classes()->header_nav_link())
        )->width_auto();
    }

    private function logo()
    {
        return ui::urls()->home()->toLink()->add_child(
            ui::images()->logo()->width("20em")
        )->add_class(ui::css_classes()->header_nav_link());
    }

    private function fbLink()
    {
        return (new SmartLink())->
        set_href(ui::external_urls()->our_facebook_page())->
        add_child(
            ui::images()->fb_icon()->width("3.0em")->margin("4px")
        );
    }

    private function twitterLink()
    {
        return (new SmartLink())->
        set_href(ui::external_urls()->our_twitter_page())->
        add_child(
            ui::images()->twitter_icon()->width("3.0em")->margin("4px")
        );
    }

    private function youtubeLink()
    {
        return (new SmartLink())->
        set_href(ui::external_urls()->our_youtube_channel())->
        add_child(
            ui::images()->youtube_icon()->width("3.0em")->margin("4px")
        );
    }

    protected function addLink1($layout)
    {
        $this->addLink($layout, ui::urls()->home(), ui::images()->home_icon_white(), "Home");
    }

    protected function addLink2($layout)
    {
        //$this->addLink($layout, ui::urls()->about(), ui::images()->about_icon_white(), "About");
    }

    protected function addLink3($layout)
    {
        return "";
    }

    protected function addLink4($layout)
    {
        //$this->addLink($layout, ui::urls()->contacts_us(), ui::images()->contact_icon_white(), "Contact Us");
    }

    protected function addLink5($layout)
    {
        $this->addLink($layout, ui::urls()->profiles(), ui::images()->about_icon_white(), "Service Providers");
    }
    protected function addLink6($layout)
    {
        $this->addLink($layout, ui::urls()->products(), ui::images()->about_icon_white(), "Buy or Hire");
    }
    protected function addLink7($layout)
    {
        //$this->addLink($layout, ui::urls()->facilities(), ui::images()->about_icon_white(), "Events");
    }

    protected function addLink8($layout)
    {
        $this->addLink($layout, ui::urls()->articles(), ui::images()->about_icon_white(), "Write Article");
    }

    protected function addLink9($layout)
    {
        $this->addLink($layout, ui::urls()->work(), ui::images()->about_icon_white(), "Create Page");
    }
    protected function addLink10($layout)
    {
        $this->addLink($layout, ui::urls()->events(), ui::images()->about_icon_white(), "Add Status Update");
    }
    protected function addLink11($layout)
    {
        $this->addLink($layout, ui::urls()->events(), ui::images()->about_icon_white(), "Login");
    }
    protected function addLink12($layout)
    {
        $this->addLink($layout, ui::urls()->events(), ui::images()->about_icon_white(), "Sign Up");
    }
    protected function addLink13($layout)
    {
    }
    protected function addLink14($layout)
    {
    }
    protected function addLink15($layout)
    {
    }
    protected function addLink16($layout)
    {
    }
    protected function addLink17($layout)
    {
    }
    protected function addLink18($layout)
    {
    }
    protected function addLink19($layout)
    {
    }
    protected function addLink20($layout)
    {
    }
    protected function addLink21($layout)
    {
    }
    protected function addLink22($layout)
    {
    }
    protected function addLink23($layout)
    {
    }
    protected function addLink24($layout)
    {
    }
    protected function addLink25($layout)
    {

    }

    private function getHtmlForLogo()
    {
        //return $this->logo()

        $logo = ui::html()->span()->add_child("Romeos")->width_auto() .
            ui::html()->span()->add_child("Wedding")->width_auto()->color("#000") .
            ui::html()->span()->add_child(".com")->width_auto();

        return ui::urls()->home()->toLink()->add_child(
            $logo
        )->color(ui::colors()->white())->font_family("georgia,serif");
    }

    /**
     * @return string
     */
    private function getMenu()
    {
        return ui::html()->span(
            ui::html()->div()->height("4px")->background_color("white")
            .
            ui::html()->div()->font_size("0px")->height("4px")->background_color("white")->margin_top("4px")->margin_bottom("4px")
            .
            ui::html()->div()->font_size("0px")->height("4px")->background_color("white")
        )->toLink(ui::urls()->home())
            ->set_attribute('onclick','return false;')
            ->display_inline_block()
            ->width_auto()
            ->width("2.0em")
            ->add_class(ui::css_classes()->js_global_menu_btn());

    }

    private function theSearchBar()
    {
        return ui::html()->div(
            ui::html()->form(
                ui::html()->span(
                    ui::html()->span("&larr;")->color(ui::colors()->header_bg())
                        ->font_weight_bold()                        
                        ->cursor_pointer()
                        //->margin_right("-1.0em")
                        ->text_align_right()
                        ->set_attribute("onClickSetSlideToggle", ui::class_selector()->chap_search_bar_toggle_item())
                )->width("10%")
                .
                ui::html()->span(
                    ui::browser_fields()->search_query()->toSearchInput()
                        ->placeholder("Search for...")                        
                        ->width("90%")
                        ->border("0px")
                    .
                    ui::html()->submit_button("Search")
                        ->width("10%")                        
                        ->set_attribute("onClickSetEffects","focus:[name=search_query]")

                )->width("90%")
            )->use_get_method()->set_attribute("action",ui::urls()->search())

        )->position_fixed()->display_inline_block()->width_100percent();
    }

}

class PageHeaderForAdmin extends PageHeaderForHome{
    protected function alternative_header_1()
    {
        return ui::html()->alternative_header1(

            "".ui::forms()->logout()->color('white')->display_inline_block()->width_auto()->font_weight_bold()

        );


    }
    protected function addLink1($layout)
    {
        $this->addLink($layout, ui::urls()->home(), ui::images()->home_icon_white(), "Home");

    }

    protected function addLink2($layout)
    {
        $this->addLink($layout, ui::urls()->adminPage(), ui::images()->home_icon_white(), "Admin");
        //$this->addLink($layout, ui::urls()->adminViewPosts(), ui::images()->about_icon_white(), "Drafts");
    }

    protected function addLink3($layout)
    {
        $this->addLink($layout, ui::urls()->adminViewPosts(), ui::images()->about_icon_white(), "Unpublished");

        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Research & Ideation");
    }

    protected function addLink4($layout)
    {
        $this->addLink($layout, ui::urls()->adminViewPostsPublished(), ui::images()->about_icon_white(), "Published");
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Creation");
    }
    protected function addLink5($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Editing");
    }
    protected function addLink6($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Publishing");
    }

    protected function addLink7($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Auditing & Statistics");
        //return "";//$this->addLink($layout, ui::urls()->adminViewPostsPublished(), ui::images()->about_icon_white(), "Published");
    }
    protected function addLink8($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Engagement - Views, Likes, Comments");
    }
    protected function addLink9($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Memes");
    }
    protected function addLink10($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Videos - and Visual Content");
    }
    protected function addLink11($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Photos");
    }
    protected function addLink12($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Infographics");
    }
    protected function addLink13($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Content Marketing");
    }
    protected function addLink14($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Credibility - has author");
    }
    protected function addLink15($layout)
    {
        $this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Outdated");
    }
    protected function addLink16($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Guest Posts");
    }
    protected function addLink17($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Expert Round Up");
    }

    protected function addLink18($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Inbound Content - About Us, Policies");
    }

    protected function addLink19($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Content Mix");
    }

    protected function addLink20($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Facts & Figures");
    }
    protected function addLink21($layout)
    {
        $this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Onboarding Content");
    }
    protected function addLink22($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Creation Plan/Map/Schedule");
    }
    protected function addLink23($layout)
    {
        //$this->addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Audience - by browser etc");
    }
    
    /*protected function addLink8($layout)
    {
        $this-
>addLink($layout, ui::urls()->statistics(), ui::images()->about_icon_white(), "Tools");
    }*/
}

class PageHeaderForLogin extends PageHeaderForHome{

}


class PageHeaderForPost extends PageHeaderForHome{
    private $content;
    public function __construct($content)
    {
        $this->content;
        parent::__construct();
    }

    protected function default_header()
    {
        return ui::html()->div($this->content)->background_color(ui::colors()->header_bg())->color("#fff")->font_weight_bold();        
    }


   

    

   

}