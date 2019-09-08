<?php

abstract class BaseClassForFormFeedback{
    //todo: extend BaseClassForFormFeedback to provide form feedback for different types of posts 
    /** @return CmdBaseClass2 $cmd */
    abstract protected function getCmd();
    abstract protected function initialFeeback();
    abstract protected function successFeeback();
    abstract protected function textForNextActions();

    public function __toString()
    {
        $layout = (new SmartDiv())->add_child( $this->initialFeeback() );
        if($this->getCmd()->lastErrorNotEmpty()){
            $layout = ui::error_html()->add_child($this->getCmd()->lastError());
        }
        else if($this->getCmd()->readerForlastResponse()->count() > 0){
            $layout = new SmartDiv();
            $layout->add_child($this->successFeeback(). ".&nbsp;");
            $layout->add_child($this->textForNextActions());
            $layout->background_color("#ffc")->border("1px solid #ee6")->padding("8px 16px");
        }
        
        $layout->set_id($this->getHtmlFragmentId());

        return $layout."";
    }

    public function urlToFeedback(){
        return UrlOfCurrentRequest::get()->seeksToElementId($this->getHtmlFragmentId());
    }

    private function getHtmlFragmentId()
    {
        return join("",array(
            "_", md5( __CLASS__)
        ));
    }
}
class FormFeedbackForAddImage extends BaseClassForFormFeedback{
    protected function getCmd()
    {
        return app::cmds()->addImage();
    }
    protected function initialFeeback()
    {
        return "Add Image";
    }
    protected function successFeeback()
    {
        return "image posted successfully";
    }
    protected function textForNextActions()
    {
        return ui::links()->view_picture($this->getCmd()->readerForlastResponse()->file_name())->add_child("View image");
    }
}


class FormFeedbackForAttachImageToPost extends BaseClassForFormFeedback{
    protected function getCmd()
    {
        return app::cmds()->attachImageToPost();
    }
    protected function initialFeeback()
    {
        return "Attach an image to your post";
    }
    protected function successFeeback()
    {
        return "image attached successfully";
    }
    protected function textForNextActions()
    {
        return ui::links()->view_post($this->getCmd()->readerForlastResponse()->file_name())->add_child("View Post");
    }
}

class FormFeedbackForCreateMultiplePosts extends BaseClassForFormFeedback{
    
    protected function getCmd()
    {
        return app::cmds()->createMultiplePosts();
    }
    protected function initialFeeback()
    {
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Create multiple posts","at once"));
    }
    protected function successFeeback()
    {
        return "Your posts were created successfully";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",            
            ui::links()->adminPage()->add_child("See posts here")
        );
    }
}

class FormFeedbackForCreateAccount extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->createAccount();
    }
    protected function initialFeeback()
    {
        return "";//return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Create","Account"));
    }
    protected function successFeeback()
    {
        return "You have successfully created your account";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->login()->add_child("Login Here")
        );
    }
}
class FormFeedbackForPostStatusUpdate extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->post_status_update();
    }
    protected function initialFeeback()
    {
        return "";//return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Log","In"));
    }
    protected function successFeeback()
    {
        return "Status Updated Created";
    }
    protected function textForNextActions()
    {
        return "";
    }
}

class FormFeedbackForLogin extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->login();
    }
    protected function initialFeeback()
    {
        return "";//return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Log","In"));
    }
    protected function successFeeback()
    {
        return "You are successfully logged in";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminPage()->add_child("Go to control panel")
        );
    }     
}

class FormFeedbackForLogout extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->logout();
    }
    protected function initialFeeback()
    {
        return "";
    }
    protected function successFeeback()
    {
        return "You are successfully logged out";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->home()->add_child("Go home")
        );
    }
}

class FormFeedbackForStartNewPost extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->start_new_post();
    }
    protected function initialFeeback()
    {
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Other","post"));
    }
    protected function successFeeback()
    {
        return "New post created";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",            
            ui::links()->adminEditPost($this->getCmd()->readerForlastResponse()->file_name())->add_child("Start Editing Post")
        );
    }
}

class FormFeedbackForEditPostTitle extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->edit_post_title();
    }
    protected function initialFeeback()
    {
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Change","title"));
    }
    protected function successFeeback()
    {
        return "Title changed successfully";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminEditPost($this->getCmd()->readerForlastResponse()->file_name())->add_child("See Result")
        );
    }
}

class FormFeedbackForAddPhotoCredits extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->add_photo_credit();
    }
    protected function initialFeeback()
    {
        return "";
    }
    protected function successFeeback()
    {
        return "Added Photo Credits";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminEditPost($this->getCmd()->readerForlastResponse()->file_name())->add_child("See Result")
        );
    }
}
class FormFeedbackForDeletePost extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->deletePost();
    }
    protected function initialFeeback()
    {
        return "";//ui::html()->heading1()->add_child(ui::text_with_contrast_colors("You may","delete this post"));
    }
    protected function successFeeback()
    {
        return "Post deleted successfully";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminViewPosts()->add_child("See list of posts")
        );
    }
}

class FormFeedbackForPublishPost extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->publishPost();
    }
    protected function initialFeeback()
    {
        return ""; //ui::html()->heading1()->add_child(ui::text_with_contrast_colors("Publish","this post"));
    }
    protected function successFeeback()
    {
        return "Post published";
    }

    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminViewPosts()->add_child("See list of posts")
        );
    }
    
}

class FormFeedbackForUnPublishPost extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->unpublish_post();
    }
    protected function initialFeeback()
    {
        return ""; //ui::html()->heading1()->add_child(ui::text_with_contrast_colors("Publish","this post"));
    }
    protected function successFeeback()
    {
        return "Post Unpublished";
    }

    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminViewPosts()->add_child("See list of un-published posts")
        );
    }
}

class FormFeedbackForPostComment extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->post_comment();
    }
    protected function initialFeeback()
    {
        return ""; //ui::html()->heading1()->add_child(ui::text_with_contrast_colors("Publish","this post"));
    }
    protected function successFeeback()
    {
        return "Comment Posted";
    }

    protected function textForNextActions()
    {
        return "";
        /*return sprintf("%s",
            ui::links()->adminViewPosts()->add_child("See list of un-published posts")
        );*/
    }
}

class FormFeedbackForApproveComment extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->approve_comment();
    }
    protected function initialFeeback()
    {
        return "";
    }
    protected function successFeeback()
    {
        return "Comment Approved";
    }

    protected function textForNextActions()
    {
        return "";
        /*return sprintf("%s",
            ui::links()->adminViewPosts()->add_child("See list of un-published posts")
        );*/
    }
}
class FormFeedbackForMoveCommentToTrash extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->move_comment_to_trash();
    }
    protected function initialFeeback()
    {
        return "";
    }
    protected function successFeeback()
    {
        return "Comment Trashed";
    }

    protected function textForNextActions()
    {
        return "";
        /*return sprintf("%s",
            ui::links()->adminViewPosts()->add_child("See list of un-published posts")
        );*/
    }
}
class FormFeedbackForMoveCommentToSpam extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->move_comment_to_spam();
    }
    protected function initialFeeback()
    {
        return "";
    }
    protected function successFeeback()
    {
        return "Comment Moved to Spam";
    }

    protected function textForNextActions()
    {
        return "";
        /*return sprintf("%s",
            ui::links()->adminViewPosts()->add_child("See list of un-published posts")
        );*/
    }
}

class FormFeedbackForPublishAllPosts extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->publishAllPosts();
    }
    protected function initialFeeback()
    {
        return ""; //ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Publish","all posts"));
    }
    protected function successFeeback()
    {
        return "All your posts were published";
    }

    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminViewPostsPublished()->add_child("See published posts")
        );
    }
}
class FormFeedbackForEditPostContent extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->edit_post_content();
    }
    protected function initialFeeback()
    {
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Edit","introduction"));
    }
    protected function successFeeback()
    {
        return "Introduction updated successfully";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminEditPost($this->getCmd()->readerForlastResponse()->file_name())->add_child("See Result")
        );
    }
}



class FormFeedbackForEditExtendedPostContent extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->edit_extended_post_content();
    }
    protected function initialFeeback()
    {
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Edit","full details"));
    }
    protected function successFeeback()
    {
        return "details updated successfully";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminEditPost($this->getCmd()->readerForlastResponse()->file_name())->add_child("See Result")
        );
    }
}

class FormFeedbackForEditPostPicture extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->edit_post_picture();
    }
    protected function initialFeeback()
    {
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Change","picture"));
    }
    protected function successFeeback()
    {
        return "Picture Changed successfully";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminEditPost($this->getCmd()->readerForlastResponse()->file_name())->add_child("See Result")
        );
    }
}

class FormFeedbackForEditPostVideo extends BaseClassForFormFeedback{

    public function __construct()
    {
    }

    protected function getCmd()
    {
        return app::cmds()->edit_post_video();
    }
    protected function initialFeeback()
    {
        return ui::html()->heading2()->add_child(ui::text_with_contrast_colors("Enter","Youtube Id"));
    }
    protected function successFeeback()
    {
        return "Video Changed successfully";
    }
    protected function textForNextActions()
    {
        return sprintf("%s",
            ui::links()->adminEditPost($this->getCmd()->readerForlastResponse()->file_name())->add_child("See Result")
        );
    }
}
