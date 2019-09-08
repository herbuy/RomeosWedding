<?php
class UrlFactory{
    public function asset($file_name){
        return new UrlForAsset($file_name);
    }
    public function asset_for_department($file_name){
        return new UrlForAssetForDepartment($file_name);
    }
    public function adminPage(){
        return new UrlForAdminPage();
    }
    public function super_admin(){
        return new UrlForSuperAdminPage();
    }
    public function super_admin_daily_performance()
    {
        return new UrlForSuperAdminDailyPerformance();
    }
    public function super_admin_daily_performance_posts_published_on_selected_days()
    {
        return new UrlForSuperAdminDailyPerformancePostsPublishedOnSelectedDays();
    }
    public function createAccountPage(){
        return new UrlForCreateAccountPage();
    }
    
    public function loginPage(){
        return new UrlForLoginPage();
    }
    public function search()
    {
        return new UrlForSearchPage();
    }

    public function adminEditPost($post_id){
        return new UrlForAdminEditPost($post_id);
    }
    public function adminEditPostPreview($post_id){
        return new UrlForAdminEditPostPreview($post_id);
    }
    
    public function adminEditPostTitle($post_id)
    {
        return new UrlForAdminEditPostTitle($post_id);
    }
    public function adminEditPostImage($post_id)
    {
        return new UrlForAdminEditPostImage($post_id);
    }


    public function adminEditPostContent($post_id)
    {
        return new UrlForAdminEditPostContent($post_id);
    }
    public function adminEditExtendedPostContent($post_id)
    {
        return new UrlForAdminEditExtendedPostContent($post_id);
    }
    
    public function adminChangePostPicture($post_id)
    {
        return new UrlForAdminChangePostPicture($post_id);
    }

    public function adminAddPost($item_type_code='')
    {
        return new UrlForAdminAddPost($item_type_code);
    }

    public function adminAddProduct(){
        return new UrlForAdminAddProduct();
    }

    public function adminAddFacility(){
        return new UrlForAdminAddFacility();
    }

    public function adminAddWork(){
        return new UrlForAdminAddWork();
    }
    
    public function adminAddArticle(){
        return new UrlForAdminAddArticle();
    }

    public function adminAddEvent(){
        return new UrlForAdminAddEvent();
    }

    public function adminAddProfile(){
        return new UrlForAdminAddProfile();
    }
    public function adminAddStatusUpdate(){
        return new UrlForAdminAddStatusUpdate();
    }


    public function adminAddProductOfType($type){
        return new UrlForAdminAddProductOfType($type);
    }

    public function adminAddFacilityOfType($type){
        return new UrlForAdminAddFacilityOfType($type);
    }

    public function adminAddWorkOfType($type){
        return new UrlForAdminAddWorkOfType($type);
    }

    public function adminAddArticleOfType($type){
        return new UrlForAdminAddArticleOfType($type);
    }

    public function adminAddEventOfType($type){
        return new UrlForAdminAddEventOfType($type);
    }

    public function adminAddProfileOfType($type){
        return new UrlForAdminAddProfileOfType($type);
    }

    public function adminAddStatusUpdateOfType($type){
        return new UrlForAdminAddStatusUpdateOfType($type);
    }

    public function manage_posts()
    {
        return new UrlForAdminViewPosts();
    }
    
    public function view_post($post_id)
    {
        return new UrlForViewPost($post_id);
    }
    public function user($file_name)
    {
        return new UrlForUser($file_name);
    }

    public function view_image($picture_file_name)
    {
        return new UrlForViewImage($picture_file_name);
    }

    public function home()
    {
        return new UrlForHome();
    }

    public function add_pictures()
    {
        return new UrlForAddPictures();
    }
    public function attach_picture_to_post($post_id)
    {
        return new UrlForAttachPictureToPost($post_id);
    }
    public function manage_pictures()
    {
        return new UrlForManagePictures();
    }

    public function adminViewPosts()
    {
        return new UrlForAdminViewPosts();
    }
    public function adminPreviewDraftPosts()
    {
        return new UrlForAdminPreviewDraftPosts();
    }

    public function adminViewPostsPublished()
    {
        return new UrlForAdminViewPostsPublished();
    }
    
    public function about()
    {
        return new UrlForAbout();
    }
    public function contacts_us()
    {
        return new UrlForContactUs();
    }

    public function statistics()
    {
        return new UrlForStatistics();
    }
    
    //app specific
    public function department_page($department_code)
    {
        return new UrlForDepartmentPage($department_code);
    }
    public function products()
    {
        return new UrlForProductsPage();
    }
    public function facilities()
    {
        return new UrlForFacilitiesPage();
    }
    public function work()
    {
        return new UrlForWorkPage();
    }
    public function articles()
    {
        return new UrlForArticlesPage();
    }
    public function profiles()
    {
        return new UrlForProfilesPage();
    }
    public function events()
    {
        return new UrlForEventsPage();
    }
    
    
    public function product_type_page($type_code)
    {
        return new UrlForProductTypePage($type_code);
    }
    public function work_type_page($type_code)
    {
        return new UrlForWorkTypePage($type_code);
    }
    public function article_type_page($type_code)
    {
        return new UrlForArticleTypePage($type_code);
    }
    public function facility_type_page($type_code)
    {
        return new UrlForFacilityTypePage($type_code);
    }
    public function event_type_page($type_code)
    {
        return new UrlForEventTypePage($type_code);
    }
    public function profile_type_page($type_code)
    {
        return new UrlForProfileTypePage($type_code);
    }

    public function content_onboarding()
    {
        return new UrlForAdminPage();
    }
    public function content_planning()
    {
        return __FUNCTION__;
    }
    public function content_research_and_ideation()
    {
        return __FUNCTION__;
    }
    public function content_creation()
    {
        return __FUNCTION__;
    }
    public function content_editing()
    {
        return __FUNCTION__;
    }
    public function content_auditing()
    {
        return __FUNCTION__;
    }
    public function content_quality_and_credibility()
    {
        return __FUNCTION__;
    }
    public function content_expert_round_up()
    {
        return __FUNCTION__;
    }
    public function content_inbound()
    {
        return __FUNCTION__;
    }
    public function content_publishing()
    {
        return __FUNCTION__;
    }
    public function content_promotion()
    {
        return __FUNCTION__;
    }
    public function content_marketing()
    {
        return __FUNCTION__;
    }
    public function content_guest_posts()
    {
        return __FUNCTION__;
    }
    public function content_statistics_and_records()
    {
        return __FUNCTION__;
    }
    public function content_outdated()
    {
        return __FUNCTION__;
    }

    public function content_memes()
    {
        return __FUNCTION__;
    }

    public function adminProducts($type='')
    {
        return new UrlForAdminProducts($type);
    }
    public function adminFacilities($type='')
    {
        return new UrlForAdminFacilities($type);
    }
    public function adminWork($type='')
    {
        return new UrlForAdminWork($type);
    }
    public function adminProfiles($type='')
    {
        return new UrlForAdminProfiles($type);
    }
    public function adminPhotos($type='')
    {
        return new UrlForAdminPhotos($type);
    }
    public function adminTips($type='')
    {
        return new UrlForAdminTips($type);
    }
    
    public function adminStatusUpdates($type='')
    {
        return new UrlForAdminStatusUpdates($type);
    }


}