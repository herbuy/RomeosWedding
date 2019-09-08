<?php
class ReaderForValuesStoredInArray extends BaseClassOfReaderForDataStoredInArray{


    protected function getNewInstance($array){
        return new self($array);
    }
    //==============================
    
    public function error(){
        return $this->read_key(app::values()->error());
    }
    public function content(){
        return $this->read_key(app::values()->content());
    }
    public function extended_post_content(){
        return $this->read_key(app::values()->extended_post_content());
    }
    public function keywords(){
        return $this->read_key(app::values()->keywords());
    }
    public function title(){
        return $this->read_key(app::values()->title());
    }
    public function rating(){
        return $this->read_key(app::values()->rating());
    }
    public function timestamp(){//rowid, cat, file, enti
        return $this->read_key(app::values()->timestamp());
    }
    public function row_id(){
        return $this->read_key(app::values()->row_id());
    }
    public function category(){
        return $this->read_key(app::values()->category());
    }
    public function file_name(){
        return $this->read_key(app::values()->file_name());
    }
    public function about(){
        return $this->read_key(app::values()->about());
    }
    public function picture_file_name(){
        return $this->read_key(app::values()->picture_file_name());
    }
    public function entity_id(){
        return $this->read_key(app::values()->entity_id());
    }
    public function author_id(){
        return $this->read_key(app::values()->author_id());
    }
    public function author_name(){
        return $this->read_key(app::values()->author_name());
    }
    public function section_id(){
        return $this->read_key(app::values()->section_id());
    }
    public function total_posts(){
        return $this->read_key(app::values()->total_posts());
    }
    public function total(){
        return $this->read_key(app::values()->total());
    }
    public function views(){
        return $this->read_key(app::values()->views());
    }
    public function likes(){
        return $this->read_key(app::values()->likes());
    }
    public function comments(){
        return $this->read_key(app::values()->comments());
    }
    public function total_views_on_post(){
        return $this->read_key(app::values()->total_views());
    }
    
    
    public function content_type(){
        return $this->read_key(app::values()->content_type());
    }
    public function src(){
        return $this->read_key(app::values()->src());
    }
    public function url(){
        return $this->read_key(app::values()->url());
    }
    public function youtube_video_id(){
        return $this->read_key(app::values()->youtube_video_id());
    }

    public function width(){
        return $this->read_key(app::values()->width());
    }
    public function height(){
        return $this->read_key(app::values()->height());
    }
    public function href(){
        return $this->read_key(app::values()->href());
    }
    public function alt(){
        return $this->read_key(app::values()->alt());
    }

    public function year_number(){
        return $this->read_key(app::values()->year_number());
    }
    public function month_description(){
        return $this->read_key(app::values()->month_description());
    }
    public function week_of_the_year_description(){
        return $this->read_key(app::values()->week_of_the_year_description());
    }
    public function day_of_the_year_description(){
        return $this->read_key(app::values()->day_of_the_year_description());
    }
    public function date_in_full(){
        return $this->read_key(app::values()->date_in_full());
    }

    public function email_address(){
        return $this->read_key(app::values()->email_address());
    }

    public function full_name(){
        return $this->read_key(app::values()->full_name());
    }
    public function approval_status_code(){
        return $this->read_key(app::values()->approval_status_code());
    }

    //todo: =============== app specific
    public function department_code(){
        return $this->read_key(app::values()->department_code());
    }
    
    public function item_type_code(){
        return $this->read_key(app::values()->item_type_code());
    }
    public function product_type_code(){
        return $this->read_key(app::values()->product_type_code());
    }
    public function work_type_code(){
        return $this->read_key(app::values()->work_type_code());
    }
    public function facility_type_code(){
        return $this->read_key(app::values()->facility_type_code());
    }
    public function article_type_code(){
        return $this->read_key(app::values()->article_type_code());
    }
    public function event_type_code(){
        return $this->read_key(app::values()->event_type_code());
    }
    public function profile_type_code(){
        return $this->read_key(app::values()->profile_type_code());
    }
    public function status_type_code(){
        return $this->read_key(app::values()->status_type_code());
    }
    //===========================
    public function department_description(){
        return $this->read_key(app::values()->department_description());
    }
    public function item_type_as_single(){
        return $this->read_key(app::values()->item_type_as_single());
    }
    public function product_type_as_single(){
        return $this->read_key(app::values()->product_type_as_single());
    }
    public function work_type_as_single(){
        return $this->read_key(app::values()->work_type_as_single());
    }
    public function facility_type_as_single(){
        return $this->read_key(app::values()->facility_type_as_single());
    }
    public function article_type_as_single(){
        return $this->read_key(app::values()->article_type_as_single());
    }
    public function event_type_as_single(){
        return $this->read_key(app::values()->event_type_as_single());
    }
    public function profile_type_as_single(){
        return $this->read_key(app::values()->profile_type_as_single());
    }
    //===========================
    public function item_type_as_plural(){
        return $this->read_key(app::values()->item_type_as_plural());
    }
    public function product_type_as_plural(){
        return $this->read_key(app::values()->product_type_as_plural());
    }
    public function work_type_as_plural(){
        return $this->read_key(app::values()->work_type_as_plural());
    }
    public function facility_type_as_plural(){
        return $this->read_key(app::values()->facility_type_as_plural());
    }
    public function article_type_as_plural(){
        return $this->read_key(app::values()->article_type_as_plural());
    }
    public function event_type_as_plural(){
        return $this->read_key(app::values()->event_type_as_plural());
    }
    public function profile_type_as_plural(){
        return $this->read_key(app::values()->profile_type_as_plural());
    }
    public function status_type(){
        return $this->read_key(app::values()->status_type());
    }
}