<?php

class SmartAutoStyledText{
    private $output;
    public function __construct($text)
    {
        //input
        $delimiter = ".";
        $possible_elements = array(
            (new SmartDiv()),
            (new SmartHeading3())->margin("0px"),
            (new SmartCustomTag("i"))->display_block()->width_auto()
        );
        //processing
        $sentences = explode($delimiter,$text);
        $output = "";

        for($i = 0; $i < count($sentences); $i++){
            //input
            $sentence = $sentences[$i];

            //processig
            $div = $possible_elements[$i % count($possible_elements)];
            $div->add_child($sentence. $delimiter);

            $div->
            //border_bottom("1px dashed #ddd")->
            border(sprintf("1px solid %s",ui::colors()->border()))->border_bottom_width("8px")->
            padding("0.5em 1.0em")->background_color(ui::colors()->white())->
            text_align("justify");
            $output .= $div;
        }
        //output

        $this->output = $output;

    }
    public function __toString()
    {
        return "".ui::html()->div()->add_child($this->output);
    }
}