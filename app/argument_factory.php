<?php
class ArgumentFactory{
    public function function_names()
    {
        return new InputForFunctionNames();
    }

    public function file_name()
    {
        return new InputForFileName();
    }
    public function csv_file_names()
    {
        return new InputForCSVFileNames();
    }
    public function csv_selected_days()
    {
        return new InputForCSVSelectedDays();
    }

    public function entity_id()
    {
        return new InputForEntityId();
    }

    public function title()
    {
        return new InputForTitle();
    }
    public function title_array()
    {
        return new InputForTitleArray();
    }

    public function content()
    {
        return new InputForContent();
    }
    public function content_array()
    {
        return new InputForContentArray();
    }
    public function extended_post_content()
    {
        return new InputForExtendedPostContent();
    }
    public function extended_post_content_array()
    {
        return new InputForExtendedPostContentArray();
    }
    
    public function youtube_video_id()
    {
        return new InputForYoutubeVideoId();
    }

    public function keywords()
    {
        return new InputForKeywords();
    }

    public function full_name()
    {
        return new InputForFullName();
    }

    public function email_address()
    {
        return new InputForEmailAddress();
    }    
    
    public function password()
    {
        return new InputForPassword();
    }
    
    //todo: app specific
    public function department_code()
    {
        return new InputForDepartmentCode();
    }
    public function product_type_code($can_be_null=false)
    {
        return new InputForProductTypeCode($can_be_null);
    }
    
    public function facility_type_code($can_be_null=false)
    {
        return new InputForFacilityTypeCode($can_be_null);
    }
   
    public function work_type_code($can_be_null=false)
    {
        return new InputForWorkTypeCode($can_be_null);
    }
    
    public function article_type_code($can_be_null=false)
    {
        return new InputForArticleTypeCode($can_be_null);
    }
    
    public function event_type_code($can_be_null=false)
    {
        return new InputForEventTypeCode($can_be_null);
    }
   
    public function profile_type_code($can_be_null=false)
    {
        return new InputForProfileTypeCode($can_be_null);
    }
    
    public function status_type_code($can_be_null=false)
    {
        return new InputForStatusTypeCode($can_be_null);
    }
   
    public function item_rating()
    {
        return new InputForItemRating();
    }
    public function mobile_number()
    {
        return new InputForMobileNumber();
    }
    public function url()
    {
        return new InputForUrl();
    }
    public function selling_price()
    {
        return new InputForSellingPrice();
    }
    public function rental_price()
    {
        return new InputForRentalPrice();
    }
    public function currency_code()
    {
        return new InputForCurrencyCode();
    }

    public function optional_start_index()
    {
        return new OptionalInputForStartIndex();
    }
    public function optional_max_number()
    {
        return new OptionalInputForMaxNumber();
    }
    public function optional_search_query()
    {
        return new OptionalInputForSearchQuery();
    }


}