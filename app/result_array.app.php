<?php

abstract class ResultArrayForPostItem implements IResultArray{
    public function get()
    {
        //LET US CREATE SOME STORED PROCEDURES AND FUNCTIONS
        /*$command_list = new SQLCommandList();
        $command_list->set_delimiter("$$");
        $command_list->drop_procedure_if_exists("first_procedure");
        $begin = $command_list->create_procedure("first_procedure")->begin();

        $begin->add(Db::queries()->item_types());
        $begin->dec_var(app::values()->entity_id())->bigint(20);
        $begin->set_var (Db::fields()->entity_id()->toInt(1));

        print "<pre>";
        print $command_list;
        print "</pre>";
        exit;*/

        /*print "<pre>";
        //print Db::queries()->create_tables();
        print Db::triggers()->before_add_session();
        print "</pre>";
        exit;*/
        
        //throw new Exception("logout not yet implemented");
        //print Db::queries()->post_product();exit;

        $entity_id = EntityIdGenerator::newId();
        $_REQUEST[app::values()->entity_id()] = $entity_id;
        //=======================
        $query = $this->getQuery();
        $array = $query->
        result()->
        to_array();

        return array(
            app::values()->entity_id()=>$entity_id
        );

    }
    /** @return InsertQueryForApp */
    abstract protected function getQuery();
}

class ResultArrayForPostProduct extends ResultArrayForPostItem{
    protected function getQuery(){
        return Db::queries()->product()->post();
    }
}
class ResultArrayForPostFacility extends ResultArrayForPostItem{
    protected function getQuery(){
        return Db::queries()->facility()->post();
    }
}
class ResultArrayForPostWork extends ResultArrayForPostItem{
    protected function getQuery(){
        return Db::queries()->work()->post();
    }
}

class ResultArrayForPostArticle extends ResultArrayForPostItem{
    protected function getQuery(){
        return Db::queries()->article()->post();
    }}

class ResultArrayForPostEvent extends ResultArrayForPostItem{
    protected function getQuery(){
        return Db::queries()->event()->post();
    }
}

class ResultArrayForPostProfile extends ResultArrayForPostItem{
    protected function getQuery(){
        return Db::queries()->profile()->post();
    }
}
class ResultArrayForPostStatusUpdate extends ResultArrayForPostItem{
    protected function getQuery(){        
        return Db::queries()->status()->post();
    }
}

class ResultArrayForPostPicture extends ResultArrayForPostItem{
    protected function getQuery(){
        $uploaded_app_image = new UploadedApplicationImage();

        return Db::queries()->pictures()->post(
            $uploaded_app_image->picture_file_name(),
            $this->item_type_code(),
            app::argument()->product_type_code(true),
            app::argument()->facility_type_code(true),
            app::argument()->work_type_code(true),
            app::argument()->article_type_code(true),
            app::argument()->profile_type_code(true),
            app::argument()->event_type_code(true),
            app::argument()->status_type_code(true)
        );
    }

    protected function item_type_code()
    {
        return "";
    }
}
class ResultArrayForPostProductPicture extends ResultArrayForPostPicture{
    protected function item_type_code()
    {
        return app::item_type_codes()->product();
    }

}
class ResultArrayForPostFacilityPhoto extends ResultArrayForPostPicture{
    protected function item_type_code()
    {
        return app::item_type_codes()->facility();
    }
}
class ResultArrayForPostWorkPhoto extends ResultArrayForPostPicture{
    protected function item_type_code()
    {
        return app::item_type_codes()->work();
    }
}

class ResultArrayForPostEventPhoto extends ResultArrayForPostPicture{
    protected function item_type_code()
    {
        return app::item_type_codes()->event();
    }
}

class ResultArrayForPostProfilePhoto extends ResultArrayForPostPicture{
    protected function item_type_code()
    {
        return app::item_type_codes()->profile();
    }
}

class ResultArrayForPostArticlePhoto extends ResultArrayForPostPicture{
    protected function item_type_code()
    {
        return app::item_type_codes()->article();
    }
}
class ResultArrayForPostStatusPhoto extends ResultArrayForPostPicture{
    protected function item_type_code()
    {
        return app::item_type_codes()->status_update();
    }
}

class ResultArrayForPostVideo extends ResultArrayForPostPicture{
    protected function getQuery(){
        return Db::queries()->videos()->post();
    }
}