<?php
//todo: some input classes to start with
require_once ("data_page.functions.php");
class InputForFunctionNames extends CommaSeparatedEnum{
    //todo: stores functions that can be called using the data page command
    public function getName()
    {
        return app::values()->function_names();
    }

    protected function getArrayOfAcceptableValues()
    {
        return DataPageFunctions::get_array();
    }
    
    protected function defaultValue()
    {
        return "";
    }

}

class InputForFileName extends TextDefinition{
    public function getName()
    {
        return app::values()->file_name();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->file_name();
    }
    protected function minLengthInChars()
    {
        return 19;
    }
}

abstract class CSVInput extends TextDefinition{

    protected function getPattern()
    {
        return "[^,]+(,[^,]+)*";
    }

}

class InputForCSVFileNames extends CSVInput{
    public function getName()
    {
        return app::values()->csv_file_names();
    }
    protected function maxLengthInChars()
    {
        return 25500; //we are estimating a maximum of about 100 file names, assuming a file name takes no more than 3 lines [255 characters]
    }
    protected function minLengthInChars()
    {
        return 19;
    }
}

class InputForCSVSelectedDays extends CSVInput{
    public function getName()
    {
        return app::values()->csv_selected_days();
    }
    protected function maxLengthInChars()
    {
        return 1100; //we are estimating a maximum of about 100 + commas
    }
    protected function minLengthInChars()
    {
        return 10;
    }
}

class InputForEntityId extends BigIntValueDefinition{
    public function getName()
    {
        return app::values()->entity_id();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->entity_id();
    }
}

class InputForTitle extends TextDefinition{
    public function getName()
    {
        return app::values()->title();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->title();
    }
}
class InputForYoutubeVideoId extends TextDefinition{
    public function getName()
    {
        return app::values()->youtube_video_id();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->youtube_video_id();
    }
}

class InputForTitleArray extends InputForTitle{
    protected function should_be_array()
    {
        return true;
    }
    protected function max_number_of_items_if_array()
    {
        return app::variables()->max_num_items_for_multi_upload_of_posts();
    }
}

class InputForContent extends TextDefinition{
    public function getName()
    {
        return app::values()->content();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->content();
    }
}
class InputForContentArray extends InputForContent{
    protected function should_be_array()
    {
        return true;
    }
    protected function max_number_of_items_if_array()
    {
        return app::variables()->max_num_items_for_multi_upload_of_posts();
    }
}

class InputForExtendedPostContent extends TextDefinition{
    public function getName()
    {
        return app::values()->extended_post_content();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->extended_post_content();
    }
}
class InputForExtendedPostContentArray extends InputForExtendedPostContent{
    protected function should_be_array()
    {
        return true;
    }
    protected function max_number_of_items_if_array()
    {
        return app::variables()->max_num_items_for_multi_upload_of_posts();
    }
}
class InputForKeywords extends TextDefinition{
    public function getName()
    {
        return app::values()->keywords();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->keywords();
    }
}

class InputForFullName extends TextDefinition{
    public function getName()
    {
        return app::values()->full_name();
    }
    protected function minLengthInChars()
    {
        return 3;
    }
}

class InputForEmailAddress extends TextDefinition{
    public function getName()
    {
        return app::values()->email_address();
    }
    protected function getPattern()
    {
        $name = "[\w_]+";
        $at = "[@]";
        $domain = "([.]$name)+";
        return join("",array($name,$at,$name,$domain));
    }

}
class InputForPassword extends Sha1HashedInput{
    public function getName()
    {
        return app::values()->password();
    }
    protected function minLengthInChars()
    {
        return 6;
    }
}
