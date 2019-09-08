<?php

class CustomCheckBox extends SmartDiv{
    private $random_element_id;
    private $selector_indicator_id;
    private $toolbar_id;

    public function __construct($inner_content,$value_to_append, $value_of_name_attribute_where_to_append_to_value)
    {

        parent::__construct();

        $this->random_element_id = join("_",["checkbox-",rand(1000,9999)]);
        $this->selector_indicator_id = join("-",[$this->random_element_id,"selection-indicator"]);
        $this->toolbar_id = join("-",[$this->random_element_id,"toolbar"]);
        
        
        $this->add_child($inner_content);

        $this
            ->set_id($this->random_element_id)
            ->cursor_pointer()
            ->set_attribute("onClickToggleClass", ui::css_classes()->chap_selected_item()."/#$this->random_element_id")
            ->set_attribute("onClickToggleAppendToValue",$value_to_append. sprintf("/[name=%s]",$value_of_name_attribute_where_to_append_to_value))
            ->set_attribute("onClickSetEffects","slideToggle:#$this->selector_indicator_id;fadeToggle:#$this->toolbar_id");
        
        $this
            ->display_block()
            ->border_bottom(ui::borders()->panel())
            ->padding("1.0em")
           ;

    }
    public function get_checkbox_id(){
        return $this->random_element_id;
    }
    public function get_checkbox_toolbar_id(){
        return $this->toolbar_id;
    }
    public function get_checkbox_selection_indicator_id(){
        return $this->selector_indicator_id;
    }
}