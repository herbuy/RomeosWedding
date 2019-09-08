<?php

interface IResultArray{
    public function get();
}

class ResultArrayForNotifyEmptyCmd implements IResultArray{
    public function get()
    {
        throw new Exception("specify value for ".app::values()->cmd());
    }
}
class ResultArrayForDoNothing implements IResultArray{
    public function get()
    {
        return ["did nothing"];
    }
}


class ResultArrayForCreateAccount implements IResultArray{
    public function get()
    {

        #=====
        //throw new Exception("account creation not yet supported");

        $full_name = app::argument()->full_name()->getValue();
        $email = app::argument()->email_address()->getValue();
        $password = app::argument()->password()->getValue();

        $array = Db::queries()->create_account($full_name,$email,$password)->
        result()->
        to_array();

        return $array;

    }
}

class ResultArrayForLogin implements IResultArray{
    public function get()
    {       
        $email_address = app::argument()->email_address()->getValue();
        $password = app::argument()->password()->getValue();

        $query = Db::queries()->login($email_address,$password);

        //app::debug()->print_and_exit($query);
        
        $array = $query->
        result()->
        to_array();

        return array(
            app::values()->email_address()=>$email_address
        );

    }
}
class ResultArrayForLogout implements IResultArray{
    public function get()
    {
        //throw new Exception("logout not yet implemented");
        
        $array = Db::queries()->logout()->
        result()->
        to_array();
        return $array;

    }
}
class UploadedApplicationImage{
    private $file_path;    
    private static $paths_of_all_uploaded_picture_files = array();

    private static function picture_folder_path()
    {
        return dirname(__FILE__) . "/pictures_uploaded";
    }

    public function __construct()
    {
        //save the uploaded image
        $uploaded_picture_file_to_save = new UploadedPictureFileToSave(app::values()->file_to_upload());
        $saved_picture_file = $uploaded_picture_file_to_save->saveAsPictureToFolder(self::picture_folder_path());

        //todo: wrap around try catch, and add code to delete all versions of pic [including original] if exception occurs - before re-throwing the exception
        $thumbnail = $saved_picture_file->getThumbnail(600,600);
        $file_path = $thumbnail->renameFileTo(EntityIdGenerator::newId());        
        $this->file_path = $file_path;
        self::$paths_of_all_uploaded_picture_files[] = $this->file_path;
    }

    public static function get_all_file_paths()
    {
        return self::$paths_of_all_uploaded_picture_files;
    }

    public function picture_file_name(){
        return $this->file_path;
    }
    private static function full_file_path($file_name){
        return sprintf("%s/%s",self::picture_folder_path(), $file_name);
    }
    public static function delete_all_images(){
        $deleted_file_paths = array();
        foreach (self::$paths_of_all_uploaded_picture_files as $file_path_on_disk){
            try{

                unlink(self::full_file_path($file_path_on_disk));
                $deleted_file_paths[] = $file_path_on_disk;
            }
            catch(Exception $ex){
                //todo: mark for deleting later - keep attempting to delete each time we connect to the system.
            }            
        }
        //delete the files from the array of uploaded files
        self::$paths_of_all_uploaded_picture_files = array_diff(
            self::$paths_of_all_uploaded_picture_files,$deleted_file_paths
        );        
        
    }

    
}

class ResultArrayForAddImage implements IResultArray{
    public function get()
    {
        //save the uploaded image
        $uploaded_picture_file_to_save = new UploadedPictureFileToSave(app::values()->file_to_upload());        
        $saved_picture_file = $uploaded_picture_file_to_save->saveAsPictureToFolder(dirname(__FILE__)."/pictures_uploaded");

        //todo: wrap around try catch, and add code to delete all versions of pic [including original] if exception occurs - before re-throwing the exception
        $thumbnail = $saved_picture_file->getThumbnail(600,600);        
        $file_path = $thumbnail->renameFileTo(EntityIdGenerator::newId());

        return array(app::values()->file_name() => $file_path);
    }
}


class ResultArrayForAttachImageToPost implements IResultArray{
    public function get()
    {

        $post_file_name = app::argument()->file_name()->getValue();
        
        $results_from_upload_image = (new ResultArrayForAddImage())->get();
        
        $reader = new ReaderForValuesStoredInArray($results_from_upload_image);
        if($reader->file_name()){
            $image_file_name = $reader->file_name();
            
            $this->queryForChangePicture($post_file_name, $image_file_name)->result()->to_array();
            return array(
                app::values()->file_name()=>$post_file_name,
                app::values()->picture_file_name()=>$image_file_name
            );
            
            
        }
        else{
            throw new Exception("file could not be uploaded");
        }
    }

    protected function queryForChangePicture($post_file_name, $image_file_name)
    {
        return Db::queries()->update_post_picture($post_file_name, $image_file_name);
    }
}

class ResultArrayForEditPostPicture extends ResultArrayForAttachImageToPost{
    protected function queryForChangePicture($post_file_name, $image_file_name)
    {
        return Db::queries()->edit_post_picture($post_file_name, $image_file_name);
    }
}

class FileNameGenerator{
    public static function generate($id,$title,$keywords){
        $file_name = sprintf("%s-%s-%s-%s",$id,date("D-d-M-Y"),$title,$keywords);
        $file_name = preg_replace("/\W/i","-",$file_name);
        return $file_name;
    }
}

class ResultArrayForStartNewPost implements IResultArray{
    protected $id, $title,$section_id,$file_name,$keywords,$car_id;

    public function get()
    {        
        $id = EntityIdGenerator::newId();
        $title = app::argument()->title()->getValue();
        $keywords = "";
        $file_name = FileNameGenerator::generate($id,$title,$keywords);
               
        
        $array = Db::queries()->
        start_new_post($file_name, $id, $title, "", "")->
        result()->
        //do_not_commit()->
        to_array();
        
        
        return array(
            app::values()->file_name() => $file_name
        );
    }

    #=========
    //todo: depending on the type of post, we can write a method to return the input for a field [null if not needed]

}

class ResultArrayForCreateMultiplePosts implements IResultArray{
    public function get()
    {
        //new StatusMessage("getting the values submitted under title[]",__CLASS__,__FUNCTION__);
        $title_array = app::argument()->title_array()->getValue();
        //new StatusMessage("getting the values submitted under title[]",__CLASS__,__FUNCTION__);
        $content_array = app::argument()->content_array()->getValue();
        $extended_post_content_array = app::argument()->extended_post_content_array()->getValue();
        $section_id_array = app::argument()->section_id_array()->getValue();

        $query = Db::queries()->create_multiple_posts($title_array,$content_array,$extended_post_content_array,$section_id_array);

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();
        return array(
            
        );
    }
}

class ResultArrayForEditPostTitle implements IResultArray{
    public function get()
    {
        $title = app::argument()->title()->getValue();
        $file_name = app::argument()->file_name()->getValue();
        
        $array = Db::queries()->edit_post_title($file_name,$title)->
        result()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
        
    }
}

class ResultArrayForEditPostContent implements IResultArray{
    public function get()
    {
        $content = app::argument()->content()->getValue();
        $file_name = app::argument()->file_name()->getValue();

        $array = Db::queries()->edit_post_content($file_name,$content)->
        result()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );

    }
}

class ResultArrayForEditExtendedPostContent implements IResultArray{
    public function get()
    {
        $content = app::argument()->extended_post_content()->getValue();
        $file_name = app::argument()->file_name()->getValue();

        $array = Db::queries()->edit_extended_post_content($file_name,$content)->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );

    }
}


class ResultArrayForEditProductType implements IResultArray{
    public function get()
    {
        $product_type_code = app::argument()->product_type_code()->getValue();
        $file_name = app::argument()->file_name()->getValue();
        
        $array = Db::queries()->edit_product_type($file_name,$product_type_code)->
        result()->
        to_array();
        return array(
            app::values()->file_name() => $file_name
        );

    }
}
class ResultArrayForEditFacilityType implements IResultArray{
    public function get()
    {
        $product_type_code = app::argument()->facility_type_code()->getValue();
        $file_name = app::argument()->file_name()->getValue();

        $array = Db::queries()->edit_facility_type($file_name,$product_type_code)->
        result()->
        to_array();
        return array(
            app::values()->file_name() => $file_name
        );

    }
}

class ResultArrayForEditWorkType implements IResultArray{
    public function get()
    {
        $product_type_code = app::argument()->work_type_code()->getValue();
        $file_name = app::argument()->file_name()->getValue();

        $array = Db::queries()->edit_work_type($file_name,$product_type_code)->
        result()->
        to_array();
        return array(
            app::values()->file_name() => $file_name
        );

    }
}

class ResultArrayForEditEventType implements IResultArray{
    public function get()
    {
        $product_type_code = app::argument()->event_type_code()->getValue();
        $file_name = app::argument()->file_name()->getValue();

        $array = Db::queries()->edit_event_type($file_name,$product_type_code)->
        result()->
        to_array();
        return array(
            app::values()->file_name() => $file_name
        );

    }
}

class ResultArrayForEditProfileType implements IResultArray{
    public function get()
    {
        $product_type_code = app::argument()->profile_type_code()->getValue();
        $file_name = app::argument()->file_name()->getValue();

        $array = Db::queries()->edit_profile_type($file_name,$product_type_code)->
        result()->
        to_array();
        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForEditArticleType implements IResultArray{
    public function get()
    {
        $product_type_code = app::argument()->article_type_code()->getValue();
        $file_name = app::argument()->file_name()->getValue();

        $array = Db::queries()->edit_article_type($file_name,$product_type_code)->
        result()->
        to_array();
        return array(
            app::values()->file_name() => $file_name
        );

    }
}

class ResultArrayForEditPostVideo implements IResultArray{
    public function get()
    {  
        $file_name = app::argument()->file_name()->getValue();
        $youtube_video_id = app::argument()->youtube_video_id()->getValue();

        $array = Db::queries()->edit_post_video($file_name,$youtube_video_id)->
        result()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );

    }
}


class ResultArrayForDeletePost implements IResultArray{
    public function get()
    {

        $file_name = app::argument()->file_name()->getValue();        
        $commit = true;
        
        $result = Db::queries()->delete_post($file_name)->result();
        if(!$commit){
            $result->do_not_commit();
        }
        $result_sets = $result->to_array();

        if(
            is_array($result_sets)
            && count($result_sets) > 0
            && is_array($result_sets[0])
            && count($result_sets[0]) > 0
            && $commit
        ){
            $post_info = $result_sets[0][0];
            $picture_file_name = array_key_exists(app::values()->picture_file_name(),$post_info) ? $post_info[app::values()->picture_file_name()] : "";
            
            if($picture_file_name){                
                app::uploaded_pictures()->delete($picture_file_name);
            }            
        }

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForPublishPost implements IResultArray{
    public function get()
    {

        $file_name = app::argument()->file_name()->getValue();
        $query = Db::queries()->publish_post($file_name);

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForUnPublishPost implements IResultArray{
    public function get()
    {

        $file_name = app::argument()->file_name()->getValue();
        $query = Db::queries()->unpublish_post($file_name);

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

abstract class ResultArrayForPerformActionOnSelectedPosts implements IResultArray{
    public function get()
    {

        $csv_file_name = app::argument()->csv_file_names()->getValue();
        $arr_file_names = explode(",",$csv_file_name);

        //print json_encode(count($arr_file_names));exit;

        $query = new SQLCommandListForMotokaviews();
        foreach ($arr_file_names as $file_name){
            $query->add_item_or_list($this->get_item_query($file_name));
        }
        

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $csv_file_name
        );
    }

    abstract protected function get_item_query($file_name);
}


class ResultArrayForUnPublishSelectedPosts extends ResultArrayForPerformActionOnSelectedPosts{
    protected function get_item_query($file_name)
    {
        return Db::queries()->unpublish_post(trim($file_name));
    }
}

class ResultArrayForPublishSelectedPosts extends ResultArrayForPerformActionOnSelectedPosts{
    protected function get_item_query($file_name)
    {
        return Db::queries()->publish_post(trim($file_name));
    }
}

class ResultArrayForLikeThePost implements IResultArray{
    public function get()
    {

        $file_name = app::argument()->file_name()->getValue();
        $query = Db::queries()->likes()->add($file_name);

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForRegisterViewForThePost implements IResultArray{
    public function get()
    {

        $file_name = app::argument()->file_name()->getValue();

        /*$query = new SQLCommandListForMotokaviews();

        $query->add_item_or_list(Db::queries()->views()->add($file_name));
        $query->add_item_or_list(Db::queries()->update_item_score($file_name));

        print $query;exit;

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();*/

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForPostComment implements IResultArray{
    public function get()
    {
        $file_name = app::argument()->file_name()->getValue();

        $query = Db::queries()->comments()->post(
            app::argument()->file_name()->getValue(),
            app::argument()->content()->getValue(),
            app::argument()->full_name()->getValue(),
            app::argument()->email_address()->getValue()
        );

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}
//TODO: TEST THE API CALLS FOR rate item, add photo credit, set selling price, and set rental price
class ResultArrayForRateItem implements IResultArray{
    public function get()
    {
        $file_name = app::argument()->file_name()->getValue();

        $query = Db::queries()->item_ratings()->add(
            app::argument()->file_name()->getValue(),
            app::argument()->item_rating()->getValue()
        );

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForAddPhotoCredits implements IResultArray{
    public function get()
    {
        $file_name = app::argument()->file_name()->getValue();

        $query = Db::queries()->photo_credits()->add(
            app::argument()->file_name()->getValue(),
            app::argument()->work_type_code()->getValue(),
            app::argument()->full_name()->getValue(),
            app::argument()->email_address()->getValue(),
            app::argument()->mobile_number()->getValue(),
            app::argument()->url()->getValue()
        );

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForSetItemSellingPrice implements IResultArray{
    public function get()
    {
        $file_name = app::argument()->file_name()->getValue();

        $query = Db::queries()->item_selling_price()->set(
            app::argument()->file_name()->getValue(),
            app::argument()->selling_price()->getValue(),
            app::argument()->currency_code()->getValue()
        );

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForSetItemRentalPrice implements IResultArray{
    public function get()
    {
        $file_name = app::argument()->file_name()->getValue();

        $query = Db::queries()->item_rental_price()->set(
            app::argument()->file_name()->getValue(),
            app::argument()->rental_price()->getValue(),
            app::argument()->currency_code()->getValue()
        );

        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->file_name() => $file_name
        );
    }
}

class ResultArrayForApproveComment implements IResultArray{
    public function get()
    {
        $entity_id = app::argument()->entity_id()->getValue();
        $query = Db::queries()->comments()->approve($entity_id);
        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->entity_id() => $entity_id
        );
    }
}
class ResultArrayForMoveCommentToTrash implements IResultArray{
    public function get()
    {
        $entity_id = app::argument()->entity_id()->getValue();
        $query = Db::queries()->comments()->moveToTrash($entity_id);
        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->entity_id() => $entity_id
        );
    }
}

class ResultArrayForMoveCommentToSpam implements IResultArray{
    public function get()
    {
        $entity_id = app::argument()->entity_id()->getValue();
        $query = Db::queries()->comments()->moveToSpam($entity_id);
        $array = $query->
        result()->
        //do_not_commit()->
        to_array();

        return array(
            app::values()->entity_id() => $entity_id
        );
    }
}

class ResultArrayForPublishAllPosts implements IResultArray{
    public function get()
    {
        //print "working";exit;
        throw new Exception("Temporarily disabled");

        $array = Db::queries()->publish_all_posts()->
        result()->
        do_not_commit()->
        to_array();

        return array(            
        );
    }
}

class ResultArrayForGetDataPage implements IResultArray{

    public function get()
    {


        /*print "<pre>";
        print htmlspecialchars(
            Db::queries()->create_tables()
        );
        print "</pre>";
        exit;*/

        $function_names = app::argument()->function_names();

        $array_of_values = $function_names->getValueAsArray();
        $count = count($array_of_values);

        //create a list where to add the queries
        $query_list = new SQLCommandList();
        //$query_list->add_item_or_list(BackgroundQueries::instance());

        //add the queries
        for($i = 0;$i < $count;$i++){ //todo: put a limit to the number of items that cab be passed and the max length of each and overall max length
            $query = DataPageQuery::from_function_name($array_of_values[$i]);
            if($query){
                $query_list->add($query);
            }
        }

        //run the query list        
        $result = Db::results()->multi_query($query_list);
        //$array_of_results = $result->children_starting_at(BackgroundQueries::instance()->count());
        $array_of_results = $result->to_array();
        //print json_encode($array_of_results);exit;
        app::debug()->log("fetching data page");        
        app::debug()->log(json_encode($array_of_results));
        return $array_of_results;
    }

}
