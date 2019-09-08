<?php
class BrowserFieldFactory{
    public function from_name($field_name){
        return new BrowserFieldFromName($field_name);
    }
    public function page(){
        return new BrowserFieldForPage();
    }

    public function title()
    {
        return new BrowserFieldForTitle();
    }

    public function youtube_video_id()
    {
        return new BrowserFieldForYoutubeVideoId();
    }

    public function content()
    {
        return new BrowserFieldForContent();
    }

    public function extended_post_content()
    {
        return new BrowserFieldForExtendedPostContent();
    }

    public function cmd()
    {
        return new BrowserFieldForCmd();
    }
    public function keywords()
    {
        return new BrowserFieldForKeywords();
    }
    
    public function file_to_upload()
    {
        return new BrowserFieldForFileToUpload();
    }
    public function file_name()
    {
        return new BrowserFieldForFileName();
    }
    public function entity_id()
    {
        return new BrowserFieldForEntityId();
    }
    public function full_name()
    {
        return new BrowserFieldForFullName();
    }
    public function email_address()
    {
        return new BrowserFieldForEmailAddress();
    }
    public function mobile_number()
    {
        return new BrowserFieldForMobileNumber();
    }
    public function url()
    {
        return new BrowserFieldForUrl();
    }
    
    public function password()
    {
        return new BrowserFieldForPassword();
    }
    public function is_iframe()
    {
        return new BrowserFieldForIsFrame();
    }
    public function item_type_code()
    {
            return new BrowserFieldForItemTypeCode();
    }
    public function product_type_code()
    {
        return new BrowserFieldForProductTypeCode();
    }
    public function facility_type_code()
    {
        return new BrowserFieldForFacilityTypeCode();
    }
    public function work_type_code()
    {
        return new BrowserFieldForWorkTypeCode();
    }
    public function article_type_code()
    {
        return new BrowserFieldForArticleTypeCode();
    }
    public function event_type_code()
    {
        return new BrowserFieldForEventTypeCode();
    }
    public function profile_type_code()
    {
        return new BrowserFieldForProfileTypeCode();
    }
    public function status_type_code()
    {
        return new BrowserFieldForStatusTypeCode();
    }
    public function search_query()
    {
        return new BrowserFieldForSearchQuery();
    }
    public function start_index()
    {
        return new BrowserFieldForStartIndex();
    }
    public function max_number()
    {
        return new BrowserFieldForMaxNumber();
    }
}