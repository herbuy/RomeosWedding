<?php

class EntityIdFromFileName{
    public static function get($file_name =null){
        if(!$file_name){
            $file_name = app::argument()->file_name()->getValue();
        }
        $length = strlen($file_name);
        //return substr($file_name,$length - 19,19);
        $last_position_of_hyphen = strrpos($file_name,"-");
        $last_position_of_hyphen = $last_position_of_hyphen === false ? -1 : $last_position_of_hyphen;
        $entity_id = substr($file_name, $last_position_of_hyphen+1);
        return $entity_id;
    }
}

class SelectQueryForApplication extends SQLSelectExpression{
    public function result(){
        return Db::results()->single_query($this);
    }
}
abstract class UpdateQueryForApp extends SQLUpdateQuery{
    public function result(){
        return Db::results()->single_query($this);
    }
}
abstract class DeleteQueryForApp extends SQLDeleteQuery{
    public function result(){
        return Db::results()->single_query($this);
    }
}

class SQLCommandListForMotokaviews extends SQLCommandList{
    public function result(){
        return Db::results()->multi_query($this);
    }
}

#==========================
class SQLCommandListForEditPostTitle extends SQLCommandListForMotokaviews{
    public function __construct($file_name,$title)
    {
        parent::__construct();

        //add query for update post title

        //todo: temporarily disabled
        $this->add(new QueryForEditPostTitle($file_name,$title));
        $this->add(new QueryForEditPostFileName(
            $file_name,
            Db::computed_values()->new_file_name(
                $title,
                Db::computed_values()->conditional_sub_type_code(),
                Db::fields()->item_type_code(),
                EntityIdFromFileName::get($file_name)
            ))
        );
        //print $this;exit;
        //add query to remove title suffixes for this post
        $this->add(new QueryForDeletePostTitleSuffixes($file_name));
        $this->add_item_or_list((new SearchTaskForAddPostTitleSuffixes($title))->get_command_list($file_name,0.5,1.0));

    }
}


class SQLCommandListForEditPostContent extends SQLCommandListForMotokaviews{
    public function __construct($file_name, $text)
    {
        parent::__construct();

        $this->add(new QueryForEditPostContent($file_name,$text));
        $this->add(new QueryForDeletePostContentSuffixes($file_name));
        $this->add_item_or_list((new SearchTaskForAddPostContentSuffixes($text))->get_command_list($file_name,0.005,0.05));

    }
}

class SQLCommandListForDeletePost extends SQLCommandListForMotokaviews{
    public function __construct($file_name)
    {
        parent::__construct();

        //todo: we first return the picture file name so we can delete the corresonding picture from the file system or CDN        
        $this->add((new QueryForGetDraftPost($file_name))->clearSelection()->select(Db::fields()->picture_file_name()) );
        $this->add(new QueryForDeleteDraftPost($file_name));
        $this->add(new QueryForDeletePostSuffixes($file_name));
    }
}



class QueryForCreateAccount extends InsertQueryForApp{
    //todo: all apps need queries for creating an account
    public function __construct($full_name,$email,$password)
    {
        //todo: car and section must exist
        parent::__construct();

        $this->insert_into(app::values()->users())->
        use_set_format()->
        set(Db::fields()->full_name()->toStringValue($full_name))->
        set(Db::fields()->email_address()->toStringValue($email))->
        set(Db::fields()->password_hash()->toStringValue($password))->
        set(Db::fields()->entity_id()->toSQLValue(SQLEntityIdGenerator::newId()))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())
        ;
    }

}

class InsertQueryForApp extends SQLInsertQuery{
    public function __construct()
    {
        parent::__construct();
        $this->use_set_format();
    }

    public function result(){
        return Db::results()->single_query($this);
    }
}
class InsertFromSelectForApp extends SQLCommandForInsertFromSelect{
    public function result(){
        return Db::results()->single_query($this);
    }
}

class QueryForLogin extends InsertFromSelectForApp{
    //todo: all apps need queries for loging in users
    public function __construct($email,$password)
    {

        $email = ConvertToSQLValue::ifNotSQLValue($email);
        $password = ConvertToSQLValue::ifNotSQLValue($password);


        //=================================================
        $query = new SQLSelectExpression();
        
        $query
            ->from(app::values()->users())
            ->where(
                Db::fields()->email_address()->isEqualTo($email)
                ->and_(Db::fields()->password_hash()->isEqualTo($password))
            )
            ->select_field(app::values()->entity_id())
            ->select(Db::computed_values()->current_timestamp())
            ->select_field(app::values()->user_type_code())
            ->select_field(app::values()->full_name())
            ->select($email)
            ->select($password)
            ->select(SecureSession::getIdAfterSha1())
        ;

        parent::__construct($query,app::values()->sessions());
        
        $this->
        
        field(app::values()->entity_id())->
        field(app::values()->timestamp())->
        field(app::values()->user_type_code())->
        field(app::values()->full_name())->
        field(app::values()->email_address())->
        field(app::values()->password_hash())->
        field(app::values()->session_id());

        $this->on_duplicate_key_replace();
        
    }
    
}


class QueryForLogout extends DeleteQueryForApp{
    //todo: all apps need queries for loging-out users
    public function __construct()
    {
        $this->
        delete_from(app::values()->sessions())->
        where(Db::fields()->session_id()->isEqualToString(SecureSession::getIdAfterSha1()))
        ;
    }

    public function result(){
        return Db::results()->single_query($this);
    }

}
class QueryForCurrentUser extends SelectQueryForApplication{
    //todo: all apps need queries for obtaining info about the currently logged in user. The info can be used, for instance, to indicate on the interface, who is logged in
    
    public function __construct()
    {
        parent::__construct();

        $this->from(app::values()->sessions())->
        where(Db::fields()->session_id()->isEqualToString(SecureSession::getIdAfterSha1()))->
        select(Db::fields()->email_address())->limit(0,1)
        ;
    }
}

class QueryForGetUsers extends SelectQueryForApplication{

    public function __construct()
    {
        parent::__construct();

        $this->from(app::values()->users())
            ->select(Db::fields()->entity_id())
            ->select(Db::fields()->full_name())
        ;
    }
}
class QueryForGetUser extends QueryForGetUsers{
    private $file_name;

    public function __construct($file_name)
    {
        $this->file_name = $file_name;
        parent::__construct();
        $this->where(Db::fields()->entity_id()->isEqualTo(EntityIdFromFileName::get($this->file_name)));
    }
}
class QueryForGetUsersExcept extends QueryForGetUsers{
    private $file_name;

    public function __construct($file_name)
    {
        $this->file_name = $file_name;
        parent::__construct();
        $this->where(Db::fields()->entity_id()->isNotEqualTo(EntityIdFromFileName::get($this->file_name)));
    }
}


#================================================

class QueryForDeleteDraftPost extends DeleteQueryForApp{
    //todo: all apps need queries for retiring posts e.g. if author changes his mind
    public function __construct($file_name)
    {
        $file_name = ConvertToSQLValue::ifNotSQLValue($file_name);
        
        $this->delete_from(app::values()->draft_posts())->
        where(Db::fields()->file_name()->isEqualTo($file_name)->and_(Db::tests()->author_id_is_me()));
    }
}

abstract class QueryForMovePost extends SQLCommandListForMotokaviews{
    //todo: all apps need a way to re-organize posts, or move a post to another section e.g. if user made mistake
    protected $file_name;

    public function __construct($file_name)
    {
        parent::__construct();
        $this->file_name = $file_name;

        $this->update_its_timestamp_to_current();
        $this->recalculate_the_date_fields();
        $this->add_post_to_destination_table();
        $this->remove_post_from_source_table();
    }

    private function update_its_timestamp_to_current()
    {
        $this->add(
            (new SQLUpdateQuery())->
            update($this->source_table())->
            where($this->SQLTest())->
            set(Db::fields()->timestamp()->toCurrentTimestamp())
        );
    }

    private function recalculate_the_date_fields()
    {
        $this->add(
            new QueryForUpdateDateInformationForTableRecord($this->source_table(),$this->SQLTest())
        );
    }

    private function add_post_to_destination_table()
    {
        $this->add(
            (new SQLSelectExpression())->
            from($this->source_table())->
            where($this->SQLTest())->

            select(new SQLNull())->
            select(Db::fields()->entity_id())->

            select(Db::fields()->author_id())->
            select(Db::fields()->item_type_code())->
            select(Db::fields()->product_type_code())->
            select(Db::fields()->facility_type_code())->
            select(Db::fields()->work_type_code())->
            select(Db::fields()->event_type_code())->
            select(Db::fields()->profile_type_code())->
            select(Db::fields()->article_type_code())->
            select(Db::fields()->status_type_code())->
            select(Db::fields()->article_dept_code())->


            select(Db::fields()->timestamp())->
            select(Db::fields()->file_name())->
            select(Db::fields()->title())->
            select(Db::fields()->content())->
            select(Db::fields()->picture_file_name())->
            select(Db::fields()->extended_post_content())->
            select(Db::fields()->youtube_video_id())->
            
            select(Db::fields()->keywords())->
            select(Db::fields()->can_be_published())->
            select(Db::fields()->can_be_viewed_by_search_engines())->
            select(Db::fields()->can_be_rated())->
            select(Db::fields()->access_type())->
                
            select(Db::fields()->date_in_full())->
            select(Db::fields()->year_number())->
            select(Db::fields()->month_number())->
            select(Db::fields()->month_name())->
            select(Db::fields()->month_description())->

            select(Db::fields()->week_of_the_year_number())->
            select(Db::fields()->week_of_the_year_description())->

            select(Db::fields()->day_name())->
            select(Db::fields()->day_of_the_week_number())->
            select(Db::fields()->day_of_the_month_number())->
            select(Db::fields()->day_of_the_year_number())->
            select(Db::fields()->day_of_the_year_description())->
            select(Db::fields()->approval_status_code())->

            select(Db::fields()->total_score())->
            select(Db::fields()->description())->
            select(Db::fields()->total_sources())->

            select(Db::fields()->total_phone_contacts())->
            select(Db::fields()->total_mail_contacts())->
            select(Db::fields()->total_web_contacts())->

            select(Db::fields()->total_headings())->
            select(Db::fields()->total_bullets())->
            select(Db::fields()->total_paragraphs())->

            select(Db::fields()->total_images())->
            select(Db::fields()->total_words())->
            select(Db::fields()->total_outbound_links())->

            select(Db::fields()->total_visits())->
            select(Db::fields()->total_saves())->
            

            into($this->destination_table())->on_duplicate_key_ignore()
        );
    }    

    private function remove_post_from_source_table()
    {        
        $this->addNewDeleteQuery()->
        delete_from($this->source_table())->
        where($this->SQLTest());
    }

    protected function SQLTest()
    {
        return Db::fields()->entity_id()->
        isEqualToInt(EntityIdFromFileName::get($this->file_name))->and_(Db::tests()->author_id_is_me());
    }

    abstract protected function source_table();
    abstract protected function destination_table();
}

class QueryForPublishPost extends QueryForMovePost{
    //todo: all applications need a query for publishing a post - done by simply moving it to the public posts table
    protected function source_table()
    {
        return app::values()->draft_posts();
    }

    protected function destination_table()
    {
        return app::values()->posts();
    }
}

class QueryForUnPublishPost extends QueryForMovePost{
    //todo: all applications need a way to recall a post e.g. in order to make amendments, the way car manufacturers recall cars to make amendments in case there was a mistake during manufacture
    //todo: any such recalled posts should indicate that the post has been recalled by the author
    protected function source_table()
    {
        return app::values()->posts();
    }

    protected function destination_table()
    {
        return app::values()->draft_posts();
    }
}

class QueryForPublishAllPosts extends QueryForPublishPost{
    //todo: as part of streamlined repetition, there should be a query for publish all, unpublish all
    public function __construct()
    {
        parent::__construct("");
    }
    protected function SQLTest()
    {
        return (new SQLInt(1))->isEqualToInt(1);
    }
}

abstract class QueryForEditPostField extends UpdateQueryForApp{
    //todo: all apps must allow author to change his mind about the title for his post, etc
    public function __construct($file_name, $new_value)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name));
        $new_value = ConvertToSQLValue::ifNotSQLValue($new_value);
        
        $this->update(app::values()->draft_posts())->
        where(Db::fields()->entity_id()->isEqualTo($entity_id)->and_(Db::fields()->author_id()->isCurrentUser()))->
        set($this->fieldToUpdate()->toSQLValue($new_value));
        //todo:after update title, goof to update file name
    }
    /** @return SQLIdentifier */
    abstract protected function fieldToUpdate();
}

class QueryForUpdatePostPicture extends QueryForEditPostField{
    protected function fieldToUpdate(){
        return Db::fields()->picture_file_name();
    }
}
class QueryForEditPostPicture extends QueryForEditPostField{
    protected function fieldToUpdate(){
        return Db::fields()->picture_file_name();
    }
}

class QueryForEditPostTitle extends QueryForEditPostField{
    
    protected function fieldToUpdate(){
        return Db::fields()->title();
    }
}
class QueryForEditPostFileName extends QueryForEditPostField{

    protected function fieldToUpdate(){
        return Db::fields()->file_name();
    }
}

class QueryForDeletePostSuffixes extends DeleteQueryForApp{
    public function __construct($file_name)
    {        
        $this->
        delete_from(app::values()->post_search_index())->
        where(
            Db::fields()->post_id()->isEqualTo(EntityIdFromFileName::get($file_name))
        );
    }
}

abstract class QueryForDeletePostSectionSuffixes extends DeleteQueryForApp{
    public function __construct($file_name,$stem_location)
    {
        $post_id = EntityIdFromFileName::get($file_name);
        $this->
        delete_from(app::values()->post_search_index())->
        where(
            Db::fields()->post_id()->isEqualTo($post_id)->
            and_(Db::fields()->stem_location()->isEqualToString($stem_location))
        );
    }
}
class QueryForDeletePostTitleSuffixes extends QueryForDeletePostSectionSuffixes{
    public function __construct($file_name)
    {
        parent::__construct($file_name,app::stem_locations()->title());
    }
}
class QueryForDeletePostContentSuffixes extends QueryForDeletePostSectionSuffixes{
    public function __construct($file_name)
    {
        parent::__construct($file_name,app::stem_locations()->content());
    }
}

abstract class QueryForAddPostSectionSuffixes extends InsertQueryForApp{
    public function __construct($file_name,$stem,$location,$count,$doc_freq,$min_weight,$max_weight,$suffix,$suffix_weight)
    {
        parent::__construct();

        $post_id = EntityIdFromFileName::get($file_name);
        $this->insert_into(app::values()->post_search_index())
            ->set(Db::fields()->timestamp()->toCurrentTimestamp())
            ->set(Db::fields()->stem()->toStringValue($stem))
            ->set(Db::fields()->stem_location()->toStringValue($location))
            ->set(Db::fields()->stem_count()->toInt($count))
            ->set(Db::fields()->stem_doc_frequency()->toInt($doc_freq))
            ->set(Db::fields()->location_min_weight()->toInt($min_weight))
            ->set(Db::fields()->location_max_weight()->toInt($max_weight))
            ->set(Db::fields()->stem_suffix()->toStringValue($suffix))
            ->set(Db::fields()->stem_suffix_weight()->toInt($suffix_weight))
            ->set(Db::fields()->post_id()->toInt($post_id))

        ;

    }
}
class QueryForAddPostTitleSuffixes extends QueryForAddPostSectionSuffixes{
    public function __construct($file_name,$stem,$count,$doc_freq,$min_weight,$max_weight,$suffix,$suffix_weight){
        parent::__construct($file_name,$stem,app::stem_locations()->title(),$count,$doc_freq,$min_weight,$max_weight,$suffix,$suffix_weight);
    }
}
class QueryForAddPostContentSuffixes extends QueryForAddPostSectionSuffixes{
    public function __construct($file_name,$stem,$count,$doc_freq,$min_weight,$max_weight,$suffix,$suffix_weight){
        parent::__construct($file_name,$stem,app::stem_locations()->content(),$count,$doc_freq,$min_weight,$max_weight,$suffix,$suffix_weight);
    }
}

class QueryForEditProductType extends QueryForEditPostField{

    protected function fieldToUpdate(){
        return Db::fields()->product_type_code();
    }
}
class QueryForEditFacilityType extends QueryForEditPostField{

    protected function fieldToUpdate(){
        return Db::fields()->facility_type_code();
    }

}

class QueryForEditWorkType extends QueryForEditPostField{

    protected function fieldToUpdate(){
        return Db::fields()->work_type_code();
    }

}

class QueryForEditEventType extends QueryForEditPostField{

    protected function fieldToUpdate(){
        return Db::fields()->event_type_code();
    }

}

class QueryForEditProfileType extends QueryForEditPostField{

    protected function fieldToUpdate(){
        return Db::fields()->profile_type_code();
    }

}

class QueryForEditArticleType extends QueryForEditPostField{

    protected function fieldToUpdate(){
        return Db::fields()->article_type_code();
    }

}

class QueryForEditPostVideo extends QueryForEditPostField{    
    protected function fieldToUpdate(){
        return Db::fields()->youtube_video_id();
    }
}

class QueryForEditPostContent extends QueryForEditPostField{    
    protected function fieldToUpdate(){
        return Db::fields()->content();
    }
}
abstract class BaseClassForQueryForGetPosts extends SelectQueryForApplication implements IDecoratableGetPostsQuery{
    //todo: all apps use this query as template for building queries to return posts. You decide the table and fields
    protected $sql_test;
    protected function getAdditionalSQLTest()
    {
        return $this->sql_test;
    }
    
    private function baseSQLTest(){
        return Db::fields()->entity_id()->isNotNull();
    }

    public function getSelectQuery()
    {
        return $this;
    }

    public function __construct()
    {
        parent::__construct();
        $this->from($this->getTableName());
        //$this->order_by(Db::fields()->timestamp()->descending());
        $this->order_by(Db::fields()->total_score()->descending());
        $this->select_everything();
        //$this->selectFields();
        new DecoratorForGetPostsQuery($this);
        
        //build test
        $test = $this->baseSQLTest();

        //add search test
        $search_query = app::argument()->optional_search_query()->getValue();


        if($search_query){
            $test = $test->and_(Db::fields()->title()->isLikeString($search_query));
        }
        //add additional test
        $additional_test = $this->getAdditionalSQLTest();
        if($additional_test){
            $test = $test->and_($additional_test);
        }
        //set test
        $this->where($test);

        //set the maximum
        $this->limit($this->query_start_index(),$this->query_max_number());
    }
    private function query_start_index(){
        return app::argument()->optional_start_index()->getValue();
    }
    private function query_max_number(){
        return app::argument()->optional_max_number()->getValue();
    }

    abstract public function getTableName();

    /*protected function selectFields()
    {
        $this->select_everything();
        $this->select_views();
        $this->select_likes();
        $this->select_comments();
        $this->select_author_name();
    }

    private function select_views()
    {
        $this->select(
            Db::computed_values()->total_views_on_post(
                Db::fields()->file_name()->inTable($this->getTableName())
            )->as_(app::values()->views())
        );
    }
    private function select_likes()
    {
        $this->select(
            Db::computed_values()->total_likes_on_post(
                Db::fields()->file_name()->inTable($this->getTableName())
            )->as_(app::values()->likes())
        );
    }
    private function select_comments()
    {
        $this->select(
            Db::computed_values()->total_comments_on_post(
                Db::fields()->file_name()->inTable($this->getTableName())
            )->as_(app::values()->comments())
        );
    }
    private function select_author_name()
    {
        $this->select(
            Db::computed_values()->full_name_for_id(
                Db::fields()->author_id()->inTable($this->getTableName())
            )->as_(app::values()->author_name())
        );
    }*/



}

class QueryForGetPosts extends BaseClassForQueryForGetPosts{
    //todo: all apps use this query to return published posts
    public function getTableName()
    {
        return app::values()->posts();
    }

}

class QueryForGetPostsPostedByCurrentUser extends QueryForGetPosts{
    protected function getAdditionalSQLTest()
    {
        return Db::fields()->author_id()->isEqualTo(Db::computed_values()->current_user_id_before_validating());
    }
}

class QueryForGetPostsPostedByUser extends QueryForGetPosts{
    private $file_name;

    public function __construct($file_name)
    {
        $this->file_name = $file_name;
        parent::__construct();
    }

    protected function getAdditionalSQLTest()
    {
        return Db::fields()->author_id()->isEqualTo(EntityIdFromFileName::get($this->file_name));
    }
}

class QueryForGetFileContent extends QueryForGetPosts{
    protected function selectFields()
    {
        $this->select(Db::fields()->file_name());
    }
}

class QueryForGetExtendedPostContent extends SelectQueryForApplication{
    //todo: all apps use this query to return extended content for a given post. Useful for editing purposes - on page for edit post content coz we need to show the author what they had previously typed in
    public function __construct($file_name)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue( EntityIdFromFileName::get($file_name) );
        $this->from(app::values()->draft_posts())->
        where(Db::fields()->entity_id()->isEqualTo($entity_id))->
        select(Db::fields()->extended_post_content())->
        limit(0,1);
    }
}

class QueryForGetExtendedPostTokens extends SelectQueryForApplication{
    //todo: all apps use this query to return the tokens [parts] of the extended content. Useful, for instance, to display the rich text on the post details page.

    public function __construct($file_name)
    {
        parent::__construct();        

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));
        
        $this->from(app::values()->extended_post_content())->
        where(Db::fields()->entity_id()->isEqualTo($entity_id))->
        select_everything();
    }
}

class QueryForRateItem extends InsertQueryForApp{
    //todo: all apps use this query to return the tokens [parts] of the extended content. Useful, for instance, to display the rich text on the post details page.

    public function __construct($file_name,$rating)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));

        $this->insert_into(app::values()->item_ratings())->
        set(Db::fields()->item_entity_id()->toSQLValue($entity_id))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->session_id_hash()->toStringValue(SecureSession::getIdAfterSha1()))->
        set(Db::fields()->file_name()->toStringValue($file_name))->
        set(Db::fields()->rating()->toStringValue($rating))
        ;
    }
}

class QueryForAddPhotoCredits extends InsertQueryForApp{
    //todo: all apps use this query to return the tokens [parts] of the extended content. Useful, for instance, to display the rich text on the post details page.

    public function __construct($file_name,$work_type_code,$full_name,$email_addr,$mobile_number,$url)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));

        $this->insert_into(app::values()->photo_credits())->
        set(Db::fields()->item_entity_id()->toSQLValue($entity_id))->
        set(Db::fields()->work_type_code()->toStringValue($work_type_code))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->full_name()->toStringValue($full_name))->
        set(Db::fields()->email_address()->toStringValue($email_addr))->
        set(Db::fields()->mobile_number()->toStringValue($mobile_number))->
        set(Db::fields()->url()->toStringValue($url))->
        set(Db::fields()->file_name()->toStringValue($file_name))
        ;
    }
}
class QueryForGetPhotoCreditsForPost extends SelectQueryForApplication{
    public function __construct($file_name)
    {
        parent::__construct();
        $entity_id = EntityIdFromFileName::get($file_name);
        $this->from(app::values()->photo_credits())->where(Db::fields()->item_entity_id()->isEqualTo($entity_id));
    }
}

class QueryForSetItemSellingPrice extends InsertQueryForApp{
    //todo: all apps use this query to return the tokens [parts] of the extended content. Useful, for instance, to display the rich text on the post details page.

    public function __construct($file_name,$price,$currency_code)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));

        $this->insert_into(app::values()->item_selling_prices())->
        set(Db::fields()->selling_price()->toInt($price))->
        set(Db::fields()->selling_price_units()->toStringValue($currency_code))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->item_entity_id()->toSQLValue($entity_id))->
        set(Db::fields()->file_name()->toStringValue($file_name))
        ;
    }
}
class QueryForSetItemRentalPrice extends InsertQueryForApp{
    //todo: all apps use this query to return the tokens [parts] of the extended content. Useful, for instance, to display the rich text on the post details page.

    public function __construct($file_name,$price,$currency_code)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));

        $this->insert_into(app::values()->item_selling_prices())->
        set(Db::fields()->rental_price()->toInt($price))->
        set(Db::fields()->rental_price_units()->toStringValue($currency_code))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->item_entity_id()->toSQLValue($entity_id))->
        set(Db::fields()->file_name()->toStringValue($file_name))
        ;
    }
}


//==========================

class QueryForGetPost extends QueryForGetPosts{
    //todo: all apps use this query to return information about a given post e.g for display on the post details page
    public function __construct($file_name)
    {
        //print $file_name;exit;

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));
        $this->sql_test = Db::fields()->entity_id()->isEqualTo($entity_id);        
        parent::__construct();
        $this->limit(0,1);
    }    
}

class QueryForGetDraftPosts extends BaseClassForQueryForGetPosts{
    //todo: all apps use this query to return draft posts e.g. for purposes of approving
    public function getTableName()
    {
        return app::values()->draft_posts();
    }
}

class QueryForGetDraftPost extends QueryForGetDraftPosts{

    //todo: all apps use this query to return info about a draft post
    public function __construct($file_name)
    {        
        $entity_id = EntityIdFromFileName::get($file_name);
        $entity_id = ConvertToSQLValue::ifNotSQLValue($entity_id);
        $this->sql_test = Db::fields()->entity_id()->isEqualTo($entity_id);
        parent::__construct();
        $this->limit(0,1);
    }
}

class QueryForGetMostRecentPost extends QueryForGetPosts{
    public function __construct()
    {
        parent::__construct();
        $this->limit(0,1);
    }
}

class QueryForAddPost extends InsertQueryForApp{
    //todo: this query seems obsolete
    public function __construct($file_name, $entity_id, $title, $content)
    {        
        parent::__construct();

        $this->insert_into(app::values()->posts())->
        use_set_format()->
        set(Db::fields()->file_name()->toStringValue($file_name))->
        set(Db::fields()->entity_id()->toStringValue($entity_id))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->title()->toStringValue($title))->
        set(Db::fields()->content()->toStringValue($content))
        ;
    }

}

class QueryForStartNewPost extends InsertQueryForApp{
    //todo: all apps use this query to create a new post, before it can be edited to add more info
    public function __construct($file_name, $entity_id, $title,$content="No content in this post",$extended_post_content='')
    {
        //todo: car and section must exist
        parent::__construct();

        $this->insert_into(app::values()->draft_posts())->
        use_set_format()->
        set(Db::fields()->file_name()->toStringValue($file_name))->
        set(Db::fields()->entity_id()->toStringValue($entity_id))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->title()->toStringValue($title))->
        set(Db::fields()->content()->toStringValue($content))->
        set(Db::fields()->extended_post_content()->toStringValue($extended_post_content))
        ;

        //compute date values
        $this->addDateInformation();
    }
    
    private function addDateInformation()
    {
        $date_in_full = date("Y-m-d");
        $this
            ->set(Db::fields()->date_in_full()->toStringValue(
                $date_in_full)
            )
            ->set(Db::fields()->year_number()->toSQLValue(
                SQLFunction::year($date_in_full)
            ))
            ->set(Db::fields()->month_number()->toSQLValue(
                SQLFunction::month($date_in_full)
            ))
            ->set(Db::fields()->month_name()->toSQLValue(
                SQLFunction::month_name($date_in_full)
            ))
            ->set(Db::fields()->month_description()->toSQLValue(
            //Db::fields()->car_id()->append(Db::fields()->alt())
                SQLFunction::month_name($date_in_full)->append(
                    " "
                )->
                append(
                    SQLFunction::year($date_in_full)
                )
            ))
            ->set(Db::fields()->week_of_the_year_number()->toSQLValue(
                SQLFunction::week_of_year($date_in_full)
            ))
            ->set(Db::fields()->week_of_the_year_description()->toSQLValue(
                SQLFunction::week_of_year_description($date_in_full)
            ))
            ->set(Db::fields()->day_name()->toSQLValue(
                SQLFunction::day_name($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_week_number()->toSQLValue(
                SQLFunction::day_of_week($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_month_number()->toSQLValue(
                SQLFunction::day($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_year_number()->toSQLValue(
                SQLFunction::day_of_year($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_year_description()->toSQLValue(
                SQLFunction::day_of_year_description($date_in_full)
            ));
    }
}

class QueryForPostComment extends InsertQueryForApp{
    //todo: all apps use this query to return the tokens [parts] of the extended content. Useful, for instance, to display the rich text on the post details page.

    public function __construct($file_name,$content,$full_name,$email)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));

        $this->insert_into(app::values()->comments())->
        set(Db::fields()->entity_id()->toSQLValue(EntityIdFromFileName::get($file_name)))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->session_id_hash()->toStringValue(SecureSession::getIdAfterSha1()))->
        set(Db::fields()->full_name()->toStringValue($full_name))->
        set(Db::fields()->email_address()->toStringValue($email))->
        set(Db::fields()->file_name()->toStringValue($file_name))->
        set(Db::fields()->content()->toStringValue($content))

        ;
    }
}
class QueryForGetCommentForPost extends SelectQueryForApplication{
    //todo: all apps use this query to return the tokens [parts] of the extended content. Useful, for instance, to display the rich text on the post details page.

    public function __construct($file_name)
    {
        parent::__construct();

        $entity_id = ConvertToSQLValue::ifNotSQLValue(EntityIdFromFileName::get($file_name.""));

        $this->from(app::values()->comments())->
        where(Db::fields()->entity_id()->isEqualTo($entity_id))->
        select_everything();
    }
}
abstract class QueryForUpdateCommentApprovalStatus extends UpdateQueryForApp{
    public function __construct($entity_id)
    {
        parent::__construct();
        $this->
        update(app::values()->comments())->
        where(Db::fields()->entity_id()->isEqualTo($entity_id))->
        set(Db::fields()->approval_status_code()->toStringValue($this->new_approval_status()));
    }

    abstract protected function new_approval_status();
}
class QueryForApproveComment extends QueryForUpdateCommentApprovalStatus{
    protected function new_approval_status()
    {
        return app::approval_status_codes()->approved();
    }
}

class QueryForMoveCommentToTrash extends QueryForUpdateCommentApprovalStatus{
    protected function new_approval_status()
    {
        return app::approval_status_codes()->trashed();
    }
}

class QueryForMoveCommentToSpam extends QueryForUpdateCommentApprovalStatus{
    protected function new_approval_status()
    {
        return app::approval_status_codes()->spam();
    }
}

class QueryForLikeThePost extends InsertQueryForApp{
    public function __construct($file_name)
    {
        parent::__construct();
        $hash_code = sha1(
            ConvertToSQLValue::ifNotSQLValue(SecureSession::getIdAfterSha1())->
            append("-")->
            append(EntityIdFromFileName::get($file_name))
        );

        $this->insert_into(app::values()->likes())->
        set(Db::fields()->hash_code()->toSQLValue($hash_code))->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->file_name()->toSQLValue($file_name))->
        set(Db::fields()->session_id_hash()->toSQLValue(SecureSession::getIdAfterSha1()))
        ;
    }
}
class QueryForRegisterViewForThePost extends InsertQueryForApp{
    public function __construct($file_name)
    {
        
        //===================
        parent::__construct();
        $this->insert_into(app::values()->views())->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->file_name()->toSQLValue($file_name))->
        set(Db::fields()->session_id_hash()->toSQLValue(SecureSession::getIdAfterSha1()))
        ;
    }
}
class QueryForPagesWithMostViews extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->posts());
        $this->limit(0,6);
    }
}
class QueryForPagesWithMostLikes extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->posts());
        $this->limit(0,6);
    }
}
class QueryForPagesWithMostComments extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->posts());
        $this->limit(0,6);
    }
}
class QueryForOldestPages extends SelectQueryForApplication{
    public function __construct()
    {
        //useful for retiring content
        parent::__construct();
        $this->from(app::values()->posts());
        $this->limit(0,6);
    }
}

class QueryForMostRecentPages extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->posts());
        $this->limit(0,6);
    }
}

class SQLAlterTablesWithPosts extends SQLCommandList{
    //todo: this appears obsolete, was for one-time use to modify the table
    public function __construct()
    {
        parent::__construct();
        $this->add(
            $this->dateRelatedColumnsForTable(app::values()->draft_posts())
        );
        $this->add(
            $this->dateRelatedColumnsForTable(app::values()->posts())
        );
        $this->add(
            $this->dateRelatedColumnsForTable(app::values()->most_recent_post_per_category())
        );

    }

    private function dateRelatedColumnsForTable($table_name)
    {
        $sql = new SQLAlterTable($table_name);
        $sql
            #------- ADD DATE COLUMNS ---------
            ->add_column(SQLCreate::column(app::values()->date_in_full())->varchar(Db::max_length()->date_in_full())->not_null())
            ->add_column(SQLCreate::column(app::values()->year_number())->int(Db::max_length()->year_number())->not_null()->unsigned())
            ->add_column(SQLCreate::column(app::values()->month_number())->int(Db::max_length()->month_number())->not_null()->unsigned())
            ->add_column(SQLCreate::column(app::values()->month_name())->varchar(Db::max_length()->month_name())->not_null())
            ->add_column(SQLCreate::column(app::values()->month_description())->varchar(Db::max_length()->month_description())->not_null())
            ->add_column(SQLCreate::column(app::values()->week_of_the_year_number())->int(Db::max_length()->week_of_the_year_number())->not_null()->unsigned())
            ->add_column(SQLCreate::column(app::values()->week_of_the_year_description())->varchar(Db::max_length()->week_of_the_year_description())->not_null())
            ->add_column(SQLCreate::column(app::values()->day_name())->varchar(Db::max_length()->day_name())->not_null())
            ->add_column(SQLCreate::column(app::values()->day_of_the_week_number())->int(Db::max_length()->day_of_the_week_number())->not_null()->unsigned())
            ->add_column(SQLCreate::column(app::values()->day_of_the_month_number())->int(Db::max_length()->day_of_the_month_number())->not_null()->unsigned())
            ->add_column(SQLCreate::column(app::values()->day_of_the_year_number())->int(Db::max_length()->day_of_the_year_number())->not_null()->unsigned())
            ->add_column(SQLCreate::column(app::values()->day_of_the_year_description())->varchar(Db::max_length()->day_of_the_year_description())->not_null());

        return $sql;
    }
}
class QueryForUpdateDateInformationForTable extends UpdateQueryForApp{
    public function __construct($table)
    {
        parent::__construct();


        $date_in_full = SQLFunction::from_unixtime(Db::fields()->timestamp());
        
        $this->update($table);

        $this
            ->set(Db::fields()->date_in_full()->toSQLValue(
                $date_in_full)
            )
            ->set(Db::fields()->year_number()->toSQLValue(
                SQLFunction::year($date_in_full)
            ))
            ->set(Db::fields()->month_number()->toSQLValue(
                SQLFunction::month($date_in_full)
            ))
            ->set(Db::fields()->month_name()->toSQLValue(
                SQLFunction::month_name($date_in_full)
            ))
            ->set(Db::fields()->month_description()->toSQLValue(
            //Db::fields()->car_id()->append(Db::fields()->alt())
                SQLFunction::month_name($date_in_full)->append(
                    " "
                )->
                append(
                    SQLFunction::year($date_in_full)
                )
            ))
            ->set(Db::fields()->week_of_the_year_number()->toSQLValue(
                SQLFunction::week_of_year($date_in_full)
            ))
            ->set(Db::fields()->week_of_the_year_description()->toSQLValue(
                SQLFunction::week_of_year_description($date_in_full)
            ))
            ->set(Db::fields()->day_name()->toSQLValue(
                SQLFunction::day_name($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_week_number()->toSQLValue(
                SQLFunction::day_of_week($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_month_number()->toSQLValue(
                SQLFunction::day($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_year_number()->toSQLValue(
                SQLFunction::day_of_year($date_in_full)
            ))
            ->set(Db::fields()->day_of_the_year_description()->toSQLValue(
                SQLFunction::day_of_year_description($date_in_full)
            ));
        
    }
}
class QueryForUpdateDateInformationForTableRecord extends QueryForUpdateDateInformationForTable{
    public function __construct($table, $sql_test)
    {
        SQLBuilderException::throwIfNotSQLTest($sql_test);

        parent::__construct($table);        
        $this->where($sql_test);
    }
}

class QueryForUpdateOldPostsWithDateInformationFromTimestamp extends SQLCommandList{
    public function __construct()
    {
        parent::__construct();

        $this->add( new QueryForUpdateDateInformationForTable(app::values()->draft_posts()) );
        $this->add( new QueryForUpdateDateInformationForTable(app::values()->posts()) );        
    }
}
abstract class QueryForGetStatsPerAttribute extends SelectQueryForApplication{
    //todo: all apps use this query to return total posts grouped by attribute e.g. type_of_posts, type of product etc, author, etc
    //todo: we might also need the cross tab query - where u select the row and column attributes
    public function __construct()
    {
        parent::__construct();

        $this->from(
            //this first query is simply for sorting using descending order of timestamp
            (new SQLSelectExpression())->
            select_everything()->
            from($this->getTableName())->
            order_by($this->order_by_clause())->as_("my_table")
        );
        //$this->where(Db::fields()->timestamp()->isNotNull());
        $this->group_by($this->columnToGroupBy());
        
        $this->select_field($this->columnToGroupBy());
        $this->select(Db::fields()->entity_id()->count()->as_(app::values()->total_posts()));
        $this->do_additional_select();

        
    }

    #can be overridden
    protected function getTableName()
    {
        return app::values()->posts();
    }

    abstract protected function columnToGroupBy();
    protected function do_additional_select(){        
    }

    abstract protected function order_by_clause();
}

class QueryForGetStatsPerYear extends QueryForGetStatsPerAttribute{
    protected function columnToGroupBy()
    {
        return app::values()->year_number();
    }
    protected function order_by_clause()
    {
        return Db::fields()->year_number()->descending();
    }
}
class QueryForGetStatsPerMonth extends QueryForGetStatsPerAttribute{
    protected function columnToGroupBy()
    {
        return app::values()->month_description();
    }
    protected function order_by_clause()
    {
        return Db::fields()->year_number()->descending()->then_by(Db::fields()->month_number()->descending());
    }
}
class QueryForGetStatsPerWeek extends QueryForGetStatsPerAttribute{
    protected function columnToGroupBy()
    {
        return app::values()->week_of_the_year_description();
    }
    protected function order_by_clause()
    {
        return Db::fields()->year_number()->descending()->then_by(Db::fields()->week_of_the_year_number()->descending());
    }
}
class QueryForGetStatsPerDay extends QueryForGetStatsPerAttribute{
    protected function columnToGroupBy()
    {
        return app::values()->day_of_the_year_description();
    }
    protected function order_by_clause()
    {
        return Db::fields()->year_number()->descending()->then_by(Db::fields()->day_of_the_year_number()->descending());
    }
}

class QueryForCreateMultiplePosts extends SQLCommandListForMotokaviews{
    
    public function __construct($title_array,$content_array,$extended_post_content_array,$section_id_array)
    {
        parent::__construct();

        if(
            count($title_array) == count($content_array) &&
            count($content_array) == count($extended_post_content_array)
        ){

            $total_records_submitted = count($title_array);
            for($record_number = 0; $record_number < $total_records_submitted;$record_number++){
                $title = $title_array[$record_number];
                $content = $content_array[$record_number];
                $extended_post_content = $extended_post_content_array[$record_number]; 
                $section_id = $section_id_array[$record_number];
                
                $entity_id = EntityIdGenerator::newId();
                
                $this->add(
                    Db::queries()->start_new_post(
                        FileNameGenerator::generate($entity_id,$title,""),
                        $entity_id,$title,$content,$extended_post_content,$section_id
                    )
                );
            }
        }
        else{
            throw new Exception("mismatch in number of inputs provided for title, introduction and full details");
        }
    }

}

class QueryForCreateTables extends SQLCommandList{
    public function __construct()
    {
        parent::__construct();
        $this->create_the_tables();
        $this->insert_default_data();
    }

    public function result(){
        return Db::results()->multi_query($this);
    }

    private function tableForPosts()
    {
        return $this->baseTableForPosts(app::values()->posts());
    }

    private function tableForDraftPosts()
    {
        $table = $this->baseTableForPosts(app::values()->draft_posts());
        return $table;
    }

    private function insert_default_user($user_id, $user_type_code, $full_name, $email, $password){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->users())->
        set(Db::fields()->timestamp()->toCurrentTimestamp())->
        set(Db::fields()->entity_id()->toInt($user_id))->
        set(Db::fields()->user_type_code()->toStringValue($user_type_code))->
        set(Db::fields()->full_name()->toStringValue($full_name))->
        set(Db::fields()->email_address()->toStringValue($email))->
        set(Db::fields()->password_hash()->toStringValue($password))
        ;
        return $query;
    }

    //todo: all apps need a base table for posts, with some attributes removed/added
    private function baseTableForPosts($table_name)
    {
        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->row_id()))
            ->addColumn(SQLCreate::column(app::values()->row_id())->bigint(Db::max_length()->row_id())->unsigned()->not_null()->auto_increment())
            ->addColumn(SQLCreate::column(app::values()->entity_id())->bigint(Db::max_length()->entity_id())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->author_id())->bigint(Db::max_length()->entity_id())->unsigned()->not_null())
            //string codes to represent the actual item - if type code in: product then.. else if type = article... 
            ->addColumn(SQLCreate::column(app::values()->item_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->product_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->facility_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->work_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->event_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->profile_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->article_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->status_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->article_dept_code())->varchar(Db::max_length()->text_code())->not_null())


            
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->file_name())->varchar(Db::max_length()->file_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->title())->varchar(Db::max_length()->title())->not_null())
            ->addColumn(SQLCreate::column(app::values()->content())->varchar(Db::max_length()->content())->not_null())
            ->addColumn(SQLCreate::column(app::values()->picture_file_name())->varchar(Db::max_length()->file_name())->not_null())
            //todo: some types of posts accept extended content [rich text]
            ->addColumn(SQLCreate::column(app::values()->extended_post_content())->varchar(Db::max_length()->extended_post_content())->not_null())
            //todo: some posts accept a you tube id e.g. posts of work done, a product, etc
            ->addColumn(SQLCreate::column(app::values()->youtube_video_id())->varchar(Db::max_length()->youtube_video_id())->not_null())

            #================ other metadata
            ->addColumn(SQLCreate::column(app::values()->keywords())->varchar(Db::max_length()->file_name())->not_null())

            ->addColumn(SQLCreate::column(app::values()->can_be_published())->tinyint(1)->not_null())
            ->addColumn(SQLCreate::column(app::values()->can_be_viewed_by_search_engines())->tinyint(1)->not_null())
            ->addColumn(SQLCreate::column(app::values()->can_be_rated())->tinyint(1)->not_null())

            ->addColumn(SQLCreate::column(app::values()->access_type())->enum(array(
                app::access_type_codes()->staff_only(),
                app::access_type_codes()->open_access()
            ))->not_null()->default_value(app::access_type_codes()->open_access())
            )
            

            #------- ADD DATE COLUMNS ---------
                //todo: all posts must have date information/attributes such as date in full, year number, month, etc
            ->addColumn(SQLCreate::column(app::values()->date_in_full())->varchar(Db::max_length()->date_in_full())->not_null())
            ->addColumn(SQLCreate::column(app::values()->year_number())->int(Db::max_length()->year_number())->not_null()->unsigned())
            ->addColumn(SQLCreate::column(app::values()->month_number())->int(Db::max_length()->month_number())->not_null()->unsigned())
            ->addColumn(SQLCreate::column(app::values()->month_name())->varchar(Db::max_length()->month_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->month_description())->varchar(Db::max_length()->month_description())->not_null())
            ->addColumn(SQLCreate::column(app::values()->week_of_the_year_number())->int(Db::max_length()->week_of_the_year_number())->not_null()->unsigned())
            ->addColumn(SQLCreate::column(app::values()->week_of_the_year_description())->varchar(Db::max_length()->week_of_the_year_description())->not_null())
            ->addColumn(SQLCreate::column(app::values()->day_name())->varchar(Db::max_length()->day_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->day_of_the_week_number())->int(Db::max_length()->day_of_the_week_number())->not_null()->unsigned())
            ->addColumn(SQLCreate::column(app::values()->day_of_the_month_number())->int(Db::max_length()->day_of_the_month_number())->not_null()->unsigned())
            ->addColumn(SQLCreate::column(app::values()->day_of_the_year_number())->int(Db::max_length()->day_of_the_year_number())->not_null()->unsigned())
            ->addColumn(SQLCreate::column(app::values()->day_of_the_year_description())->varchar(Db::max_length()->day_of_the_year_description())->not_null())

            ;
    }

    private function tableForPostContent()
    {
        //todo: posts that accept extended content [rich text] need a table to track a breakdown of the content
        return SQLCreate::table_if_not_exists(app::values()->extended_post_content())
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->row_id()))
            ->addColumn(SQLCreate::column(app::values()->row_id())->bigint(Db::max_length()->row_id())->unsigned()->not_null()->auto_increment())
            ->addColumn(SQLCreate::column(app::values()->entity_id())->bigint(Db::max_length()->entity_id())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->content())->varchar(Db::max_length()->content())->not_null())
            ->addColumn(SQLCreate::column(app::values()->content_type())->varchar(Db::max_length()->content_type())->not_null())
            ->addColumn(SQLCreate::column(app::values()->src())->varchar(Db::max_length()->src())->not_null())
            ->addColumn(SQLCreate::column(app::values()->alt())->varchar(Db::max_length()->alt())->not_null())
            ->addColumn(SQLCreate::column(app::values()->href())->varchar(Db::max_length()->href())->not_null())
            ->addColumn(SQLCreate::column(app::values()->width())->varchar(Db::max_length()->width_in_tbl_for_extended_content())->not_null())
            ->addColumn(SQLCreate::column(app::values()->height())->varchar(Db::max_length()->height_in_tbl_for_extended_content())->not_null())
            ->addColumn(SQLCreate::column(app::values()->rating())->varchar(Db::max_length()->content())->not_null())
            ->addColumn(SQLCreate::column(app::values()->title())->varchar(Db::max_length()->title())->not_null())
            ;
    }

    private function tableForUsers()
    {
        //todo: all apps need a user table
        return $this->baseTableForUsers(app::values()->users())->
        add_unique_key(app::values()->email_address());
    }

    private function tableForSessions()
    {
        //todo: all apps need a sessions table - to track users who are logged in
        return $this->baseTableForUsers(app::values()->sessions())->
        addColumn(SQLCreate::column(app::values()->session_id())->varchar(Db::max_length()->session_id())->not_null())->
        add_unique_key(app::values()->session_id());
    }


    private function baseTableForUsers($table_name)
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->row_id()))
            ->addColumn(SQLCreate::column(app::values()->row_id())->bigint(Db::max_length()->row_id())->unsigned()->not_null()->auto_increment())
            ->addColumn(SQLCreate::column(app::values()->entity_id())->bigint(Db::max_length()->entity_id())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->user_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->full_name())->varchar(Db::max_length()->full_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->email_address())->varchar(Db::max_length()->email_address())->not_null())
            ->addColumn(SQLCreate::column(app::values()->password_hash())->varchar(Db::max_length()->password_hash())->not_null());
    }

    private function baseTableForComments($table_name)
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->row_id()))
            ->addColumn(SQLCreate::column(app::values()->row_id())->bigint(Db::max_length()->row_id())->unsigned()->not_null()->auto_increment())
            ->addColumn(SQLCreate::column(app::values()->entity_id())->bigint(Db::max_length()->entity_id())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->session_id_hash())->varchar(Db::max_length()->session_id_hash())->not_null())
            ->addColumn(SQLCreate::column(app::values()->full_name())->varchar(Db::max_length()->full_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->email_address())->varchar(Db::max_length()->email_address())->not_null())
            ->addColumn(SQLCreate::column(app::values()->file_name())->varchar(Db::max_length()->file_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->content())->varchar(Db::max_length()->comment())->not_null())
            ->addColumn(SQLCreate::column(app::values()->approval_status_code())->varchar(Db::max_length()->text_code())->not_null()->default_value(app::approval_status_codes()->pending_approval()))
            ;
    }

    private function baseTableForItemRatings($table_name)
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->row_id()))
            ->add_unique_key(app::values()->session_id_hash())
            
            ->addColumn(SQLCreate::column(app::values()->row_id())->bigint(Db::max_length()->row_id())->unsigned()->not_null()->auto_increment())
            ->addColumn(SQLCreate::column(app::values()->item_entity_id())->bigint(Db::max_length()->entity_id())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->session_id_hash())->varchar(Db::max_length()->session_id_hash())->not_null())
            //->addColumn(SQLCreate::column(app::values()->full_name())->varchar(Db::max_length()->full_name())->not_null())
            //->addColumn(SQLCreate::column(app::values()->email_address())->varchar(Db::max_length()->email_address())->not_null())
            ->addColumn(SQLCreate::column(app::values()->file_name())->varchar(Db::max_length()->file_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->rating())->enum(array('poor','below_average','average','above_average','excellent'))->not_null())

            ;
    }

    private function photoCredits()
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists(app::values()->photo_credits())
            ->add_primary_key(SQLCreate::primary_key()->
            addColumn(app::values()->item_entity_id())->
            addColumn(app::values()->work_type_code())
            )
            ->addColumn(SQLCreate::column(app::values()->item_entity_id())->bigint(Db::max_length()->entity_id())->unsigned()->not_null())
            ->addColumn(SQLCreate::column(app::values()->work_type_code())->varchar(Db::max_length()->text_code())->not_null())
            
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())            
            ->addColumn(SQLCreate::column(app::values()->full_name())->varchar(Db::max_length()->full_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->email_address())->varchar(Db::max_length()->email_address())->not_null())
            ->addColumn(SQLCreate::column(app::values()->mobile_number())->int(Db::max_length()->mobile_number())->not_null())
            ->addColumn(SQLCreate::column(app::values()->url())->varchar(Db::max_length()->url())->not_null())
            ->addColumn(SQLCreate::column(app::values()->file_name())->varchar(Db::max_length()->file_name())->not_null())
            
            ;
    }

    private function tableForAccessTypes()
    {
        return SQLCreate::table_if_not_exists(app::values()->access_types())
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->access_type_code()))
            ->addColumn(SQLCreate::column(app::values()->access_type_code())->char(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->access_type())->varchar(Db::max_length()->type_description())->not_null())
            ;
    }

    private function insert_default_access_type($access_type_code, $access_type){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->access_types())->
        set(Db::fields()->access_type_code()->toStringValue($access_type_code))->
        set(Db::fields()->access_type()->toStringValue($access_type))
        ;
        return $query;
    }

    private function tableFoCurrencyCodes()
    {
        return SQLCreate::table_if_not_exists(app::values()->currencies())
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->currency_code()))
            ->addColumn(SQLCreate::column(app::values()->currency_code())->char(Db::max_length()->currency_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->currency_description())->varchar(Db::max_length()->currency_description())->not_null())
            ;
    }

    private function insert_default_currency($currency_code, $currency_description){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->currencies())->
        set(Db::fields()->currency_code()->toStringValue($currency_code))->
        set(Db::fields()->currency_description()->toStringValue($currency_description))
        ;
        return $query;
    }

    private function baseTableForPricesAndCharges($table_name,$amount_field_name,$currency_code_field_name)
    {
        return SQLCreate::table_if_not_exists($table_name)
            //->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->row_id()))
            //->addColumn(SQLCreate::column(app::values()->row_id())->bigint(Db::max_length()->entity_id())->not_null()->auto_increment())
            ->addColumn(SQLCreate::column($amount_field_name)->float()->not_null())
            ->addColumn(SQLCreate::column($currency_code_field_name)->char(Db::max_length()->currency_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ;
    }
    private function baseTableForItemPricesAndCharges($table_name,$amount_field_name,$currency_code_field_name){
        return $this->baseTableForPricesAndCharges($table_name,$amount_field_name,$currency_code_field_name)->
        addColumn(SQLCreate::column(app::values()->item_entity_id())->bigint(Db::max_length()->entity_id())->not_null())->
        addColumn(SQLCreate::column(app::values()->file_name())->varchar(Db::max_length()->file_name())->not_null())->
        add_primary_key(app::values()->item_entity_id());
    }

    private function baseTableForLikes($table_name)
    {

        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->hash_code()))
            ->addColumn(SQLCreate::column(app::values()->hash_code())->varchar(Db::max_length()->session_id_hash())->not_null())
            ->addColumn(SQLCreate::column(app::values()->file_name())->varchar(Db::max_length()->file_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->session_id_hash())->varchar(Db::max_length()->session_id_hash())->not_null())
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ;
    }

    private function baseTableForViews($table_name)
    {
        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->row_id()))
            ->addColumn(SQLCreate::column(app::values()->row_id())->bigint(Db::max_length()->entity_id())->not_null()->auto_increment())
            ->addColumn(SQLCreate::column(app::values()->file_name())->varchar(Db::max_length()->file_name())->not_null())
            ->addColumn(SQLCreate::column(app::values()->session_id_hash())->varchar(Db::max_length()->session_id_hash())->not_null())
            ->addColumn(SQLCreate::column(app::values()->timestamp())->int(Db::max_length()->timestamp())->unsigned()->not_null())
            ;
    }

    private function tableForDepartments()
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists(app::values()->departments())
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->department_code()))
            ->addColumn(SQLCreate::column(app::values()->department_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->department_description())->varchar(Db::max_length()->type_description()));
    }
    private function insert_default_department($dept_code, $dept_description){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->departments())->
        set(Db::fields()->department_code()->toStringValue($dept_code))->
        set(Db::fields()->department_description()->toStringValue($dept_description))
        ;
        return $query;
    }

    private function baseTableForStatusCodes($table_name, $code_field_name, $status_text)
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->$code_field_name()))
            ->addColumn(SQLCreate::column($code_field_name)->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column($status_text)->varchar(Db::max_length()->type_description())->not_null())
            ;
    }

    private function baseTableForItemTypes0($table_name,$code_field_name,$singular_field_name,$plural_field_name)
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists($table_name)
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->$code_field_name()))
            ->addColumn(SQLCreate::column($code_field_name)->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column($singular_field_name)->varchar(Db::max_length()->type_description())->not_null())
            ->addColumn(SQLCreate::column($plural_field_name)->varchar(Db::max_length()->type_description())->not_null())
            ->addColumn(SQLCreate::column(app::values()->about())->varchar(Db::max_length()->about())->not_null())
            ;
    }

    private function baseTableForItemTypes($table_name,$code_field_name,$singular_field_name,$plural_field_name,$about='')
    {
        return $this->baseTableForItemTypes0($table_name,$code_field_name,$singular_field_name,$plural_field_name)->addColumn(
            SQLCreate::column(app::values()->department_code())->varchar(Db::max_length()->text_code())->not_null()
        );
    }

    private function table_for_status_types()
    {
        //todo: all users tables have a common structure
        return SQLCreate::table_if_not_exists(app::values()->status_types())
            ->add_primary_key(SQLCreate::primary_key()->addColumn(app::values()->status_type_code()))
            ->addColumn(SQLCreate::column(app::values()->status_type_code())->varchar(Db::max_length()->text_code())->not_null())
            ->addColumn(SQLCreate::column(app::values()->status_type())->varchar(Db::max_length()->type_description())->not_null())
            ->addColumn(SQLCreate::column(app::values()->about())->varchar(Db::max_length()->about())->not_null())
            ;
    }

    private function insert_default_item_type($type_code, $type_singular, $type_plural){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->item_types())->
        set(Db::fields()->item_type_code()->toStringValue($type_code))->
        set(Db::fields()->item_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->item_type_as_plural()->toStringValue($type_plural))
        ;
        return $query;
    }

    //product type
    private function insert_default_product_type($type_code, $type_singular, $type_plural,$dept_code){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->product_types())->
        set(Db::fields()->product_type_code()->toStringValue($type_code))->
        set(Db::fields()->product_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->product_type_as_plural()->toStringValue($type_plural))->
        set(Db::fields()->department_code()->toStringValue($dept_code))
        ;
        return $query;
    }
    private function insert_default_facility_type($type_code, $type_singular, $type_plural,$dept_code){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->facility_types())->
        set(Db::fields()->facility_type_code()->toStringValue($type_code))->
        set(Db::fields()->facility_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->facility_type_as_plural()->toStringValue($type_plural))->
        set(Db::fields()->department_code()->toStringValue($dept_code))
        ;
        return $query;
    }
    private function insert_default_work_type($type_code, $type_singular, $type_plural,$dept_code){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->work_types())->
        set(Db::fields()->work_type_code()->toStringValue($type_code))->
        set(Db::fields()->work_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->work_type_as_plural()->toStringValue($type_plural))->
        set(Db::fields()->department_code()->toStringValue($dept_code))
        ;
        return $query;
    }
    private function insert_default_event_type($type_code, $type_singular, $type_plural,$dept_code,$about=''){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->event_types())->
        set(Db::fields()->event_type_code()->toStringValue($type_code))->
        set(Db::fields()->event_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->event_type_as_plural()->toStringValue($type_plural))->
        set(Db::fields()->department_code()->toStringValue($dept_code))->
        set(Db::fields()->about()->toStringValue($about))
        ;
        return $query;
    }

    private function insert_default_profile_type($type_code, $type_singular, $type_plural,$dept_code){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->profile_types())->
        set(Db::fields()->profile_type_code()->toStringValue($type_code))->
        set(Db::fields()->profile_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->profile_type_as_plural()->toStringValue($type_plural))->
        set(Db::fields()->department_code()->toStringValue($dept_code))
        ;
        return $query;
    }
    private function insert_default_article_type($type_code, $type_singular, $type_plural){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->article_types())->
        set(Db::fields()->article_type_code()->toStringValue($type_code))->
        set(Db::fields()->article_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->article_type_as_plural()->toStringValue($type_plural))
        ;
        return $query;
    }

    private function insert_default_status_type($type_code, $type,$about){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->status_types())->
        set(Db::fields()->status_type_code()->toStringValue($type_code))->
        set(Db::fields()->status_type()->toStringValue($type))->
        set(Db::fields()->about()->toStringValue($about))
        ;
        return $query;
    }

    private function insert_default_user_type($type_code, $type_singular, $type_plural){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->user_types())->
        set(Db::fields()->user_type_code()->toStringValue($type_code))->
        set(Db::fields()->user_type_as_single()->toStringValue($type_singular))->
        set(Db::fields()->user_type_as_plural()->toStringValue($type_plural))
        ;
        return $query;
    }

    private function insert_approval_status_code($status_code, $status_text){
        $query = new InsertQueryForApp();
        $query->use_set_format();

        $query->insert_into(app::values()->approval_status_codes())->
        set(Db::fields()->approval_status_code()->toStringValue($status_code))->
        set(Db::fields()->approval_status_text()->toStringValue($status_text))
        ;
        return $query;
    }

    private function horizontalLine($text)
    {
        return new SQLSingleLineCommentCommand("==================$text =============================================");
    }

    private function insert_default_data()
    {
        $this->add($this->horizontalLine("ok, lets add some data"));
        $this->insert_user_types();
        $this->insert_users();
        $this->insert_departments();
        $this->insert_page_types();
        $this->insert_product_types();
        $this->insert_work_types();
        $this->insert_facility_types();
        $this->insert_profile_types();
        $this->insert_article_types();
        $this->insert_event_types();
        $this->insert_status_types();

        $this->insert_approval_status_codes();
        $this->insert_default_currencies();
    }

    private function sessions()
    {
        $this->add($this->horizontalLine("SESSIONS"));
        $this->add($this->tableForSessions());
    }

    private function drafts()
    {
        $this->add($this->horizontalLine("DRAFT POSTS"));
        $this->add($this->tableForDraftPosts());
    }

    private function published()
    {
        $this->add($this->horizontalLine("PUBLISHED POSTS"));
        $this->add($this->tableForPosts());
    }

    private function extended_post_content()
    {
        $this->add($this->horizontalLine("EXTENDED POST CONTENT"));
        $this->add($this->tableForPostContent());
    }

    private function comments()
    {
        $this->add($this->horizontalLine("COMMENTS"));
        $this->add($this->baseTableForComments(app::values()->comments()));
    }

    private function likes()
    {
        $this->add($this->horizontalLine("LIKES"));
        $this->add($this->baseTableForLikes(app::values()->likes()));
    }

    private function views()
    {
        $this->add($this->horizontalLine("VIEWS"));
        $this->add($this->baseTableForViews(app::values()->views()));
    }

    private function users()
    {
        $this->add($this->horizontalLine("USERS"));
        $this->add($this->tableForUsers());
    }

    private function approval_status_codes()
    {
        $this->add($this->horizontalLine("APPROVAL STATUS CODES"));
        $this->add(
            $this->baseTableForStatusCodes(
                app::values()->approval_status_codes(),
                app::values()->approval_status_code(),
                app::values()->approval_status_text()
            )
        );
    }

    private function article_types()
    {
        $this->add($this->horizontalLine("ARTICLE TYPES"));
        $this->add(
            $this->baseTableForItemTypes0(
                app::values()->article_types(), app::values()->article_type_code(),
                app::values()->article_type_as_single(), app::values()->article_type_as_plural()
            )
        );
    }

    private function profile_types()
    {
        $this->add($this->horizontalLine("PROFILE TYPES"));
        $this->add(
            $this->baseTableForItemTypes(
                app::values()->profile_types(), app::values()->profile_type_code(),
                app::values()->profile_type_as_single(), app::values()->profile_type_as_plural()
            )
        );
    }

    private function event_types()
    {
        $this->add($this->horizontalLine("EVENT TYPES"));
        $this->add(
            $this->baseTableForItemTypes(
                app::values()->event_types(), app::values()->event_type_code(),
                app::values()->event_type_as_single(), app::values()->event_type_as_plural()
            )
        );
    }

    private function facility_types()
    {
        $this->add($this->horizontalLine("FACILITY TYPES"));
        $this->add(
            $this->baseTableForItemTypes(
                app::values()->facility_types(), app::values()->facility_type_code(),
                app::values()->facility_type_as_single(), app::values()->facility_type_as_plural()
            )
        );
    }

    private function work_types()
    {
        $this->add($this->horizontalLine("WORK TYPES"));
        $this->add(
            $this->baseTableForItemTypes(
                app::values()->work_types(), app::values()->work_type_code(),
                app::values()->work_type_as_single(), app::values()->work_type_as_plural()
            )
        );
    }

    private function product_types()
    {
        $this->add($this->horizontalLine("PRODUCT TYPES"));
        $this->add(
            $this->baseTableForItemTypes(
                app::values()->product_types(), app::values()->product_type_code(),
                app::values()->product_type_as_single(), app::values()->product_type_as_plural()
            )
        );
    }

    private function item_types()
    {
        $this->add($this->horizontalLine("ITEM TYPES"));
        $this->add(
            $this->baseTableForItemTypes0(
                app::values()->item_types(), app::values()->item_type_code(),
                app::values()->item_type_as_single(), app::values()->item_type_as_plural()
            )
        );
    }

    private function status_types()
    {
        $this->add($this->horizontalLine("STATUS TYPES"));
        $this->add($this->table_for_status_types());
    }

    private function departments()
    {
        $this->add($this->horizontalLine("DEPARTMENTS"));
        $this->add($this->tableForDepartments());
    }

    private function user_types()
    {
        $this->add($this->horizontalLine("USER TYPES"));
        $this->add(
            $this->baseTableForItemTypes(
                app::values()->user_types(), app::values()->user_type_code(),
                app::values()->user_type_as_single(), app::values()->user_type_as_plural()
            )
        );
    }

    private function create_the_tables()
    {
        $this->reference_tables();
        $this->transaction_tables();
    }

    private function insert_user_types()
    {
        $this->add($this->horizontalLine("INSERT DEFAULT USER TYPES"));
        $this->add($this->insert_default_user_type(app::user_type_codes()->admin(), "Administrator", "Administrators"));
        $this->add($this->insert_default_user_type(app::user_type_codes()->author(), "Author", "Authors"));
        $this->add($this->insert_default_user_type(app::user_type_codes()->editor(), "Editor", "Editors"));
        $this->add($this->insert_default_user_type(app::user_type_codes()->contributor(), "Contributer", "Contributers"));
        $this->add($this->insert_default_user_type(app::user_type_codes()->susbcriber(), "Subscriber", "Subscribers"));
        $this->add($this->insert_default_user_type(app::user_type_codes()->other(), "Others", "Others"));
    }

    private function insert_departments()
    {
        $this->add($this->horizontalLine("INSERT DEFAULT DEPARTMENTS"));
        $this->add($this->insert_default_department(app::dept_type_codes()->cake_and_decoration(), "Cake and Decoration"));
        $this->add($this->insert_default_department(app::dept_type_codes()->food_and_drinks(), "Food and Drinks"));
        $this->add($this->insert_default_department(app::dept_type_codes()->gifts_and_cards(), "Gifts and Cards"));
        $this->add($this->insert_default_department(app::dept_type_codes()->gowns_and_womens_wear(), "Gowns and Women's wear"));
        $this->add($this->insert_default_department(app::dept_type_codes()->marriage_and_honey_moon(), "Marriage and Honeymoon"));
        $this->add($this->insert_default_department(app::dept_type_codes()->massage_and_spa(), "Massage and Spa"));
        $this->add($this->insert_default_department(app::dept_type_codes()->music_and_entertainment(), "Music and Entertainment"));
        $this->add($this->insert_default_department(app::dept_type_codes()->photography_and_videography(), "Photography and Videography"));
        $this->add($this->insert_default_department(app::dept_type_codes()->rings_and_jewelry(), "Rings and Jewelry"));
        $this->add($this->insert_default_department(app::dept_type_codes()->salon_hair_and_makeup(), "Salon, Hair and Make Up"));
        $this->add($this->insert_default_department(app::dept_type_codes()->suits_and_mens_wear(), "Suits and Men's wear"));
        $this->add($this->insert_default_department(app::dept_type_codes()->tents_chairs_and_tables(), "Tents, Chairs and Tables"));
        $this->add($this->insert_default_department(app::dept_type_codes()->event_planning(), "Event Planning"));
        $this->add($this->insert_default_department(app::dept_type_codes()->venues_reception_and_meetings(), "Venues, Reception and Meetings"));
        $this->add($this->insert_default_department(app::dept_type_codes()->other(), "Other"));
    }

    private function insert_users()
    {
        $this->add($this->horizontalLine("INSERT DEFAULT USER"));
        $this->add($this->insert_default_user(EntityIdGenerator::newId(), app::user_type_codes()->admin(), "Admin", "romeo@gmail.com", sha1("654321")));
    }

    private function insert_page_types()
    {
        $this->add($this->horizontalLine("INSERT TYPES OF POSTS"));
        $this->add($this->insert_default_item_type(app::item_type_codes()->product(), "Product", "Products"));
        $this->add($this->insert_default_item_type(app::item_type_codes()->work(), "Past Work", "Past Work"));
        $this->add($this->insert_default_item_type(app::item_type_codes()->facility(), "Facility", "Facilities"));
        $this->add($this->insert_default_item_type(app::item_type_codes()->event(), "Event", "Events"));
        $this->add($this->insert_default_item_type(app::item_type_codes()->profile(), "Profile", "Profiles"));
        $this->add($this->insert_default_item_type(app::item_type_codes()->article(), "Article", "Articles"));
        $this->add($this->insert_default_item_type(app::item_type_codes()->status_update(), "Status Update", "Status Updates"));
    }

    private function insert_product_types()
    {
//todo: attach each product to a department, same for facility, etc. Need to adjust tables to add column for dept_code
        $this->add($this->horizontalLine("INSERT PRODUCT TYPES"));
        $this->add($this->insert_default_product_type(app::product_type_codes()->other(), "Other", "Other", app::dept_type_codes()->other()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->chairs(), "Chairs", "Chairs", app::dept_type_codes()->tents_chairs_and_tables()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->engagement_rings(), "Engagement Rings", "Engagement Rings", app::dept_type_codes()->rings_and_jewelry()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->hand_bags(), "Hand Bags", "Hand Bags", app::dept_type_codes()->gowns_and_womens_wear()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->invitation_cards(), "Invitation Cards", "Invitation Cards", app::dept_type_codes()->gifts_and_cards()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->jewelry(), "Jewelry", "Jewelry", app::dept_type_codes()->rings_and_jewelry()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->mens_shoes(), "Men's Shoes", "Men's Shoes", app::dept_type_codes()->suits_and_mens_wear()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->mens_suits(), "Men's Suits", "Men's Suits", app::dept_type_codes()->suits_and_mens_wear()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->pa_systems(), "P.A Systems", "P.A Systems", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->platforms(), "Platforms", "Platforms", app::dept_type_codes()->tents_chairs_and_tables()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->pledge_cards(), "Pledge Cards", "Pledge Cards", app::dept_type_codes()->gifts_and_cards()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->shirts(), "Shirts", "Shirts", app::dept_type_codes()->suits_and_mens_wear()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->tables(), "Tables", "Tables", app::dept_type_codes()->tents_chairs_and_tables()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->tents(), "Tents", "Tents", app::dept_type_codes()->tents_chairs_and_tables()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->undergarments(), "Undergarments", "Undergarments", app::dept_type_codes()->gowns_and_womens_wear()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->wedding_gowns(), "Wedding Gowns", "Wedding Gowns", app::dept_type_codes()->gowns_and_womens_wear()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->wedding_rings(), "Wedding Rings", "Wedding Rings", app::dept_type_codes()->rings_and_jewelry()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->womens_shoes(), "Womens Shoes", "Womens Shoes", app::dept_type_codes()->gowns_and_womens_wear()));
        $this->add($this->insert_default_product_type(app::product_type_codes()->dresses(), "Dresses", "Dresses", app::dept_type_codes()->gowns_and_womens_wear()));
    }

    private function insert_work_types()
    {
        $this->add($this->horizontalLine("INSERT WORK TYPES"));
        $this->add($this->insert_default_work_type(app::work_type_codes()->other(), "Other", "Other", app::dept_type_codes()->other()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->comedy(), "Comedy", "Comedy", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->dj(), "DJ", "DJ", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->dance(), "Dance", "Dance", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->decoration(), "Decoration", "Decoration", app::dept_type_codes()->cake_and_decoration()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->live_band(), "Live Band", "Live Band", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->mc(), "MC", "MC", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->make_up(), "Make Up", "Make Up", app::dept_type_codes()->salon_hair_and_makeup()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->music(), "Music", "Music", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->photography(), "Photography", "Photography", app::dept_type_codes()->photography_and_videography()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->event_planning(), "Event Planning", "Event Planning", app::dept_type_codes()->event_planning()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->videography(), "Videography", "Videography", app::dept_type_codes()->photography_and_videography()));
        $this->add($this->insert_default_work_type(app::work_type_codes()->cake(), "Cake", "Cake", app::dept_type_codes()->cake_and_decoration()));
    }

    private function insert_facility_types()
    {
        $this->add($this->horizontalLine("INSERT FACILITY TYPES"));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->other(), "Other", "Other", app::dept_type_codes()->other()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->gift_shops(), "Gift Shops", "Gift Shops", app::dept_type_codes()->gifts_and_cards()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->honeymoon_destinations(), "Honeymoon Destinations", "Honeymoon Destinations", app::dept_type_codes()->marriage_and_honey_moon()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->introduction_venues(), "Introduction Venues", "Introduction Venues", app::dept_type_codes()->venues_reception_and_meetings()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->make_up_studios(), "Make Up Studios", "Make Up Studios", app::dept_type_codes()->salon_hair_and_makeup()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->massage_parlors(), "Massage Parlors", "Massage Parlors", app::dept_type_codes()->massage_and_spa()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->indoor_meeting_venues(), "Indoor Meeting Venues", "Indoor Meeting Venues", app::dept_type_codes()->venues_reception_and_meetings()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->outdoor_meeting_venues(), "Outdoor Meeting Venues", "Outdoor Meeting Venues", app::dept_type_codes()->venues_reception_and_meetings()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->indoor_reception_venues(), "Indoor Reception Venues", "Indoor Reception Venues", app::dept_type_codes()->venues_reception_and_meetings()));
        $this->add($this->insert_default_facility_type(app::facility_type_codes()->outdoor_reception_venues(), "Outdoor Reception Venues", "Outdoor Reception Venues", app::dept_type_codes()->venues_reception_and_meetings()));
    }

    private function insert_profile_types()
    {
        $this->add($this->horizontalLine("INSERT PROFILE TYPES"));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->other(), "Other", "Others", app::dept_type_codes()->other()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->comedian(), "Comedian", "Comedians", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->dj(), "DJ", "DJ", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->dance_group(), "Dance Group", "Dance Groups", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->decorator(), "Decorator", "Decorators", app::dept_type_codes()->cake_and_decoration()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->hair_stylist(), "Hair Stylist", "Hair Stylists", app::dept_type_codes()->salon_hair_and_makeup()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->live_band(), "Live Band", "Live Band", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->mc(), "MC", "MCs", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->make_up_artist(), "Make Up Artist", "Make Up Artists", app::dept_type_codes()->salon_hair_and_makeup()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->music_artist(), "Music Artist", "Music Artists", app::dept_type_codes()->music_and_entertainment()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->photographer(), "Photographer", "Photographers", app::dept_type_codes()->photography_and_videography()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->event_planner(), "Event Planner", "Event Planners", app::dept_type_codes()->event_planning()));
        $this->add($this->insert_default_profile_type(app::profile_type_codes()->videographer(), "Videographer", "Videographers", app::dept_type_codes()->photography_and_videography()));
    }

    private function insert_article_types()
    {
        $this->add($this->horizontalLine("INSERT ARTICLE TYPES"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->other(), "Other", "Other"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->wedding_stories(), "Wedding Journey", "Wedding Journey"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->how_to(), "How To", "How To"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->check_list(), "Check List", "Check List"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->questions_and_debates(), "Just Asking", "Just Asking"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->response(), "Response", "Response"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->research_findings(), "Research Findings", "Research Findings"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->personality_profile(), "Personality of the Day", "Personalities of the Day"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->life_style(), "A Day in the Life", "A Day in the Life"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->history_and_culture(), "The History or Culture", "History And Culture"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->trends(), "Changing Trend", "Changing Trends"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->reviews_and_opinion(), "My Review or Opinion", "Reviews And Opinion"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->expert_opinion(), "Expert Opinion", "Expert Opinion"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->letter_to_the_editor(), "Letter To The editor", "Letter To The Editor"));
        $this->add($this->insert_default_article_type(app::article_type_codes()->editorial(), "Editorial", "Editorial"));
    }

    private function insert_event_types()
    {
        $this->add($this->horizontalLine("INSERT DEFAULT EVENT TYPES"));
        $this->add($this->insert_default_event_type(app::event_type_codes()->other(), "Other", "Others", app::dept_type_codes()->other()));
        $this->add($this->insert_default_event_type(app::event_type_codes()->give_away_ceremony(), "Give Away Ceremony", "Give Away Ceremonies", app::dept_type_codes()->marriage_and_honey_moon()));
        $this->add($this->insert_default_event_type(app::event_type_codes()->introduction_ceremony(), "Introduction Ceremony", "Introduction Ceremonies", app::dept_type_codes()->marriage_and_honey_moon()));
        $this->add($this->insert_default_event_type(app::event_type_codes()->wedding(), "Wedding", "Weddings", app::dept_type_codes()->marriage_and_honey_moon(), "Create a Page for your past or upcoming wedding. Useful for sharing moments, pictures, and videos related to your wedding"));
        $this->add($this->insert_default_event_type(app::event_type_codes()->wedding_meeting(), "Wedding Meeting", "Wedding Meetings", app::dept_type_codes()->marriage_and_honey_moon()));
        $this->add($this->insert_default_event_type(app::event_type_codes()->bridal_shower(), "Bridal Shower", "Bridal Showers", app::dept_type_codes()->marriage_and_honey_moon()));
        $this->add($this->insert_default_event_type(app::event_type_codes()->bachelors_party(), "Bachelor's Party", "Bachelor's Parties", app::dept_type_codes()->marriage_and_honey_moon()));
        $this->add($this->insert_default_event_type(app::event_type_codes()->marriage_celebration(), "Marriage celebration", "Marriage celebrations", app::dept_type_codes()->marriage_and_honey_moon()));
    }

    private function insert_status_types()
    {
        $this->add($this->horizontalLine("INSERT DEFAULT STATUS TYPES"));

        $this->add($this->insert_default_status_type(app::status_type_codes()->getting_married(), "Getting Married","Let the world know you are getting married"));
        $this->add($this->insert_default_status_type(app::status_type_codes()->just_married(), "Got Married","Let the world know you got married. Share Photos of the event"));

        $this->add($this->insert_default_status_type(app::status_type_codes()->attending_event(), "Attending Event","Share Photos of an event you are currently attending. You can tag them with the location and people you are with"));
        $this->add($this->insert_default_status_type(app::status_type_codes()->attended_event(), "Attended Event", "Share Photos of an event you previously attended. . You can tag them with the location and people you were with"));
        $this->add($this->insert_default_status_type(app::status_type_codes()->will_be_attending_event(), "Will be attending Event","Notify friends of an event you will be attending"));

        $this->add($this->insert_default_status_type(app::status_type_codes()->performing_at_event(), "Performing at an Event","Share Photos of yourself performing at an event happening right now"));
        $this->add($this->insert_default_status_type(app::status_type_codes()->performed_at_event(), "Performed at an Event","Share Photos of yourself performing at a past event"));
        $this->add($this->insert_default_status_type(app::status_type_codes()->will_be_performing_at_event(), "Will be performing at an event","Announce an event where you will be performing"));

        $this->add($this->insert_default_status_type(app::status_type_codes()->providing_service(), "Providing a Service","Share Photos of yourself providing services at an event happening right now"));
        $this->add($this->insert_default_status_type(app::status_type_codes()->provided_service(), "Provided a Service","Share Photos of yourself providing services at a past event"));
        $this->add($this->insert_default_status_type(app::status_type_codes()->will_be_providing_service(), "Will be Providing a Service","Announce an event where you will be providing services"));

    }

    private function insert_approval_status_codes()
    {
        $this->add($this->horizontalLine("INSERT DEFAULT APPROVAL STATUS CODES"));
        $this->add($this->insert_approval_status_code(app::approval_status_codes()->pending_approval(), "Pending Approval"));
        $this->add($this->insert_approval_status_code(app::approval_status_codes()->approved(), "Approved"));
        $this->add($this->insert_approval_status_code(app::approval_status_codes()->spam(), "Spam"));
        $this->add($this->insert_approval_status_code(app::approval_status_codes()->trashed(), "Trashed"));
    }

    private function access_types()
    {
        $this->add($this->horizontalLine("ACCESS TYPES"));
        $this->add($this->tableForAccessTypes());
        $this->add($this->insert_default_access_type(app::access_type_codes()->staff_only(), "Staff Only"));
        $this->add($this->insert_default_access_type(app::access_type_codes()->open_access(), "Open Access"));
    }

    private function item_ratings()
    {
        $this->add($this->horizontalLine("ITEM RATINGS"));
        $this->add($this->baseTableForItemRatings(app::values()->item_ratings()));
    }

    private function photo_credits()
    {
        $this->add($this->horizontalLine("PHOTO CREDITS"));
        $this->add($this->photoCredits());
    }

    private function currency_codes()
    {
        $this->add($this->horizontalLine("CURRENCY CODES"));
        $this->add($this->tableFoCurrencyCodes());
    }

    private function insert_default_currencies()
    {
        $this->add($this->horizontalLine("add some currencies"));
        $this->add($this->insert_default_currency("UGX", "Uganda Shillings"));
        $this->add($this->insert_default_currency("USD", "US Dollars"));
    }

    private function item_selling_prices()
    {
        $this->add($this->horizontalLine("ITEM SELLING PRICES"));
        $this->add($this->baseTableForItemPricesAndCharges(
            app::values()->item_selling_prices(),
            app::values()->selling_price(),
            app::values()->selling_price_units()
        ));
    }

    private function item_rental_prices()
    {
        $this->add($this->horizontalLine("ITEM RENTAL PRICES"));
        $this->add($this->baseTableForItemPricesAndCharges(
            app::values()->item_rental_prices(),
            app::values()->rental_price(),
            app::values()->rental_price_units()
        ));
    }

    private function reference_tables()
    {
        $this->item_types();
        $this->product_types();
        $this->work_types();
        $this->facility_types();
        $this->event_types();
        $this->profile_types();
        $this->article_types();
        $this->status_types();
        $this->approval_status_codes();
        $this->users();

        $this->currency_codes();
        $this->user_types();
        $this->departments();
    }

    private function transaction_tables()
    {
        $this->sessions();
        $this->drafts();
        $this->published();
        $this->extended_post_content();
        $this->comments();
        $this->likes();
        $this->views();

        $this->access_types();
        $this->item_ratings();
        $this->photo_credits();

        $this->item_selling_prices();
        $this->item_rental_prices();
    }


}

//todo: app specific

class QueryForDepartments extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->departments());
        $this->select_everything();
    }
}
class QueryForDepartment extends QueryForDepartments{
    public function __construct($department_code)
    {
        parent::__construct();
        $this->where(Db::fields()->department_code()->isEqualTo($department_code));
        $this->limit(0,1);
    }
}

class QueryForItemTypes extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->item_types());
    }
}
abstract class QueryForSomethingTypes extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from($this->tableName());
        $this->select_everything();
        $this->select($this->picture_file_name_query()->as_(app::values()->picture_file_name()));
    }

    //TODO: generalize this code: create super class for product types, work types, etc
    private function picture_file_name_query()
    {
        $query = new SelectQueryForApplication();
        $query->
        from(app::values()->posts())->
        where(
            $this->type_code_field()->inTable(app::values()->posts())->
            isEqualTo(
                $this->type_code_field()->inTable($this->tableName())
            )
        )->
        select(Db::fields()->picture_file_name())->
        limit(0,1);

        return $query;
    }

    abstract protected function tableName();
    abstract protected function type_code_field();
}

class QueryForProductTypes extends QueryForSomethingTypes{
    protected function tableName()
    {
        return app::values()->product_types();
    }

    protected function type_code_field()
    {
        return Db::fields()->product_type_code();
    }
}
class QueryForWorkTypes extends QueryForSomethingTypes{
    protected function tableName()
    {
        return app::values()->work_types();
    }

    protected function type_code_field()
    {
        return Db::fields()->work_type_code();
    }
}
class QueryForFacilityTypes extends QueryForSomethingTypes{
    protected function tableName()
    {
        return app::values()->facility_types();
    }

    protected function type_code_field()
    {
        return Db::fields()->facility_type_code();
    }
}
class QueryForEventTypes extends QueryForSomethingTypes{
    protected function tableName()
    {
        return app::values()->event_types();
    }

    protected function type_code_field()
    {
        return Db::fields()->event_type_code();
    }
}

class QueryForArticleTypes extends QueryForSomethingTypes{
    protected function tableName()
    {
        return app::values()->article_types();
    }

    protected function type_code_field()
    {
        return Db::fields()->article_type_code();
    }
}
class QueryForProfileTypes extends QueryForSomethingTypes{
    protected function tableName()
    {
        return app::values()->profile_types();
    }

    protected function type_code_field()
    {
        return Db::fields()->profile_type_code();
    }
}
class QueryForStatusTypes extends QueryForSomethingTypes{
    protected function tableName()
    {
        return app::values()->status_types();
    }

    protected function type_code_field()
    {
        return Db::fields()->status_type_code();
    }
}


class QueryForProductType extends QueryForProductTypes{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->where(Db::fields()->product_type_code()->isEqualTo($type_code));
        $this->limit(0,1);
    }
}

class QueryForWorkType extends QueryForWorkTypes{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->where(Db::fields()->work_type_code()->isEqualTo($type_code));
        $this->limit(0,1);
    }
}

class QueryForFacilityType extends QueryForFacilityTypes{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->where(Db::fields()->facility_type_code()->isEqualTo($type_code));
        $this->limit(0,1);
    }
}
class QueryForEventType extends QueryForEventTypes{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->where(Db::fields()->event_type_code()->isEqualTo($type_code));
        $this->limit(0,1);
    }
}

class QueryForArticleType extends QueryForArticleTypes{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->where(Db::fields()->article_type_code()->isEqualTo($type_code));
        $this->limit(0,1);
    }
}

class QueryForProfileType extends QueryForProfileTypes{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->where(Db::fields()->profile_type_code()->isEqualTo($type_code));
        $this->limit(0,1);
    }
}

class QueryForStatusType extends QueryForStatusTypes{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->where(Db::fields()->status_type_code()->isEqualTo($type_code));
        $this->limit(0,1);
    }
}

//todo: to be used to fileter by item type
class QueryForGetPostsByType extends QueryForGetPosts{
    public function __construct($item_type_code)
    {
        $item_type_code = ConvertToSQLValue::ifNotSQLValue($item_type_code);
        $this->sql_test = Db::fields()->item_type_code()->isEqualTo($item_type_code);        
        parent::__construct();
    }
}
class QueryForGetProducts extends QueryForGetPostsByType{
    public function __construct()
    {
        parent::__construct(app::item_type_codes()->product());
    }
}
class QueryForGetWork extends QueryForGetPostsByType{
    public function __construct()
    {
        parent::__construct(app::item_type_codes()->work());
    }
}
class QueryForGetFacilities extends QueryForGetPostsByType{
    public function __construct()
    {
        parent::__construct(app::item_type_codes()->facility());
    }
}
class QueryForGetArticles extends QueryForGetPostsByType{
    public function __construct()
    {
        parent::__construct(app::item_type_codes()->article());
    }
}
class QueryForGetEvents extends QueryForGetPostsByType{
    public function __construct()
    {
        parent::__construct(app::item_type_codes()->event());
    }
}
class QueryForGetProfiles extends QueryForGetPostsByType{
    public function __construct()
    {
        parent::__construct(app::item_type_codes()->profile());
    }
}
class QueryForGetStatusUpdates extends QueryForGetPostsByType{
    public function __construct()
    {
        parent::__construct(app::item_type_codes()->status_update());
    }
}

//in department
abstract class QueryForGetPostsByTypeAndDepartment extends QueryForGetPosts{

    public function __construct($department_code)
    {

        $this->sql_test = $this->build_sql_test($department_code);
        parent::__construct();
    }

    private function build_sql_test($department_code)
    {
        $type_field = $this->get_type_field();
        $type_table = $this->get_type_table();

        //where product type code in list of product type codes belonging to department

        $query = (new SQLSelectExpression())->
        select($type_field)->
        from($type_table)->
        where(
            $type_field->inTable($type_table)->
            isEqualTo($type_field->inTable(app::values()->posts()))->
            and_(
                Db::fields()->department_code()->inTable($type_table)->
                isEqualToString($department_code."")
            )
        );

        return
            Db::fields()->item_type_code()->isEqualTo($this->get_item_type_code())->
            and_($query->exists()->isTrue());
    }

    abstract protected function get_item_type_code();
    /** @return SQLIdentifier */
    abstract protected function get_type_field();
    abstract protected function get_type_table();

}

class QueryForGetProductsInDepartment extends QueryForGetPostsByTypeAndDepartment{
    protected function get_item_type_code(){
        return app::item_type_codes()->product();
    }
    protected function get_type_field()
    {
        return Db::fields()->product_type_code();
    }

    protected function get_type_table()
    {
        return app::values()->product_types();
    }
}
class QueryForGetWorkInDepartment extends QueryForGetPostsByTypeAndDepartment{
    protected function get_item_type_code(){
        return app::item_type_codes()->work();
    }
    protected function get_type_field()
    {
        return Db::fields()->work_type_code();
    }

    protected function get_type_table()
    {
        return app::values()->work_types();
    }
}
class QueryForGetFacilitiesInDepartment extends QueryForGetPostsByTypeAndDepartment{
    protected function get_item_type_code(){
        return app::item_type_codes()->facility();
    }
    protected function get_type_field()
    {
        return Db::fields()->facility_type_code();
    }

    protected function get_type_table()
    {
        return app::values()->facility_types();
    }
}

class QueryForGetEventsInDepartment extends QueryForGetPostsByTypeAndDepartment{
    protected function get_item_type_code(){
        return app::item_type_codes()->event();
    }
    protected function get_type_field()
    {
        return Db::fields()->event_type_code();
    }

    protected function get_type_table()
    {
        return app::values()->event_types();
    }
}
class QueryForGetProfilesInDepartment extends QueryForGetPostsByTypeAndDepartment{
    protected function get_item_type_code(){
        return app::item_type_codes()->profile();
    }
    protected function get_type_field()
    {
        return Db::fields()->profile_type_code();
    }

    protected function get_type_table()
    {
        return app::values()->profile_types();
    }
}
class QueryForGetArticlesInDepartment extends QueryForGetPosts{
    public function __construct($department_code)
    {
        $this->sql_test = $this->build_sql_test($department_code);
        parent::__construct();
    }

    private function build_sql_test($department_code)
    {
        $sql_test =
            Db::fields()->item_type_code()->isEqualTo(app::item_type_codes()->article())->
            and_(Db::fields()->article_dept_code()->isEqualTo($department_code.""));
        return $sql_test;
    }
}
class QueryForGetStatusUpdatesInDepartment extends QueryForGetPostsByTypeAndDepartment{
    protected function get_item_type_code(){
        return app::item_type_codes()->status_update();
    }
    protected function get_type_field()
    {
        return Db::fields()->status_type_code();
    }

    protected function get_type_table()
    {
        return app::values()->status_types();
    }
}

//=========== posts by sub type
abstract class QueryForGetPostsBySubtype extends QueryForGetPosts{
    
    public function __construct($sub_type)
    {

        $this->sql_test =
            strlen($sub_type) > 0 ?
            Db::fields()->item_type_code()->isEqualTo($this->get_item_type_code())->
            and_($this->DbField()->isEqualTo($sub_type))
            :
            Db::fields()->item_type_code()->isEqualTo($this->get_item_type_code())

        ;
        parent::__construct();
    }

    abstract protected function get_item_type_code();
    /** @return SQLIdentifier */
    abstract protected function DbField();
}
class QueryForGetProductsByType extends QueryForGetPostsBySubtype{
    
    protected function get_item_type_code(){
        return app::item_type_codes()->product();
    }
    
    protected function DbField()
    {
        return Db::fields()->product_type_code();
    }
}
class QueryForGetWorkByType extends QueryForGetPostsBySubtype{
    
    protected function get_item_type_code(){
        return app::item_type_codes()->work();
    }
    
    protected function DbField()
    {
        return Db::fields()->work_type_code();
    }
}
class QueryForGetFacilitiesByType extends QueryForGetPostsBySubtype{
    
    protected function get_item_type_code(){
        return app::item_type_codes()->facility();
    }
    protected function DbField()
    {
        return Db::fields()->facility_type_code();
    }
}
class QueryForGetArticlesByType extends QueryForGetPostsBySubtype{
    
    protected function get_item_type_code(){
        return app::item_type_codes()->article();
    }
    
    protected function DbField()
    {
        return Db::fields()->article_type_code();
    }
}
class QueryForGetEventsByType extends QueryForGetPostsBySubtype{

    protected function get_item_type_code(){
        return app::item_type_codes()->event();
    }
    
    protected function DbField()
    {
        return Db::fields()->event_type_code();
    }
}
class QueryForGetProfilesByType extends QueryForGetPostsBySubtype{
    
    protected function get_item_type_code(){
        return app::item_type_codes()->profile();
    }
    
    protected function DbField()
    {
        return Db::fields()->profile_type_code();
    }
}
class QueryForGetStatusUpdatesByType extends QueryForGetPostsBySubtype{

    protected function get_item_type_code(){
        return app::item_type_codes()->status_update();
    }

    protected function DbField()
    {
        return Db::fields()->status_type_code();
    }
}