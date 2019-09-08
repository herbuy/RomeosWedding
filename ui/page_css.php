<?php
class PageCSSBaseClass{
    private $css_element_array = array();
    private $media_queries_array = array();
    public function __toString()
    {
        return sprintf("%s %s",
            join(" ",$this->css_element_array), join(" ",$this->media_queries_array)
        );
    }

    public function __construct(){
        $this->callAddCSSForVariousCSSElements();
        $this->instantiateResponsiveCSSClasses();
    }
    /** @param \CSSElement $css_element */
    public function addCSS($css_element){
        $this->css_element_array[] = $css_element->getFullDeclarationAsString();
        return $this;
    }
    public function addCSSFor($css_element){
        $this->addCSS($css_element);
    }

    protected function callAddCSSForVariousCSSElements()
    {
    }

    protected function instantiateResponsiveCSSClasses()
    {
    }

}

class PageCSS extends PageCSSBaseClass{
    protected function callAddCSSForVariousCSSElements(){

        $this->addCSSForNthChild();

        //=========
        $this->addBasicCSS();
        $this->addCardCSS();
        $this->addRemeoCSS();
        $this->responsiveCSS();
    }

    private function addBasicCSS()
    {
        $this->addCSS(
            CSSElementOfType("*")->width_100percent()->margin("0px")->border("0px")->padding("0px")
                ->position_relative()
        );

        $this->addCSS(
            CSSElementOfType("a")
                ->text_decoration_none()
                ->color(ui::colors()->link_fg())
                ->font_variant("initial")
        );

        $this->headerLinks();
        $this->addCSS(
            CSSElementOfType("a")->and_class(ui::css_classes()->footer_link())->
            color(ui::colors()->link_fg())->color("#fff")->font_variant("all-small-caps")->border_bottom("1px solid orange")
        );
        
        $this->addCSS(
            CSSElementOfType("a")->subtype("hover")->color(ui::colors()->link_complement())->font_weight_bold()
        );

        $this->addCSS(
            CSSElementOfType("div")->or_type("p")->or_type("form")->
            or_type("h1")->or_type("h2")->or_type("h3")->or_type("h4")->or_type("h5")->or_type("h6")->
            width_auto()
        );

        $this->addCSS(
            CSSElementOfType("h1")->or_type("h2")->or_type("h3")->or_type("h4")->or_type("h5")->or_type("h6")
                ->margin("0px")
                ->line_height("1.1em")->margin_bottom("0.2em")
        );

        //alternative style for body
        $this->addCSS(
            CSSElementOfType("body")->
            margin("auto")->
            //font_family("verdana,sans-serif")->
            //font_family("cambria,georgia,serif")->
            font_family("helvetica,arial,garamond,calibri,segoe UI,helvetica,arial,sans-serif")->
            font_size(ui::font_sizes()->body()." !important")->
            line_height("2.0em")->font_variant("all-small-caps")->
            //background_color(ui::colors()->bg())->
            color(ui::colors()->body_color())->
            overflow_x_hidden()->
            //background_color(ui::colors()->header_bg()->STimes(0.4))/*->
            background_image_url(ui::urls()->asset(ui::assets()->bg()))
        );

        $this->addCSS(
            CSSElementOfType("iframe")->
            border("0px solid grey")->background_color("#000")->color("#fff")
        );

        $this->addCSS(
            CSSElementOfType("span")->
            display_inline_block()->vertical_align_top()->width_100percent()
        );
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->paragraph_text())->
            font_variant("initial")
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->time_posted())
                ->line_height_initial()
                ->font_weight_normal()->color(ui::colors()->link_complement())->font_variant("initial")->margin_bottom("4px")->font_weight_bold()
        );


        $this->addCSS(
            CSSElementOfType("span")->after_type("br")->after_type("br")->nth_child(2)->
            background_color("#eee")
        );

        /*$this->addCSS(
            CSSElementOfType("img")->
            border_radius("5px")
        );*/

        $this->inputs();

        $this->addCSS(
            CSSElementOfType("select")->inside_type("*")->
            cursor_pointer()->height("3.0em")
        );

        $this->addCSS(
            CSSElementOfType("h1")->inside_type("*")->
            width_auto()->
            margin("0px")->
            color(ui::colors()->h1())
        );


        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->element_with_box_shadow())->inside_type("*")
                ->box_shadow("0px 0px 15px ".ui::colors()->footer_bg()->mix(ui::colors()->white(),60))
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->post_kicker())->inside_type("*")
                ->color(ui::colors()->header_bg())->width_auto()
                ->padding("0px 0.0em")->font_weight_bold()
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->error_message_host())->inside_type("*")
                ->background_color("#ff7575")->border("1px solid #dd5555")
                ->padding("8px 1.0em")->border_radius("5px")
                ->margin_bottom("1.0em")->box_shadow("5px 5px 5px #aaa")
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->item_host_for_admin_navigation())->inside_type("*")
                ->width("33.3%")->min_width("200px")

        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->page_footer())->
            background_color(ui::colors()->footer_bg())->
            color("white")->
            padding("1.0em 0.5em")->
            font_variant("initial")->
            font_family("arial,sans-serif")->line_height("1.2em")
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->link_targeting_iframe_in_edit_post())->
            width_auto()->
            padding_right("0.5em")->
            border_right("1px dashed #ddd")->
            margin_right("0.5em")
        );


        //TODO: fix elements
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->current_tab())
                ->color("orange")
                ->font_weight_bold()
                ->border_bottom("2px solid orange")
        );

        $this->addCSS(
            CSSElementOfType("header")
                //->border("1px solid red")
                ->position("fixed")
                ->top("0px")
                //->height("16%")
                ->z_index("5")
                ->overflow_hidden()
        );
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->below_header_area())
                ->height_100percent()
                //->border("1px solid blue")
                ->z_index(1)
                ->border("1px solid transparent")//hack
                //->position("absolute")
                //->width_100percent()//->top("16%")
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_top_tabs())
                ->display_inline_block()
                ->padding("1.0em")
                ->width_auto()->color("white")
                ->font_weight_bold()
                ->border_bottom("5px solid transparent")
        
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_footer())
                ->position("fixed")
                ->z_index(10)
                ->bottom("0px")
                ->left("0px")
                ->width_100percent()                
                ->background_color(ui::colors()->footer_bg())
                ->display_none()
        );
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_floating_button_host())
                ->position("fixed")
                ->z_index(10)
                ->bottom("1em")
                ->right("1em")
                ->display_inline_block()
                ->width_auto()
                ->background_color("transparent")
                ->border_radius("50%")                
                
        );
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_footer_floating_button())
                ->width_auto()
                ->line_height("1.5em")
                ->padding("0.5em")
                ->border_radius("50%")
                ->width("1.5em")
                ->height("1.5em")
                ->text_align_center()
                ->z_index("5")
                ->cursor_pointer()
                ->background_color(ui::colors()->floating_button_bg_color())
                ->color("white")
                ->font_weight_bold()
                ->float_right()
                ->box_shadow("0px 0px 5px ".ui::colors()->floating_button_bg_color()->STimes(0.2))
        );
        
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_footer_product_category_menu_item_content())
                ->line_height("initial")
                ->font_variant("initial")
                //->background_color("#eee")
                ->margin("1.0em")
                ->padding("4px")
                ->text_align_center()
                ->border_radius("5px")
        );
        
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_one_line_text())
                ->height("1.1em")
                ->overflow_hidden()
                ->white_space_nowrap()
                ->text_overflow_ellipsis()
        );
        
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_img_in_product_list())
                ->background_position_center()
                ->background_size_contain()
                ->background_repeat_no_repeat()
                ->height("3.0em")
                
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_white_bg())
                ->background_color("#fff")
            
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_entered_selectable_item())
                ->background_color(ui::colors()->ws_highlighted_item()->LTimes(0.9))
        );
        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->chap_selected_item())
                ->background_color(ui::colors()->ws_highlighted_item()->LTimes(0.8))
        );

        


    }

    private function addCardCSS()
    {
      

    }

    private function headerLinks()
    {
        $css_element = CSSElementOfType("a")->and_class(ui::css_classes()->header_nav_link());

        $this->addCSS(
            $css_element->
            //color(ui::colors()->link_fg())->
            color("#fff")->
            //background_color(ui::colors()->header_bg()->mix(new HexColor("#ffffff"),90))->
            padding("8px 1.0em")->
            border_right("1px solid " . ui::colors()->header_bg()->LTimes(0.7))->
            border_left("1px solid " . ui::colors()->header_bg()->LTimes(1.1))->
            set_style("border-radius", "5px 5px 0px 0px")->
            //margin("4px 16px 0px 16px")->
            margin("4px 0px 0px 0px")->
            border_radius("0px")->
            display_inline_block()->width_auto()
        );


        $this->addCSS(
            $css_element->hover()->
            color("#ffa")
        );
    }

    private function inputs()
    {
        $this->addCSS(
            CSSElementOfType("input")->inside_type("*")->
            or_(CSSElementOfType("select")->inside_type("*"))->or_type("textarea")
                ->border_radius("0.5em")
                ->border(ui::_1px_solid_form_border())
                ->background_color(ui::colors()->input_field_bg())
                ->padding("0.8em 0px")
                ->text_indent("1.0em")
                ->margin_bottom("4px")
        );

        $this->addCSS(
            CSSElementOfType("input")->and_(CSSAttribute("type")->set_to_value("submit"))->inside_type("*")->
            cursor_pointer()->
            border_radius("0.3em")->
            //font_weight_bold()->
            border("1px solid transparent")->
            background_color(ui::colors()->primary_button_bg())->
            color("#fff")->
            text_indent("0")->
            padding("0.7em")/*->
            set_style("background", "linear-gradient(180deg,#FFC04C,orange)")*/
        );

        $this->addCSS(
            CSSElementOfClass(ui::css_classes()->panel_header())->
            background_color(ui::colors()->panel_header_bg())->
            padding("4px 1.0em")->
            border(ui::borders()->panel())->
            color(ui::colors()->body_color())->
            font_variant("all-small-caps")
        );

    }

    private function addCSSForNthChild()
    {
        /*$this->addCSS(
            (new CSSQueryForNthChild())->
            parent("my_ancestor")->before_index(10)->
            child("my_child")->
            before_index(29)->
            css()->width("500")->height("200")
        );*/

    }

    private function responsiveCSS()
    {
        ui::index_based_css()->romeo_department($this);
        ui::index_based_css()->romeo_stream_item($this);
        
        ui::responsive_css()->home_page();
        ui::responsive_css()->post_details_page();
        ui::responsive_css()->page_footer();
        ui::responsive_css()->body();
        
        new ResponsiveLayoutForAdminPages();
        new ResponsiveLayoutForPublicPages();
        new ResponsiveLayoutForLandingPageMiddleContent();
        new ResponsiveLayoutForPageHeaderColumns();

    }

    private function addRemeoCSS()
    {
        
        StreamOfPostsAt30Percent::add_css_for_stream_on_posts($this);
    }


}