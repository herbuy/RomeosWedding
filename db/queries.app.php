<?php


abstract class QueryForPostItem extends InsertQueryForApp{
    private $entity_id;
    public function result(){
        return Db::results()->single_query($this);
    }
    public function __construct()
    {
        $this->entity_id = app::argument()->entity_id()->getValue();

        parent::__construct();

        $this->insert_into(app::values()->draft_posts());
        //print "working 3";exit;

        $this->set(Db::fields()->item_type_code()->toStringValue($this->item_type_code()));
        $this->set(Db::fields()->product_type_code()->toStringValue($this->product_type_code()));
        $this->set(Db::fields()->facility_type_code()->toStringValue($this->facility_type_code()));
        $this->set(Db::fields()->work_type_code()->toStringValue($this->work_type_code()));
        $this->set(Db::fields()->event_type_code()->toStringValue($this->event_type_code()));

        $this->set(Db::fields()->article_type_code()->toStringValue($this->article_type_code()));
        $this->set(Db::fields()->profile_type_code()->toStringValue($this->profile_type_code()));
        $this->set(Db::fields()->status_type_code()->toStringValue($this->status_type_code()));

        $this->set(Db::fields()->title()->toStringValue($this->title()));
        $this->set(Db::fields()->content()->toStringValue($this->content()));
        $this->set(Db::fields()->extended_post_content()->toStringValue($this->extended_post_content()));
        $this->set(Db::fields()->picture_file_name()->toStringValue($this->picture_file_name()));
        $this->set(Db::fields()->youtube_video_id()->toStringValue($this->youtube_video_id()));
        
        //todo: these are generated
        $query = $this;
        $query->set(Db::fields()->entity_id()->toInt($this->entity_id));
        $query->set(Db::fields()->author_id()->toSQLValue(Db::computed_values()->current_user_id_before_validating()));
        $query->set(Db::fields()->timestamp()->toCurrentTimestamp());
        $query->set(Db::fields()->can_be_published()->toTrue());
        $query->set(Db::fields()->can_be_viewed_by_search_engines()->toTrue());
        $query->set(Db::fields()->can_be_rated()->toTrue());
        $query->set(Db::fields()->keywords()->toStringValue(""));
        //add date information
        $this->addDateInformation();

        $query->set(Db::fields()->file_name()->toSQLValue($this->sql_for_file_name()));

    }

    private function addDateInformation()
    {
        $date_in_full = date("Y-m-d");
        $this
            ->set(Db::fields()->date_in_full()->toStringValue(
                $date_in_full)
            )
            ->set(Db::fields()->year_number()->toSQLValue(
                SQLFunction::year($date_in_full)
            ))
            ->set(Db::fields()->month_number()->toSQLValue(
                SQLFunction::month($date_in_full)
            ))
            ->set(Db::fields()->month_name()->toSQLValue(
                SQLFunction::month_name($date_in_full)
            ))
            ->set(Db::fields()->month_description()->toSQLValue(
            //Db::fields()->car_id()->append(Db::fields()->alt())
                SQLFunction::month_name($date_in_full)->append(
                    " "
                )->
                append(
                    SQLFunction::year($date_in_full)
                )
            ))
            ->set(Db::fields()->week_of_the_year_number()->toSQLValue(
                SQLFunction::week_of_year($date_in_full)
            ))
            ->set(Db::fields()->week_of_the_year_description()->toSQLValue(
                SQLFunction::week_of_year_description($date_in_full)
            ))
            ->set(Db::fields()->day_name()->toSQLValue(
                SQLFunction::day_name($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_week_number()->toSQLValue(
                SQLFunction::day_of_week($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_month_number()->toSQLValue(
                SQLFunction::day($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_year_number()->toSQLValue(
                SQLFunction::day_of_year($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_year_description()->toSQLValue(
                SQLFunction::day_of_year_description($date_in_full)
            ));
    }

    abstract protected function item_type_code();

    protected function product_type_code()
    {
        return "";
    }

    protected function facility_type_code()
    {
        return "";
    }

    protected function work_type_code()
    {
        return "";
    }

    protected function event_type_code()
    {
        return "";
    }

    protected function article_type_code()
    {
        return "";
    }

    protected function profile_type_code()
    {
        return "";
    }

    protected function status_type_code()
    {
        return "";
    }

    protected function title()
    {
        return app::argument()->title();
    }

    protected function content()
    {
        return "";
    }

    protected function extended_post_content()
    {
        return "";
    }

    protected function picture_file_name()
    {
        return "";
    }

    protected function youtube_video_id()
    {
        return "";
    }

    private function sql_for_file_name()
    {
        return Db::computed_values()->new_file_name($this->title(),$this->get_sub_type(),$this->item_type_code(),$this->entity_id);        
    }

    abstract protected function get_sub_type();
}

class QueryForPostProduct extends QueryForPostItem{
    protected function item_type_code()
    {
        return app::item_type_codes()->product();
    }
    protected function product_type_code()
    {
        return app::argument()->product_type_code();
    }
    protected function get_sub_type()
    {
        return "best-".$this->product_type_code()."-for-hire";
    }
}
class QueryForPostFacility extends QueryForPostItem{
    protected function item_type_code()
    {
        return app::item_type_codes()->facility();
    }
    protected function facility_type_code()
    {
        return app::argument()->facility_type_code();
    }
    protected function get_sub_type()
    {
        return "best-".$this->facility_type_code()."-for-hire-";
    }
}
class QueryForPostWork extends QueryForPostItem{
    protected function item_type_code()
    {
        return app::item_type_codes()->work();
    }
    protected function work_type_code()
    {
        return app::argument()->work_type_code();
    }
    protected function get_sub_type()
    {
        return "best-".$this->work_type_code();
    }
}
class QueryForPostArticle extends QueryForPostItem{
    protected function item_type_code()
    {
        return app::item_type_codes()->article();
    }
    protected function article_type_code()
    {
        return app::argument()->article_type_code();
    }
    protected function get_sub_type()
    {
        return $this->article_type_code();
    }
}
class QueryForPostEvent extends QueryForPostItem{
    protected function item_type_code()
    {
        return app::item_type_codes()->event();
    }
    protected function event_type_code()
    {
        return app::argument()->event_type_code();
    }
    protected function get_sub_type()
    {
        return "best-".$this->event_type_code();
    }
}

class QueryForPostProfile extends QueryForPostItem{
    protected function item_type_code()
    {
        return app::item_type_codes()->profile();
    }
    protected function profile_type_code()
    {
        return app::argument()->profile_type_code();
    }
    protected function get_sub_type()
    {
        return "best-".$this->profile_type_code()."-for-hire";
    }
}

class QueryForPostStatusUpdate extends QueryForPostItem{
    protected function item_type_code()
    {
        return app::item_type_codes()->status_update();
    }
    protected function status_type_code()
    {
        return app::argument()->status_type_code();
    }
    protected function event_type_code()
    {
        return "";//return app::argument()->event_type_code();
    }
    protected function get_sub_type()
    {
        return $this->status_type_code()."-".$this->event_type_code();
    }
}

class QueryForPostPicture extends QueryForPostItem{
    private $picture_file_name;
    private $item_type_code;
    private $product_type_code;
    private $facility_type_code;
    private $work_type_code;
    private $article_type_code;
    private $profile_type_code;
    private $event_type_code;
    private $status_type_code;


    public function __construct($picture_file_name,$item_type_code='',$product_type_code='',$facility_type_code='',$work_type_code='',$article_type_code='',$profile_type_code='',$event_type_code='',$status_type_code='')
    {
        $this->picture_file_name = $picture_file_name;
        $this->item_type_code = $item_type_code;
        $this->product_type_code = $product_type_code;
        $this->facility_type_code = $facility_type_code;
        $this->work_type_code = $work_type_code;
        $this->article_type_code = $article_type_code;
        $this->profile_type_code = $profile_type_code;
        $this->event_type_code = $event_type_code;
        $this->status_type_code = $status_type_code;

        parent::__construct();
    }
    protected function picture_file_name()
    {
        return $this->picture_file_name;
    }


    protected function item_type_code()
    {
        return $this->item_type_code;
    }
    protected function product_type_code()
    {
        return $this->product_type_code;
    }

    protected function facility_type_code()
    {
        return $this->facility_type_code;
    }

    protected function work_type_code()
    {
        return $this->work_type_code;
    }

    protected function article_type_code()
    {
        return $this->article_type_code;
    }

    protected function profile_type_code()
    {
        return $this->profile_type_code;
    }
    protected function event_type_code()
    {
        return $this->event_type_code;
    }
    protected function status_type_code()
    {
        return $this->status_type_code;
    }

    protected function get_sub_type()
    {
        return "";
    }
    protected function title()
    {
        return "Untitled - Edit this title";
    }
}
class QueryForPostVideo extends QueryForPostItem{
    protected function item_type_code()
    {
        return "";
    }

    protected function get_sub_type()
    {
        return "";
    }
    protected function title()
    {
        return "Untitled - Edit this title";
    }
}
