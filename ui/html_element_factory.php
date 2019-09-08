<?php
class HtmlElementFactory{
    public function div($content = ''){
        $html = new SmartDiv();
        $html->add_child_if(strlen($content."") > 0,$content);
        return $html;
        
    }
    public function span($content = ''){
        $html = new SmartSpan();
        $html->add_child_if(strlen($content."") > 0,$content);
        return $html;
    }
    public function span_auto($content = ''){
        $spn = $this->span($content);
        $spn->width_auto();
        return $spn;
    }
    public function form($content='',$name=''){
        $element = new SmartForm();
        $element->add_child_if(strlen($content) > 0,$content);
        if(strlen(trim($name)) > 0){
            $element->set_attribute("name",$name);
        }
        return $element;
    }
    public function submit_button($value=''){
        $element = new SubmitInput();
        $element->set_value($value);        
        return $element;
    }
    public function hidden_input($name='',$value=''){
        $element = new HiddenInput();
        $element->set_name($name);
        $element->set_value($value);
        return $element;
    }
    public function heading3($content=''){
        $element = new SmartHeading3();
        //$element
        $element->add_child_if(strlen($content) > 0,$content);
        return $element;
    }
    public function heading4($content=''){
        $element = new SmartHeading4();
        //$element
        $element->add_child_if(strlen($content) > 0,$content);
        return $element;
    }
    
    public function heading1(){
        return new SmartHeading1();
    }
    public function heading2($content='')
    {
        $element = new SmartHeading2();
        $element->add_child_if(strlen($content) > 0,$content);
        return $element;
    }
    

    public function anchor()
    {
        return new SmartLink();
    }

    public function paragraph()
    {
        return new SmartParagraph();
    }

    public function secondary_text()
    {
        $par = new SmartParagraph();
        $par->line_height("1.1em")->font_variant("initial")->font_size(ui::font_sizes()->secondary_text())->color(
            ui::colors()->body_color()->mix(ui::colors()->white(),40)
        );
        return $par;
    }

    public function nav()
    {
        return new SmartNavigation();
    }

    public function iframe()
    {
        return new SmartIFrame();
    }

    public function list_item()
    {
        return new SmartListItem();
    }
    public function my_list_item($icon,$text)
    {
        $li = $this->
        list_item()->add_child(
            ui::html()->span()->add_child($text)->width_auto()->max_width("80%")
        )->
        list_style_position_outside()->list_style_position_inside()->
        list_style_image_url($icon);

        return $li->vertical_align_middle();
    }

    public function panel_header($string)
    {
        return ui::html()->div()->
        add_child($string)->add_class(ui::css_classes()->panel_header());
    }
    public function panel_header_at_top($string){
        return $this->panel_header($string)->border_radius("5px 5px 0px 0px");
    }
    

    public function no_script($content)
    {
        $tag =  new SmartCustomTag("noscript");
        $tag->add_child($content);
        return $tag;
    }

    public function file_input_host($file_input)
    {
        $div = ui::html()->div();
        $div->add_child(
            $file_input
        )->text_align_center()->position_relative()->top("0px")->overflow_hidden();
        return $div;
    }

    public function toaster_link($content, $url)
    {
        $link = new SmartLink();
        $link->set_href($url);
        $link->add_child($content);
        $link->set_attribute('onClickSetToaster','Loading.. Please wait');
        return $link;
    }
    public function toaster_link_dynamic($content, $url)
    {
        $link = new SmartDynamicLink();
        $link->set_url($url);
        $link->add_child($content);
        $link->set_attribute('onClickSetToaster','Loading.. Please wait');
        return $link;
    }

    public function vertical_stat($number, $label_if_singular, $label_if_plural,$border_right=true)
    {
        $html =
            ui::html()->div(
                ui::html()->div($number)
                .
                ($number == 1 ? $label_if_singular : $label_if_plural)
            )->padding("1.0em");
        
        if($border_right){
            $html->border_right("1px solid #ddd");
        }
        return $html;
    }

    public function make_main($content,$element_id){
        $html =
            ui::html()->div(
                $content
            );
        $html->add_class(ui::css_classes()->chap_mains())->set_id($element_id);
        return $html;
    }
    public function make_footer($content,$element_id){

        $html =
            ui::html()->div(
                $content
            );
        $html
                ->add_class(ui::css_classes()->chap_footer())
                ->set_id($element_id);
        return $html;
    }
    public function make_floating_btn_host($content,$element_id){
        $html =
            ui::html()->div(
                $content
            );
        $html
                ->add_class(ui::css_classes()->chap_floating_button_host())
                ->set_id($element_id);
        return $html;
    }

    public function alternative_header1($content)
    {
        return ui::html()->div(
            ui::html()->span(
                ui::html()->span('&larr;')->vertical_align_middle()->margin_top('-0.25em')
            )
                ->width_auto()
                ->margin_right("0.5em")->padding('0.35em 0.5em')
                ->background_color(ui::colors()->header_bg()->S(0.8))
                ->border_radius('50%')
                ->cursor_pointer()
                ->set_attribute('onClickSetFadeOut',ui::fragments()->chap_alternative_header1())
            .
            $content
        )
            ->set_id(ui::fragments(true)->chap_alternative_header1())
            ->padding("1.0em")
            ->background_color(ui::colors()->header_bg())
            ->color("#fff")
            ->font_weight_bold()

            ->position_absolute()
            ->top('0px')
            ->left('0px')
            ->width('100%')
            ->height_100percent()

            ->display_none()


            ;
    }

    public function paginator_next()
    {
        //print json_encode($_REQUEST);exit;
        $link = $this->toaster_link_dynamic("Next..",ui::urls()->adminViewPostsPublished());

        $link->set_parameter(
            app::values()->start_index(),
            max(
                0,
                intval(app::browser_fields()->start_index()->value())
                +
                intval(app::browser_fields()->max_number()->value())
            )

        );

        $link->set_parameter(
            app::values()->max_number(),
            intval(app::browser_fields()->max_number()->value())
        );
        return $link;
    }

    public function paginator($text, $url, $direction_int=1)
    {
        //to ensure falls in range -1 to 1 and is a whole number i.e -1,0, or 1
        $direction_int = round(min(1, max($direction_int,-1)));
        $start_index = 
            intval(app::browser_fields()->start_index()->value())
            +
            $direction_int * intval(app::browser_fields()->max_number()->value());
        
        
        //render
        $link = $this->toaster_link_dynamic($text,$url);

        $link->set_parameter(
            app::values()->start_index(),
            max(0,$start_index)
        );

        $link->set_parameter(
            app::values()->max_number(),
            max(0, intval(app::browser_fields()->max_number()->value()))
        );
        return $link;
    }

    public function notification_header($string)
    {
        return ui::html()->div($string)
            ->background_color(ui::colors()->notification_header_bg())
            ->padding("1.0em")
            ->border_radius("0.7em")
            ->font_variant("initial")
            ->line_height("1.2em")
            ->border("1px solid ".ui::colors()->notification_header_bg()->S(0)->LTimes(0.9))
            ->border_width("0px 1px 1px 1px")
            ;
    }
    public function notice_header($string){
        $base_color = (new HexColor("#ffffcc"))->STimes(0.9);

        return ui::html()->span_auto($string)
            ->background_color($base_color)
            ->padding("1.0em")
            ->border_radius("5px 1em 5px 1em")
            ->font_variant("initial")
            ->line_height("1.2em")
            ->border("1px solid ".$base_color->S(0)->LTimes(0.9))
            ->border_width("0px 1px 1px 1px")
            ;
    }

    public function footer_form($content,$footer_subclass_or_selector)
    {
        return ui::html()->div(
            ui::html()->div(
                "".$content
            )->padding("1.0em")->width("96%")->max_width("300px")->margin_auto()
        )->border_top("1px solid ".ui::colors()->bg()->LTimes(0.9))->add_class($footer_subclass_or_selector)->add_class(ui::css_classes()->chap_footer())->background_image("inherit");
    }

    public function long_text($post_content)
    {
        return $this->paragraph()->add_child(nl2br($post_content))->font_size("0.8em")->line_height("1.3em")->margin_top("0.5em")->margin_bottom("0.5em");
    }


}