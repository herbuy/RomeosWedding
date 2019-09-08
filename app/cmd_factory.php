<?php
class CmdFactory{
    public function doNothing(){
        return new CmdForDoNothing();
    }
    public function notifyEmptyCmd()
    {
        return new CmdForNotifyEmptyCmd();
    }

    public function createAccount()
    {
        return new CmdForCreateAccount();
    }
    public function login()
    {
        return new CmdForLogin();
    }
    public function logout()
    {
        return new CmdForLogout();
    }
   

    public function startNewPost()
    {
        return new CmdForStartNewPost();
    }
    public function createMultiplePosts()
    {
        return new CmdForCreateMultiplePosts();
    }

    public function deletePost()
    {
        return new CmdForDeletePost();
    }

    public function publishPost()
    {
        return new CmdForPublishPost();
    }

    public function unpublish_post()
    {
        return new CmdForUnPublishPost();
    }
    public function unpublish_selected_posts()
    {
        return new CmdForUnPublishSelectedPosts();
    }
    public function publish_selected_posts()
    {
        return new CmdForPublishSelectedPosts();
    }

    public function like_the_post()
    {
        return new CmdForLikeThePost();
    }
    public function register_the_view()
    {
        return new CmdForRegisterTheView();
    }
    public function post_comment()
    {
        return new CmdForPostComment();
    }
    public function approve_comment()
    {
        return new CmdForApproveComment();
    }
    public function move_comment_to_trash()
    {
        return new CmdForMoveCommentToTrash();
    }
    public function move_comment_to_spam()
    {
        return new CmdForMoveCommentToSpam();
    }

    public function publishAllPosts()
    {
        return new CmdForPublishAllPosts();
    }

    public function addImage()
    {
        return new CmdForAddImage();
    }
    public function attachImageToPost()
    {
        return new CmdForAttachImageToPost();
    }
        
    public function GetDataPage()
    {
        return new CmdForGetDataPage();
    }

    public function start_new_post()
    {
        return new CmdForStartNewPost();
    }

    public function edit_post_title()
    {
        return new CmdForEditPostTitle();
    }
    public function edit_post_content()
    {
        return new CmdForEditPostContent();
    }

    public function edit_post_picture()
    {
        return new CmdForEditPostPicture();
    }

    public function edit_post_video()
    {
        return new CmdForEditPostVideo();
    }

    public function edit_extended_post_content()
    {
        return new CmdForEditExtendedPostContent();
    }

    //app specific
    public function post_product()
    {        
        return new CmdForPostProduct();
    }
    public function post_facility()
    {
        return new CmdForPostFacility();
    }
    public function post_work()
    {
        return new CmdForPostWork();
    }
    public function post_article()
    {
        return new CmdForPostArticle();
    }
    public function post_event()
    {
        return new CmdForPostEvent();
    }
    public function post_profile()
    {
        return new CmdForPostProfile();
    }
    public function post_status_update()
    {
        return new CmdForPostStatusUpdate();
    }
    public function post_picture()
    {
        return new CmdForPostPicture();
    }
    public function post_product_picture()
    {
        return new CmdForPostProductPicture();
    }
    public function post_facility_photo(){
        return new CmdForPostFacilityPhoto();
    }
    public function post_work_photo(){
        return new CmdForPostWorkPhoto();
    }
    public function post_event_photo(){
        return new CmdForPostEventPhoto();
    }
    public function post_profile_photo(){
        return new CmdForPostProfilePhoto();
    }
    public function post_article_photo(){
        return new CmdForPostArticlePhoto();
    }
    public function post_status_photo(){
        return new CmdForPostStatusPhoto();
    }

    public function post_video()
    {
        return new CmdForPostVideo();
    }

    public function add_photo_credit()
    {
        return new CmdForAddPhotoCredit();
    }
    public function edit_product_type(){
        return new CmdForEditProductType();
    }
    public function edit_facility_type(){
        return new CmdForEditFacilityType();
    }
    public function edit_work_type(){
        return new CmdForEditWorkType();
    }
    public function edit_event_type(){
        return new CmdForEditEventType();
    }
    public function edit_profile_type(){
        return new CmdForEditProfileType();
    }
    public function edit_article_type(){
        return new CmdForEditArticleType();
    }


}