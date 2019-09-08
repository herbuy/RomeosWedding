<?php

class QueryFactory{
    public function posts(){
        return new FactoryOfQueriesForPosts();
    }
    public function super_admin(){
        return new FactoryForOLAPQueries();
    }
    public function addPost($file_name,$id,$title,$content){
        return new QueryForAddPost($file_name,$id,$title,$content);
    }
    
    public function create_tables(){
        return new QueryForCreateTables();
    }

    public function getMostRecentPost()
    {
        return new QueryForGetMostRecentPost();
    }


    public function update_post_picture($file_name, $image_file_name)
    {
        return new QueryForUpdatePostPicture($file_name,$image_file_name);
    }
    public function edit_post_picture($file_name, $image_file_name)
    {
        return new QueryForEditPostPicture($file_name,$image_file_name);
    }


    public function getFileContent()
    {
        return new QueryForGetFileContent();
    }

    public function start_new_post($file_name, $id, $title,$content='',$extended_post_content='')
    {
        return new QueryForStartNewPost($file_name,$id,$title,$content,$extended_post_content);
    }
    public function create_multiple_posts($title_array,$content_array,$extended_post_content_array,$section_id_array){
        return new QueryForCreateMultiplePosts($title_array,$content_array,$extended_post_content_array,$section_id_array);
    }
        
    public function edit_post_title($file_name, $title)
    {
        return new SQLCommandListForEditPostTitle($file_name,$title);
    }
    public function edit_post_content($file_name, $content)
    {
        return new SQLCommandListForEditPostContent($file_name,$content);
    }

    public function edit_extended_post_content($file_name, $content)
    {
        return new QueryForEditExtendedPostContent($file_name,$content);
    }
    public function edit_product_type($file_name,$type){
        return new QueryForEditProductType($file_name,$type);
    }
    public function edit_facility_type($file_name,$type){
        return new QueryForEditFacilityType($file_name,$type);
    }
    public function edit_work_type($file_name,$type){
        return new QueryForEditWorkType($file_name,$type);
    }
    public function edit_event_type($file_name,$type){
        return new QueryForEditEventType($file_name,$type);
    }
    public function edit_profile_type($file_name,$type){
        return new QueryForEditProfileType($file_name,$type);
    }
    public function edit_article_type($file_name,$type){
        return new QueryForEditArticleType($file_name,$type);
    }
    public function edit_post_video($file_name, $youtube_video_id)
    {
        return new QueryForEditPostVideo($file_name,$youtube_video_id);
    }

    public function delete_post($file_name)
    {
        return new SQLCommandListForDeletePost($file_name);        
    }

    public function publish_post($file_name)
    {
        return new SQLCommandListForPublishPost($file_name);
    }
    
    public function unpublish_post($file_name)
    {
        return new QueryForUnPublishPost($file_name);
    }

    public function publish_all_posts()
    {
        return new QueryForPublishAllPosts();
    }

    public function getExtendedPostContent($file_name)
    {
        return new QueryForGetExtendedPostContent($file_name);
    }
    public function getExtendedPostTokens($file_name)
    {
        return new QueryForGetExtendedPostTokens($file_name);
    }
    
    public function get_stats_per_year()
    {
        return new QueryForGetStatsPerYear();
    }
    public function get_stats_per_month()
    {
        return new QueryForGetStatsPerMonth();
    }
    public function get_stats_per_week()
    {
        return new QueryForGetStatsPerWeek();
    }
    public function get_stats_per_day()
    {
        return new QueryForGetStatsPerDay();
    }

    public function create_account($full_name,$email, $password)
    {
        return new QueryForCreateAccount($full_name,$email,$password);
    }
    public function login($email, $password)
    {
        return new QueryForLogin($email,$password);
    }
    public function logout()
    {
        return new QueryForLogout();
    }

    public function get_current_user()
    {
        return new QueryForCurrentUser();
    }
    public function get_user($file_name)
    {
        return new QueryForGetUser($file_name);
    }
    public function get_users_except($file_name)
    {
        return new QueryForGetUsersExcept($file_name);
    }


    //todo: app specific queries
    public function departments()
    {
        return new QueryForDepartments();
    }
    public function department($department_code)
    {
        return new QueryForDepartment($department_code);
    }

    public function newSelectQuery()
    {
        return new SelectQueryForApplication();
    }

    public function item()
    {
        return new FactoryForItemQueries();
    }

    public function product()
    {
        return new FactoryForProductQueries();
    }
    public function work()
    {
        return new FactoryForWorkQueries();
    }
    public function facility()
    {
        return new FactoryForFacilityQueries();
    }
    public function article()
    {
        return new FactoryForArticleQueries();
    }
    public function event()
    {
        return new FactoryForEventQueries();
    }
    public function profile()
    {
        return new FactoryForProfileQueries();
    }

    public function status()
    {
        return new FactoryForStatusQueries();
    }
    public function pictures()
    {
        return new FactoryForPictureQueries();
    }
    public function videos()
    {
        return new FactoryForVideoQueries();
    }

    public function comments()
    {
        return new FactoryForComments();
    }

    public function post_comment($file_name,$content,$full_name,$email)
    {
        return new QueryForPostComment($file_name,$content,$full_name,$email);
    }
    public function update_item_score($file_name)
    {
        return new QueryForUpdateItemScore($file_name);
    }

    public function dashbboard()
    {
        return new FactoryForDahsboardQueries();
    }

    public function views()
    {
        return new FactoryForViews();
    }
    public function likes()
    {
        return new FactoryForLikes();
    }

    public function item_ratings()
    {
        return new FactoryForItemRatings();
    }
    public function photo_credits()
    {
        return new FactoryForPhotoCredits();
    }
    public function item_selling_price()
    {
        return new FactoryForItemSellingPrice();
    }
    public function item_rental_price()
    {
        return new FactoryForItemRentalPrice();
    }

}

class FactoryForViews{
    
    public function add($file_name)
    {
        return new QueryForRegisterViewForThePost($file_name);
    }

    public function most()
    {
        return new QueryForPagesWithMostViews();
    }
}
class FactoryForLikes{
    public function add($file_name)
    {
        return new QueryForLikeThePost($file_name);
    }

    public function most()
    {
        return new QueryForPagesWithMostLikes();
    }
}
class FactoryForComments{

    public function all()
    {
        return new QueryForGetComments();
    }
    
    public function for_post($file_name)
    {
        return new QueryForGetCommentForPost($file_name);
    }

    public function post($file_name,$content,$full_name,$email)
    {
        return new QueryForPostComment($file_name,$content,$full_name,$email);
    }

    public function approve($entity_id)
    {
        return new QueryForApproveComment($entity_id);
    }
    public function moveToTrash($entity_id)
    {
        return new QueryForMoveCommentToTrash($entity_id);
    }
    public function moveToSpam($entity_id)
    {
        return new QueryForMoveCommentToSpam($entity_id);
    }

    public function most()
    {
        return new QueryForPagesWithMostComments();
    }

}

class FactoryForItemRatings{

    public function add($file_name,$rating)
    {
        return new QueryForRateItem($file_name,$rating);
    }
}
class FactoryForPhotoCredits{

    public function add($file_name,$work_type_code,$full_name,$email_addr,$mobile_number,$url)
    {
        return new QueryForAddPhotoCredits($file_name,$work_type_code,$full_name,$email_addr,$mobile_number,$url);
    }

    public function photo_credits_for_post($file_name)
    {
        return new QueryForGetPhotoCreditsForPost($file_name);
    }
}
class FactoryForItemSellingPrice{

    public function set($file_name,$price,$currency_code)
    {
        return new QueryForSetItemSellingPrice($file_name,$price,$currency_code);
    }
}
class FactoryForItemRentalPrice{

    public function set($file_name,$price,$currency_code)
    {
        return new QueryForSetItemRentalPrice($file_name,$price,$currency_code);
    }
}
class FactoryForDahsboardQueries{

    public function content_audit(){

        $joined_table = Db::joined_tables()->posts_group_by_item_type_code_join_item_types();

        $query = new SQLSelectExpression();
        $query->from($joined_table)->
        select(Db::fields()->item_type_code()->inTable(app::values()->item_types()))->
        select(Db::fields()->item_type_as_single()->inTable(app::values()->item_types()))->
        select(Db::fields()->item_type_as_plural()->inTable(app::values()->item_types()))->
        select_field(app::values()->total())
        ;
        return $query;

        //return new QueryForGetContentAudit();
    }
}

interface IFactoryForObjectQueries{
    public function types();
    public function type($type_code);
}
class FactoryForItemQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForItemTypes();
    }
    public function type($type_code){
        return null;//return new QueryForProductType($type_code);
    }
}

class FactoryForProductQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForProductTypes();
    }
    public function type($type_code){
        return new QueryForProductType($type_code);
    }

    public function post()
    {
        return new QueryForPostProduct();
    }
}
class FactoryForWorkQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForWorkTypes();
    }
    public function type($type_code){
        return new QueryForWorkType($type_code);
    }

    public function post()
    {
        return new QueryForPostWork();
    }
}
class FactoryForFacilityQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForFacilityTypes();
    }
    public function type($type_code){
        return new QueryForFacilityType($type_code);
    }

    public function post()
    {
        return new QueryForPostFacility();
    }
}
class FactoryForArticleQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForArticleTypes();
    }
    public function type($type_code){
        return new QueryForArticleType($type_code);
    }

    public function post()
    {
        return new QueryForPostArticle();
    }
}
class FactoryForEventQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForEventTypes();
    }
    public function type($type_code){
        return new QueryForEventType($type_code);
    }

    public function post()
    {
        return new QueryForPostEvent();
    }
}
class FactoryForProfileQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForProfileTypes();
    }
    public function type($type_code){
        return new QueryForProfileType($type_code);
    }

    public function post()
    {
        return new QueryForPostProfile();
    }
}

class FactoryForStatusQueries implements IFactoryForObjectQueries{
    public function types(){
        return new QueryForStatusTypes();
    }
    public function type($type_code){
        return new QueryForStatusType($type_code);
    }

    public function post()
    {
        return new QueryForPostStatusUpdate();
    }
}

class FactoryForPictureQueries{
    
    public function post($picture_file_name,$item_type_code='',$product_type_code='',$facility_type_code='',$work_type_code='',$article_type_code='',$profile_type_code='',$event_type_code='',$status_type_code='')
    {
        return new QueryForPostPicture($picture_file_name,$item_type_code,$product_type_code,$facility_type_code,$work_type_code,$article_type_code,$profile_type_code,$event_type_code,$status_type_code);
    }
}

class FactoryForVideoQueries{

    public function post()
    {
        return new QueryForPostVideo();
    }
}


class FactoryOfQueriesForPosts{
    public function published()
    {
        return new FactoryOfQueriesForPublishedPosts();
    }
    public function draft()
    {
        return new FactoryOfQueriesForDraftPosts();
    }
}

class FactoryForPostsPublishedByUser{
    private $file_name;

    public function __construct($file_name)
    {
        $this->file_name = $file_name;
    }

    public function get()
    {
        $query = new QueryForGetPostsPostedByUser($this->file_name);
        return $query;
    }
}

class FactoryForPostsPublishedMatchingSearchQuery implements IDecoratableGetPostsQuery{


    private $final_query;

    public function getTableName()
    {
        return "table2";
    }
    public function getSelectQuery()
    {
        return $this->final_query;
    }


    private $search_query;
    public function __construct($search_query)
    {
        $this->search_query = $search_query;

        $this->final_query = new SelectQueryForApplication();
    }

    public function get()
    {
        $inner_joined_table = new SQLInnerJoinedTable();
        $inner_joined_table->setTable1(
            (new SearchTaskForGetPostsThatMatchQuery($this->search_query))->get(0,50)
                //TODO: we are phasing out the class below so delete the class
            //(new QueryForGetPostsBySearchQuery($this->search_query,0,50))
                ->as_("table1")
        );
        $inner_joined_table->setTable2((new SQLTableIdentifier(app::values()->posts()))->as_("table2"));
        $inner_joined_table->setColumn1(Db::fields()->post_id()->inTable("table1"));
        $inner_joined_table->setColumn2(Db::fields()->entity_id()->inTable("table2"));

        //final query
        $final_query = $this->final_query; //new SelectQueryForApplication();
        $final_query->from($inner_joined_table);
        $final_query->where($this->getSQLTestForFinalQuery());
        //oder by weight
        $final_query->order_by(
            //todo: order by the sum of the suffix weight and hard-factor score
            (new SQLIdentifier(app::values()->total_stem_suffix_weight()))->inTable("table1")->
                //todo: the total score is a hard score so it plays a less role than the suffix weight in ranking search results, hence we took its log
            plus(Db::fields()->total_score()->inTable("table2")->log10_plus_1())->
            descending()
        );

        //select
        $final_query->select_everything("table2");
        $final_query->select(app::values()->total_stem_suffix_weight());
        //decorate
        new DecoratorForGetPostsQuery($this);

        //print $final_query;exit;
        return $final_query;
    }

    protected function getSQLTestForFinalQuery()
    {
        return (new SQLInt(1))->isEqualToInt(1); //will always be true so no filtering
    }
}

class FactoryForPostsPublishedRelatedToPost extends FactoryForPostsPublishedMatchingSearchQuery{
    private $file_name;

    public function __construct($file_name)
    {
        $this->file_name = $file_name;
        parent::__construct($file_name);
    }
    protected function getSQLTestForFinalQuery()
    {
        //this line of code is meant to prevent return the post itself among the related posts
        return Db::fields()->post_id()->inTable("table1")->isNotEqualToInt(EntityIdFromFileName::get($this->file_name));
    }
}
class FactoryForPostsPublishedByCurrentUser{

    public function get()
    {
        $query = new QueryForGetPostsPostedByCurrentUser();
        return $query;
    }
}

class FactoryOfQueriesForPublishedPosts{
    public function by_user($file_name){
        return new FactoryForPostsPublishedByUser($file_name);
    }
    public function by_search_query($search_query){
        return new FactoryForPostsPublishedMatchingSearchQuery($search_query);
    }
    public function get_related_posts($file_name){
        return new FactoryForPostsPublishedRelatedToPost($file_name);
    }


    public function current_user(){
        return new FactoryForPostsPublishedByCurrentUser();
    }
    public function all_types(){
        return new QueryForGetPosts();
    }

    public function find_by_file_name($file_name)
    {        
        $query = new QueryForGetPost($file_name);
        //perform other queries that are never return
        return $query;
    }

    public function products()
    {
        return new FactoryOfQueryForPublishedProducts();
    }
    public function work()
    {
        return new FactoryOfQueryForPublishedWork();
    }
    public function facilities()
    {
        return new FactoryOfQueryForPublishedFacilities();
    }
    public function events()
    {
        return new FactoryOfQueryForPublishedEvents();
    }
    public function articles()
    {
        return new FactoryOfQueryForPublishedArticles();
    }
    public function profiles()
    {
        return new FactoryOfQueryForPublishedProfiles();
    }
    public function status_updates()
    {
        return new FactoryOfQueryForPublishedStatusUpdates();
    }

    public function most_recent()
    {
        return new QueryForMostRecentPages();
    }

    public function oldest()
    {
        return new QueryForOldestPages();
    }

}

class FactoryOfQueriesForDraftPosts{
    public function all_types(){
        return new QueryForGetDraftPosts();
    }

    public function find_by_file_name($file_name)
    {
        return new QueryForGetDraftPost($file_name);
    }
}

class FactoryOfQueryForPublishedProducts{
    public function all_departments(){
        return new QueryForGetProducts();
    }

    public function in_department($department_code)
    {
        return new QueryForGetProductsInDepartment($department_code);
    }

    public function by_type($type)
    {
        return new QueryForGetProductsByType($type);
    }
}
class FactoryOfQueryForPublishedWork{
    public function all_departments(){
        return new QueryForGetWork();
    }

    public function in_department($department_code)
    {
        return new QueryForGetWorkInDepartment($department_code);
    }
    public function by_type($type)
    {
        return new QueryForGetWorkByType($type);
    }
}
class FactoryOfQueryForPublishedFacilities{
    public function all_departments(){
        return new QueryForGetFacilities();
    }

    public function in_department($department_code)
    {
        return new QueryForGetFacilitiesInDepartment($department_code);
    }
    public function by_type($type)
    {
        return new QueryForGetFacilitiesByType($type);
    }
}
class FactoryOfQueryForPublishedEvents{
    public function all_departments(){
        return new QueryForGetEvents();
    }

    public function in_department($department_code)
    {
        return new QueryForGetEventsInDepartment($department_code);
    }
    public function by_type($type)
    {
        return new QueryForGetEventsByType($type);
    }
}
class FactoryOfQueryForPublishedArticles{
    public function all_departments(){
        return new QueryForGetArticles();
    }

    public function in_department($department_code)
    {        
        return new QueryForGetArticlesInDepartment($department_code);
    }
    public function by_type($type)
    {
        return new QueryForGetArticlesByType($type);
    }
}
class FactoryOfQueryForPublishedProfiles{
    public function all_departments(){
        return new QueryForGetProfiles();
    }

    public function in_department($department_code)
    {
        return new QueryForGetProfilesInDepartment($department_code);
    }
    public function by_type($type)
    {
        return new QueryForGetProfilesByType($type);
    }
}

class FactoryOfQueryForPublishedStatusUpdates{
    public function all_departments(){
        return new QueryForGetStatusUpdates();
    }

    public function in_department($department_code)
    {
        return new QueryForGetStatusUpdatesInDepartment($department_code);
    }
    public function by_type($type)
    {
        return new QueryForGetStatusUpdatesByType($type);
    }
}
