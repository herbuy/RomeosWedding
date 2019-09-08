<?php
class BrowserFieldForCmd extends BrowserField{
    //todo: obtain a command object, based on the value in the browser field for cmd
    protected function getName()
    {
        return app::values()->cmd();
    }
    protected function trimWhiteSpaceBeforeReturnValue(){
        return true;
    }
    public function toCmd(){
        $cmd = null;
        $value = $this->value();

        switch ($value){
            case "":
                $cmd = app::cmds()->notifyEmptyCmd();
                break;

            case app::values()->create_account():
                $cmd = app::cmds()->createAccount();
                break;
            case app::values()->login():
                $cmd = app::cmds()->login();
                break;
            case app::values()->logout():
                $cmd = app::cmds()->logout();
                break;
            case app::values()->start_new_post():
                $cmd = app::cmds()->startNewPost();
                break;
            case app::values()->create_multiple_posts():
                $cmd = app::cmds()->createMultiplePosts();
                break;
            case app::values()->delete_post():
                $cmd = app::cmds()->deletePost();
                break;
            case app::values()->publish_post():
                $cmd = app::cmds()->publishPost();
                break;
            case app::values()->unpublish_post():
                $cmd = app::cmds()->unpublish_post();
                break;
            case app::values()->unpublish_selected_posts():
                $cmd = app::cmds()->unpublish_selected_posts();
                break;
            case app::values()->publish_selected_posts():
                $cmd = app::cmds()->publish_selected_posts();
                break;
            case app::values()->like_the_post():
                $cmd = app::cmds()->like_the_post();
                break;
            case app::values()->register_the_view():
                $cmd = app::cmds()->register_the_view();
                break;
            case app::values()->post_comment():
                $cmd = app::cmds()->post_comment();
                break;
            case app::values()->approve_comment():
                $cmd = app::cmds()->approve_comment();
                break;
            case app::values()->move_comment_to_trash():
                $cmd = app::cmds()->move_comment_to_trash();
                break;
            case app::values()->move_comment_to_spam():
                $cmd = app::cmds()->move_comment_to_spam();
                break;
            case app::values()->publish_all_posts():
                $cmd = app::cmds()->publishAllPosts();
                break;
            case app::values()->admin_edit_post_title():
                $cmd = app::cmds()->edit_post_title();
                break;
            case app::values()->admin_edit_post_video():
                $cmd = app::cmds()->edit_post_video();
                break;
            case app::values()->admin_edit_post_content():
                $cmd = app::cmds()->edit_post_content();
                break;
            case app::values()->admin_edit_post_picture():
                $cmd = app::cmds()->edit_post_picture();
                break;
            case app::values()->admin_edit_extended_post_content():
                $cmd = app::cmds()->edit_extended_post_content();
                break;
            case app::values()->add_image():
                $cmd = app::cmds()->addImage();
                break;
            case app::values()->attach_image_to_post():
                $cmd = app::cmds()->attachImageToPost();
                break;            
            case app::values()->get_data_page():
                $cmd = app::cmds()->GetDataPage();
                break;

            case app::values()->add_photo_credit():
                $cmd = app::cmds()->add_photo_credit();
                break;
            //TODO: ============ APP SPECIFIC
            case app::values()->post_product():                
                $cmd = app::cmds()->post_product();
                break;
            case app::values()->post_facility():
                $cmd = app::cmds()->post_facility();
                break;
            case app::values()->post_work():                
                $cmd = app::cmds()->post_work();
                break;
            case app::values()->post_article():
                $cmd = app::cmds()->post_article();
                break;
            case app::values()->post_event():
                $cmd = app::cmds()->post_event();
                break;
            case app::values()->post_profile():
                $cmd = app::cmds()->post_profile();
                break;
            case app::values()->post_status_update():
                $cmd = app::cmds()->post_status_update();
                break;

            case app::values()->post_picture():
                $cmd = app::cmds()->post_picture();
                break;
            case app::values()->post_product_picture():
                $cmd = app::cmds()->post_product_picture();
                break;
            case app::values()->post_facility_photo():
                $cmd = app::cmds()->post_facility_photo();
                break;
            case app::values()->post_work_photo():
                $cmd = app::cmds()->post_work_photo();
                break;
            case app::values()->post_event_photo():
                $cmd = app::cmds()->post_event_photo();
                break;
            case app::values()->post_profile_photo():
                $cmd = app::cmds()->post_profile_photo();
                break;
            case app::values()->post_article_photo():
                $cmd = app::cmds()->post_article_photo();
                break;
            case app::values()->post_status_photo():
                $cmd = app::cmds()->post_status_photo();
                break;
            case app::values()->post_video():
                $cmd = app::cmds()->post_video();
                break;
            case app::values()->edit_product_type():
                $cmd = app::cmds()->edit_product_type();
                break;
            case app::values()->edit_facility_type():
                $cmd = app::cmds()->edit_facility_type();
                break;
            case app::values()->edit_work_type():
                $cmd = app::cmds()->edit_work_type();
                break;
            case app::values()->edit_event_type():
                $cmd = app::cmds()->edit_event_type();
                break;
            case app::values()->edit_profile_type():
                $cmd = app::cmds()->edit_profile_type();
                break;
            case app::values()->edit_article_type():
                $cmd = app::cmds()->edit_article_type();
                break;


            //=======================
            default:
                $cmd = app::cmds()->doNothing();
                break;
        }
        return $cmd;
    }
}