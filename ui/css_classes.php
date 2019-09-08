<?php
class CSSForRomeoStreamItem{
    
    /** @param \PageCSSBaseClass $page_css_base_class */
    public function __construct($page_css_base_class){
        $this->overall_object($page_css_base_class);
        $this->headline($page_css_base_class);


    }

    private function overall_object($page_css_base_class)
    {
        $element = (new CSSQueryForNthChild())->
        parent(ui::css_classes()->romeo_item_in_stream_on_landing_page())->
        indexes("n+1")->
        css()->
        background_color(ui::colors()->white())->
        margin_bottom("4px")->
        margin_top("4px")->
        padding("0.5em 1.0em")->
        border(ui::borders()->panel())->
        border_radius("5px")->overflow_hidden();

        //print $element->getFullDeclarationAsString();exit;

        $page_css_base_class->addCSSFor($element);
    }

    /**
     * @param $page_css_base_class
     */
    private function headline($page_css_base_class)
    {
        $element = (new CSSQueryForNthChild())->
        parent(ui::css_classes()->romeo_item_in_stream_on_landing_page())->
        all()->
        child(ui::css_classes()->romeo_headline())->
        all()->
        css()->
        color(ui::colors()->link_fg())->
        font_weight_bold()->
        padding_bottom("8px");

        //print $element->getFullDeclarationAsString();exit;

        $page_css_base_class->addCSSFor($element);
    }
}

class CSSForRomeoDepartment{
    /** @param \PageCSSBaseClass $page_css_base_class */
    public function __construct($page_css_base_class){

        $page_css_base_class->addCSSFor($this->overall());
        $page_css_base_class->addCSSFor($this->every_odd_element());
        $page_css_base_class->addCSSFor($this->first_element());
        $page_css_base_class->addCSSFor($this->last_element());
        //deliberately put after that for last
        $page_css_base_class->addCSSFor($this->every_even_element());
    }

    private function overall()
    {
        $element = (new CSSQueryForNthChild())->
        parent(ui::css_classes()->romeo_department())->
        all()->
        css()->
        background_color(ui::colors()->white())->
        padding("8px 12px")->
        border(ui::borders()->panel());
        return $element;
    }

    private function every_odd_element()
    {
        $element = (new CSSQueryForNthChild())->
        parent(ui::css_classes()->romeo_department())->
        indexes("2n+1")->
        css()->set_style("border-bottom-style", "dotted !important")->
        border_radius("5px 5px 0px 0px")
        ;
        return $element;
    }

    private function every_even_element()
    {
        $element = (new CSSQueryForNthChild())->
        parent(ui::css_classes()->romeo_department())->
        indexes("2n+2")->
        css()->
        margin_bottom("8px")->
        border_top_width("0px !important")->
        border_radius("0px 0px 5px 5px")
        ;
        return $element;
    }

    private function first_element()
    {
        $element = (new CSSQueryForNthChild())->
        parent(ui::css_classes()->romeo_department())->
        indexes(1)->
        css()->
        border_radius("0px 0px 0px 0px")->
        border_top_width("0px !important")
        ;
        return $element;
    }

    private function last_element()
    {

        $element = CSSElementOfClass(ui::css_classes()->romeo_department())->last_child()->
        border_bottom(ui::borders()->panel())->
        border_radius("5px 5px 5px 5px")
        ;
        return $element;
    }

}