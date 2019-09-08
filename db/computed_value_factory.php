<?php


class  ComputedValueFactory{

    public function timestamp_suggests_user_online($timestamp_as_int_or_sql){
        //$minutes_ago = 5;
        $minutes_ago = 60*24*7;//one week
        $seconds_ago = $minutes_ago*60;
        //------
        $timestamp_as_int_or_sql = ConvertToSQLValue::ifNotSQLValue($timestamp_as_int_or_sql);
        return $timestamp_as_int_or_sql->plus_int($seconds_ago)->isGreaterThanInt(time());
    }

    public function am_actor(){
        //return (new SQLTrue())->if_(DbField::actor_no()->isEqualToCurrentUserId())->else_(0);
    }
    public function am_target(){
        //return (new SQLTrue())->if_(DbField::target_no()->isEqualToCurrentUserId())->else_(0);
    }

    #from authentication table

    #from others
    public function current_user_id_after_validating(){
        //return new SQLCurrentUserIdAfterValidating();
    }
    public function current_user_id_before_validating(){
        $query = Db::queries()->newSelectQuery();
        $query->from(app::values()->sessions())->
        where(Db::fields()->session_id()->isEqualToString(SecureSession::getIdAfterSha1()))->
        select(Db::fields()->entity_id())-> //todo: the login routine shd tell us what entity id represents in sessions table
        limit(0,1);
        return $query;
    }
    
    public function seconds_ago()
    {
        return (new SQLInt(time()))->minus(Db::fields()->timestamp());
    }

    public function newly_posted_by_me()
    {
        /*return (new SQLTrue())->
        if_(ComputedValue::seconds_ago()->isLessThanInt(60)->and_(DbField::actor_no()->isEqualToCurrentUserId()))->
        else_(0);*/
    }

    public function current_timestamp()
    {
        return new SQLInt(time());
    }

    public function category_name_from_id($category_id_as_num_or_sqlvalue)
    {
        $category_id_as_num_or_sqlvalue = ConvertToSQLValue::ifNotSQLValue($category_id_as_num_or_sqlvalue);
        
        $query = new SQLSelectExpression();
        $query->select(Db::fields()->title()->inTable(app::values()->categories()))->
        from(app::values()->categories())->
        where(Db::fields()->entity_id()->isEqualTo($category_id_as_num_or_sqlvalue))->
        limit(0,1);
        
        return $query;
    }

    public function user_id_from_email($email_addr)
    {
        $query = new SQLSelectExpression();
        $query->select(Db::fields()->entity_id())->
        from(app::values()->users())->
        where(Db::fields()->email_address()->isEqualTo($email_addr))->
        limit(0,1);
        return $query;
    }

    public function total_comments_on_post($file_name_field)
    {
        return $this->total_something($file_name_field,app::values()->comments());        
    }
    public function total_views_on_post($file_name_field)
    {
        return $this->total_something($file_name_field,app::values()->views());
    }
    public function total_likes_on_post($file_name_field)
    {
        return $this->total_something($file_name_field,app::values()->likes());
    }
    
    public function total_something($file_name_field,$table)
    {
        $query = new SQLSelectExpression();
        $query->
        from($table)->
        where(
            Db::fields()->file_name()->inTable($table)->
            isEqualTo($file_name_field)
        )->
        group_by(Db::fields()->file_name())->
        select(Db::fields()->file_name()->count());

        return $query->if_($query->exists()->isTrue())->else_(0);
    }

    public function full_name_for_id($user_id)
    {        
        $query = new SQLSelectExpression();
        $query->
        from(app::values()->users())->
        where(
            Db::fields()->entity_id()->inTable(app::values()->users())->
            isEqualTo($user_id)
        )->        
        select(Db::fields()->full_name());
        return $query->if_($query->exists()->isTrue())->else_("");
    }

    public function new_file_name($title_or_sql, $subtype_or_sql, $item_type_or_sql, $entity_id_or_sql)
    {
        //prepare title
        $clean_title = "";
        if(!is_a("SQLValue",$title_or_sql)){
            $clean_title =  preg_replace("/[\W\s]/i","-",$title_or_sql."");
            $clean_title = new SQLString($clean_title);
        }
        else{
            $clean_title = $title_or_sql;
        }
        $subtype_or_sql = ConvertToSQLValue::ifNotSQLValue($subtype_or_sql);
        $item_type_or_sql = ConvertToSQLValue::ifNotSQLValue($item_type_or_sql);
        $entity_id_or_sql = ConvertToSQLValue::ifNotSQLValue($entity_id_or_sql);

        $sql_value = $clean_title;
        $sql_value = $sql_value->
        append("-")->append($subtype_or_sql)->append("-")->
        append($item_type_or_sql)->append("-")->append($entity_id_or_sql);
        return $sql_value;


        /*
        //prepare title
        $clean_title = "";
        if(!is_a("SQLValue",$title_or_sql)){
            $clean_title =  preg_replace("/[\W\s]/i","-",$title_or_sql."");
            $clean_title = new SQLString($clean_title); 
        }
        else{
            $clean_title = $title_or_sql;
        }
        $subtype_or_sql = ConvertToSQLValue::ifNotSQLValue($subtype_or_sql);
        $item_type_or_sql = ConvertToSQLValue::ifNotSQLValue($item_type_or_sql);
        $entity_id_or_sql = ConvertToSQLValue::ifNotSQLValue($entity_id_or_sql);
        
        $sql_value = $clean_title;
        $sql_value = $sql_value->
        append("-")->append($subtype_or_sql->append("-"))->
        append($item_type_or_sql)->append("-")->append($entity_id_or_sql);
        return $sql_value;*/
    }

    public function conditional_sub_type_code()
    {
        return 
            Db::fields()->product_type_code()->if_(Db::fields()->product_type_code()->trim()->length()->isNotEqualToInt(0))->
            else_(
                Db::fields()->facility_type_code()->if_(Db::fields()->facility_type_code()->trim()->length()->isNotEqualToInt(0))->
                else_(
                    Db::fields()->work_type_code()->if_(Db::fields()->work_type_code()->trim()->length()->isNotEqualToInt(0))->
                    else_(
                        Db::fields()->event_type_code()->if_(Db::fields()->event_type_code()->trim()->length()->isNotEqualToInt(0))->
                        else_(
                            Db::fields()->article_type_code()->if_(Db::fields()->article_type_code()->trim()->length()->isNotEqualToInt(0))->
                            else_(
                                Db::fields()->profile_type_code()->if_(Db::fields()->profile_type_code()->trim()->length()->isNotEqualToInt(0))->
                                else_(
                                    Db::fields()->status_type_code()->if_(Db::fields()->status_type_code()->trim()->length()->isNotEqualToInt(0))->
                                    else_(
                                        new SQLString("")
                                    )
                                )
                            )
                        )
                    )
                )
            )
            ;
    }

    public function get_value_list_from_csv($csv_string)
    {

        $parts = explode(",",$csv_string);
        if(is_array($parts)){
            $sql_value_list = new SQLValueList();
            foreach ($parts as $part){
                $sql_value_list->add(ConvertToSQLValue::ifNotSQLValue($part));
            }
            return $sql_value_list;
        }
    }

}
