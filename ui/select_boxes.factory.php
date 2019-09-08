<?php
class FactoryForSelectBoxes{
    public function item_type($reader){
        return new SelectBoxForItemType($reader);
    }
    public function product_type($reader){
        return new SelectBoxForProductType($reader);
    }
    public function facility_type($reader){
        return new SelectBoxForFacilityType($reader);
    }
    public function work_type($reader){
        return new SelectBoxForWorkType($reader);
    }
    public function article_type($reader){
        return new SelectBoxForArticleType($reader);
    }
    public function event_type($reader){
        return new SelectBoxForEventType($reader);
    }
    public function profile_type($reader){
        return new SelectBoxForProfileType($reader);
    }
}