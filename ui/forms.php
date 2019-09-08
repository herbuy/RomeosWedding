<?php
abstract class FormForPerformingAction extends SmartForm{
    abstract public function getFormAction();
    abstract protected function onAddChildren();
    
    private $enable_cmd = true;
    public function disableCmd(){
        $this->enable_cmd = false;
        return $this;
    }
    public function __construct()
    {
        parent::__construct();
    }

    public function __toString()
    {
        $this->set_attribute("onSubmitSetToaster","Loading.. please wait");

        $this->onAddChildren();
        $this->add_child_if($this->enable_cmd,(new HiddenInput())->set_name(app::values()->cmd())->set_value($this->getFormAction()));

        //=== add some styling
        $this->applyStyleForAdminPage();
        return parent::__toString()."";
    }

    protected function getFieldLayout()
    {
        $layout = new LayoutForTwoColumns();
        $layout->leftColumn()->width("20%")->display_inline_block()->vertical_align_top();
        $layout->rightColumn()->width("80%")->display_inline_block()->vertical_align_top();
        return $layout;
    }

    private function applyStyleForAdminPage()
    {
    }
}

class FormForInsertBulkPosts extends FormForPerformingAction{
    private $field_set;
    private $reader_for_sections;

    /** @param \SmartForm $form */
    public function __construct($total_records_to_insert,$reader_for_sections)
    {
        ui::exception()->throwIfNotReader($reader_for_sections);
        $this->reader_for_sections = $reader_for_sections;

        parent::__construct();

        $field_set = new LayoutForNRows();
        for($record_number = 0; $record_number < $total_records_to_insert;$record_number++){
            $field_set->addNewRow()->add_child(
                $this->newRecord($record_number)
            )->
            border_bottom("8px solid #444")->padding("8px")->margin_bottom("4px");
        }

        $this->field_set = $field_set;
    }

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child(ui::form_feedback()->createMultiplePosts());
        $layout->addNewRow()->add_child($this->field_set);
        $layout->addNewRow()->add_child($this->newSubmitButton()->set_value("Submit")->width_auto());

        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->create_multiple_posts();
    }

    private function newTextBox(){
        return new TextInput();
    }

    private function newSubmitButton()
    {
        return new SubmitInput();
    }

    private function newRecord($record_number)
    {
        $section_id_picker = ui::pickers()->section_as_multi_input($this->reader_for_sections,1,$record_number);

        $layout = new LayoutForNColumns();

        //add field for title
        $layout->addNewColumn()->add_child($this->fieldForAttribute($record_number,"title"))->max_width("200px");
        $layout->addNewColumn()->add_child($this->fieldForAttribute($record_number,"content"))->max_width("200px");
        $layout->addNewColumn()->add_child($this->fieldForAttribute($record_number,"extended_post_content"))->max_width("200px");
        $layout->addNewColumn()->add_child($section_id_picker)->max_width("200px");
        return $layout;
    }

    private function fieldForAttribute($record_number,$attribute)
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child($attribute);
        $layout->addNewRow()->add_child(
            $this->newTextBox()->
            set_name($attribute."[]")->
            set_value(@$_REQUEST[$attribute][$record_number])
        );
        return $layout;
    }
}


class FormForCreateAccount extends FormForPerformingAction {

    public function __construct()
    {
        parent::__construct();
    }

    protected function onAddChildren()
    {

        $this->add_child(
            ui::html()->div(
                ui::form_feedback()->create_account()
                .
                $this->fieldForFullName()
                .
                $this->fieldForEmailAddress()
                .
                $this->fieldForPassword()
                .
                $this->sectionForActions()

            )->padding("1.0em")->max_width("300px")->margin_auto()
        );
    }
    public function getFormAction()
    {
        return app::values()->create_account();
    }

    private function fieldForFullName()
    {
        return ui::browser_fields()->full_name()->toTextInput()->placeholder("Your Names");
    }

    private function fieldForEmailAddress()
    {
        return ui::browser_fields()->email_address()->toTextInput()->placeholder("Your Email Address");
    }

    private function fieldForPassword()
    {
        return ui::browser_fields()->password()->toPasswordInput()->placeholder("Your Password");
    }

    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Create Account");
    }

}

class FormForLogin extends FormForPerformingAction {

    public function __construct()
    {
        parent::__construct();
    }

    protected function onAddChildren()
    {
        $this->add_child(
            ui::html()->div(
                ui::form_feedback()->login()
                .
                $this->fieldForEmailAddress()
                .
                $this->fieldForPassword()
                .
                $this->sectionForActions()
            )->padding("1.0em")->max_width("300px")->margin_auto()
        );
    }
    public function getFormAction()
    {
        return app::values()->login();
    }

    private function fieldForEmailAddress()
    {
        return ui::browser_fields()->email_address()->toTextInput()->placeholder("Your Email Address");
    }

    private function fieldForPassword()
    {
        return ui::browser_fields()->password()->toPasswordInput()->placeholder("Your Password");
    }
    
    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Login");
    }

}

class FormForLogout extends FormForPerformingAction {

    public function __construct()
    {
        parent::__construct();
        //$this->set_url(ui::form_feedback()->logout()->urlToFeedback());
        //$this->set_url(ui::urls()->home());

        $this->add_class(ui::css_classes()->form_with_only_button());
    }


    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        
        $layout->addNewRow()->add_child(ui::form_feedback()->logout());
        $layout->addNewRow()->add_child($this->sectionForActions());
        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->logout();
    }
    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Logout");
    }
}

class FormForStartNewPost extends FormForPerformingAction {

    private $reader_for_sections;
    
    public function __construct($reader_for_sections)
    {
        ui::exception()->throwIfNotReader($reader_for_sections);
        $this->reader_for_sections = $reader_for_sections;
        
        parent::__construct();
        
    }

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child(ui::form_feedback()->start_new_post());
        $layout->addNewRow()->add_child($this->fieldForSection())->add_class(ui::css_classes()->form_field_host());
        $layout->addNewRow()->add_child($this->fieldForTitle())->add_class(ui::css_classes()->form_field_host());
        $layout->addNewRow()->add_child($this->sectionForActions()->margin_bottom("0.5em"));


        //=====
        $layout->add_class(ui::css_classes()->form_items_host());

        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->start_new_post();
    }

    private function fieldForSection()
    {
        $layout = $this->getFieldLayout();
        $layout->leftColumn()->add_child("What are you posting?");
        //$layout->rightColumn()->add_child(ui::pickers()->section($this->reader_for_sections));
        return $layout;
    }

    private function fieldForTitle()
    {
        $layout = $this->getFieldLayout();
        $layout->leftColumn()->add_child("Title");
        $layout->rightColumn()->add_child(ui::browser_fields()->title()->toTextInput()->width_100percent()->height("3.0em"));
        return $layout;
    }

    

    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Create New Post");
    }


}

abstract class FormForStartOtherTypeOfPost extends FormForPerformingAction {
    //todo: this is the form your forms should extend

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child($this->formFeedbackObject());
        $layout->addNewRow()->add_child($this->fieldForSection());
        $layout->addNewRow()->add_child($this->fieldForTitle())->add_class(ui::css_classes()->form_field_host());
        $layout->addNewRow()->add_child($this->sectionForActions()->margin_bottom("0.5em"));


        //=====
        $layout->add_class(ui::css_classes()->form_items_host());

        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->start_new_post();
    }

    private function fieldForSection()
    {
        return (new HiddenInput())->set_name(app::values()->section_id())->set_value($this->get_section_id());

    }

    private function fieldForTitle()
    {
        $layout = $this->getFieldLayout();
        $layout->leftColumn()->add_child("Title");
        $layout->rightColumn()->add_child(ui::browser_fields()->title()->toTextInput()->autofocus()->width_100percent()->height("3.0em"));
        return $layout;
    }
    
    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value($this->textForSubmitButton());
    }

    protected function formFeedbackObject()
    {
        return ui::form_feedback()->start_new_post();
    }

    abstract protected function textForSubmitButton();

    protected function get_section_id()
    {
        //todo: override this to return the type of post e.g. article, etc as a number
        return ""; //app::section_ids()->cars();
    }


}


class FormForDeletePost extends FormForPerformingAction {
    public function __construct($file_name)
    {
        parent::__construct();
        $this->add_child(ui::form_feedback()->delete_post());
        $this->add_child(ui::browser_fields()->file_name()->toHiddenInput($file_name));

        $this->add_class(ui::css_classes()->form_with_only_button());
    }

    protected function onAddChildren()
    {
        $this->add_child(
            ui::buttons()->submit()->set_value("Del")
        );
    }
    public function getFormAction()
    {
        return app::values()->delete_post();
    }

}
abstract class FormForPerformingActionOnAPost extends FormForPerformingAction {
    public function __construct($file_name)
    {
        parent::__construct();
        $this->add_child($this->get_form_feedback());
        $this->add_child(ui::browser_fields()->file_name()->toHiddenInput($file_name));

        $this->add_class(ui::css_classes()->form_with_only_button());
    }

    protected function onAddChildren()
    {
        $this->add_child(
            ui::buttons()->submit()->set_value($this->getButtonText())
        );
    }
    
    abstract protected function get_form_feedback();
    abstract protected function getButtonText();

}

abstract class FormForPerformActionOnSelectedEntities extends FormForPerformingAction {

    public function onAddChildren()
    {
        $this->add_child(
            (new HiddenInput())
                ->set_name($this->get_csv_field_name())
            .
            (new SubmitInput())
                ->set_value($this->getSubmitText())
                ->width_auto()
                //->set_attribute("onClick","return false;")
                ->set_attribute("onClickSetToaster","Loading.. please wait")
        );
    }
    abstract protected function getSubmitText();
    abstract protected function get_csv_field_name();
}

abstract class FormForPerformActionOnSelectedDays extends FormForPerformActionOnSelectedEntities {

    protected function get_csv_field_name()
    {
        return app::values()->csv_selected_days();
    }
    
}

class FormForShowPostsUploadedOnSelectedPosts extends FormForPerformActionOnSelectedDays {
    public function __construct()
    {
        parent::__construct();

        $this->set_url(ui::urls()->super_admin_daily_performance_posts_published_on_selected_days());
        $this->use_get_method();
    }

    public function getFormAction()
    {
        return app::values()->super_admin_get_posts_published_on_selected_days();
    }
    protected function getSubmitText()
    {
        return "Show Posts published";
    }
}



abstract class FormForPerformActionOnSelectedPosts extends FormForPerformActionOnSelectedEntities {

    protected function get_csv_field_name()
    {
        return app::values()->csv_file_names();
    }
}

//show_posts_uploaded_on_selected_posts
class FormForUnPublishSelectedPosts extends FormForPerformActionOnSelectedPosts {
    public function getFormAction()
    {
        return app::values()->unpublish_selected_posts();
    }
    protected function getSubmitText()
    {
        return "Unpublish";
    }
}
class FormForPublishSelectedPosts extends FormForPerformActionOnSelectedPosts {
    public function getFormAction()
    {
        return app::values()->publish_selected_posts();
    }
    protected function getSubmitText()
    {
        return "Publish";
    }
}


class FormForPublishPost extends FormForPerformingActionOnAPost{
    public function getFormAction()
    {
        return app::values()->publish_post();
    }

    protected function get_form_feedback()
    {
        return ui::form_feedback()->publish_post();
    }

    protected function getButtonText()
    {
        return "Pub";
    }
}

class FormForPostComment extends FormForPerformingActionOnAPost{
    public function getFormAction()
    {
        return app::values()->post_comment();
    }

    protected function get_form_feedback()
    {
        return ui::form_feedback()->post_comment();
    }

    protected function getButtonText()
    {
        return "Post Comment";
    }
    protected function onAddChildren()
    {
        $this->add_child(
            app::browser_fields()->content()->toTextArea()->
            set_attribute("placeholder","LEAVE YOUR COMMENT")->
            border("1px solid #ddd")->min_height("8em")->padding("1.0em")->margin_bottom("0.5em")
        );

        $this->add_child(
            ui::browser_fields()->full_name()->toTextInput()->placeholder("Your Names")->margin_bottom("0.5em")
        );

        $this->add_child(
            ui::browser_fields()->email_address()->toTextInput()->placeholder("Your Email Address")
        );
        parent::onAddChildren();

        //do some styling
        $this->
        background_color("#fff")->
        padding("1.0em")->
        border(ui::borders()->panel())->
        border_radius("5px")
        ;
    }
}

abstract class FormForPerfomingActionOnAComment extends FormForPerformingAction {
    public function __construct($entity_id)
    {
        parent::__construct();
        $this->add_child($this->get_form_feedback());
        $this->add_child(ui::browser_fields()->entity_id()->toHiddenInput($entity_id));
        $this->add_class(ui::css_classes()->form_with_only_button());
    }

    protected function onAddChildren()
    {
        $this->add_child(
            ui::buttons()->submit()->set_value($this->getButtonText())->text_align_center()
        );
    }

    abstract protected function get_form_feedback();
    abstract protected function getButtonText();
}
class FormForApproveComment extends FormForPerfomingActionOnAComment{
    public function getFormAction()
    {
        return app::values()->approve_comment();
    }

    protected function get_form_feedback(){
        return ui::form_feedback()->approve_comment();
    }
    protected function getButtonText(){
        return "Approve";
    }
}
class FormForMoveCommentToTrash extends FormForPerfomingActionOnAComment{
    public function getFormAction()
    {
        return app::values()->move_comment_to_trash();
    }

    protected function get_form_feedback(){
        return ui::form_feedback()->move_comment_to_trash();
    }
    protected function getButtonText(){
        return "Trash";
    }
}
class FormForMoveCommentToSpam extends FormForPerfomingActionOnAComment{
    public function getFormAction()
    {
        return app::values()->move_comment_to_spam();
    }

    protected function get_form_feedback(){
        return ui::form_feedback()->move_comment_to_spam();
    }
    protected function getButtonText(){
        return "Spam";
    }
}


class FormForUnPublishPost extends FormForPerformingActionOnAPost{
    public function getFormAction()
    {
        return app::values()->unpublish_post();
    }

    protected function get_form_feedback()
    {
        return ui::form_feedback()->unpublish_post();
    }

    protected function getButtonText()
    {
        return "UnPub";
    }
}

class FormForPublishAllPosts extends FormForPerformingAction {
    public function __construct()
    {
        parent::__construct();
        $this->add_child(ui::form_feedback()->publish_all_posts());

        $this->add_class(ui::css_classes()->form_with_only_button());
    }

    protected function onAddChildren()
    {
        $this->add_child(
            ui::buttons()->submit()->set_value("Publish All")
        );
    }
    public function getFormAction()
    {
        return app::values()->publish_all_posts();
    }

}

abstract class FormForEditPostSection extends FormForPerformingAction {


    /** @var  ReaderForValuesStoredInArray $reader_for_post */
    private $reader_for_post;
    protected function reader(){
        return $this->reader_for_post;
    }

    public function __construct($reader_for_post)
    {
        ui::exception()->throwIfNotReader($reader_for_post);
        parent::__construct();
        $this->reader_for_post = $reader_for_post;
    }
}


class FormForEditPostTitle extends FormForEditPostSection {

    /** @param \ReaderForValuesStoredInArray $reader_for_post */
    public function __construct($reader_for_post)
    {
        parent::__construct($reader_for_post);

    }

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child(ui::form_feedback()->edit_post_title())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->fieldForTitle())->add_class(ui::css_classes()->romeo_department());

        $layout->addNewRow()->add_child($this->sectionForActions())->add_class(ui::css_classes()->romeo_department());

        //=====
        $layout->add_class(ui::css_classes()->form_items_host());

        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->admin_edit_post_title();
    }

    private function fieldForTitle()
    {
        return ui::browser_fields()->title()->toTextInput($this->reader()->title())->placeholder("Write Title");
    }

    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Done");
    }


}

class FormForEditPostTitle2 extends FormForPerformingAction {


    protected function onAddChildren()
    {
        $this->add_child(
            ui::browser_fields()->title()->toTextInput()->placeholder("Write Title")
            .
            ui::buttons()->submit()->set_value("Done")->margin_top("1.0em")
        );
    }
    public function getFormAction()
    {
        return app::values()->admin_edit_post_title();
    }

}


class FormForAddPhotoCredits extends FormForEditPostSection {
    private $reader_for_work_type;
    public function __construct($reader_for_post,$reader_for_work_type)
    {
        parent::__construct($reader_for_post);
        $this->reader_for_work_type = $reader_for_work_type;
    }

    public function getFormAction()
    {
        return app::values()->add_photo_credit();
    }
    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child(ui::html()->panel_header("Photo Credits"));
        $layout->addNewRow()->add_child(ui::html()->secondary_text()->add_child("I give credit to the following service providers whose work is cited in the photo"))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child(ui::form_feedback()->add_photo_credits())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child(ui::select_boxes()->work_type($this->reader_for_work_type))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child(app::browser_fields()->full_name()->toTextInput()->placeholder("Full Name"))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child(app::browser_fields()->mobile_number()->toTextInput()->placeholder("Mobile Number"))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child(app::browser_fields()->email_address()->toTextInput()->placeholder("Email Address"))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child(app::browser_fields()->url()->toTextInput()->placeholder("Website"))->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child(ui::buttons()->submit())->add_class(ui::css_classes()->romeo_department());



        $this->add_child($layout);
    }
}
class FormForEditPostContent extends FormForEditPostSection {

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child($this->feedback_object())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->fieldForContent())->add_class(ui::css_classes()->form_field_host())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->sectionForActions()->margin_bottom("0.5em"))->add_class(ui::css_classes()->romeo_department());


        //=====
        $layout->add_class(ui::css_classes()->form_items_host());

        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->admin_edit_post_content();
    }

    private function fieldForContent()
    {
        return $this->browser_field()->toTextArea($this->defaultTextForTextArea())->min_height("8em");
    }



    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Done");
    }

    protected function feedback_object()
    {
        return ui::form_feedback()->edit_post_content();
    }

    protected function browser_field()
    {
        return ui::browser_fields()->content();
    }

    protected function defaultTextForTextArea()
    {
        return $this->reader()->content();
    }

    protected function boxHeight()
    {
        return "12.0em";
    }

    protected function label()
    {
        return "Introduction";
    }


}

class FormForEditPostContent2 extends FormForPerformingAction {

    protected function onAddChildren()
    {
        //ui::form_feedback()->edit_post_content()
        $this->add_child(
            ui::browser_fields()->content()->toTextArea("")->set_attribute("placeholder","Write your text here")->min_height("8em")
            .
            ui::buttons()->submit()->set_value("Done")->margin_top("1.0em")
        );
    }
    public function getFormAction()
    {
        return app::values()->admin_edit_post_content();
    }

}

class FormForEditExtendedPostContent extends FormForEditPostContent{
    public function getFormAction()
    {
        return app::values()->admin_edit_extended_post_content();
    }
    protected function feedback_object()
    {
        return ui::form_feedback()->edit_extended_post_content();
    }
    protected function browser_field()
    {
        return ui::browser_fields()->extended_post_content();
    }
    protected function defaultTextForTextArea()
    {
        return $this->reader()->extended_post_content();
    }
    protected function boxHeight()
    {
        return "36.0em";
    }

    protected function label()
    {
        return "FULL DETAILS";
    }
}

class FormForEditPostPicture extends FormForEditPostSection {

    protected function addClassForBoxShadow()
    {
    }
    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child(ui::form_feedback()->edit_post_picture())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->fieldForChoosePicture())->add_class(ui::css_classes()->form_field_host())->add_class(ui::css_classes()->romeo_department());
        $layout->addNewRow()->add_child($this->sectionForActions())->add_class(ui::css_classes()->romeo_department());
        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->admin_edit_post_picture();
    }

    private function fieldForChoosePicture()
    {
        return ui::browser_fields()->file_to_upload()->toFileInput()->width_100percent()->height("3.0em");

        /*$layout = $this->getFieldLayout();
        $layout->leftColumn()->add_child("Choose File");
        $layout->rightColumn()->add_child(ui::browser_fields()->file_to_upload()->toFileInput()->width_100percent()->height("3.0em"));
        return $layout;*/
    }



    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Done");
    }

}

class FormForEditPostPicture2 extends FormForPerformingAction {


    protected function onAddChildren()
    {
        $this->add_child(
            //ui::form_feedback()->edit_post_picture()
            ui::browser_fields()->file_to_upload()->toFileInput()->width_100percent()->height("3.0em")
            .
            ui::buttons()->submit()->set_value("Done")
        );
    }
    public function getFormAction()
    {
        return app::values()->admin_edit_post_picture();
    }

}

class FormForEditPostVideo extends FormForEditPostSection {

    protected function addClassForBoxShadow()
    {
    }
    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child(ui::form_feedback()->edit_post_video());
        $layout->addNewRow()->add_child($this->fieldForYoutubeVideoId())->add_class(ui::css_classes()->form_field_host());
        $layout->addNewRow()->add_child($this->sectionForActions()->margin_bottom("0.5em"));


        //=====
        //$layout->add_class(ui::css_classes()->form_items_host());
        $layout->padding("0px 1.0em");

        $this->add_child($layout);
    }
    public function getFormAction()
    {
        return app::values()->admin_edit_post_video();
    }

    private function fieldForYoutubeVideoId()
    {
        return ui::browser_fields()->youtube_video_id()->toTextInput($this->reader()->youtube_video_id())->width_100percent()->height("3.0em");
    }

    protected function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Done");
    }

}

class FormForAddPicture extends FormForEditPostSection {

    protected function onAddChildren()
    {
        $layout = new LayoutForNRows();
        $layout->addNewRow()->add_child($this->getFormFeeback());
        $layout->addNewRow()->add_child($this->sectionForBrowsImage())->add_class(ui::css_classes()->form_field_host());
        $layout->addNewRow()->add_child($this->sectionForActions()->margin_bottom("0.5em"));
        
        //=====
        $layout->add_class(ui::css_classes()->form_items_host());

        $this->add_child($layout);

        $this->add_child(ui::browser_fields()->file_to_upload()->toHiddenInput());
    }
    public function getFormAction()
    {
        return app::values()->add_image();
    }

    private function sectionForBrowsImage()
    {
        $layout = $this->getFieldLayout();
        $layout->leftColumn()->add_child("Browse")->font_weight_bold();
        $layout->rightColumn()->add_child(ui::browser_fields()->file_to_upload()->toFileInput()->height("3.0em"));
        return $layout;
    }   

    private function sectionForActions()
    {
        return ui::buttons()->submit()->set_value("Submit")->margin("-2px 0px 0px -1px");
    }

    protected function getFormFeeback()
    {
        return ui::form_feedback()->addImage();
    }


}
class FormForAttactPictureToPost extends FormForAddPicture{
    public function getFormAction()
    {
        return app::values()->attach_image_to_post();
    }
    protected function getFormFeeback()
    {
        return ui::form_feedback()->attachImageToPost();
    }
}

