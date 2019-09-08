<?php
class SQLIdentifierForMotokaviews extends SQLIdentifier{
    public function toCurrentTimestamp(){
        return $this->toSQLValue(Db::computed_values()->current_timestamp());        
    }
    public function isCurrentUser()
    {
        return $this->isEqualTo(Db::computed_values()->current_user_id_before_validating());
    }
}

class DbTableFactory{
    public function name($name){
        return new SQLTableIdentifier($name);
    }
    public function posts(){
        return $this->name(app::values()->posts());
    }
    public function item_types(){
        return $this->name(app::values()->item_types());
    }
    
}
class DbFieldFactory{
    private function new_($value){
        return new SQLIdentifierForMotokaviews($value);
    }
    public function file_name(){
        return $this->new_(app::values()->file_name());
    }
    public function title()
    {
        return $this->new_(app::values()->title());
    }
    public function content()
    {
        return $this->new_(app::values()->content());
    }
    public function timestamp()
    {
        return $this->new_(app::values()->timestamp());
    }
    public function year()
    {
        return $this->new_(app::values()->year());
    }
    public function month()
    {
        return $this->new_(app::values()->month());
    }
    public function day()
    {
        return $this->new_(app::values()->day());
    }
    public function day_of_the_week()
    {
        return $this->new_(app::values()->day_of_the_week());
    }

    public function entity_id()
    {
        return $this->new_(app::values()->entity_id());
    }

    public function row_id()
    {
        return $this->new_(app::values()->row_id());
    }

    public function picture_file_name()
    {
        return $this->new_(app::values()->picture_file_name());
    }

    public function content_type()
    {
        return $this->new_(app::values()->content_type());
    }

    public function src()
    {
        return $this->new_(app::values()->src());
    }
    public function alt()
    {
        return $this->new_(app::values()->alt());
    }

    public function extended_post_content()
    {
        return $this->new_(app::values()->extended_post_content());
    }

    public function href()
    {
        return $this->new_(app::values()->href());
    }

    public function width()
    {
        return $this->new_(app::values()->width());
    }
    public function height()
    {
        return $this->new_(app::values()->height());
    }

    public function rating()
    {
        return $this->new_(app::values()->rating());
    }

    #============ date related
    public function date_in_full()
    {
        return $this->new_(app::values()->date_in_full());
    }
    public function year_number()
    {
        return $this->new_(app::values()->year_number());
    }
    public function month_number()
    {
        return $this->new_(app::values()->month_number());
    }
    public function month_name()
    {
        return $this->new_(app::values()->month_name());
    }
    public function month_description()
    {
        return $this->new_(app::values()->month_description());
    }
    public function week_of_the_year_number()
    {
        return $this->new_(app::values()->week_of_the_year_number());
    }
    public function week_of_the_year_description()
    {
        return $this->new_(app::values()->week_of_the_year_description());
    }
    public function day_name()
    {
        return $this->new_(app::values()->day_name());
    }
    public function day_of_the_week_number()
    {
        return $this->new_(app::values()->day_of_the_week_number());
    }
    public function day_of_the_month_number()
    {
        return $this->new_(app::values()->day_of_the_month_number());
    }
    public function day_of_the_year_number()
    {
        return $this->new_(app::values()->day_of_the_year_number());
    }
    public function day_of_the_year_description()
    {
        return $this->new_(app::values()->day_of_the_year_description());
    }

    public function password_hash()
    {
        return $this->new_(app::values()->password_hash());
    }
    public function email_address()
    {
        return $this->new_(app::values()->email_address());
    }

    public function session_id()
    {
        return $this->new_(app::values()->session_id());
    }

    public function session_id_hash()
    {
        return $this->new_(app::values()->session_id_hash());
    }

    public function youtube_video_id()
    {
        return $this->new_(app::values()->youtube_video_id());
    }

    //======= item types
    public function item_type_code()
    {
        return $this->new_(app::values()->item_type_code());
    }
    public function author_id()
    {
        return $this->new_(app::values()->author_id());
    }

    public function product_type_code()
    {
        return $this->new_(app::values()->product_type_code());
    }

    public function facility_type_code()
    {
        return $this->new_(app::values()->facility_type_code());
    }

    public function work_type_code()
    {
        return $this->new_(app::values()->work_type_code());
    }

    public function event_type_code()
    {
        return $this->new_(app::values()->event_type_code());
    }

    public function profile_type_code()
    {
        return $this->new_(app::values()->profile_type_code());
    }

    public function article_type_code()
    {
        return $this->new_(app::values()->article_type_code());
    }

    public function article_dept_code()
    {
        return $this->new_(app::values()->article_dept_code());
    }

    //========================= item types
    public function item_types()
    {
        return $this->new_(app::values()->item_types());
    }
    public function item_type_as_single()
    {
        return $this->new_(app::values()->item_type_as_single());
    }

    public function item_type_as_plural()
    {
        return $this->new_(app::values()->item_type_as_plural());
    }

    //====product types
    public function product_types()
    {
        return $this->new_(app::values()->product_types());
    }
    public function product_type_as_single()
    {
        return $this->new_(app::values()->product_type_as_single());
    }

    public function product_type_as_plural()
    {
        return $this->new_(app::values()->product_type_as_plural());
    }

    //work type
    public function work_types()
    {
        return $this->new_(app::values()->work_types());
    }
    public function work_type_as_single()
    {
        return $this->new_(app::values()->work_type_as_single());
    }

    public function work_type_as_plural()
    {
        return $this->new_(app::values()->work_type_as_plural());
    }

    //event

    public function event_types()
    {
        return $this->new_(app::values()->event_types());
    }
    public function event_type_as_single()
    {
        return $this->new_(app::values()->event_type_as_single());
    }

    public function event_type_as_plural()
    {
        return $this->new_(app::values()->event_type_as_plural());
    }

    //======= facilities
    public function facility_types()
    {
        return $this->new_(app::values()->facility_types());
    }
    public function facility_type_as_single()
    {
        return $this->new_(app::values()->facility_type_as_single());
    }

    public function facility_type_as_plural()
    {
        return $this->new_(app::values()->facility_type_as_plural());
    }
    //====== articles
    public function article_types()
    {
        return $this->new_(app::values()->article_types());
    }
    public function article_type_as_single()
    {
        return $this->new_(app::values()->article_type_as_single());
    }

    public function article_type_as_plural()
    {
        return $this->new_(app::values()->article_type_as_plural());
    }

    //====== profile
    public function profile_types()
    {
        return $this->new_(app::values()->profile_types());
    }
    public function profile_type_as_single()
    {
        return $this->new_(app::values()->profile_type_as_single());
    }

    public function profile_type_as_plural()
    {
        return $this->new_(app::values()->profile_type_as_plural());
    }

    public function can_be_published()
    {
        return $this->new_(app::values()->can_be_published());
    }
    public function can_be_viewed_by_search_engines()
    {
        return $this->new_(app::values()->can_be_viewed_by_search_engines());
    }
    public function can_be_rated()
    {
        return $this->new_(app::values()->can_be_rated());
    }

    public function keywords()
    {
        return $this->new_(app::values()->keywords());
    }

    public function full_name()
    {
        return $this->new_(app::values()->full_name());
    }

    public function user_type()
    {
        return $this->new_(app::values()->user_type());
    }

    public function user_type_code()
    {
        return $this->new_(app::values()->user_type_code());
    }

    public function user_type_as_single()
    {
        return $this->new_(app::values()->user_type_as_single());
    }
    public function user_type_as_plural()
    {
        return $this->new_(app::values()->user_type_as_plural());
    }

    public function department_code()
    {
        return $this->new_(app::values()->department_code());
    }
    public function department_description()
    {
        return $this->new_(app::values()->department_description());
    }

    public function approval_status_code()
    {
        return $this->new_(app::values()->approval_status_code());
    }

    public function approval_status_text()
    {
        return $this->new_(app::values()->approval_status_text());
    }

    public function hash_code()
    {
        return $this->new_(app::values()->hash_code());
    }

    public function currency_code()
    {
        return $this->new_(app::values()->currency_code());
    }
    public function currency_description()
    {
        return $this->new_(app::values()->currency_description());
    }

    public function access_type_code()
    {
        return $this->new_(app::values()->access_type_code());
    }
    public function access_type()
    {
        return $this->new_(app::values()->access_type());
    }

    public function item_entity_id()
    {
        return $this->new_(app::values()->item_entity_id());
    }

    public function mobile_number()
    {
        return $this->new_(app::values()->mobile_number());
    }

    public function url()
    {
        return $this->new_(app::values()->url());
    }

    public function selling_price()
    {
        return $this->new_(app::values()->selling_price());
    }
    public function selling_price_units()
    {
        return $this->new_(app::values()->selling_price_units());
    }
    public function rental_price()
    {
        return $this->new_(app::values()->rental_price());
    }
    public function rental_price_units()
    {
        return $this->new_(app::values()->rental_price_units());
    }

    public function about()
    {
        return $this->new_(app::values()->about());
    }

    public function status_type_code()
    {
        return $this->new_(app::values()->status_type_code());
    }
    public function status_type()
    {
        return $this->new_(app::values()->status_type());
    }

    public function post_id()
    {
        return $this->new_(app::values()->post_id());
    }

    public function stem_location()
    {
        return $this->new_(app::values()->stem_location());
    }
    public function stem()
    {
        return $this->new_(app::values()->stem());
    }
    
    public function stem_count()
    {
        return $this->new_(app::values()->stem_count());
    }
    public function stem_doc_frequency()
    {
        return $this->new_(app::values()->stem_doc_frequency());
    }
    public function stem_suffix()
    {
        return $this->new_(app::values()->stem_suffix());
    }
    public function stem_suffix_weight()
    {
        return $this->new_(app::values()->stem_suffix_weight());
    }
    public function location_min_weight()
    {
        return $this->new_(app::values()->location_min_weight());
    }
    public function location_max_weight()
    {
        return $this->new_(app::values()->location_max_weight());
    }

    public function total_score()
    {
        return $this->new_(app::values()->total_score());
    }

    public function whois()
    {
        return $this->new_(app::values()->whois());
    }

    public function description()
    {
        return $this->new_(app::values()->description());
    }

    public function authority_score()
    {
        return $this->new_(app::values()->authority_score());
    }

    public function total_sources()
    {
        return $this->new_(app::values()->total_sources());
    }
    public function total_phone_contacts()
    {
        return $this->new_(app::values()->total_phone_contacts());
    }
    public function total_mail_contacts()
    {
        return $this->new_(app::values()->total_mail_contacts());
    }
    public function total_web_contacts()
    {
        return $this->new_(app::values()->total_web_contacts());
    }
    public function total_headings()
    {
        return $this->new_(app::values()->total_headings());
    }
    public function total_bullets()
    {
        return $this->new_(app::values()->total_sources());
    }
    public function total_paragraphs()
    {
        return $this->new_(app::values()->total_paragraphs());
    }

    public function url_facebook_page()
    {
        return $this->new_(app::values()->url_facebook_page());
    }
   
    public function url_twitter_page()
    {
        return $this->new_(app::values()->url_twitter_page());
    }
    public function url_linkedin_page()
    {
        return $this->new_(app::values()->url_linkedin_page());
    }
    public function url_youtube_channel()
    {
        return $this->new_(app::values()->url_youtube_channel());
    }
    public function legitimacy_score()
    {
        return $this->new_(app::values()->legitimacy_score());
    }
    public function whatsapp_number()
    {
        return $this->new_(app::values()->whatsapp_number());
    }

    public function total_images()
    {
        return $this->new_(app::values()->total_images());
    }
    public function total_words()
    {
        return $this->new_(app::values()->total_words());
    }
    public function total_outbound_links()
    {
        return $this->new_(app::values()->total_outbound_links());
    }
    public function total_visits()
    {
        return $this->new_(app::values()->total_visits());
    }
    public function total_saves()
    {
        return $this->new_(app::values()->total_saves());
    }
}
