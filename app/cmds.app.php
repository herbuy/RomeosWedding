<?php

abstract class CmdForPostItem extends CmdBaseClass2{
    protected function unpackContent($reader_for_content)
    {
        $result = parent::unpackContent($reader_for_content);
        ui::urls()->adminEditPost($reader_for_content->entity_id())->gotoAddressIfSubmittedForm();
        return $result;
    }
}
class CmdForPostProduct extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_product();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {        
        return app::result_array()->post_product();
    }
}

class CmdForPostFacility extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_facility();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_facility();
    }
}
class CmdForPostWork extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_work();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_work();
    }
}
class CmdForPostArticle extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_article();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_article();
    }
}

class CmdForPostEvent extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_event();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_event();
    }
}

class CmdForPostProfile extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_profile();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_profile();
    }
}

class CmdForPostStatusUpdate extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_status_update();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {        
        return app::result_array()->post_status_update();
    }
}

class CmdForPostPicture extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_picture();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_picture();
    }
}
class CmdForPostProductPicture extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_product_picture();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {        
        return app::result_array()->post_product_picture();
    }
}
class CmdForPostFacilityPhoto extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_facility_photo();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_facility_photo();
    }
}
class CmdForPostWorkPhoto extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_work_photo();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_work_photo();
    }
}

class CmdForPostEventPhoto extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_event_photo();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_event_photo();
    }
}

class CmdForPostProfilePhoto extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_profile_photo();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_profile_photo();
    }
}

class CmdForPostArticlePhoto extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_article_photo();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_article_photo();
    }
}

class CmdForPostStatusPhoto extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_status_photo();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_status_photo();
    }
}

class CmdForPostVideo extends CmdForPostItem{

    protected function procedure_name()
    {
        return app::values()->post_video();
    }
    protected function packMoreRemoteProcedureArguments(){

    }
    public function result_array()
    {
        return app::result_array()->post_video();
    }
}