<?php
//responsve css for
class ResponsiveLayoutForAdminPages{
    public function __construct()
    {
        //width
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_top_nav())
                ->setForDefault("100%")
                ->setFor600("80%")
        );
        
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area())
                ->setForDefault("100%")
                ->setFor600("80%")
        );
        
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_right_sidebar())
                ->setForDefault("100%")
                ->setFor600("20%")
        );

        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area_content())
                ->setForDefault("100%")
                ->setFor600("70%")
        );
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area_navigation())
                ->setForDefault("100%")
                ->setFor600("30%")
        );

        //margin
        new ResponsiveMarginForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area())
                ->setForDefault("auto")
                ->setFor600("0em 0% 1.0em 0%")
        );

        //position
        new ResponsivePositionForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_top_nav())
                ->setForDefault("fixed")
                ->setFor600("fixed")
        );
        new ResponsivePositionForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area())
                ->setForDefault("relative")
                ->setFor600("absolute")
        );

        new ResponsivePositionForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_right_sidebar())
                ->setForDefault("static")
                ->setFor600("fixed")
        );
        //height
        new ResponsiveHeightForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_right_sidebar())
                ->setForDefault("auto")
                ->setFor600("92%")
        );
        //top
        new ResponsiveTopForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_top_nav())
                ->setForDefault("auto")
                ->setFor600("7.5%")
        );
        new ResponsiveTopForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area())
                ->setForDefault("8em")
                ->setFor600("2.5em")
        );
        new ResponsiveTopForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_right_sidebar())
                ->setForDefault("auto")
                ->setFor600("8%")
        );
        //right
        new ResponsiveRightForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_right_sidebar())
                ->setForDefault("auto")
                ->setFor600("0px")
        );

        //float
        new ResponsiveFloatForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area_content())
                ->setForDefault("none")
                ->setFor600("right")
        );
        

        //z-index
        /*new ResponsiveZIndexForElement(
            ui::resp_values_for_class(ui::css_classes()->admin_page_layout_content_area())
                ->setForDefault("auto")
                ->setFor600("7")
        );*/

    }
}

class ResponsiveLayoutForPublicPages{
    public function __construct()
    {
        //width
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->public_page_layout_col1())
                ->setForDefault("100%")
                ->setFor600("80%")
        );

        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->public_page_layout_col2())
                ->setForDefault("100%")
                ->setFor600("20%")
        );
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->public_page_layout_col1_col1())
                ->setForDefault("100%")
                ->setFor600("75%")
        );
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->public_page_layout_col1_col2())
                ->setForDefault("100%")
                ->setFor600("25%")
        );


    }
}


class ResponsiveLayoutForLandingPageMiddleContent{
    public function __construct()
    {
        //width
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->landing_page_middle_content_main_content())
                ->setForDefault("100%")
                ->setFor600("66.7%")
        );
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->landing_page_middle_content_sidebar())
                ->setForDefault("100%")
                ->setFor600("32.3%")
        );

        //margin
        new ResponsiveMarginRightForElement(
            ui::resp_values_for_class(ui::css_classes()->landing_page_middle_content_sidebar())
                ->setForDefault("auto")
                ->setFor600("1%")
        );

        //float
        new ResponsiveFloatForElement(
            ui::resp_values_for_class(ui::css_classes()->landing_page_middle_content_sidebar())
                ->setForDefault("none")
                ->setFor600("left")
        );
        //positioning
        new ResponsivePositionForElement(
            ui::resp_values_for_class(ui::css_classes()->landing_page_middle_content())
                ->setForDefault("static")
                ->setFor600("relative") //to match the float
        );

    }
}

class ResponsiveLayoutForPageHeaderColumns{
    public function __construct()
    {
        //width
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->page_header_col_1())
                ->setForDefault("100%")
                ->setFor600("20%")
        );
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->page_header_col_2())
                ->setForDefault("100%")
                ->setFor600("35%")
        );
        new ResponsiveWidthForElement(
            ui::resp_values_for_class(ui::css_classes()->page_header_col_3())
                ->setForDefault("100%")
                ->setFor600("45%")
        );

        //height
        new ResponsiveHeightForElement(
            ui::resp_values_for_type("header")
                ->setForDefault("8%")
                ->setFor600("8%")
        );
        new ResponsiveTopForElement(
            ui::resp_values_for_class(ui::css_classes()->below_header_area())
                ->setForDefault("8%")
                ->setFor600("8%")
        );
        


    }
}