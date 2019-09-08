
<?php
interface IBabaRenderer{
    public function render($array);
}
class BabaArrayIterator{
    private $array = [], $position = 0;
    public function set_array($item)
    {
        if(!is_array($item)){
            throw new Exception("expected array");
        }
        $this->array = $item;
        return $this;
    }
    public function has_next(){
        return $this->position < count($this->array);
    }
    public function get_next(){
        if(!$this->has_next()){
            return "";
        }
        $next = $this->array[$this->position];
        $this->position += 1;
        return $next;
    }
    public function get_array(){
        return $this->array;
    }
}


class BabaRenderer{

    private $baba_state = [];

    public function __construct()
    {
        $this->save_state();
    }

    public function add_array($value, $key)
    {
        if(!is_array($value)){
            throw new Exception("expected an array");
        }
        return $this->do_add_item_to("arrays",$key, (new BabaArrayIterator())->set_array($value));
    }
    public function add_renderer($IBabaRenderer, $key)
    {
        if(!is_a($IBabaRenderer, "IBabaRenderer")){
            throw new Exception("expected renderer");
        }
        else if($this->renderer_exists($key)){
            throw new Exception("render $key already exists");
        }
        return $this->do_add_item_to("renderers",$key, $IBabaRenderer);
    }
    public function count_arrays(){
        return count($this->baba_state[$this->current_state_index()]["arrays"]);
    }
    public function count_renderers(){
        //print json_encode($this->baba_state);exit;
        return count($this->baba_state[$this->current_state_index()]["renderers"]);
    }

    public function array_exists($string)
    {
        return array_key_exists($string, $this->baba_state[$this->current_state_index()]["arrays"]);
    }
    public function renderer_exists($string)
    {
        return array_key_exists($string, $this->baba_state[$this->current_state_index()]["renderers"]);
    }

    public function undo(){
        if(count($this->baba_state) > 1){
            array_pop($this->baba_state);
        }
    }



    private function save_state()
    {
        $last_state_index = $this->current_state_index();
        $this->baba_state [] = count($this->baba_state) < 1 ? ["arrays"=>[],"renderers"=>[]] : $this->baba_state[$last_state_index];
    }

    private function current_state_index()
    {
        return count($this->baba_state) - 1;
    }

    private function do_add_item_to($supper_array_name, $key, $value)
    {
        $this->save_state();
        $this->baba_state[$this->current_state_index()][$supper_array_name][$key] = $value;
        return $this;
    }

    public function pull($total_items_to_pull, $from_array_name, $and_render_using_renderer_name)
    {

        //todo: test tracking the start index internally using iterator pattern
        //todo: we are sending an array of records to the renderer coz we want it to be able to render odd number of items to cover column
        if(!$this->array_exists($from_array_name)){
            throw new Exception("array name $from_array_name does not exist");
        }
        else if(!$this->renderer_exists($and_render_using_renderer_name)){
            throw new Exception("renderer name $and_render_using_renderer_name does not exist");
        }
        else{


            $total_items_to_pull = max( intval($total_items_to_pull), 0);

            /** @var BabaArrayIterator $source_array */
            $source_array = $this->baba_state[$this->current_state_index()]["arrays"][$from_array_name];
            /** @var IBabaRenderer $target_render_obj */
            $target_render_obj = $this->baba_state[$this->current_state_index()]["renderers"][$and_render_using_renderer_name];

            $count = 0;
            $items_to_render = [];
            while($source_array->has_next() && $count < $total_items_to_pull){
                $count += 1;
                $items_to_render[] = $source_array->get_next();
            }
            if(count($items_to_render) < 1){
                return "";
            }
            else{
                return $target_render_obj->render($items_to_render);
            }
        }


    }


}