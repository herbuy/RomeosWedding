<?php


class BabaRendererForPostsAt30Percent implements IBabaRenderer{
    
    public function render($array_of_records)
    {
        $arr_output = array_map(function ($item){
            $reader = app::reader($item);
            return $this->get_html_from_item_reader($reader);
        },$array_of_records);
        return ui::html()->div(join("",$arr_output))->background_color("#fff")->padding("1.0em")->border_radius("0.5em");
    } 

    /** @param ReaderForValuesStoredInArray  $item_reader */
    protected function get_html_from_item_reader($item_reader)
    {
        $title = $item_reader->title();
        $final_photo = ui::urls()->view_image($item_reader->picture_file_name())->toImage();
        return ui::html()->div(
            ui::html()->span(ui::html()->heading4($title)->font_weight_normal())
                ->width($this->title_section_width())
            .
            ui::html()->span(
                ui::html()->div()
                    ->background_image_url(ui::urls()->view_image($item_reader->picture_file_name()))
                    ->background_size_cover()
                    ->height($this->image_height())
            )
                ->width($this->image_section_width())


        )->margin_bottom("0.5em")->padding_bottom("0.5em")->border_bottom("0px dotted ".ui::colors()->border())->font_variant("initial");

    }

    protected function title_section_width()
    {
        return "70%";
    }

    protected function image_section_width()
    {
        return "30%";
    }

    protected function image_height()
    {
        return "4.0em";
    }


}

class BabaRendererForPostsAt20Percent extends BabaRendererForPostsAt30Percent{
    protected function title_section_width()
    {
        return "100%";
    }

    protected function image_section_width()
    {
        return "100%";
    }

    protected function image_height()
    {
        return "9.0em";
    }
}

class BabaRendererForPostsAt50Percent extends BabaRendererForPostsAt30Percent{
    protected function title_section_width()
    {
        return "100%";
    }

    protected function image_section_width()
    {
        return "100%";
    }

    protected function image_height()
    {
        return "23.0em";
    }
}

class BabaRendererForPostsAt16Percent extends BabaRendererForPostsAt30Percent{
    protected function title_section_width()
    {
        return "16%%";
    }

    protected function image_section_width()
    {
        return "100%";
    }

    protected function image_height()
    {
        return "8.0em";
    }
    protected function get_html_from_item_reader($item_reader)
    {
        return ui::html()->span(parent::get_html_from_item_reader($item_reader)->margin("0px 0.5em"))->width("16.6%");
    }
}

abstract class RomeoRenderer implements IBabaRenderer{
    public function render($array_of_records)
    {
        $arr_output = array_map(function ($item){
            $reader = app::reader($item);
            return $this->get_html_from_item_reader($reader);
        },$array_of_records);
        return ui::html()->div(join("",$arr_output));
    }
    /** @param ReaderForValuesStoredInArray  $item_reader */
    abstract protected function get_html_from_item_reader($item_reader);
}

class BabaRendererForNavItemTypes extends RomeoRenderer{

    protected function get_html_from_item_reader($item_reader)
    {
        return ui::html()->heading4($item_reader->item_type_as_single())->display_inline_block()->width_auto()."&nbsp;&nbsp;";
    }

    protected function title_section_width()
    {
        return "70%";
    }

    protected function image_section_width()
    {
        return "30%";
    }

    protected function image_height()
    {
        return "4.0em";
    }


}

class BabaRendererForDepartment1 extends RomeoRenderer{

    protected function get_html_from_item_reader($item_reader)
    {
        return ui::html()->div(
            $this->generateHtml(
                ui::urls()->department_page($item_reader->department_code()),
                $this->getImageUrl($item_reader),
                $item_reader->department_description(),
                $this->getAbout($item_reader)
            )
        )->padding("1.0em");

    }

    private function getAbout($item_reader)
    {
        return ui::html()->secondary_text()->add_child(
            "Check out the best items and hire the service providers you need"
        )->margin_top("8px")->padding_top("8px")->border_top("1px dashed #ddd");
    }

    private function largeFirstWord($dept_description)
    {
        $words = explode(" ",$dept_description);
        if(is_array($words)){
            $words[0] = ui::html()->span()->add_child($words[0])->font_size("1.5em")->width_auto()->vertical_align_baseline()->color(ui::colors()->header_bg());
        }
        return join(" ", $words);
    }

    protected function generateHtml($dest_url, $image_source_url, $text_to_display,$about = '')
    {
        return $dest_url->
        toLink()->add_child(
            ui::html()->span()->add_child(
                ui::html()->div()->height("4.0em")->background_image_url($image_source_url)->background_size_cover()
                //$image_source_url->toImage()
            )->width("30%") .
            ui::html()->span()->add_child(
                ui::html()->div()->add_child(
                    $this->largeFirstWord($text_to_display).
                    ui::html()->div()->add_child_if($about,$about)
                )->padding_left("1.0em")
            )->width("70%")
        );
    }

    /**
     * @param $item_reader
     * @return UrlForAsset
     */
    private function getImageUrl($item_reader)
    {
        $file_name = '';
        switch($item_reader->department_code()){
            default:
                $file_name = '';
                break;
            case app::dept_type_codes()->cake_and_decoration():
                $file_name = 'cake.jpg';
                break;
            case app::dept_type_codes()->event_planning():
                $file_name = 'planner.jpg';
                break;
            case app::dept_type_codes()->food_and_drinks():
                $file_name = 'food.jpg';
                break;
            case app::dept_type_codes()->gifts_and_cards():
                $file_name = 'gifts.jpg';
                break;
            case app::dept_type_codes()->gowns_and_womens_wear():
                $file_name = 'gown.jpg';
                break;
            case app::dept_type_codes()->marriage_and_honey_moon():
                $file_name = 'marriage.jpg';
                break;
            case app::dept_type_codes()->massage_and_spa():
                $file_name = 'massage.jpg';
                break;
            case app::dept_type_codes()->music_and_entertainment():
                $file_name = 'music.jpg';
                break;
            case app::dept_type_codes()->other():
                $file_name = 'other.jpg';
                break;
            case app::dept_type_codes()->photography_and_videography():
                $file_name = 'photography.jpg';
                break;
            case app::dept_type_codes()->rings_and_jewelry():
                $file_name = 'rings.jpg';
                break;
            case app::dept_type_codes()->salon_hair_and_makeup():
                $file_name = 'salon.jpg';
                break;
            case app::dept_type_codes()->suits_and_mens_wear():
                $file_name = 'suit.jpg';
                break;
            case app::dept_type_codes()->tents_chairs_and_tables():
                $file_name = 'tents.jpg';
                break;
            case app::dept_type_codes()->venues_reception_and_meetings():
                $file_name = 'venues.jpg';
                break;
        }

        return ui::urls()->asset_for_department($file_name);

    }
}

class BabaRendererForPictureAds50Percent  implements IBabaRenderer{
    public function render($array)
    {
        $arr_output = array_map(function ($url){
            $img_url = new URLForAds($url);
            return ui::html()->span($img_url->toImage()->width("98%")->padding("0% 1%"))->width("50%");
        },$array);
        return ui::html()->div( join("",$arr_output) )->background_color("#fff")->padding("1.0em");
    }
}

class BabaRendererForPictureAds100Percent  implements IBabaRenderer{
    public function render($array)
    {
        $arr_output = array_map(function ($url){
            $img_url = new URLForAds($url);
            return $img_url->toImage()->width("98%")->padding("0% 1%");
        },$array);
        return ui::html()->div( join("",$arr_output) )/*->background_color("#fff")->padding("1.0em")*/;
    }
}