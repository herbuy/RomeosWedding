<?php
class FormFeedbackFactory{
    public function addImage(){
        return new FormFeedbackForAddImage();
    }

    public function createMultiplePosts()
    {
        return new FormFeedbackForCreateMultiplePosts();
    }


    public function attachImageToPost()
    {
        return new FormFeedbackForAttachImageToPost();
    }
    public function create_account()
    {
        return new FormFeedbackForCreateAccount();
    }
    public function login()
    {
        return new FormFeedbackForLogin();
    }
    public function logout()
    {
        return new FormFeedbackForLogout();
    }
    public function post_status_update()
    {
        return new FormFeedbackForPostStatusUpdate();
    }
    public function start_new_post()
    {
        return new FormFeedbackForStartNewPost();
    }

    public function edit_post_title()
    {
        return new FormFeedbackForEditPostTitle();
    }
    public function add_photo_credits()
    {
        return new FormFeedbackForAddPhotoCredits();
    }
    public function delete_post()
    {
        return new FormFeedbackForDeletePost();
    }
    public function publish_post()
    {
        return new FormFeedbackForPublishPost();
    }
    public function unpublish_post()
    {
        return new FormFeedbackForUnPublishPost();
    }

    public function post_comment()
    {
        return new FormFeedbackForPostComment();
    }
    public function approve_comment()
    {
        return new FormFeedbackForApproveComment();
    }
    public function move_comment_to_trash()
    {
        return new FormFeedbackForMoveCommentToTrash();
    }
    public function move_comment_to_spam()
    {
        return new FormFeedbackForMoveCommentToSpam();
    }

    public function publish_all_posts()
    {
        return new FormFeedbackForPublishAllPosts();
    }

    public function edit_post_content()
    {
        return new FormFeedbackForEditPostContent();
    }
    public function edit_extended_post_content()
    {
        return new FormFeedbackForEditExtendedPostContent();
    }

    public function edit_post_picture()
    {
        return new FormFeedbackForEditPostPicture();
    }

    public function edit_post_video()
    {
        return new FormFeedbackForEditPostVideo();
    }
    public function post_work_photo(){
        return new FormForPostWorkPhoto();
    }
    public function post_event_photo(){
        return new FormForPostEventPhoto();
    }
    public function post_profile_photo(){
        return new FormForPostProfilePhoto();
    }
    public function post_article_photo(){
        return new FormForPostArticlePhoto();
    }

}
