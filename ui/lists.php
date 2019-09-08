<?php
abstract class  CollectionOfItems0000 extends LayoutForNColumns{
    private $post_counter = 0;
    protected function post_counter(){
        //todo: can be used e.g. to insert an add after every N posts
        return $this->post_counter;
    }

    /** @param \ReaderForValuesStoredInArray $reader */
    public function __construct($reader)
    {
        ui::exception()->throwIfNotReader($reader);
        parent::__construct();

        $class = $this->get_class();
        $count = $reader->count();

        for ($i = 0; $i < $count; $i++) {
            $this->post_counter +=1;
            //-------------------------
            $item_reader = $reader->get_reader_for_item_at($i);
            $item = $this->get_html_from_item_reader($item_reader);

            $column = $this->addNewColumn()->add_child(
                ui::html()->div()->add_child(
                //the overflow div
                    ui::html()->div()->add_child(
                        $item
                    )/*->add_class(ui::css_classes()->height_limiter())*/
                )
            );

            if($this->disable_item_styling()){
                $column->width_auto();
            }
            else{
                $column->add_class_if($class,$class)->border_bottom("1px dashed #ddd")->padding_top("0.5em")->padding_bottom("0.5em");
            }

        }
    }
    protected function disable_item_styling(){
        return false;
    }

    /** @param \ReaderForValuesStoredInArray $item_reader */
    abstract protected function get_html_from_item_reader($item_reader);

    protected function get_class()
    {
    }
}

abstract class  CollectionOfItems extends SmartDiv{
    private $post_counter = 0;
    protected function post_counter(){
        //todo: can be used e.g. to insert an add after every N posts
        return $this->post_counter;
    }

    /** @param \ReaderForValuesStoredInArray $reader */
    public function __construct($reader)
    {
        ui::exception()->throwIfNotReader($reader);
        parent::__construct();

        $class = $this->get_class();
        $class2 = $this->get_class2();

        $count = $reader->count();
        $max_num_to_render = intval($this->max_number_to_render());

        for ($i = 0; $i < $count; $i++) {
            $this->post_counter +=1;
            if($max_num_to_render && $this->post_counter > $max_num_to_render){
                break;
            }
            //-------------------------
            $item_reader = $reader->get_reader_for_item_at($i);
            $item = $this->get_html_from_item_reader($item_reader);

            $column = $this->get_item_container()->add_child(
                ui::html()->div()->add_child(
                //the overflow div
                    ui::html()->div()->add_child(
                        $item
                    )/*->add_class(ui::css_classes()->height_limiter())*/
                )
            );

            if($this->disable_item_styling()){
                $column->width_auto();
            }
            else{
                $column->add_class_if($class,$class);
                $column->add_class_if($class2,$class2);
            }

            $this->add_child($column);

        }
    }
    protected function max_number_to_render(){

    }
    protected function disable_item_styling(){
        return false;
    }

    /** @param \ReaderForValuesStoredInArray $item_reader */
    abstract protected function get_html_from_item_reader($item_reader);

    protected function get_class()
    {
    }
    protected function get_class2()
    {
    }

    protected function get_item_container()
    {
        return ui::html()->div();
    }
}

class ListOfRomeoUsers extends CollectionOfItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return ui::urls()->user(
            app::utils()->make_file_name($item_reader->entity_id(),$item_reader->full_name())
        )->toLink(app::utils()->capitalize_first_letter($item_reader->full_name()))->display_inline_block()->width_100percent()
            ;
    }
    protected function get_item_container()
    {
        return ui::html()->div()
            ->background_color("#fff")
            ->font_variant("initial")
            ->padding("1.0em")
            ->border(ui::borders()->panel())
            ->margin_top("-1px")
            ->border_radius("5px")
            ;
    }
}

class CollectionOfRomeoTabs extends CollectionOfItems{
    private $highlight_index;
    private $item_container;
    public function __construct(ReaderForValuesStoredInArray $reader, $highlight_number = 1,$title='BROWSE',$item_container=null)
    {
        $this->highlight_index = $highlight_number;
        $this->item_container = ($item_container == null) ? ui::html()->span()->width_auto() : $item_container;
        
        $this->add_child_if(strlen(trim($title)) > 0, $title);
        parent::__construct($reader);
    }

    protected function get_html_from_item_reader($item_reader)
    {
        $link = ui::html()->toaster_link($item_reader->content(),$item_reader->url())->display_inline_block()->width_auto()->padding("1.0em");
        $link->add_class_if($this->post_counter() == $this->highlight_index,ui::css_classes()->current_tab());
        return $link;

    }
    
    protected function get_item_container()
    {
        return clone $this->item_container;
        //return ui::html()->div()->width_auto();//$this->item_container;
    }
    
}

class CollectionOfChapVerticalTabs extends CollectionOfItems{
    private $highlight_index;

    public function __construct(ReaderForValuesStoredInArray $reader, $highlight_number = 1,$title='BROWSE')
    {
        $this->highlight_index = $highlight_number;
        $this->add_child_if(strlen(trim($title)) > 0, $title);
        parent::__construct($reader);
    }

    protected function get_html_from_item_reader($item_reader)
    {

        $link = ui::html()->toaster_link(

            ui::html()->div(ui::html()->div($item_reader->content()))

            ,
            $item_reader->url()
        )
            ->font_weight_bold()
            ->text_align_center()
            ->display_block()
            ->width_auto()
            ->padding("1.0em")
            ->background_color("#fff")
            ->border(ui::borders()->panel())
            ->margin_top("-1px")
            ->border_radius("3px")
        ;

        //$link->add_class_if($this->post_counter() == $this->highlight_index,ui::css_classes()->current_tab());
        return $link;

    }

    protected function get_item_container()
    {
        
        $container = ui::html()->div();
        return $container;
    }

}

class CollectionOfIFrameTabs extends CollectionOfRomeoTabs{
    private $iframe_id;    
    public function __construct(ReaderForValuesStoredInArray $reader, $highlight_number, $title, $item_container,$iframe_id)
    {
        $this->iframe_id = $iframe_id;
        parent::__construct($reader, $highlight_number, $title, $item_container);
    }
    protected function get_html_from_item_reader($item_reader)
    {
        //$item_reader->set_key("url",$item_reader->url()."/ifrm");


        $link = parent::get_html_from_item_reader($item_reader);
        $link->set_attribute("target",$this->iframe_id);
        $link->set_attribute(
            "onclick",
            sprintf("javascript:iframe_load_url('%s','%s')",$this->iframe_id,$item_reader->url())
        );
        return $link;
    }
}

class CollectionOfAdminTabs extends CollectionOfRomeoTabs{
    public function __construct(ReaderForValuesStoredInArray $reader, $highlight_number)
    {
        parent::__construct($reader, $highlight_number, ui::html()->span("YOUR POSTS")->width_auto());
    }
}
class PageMenuPlusContent extends SmartDiv{
    public function __construct($page_menu,$page_content)
    {
        parent::__construct();
        $this->add_child(
            ui::html()->span(
                ui::html()->div($page_content)->margin("0.5em")
            )->add_class(ui::css_classes()->admin_page_layout_content_area_content())
            .
            ui::html()->span(
                ui::html()->div($page_menu)->set_id("categories")
            )->add_class(ui::css_classes()->admin_page_layout_content_area_navigation())
        );
        $this->position_relative();
        //$this->border("1px solid red");
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2222222222
abstract class WidgetForAdvertiseEntity0 extends CollectionOfItems{
    private $item_container;
    private $highlight_item_code = '';

    public function __construct(ReaderForValuesStoredInArray $reader,$item_container=null,$highlight_item_code='')
    {
        $this->item_container = $item_container ? $item_container : ui::html()->span()->width("30%");
        $this->highlight_item_code = $highlight_item_code;
        parent::__construct($reader);
    }

    protected function get_html_from_item_reader($item_reader)
    {
        $current_item_code = $this->get_type_code($item_reader);
        $border_right_color = $current_item_code && $current_item_code == $this->highlight_item_code ? "orange" : "transparent";

        return ui::html()->div(
            $this->get_dest_url($current_item_code)->toLink(
                ui::html()->span($this->get_display_text($item_reader)."&nbsp;&nbsp;|")->width_auto()->padding_right("1.0em")
                .
                ui::html()->span(rand(0,9))->width_auto()
            )->display_block()->width_auto()
        )->
        background_color("#fff")->
        padding("1.0em")->
        background_image_url(ui::urls()->asset("_____brush.png"))->
        background_size_contain()->
        background_repeat_no_repeat()->text_align_right()->background_origin_content_box()->
        border_right("5px solid transparent")->
        border_right_color($border_right_color)->
        border_bottom("1px solid ".ui::colors()->bg()->LTimes(0.9))

            ;
    }
    protected function get_item_container()
    {
        return clone $this->item_container;
    }
    abstract protected function get_type_code($item_reader);
    abstract protected function get_display_text($item_reader);
    abstract protected function get_dest_url($current_item_code);
}

abstract class WidgetForAdvertiseEntity extends CollectionOfItems{
    private $item_container;
    private $highlight_item_code = '';

    public function __construct(ReaderForValuesStoredInArray $reader,$item_container=null,$highlight_item_code='')
    {
        $this->item_container = $item_container ? $item_container : ui::html()->span()->width("30%");
        $this->highlight_item_code = $highlight_item_code;
        parent::__construct($reader);
    }

    protected function get_html_from_item_reader($item_reader)
    {
        $current_item_code = $this->get_type_code($item_reader);

        return ui::html()->div(
            ui::html()->div()
                ->height("2.0em")
                ->background_repeat_no_repeat()
                ->background_size_contain()
                ->background_position_center()
                ->background_image_url(ui::urls()->asset("_____brush.png"))
            .
            ui::html()->div($this->get_display_text($item_reader))->margin_top("4px")->min_height("2.2em")
        )->background_color("#fff")->border("1px solid ".ui::colors()->bg()->STimes(0.5)->LTimes(0.95))->add_class(ui::css_classes()->chap_footer_product_category_menu_item_content())
            ->toLink($this->get_dest_url($current_item_code))

            ;

        
    }
    protected function get_item_container()
    {
        return clone $this->item_container;
    }
    abstract protected function get_type_code($item_reader);
    abstract protected function get_display_text($item_reader);
    abstract protected function get_dest_url($current_item_code);
    
}


class WidgetForAdvertiseProduct extends WidgetForAdvertiseEntity{
    protected function get_type_code($item_reader)
    {
        return $item_reader->product_type_code();
    }
    protected function get_display_text($item_reader)
    {
        //return $item_reader->product_type_code();
        return $item_reader->product_type_as_single();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminProducts($current_item_code);
    }
}
class WidgetForAdvertiseItem extends WidgetForAdvertiseProduct{
    protected function get_type_code($item_reader)
    {
        return $item_reader->item_type_code();
    }
    protected function get_display_text($item_reader)
    {        
        return $item_reader->item_type_as_single();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminAddPost($current_item_code);
    }
}

class WidgetForAdvertiseFacility extends WidgetForAdvertiseProduct{
    protected function get_type_code($item_reader)
    {
        return $item_reader->facility_type_code();
    }
    protected function get_display_text($item_reader)
    {
        return $item_reader->facility_type_as_single();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminFacilities($current_item_code);
    }
}
class WidgetForAdvertiseWork extends WidgetForAdvertiseProduct{
    protected function get_type_code($item_reader)
    {
        return $item_reader->work_type_code();
    }
    protected function get_display_text($item_reader)
    {
        return $item_reader->work_type_as_single();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminWork($current_item_code);
    }
}
class WidgetForAdvertiseServiceProvider extends WidgetForAdvertiseProduct{
    protected function get_type_code($item_reader)
    {
        return $item_reader->profile_type_code();
    }
    protected function get_display_text($item_reader)
    {
        return $item_reader->profile_type_as_single();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminProfiles($current_item_code);
    }
}
class WidgetForShareWeddingPhotos extends WidgetForAdvertiseProduct{
    protected function get_type_code($item_reader)
    {
        return $item_reader->event_type_code();
    }
    protected function get_display_text($item_reader)
    {
        return $item_reader->event_type_as_single();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminPhotos($current_item_code);
    }
}
class WidgetForShareWeddingTips extends WidgetForAdvertiseProduct{
    protected function get_type_code($item_reader)
    {
        return $item_reader->article_type_code();
    }
    protected function get_display_text($item_reader)
    {
        return $item_reader->article_type_as_single();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminTips($current_item_code);
    }
}
class WidgetForShareStatusUpdates extends WidgetForAdvertiseProduct{
    protected function get_type_code($item_reader)
    {
        return $item_reader->status_type_code();
    }
    protected function get_display_text($item_reader)
    {
        return $item_reader->status_type();
    }
    protected function get_dest_url($current_item_code)
    {
        return ui::urls()->adminStatusUpdates($current_item_code);
    }
}




abstract class CollectionOfPosts extends CollectionOfItems{

    protected function link_to_spoke($file_name){
        return ui::urls()->view_post($file_name)->toLink();
    }

    protected function getFinalVisual($item_reader)
    {
        $photo =
            $item_reader->picture_file_name() ?
                $this->link_to_spoke($item_reader->file_name())->
                add_child(
                    ui::urls()->view_image($item_reader->picture_file_name())->toImage()->set_alt($item_reader->title())->add_class("zoomable_image")
                )->display_inline_block()
                : "No Photo";
        $video = new LinkToYoutubeVideoUsingIFrame($item_reader->youtube_video_id());


        //todo: here, we can display the video or image, depending on whether it was a video post or photo post
        $final_photo = $item_reader->youtube_video_id() ? $video : $photo;
        return $final_photo;
    }
}


class ListOfCommentsForAPost extends CollectionOfPosts{
    protected function get_html_from_item_reader($item_reader)
    {
        $full_name = $item_reader->full_name();
        $email = $item_reader->email_address();
        $comment = $item_reader->content();

        $right = ui::html()->div()->add_child(
          sprintf("%s (%s): %s",
              ui::html()->span()->add_child($full_name)->font_weight_bold()->
              color(ui::colors()->footer_bg()->STimes(0.5)),
              ui::html()->span()->add_child($email)->width_auto()->font_style("italic"),
              $comment
          )
        )->
        font_variant("initial")->
        line_height("1.1em")->
        background_color(ui::colors()->comment_wrapper())->
        padding("0.5em 1.0em")->
        border_radius("0.3em")->
        border_bottom(sprintf("1px solid %s",ui::colors()->comment_wrapper()->LTimes(0.95)))->
        border_top(sprintf("1px solid %s",ui::colors()->comment_wrapper()->LTimes(1.01)))
        ;

        //print ui::urls()->asset("user40.jpg")->toImage();exit;
        return ui::html()->my_list_item(
            ui::urls()->asset("user40.jpg"),
            ui::html()->div()->add_child(
                ui::html()->span()->width("0%")->border(sprintf("16px solid %s",ui::colors()->comment_wrapper()))->border_left_color("transparent")->border_top_color("transparent")->border_bottom_color("transparent") .
                ui::html()->span()->add_child($right)->width("90%")->margin_left("-2px")
            )->margin_left("-16px")

        );

    }
    protected function get_class()
    {
        return ui::css_classes()->romeo_department();
    }
}

class ListOfCommentsToManage extends ListOfCommentsForAPost{
    protected function get_html_from_item_reader($item_reader)
    {
        $comment = parent::get_html_from_item_reader($item_reader);

        return
            ui::html()->div()->add_child($comment).

            ui::html()->div()->add_child(
                ui::html()->secondary_text()->add_child(
                    $this->in_response($item_reader))->
                border("1px solid #ddd")->border_top_width("0px")->border_right_width("0px")->border_radius("5px")->
                padding_left("1.0em")->
                margin_left("25%")->padding("8px")->
                margin_bottom("8px")->background_color(ui::colors()->panel_header_bg())
            )->
            line_height("1.1em")->font_variant("initial")->
            padding_top("4px")->margin_top("4px").

            ui::html()->div()->add_child(
                ui::html()->panel_header(
                    ui::html()->span()->add_child(
                        ui::html()->secondary_text()->add_child($this->status($item_reader))
                    )->width("50%")->vertical_align_middle().
                    ui::html()->span()->add_child(
                        $this->actions($item_reader)
                    )->width("50%")->vertical_align_middle()
                )->border_width("0px !important")->padding("8px")
            )->margin("4px -12px -8px -12px")->border_top("1px solid #ddd")
            ;
    }

    private function status($item_reader)
    {
        return sprintf(
            "Status: %s",
            app::utils()->format_as_proper_noun(
                app::utils()->replace_underscores($item_reader->approval_status_code()
                )
            )
        );
    }

    /**
     * @param $item_reader
     * @return string
     */
    private function in_response($item_reader)
    {
        return sprintf(
            "In Response To: %s",
            ui::urls()->view_post($item_reader->file_name())->
            toLink($item_reader->file_name())->color(ui::colors()->header_bg())->font_weight_bold()
        );
    }

    private function actions($item_reader)
    {
        return ui::html()->div()->add_child(
            ui::html()->span_auto()->add_child(
                ui::forms()->approve_comment($item_reader->entity_id())->margin_right("4px")
            ) .
            ui::html()->span_auto()->add_child(
                ui::forms()->move_comment_to_trash($item_reader->entity_id())->margin_right("4px")
            ) .
            ui::html()->span_auto()->add_child(
                ui::forms()->move_comment_to_spam($item_reader->entity_id())->margin_right("4px")
            )
        )->text_align_right();
    }
}

class ListOfPhotoCreditsForAPost extends CollectionOfItems{
    protected function get_html_from_item_reader($item_reader)
    {
        $text = sprintf("%s : %s&nbsp;&nbsp;|&nbsp;&nbsp;",$item_reader->work_type_code(),$item_reader->full_name());
        return ui::html()->span()->add_child($text)->width_auto()->color(ui::colors()->header_bg());
    }
    protected function disable_item_styling(){
        return true;
    }
}
//verbs and their tenses: is with, was with, will be with
//created is creating [is getting married, was getting married, will be getting married
//introduced, is introducing, will be introducing
//was selling, is selling, no longer sales
//is renting, was renting, no longer rents
//provided services, is providing services, will be providing services
class SmartVerb{
    public function __construct($past_tense,$present_tense,$future_tense,$past_participle, $present_participle){

    }
}
class SmartNoun{
    public function __construct($noun, $article){

    }
}
class DummyStreamItem extends SmartDiv{

    public function __construct($who='Cathy Perez',$verb ='created', $what='a page',$when='23hrs ago', $saying='I love you')
    {
        parent::__construct();

        $banner = sprintf("$who $verb $what");

        $this->add_child(
            //what happened, is happening, or will be happening
            ui::html()->div()->add_child(
                ui::html()->my_list_item(
                    //icon
                    $icon_url = ui::urls()->asset("user40.jpg"),
                    //banner
                    ui::html()->div()->add_child($banner).
                    ui::html()->div()->add_child(ui::html()->secondary_text()->add_child($when))

                )
            )->
            //border_bottom(ui::borders()->panel())->
            padding_bottom("4px")->
            margin_bottom("4px")->
            margin_left("-1.0em")->padding_left("1.0em")->
            margin_right("-1.0em")->padding_right("1.0em").

            //details [saying]
            ui::html()->div()->add_child($saying)
        )->font_variant("initial")->line_height("1.1em");
    }
}
class StreamOfPostsAt50Percent extends CollectionOfPosts{
    
    /** @param ReaderForValuesStoredInArray  $item_reader */
    protected function get_html_from_item_reader($item_reader)
    {

        //input
        $month = $item_reader->month_description();
        $title = $item_reader->title();
        $item_type = ui::domain_object($item_reader)->item_sub_type();//$item_reader->item_type_code();
        $intro = $item_reader->content();
        $final_photo = $this->getFinalVisual($item_reader);

        $engagement_unique_id = "element_". rand(1000,9999);
        $engagement_unique_class = ui::css_classes()->chap_stream_engage_stats();


        $additionl_content = $this->getContentForActionsAfterImageOfItem($item_reader);
        //----------------------------


        //=================================
        $item = ui::html()->div(
            ui::html()->div()->add_child(
            //title
                ui::html()->div()->add_child(
                    $this->link_to_spoke($item_reader->file_name())->
                    add_child($this->style_the_title($title))->color("inherit")->
                    add_class(ui::css_classes()->romeo_headline())
                )
                    ->margin_bottom("0.5em")
                    ->padding("0em 1.0em").
                //intro
                ui::html()->div()->add_child(
                    SmartUtils::limit_text_to_length($intro,300)
                )
                    ->padding("0em 1.0em")
                    ->font_variant("initial")
                    ->line_height("1.1em")
                    ->font_style("italic")                    
                    ->margin_bottom("0.5em")
            )
            .
            //photo
            ui::html()->div()->add_child(
                ui::html()->span()->add_child(
                    $final_photo
                )
                    //->set_attribute('onClickSetSlideUp',".$engagement_unique_class")
                    //->set_attribute('onClickSetSlideToggle',"#$engagement_unique_id")
                    ->set_attribute('onClickSetEffects',"slideUp:.$engagement_unique_class;slideToggle:#$engagement_unique_id")
                .
                ui::html()->div()->add_child(
                    ui::html()->div(
                        ui::html()->div(
                            new VerticalEngagementStatisticsForStreamOfPostsAt50Percent($item_reader)
                        )
                    )
                        ->border_top("1px solid ".ui::colors()->bg()->LTimes(0.7))
                        ->box_shadow("0px 0px 3px ".ui::colors()->bg()->LTimes(0.7))

                )
                    ->set_id($engagement_unique_id) //for purposes of seeking via fragment
                    ->add_class($engagement_unique_class)
                    ->add_class(ui::css_classes()->chap_footer())

            )->
            overflow_hidden()
        );

        return
            ui::html()->div(
                ui::html()->span()
                    ->margin_right("0.5em")
                    ->width("2.0em")
                    ->height("2.0em")
                    ->background_image_url(ui::urls()->asset("user40.jpg"))
                    ->background_size_cover()
                    ->border_radius("50%")
                .
                ui::urls()->user(app::utils()->make_file_name($item_reader->author_id(),$item_reader->author_name()))->toLink($item_reader->author_name())."&nbsp;"
                .
                "posted this"
            )
                ->font_variant("initial")
                ->margin_top("0.5em")
                ->border_bottom(ui::borders()->panel())
                ->padding_bottom("4px")
                ->set_attribute("onLongPressSetAttributeValue","4/body&2/html")
                ->set_attribute("onLongPressSetStyleBorder","5px solid red:body")
                //->set_attribute("onLongPressSetInnerHtml","hello world/body")
                ->set_attribute("onLongPressSetEffect","slideUp:header")
            .
            ui::html()->div($item)
                ->line_height("1.1em")
                ->background_color("#fff")
                ->padding("0.5em 0.0em")
                ->margin("0px -1.0em")
            .
            ui::html()->div(
                //todo: engagement statistics
                ui::html()->span_auto(ui::html()->span_auto($item_reader->views())->font_size("2.0em"). "&nbsp;Views")
                    ->background_color(ui::colors()->notification_header_bg())
                    ->padding("0px 1.0em")
                    ->border_radius("0.9em")
                    ->margin_right("0.5em")
                    ->border_bottom("1px solid ".ui::colors()->notification_header_bg()->LTimes(0.9))
                .
                ui::html()->span_auto(ui::html()->span_auto($item_reader->likes())->font_size("2.0em")."&nbsp;Likes")
                    ->background_color(ui::colors()->notification_header_bg())
                    ->padding("0px 1.0em")
                    ->border_radius("0.9em")
                    ->margin_right("0.5em")
                    ->border_bottom("1px solid ".ui::colors()->notification_header_bg()->LTimes(0.9))
                .
                ui::html()->span_auto(ui::html()->span_auto($item_reader->comments())->font_size("2.0em")."&nbsp;Comments")
                    ->background_color(ui::colors()->notification_header_bg())
                    ->padding("0px 1.0em")
                    ->border_radius("0.9em")
                    ->margin_right("0.5em")
                    ->border_bottom("1px solid ".ui::colors()->notification_header_bg()->LTimes(0.9))

                //"Views | Likes | Comments"
            )
            ;
    



    }

    protected function get_item_container()
    {
        return ui::html()->div()->margin_bottom("1.0em");
    }

    /** @param ReaderForValuesStoredInArray  $item_reader */
    protected function getContentForActionsAfterImageOfItem($item_reader)
    {
        return "";
    }


    protected function class_for_column1()
    {
        return ui::css_classes()->romeo_column1();
    }

    protected function class_for_column2()
    {
        return ui::css_classes()->romeo_column2();
    }
    
    private function style_the_title($title)
    {
        return $title;
    }    

}

class StreamOfAdminPostsInSideBar extends CollectionOfItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return
            ui::urls()->view_post($item_reader->file_name())->
            toLink($this->linkContent($item_reader))->display_block()->color_inherit()
            ;
        
    }
    protected function get_item_container()
    {
        return ui::html()->div()->padding("0.3em 0.5em")->border_bottom("1px dashed ".ui::colors()->bg()->LTimes(0.8));
    }

    private function linkContent($item_reader)
    {
        return ui::html()->span(
            ui::html()->div()->height("3.0em")
                ->background_image_url(ui::urls()->view_image($item_reader->picture_file_name()))
                ->background_size_cover()
                ->border_radius("50%")
            //ui::urls()->view_image($item_reader->picture_file_name())->toImage()->border_radius("50%")
        )->width("20%")
        .
        ui::html()->span(
            ui::html()->div($item_reader->title())->padding_left("0.5em")
        )->width("80%");
    }
}

class StreamOfAdminPublishedPostsAt50Percent000 extends CollectionOfItems{
    protected function get_html_from_item_reader($item_reader)
    {
        $random_element_id = join("_",["element",rand(1000,9999)]);
        $footer_element_id = join("-",[$random_element_id,"footer"]);
        $selector_indicator_id = join("-",[$random_element_id,"selection-indicator"]);

        $toolbar_id = join("-",[$random_element_id,"toolbar"]);


        return
            ui::html()->div(
                ui::html()->span(
                    ui::html()->div()->add_class(ui::css_classes()->chap_img_in_product_list())
                        ->background_image_url(ui::urls()->view_image($item_reader->picture_file_name()))
                        ->width("4.0em")->height("4em")
                        ->border("2px solid #aaa")
                        ->border_radius("50%")
                        ->margin_bottom("0.5em")

                )->width("30%")
                .
                ui::html()->span(
                    ui::html()->div($item_reader->title())->font_weight_normal()->opacity("0.84")
                        ->add_class(ui::css_classes()->chap_one_line_text())
                    .
                    ui::html()->div(
                        "".ui::forms()->unpublish_post($item_reader->file_name())->display_inline_block()->width_auto()
                    )->text_align_right()->margin_top("0.5em")

                )->width("70%")
                .
                ui::html()->span_auto("SELECTED")
                    ->set_id($selector_indicator_id)
                    ->margin_top("-1.0em")
                    ->line_height("1.0em")
                    ->background_image_url(ui::urls()->asset("tick.png"))
                    ->background_size_contain()
                    ->background_repeat_no_repeat()
                    ->padding_left("1.5em")
                    ->display_none()
                .
                ui::html()->make_footer(
                    ui::html()->div(
                        ui::html()->div()->add_class(ui::css_classes()->chap_img_in_product_list())->
                        background_image_url(ui::urls()->view_image($item_reader->picture_file_name()))
                            ->height("12em")->margin_bottom("0.5em")
                        .

                        $item_reader->title()
                        .
                        ui::html()->div(
                            ui::html()->span("X")
                                ->display_inline_block()->width_auto()->padding("0.5em 1.0em")
                                ->set_attribute("onClicksetSlideUp",ui::class_selector()->chap_footer())
                            .
                            ui::html()->span("SEE DETAILS")
                                ->width_auto()
                                ->padding("0.5em 1.0em")->font_weight_bold()
                                ->set_attribute("onClickSetToaster","Loading page...please wait")
                                ->set_attribute("onClickSetRedirect",ui::urls()->view_post($item_reader->file_name()))


                        )->vertical_align_middle()->border_top("1px solid white")->margin_top("0.5em")->padding_top("0.5em")
                    )->padding("1em")
                    ,
                    $footer_element_id
                )->background_color("#000")->line_height("1.1em")->opacity("0.9")
                    ->color("#fff")

            )
                ->add_class(ui::css_classes()->chap_white_bg())
                ->border("1px solid #ddd")
                //->margin_right("-1px")->margin_bottom("-1px")
                ->border_radius("3px")
                ->padding("1.0em")
                ->line_height("initial")
                ->font_variant("initial")
                ->text_align_center()

                ->set_id($random_element_id)
                ->cursor_pointer()
                //->set_attribute("onMouseEnterSetBackgroundColor", ui::colors()->ws_highlighted_item().":#$random_element_id")
                //->set_attribute("onMouseLeaveSetBackgroundColor","#fff:#$random_element_id")
                //->set_attribute("onMouseDownSetBackgroundColor",ui::colors()->ws_highlighted_item()->LTimes(0.8).":#$random_element_id")
                ->set_attribute("onClickToggleClass", ui::css_classes()->chap_selected_item()."/#$random_element_id")
                //->set_attribute("onMouseUpSetBackgroundColor",ui::colors()->ws_highlighted_item().":#$random_element_id")
               // ->set_attribute("onClickSetEffects",join(";",["fadeOut:".ui::class_selector()->chap_footer(),"fadeToggle:#".$footer_element_id]))

                //we want to select item when the item is clicked
                ->set_attribute("onClickToggleAppendToValue",$item_reader->file_name(). sprintf("/[name=%s]",app::values()->csv_file_names()))
                ->set_attribute("onClickSetEffects","slideToggle:#$selector_indicator_id;fadeToggle:#$toolbar_id")


            .
            ui::html()->make_footer(
                ui::builders()->adminItemToolbar()->addPublish()->addUnpublish()->getHtml()
                ,
                $toolbar_id

            )



            ;
    }
    protected function get_item_container()
    {
        return ui::html()->div()
            ->margin_top("-1px")
            ->overflow_hidden();
    }
}

class ListOfAdminItems extends CollectionOfItems{   

    protected function get_html_from_item_reader($item_reader)
    {
        $random_element_id = join("_",["element",rand(1000,9999)]);
        $footer_element_id = join("-",[$random_element_id,"footer"]);
        $selector_indicator_id = join("-",[$random_element_id,"selection-indicator"]);

        $toolbar_id = join("-",[$random_element_id,"toolbar"]);


        return
            ui::html()->div(
                ui::html()->span(
                    ui::html()->div()->add_class(ui::css_classes()->chap_img_in_product_list())
                        ->background_image_url(ui::urls()->view_image($item_reader->picture_file_name()))
                        ->width("4.0em")->height("4em")
                        ->border("2px solid #aaa")
                        ->border_radius("50%")
                        ->margin_bottom("0.5em")

                )->width("30%")
                .
                ui::html()->span(
                    ui::html()->div($item_reader->title())->font_weight_normal()->opacity("0.84")
                        ->add_class(ui::css_classes()->chap_one_line_text())
                    .
                    ui::html()->div(
                        $this->getInlineToolbar($item_reader)
                    )->text_align_right()->margin_top("0.5em")

                )->width("70%")
                .
                ui::html()->span_auto("SELECTED")
                    ->set_id($selector_indicator_id)
                    ->margin_top("-1.0em")
                    ->line_height("1.0em")
                    ->background_image_url(ui::urls()->asset("tick.png"))
                    ->background_size_contain()
                    ->background_repeat_no_repeat()
                    ->padding_left("1.5em")
                    ->display_none()

            )
                ->add_class(ui::css_classes()->chap_white_bg())
                ->border("1px solid #ddd")
                //->margin_right("-1px")->margin_bottom("-1px")
                ->border_radius("3px")
                ->padding("1.0em")
                ->line_height("initial")
                ->font_variant("initial")
                ->text_align_center()

                ->set_id($random_element_id)
                ->cursor_pointer()                
                ->set_attribute("onMouseEnterAddClass", ui::css_classes()->chap_entered_selectable_item()."/#$random_element_id")
                ->set_attribute("onMouseLeaveRemoveClass", ui::css_classes()->chap_entered_selectable_item()."/#$random_element_id")
                ->set_attribute("onClickToggleClass", ui::css_classes()->chap_selected_item()."/#$random_element_id")
                ->set_attribute("onClickToggleAppendToValue",$item_reader->file_name(). sprintf("/[name=%s]",app::values()->csv_file_names()))
                ->set_attribute("onClickSetEffects","slideToggle:#$selector_indicator_id;fadeToggle:#$toolbar_id")


            .
            ui::html()->make_footer(
                $this->getToolbar()
                ,
                $toolbar_id
            )

            ;
    }
    protected function get_item_container()
    {
        return ui::html()->div()
            ->margin_top("-1px")
            ->overflow_hidden();
    }

    protected function getToolbar()
    {
        return "";
    }
    protected function getInlineToolbar($item_reader)
    {
        return "";
    }
}

class ListOfAdminPublishedItems extends ListOfAdminItems{
    protected function getToolbar()
    {
        return ui::builders()->adminItemToolbar()->addUnpublish()->getHtml();
    }
}

class ListOfAdminDraftItems extends ListOfAdminItems{
    protected function getToolbar()
    {
        return ui::builders()->adminItemToolbar()->addPublish()->getHtml();
    }
    protected function getInlineToolbar($item_reader)
    {
        return ui::builders()->adminItemInlineToolbar($item_reader)->addEdit()->addDelete()->getHtml();        
    }
}

class StreamOfPostsToManage extends CollectionOfPosts{
    protected function link_to_spoke($file_name){
        return ui::urls()->view_post($file_name)->toLink();
    }
    protected function get_class()
    {
        return ui::css_classes()->romeo_item_in_stream_on_landing_page();
    }
    protected function get_html_from_item_reader($item_reader)
    {
        return ui::html()->div(
            ui::html()->div("")
        );
        return $this->getFinalVisual($item_reader). "Heloo world";
    }


}

class StreamOfPostsAt30Percent extends CollectionOfPosts{
   
    /** @param ReaderForValuesStoredInArray  $item_reader */
    protected function get_html_from_item_reader($item_reader)
    {
        $title = $item_reader->title();
        $final_photo = $this->getFinalVisual($item_reader);
        //=========
        $item = new LayoutForNColumns();

        //right column


        $item->addNewColumn()->add_child(
            ui::html()->div()->add_child(
            //title
                ui::html()->div()->add_child(
                    $this->link_to_spoke($item_reader->file_name())->
                    add_child($title)->
                    add_class(ui::css_classes()->romeo_headline()) .

                    ui::html()->div()->add_child(
                        $this->get_price($item_reader)
                    )
                )
            )
        )->add_class(ui::css_classes()->romeo_column1());

        $item->addNewColumn()->add_child(
        //photo
            ui::html()->div()->add_child($final_photo)->overflow_hidden()
        )->add_class(ui::css_classes()->romeo_column2());




        $item->background_color("#fff");
        return $item;
    }

    protected function get_class()
    {
        return ui::css_classes()->romeo_item_in_stream_on_landing_page_at_30_percent();
    }

    protected function get_class2()
    {
        return ui::css_classes()->romeo_department();
    }

    /** @param \PageCSSBaseClass $page_css_base_class */
    public static function add_css_for_stream_on_posts($page_css_base_class){

        //default

        $page_css_base_class->addCSSFor(
            CSSElementOfClass(ui::css_classes()->romeo_column1())->
            inside_class(ui::css_classes()->romeo_item_in_stream_on_landing_page_at_30_percent())->
            width("70%")
        );
        $page_css_base_class->addCSSFor(
            CSSElementOfClass(ui::css_classes()->romeo_column2())->
            inside_class(ui::css_classes()->romeo_item_in_stream_on_landing_page_at_30_percent())->
            width("30%")
        );

        //for nth child

        $arr_indexes = array("6n+4","6n+5","6n+6");

        $page_css_base_class->addCSSFor(
            (new CSSQueryForNthChild())->
            parent(ui::css_classes()->romeo_item_in_stream_on_landing_page_at_30_percent())->
            indexes($arr_indexes)->
            child(ui::css_classes()->romeo_column1())->
            all()->
            css()->width("100%")->margin_bottom("0.5em")
        );
        $page_css_base_class->addCSSFor(
            (new CSSQueryForNthChild())->
            parent(ui::css_classes()->romeo_item_in_stream_on_landing_page_at_30_percent())->
            indexes($arr_indexes)->
            child(ui::css_classes()->romeo_column2())->
            all()->
            css()->width("100%")
        );
    }

    /** @param ReaderForValuesStoredInArray $item_reader */
    private function get_price($item_reader)
    {
        switch ($item_reader->item_type_code()){
            default:
                return "";
            break;
            case app::item_type_codes()->product():
                return  "UGX ". app::utils()->createCommaSeparatedNumber(rand(200, 2000) * 500);
                break;
        }
    }
}

class StreamOfPostsAt20Percent extends CollectionOfPosts{


    /** @param ReaderForValuesStoredInArray  $item_reader */
    protected function get_html_from_item_reader($item_reader)
    {
        $title = $item_reader->title();
        //todo: here, we can display the video or image, depending on whether it was a video post or photo post
        $final_photo = $this->getFinalVisual($item_reader);
        //=========
        $item = new LayoutForNColumns();
        //right column
        $item->addNewColumn()->add_child(
            ui::html()->div()->add_child(
            //title
                ui::html()->div()->add_child(
                    $this->link_to_spoke($item_reader->file_name())->
                    add_child($title)->
                    add_class(ui::css_classes()->romeo_headline())
                )
            )
        )->width("100%");

        $item->addNewColumn()->add_child(
        //photo
            ui::html()->div()->add_child($final_photo)->background_color("#eee")->overflow_hidden()
        )->width("100%");
        $item->background_color("#fff");
        return $item;


    }
    protected function get_class()
    {
        return ui::css_classes()->romeo_department();
    }

}


class GridOfPostsAt80Percent extends CollectionOfPosts{


    /** @param ReaderForValuesStoredInArray  $item_reader */
    protected function get_html_from_item_reader($item_reader)
    {
        $title = $item_reader->title();

        //todo: here, we can display the video or image, depending on whether it was a video post or photo post
        $final_photo = $this->getFinalVisual($item_reader);
        //=========
        $item = new LayoutForNColumns();
        //right column
        $item->addNewColumn()->add_child(
            ui::html()->div()->add_child(
            //title
                ui::html()->div()->add_child(
                    $this->link_to_spoke($item_reader->file_name())->
                    add_child($title)->
                    add_class(ui::css_classes()->romeo_headline())
                )
            )
        )->width("100%");

        $item->addNewColumn()->add_child(
        //photo
            ui::html()->div()->add_child($final_photo)->background_color("#eee")->overflow_hidden()
        )->width("100%");
        $item->background_color("#fff");
        $item->width("25%");
        return $item;

    }
}

class ListOfDraftPosts extends CollectionOfPosts{

    protected function link_to_spoke($file_name){
        return ui::urls()->adminEditPost($file_name)->toLink();
    }
    protected function get_html_from_item_reader($item_reader)
    {

        $content=
            ui::html()->span()->height("5em")->background_image_url(
                ui::urls()->view_image($item_reader->picture_file_name())
            )->width("37%")->margin_right("3%")
                ->overflow_hidden()
                ->background_size_contain()
                ->background_repeat_no_repeat()
                ->background_origin_content_box()->background_position_center()
            .
            ui::html()->span(
                ui::html()->div($item_reader->title())
                .
                ui::html()->div(
                    $this->link_to_spoke($item_reader->file_name())->set_inner_html("Edit")
                        ->background_color(ui::colors()->header_bg()->LTimes(1.3))
                        ->color("#fff")->padding("1.0em")
                        ->display_inline_block()
                        ->width_auto()
                        ->border_radius("3px")
                        ->margin_top("0.5em")
                    ."&nbsp;".
                    ui::forms()->publish_post($item_reader->file_name())->display_inline_block()->width_auto()
                    ."&nbsp;".
                    ui::forms()->delete_post($item_reader->file_name())->display_inline_block()->width_auto()
                )->text_align_right()

            )->width("60%")->font_variant("initial")->line_height("1.0em")
        ;

        return ui::html()->div($content)->background_color("#fff")->padding("1.0em")->border("1px solid ".ui::colors()->bg()->LTimes(0.95))->border_radius("5px");
        //$this->getFinalVisual($item_reader);
    }

    protected function get_item_container()
    {
        return ui::html()->div()->margin_bottom("0px")->margin_top("-1px");
    }
}

class ListOfPublishedPosts extends StreamOfPostsAt50Percent{
    protected function link_to_spoke($file_name){
        return ui::urls()->view_post($file_name)->toLink();
    }

    protected function getContentForActionsAfterImageOfItem($item_reader)
    {
        return ui::forms()->unpublish_post($item_reader->file_name());
    }
}

class PublicViewOfPublishedPosts extends StreamOfPostsAt50Percent{
    protected function link_to_spoke($file_name){
        return ui::urls()->view_post($file_name)->toLink();
    }
    protected function get_class()
    {
        return ui::css_classes()->romeo_item_in_stream_on_landing_page();
    }
}
class StreamOnLandingPage extends PublicViewOfPublishedPosts{

}


abstract class ListOfStatsPerAttribute extends CollectionOfItems{
    public function __construct(ReaderForValuesStoredInArray $reader,$heading = "")
    {
        $this->addNewColumn()->add_child_if($heading,ui::html()->heading2()->add_child($heading)->padding("0px 4px"));
        parent::__construct($reader);

        $this->max_width("800px")->margin_auto()
            ->background_color(ui::colors()->form_bg())->padding("1.0em")->border(ui::_1px_solid_form_border())->margin_bottom("1.0em")
        ;
        $this->add_class(ui::css_classes()->element_with_box_shadow())->border_radius("0.5em")->margin_top("1.0em");

    }

    protected function get_html_from_item_reader($item_reader)
    {
        return $this->report_for_total_posts($item_reader);
    }

    private function report_for_total_posts($item_reader)
    {
        $count = intval($item_reader->total_posts());
        $noun = $count != 1 ? "posts" : "post";

        $total_posts = ui::html()->span()->
        add_child(sprintf("%s %s",$count,$noun))->
        width_auto()->color("#555");

        return sprintf("%s:- %s", $this->label_for_total_posts($item_reader), $total_posts);
    }

    /** @param \ReaderForValuesStoredInArray $item_reader */
    abstract protected function label_for_total_posts($item_reader);
}

class ListOfStatsPerSection extends ListOfStatsPerAttribute{
    protected function label_for_total_posts($item_reader)
    {
        return $item_reader->title();
    }
}
class ListOfStatsPerYear extends ListOfStatsPerAttribute{
    protected function label_for_total_posts($item_reader)
    {
        return $item_reader->year_number();
    }    
}
class ListOfStatsPerMonth extends ListOfStatsPerAttribute{
    protected function label_for_total_posts($item_reader)
    {
        return $item_reader->month_description();
    }
}
class ListOfStatsPerWeek extends ListOfStatsPerAttribute{
    protected function label_for_total_posts($item_reader)
    {
        return $item_reader->week_of_the_year_description();
    }
}
class ListOfStatsPerDay extends ListOfStatsPerAttribute{
    protected function label_for_total_posts($item_reader)
    {
        return $item_reader->day_of_the_year_description();
    }
}



class ListOfDepartmentsVersion0 extends CollectionOfItems{
    protected function get_html_from_item_reader($item_reader)
    {
        $dept_code = $item_reader->department_code();
        $dept_description = $item_reader->department_description();
        
        return ui::urls()->department_page($dept_code)->
        toLink()->add_child($dept_description);

    }
}

class ContentAuditOnDashboardPage extends CollectionOfItems{
    protected function get_class()
    {
        return ui::css_classes()->romeo_department();
    }

    protected function get_html_from_item_reader($item_reader)
    {
        $code = $item_reader->item_type_code();
        $description = $item_reader->item_type_as_plural();
        $total = $item_reader->total() ? $item_reader->total() : 0;

        $this->get_url($code);

        list($url,$about) = $this->get_url($code);

        return $url->
        toLink()->add_child(
            ui::html()->my_list_item(
                ui::urls()->asset("user40.jpg"),
                ui::html()->div()->add_child("$description: ($total)")->font_weight_bold()->color(ui::colors()->header_bg()).
                ui::html()->secondary_text()->add_child($about)

            )

        );

    }

    private function get_url($code)
    {
        $url = ui::urls()->adminPage();
        $about = "";
        switch ($code) {
            default:
                $url = ui::urls()->adminPage();
                break;
            case app::item_type_codes()->article():
                $url = ui::urls()->adminAddArticle();
                $about = "Articles you have authored";
                break;
            case app::item_type_codes()->event():
                $url = ui::urls()->adminAddEvent();
                $about = "Event pages you have created";
                break;
            case app::item_type_codes()->facility():
                $url = ui::urls()->adminAddFacility();
                $about = "Facilities you are advertising";
                break;
            case app::item_type_codes()->product():
                $url = ui::urls()->adminAddProduct();
                $about = "Products you are selling";
                break;
            case app::item_type_codes()->profile():
                $url = ui::urls()->adminAddProfile();
                $about = "Profiles you have created to market yourself";
                break;
            case app::item_type_codes()->work():
                $url = ui::urls()->adminAddWork();
                $about = "Past work or performances you have published";
                break;
        }
        return array($url,$about);
    }
}

class ListOfItemTypes extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->item_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->item_type_as_single();
    }

    protected function getCmd()
    {
        return app::values()->post_picture();
    }
    protected function getTypeCodeField()
    {
        return app::values()->item_type_code();
    }

    protected function getUrl($item_reader)
    {
        $url = ui::urls()->adminPage();
        switch ($item_reader->item_type_code()) {
            default:
                $url = ui::urls()->adminPage();
                break;
            case app::item_type_codes()->article():
                $url = ui::urls()->adminAddArticle();
                break;
            case app::item_type_codes()->event():
                $url = ui::urls()->adminAddEvent();
                break;
            case app::item_type_codes()->facility():
                $url = ui::urls()->adminAddFacility();
                break;
            case app::item_type_codes()->product():
                $url = ui::urls()->adminAddProduct();
                break;
            case app::item_type_codes()->profile():
                $url = ui::urls()->adminAddProfile();
                break;
            case app::item_type_codes()->work():
                $url = ui::urls()->adminAddWork();
                break;
            case app::item_type_codes()->status_update():
                $url = ui::urls()->adminAddStatusUpdate();
                break;
        }
        return $url;
    }

}

class ListOfItemTypes2 extends CollectionOfItems{

    protected function get_html_from_item_reader($item_reader)
    {
        $code = $item_reader->item_type_code();
        $single = $item_reader->item_type_as_single();
        return ui::html()->div()->add_child(
          $single
        )->background_color("#fff")->border("1px solid #ddd")->padding("1.0em")->margin("-1px 0px 0px -1px");
    }
    protected function get_item_container()
    {
        return ui::html()->span()->width("33%");
    }
    protected function max_number_to_render()
    {
        return 6;
    }


    protected function getUrl($item_reader)
    {
        $url = ui::urls()->adminPage();
        switch ($item_reader->item_type_code()) {
            default:
                $url = ui::urls()->adminPage();
                break;
            case app::item_type_codes()->article():
                $url = ui::urls()->adminAddArticle();
                break;
            case app::item_type_codes()->event():
                $url = ui::urls()->adminAddEvent();
                break;
            case app::item_type_codes()->facility():
                $url = ui::urls()->adminAddFacility();
                break;
            case app::item_type_codes()->product():
                $url = ui::urls()->adminAddProduct();
                break;
            case app::item_type_codes()->profile():
                $url = ui::urls()->adminAddProfile();
                break;
            case app::item_type_codes()->work():
                $url = ui::urls()->adminAddWork();
                break;
            case app::item_type_codes()->status_update():
                $url = ui::urls()->adminAddStatusUpdate();
                break;
        }
        return $url;
    }

}

class ListOfStatusTypes extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->status_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->status_type();
    }
    protected function getCmd()
    {
        return app::values()->post_status_photo();
    }
    protected function getTypeCodeField()
    {
        return app::values()->status_type_code();
    }
    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddStatusUpdateOfType($item_reader->status_type_code());
    }

}

/*
class ListOfStatusTypes extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->status_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->status_type_as_single();
    }

    protected function getUrl($item_reader)
    {
        $url = ui::urls()->adminAddStatusUpdateForAttendingWedding();
        switch ($item_reader->status_type_code()) {
            default:
                $url = ui::urls()->adminAddStatusUpdateForAttendingWedding();
                break;
            case app::item_type_codes()->status_update():
                $url = ui::urls()->adminAddStatusUpdateForAttendingWedding();
                break;
            case app::item_type_codes()->event():
                $url = ui::urls()->adminAddEvent();
                break;
            case app::item_type_codes()->facility():
                $url = ui::urls()->adminAddFacility();
                break;
            case app::item_type_codes()->product():
                $url = ui::urls()->adminAddProduct();
                break;
            case app::item_type_codes()->profile():
                $url = ui::urls()->adminAddProfile();
                break;
            case app::item_type_codes()->work():
                $url = ui::urls()->adminAddWork();
                break;
        }
        return $url;
    }

}
*/
abstract class ListOfNavigationItems extends CollectionOfItems{


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
                $image_source_url->toImage()
            )->width("30%") .
            ui::html()->span()->add_child(
                ui::html()->div()->add_child(
                    $this->largeFirstWord($text_to_display).
                    ui::html()->div()->add_child_if($about,$about)
                )->padding_left("1.0em")
            )->width("70%")
        );
    }

    protected function get_class()
    {
        return ui::css_classes()->romeo_department();
    }
}

abstract class ListOfSomethingTypeToCreate000 extends CollectionOfItems{

    protected function get_class()
    {
        return ui::css_classes()->romeo_department();
    }

    protected function get_html_from_item_reader($item_reader)
    {
        //input
        $description = app::utils()->capitalize_first_letter($this->get_type_as_single($item_reader));
        $about = app::utils()->capitalize_first_letter($item_reader->about());

        //processing
        $text = ui::html()->div()->add_child($description)->font_weight_bold()->color(ui::colors()->header_bg()).
            ui::html()->secondary_text()->add_child($about);


        return $this->getUrl($item_reader)->
        toLink()->add_child(
            ui::html()->my_list_item(
                ui::urls()->asset("user40.jpg"),
                $text
            )
        );
    }

    /** @param \ReaderForValuesStoredInArray $item_reader */
    abstract protected function get_type_code($item_reader);
    /** @param \ReaderForValuesStoredInArray $item_reader */
    abstract protected function get_type_as_single($item_reader);
    /** @param \ReaderForValuesStoredInArray $item_reader
     * @return UrlForResource
     */
    abstract protected function getUrl($item_reader);
}

abstract class ListOfSomethingTypeToCreate extends CollectionOfItems{

    protected function get_class()
    {
        return "";//ui::css_classes()->romeo_department();
    }
    protected function get_item_container()
    {
        return ui::html()->span()->width("100%")->margin_bottom("0px")->line_height("1.1em");
    }

    protected function get_html_from_item_reader($item_reader)
    {

        //input

        return ui::html()->div(

            ui::html()->div(
                $this->get_inner_content($item_reader)
            )->padding("1.5em 1.5em")

        )->background_color("#fff")->border("1px solid #ddd")->margin_bottom("-1px")->margin_right("-1px");
    }

    /** @param \ReaderForValuesStoredInArray $item_reader */
    abstract protected function get_type_code($item_reader);
    /** @param \ReaderForValuesStoredInArray $item_reader */
    abstract protected function get_type_as_single($item_reader);
    /** @param \ReaderForValuesStoredInArray $item_reader
     * @return UrlForResource
     */
    abstract protected function getUrl($item_reader);

    private function get_inner_content($item_reader)
    {
        $description = app::utils()->capitalize_first_letter($this->get_type_as_single($item_reader));
        $about = app::utils()->capitalize_first_letter($item_reader->about());

        return
            ui::html()->div(
                ui::html()->span()->width("2.0em")->height("2.0em")->background_color(ui::colors()->notification_header_bg())->border_radius("50%")->margin_right("1.0em")

                .
                //ui::urls()->asset("user40.jpg")->toImage()->width("2.0em")->border_radius("10%").
                ui::html()->span($this->getUploadButton($item_reader))->width_auto()->float_right()

                .
                ui::html()->span_auto(
                    ui::html()->div()->add_child($description)->font_weight_bold()->color(ui::colors()->header_bg()) .
                    ui::html()->secondary_text()->add_child($about)
                )


            );



    }

    private function getUploadButton($item_reader)
    {
        return ui::html()->form(
            ui::html()->hidden_input("cmd", $this->getCmd())
            .
            ui::html()->hidden_input($this->getTypeCodeField(),$this->get_type_code($item_reader))
            .
            app::browser_fields()->file_to_upload()->toFileInput2($this->getFormName(),"")
            .
            ui::html()->submit_button("+ Add")->padding_left("1.5em")->padding_right("1.5em")->background_color(ui::colors()->header_bg()->LTimes(1.3))->color("white")
            ,
            $this->getFormName()
        )->color(ui::colors()->header_bg())->background_color("inherit");


        return new FormForPostProductPhoto(ui::browser_fields()->product_type_code(),'+');
        //return "+";
        //->color(ui::colors()->header_bg())->padding("0px 1.0em")->cursor_pointer()
    }

    abstract protected function getCmd();
    abstract protected function getTypeCodeField();

    private $form_name;
    private function getFormName()
    {
        if(!$this->form_name){
            $this->form_name = join("-", [$this->getCmd(), rand(1000, 9999)]);
        }
        return $this->form_name;
    }
}

class ListOfProductTypeToCreate extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->product_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->product_type_as_single();
    }
    protected function getCmd()
    {
        return app::values()->post_product_picture();
    }
    protected function getTypeCodeField()
    {
        return app::values()->product_type_code();
    }

    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddProductOfType($this->get_type_code($item_reader));
    }
}

class ListOfFacilityTypeToCreate extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->facility_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->facility_type_as_single();
    }
    protected function getCmd()
    {
        return app::values()->post_facility_photo();
    }
    protected function getTypeCodeField()
    {
        return app::values()->facility_type_code();
    }

    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddFacilityOfType($this->get_type_code($item_reader));
    }
}

class ListOfWorkTypeToCreate extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->work_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->work_type_as_single();
    }
    protected function getCmd()
    {
        return app::values()->post_work_photo();
    }
    protected function getTypeCodeField()
    {
        return app::values()->work_type_code();
    }
    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddWorkOfType($this->get_type_code($item_reader));
    }
}
class ListOfArticleTypeToCreate extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->article_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->article_type_as_single();
    }
    protected function getCmd()
    {
        return app::values()->post_article_photo();
    }
    protected function getTypeCodeField()
    {
        return app::values()->article_type_code();
    }
    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddArticleOfType($this->get_type_code($item_reader));
    }
}


class ListOfEventTypeToCreate extends ListOfSomethingTypeToCreate{
    protected function get_type_code($item_reader)
    {
        return $item_reader->event_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->event_type_as_single();
    }
    protected function getCmd()
    {
        return app::values()->post_event_photo();
    }
    protected function getTypeCodeField()
    {
        return app::values()->event_type_code();
    }
    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddEventOfType($this->get_type_code($item_reader));
    }
}
class ListOfProfileTypeToCreate extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->profile_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->profile_type_as_single();
    }
    protected function getCmd()
    {
        return app::values()->post_profile_photo();
    }
    protected function getTypeCodeField()
    {
        return app::values()->profile_type_code();
    }
    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddProfileOfType($this->get_type_code($item_reader));
    }
}


class ListOfStatusTypeToCreate extends ListOfSomethingTypeToCreate{

    protected function get_type_code($item_reader)
    {
        return $item_reader->status_type_code();
    }

    protected function get_type_as_single($item_reader)
    {
        return $item_reader->status_type();
    }
    protected function getCmd()
    {
        return app::values()->post_status_photo();
    }
    protected function getTypeCodeField()
    {
        return app::values()->status_type_code();
    }
    protected function getUrl($item_reader)
    {
        return ui::urls()->adminAddProfileOfType($this->get_type_code($item_reader));
    }
}

class ListOfDepartments extends ListOfNavigationItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return $this->generateHtml(
            ui::urls()->department_page($item_reader->department_code()),
            $this->getImageUrl($item_reader),
            $item_reader->department_description(),$this->getAbout($item_reader)
        );

    }

    private function getAbout($item_reader)
    {        
        return ui::html()->secondary_text()->add_child(
            "Check out the best items and hire the service providers you need"
        )->margin_top("8px")->padding_top("8px")->border_top("1px dashed #ddd");
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



class ListOfProductTypes extends ListOfNavigationItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return $this->generateHtml(
            ui::urls()->product_type_page($item_reader->product_type_code()),
            $item_reader->picture_file_name() ? ui::urls()->view_image($item_reader->picture_file_name()) : ui::urls()->asset("user.jpg"),
            $item_reader->product_type_as_plural()
        );
    }
}
class ListOfFacilityTypes extends ListOfNavigationItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return $this->generateHtml(
            ui::urls()->facility_type_page($item_reader->facility_type_code()),
            $item_reader->picture_file_name() ? ui::urls()->view_image($item_reader->picture_file_name()) : ui::urls()->asset("user.jpg"),
            $item_reader->facility_type_as_plural()
        );

    }
}
class ListOfWorkTypes extends ListOfNavigationItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return $this->generateHtml(
            ui::urls()->work_type_page($item_reader->work_type_code()),
            $item_reader->picture_file_name() ? ui::urls()->view_image($item_reader->picture_file_name()) : ui::urls()->asset("user.jpg"),
            $item_reader->work_type_as_plural()
        );
    }
}
class ListOfEventTypes extends ListOfNavigationItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return $this->generateHtml(
            ui::urls()->event_type_page($item_reader->event_type_code()),
            $item_reader->picture_file_name() ? ui::urls()->view_image($item_reader->picture_file_name()) : ui::urls()->asset("user.jpg"),
            $item_reader->event_type_as_plural()
        );

    }
}

class ListOfArticleTypes extends ListOfNavigationItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return $this->generateHtml(
            ui::urls()->article_type_page($item_reader->article_type_code()),
            $item_reader->picture_file_name() ? ui::urls()->view_image($item_reader->picture_file_name()) : ui::urls()->asset("user.jpg"),
            $item_reader->article_type_as_plural()
        );

    }
}

class ListOfProfileTypes extends ListOfNavigationItems{
    protected function get_html_from_item_reader($item_reader)
    {
        return $this->generateHtml(
            ui::urls()->profile_type_page($item_reader->profile_type_code()),
            $item_reader->picture_file_name() ? ui::urls()->view_image($item_reader->picture_file_name()) : ui::urls()->asset("user.jpg"),
            $item_reader->profile_type_as_plural()
        );
    }
}

class ListOfSuperAdminMenuItems extends SmartDiv{
    public function __construct()
    {
        parent::__construct();
        $this->add_child(
            ui::html()->div(
                ui::html()->heading3("Monitoring, Reporting and Management Center")->padding("1.0em")
                .
                ui::html()->div(
                    ui::html()->div(
                        "DASHBOARD"
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())
                    .
                    ui::html()->div(
                        "User/Identity Management"
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())
                    .
                    ui::html()->div(
                        "CUSTOMER/RELATIONSHIP Management"
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())
                    .
                    ui::html()->div(
                        "Session Management"
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())
                    .
                    ui::html()->div(
                        ui::html()->div("Content Management / PRODUCTION MANAGEMENT")
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())
                    .
                    ui::html()->div(
                        ui::html()->div("Performance Management")
                        .
                        ui::html()->toaster_link("Daily summaries",ui::urls()->super_admin_daily_performance())
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())
                    .
                    ui::html()->div(
                        "Financial Management"
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())
                    .
                    ui::html()->div(
                        "Human resource Management"
                    )->padding("1.0em")->border_bottom(ui::borders()->panel())


                )->border_top(ui::borders()->panel())
            )->background_color("white")->border(ui::borders()->panel())->padding("1.0em")
        );
    }
}