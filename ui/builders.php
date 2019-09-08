<?php
class AdminItemToolBar{
    
}
interface IHtmlBuilder{
    public function getHtml();
}
class BuilderForAdminItemToolbar implements IHtmlBuilder{
    private $html;
    public function __construct()
    {
        $this->html = ui::html()->div();
        $this->html->background_color(ui::colors()->header_bg()->LTimes(0.5))->padding("1.0em");
    }

    public function addUnpublish(){
        $this->html->add_child(
            ui::forms()->unpublish_selected_posts()->display_inline()->margin_right("0.5em")->margin_bottom("0.5em")
        );
        return $this;
    }

    public function addPublish(){
        $this->html->add_child(
            ui::forms()->publish_selected_posts()->display_inline()->margin_right("0.5em")->margin_bottom("0.5em")
        );
        return $this;
    }

    public function getHtml()
    {
        return "".$this->html;
    }

}

class ToolbarBuilderForCSVDays implements IHtmlBuilder{
    private $html;
    public function __construct()
    {
        $this->html = ui::html()->div();
        $this->html->background_color(ui::colors()->header_bg()->LTimes(0.5))->padding("1.0em");
    }

    public function addShowPosts(){
        $this->html->add_child(
            (new FormForShowPostsUploadedOnSelectedPosts())->disableCmd()
        );
        return $this;
    }

    public function getHtml()
    {
        return "".$this->html;
    }

}


class BuilderForAdminItemInlineToolbar implements IHtmlBuilder{
    private $html;
    private $item_reader;

    public function __construct($item_reader)
    {
        $this->item_reader = $item_reader;
        $this->html = ui::html()->div();
        $this->html->text_align_right();

    }

    public function addEdit(){
        $this->html->add_child(
            ui::html()->toaster_link("Edit",ui::urls()->adminEditPost($this->item_reader->file_name()))
                ->background_color(ui::colors()->header_bg()->LTimes(1.3))
                ->color("#fff")->padding("0.5em 1.0em")
                ->display_inline_block()
                ->width_auto()
                ->border_radius("3px")
                ->margin_right("0.5em")
                ->margin_bottom("0.5em")

        );
        return $this;
    }

    public function addDelete(){
        $this->html->add_child(
            ui::forms()->delete_post($this->item_reader->file_name())
                ->display_inline_block()
                ->width_auto()
                ->margin_right("0.5em")
                ->margin_bottom("0.5em")
                

        );
        return $this;
    }

    public function getHtml()
    {
        return "".$this->html;
    }

}