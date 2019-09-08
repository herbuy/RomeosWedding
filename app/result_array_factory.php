<?php

class ResultArrayFactory{
    public function do_nothing(){
        return new ResultArrayForDoNothing();
    }
    public function notify_empty_cmd(){
        return new ResultArrayForNotifyEmptyCmd();
    }
    
    public function get_data_page()
    {
        return new ResultArrayForGetDataPage();
    }

    public function add_image()
    {
        return new ResultArrayForAddImage();
    }

    public function attach_image_to_post()
    {
        return new ResultArrayForAttachImageToPost();
    }

    public function start_new_post()
    {
        return new ResultArrayForStartNewPost();
    }
    
    public function create_multiple_posts()
    {
        return new ResultArrayForCreateMultiplePosts();
    }
    
    public function delete_post()
    {
        return new ResultArrayForDeletePost();
    }

    public function publish_post()
    {
        return new ResultArrayForPublishPost();
    }
    public function unpublish_post()
    {
        return new ResultArrayForUnPublishPost();
    }
    public function unpublish_selected_posts()
    {
        return new ResultArrayForUnPublishSelectedPosts();
    }
    public function publish_selected_posts()
    {
        return new ResultArrayForPublishSelectedPosts();
    }

    public function like_the_post()
    {
        return new ResultArrayForLikeThePost();
    }
    public function register_the_view()
    {
        return new ResultArrayForRegisterViewForThePost();
    }

    public function post_comment()
    {
        return new ResultArrayForPostComment();
    }
    public function approve_comment()
    {
        return new ResultArrayForApproveComment();
    }
    public function move_comment_to_trash()
    {
        return new ResultArrayForMoveCommentToTrash();
    }
    public function move_comment_to_spam()
    {
        return new ResultArrayForMoveCommentToSpam();
    }

    public function publish_all_posts()
    {
        return new ResultArrayForPublishAllPosts();
    }
    public function edit_post_title()
    {
        return new ResultArrayForEditPostTitle();
    }

    public function edit_post_content()
    {
        return new ResultArrayForEditPostContent();
    }

    public function edit_post_picture()
    {
        return new ResultArrayForEditPostPicture();
    }
    public function edit_post_video()
    {
        return new ResultArrayForEditPostVideo();
    }
    public function edit_extended_post_content()
    {
        return new ResultArrayForEditExtendedPostContent();
    }

    public function create_account()
    {
        return new ResultArrayForCreateAccount();
    }
    public function login()
    {
        return new ResultArrayForLogin();
    }
    public function logout()
    {
        return new ResultArrayForLogout();
    }

    //app specific
    public function post_product()
    {        
        return new ResultArrayForPostProduct();
    }
    public function post_facility()
    {
        return new ResultArrayForPostFacility();
    }
    public function post_work()
    {
        return new ResultArrayForPostWork();
    }
    public function post_article()
    {
        return new ResultArrayForPostArticle();
    }
    public function post_event()
    {
        return new ResultArrayForPostEvent();
    }
    public function post_profile()
    {
        return new ResultArrayForPostProfile();
    }
    public function post_status_update()
    {
        return new ResultArrayForPostStatusUpdate();
    }
    public function post_picture()
    {
        return new ResultArrayForPostPicture();
    }
    public function post_product_picture()
    {
        return new ResultArrayForPostProductPicture();
    }
    public function post_facility_photo(){
        return new ResultArrayForPostFacilityPhoto();
    }
    public function post_work_photo(){
        return new ResultArrayForPostWorkPhoto();
    }
    public function post_event_photo(){
        return new ResultArrayForPostEventPhoto();
    }
    public function post_profile_photo(){
        return new ResultArrayForPostProfilePhoto();
    }
    public function post_article_photo(){
        return new ResultArrayForPostArticlePhoto();
    }
    public function post_status_photo(){
        return new ResultArrayForPostStatusPhoto();
    }

    public function post_video()
    {
        return new ResultArrayForPostVideo();
    }

    public function add_photo_credit()
    {
        return new ResultArrayForAddPhotoCredits();
    }
    public function edit_product_type(){
        return new ResultArrayForEditProductType();
    }
    public function edit_facility_type(){
        return new ResultArrayForEditFacilityType();
    }
    public function edit_work_type(){
        return new ResultArrayForEditWorkType();
    }
    public function edit_event_type(){
        return new ResultArrayForEditEventType();
    }
    public function edit_profile_type(){
        return new ResultArrayForEditProfileType();
    }
    public function edit_article_type(){
        return new ResultArrayForEditArticleType();
    }
    
}
