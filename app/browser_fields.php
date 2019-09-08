<?php

abstract class BrowserField{
    //todo: some browser fields and uilities to start with e.g. converting a field to an input field
    //todo: extend the browser field to add more browser fields as your app grows

    //====================================
    abstract protected function getName();
    
    protected function should_be_array(){
        return false;
    }
    
    public function getFinalName(){
        return $this->should_be_array() ? $this->getName()."[]" : $this->getName();
    }

    /** @return FileInput */
    public function toFileInput($default_value=''){
        $file_input = new FileInput();
        return $this->setUpField($file_input, $default_value);
    }
    /** @return FileInput */
    public function toFileInput2($form_name='',$default_value=''){
        $file_input = new FileInput();
        $file_input->opacity(0)->cursor_pointer()->position_absolute()->top("0px")->left("0px")->z_index(3)->height_100percent()->width_100percent();

        if($form_name){
            $file_input->onchange(sprintf("document.forms['%s'].submit();",$form_name));
        }
        return $this->setUpField($file_input, $default_value);
    }

    public function is_array(){
        return is_array($this->value());
    }
    public function is_value($value){
        return $this->value() == $value;
    }

    public function is_true(){
        return $this->value() == app::values()->true();
    }

    private function determineDefaultValue($default_value,$record_index = 0)
    {
        $value_from_browser = $this->value();
        return $this->is_array() ?
            (strlen(@$value_from_browser[$record_index]) > 0 ?
                @$value_from_browser[$record_index] : $default_value)
             :
            (strlen($value_from_browser) > 0 ? $value_from_browser : $default_value);
    }

    /** @return TextInput */
    public function toTextInput($default_value=null,$record_number = 0){
        $default_value = $this->determineDefaultValue($default_value, $record_number);
        return $this->setUpField(new TextInput(), $default_value);
    }
    public function toTextArea($default_value="",$record_number=0){        
        $default_value = $this->determineDefaultValue($default_value, $record_number);
        $text_area = new SmartTextarea();
        $text_area->set_name($this->getFinalName());
        $text_area->add_child($default_value);
        return $text_area;
    }
    /** @return PasswordInput */
    public function toPasswordInput($default_value=''){
        return $this->setUpField(new PasswordInput(), $default_value);
    }
    /** @return HiddenInput */
    public function toHiddenInput($default_value=''){
        return $this->setUpField(new HiddenInput(), $default_value);
    }
    /** @return RadioInput */
    public function toRadioInput($default_value=''){
        return $this->setUpField(new RadioInput(), $default_value);
    }
    /** @return SearchInput */
    public function toSearchInput($default_value=''){
        return $this->setUpField(new SearchInput(), $default_value);
    }

    private function setUpField($text_input_box, $default_value)
    {
        $text_input_box->set_name($this->getFinalName());
        $text_input_box->set_value($default_value);
        return $text_input_box;
    }

    public function readValueFromArray($array){
        if(!is_array($array)){
            throw new Exception("expects array as input");
        }
        return $this->read_key($this->getName(),$array);

    }
    protected function read_key($key,$array){
        $value = array_key_exists($key,$array)? $array[$key]:"";
        $value = $this->should_escape_html_special_chars  ? $this->get_escaped_value($value): $value;
        $value = $this->should_decode_as_utf8 ? $this->get_utf8_decoded_value($value): $value;//todo:order matters: encoding should be last!!
        return $value;
    }
    protected function get_escaped_value($value){
        if(is_array($value)){
            $output = array();
            $count = count($value);
            for($i = 0; $i < $count; $i++){
                $output[] = $this->get_escaped_value($value[$i]);
            }
            return $output;
        }
        else{
            return htmlspecialchars($value."");
        }
    }
    protected function get_utf8_decoded_value($value){
        if(is_array($value)){
            $output = array();
            $count = count($value);
            for($i = 0; $i < $count; $i++){
                $output[] = $this->get_utf8_decoded_value($value[$i]);
            }
            return $output;
        }
        else{
            return utf8_decode($value."");
        }
    }
    protected function get_value_after_trim_whitespace($value){
        if(is_array($value)){
            $output = array();
            $count = count($value);
            for($i = 0; $i < $count; $i++){
                $output[] = $this->get_value_after_trim_whitespace($value[$i]);
            }
            return $output;
        }
        else{
            return trim($value."");
        }
    }
    protected function get_value_after_format_as_currency($value){
        if(is_array($value)){
            $output = array();
            $count = count($value);
            for($i = 0; $i < $count; $i++){
                $output[] = $this->get_value_after_format_as_currency($value[$i]);
            }
            return $output;
        }
        else{
            return SmartUtils::format_as_currency($value."");
        }
    }
    protected function get_value_after_format_as_comma_separated_value($value){
        if(is_array($value)){
            $output = array();
            $count = count($value);
            for($i = 0; $i < $count; $i++){
                $output[] = $this->get_value_after_format_as_comma_separated_value($value[$i]);
            }
            return $output;
        }
        else{
            return SmartUtils::createCommaSeparatedNumber($value."");
        }
    }
    public function valueAsCurrency(){
        return $this->get_value_after_format_as_currency($this->value());
    }
    public function valueAsCommaSeparated(){
        return $this->get_value_after_format_as_comma_separated_value($this->value());
    }
    private $should_escape_html_special_chars = true;
    private $should_decode_as_utf8 = false;

    private function writeValueToArray($value,$array){
        if(!is_array($array)){
            throw new Exception("expects array as input");
        }
        $array[$this->getFinalName()] = $value;
    }

    protected function trimWhiteSpaceBeforeReturnValue(){
        return false;
    }
    public function value(){
        $original_value =  $this->readValueFromArray($_REQUEST);
        $final_value = $this->trimWhiteSpaceBeforeReturnValue() ? $this->get_value_after_trim_whitespace($original_value) : $original_value;
        return $final_value;
    }

    public function writeToRequestArray($value){
        $this->writeValueToArray($value,$_REQUEST);
    }

    public function __toString()
    {
        return $this->value()."";
    }
}
class BrowserFieldFromName extends BrowserField{
    private $field_name;

    public function __construct($field_name)
    {
        $this->field_name = $field_name;
    }

    protected function getName()
    {
        return $this->field_name;
    }
}

class BrowserFieldForContent extends BrowserField{
    protected function getName()
    {
        return app::values()->content();
    }
}
class BrowserFieldForExtendedPostContent extends BrowserField{
    protected function getName()
    {
        return app::values()->extended_post_content();
    }
}

class BrowserFieldForKeywords extends BrowserField{
    protected function getName()
    {
        return app::values()->keywords();
    }
}

class BrowserFieldForTitle extends BrowserField{
    protected function getName()
    {
        return app::values()->title();
    }
}

class BrowserFieldForYoutubeVideoId extends BrowserField{
    protected function getName()
    {
        return app::values()->youtube_video_id();
    }
}

class BrowserFieldForFileToUpload extends BrowserField{
    protected function getName()
    {
        return app::values()->file_to_upload();        
    }
    
}
class BrowserFieldForFileName extends BrowserField{
    protected function getName()
    {
        return app::values()->file_name();

    }
}

class BrowserFieldForEntityId extends BrowserField{
    protected function getName()
    {
        return app::values()->entity_id();

    }
}
class BrowserFieldForFullName extends BrowserField{
    protected function getName()
    {
        return app::values()->full_name();

    }
}

class BrowserFieldForEmailAddress extends BrowserField{
    protected function getName()
    {
        return app::values()->email_address();

    }
}

class BrowserFieldForMobileNumber extends BrowserField{
    protected function getName()
    {
        return app::values()->mobile_number();
    }
}

class BrowserFieldForUrl extends BrowserField{
    protected function getName()
    {
        return app::values()->url();
    }
}
class BrowserFieldForPassword extends BrowserField{
    protected function getName()
    {
        return app::values()->password();

    }
}

class BrowserFieldForIsFrame extends BrowserField{
    protected function getName()
    {
        return app::values()->is_iframe();

    }
}

class BrowserFieldForItemTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->item_type_code();

    }
}

class BrowserFieldForProductTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->product_type_code();

    }
}

class BrowserFieldForWorkTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->work_type_code();

    }
}
class BrowserFieldForFacilityTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->facility_type_code();

    }
}
class BrowserFieldForArticleTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->article_type_code();

    }
}
class BrowserFieldForEventTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->event_type_code();

    }
}
class BrowserFieldForProfileTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->profile_type_code();

    }
}

class BrowserFieldForStatusTypeCode extends BrowserField{
    protected function getName()
    {
        return app::values()->status_type_code();

    }
}
class BrowserFieldForSearchQuery extends BrowserField{
    protected function getName()
    {
        return app::values()->search_query();

    }
}
class BrowserFieldForStartIndex extends BrowserField{
    protected function getName()
    {
        return app::values()->start_index();

    }
}
class BrowserFieldForMaxNumber extends BrowserField{
    protected function getName()
    {
        return app::values()->max_number();

    }
}


