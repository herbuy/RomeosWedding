<?php
class ItemFromTypeCode{
    
}
abstract class DomainObject{
    private $reader_for_post;

    public function __construct($reader_for_post)
    {        
        $this->reader_for_post = $reader_for_post;
    }
    /** @return ReaderForValuesStoredInArray */
    protected function reader(){
        return $this->reader_for_post;
    }
    public function get_item_type_as_editor_banner(){
        return sprintf("%s/%s",
            $this->reader()->item_type_code(),
            str_replace("_"," ",$this->get_item_sub_type())
        );
    }
    abstract protected function get_item_sub_type();

    public function item_sub_type(){
        return str_replace("_"," ",$this->get_item_sub_type());
    }
}
class DomainProduct extends DomainObject{

    protected function get_item_sub_type(){
        return $this->reader()->product_type_code();
    }
}
class DomainWork extends DomainObject{

    protected function get_item_sub_type(){
        return $this->reader()->work_type_code();
    }
}
class DomainFacility extends DomainObject{

    protected function get_item_sub_type(){
        return $this->reader()->facility_type_code();
    }
}
class DomainArticle extends DomainObject{

    protected function get_item_sub_type(){
        return $this->reader()->article_type_code();
    }
}
class DomainEvent extends DomainObject{

    protected function get_item_sub_type(){
        return $this->reader()->event_type_code();
    }
}
class DomainProfile extends DomainObject{

    protected function get_item_sub_type(){
        return $this->reader()->profile_type_code();
    }
}
class DomainNullObject extends DomainObject{

    protected function get_item_sub_type(){
        return "Other";
    }
}