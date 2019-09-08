<?php


class Db{    
    public static function queries(){
        return new QueryFactory();
    }
    public static function results(){
        return new ResultFactory();
    }

    public static function fields()
    {
        return new DbFieldFactory();
    }
    public static function tables()
    {
        return new DbTableFactory();
    }
    public static function computed_values()
    {
        return new ComputedValueFactory();
    }

    public static function max_length()
    {
        return new MaxLengthFactory();
    }

    public static function triggers()
    {
        return new TriggerFactory();
    }

    public static function joined_tables()
    {
        return new FactoryForJoinedTables();
    }

    public static function tests()
    {
        return new FactoryForDbTests();
    }

    public static function ranking_factors()
    {
        return new FactoryForPostRankingFactors();
    }

    public static function post_computations($file_name)
    {
        return new FactoryForPostComputations($file_name);
    }

}
class FactoryForPostComputations{
    private $file_name;

    public function __construct($file_name)
    {
        $this->file_name = $file_name;
    }

    private function queryForPostAuthor()
    {
        return
            (new SQLSelectExpression())
                ->from(app::values()->users())
                ->where(
                    Db::fields()->entity_id()->inTable(app::values()->users())->
                    isEqualTo(Db::fields()->author_id())
                )
            ;
    }

    public function author_signup_timestamp()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->timestamp());
    }
    public function author_whois()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->whois());
    }
    public function author_authority()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->authority_score());
    }
    public function author_name()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->full_name());
    }
    public function author_facebook_page_url()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->url_facebook_page());
    }
    public function author_twitter_page_url()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->url_twitter_page());
    }
    public function author_linked_page_url()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->url_linkedin_page());
    }
    public function author_youtube_channel_url()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->url_youtube_channel());
    }
    public function author_legitimacy_score()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->legitimacy_score());
    }
    public function author_whatsapp_number()
    {
        return $this->queryForPostAuthor()->select(Db::fields()->whatsapp_number());
    }
    
    public function title()
    {
        return Db::fields()->title();
    }
    public function timestamp()
    {
        return Db::fields()->timestamp();
    }
    public function description()
    {
        return Db::fields()->description();
    }

    public function picture_file_name()
    {
        return Db::fields()->picture_file_name();
    }
    
    public function total_sources()
    {
        return Db::fields()->total_sources();
    }

    public function total_phone_contacts()
    {
        return Db::fields()->total_phone_contacts();
    }
    public function total_mail_contacts()
    {
        return Db::fields()->total_mail_contacts();
    }
    public function total_web_contacts()
    {
        return Db::fields()->total_web_contacts();
    }
    public function total_headings()
    {
        return Db::fields()->total_headings();
    }
    public function total_bullets()
    {
        return Db::fields()->total_bullets();
    }
    public function total_paragraphs()
    {
        return Db::fields()->total_paragraphs();
    }

    public function total_images()
    {
        return Db::fields()->total_images();
    }
    public function total_words()
    {
        return Db::fields()->total_words();
    }
    public function total_outbound_links()
    {
        return Db::fields()->total_outbound_links();
    }
    public function total_visits()
    {
        return Db::fields()->total_visits();
    }
    public function total_saves()
    {
        return Db::fields()->total_saves();
    }


}
class FactoryForPostRankingFactors{

    public function draft_post_freshness($file_name)
    {
        $this->new_query()->
        from(app::values()->draft_posts())->
        where(Db::fields()->entity_id()->isEqualTo(EntityIdFromFileName::get($file_name)))->
        select(Db::fields()->timestamp()->sum())->
        limit(0,1)
        ;
    }

    private function new_query()
    {
        return new SelectQueryForApplication();
    }
}

class FactoryForDbTests{

    public function author_id_is_me()
    {
        return Db::fields()->author_id()->isEqualTo(Db::computed_values()->current_user_id_before_validating());
    }
}

class FactoryForJoinedTables{

    public function posts_group_by_item_type_code_join_item_types()
    {
        $table2 = (new QueryForGetContentAudit())->as_("table2");
        $joined_table = Db::tables()->item_types()->left_join($table2)->on(
            Db::fields()->item_type_code()->inTable(app::values()->item_types())->
            isEqualTo(
                Db::fields()->item_type_code()->inTable("table2")
            )
        );
        return $joined_table;        
    }
}
//========
class ResultFactory{
    public function single_query($query){
        return new ResultForSingleQueryOnSmartcashDb($query);
    }
    public function multi_query($query){
        return new ResultForMultiQueryOnSmartcashDb($query);
    }
}
class ResultForSingleQueryOnSmartcashDb extends ResultForSingleQuery{
    public function __construct($query)
    {
        parent::__construct($query,  WebsiteSettings::db_host(), WebsiteSettings::db_username(), WebsiteSettings::db_password(), WebsiteSettings::db_name());
    }
}

class ResultForMultiQueryOnSmartcashDb extends ResultForMultiQuery{
    public function __construct($query)
    {
        parent::__construct($query,  WebsiteSettings::db_host(), WebsiteSettings::db_username(), WebsiteSettings::db_password(), WebsiteSettings::db_name());
    }
}



