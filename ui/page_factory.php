<?php
class PageFactory{
    public function home(){
        return new HomePageForWebsite();
    }
    
    public function create_account()
    {
        return  new HomePageForCreateAccount();
    }
    public function login()
    {
        return  new HomePageForLogin();
    }
    public function search()
    {
        return  new HomePageForSearch();
    }
    public function admin()
    {
        return  new HomePageForAdmin();
    }
    public function super_admin()
    {
        return  new HomePageForSuperAdmin();
    }
    public function super_admin_daily_performance()
    {
        return  new HomePageForSuperAdminDailyPerformance();
    }
    public function super_admin_get_posts_published_on_selected_days()
    {
        return  new HomePageForSuperAdminPostsPublishedOnSelectedDays();
    }




    public function get_post()
    {
        return  new HomePageForPost();
    }
    public function user_profile()
    {
        return  new HomePageForUser();
    }

    public function admin_add_images()
    {
        return new PageForAdminAddImages();
    }

    public function admin_view_posts()
    {
        return new HomePageForAdminViewDraftPosts();
    }
    public function admin_preview_draft_posts()
    {
        return new HomePageForAdminPreviewDraftPosts();
    }

    public function admin_view_posts_published()
    {
        return new HomePageForAdminViewPostsPublished();
    }
    
    public function admin_statistics()
    {
        return new HomePageForAdminStatistics();
    }
    public function admin_edit_post()
    {
        return new HomePageForAdminEditPost();
    }
    public function admin_edit_post_preview()
    {
        return new HomePageForAdminEditPostPreview();
    }
    public function admin_edit_post_title()
    {
        return new HomePageForAdminEditPostTitle();
    }
    public function admin_edit_post_photo()
    {
        return new HomePageForAdminEditPostPhoto();
    }


    public function admin_edit_post_content()
    {
        return new HomePageForAdminEditPostContent();
    }
    public function admin_edit_extended_post_content()
    {
        return new HomePageForAdminEditExtendedPostContent();
    }
    public function admin_edit_post_picture()
    {
        return new HomePageForAdminEditPostPicture();
    }

    public function about_us()
    {
        return new HomePageForAboutUs();
    }

    public function contact_us()
    {
        return new HomePageForContactUs();
    }

    //todo: app specific
    public function department()
    {
        return new HomePageForDepartment();        
    }

    public function products()
    {
        return new HomePageForProducts();
    }
    public function facilities()
    {
        return new HomePageForFacilities();
    }
    public function work()
    {
        return new HomePageForWork();
    }
    public function articles()
    {
        return new HomePageForArticles();
    }
    public function events()
    {
        return new HomePageForEvents();
    }
    public function profiles()
    {
        return new HomePageForProfiles();
    }

    public function product_type()
    {
        return new HomePageForProductType();
    }
    public function work_type()
    {
        return new HomePageForWorkType();
    }
    public function facility_type()
    {
        return new HomePageForFacilityType();
    }
    public function article_type()
    {
        return new HomePageForArticleType();
    }
    public function event_type()
    {
        return new HomePageForEventType();
    }
    public function profile_type()
    {
        return new HomePageForProfileType();
    }

    public function admin_add()
    {
        return new HomePageForAdminAddPost();
    }
    public function admin_add_product()
    {
        return new HomePageForAddProduct();
    }

    public function admin_add_facility()
    {
        return new HomePageForAddFacility();
    }
    public function admin_add_work()
    {
        return new HomePageForAddWork();
    }
    public function admin_add_article()
    {
        return new HomePageForAddArticle();
    }
    public function admin_add_event()
    {
        return new HomePageForAddEvent();
    }
    public function admin_add_profile()
    {
        return new HomePageForAddProfile();
    }
    public function admin_add_status_update()
    {
        return new HomePageForAddStatusUpdate();
    }

    public function admin_add_product_of_type()
    {
        return new HomePageForAddProductOfType();
    }

    public function admin_add_facility_of_type()
    {
        return new HomePageForAddFacilityOfType();
    }
    public function admin_add_work_of_type()
    {
        return new HomePageForAddWorkOfType();
    }
    public function admin_add_article_of_type()
    {
        return new HomePageForAddArticleOfType();
    }
    public function admin_add_event_of_type()
    {
        return new HomePageForAddEventOfType();
    }
    public function admin_add_profile_of_type()
    {
        return new HomePageForAddProfileOfType();
    }
    public function admin_add_status_update_of_type()
    {
        return new HomePageForAddStatusUpdateOfType();
    }

    public function content_onboarding()
    {
        return new HomePageForContentOnboarding();
    }
    public function content_planning()
    {
        return new HomePageForContentPlanning();
    }
    public function content_research_and_ideation()
    {
        return new HomePageForContentResearchAndIdeation();
    }
    public function content_creation()
    {
        return new HomePageForContentCreation();
    }
    public function content_editing()
    {
        return new HomePageForContentEditing();
    }
    public function content_auditing()
    {
        return new HomePageForContentAudting();
    }
    public function content_quality_and_credibility()
    {
        return new HomePageForQualityAndCredibility();
    }
    public function content_expert_round_up()
    {
        return new HomePageForContentExpertRoundUp();
    }
    public function content_inbound()
    {
        return new HomePageForContentInbound();
    }
    public function content_publishing()
    {
        return new HomePageForContentPublishing();
    }
    public function content_promotion()
    {
        return new HomePageForContentPromotion();
    }
    public function content_marketing()
    {
        return new HomePageForContentMarketing();
    }
    public function content_guest_posts()
    {
        return new HomePageForGuestPosts();
    }
    public function content_statistics_and_records()
    {
        return new HomePageForStatisticsAndRecords();
    }
    public function content_outdated()
    {
        return new HomePageForContentOutdated();
    }
    public function content_memes()
    {
        return new HomePageForContentMemes();
    }

    public function admin_products()
    {
        return new HomePageForAdminProducts();
    }
    public function admin_facilities()
    {
        return new HomePageForAdminFacilities();
    }
    public function admin_work()
    {
        return new HomePageForAdminWork();
    }
    public function admin_profiles()
    {
        return new HomePageForAdminProfiles();
    }
    public function admin_photos()
    {
        return new HomePageForAdminPhotos();
    }
    public function admin_tips()
    {
        return new HomePageForAdminTips();
    }
    public function admin_status()
    {
        return new HomePageForAdminStatusUpdates();
    }

    


}