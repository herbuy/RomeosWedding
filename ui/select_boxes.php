<?php

abstract class SelectBoxForApp extends SmartSelect{
    public function __construct($reader)
    {
        parent::__construct();
        
        if(!is_a($reader, "ReaderForValuesStoredInArray")){
            throw new Exception("expected reader");
        }

        $container = $this;
        $container->set_name($this->column_for_unique_code());
        $arr_of_rows = $reader->get_array();
        for($row_index = 0; $row_index < count($arr_of_rows);$row_index++){
            $arr_option_data = $arr_of_rows[$row_index];
            $container->add_option(
                $arr_option_data[$this->column_for_label()],
                $arr_option_data[$this->column_for_unique_code()]
            );
        }
    }
    abstract protected function column_for_unique_code();
    abstract protected function column_for_label();
}



//todo: app specific select boxes

class SelectBoxForItemType extends SelectBoxForApp{

    protected function column_for_unique_code()
    {
        return app::values()->item_type_code();
    }
    protected function column_for_label()
    {
        return app::values()->item_type_as_single();
    }
}

class SelectBoxForProductType extends SelectBoxForApp{

    protected function column_for_unique_code()
    {
        return app::values()->product_type_code();
    }
    protected function column_for_label()
    {
        return app::values()->product_type_as_single();
    }
}
class SelectBoxForFacilityType extends SelectBoxForApp{

    protected function column_for_unique_code()
    {
        return app::values()->facility_type_code();
    }
    protected function column_for_label()
    {
        return app::values()->facility_type_as_single();
    }
}
class SelectBoxForWorkType extends SelectBoxForApp{
    protected function group_name()
    {
        return app::values()->work_type();
    }
    protected function column_for_unique_code()
    {
        return app::values()->work_type_code();
    }
    protected function column_for_label()
    {
        return app::values()->work_type_as_single();
    }
}
class SelectBoxForProfileType extends SelectBoxForApp{

    protected function column_for_unique_code()
    {
        return app::values()->profile_type_code();
    }
    protected function column_for_label()
    {
        return app::values()->profile_type_as_single();
    }
}
class SelectBoxForEventType extends SelectBoxForApp{

    protected function column_for_unique_code()
    {
        return app::values()->event_type_code();
    }
    protected function column_for_label()
    {
        return app::values()->event_type_as_single();
    }
}

class SelectBoxForArticleType extends SelectBoxForApp{

    protected function column_for_unique_code()
    {
        return app::values()->article_type_code();
    }
    protected function column_for_label()
    {
        return app::values()->article_type_as_single();
    }
}