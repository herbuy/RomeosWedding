<?php

abstract class FormForCreateItem2 extends FormForPerformingAction {

    protected $reader_for_types;

    public function __construct($reader_for_types)
    {
        parent::__construct();
        $this->reader_for_types = $reader_for_types;
    }

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $form_feedback = $this->form_feedback();
        $layout->addNewRowIf($form_feedback)->add_child($form_feedback);
        $layout->addNewRow()->add_child(ui::html()->secondary_text()->add_child($this->reader_for_types->about()))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->fieldForTitle())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->sectionForActions())->add_class(ui::css_classes()->romeo_department());


        //=====
        $layout->add_class(ui::css_classes()->form_items_host());

        $this->add_child($layout);
        $this->add_child(ui::html()->hidden_input()->set_name($this->type_code_field())->set_value($this->reader_for_types->read_key($this->type_code_field())));
    }

    private function fieldForTitle()
    {
        return ui::browser_fields()->title()->toTextInput()->placeholder($this->placeholderForTitle())->autofocus();
    }

    private function sectionForActions()
    {
        return ui::buttons()->submit()->set_value($this->textForSubmitButton());
    }

    abstract protected function type_code_field();

    protected function textForSubmitButton()
    {
        return "Continue &rarr;";//return "Create Page";
    }

    protected function placeholderForTitle()
    {
        return "First Write Title Here...";
    }

    protected function form_feedback()
    {
        
    }

}

class FormForCreateProduct extends FormForCreateItem2{
    
    public function getFormAction()
    {
        return app::values()->post_product();
    }
    protected function type_code_field(){
        return app::values()->product_type_code();
    }
}

class FormForCreateWork extends FormForCreateItem2{
    public function getFormAction()
    {
        return app::values()->post_work();
    }
    protected function type_code_field(){
        return app::values()->work_type_code();
    }
}
class FormForCreateFacility extends FormForCreateItem2{
    public function getFormAction()
    {
        return app::values()->post_facility();
    }
    protected function type_code_field(){
        return app::values()->facility_type_code();
    }
}

class FormForCreateArticle extends FormForCreateItem2{
    public function getFormAction()
    {
        return app::values()->post_article();
    }
    protected function type_code_field(){
        return app::values()->article_type_code();
    }
}
class FormForCreateEvent extends FormForCreateItem2{
    public function getFormAction()
    {
        return app::values()->post_event();
    }
    protected function type_code_field(){
        return app::values()->event_type_code();
    }
}
class FormForCreateProfile extends FormForCreateItem2{
    public function getFormAction()
    {
        return app::values()->post_profile();
    }
    protected function type_code_field(){
        return app::values()->profile_type_code();
    }
}

class FormForCreateStatusUpdate extends FormForCreateItem2{
    public function getFormAction()
    {
        return app::values()->post_status_update();
    }
    protected function type_code_field(){
        return app::values()->status_type_code();
    }

    protected function textForSubmitButton()
    {
        return "Continue &rarr;";
    }

    protected function placeholderForTitle()
    {
        $placeholder = "First Write a headline for your status update";
        return $placeholder;
    }

    protected function form_feedback()
    {
        return ui::form_feedback()->post_status_update();
    }
}


abstract class FormForPostPicture extends FormForPerformingAction {

    private $form_name;
    private $submit_text = 'Picture';
    private $sub_type ='';

    public function __construct($sub_type='',$submit_text='Picture',$form_name='')
    {
                
        $form_name = $form_name ? $form_name : $this->getFormAction();
        $this->form_name = $form_name;
        $this->set_attribute("name",$form_name);

        $this->sub_type = $sub_type;
        $this->submit_text = $submit_text;

        parent::__construct();
        $this->add_class(ui::css_classes()->form_with_only_button());
    }


    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();

        //$layout->addNewRow()->add_child(ui::form_feedback()->logout());
        $layout->addNewRow()->add_child(
                $this->sectionForFileInput()
        );

        $layout->addNewRow()->add_child(
            ui::html()->no_script(
                $this->sectionForActions()->margin_top("8px")
            )
        );
        $layout->addNewRow()->add_child(
            (new HiddenInput())->set_name($this->getSubTypeField())->set_value($this->sub_type)
        );
        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->post_picture();
    }
    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Submit");
    }

    private function sectionForFileInput()
    {
        $this->display_inline_block();

        $file_input = ui::browser_fields()->file_to_upload()->toFileInput2($this->form_name);

        return ui::html()->file_input_host($file_input)->
        add_child(
            ui::html()->div()->add_child(
                ui::urls()->asset("add_pic.png")->toImage()->width_auto()->vertical_align_middle()
            )->
            add_child(
                "&nbsp;".$this->submit_text()
            )->padding_left("1.0em")->padding_right("1.0em")

        )->
        background_color(ui::colors()->bg())->font_weight_bold()->border_radius("1.0em")->display_inline_block()->border("0px solid #ccc");
    }

    private function submit_text()
    {
        return $this->submit_text;
    }

    abstract protected function getSubTypeField();


}

class FormForPostProductPhoto extends FormForPostPicture{
  
    public function getFormAction()
    {
        return app::values()->post_product_picture();
    }
    protected function getSubTypeField(){
        return app::values()->product_type_code();
    }
}
class FormForPostFacilityPhoto extends FormForPostPicture{
    
    public function getFormAction()
    {
        return app::values()->post_facility_photo();
    }
    protected function getSubTypeField(){
        return app::values()->facility_type_code();
    }
}
class FormForPostWorkPhoto extends FormForPostPicture {
    
    public function getFormAction()
    {
        return app::values()->post_work_photo();
    }
    protected function getSubTypeField(){
        return app::values()->work_type_code();
    }
}

class FormForPostEventPhoto extends FormForPostPicture {

    public function getFormAction()
    {
        return app::values()->post_event_photo();
    }
    protected function getSubTypeField(){
        return app::values()->event_type_code();
    }

}

class FormForPostProfilePhoto extends FormForPostPicture {

    public function getFormAction()
    {
        return app::values()->post_profile_photo();
    }
    protected function getSubTypeField(){
        return app::values()->profile_type_code();
    }

}

class FormForPostArticlePhoto extends FormForPostPicture {

    public function getFormAction()
    {
        return app::values()->post_article_photo();
    }
    protected function getSubTypeField(){
        return app::values()->article_type_code();
    }

}

class FormForPostStatusPhoto extends FormForPostPicture {

    public function getFormAction()
    {
        return app::values()->post_status_photo();
    }
    protected function getSubTypeField(){
        return app::values()->status_type_code();
    }

}




class FormForPostVideo extends FormForPerformingAction {

    public function __construct()
    {
        parent::__construct();
        $this->add_class(ui::css_classes()->form_with_only_button());
    }


    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();

        //$layout->addNewRow()->add_child(ui::form_feedback()->logout());
        $layout->addNewRow()->add_child($this->sectionForActions());
        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->post_video();
    }
    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Add Video");
    }
}


abstract class FormForEditSubType extends FormForPerformingAction {

    protected $reader_for_types;

    public function __construct($reader_for_types)
    {
        parent::__construct();
        $this->reader_for_types = $reader_for_types;
    }

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $form_feedback = $this->form_feedback();
        $layout->addNewRowIf($form_feedback)->add_child($form_feedback);
        $layout->addNewRow()->add_child(ui::html()->secondary_text()->add_child($this->reader_for_types->about()))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->fieldForSelector())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->sectionForActions())->add_class(ui::css_classes()->romeo_department());

        //=====
        

        $this->add_child($layout);
        //$this->add_child(ui::html()->hidden_input()->set_name($this->type_code_field())->set_value($this->reader_for_types->read_key($this->type_code_field())));
    }

    protected function fieldForSelector()
    {
        return ui::select_boxes()->product_type($this->reader_for_types);
    }

    private function sectionForActions()
    {
        return ui::buttons()->submit()->set_value($this->textForSubmitButton());
    }

    protected function textForSubmitButton()
    {
        return "Continue &rarr;";//return "Create Page";
    }

    protected function form_feedback()
    {

    }

}

class FormForEditProductType extends FormForEditSubType{

    public function getFormAction()
    {
        return app::values()->edit_product_type();
    }
    protected function type_code_field(){
        return app::values()->product_type_code();
    }
    protected function fieldForSelector()
    {
        return ui::select_boxes()->product_type($this->reader_for_types);
    }

}
class FormForEditFacilityType extends FormForEditSubType{

    public function getFormAction()
    {
        return app::values()->edit_facility_type();
    }
    protected function type_code_field(){
        return app::values()->facility_type_code();
    }
    protected function fieldForSelector()
    {
        return ui::select_boxes()->facility_type($this->reader_for_types);
    }

}
class FormForEditWorkType extends FormForEditSubType{

    public function getFormAction()
    {
        return app::values()->edit_work_type();
    }
    protected function type_code_field(){
        return app::values()->work_type_code();
    }
    protected function fieldForSelector()
    {
        return ui::select_boxes()->work_type($this->reader_for_types);
    }

}
class FormForEditEventType extends FormForEditSubType{

    public function getFormAction()
    {
        return app::values()->edit_event_type();
    }
    protected function type_code_field(){
        return app::values()->event_type_code();
    }
    protected function fieldForSelector()
    {
        return ui::select_boxes()->event_type($this->reader_for_types);
    }

}
class FormForEditProfileType extends FormForEditSubType{

    public function getFormAction()
    {
        return app::values()->edit_profile_type();
    }
    protected function type_code_field(){
        return app::values()->profile_type_code();
    }
    protected function fieldForSelector()
    {
        return ui::select_boxes()->profile_type($this->reader_for_types);
    }

}
class FormForEditArticleType extends FormForEditSubType{

    public function getFormAction()
    {
        return app::values()->edit_article_type();
    }
    protected function type_code_field(){
        return app::values()->article_type_code();
    }
    protected function fieldForSelector()
    {
        return ui::select_boxes()->article_type($this->reader_for_types);
    }
}