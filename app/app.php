<?php

class app{
    //todo: every app needs an app object as a factory for "factories of other objects"
    //todo: it also reads in the site map such that we can modify it incase of a new post or a deleted one
    public static function settings(){
        return new WebsiteSettings();
    }

    private static $site_map_in_memory = null;
    public static function sitemap()
    {

        if(self::$site_map_in_memory){
            return self::$site_map_in_memory;
        }
        else{
            $file_with_map = app::settings()->host_file_for_php_sitemap();
            if(file_exists($file_with_map)){
                $saved_map = Sitemap::unserializeFile($file_with_map);
                if($saved_map){
                    self::$site_map_in_memory = $saved_map;
                    return self::$site_map_in_memory;
                }
                else{
                    self::$site_map_in_memory = Sitemap::new_instance();
                    return self::$site_map_in_memory;
                }
            }
            else{
                self::$site_map_in_memory = Sitemap::new_instance();
                return self::$site_map_in_memory;
            }
        }

    }

    /** @var ValueFactory $value_factory_cache  */
    private static $value_factory_cache = null;
    public static function values()
    {
        if(!self::$value_factory_cache){
            self::$value_factory_cache = new ValueFactory(); 
        }
        return self::$value_factory_cache;
    }

    private static $browser_field_factory = null;
    public static function browser_fields()
    {
        if(!self::$browser_field_factory){
            self::$browser_field_factory = new BrowserFieldFactory();
        }
        return self::$browser_field_factory;
    }

    public static function result_array()
    {
        return new ResultArrayFactory();
    }

    public static function cmds()
    {
        return new CmdFactory();
    }
    public static function reader($array)
    {
        return new ReaderForValuesStoredInArray($array);
    }
    public static function argument()
    {
        return new ArgumentFactory();
    }

    public static function content_type_id()
    {
        return new ContentTypeIdFactory();
    }

    public static function start_index_for_hiding_home_items()
    {
        return new StartIndexForHidingHomeItems();
    }

    public static function variables()
    {
        return new GlobalVariablesForTheApp();
    }

    public static function possible_ratings()
    {
        return new PossibleRatings();
    }
    public static function user_type_codes()
    {
        return new FactoryForUserTypeCodes();
    }
    public static function dept_type_codes()
    {
        return new FactoryForDepartmentTypeCodes();
    }
    public static function item_type_codes()
    {
        return new FactoryForItemTypeCodes();
    }
    public static function product_type_codes()
    {
        return new FactoryForProductTypeCodes();
    }
    public static function event_type_codes()
    {
        return new FactoryForEventTypeCodes();
    }
    public static function facility_type_codes()
    {
        return new FactoryForFacilityTypeCodes();
    }
    public static function work_type_codes()
    {
        return new FactoryForWorkTypeCodes();
    }
    public static function profile_type_codes()
    {
        return new FactoryForProfileTypeCodes();
    }
    public static function article_type_codes()
    {
        return new FactoryForArticleTypeCodes();
    }
    public static function access_type_codes()
    {
        return new FactoryForAccessTypeCodes();
    }
    public static function approval_status_codes()
    {
        return new FactoryForApprovalStatusCodes();
    }

    public static function exit_if_frame($output)
    {
        if(app::browser_fields()->is_iframe()->is_true()){
            print (new SmartStyleTag())->add_child( new PageCSS());
            print $output;exit;
        }        
    }

    public static function utils()
    {
        return new FactoryForUtils();
    }

    public static function currency_codes()
    {
        return new FactoryForCurrencyCodes();
    }

    public static function status_type_codes()
    {
        return new FactoryForStatusTypeCodes();
    }

    public static function media_type_codes()
    {
        return new FactoryForMediaTypeCodes();
    }

    public static function debug()
    {
        return new FactoryForDebug();
    }

    public static function stem_locations()
    {
        return new FactoryForStemLocations();
    }

    public static function uploaded_pictures()
    {
        return new FactoryForUploadedPictures();
    }
}
class FactoryForUploadedPictures{
    
    private $base_directory = "app/pictures_uploaded";
    public function delete($picture_file_name)
    {
        $full_file_name = $this->base_directory ."/".urlencode($picture_file_name);        
        @unlink($full_file_name);
    }
}

class FactoryForStemLocations{

    public function title()
    {
        return __FUNCTION__;
    }
    public function content()
    {
        return __FUNCTION__;
    }
}
class FactoryForDebug{

    public function print_and_exit($query)
    {
        print $query;
        exit;
    }

    public function log($string)
    {
        file_put_contents("._debug_info.txt",$string."\r\n",FILE_APPEND);
        
    }

    private static $request_log = [];
    public function start_request_log()
    {
        self::$request_log = [
            "time"=>date('Y-m-d-h-i-s'),
            "parameters"=>$_REQUEST,
            "source_ip"=>$_SERVER['REMOTE_ADDR'],
            "user_agent"=>$_SERVER['HTTP_USER_AGENT'],
            "error"=>"",
            "content"=>""
        ];
    }
    public function add_to_request_log($key,$value){
        self::$request_log[$key] = $value;
    }
    public function write_request_log(){
        file_put_contents(".request_log.txt",json_encode(self::$request_log)."\r\n",FILE_APPEND);
        self::$request_log = [];
    }
}
class FactoryForMediaTypeCodes{
    public function photo(){
        return __FUNCTION__;
    }
    public function video(){
        return __FUNCTION__;
    }
}
class FactoryForStatusTypeCodes{
    public function attending_event()
    {
        return __FUNCTION__;
    }
    public function attended_event()
    {
        return __FUNCTION__;
    }
    public function will_be_attending_event()
    {
        return __FUNCTION__;
    }

    public function getting_married()
    {
        return __FUNCTION__;
    }

    public function just_married()
    {
        return __FUNCTION__;
    }

    public function performing_at_event()
    {
        return __FUNCTION__;
    }

    public function performed_at_event()
    {
        return __FUNCTION__;
    }

    public function will_be_performing_at_event()
    {
        return __FUNCTION__;
    }

    public function providing_service()
    {
        return __FUNCTION__;
    }

    public function provided_service()
    {
        return __FUNCTION__;
    }

    public function will_be_providing_service()
    {
        return __FUNCTION__;
    }
}

class FactoryForCurrencyCodes{
    public function ugx(){
        return __FUNCTION__;
    }
    public function usd(){
        return __FUNCTION__;
    }
}
class FactoryForUtils{

    public function replace_underscores($input_text)
    {
        return str_replace("_"," ",$input_text."");
    }

    public function createCommaSeparatedNumber($text){
        if(!is_numeric($text)){
            return $text;
        }
        //format and return new text object
        $number = strrev("". intval($text));
        $str_result = "";
        $last_index = strlen($number) - 1;
        $first_index = 0;
        for($current_index = $first_index; $current_index <= $last_index ;$current_index++){
            if($current_index % 3 == 0 && $current_index > $first_index){
                $str_result .= ",";
            }
            $str_result .= $number[$current_index];
        }
        //reverse the array
        $comma_separated_value = strrev($str_result);
        return $comma_separated_value;
    }
    public function format_as_currency($text){
        $text = $text ? $text : 0;
        return "Ushs.&nbsp;".self::createCommaSeparatedNumber($text);
    }

    public function format_as_proper_noun($text)
    {
        //replace extra spaces with single space
        $text = preg_replace("/\s+/i"," ",$text);

        //now split using space
        $parts = explode(" ",$text);
        $parts = is_array($parts) ? $parts : array();
        //capitalize each part and make the rest small case
        $resulting_words = array();
        foreach($parts as $part){
            $first_letter = substr($part,0,1);
            $other_letters = substr($part,1);

            $final_word = strtoupper($first_letter).strtolower($other_letters);
            $resulting_words[] = $final_word;
        }
        return join(" ",$resulting_words);
    }
    public function capitalize_first_letter($text)
    {
        $first_letter = strtoupper(substr($text,0,1));
        $other_letters = substr($text,1);
        return $first_letter.$other_letters;
    }
    public function limit_text_to_length($text,$length){
        return strlen($text) > $length ? substr($text,0,$length - 3)."...": $text;
    }
    public function add_label_to_total($total,$label_if_one,$label_otherwise){
        $total = "".$total;
        $output =  sprintf("%s %s",
            $total,
            $total == "1" ? $label_if_one : $label_otherwise
        );
        return $output;
    }

    public function font_size_calc($cur_window_size, $min_window_size=240, $max_window_size=1200, $min_font_size=16, $max_font_size=16)
    {
        $percent = ($cur_window_size - $min_window_size) / ($max_window_size - $min_window_size);
        $cur_font_size = $percent * ($max_font_size - $min_font_size) + $min_font_size;
        $cur_font_size = max($cur_font_size,$min_font_size);
        $cur_font_size = min($cur_font_size,$max_font_size);
        $cur_font_size = round($cur_font_size);
        return $cur_font_size;
    }

    public function make_file_name($entity_id,$entity_text)
    {
        return join("-",[preg_replace("/[\s\W]/i","-",$entity_text),$entity_id]);
    }
}

class FactoryForUserTypeCodes{
    public function admin()
    {
        return __FUNCTION__;
    }
    public function author()
    {
        return __FUNCTION__;
    }
    public function editor()
    {
        return __FUNCTION__;
    }
    public function contributor()
    {
        return __FUNCTION__;
    }
    public function susbcriber()
    {
        return __FUNCTION__;
    }
    public function other()
    {
        return __FUNCTION__;
    }
}
class FactoryForDepartmentTypeCodes{
    public function other()
    {
        return __FUNCTION__;
    }
    public function cake_and_decoration()
    {
        return __FUNCTION__;
    }
    public function food_and_drinks()
    {
        return __FUNCTION__;
    }
    public function gifts_and_cards()
    {
        return __FUNCTION__;
    }
    public function gowns_and_womens_wear()
    {
        return __FUNCTION__;
    }
    public function marriage_and_honey_moon()
    {
        return __FUNCTION__;
    }
    public function massage_and_spa()
    {
        return __FUNCTION__;
    }
    public function venues_reception_and_meetings()
    {
        return __FUNCTION__;
    }
    public function music_and_entertainment()
    {
        return __FUNCTION__;
    }
    public function photography_and_videography()
    {
        return __FUNCTION__;
    }
    public function rings_and_jewelry()
    {
        return __FUNCTION__;
    }
    public function salon_hair_and_makeup()
    {
        return __FUNCTION__;
    }
    public function suits_and_mens_wear()
    {
        return __FUNCTION__;
    }
    public function tents_chairs_and_tables()
    {
        return __FUNCTION__;
    }
    public function event_planning()
    {
        return __FUNCTION__;
    }

}
class FactoryForItemTypeCodes{

    public function product()
    {
        return __FUNCTION__;
    }
    public function work()
    {
        return __FUNCTION__;
    }
    public function article()
    {
        return __FUNCTION__;
    }
    public function event()
    {
        return __FUNCTION__;
    }
    public function facility()
    {
        return __FUNCTION__;
    }
    public function profile()
    {
        return __FUNCTION__;
    }

    public function status_update()
    {
        return __FUNCTION__;
    }
}
class FactoryForProductTypeCodes{

    public function other()
    {
        return __FUNCTION__;
    }
    public function chairs()
    {
        return __FUNCTION__;
    }
    public function engagement_rings()
    {
        return __FUNCTION__;
    }

    public function hand_bags()
    {
        return __FUNCTION__;
    }

    public function invitation_cards()
    {
        return __FUNCTION__;
    }

    public function jewelry()
    {
        return __FUNCTION__;
    }

    public function mens_shoes()
    {
        return __FUNCTION__;
    }

    public function mens_suits()
    {
        return __FUNCTION__;
    }

    public function pa_systems()
    {
        return __FUNCTION__;
    }

    public function platforms()
    {
        return __FUNCTION__;
    }

    public function pledge_cards()
    {
        return __FUNCTION__;
    }

    public function shirts()
    {
        return __FUNCTION__;
    }

    public function tables()
    {
        return __FUNCTION__;
    }

    public function tents()
    {
        return __FUNCTION__;
    }

    public function undergarments()
    {
        return __FUNCTION__;
    }

    public function wedding_gowns()
    {
        return __FUNCTION__;
    }

    public function wedding_rings()
    {
        return __FUNCTION__;
    }

    public function womens_shoes()
    {
        return __FUNCTION__;
    }

    public function dresses()
    {
        return __FUNCTION__;
    }
}
class FactoryForEventTypeCodes{
    public function other()
    {
        return __FUNCTION__;
    }
    public function wedding()
    {
        return __FUNCTION__;
    }
    public function introduction_ceremony()
    {
        return __FUNCTION__;
    }
    public function give_away_ceremony()
    {
        return __FUNCTION__;
    }
    public function wedding_meeting()
    {
        return __FUNCTION__;
    }

    public function bridal_shower()
    {
        return __FUNCTION__;
    }
    public function bachelors_party()
    {
        return __FUNCTION__;
    }
    public function marriage_celebration()
    {
        return __FUNCTION__;
    }
    
    //kasiki and birdal shower
}
class FactoryForFacilityTypeCodes{
    public function other()
    {
        return __FUNCTION__;
    }

    public function gift_shops()
    {
        return __FUNCTION__;
    }
    public function honeymoon_destinations()
    {
        return __FUNCTION__;
    }
    public function introduction_venues()
    {
        return __FUNCTION__;
    }
    public function make_up_studios()
    {
        return __FUNCTION__;
    }
    public function massage_parlors()
    {
        return __FUNCTION__;
    }
    public function indoor_meeting_venues()
    {
        return __FUNCTION__;
    }
    public function outdoor_meeting_venues()
    {
        return __FUNCTION__;
    }
    public function indoor_reception_venues()
    {
        return __FUNCTION__;
    }
    public function outdoor_reception_venues()
    {
        return __FUNCTION__;
    }
}
class FactoryForWorkTypeCodes{
    public function other()
    {
        return __FUNCTION__;
    }

    public function comedy()
    {
        return __FUNCTION__;
    }

    public function dj()
    {
        return __FUNCTION__;
    }

    public function dance()
    {
        return __FUNCTION__;
    }

    public function decoration()
    {
        return __FUNCTION__;
    }

    public function live_band()
    {
        return __FUNCTION__;
    }

    public function mc()
    {
        return __FUNCTION__;
    }

    public function music()
    {
        return __FUNCTION__;
    }

    public function photography()
    {
        return __FUNCTION__;
    }

    public function make_up()
    {
        return __FUNCTION__;
    }

    public function event_planning()
    {
        return __FUNCTION__;
    }

    public function videography()
    {
        return __FUNCTION__;
    }

    public function cake()
    {
        return __FUNCTION__;
    }


}
class FactoryForProfileTypeCodes{
    public function other()
    {
        return __FUNCTION__;
    }
    public function comedian()
    {
        return __FUNCTION__;
    }
    public function dj()
    {
        return __FUNCTION__;
    }
    public function dance_group()
    {
        return __FUNCTION__;
    }
    public function decorator()
    {
        return __FUNCTION__;
    }
    public function hair_stylist()
    {
        return __FUNCTION__;
    }
    public function live_band()
    {
        return __FUNCTION__;
    }
    public function mc()
    {
        return __FUNCTION__;
    }
    public function make_up_artist()
    {
        return __FUNCTION__;
    }
    public function music_artist()
    {
        return __FUNCTION__;
    }
    public function photographer()
    {
        return __FUNCTION__;
    }
    public function event_planner()
    {
        return __FUNCTION__;
    }
    public function videographer()
    {
        return __FUNCTION__;
    }

}
class FactoryForArticleTypeCodes{
    public function other()
    {
        return __FUNCTION__;
    }
    public function wedding_stories()
    {
        return __FUNCTION__;
    }
    
    public function how_to()
    {
        return __FUNCTION__;
    }
    public function check_list()
    {
        return __FUNCTION__;
    }
    public function questions_and_debates()
    {
        return __FUNCTION__;
    }
    public function response()
    {
        return __FUNCTION__;
    }
    public function research_findings()
    {
        return __FUNCTION__;
    }
    public function personality_profile()
    {
        return __FUNCTION__;
    }
    public function life_style()
    {
        return __FUNCTION__;
    }
    public function history_and_culture()
    {
        return __FUNCTION__;
    }
    
    public function trends()
    {
        return __FUNCTION__;
    }
    public function reviews_and_opinion()
    {
        return __FUNCTION__;
    }
    public function expert_opinion()
    {
        return __FUNCTION__;
    }
    public function letter_to_the_editor()
    {
        return __FUNCTION__;
    }
    public function editorial()
    {
        return __FUNCTION__;
    }
    
}

class FactoryForApprovalStatusCodes{
    public function pending_approval(){
        return __FUNCTION__;
    }
    public function approved(){
        return __FUNCTION__;
    }
    public function spam(){
        return __FUNCTION__;
    }
    public function trashed(){
        return __FUNCTION__;
    }
}

class FactoryForAccessTypeCodes{
    public function staff_only(){
        return __FUNCTION__;
    }
    public function open_access(){
        return __FUNCTION__;
    }
}

class PossibleRatings{
    public static function poor(){
        return "poor";
    }
    public static function below_average(){
        return "below-average";
    }
    public static function average(){
        return "average";
    }
    public static function above_average(){
        return "above-average";
    }
    public static function excellent(){
        return "excellent";
    }

    public function as_ORList()
    {
        return join(
            " or ",array(
                self::poor(),self::below_average(),
                self::average(),self::above_average(),self::excellent()
            )
        );
    }
}

class StartIndexForHidingHomeItems{

    public function reviews()
    {
        return 11;
    }
    public function exporter_reviews()
    {
        return 11;
    }
    public function news()
    {
        return $this->exporter_reviews();
    }

    public function car_exporters()
    {
        return 7;
    }

    public function car_maintenance()
    {
        return 15;
    }

    public function careers()
    {
        return 9;
    }

}
class GlobalVariablesForTheApp{

    public function max_num_items_for_multi_upload_of_posts()
    {
        return 20;
    }
}