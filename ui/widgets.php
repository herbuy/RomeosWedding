<?php
class VerticalEngagementStatisticsForStreamOfPostsAt50Percent extends SmartDiv{

    /** @param ReaderForValuesStoredInArray $item_reader */
    public function __construct($item_reader)
    {
        parent::__construct();
        
        $this->add_child(
            ui::html()->div()->add_child(
                $this->render_item("Views",$item_reader->views())
            )->background_color(ui::colors()->primary_engagement())->padding("1.0em").
            ui::html()->div()->add_child(
                $this->render_item("Likes",$item_reader->likes())
            )->border_bottom(ui::borders()->primary_engagement())->padding("1.0em").
            ui::html()->div()->add_child(
                $this->render_item("Comments",$item_reader->comments())
            )->padding("1.0em")
        )->border(ui::borders()->primary_engagement())->border_radius("5px");
        //return $item_reader . "right";
    }
    private function render_item($label,$value){
        return
            ui::html()->span()->add_child($label)->width("80%")
            .
            ui::html()->span()->add_child(
                ui::html()->div()->add_child($value)->text_align_right()
            )->width("20%");
    }
}