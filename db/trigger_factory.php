<?php
class TriggerFactory{

    //POST
    public function after_add_post()
    {
        return new TriggerAfterAddPost();
    }
    public function before_add_post()
    {
        return new TriggerBeforeAddPost();
    }
    
    //PICTURE
    public function before_update_post_picture()
    {
        return new TriggerBeforeUpdatePostPicture();
    }
    public function after_update_post_picture()
    {
        return new TriggerAfterUpdatePostPicture();
    }
    //SESSION
    public function before_add_session()
    {
        return new TriggerBeforeAddSession();
    }
    
    public function get_all_as_string(){
        $command_list = new SQLCommandList();
        $command_list->add(new SQLDelimiterCommand());
        $command_list->set_delimiter("//");
        
        $command_list->add($this->before_add_session());

        //$command_list->add($this->before_add_post());
        //$command_list->add($this->after_add_post());

        //$command_list->add($this->before_update_post_picture());
        //$command_list->add($this->after_update_post_picture());
        return $command_list;

    }
    
}
