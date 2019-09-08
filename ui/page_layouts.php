<?php
class LayoutForHomePage_Obsolete extends LayoutForTwoColumns{
    public function __construct()
    {
        parent::__construct();

        $this->leftColumn()->width("70%")->display_inline_block()->vertical_align_top();
        $this->rightColumn()->width("30%")->display_inline_block()->vertical_align_top()->margin_left("-1px");

        //$this->leftColumn()->add_child(ui::sections()->preNav()->add_class("pre_nav"));
    }
}
class LayoutForAdminPage extends LayoutForHomePage_Obsolete{
    public function __construct()
    {
        parent::__construct();
    }
}


class PageLayoutForAdminEditPost extends SmartDiv{
    public function __construct()
    {
        parent::__construct();
             
    }
}


class LayoutForDepartment extends SmartDiv{
    public function __construct($dept_description,$left_content,$middle_content,$right_content)
    {
        parent::__construct();

        $this->add_child(

            ui::html()->span(

                ui::html()->div()->add_child(
                    $dept_description
                )->background_color(
                    ui::colors()->header_bg()->mix(ui::colors()->white(),10)
                )->
                color("#fff")->padding("0em 1.0em 0.2em 1.0em")->
                background(sprintf("linear-gradient(180deg,%s,%s)",ui::colors()->header_bg(),ui::colors()->header_bg()->LTimes(1.1)))->
                min_height("0.3em")->border_radius("0px 0px 5px 5px")
                .

                ui::html()->div()->add_child(
                    ui::html()->span(
                        ui::html()->div()->add_child(
                            $middle_content
                        )->margin("0em 4px")
                    )->add_class(ui::css_classes()->public_page_layout_col1_col1())
                    .
                    ui::html()->span(
                        ui::html()->div()->add_child(
                            $right_content
                        )->margin("0em 4px")
                    )->add_class(ui::css_classes()->public_page_layout_col1_col2())
                )
            )->add_class(ui::css_classes()->public_page_layout_col1())
            .
            ui::html()->span(
                ui::html()->div()->add_child(
                    $left_content
                )->margin("0em 4px")
            )->add_class(ui::css_classes()->public_page_layout_col2())

        );

        $this->padding_bottom("2.0em");
    }
}

class LayoutForDepartment20 extends SmartDiv{
    public function __construct($section_menu,$page_menu_and_content,$right_sidebar_content)
    {
        parent::__construct();
        $this->add_child(
            $this->leftSection($section_menu,$page_menu_and_content)->
            width("80%")
            .
            $this->rightSideBar($right_sidebar_content)->
            width("20%")
        );
        
    }

    private function leftSection($section_menu,$page_menu_and_content)
    {
        return ui::html()->span(
            ui::html()->div($section_menu)->background_color("#fff")->border("1px solid #ddd")
            .
            ui::html()->div($page_menu_and_content)->background_color("#fff")->padding("1.0em")->border("1px solid #ddd")->margin("1.0em 10%")
        );
    }

    private function rightSideBar($right_sidebar_content)
    {
        return ui::html()->span(
            ui::html()->div($right_sidebar_content)->border_left(sprintf("1px solid ".ui::colors()->bg()->LTimes(0.7)))->height("100%")->margin_left("-1px")
        );
    }
}

class LayoutForAdminPages extends SmartDiv{
    public function __construct($section_menu,$page_menu_and_content,$right_sidebar_content)
    {
        parent::__construct();
        $this->add_child(
            ui::html()->div(
                $section_menu
            )->add_class(ui::css_classes()->admin_page_layout_top_nav())->background_color("#fff")->z_index("1")->border_bottom(ui::borders()->panel())
            .
            ui::html()->div(
                ui::html()->div($page_menu_and_content)
                    //->background_color("#fff")
                    //->padding("1.0em")
                    ->overflow_hidden()
            )->add_class(ui::css_classes()->admin_page_layout_content_area())
            .
            ui::html()->div(
                ui::html()->div(
                    $right_sidebar_content
                )
                    ->border_left("1px solid ".ui::colors()->bg()->LTimes(0.7))
                    ->height_100percent()
                    //->background_color("#ffc")
            )->add_class(ui::css_classes()->admin_page_layout_right_sidebar())
        );

    }


}

class MenuItems{
    public function __toString()
    {
        return "";
        /*return "".ui::html()->div(
            ui::urls()->products()->toLink("Products")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()
            .
            ui::urls()->facilities()->toLink("Facilities")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()

            .
            ui::urls()->work()->toLink("Work")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()
            .
            ui::urls()->events()->toLink("Photos")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()
            .
            ui::urls()->articles()->toLink("Tips")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()
            .
            ui::urls()->profiles()->toLink("Service Providers")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()
            .
            ui::urls()->profiles()->toLink("Status")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()
            .
            ui::urls()->loginPage()->toLink("Login")->add_class(ui::css_classes()->js_login_link())->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()
            .
            ui::urls()->createAccountPage()->toLink("Sign Up")->color_inherit()->padding("0.5em")->display_inline_block()->width_auto()

        )->font_size("12pt")->color("white");
        */
        
    }
}


