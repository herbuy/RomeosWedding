<?php
class FormNameFactory{
    private function hash_of_function($function_name)
    {
        return /*TheWebsite::is_online() ? sprintf("_%s", md5($function_name)) :*/ $function_name;
    }
    public function from($name)
    {
        return $this->hash_of_function($name);
    }
}
class CSSClassFactory{
    private $append_dot = false;
    public function __construct($append_dot = false)
    {
        $this->append_dot = $append_dot;
    }

    private function hash_of_function($function_name)
    {
        $dot = $this->append_dot ? "." : "";
        return $dot.$function_name;
        /*return TheWebsite::is_online() ? sprintf("_%s", md5($function_name)) :  $function_name;*/
    }
    public function item_in_most_recent_items_per_category()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function item_in_section_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function title_of_item_in_section_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function content_of_item_in_section_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function paragraph_text()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function time_posted()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function image_of_item_in_section_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    
    public function video_of_item_in_section_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function text_for_item_in_section_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function text_padding_for_item_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    

    public function item_in_section_for_exporter_reviews()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    
    public function card_background()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function card_border_bottom()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function card_border_right()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function card_margin()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function card_padding()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function height_limiter()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function header_nav_link()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function form_field_host()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function form_items_host()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function form_with_only_button()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function element_with_box_shadow()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function footer_link()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function error_message_host()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function post_kicker()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function item_host_for_admin_navigation()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function actions_after_image_of_item_in_section_for_main_posts()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function item_in_section_for_admin_posts_published()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function home_row1_left_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function home_row1_middle_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function home_row1_right_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function home_row2_left_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function home_row2_right_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function post_details_page_row1_left_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function post_details_page_row1_middle_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function post_details_page_row1_right_col()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function layout_for_post_details_page()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function post_details_page_center_stage()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function page_footer()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function page_footer_row1_col1()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function page_footer_row1_col2()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    //todo: app specific classes
    public function romeo_item_in_stream_on_landing_page()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function romeo_column1()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function romeo_column2()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function romeo_headline()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function romeo_item_in_stream_on_landing_page_at_30_percent()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function romeo_department()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function link_targeting_iframe_in_edit_post()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function panel_header()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function below_header_area()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function current_tab()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function admin_page_layout_top_nav()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function admin_page_layout_content_area()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function admin_page_layout_right_sidebar()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function public_page_layout_col1()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function public_page_layout_col2()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function public_page_layout_col1_col1()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function public_page_layout_col1_col2()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function admin_page_layout_content_area_content()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function admin_page_layout_content_area_navigation()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    
    public function landing_page_middle_content()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function landing_page_middle_content_main_content()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function landing_page_middle_content_sidebar()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function page_header_col_1()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function page_header_col_2()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    //todo: check if still uder use
    public function page_header_col_3()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function js_login_dialog()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function js_global_menu_btn()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function js_global_menu_items()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function js_login_link()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_stream_engage_stats()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_top_tabs()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_mains()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_footer()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_footer_product_category_menu()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    
    public function chap_footer_product_category_menu_item_content()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_one_line_text()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_floating_button_host()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_footer_floating_button()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_img_in_product_list()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function js_sign_up_dialog()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_search_bar_toggle_item()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function search_query()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function js_edit_title_dialog()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function js_edit_content_dialog()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function js_edit_picture_dialog()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function js_edit_extended_post_content_dialog()
    {
        return $this->hash_of_function(__FUNCTION__);
    }

    public function chap_selected_item()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    public function chap_entered_selectable_item()
    {
        return $this->hash_of_function(__FUNCTION__);
    }
    
    public function chap_white_bg()
    {
        return $this->hash_of_function(__FUNCTION__);
    }


}