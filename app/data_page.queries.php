<?php

class DataPageQuery{
    public static function from_function_name($function_name){
        $result = null;
        switch ($function_name){
            case app::values()->get_current_user():
                $result = Db::queries()->get_current_user();
                break;
            case app::values()->get_user():
                $result = Db::queries()->get_user(app::argument()->file_name()->getValue())->limit(0,1);
                break;
            case app::values()->get_users_except():
                $result = Db::queries()->get_users_except(app::argument()->file_name()->getValue())->limit(0,10);
                break;
            
            //todo: not yet doneb
            
            case app::values()->get_posts():
                $result = Db::queries()->posts()->published()->all_types();
                break;
            case app::values()->super_admin_get_days_with_posts():
                $result = Db::queries()->super_admin()->get_days_with_posts();
                break;
            case app::values()->super_admin_get_users_with_posts():
                $result = Db::queries()->super_admin()->get_users_with_posts();
                break;
            case app::values()->super_admin_get_posts_published_on_selected_days():
                $result = Db::queries()->super_admin()->get_posts_published_on_selected_days();
                break;
                
            case app::values()->get_posts_by_current_user():
                $result = Db::queries()->posts()->published()->current_user()->get();                
                break;
            case app::values()->get_posts_by_user():
                $result = Db::queries()->posts()->published()->by_user(app::argument()->file_name()->getValue())->get();                
                break;
            case app::values()->get_posts_by_search_query():
                $result = Db::queries()->posts()->published()->by_search_query(app::argument()->optional_search_query()->getValue())->get();
                break;
            case app::values()->get_related_posts():
                $result = Db::queries()->posts()->published()->get_related_posts(app::argument()->file_name()->getValue())->get();
                break;
            case app::values()->get_posts_latest_1():
                $result = Db::queries()->posts()->published()->all_types()->limit(0,50);
                break;
            case app::values()->get_posts_latest_2():
                $result = Db::queries()->posts()->published()->all_types()->limit(50,50);
                break;
            case app::values()->get_posts_latest_3():
                $result = Db::queries()->posts()->published()->all_types()->limit(100,50);
                break;
            
            case app::values()->get_draft_posts():
                $result = Db::queries()->posts()->draft()->all_types();
                break;
            
            case app::values()->get_post():                
                $result = Db::queries()->posts()->published()->find_by_file_name(app::argument()->file_name());
                break;
            case app::values()->register_the_view():                
                $result = Db::queries()->views()->add(app::argument()->file_name()->getValue());
                break;
            case app::values()->update_item_score():
                $result = Db::queries()->update_item_score(app::argument()->file_name()->getValue());
                break;
            case app::values()->get_draft_post():
                $result = Db::queries()->posts()->draft()->find_by_file_name(app::argument()->file_name());
                break;

            case app::values()->get_most_recent_post():
                $result = Db::queries()->getMostRecentPost();
                break;

            case app::values()->get_file_content():
                $result = Db::queries()->getFileContent();
                break;
            case app::values()->get_extended_post_content():
                $result = Db::queries()->getExtendedPostContent(app::argument()->file_name());
                break;
            case app::values()->get_extended_post_tokens():
                $result = Db::queries()->getExtendedPostTokens(app::argument()->file_name());
                break;
            case app::values()->get_comments():
                $result = Db::queries()->comments()->all();
                break;
            case app::values()->get_comments_for_post():
                $result = Db::queries()->comments()->for_post(app::argument()->file_name()->getValue());
                break;

            case app::values()->get_photo_credits_for_post():
                $result = Db::queries()->photo_credits()->photo_credits_for_post(app::argument()->file_name()->getValue());
                break;
            

            //todo: add queries you want supported by the data page here
            case app::values()->departments():
                $result = Db::queries()->departments();
                break;
            case app::values()->department():
                $result = Db::queries()->department(app::argument()->department_code()."");
                break;

            case app::values()->item_types():
                $result = Db::queries()->item()->types();
                break;
            case app::values()->product_types():
                $result = Db::queries()->product()->types();
                break;
            case app::values()->work_types():
                $result = Db::queries()->work()->types();
                break;
            case app::values()->facility_types():
                $result = Db::queries()->facility()->types();
                break;
            case app::values()->event_types():
                $result = Db::queries()->event()->types();
                break;
            case app::values()->article_types():
                $result = Db::queries()->article()->types();
                break;
            case app::values()->profile_types():
                $result = Db::queries()->profile()->types();
                break;
            case app::values()->status_types():
                $result = Db::queries()->status()->types();
                break;

            case app::values()->product_type():
                $result = Db::queries()->product()->type(app::argument()->product_type_code()->getValue());
                break;
            case app::values()->work_type():
                $result = Db::queries()->work()->type(app::argument()->work_type_code()->getValue());
                break;
            case app::values()->facility_type():
                $result = Db::queries()->facility()->type(app::argument()->facility_type_code()->getValue());
                break;
            case app::values()->event_type():
                $result = Db::queries()->event()->type(app::argument()->event_type_code()->getValue());
                break;
            case app::values()->article_type():
                $result = Db::queries()->article()->type(app::argument()->article_type_code()->getValue());
                break;
            case app::values()->profile_type():
                $result = Db::queries()->profile()->type(app::argument()->profile_type_code()->getValue());
                break;
            case app::values()->status_type():
                $result = Db::queries()->status()->type(app::argument()->status_type_code()->getValue());
                break;

                //footer page
            case app::values()->products():
                $result = Db::queries()->posts()->published()->products()->by_type(app::argument()->product_type_code(true)->getValue());
                break;
            case app::values()->work():
                $result = Db::queries()->posts()->published()->work()->by_type(app::argument()->work_type_code(true)->getValue());
                break;
            case app::values()->facilities():
                $result = Db::queries()->posts()->published()->facilities()->by_type(app::argument()->facility_type_code(true)->getValue());
                break;
            case app::values()->events():
                $result = Db::queries()->posts()->published()->events()->by_type(app::argument()->event_type_code(true)->getValue());
                break;
            case app::values()->articles():
                $result = Db::queries()->posts()->published()->articles()->by_type(app::argument()->article_type_code(true)->getValue());
                break;
            case app::values()->profiles():
                $result = Db::queries()->posts()->published()->profiles()->by_type(app::argument()->profile_type_code(true)->getValue());
                break;
            case app::values()->status_updates():
                $result = Db::queries()->posts()->published()->status_updates()->by_type(app::argument()->status_type_code(true)->getValue());
                break;

            //in department
            case app::values()->products_in_department():
                $result = Db::queries()->posts()->published()->products()->in_department(app::argument()->department_code());
                break;
            case app::values()->work_in_department():
                $result = Db::queries()->posts()->published()->work()->in_department(app::argument()->department_code());
                break;
            case app::values()->facilities_in_department():
                $result = Db::queries()->posts()->published()->facilities()->in_department(app::argument()->department_code());
                break;
            case app::values()->events_in_department():
                $result = Db::queries()->posts()->published()->events()->in_department(app::argument()->department_code());
                break;
            case app::values()->articles_in_department():
                $result = Db::queries()->posts()->published()->articles()->in_department(app::argument()->department_code());
                break;
            case app::values()->profiles_in_department():
                $result = Db::queries()->posts()->published()->profiles()->in_department(app::argument()->department_code());
                break;

            case app::values()->products_by_type():
                $result = Db::queries()->posts()->published()->products()->by_type(app::argument()->product_type_code()->getValue());
                break;
            case app::values()->work_by_type():
                $result = Db::queries()->posts()->published()->work()->by_type(app::argument()->work_type_code()->getValue());
                break;
            case app::values()->facilities_by_type():
                $result = Db::queries()->posts()->published()->facilities()->by_type(app::argument()->facility_type_code()->getValue());
                break;
            case app::values()->events_by_type():
                $result = Db::queries()->posts()->published()->events()->by_type(app::argument()->event_type_code()->getValue());
                break;
            case app::values()->articles_by_type():
                $result = Db::queries()->posts()->published()->articles()->by_type(app::argument()->article_type_code()->getValue());
                break;
            case app::values()->profiles_by_type():
                $result = Db::queries()->posts()->published()->profiles()->by_type(app::argument()->profile_type_code()->getValue());
                break;
                       

            //TODO: CONTENT MANAGEMENT RELATED
            case app::values()->admin_get_stats_per_year():
                $result = Db::queries()->get_stats_per_year();
                break;
            case app::values()->admin_get_stats_per_month():
                $result = Db::queries()->get_stats_per_month();
                break;
            case app::values()->admin_get_stats_per_week():
                $result = Db::queries()->get_stats_per_week();
                break;
            case app::values()->admin_get_stats_per_day():
                $result = Db::queries()->get_stats_per_day();
                break;

            case app::values()->get_content_audit():
                $result = Db::queries()->dashbboard()->content_audit();
                break;

            case app::values()->most_views():
                $result = Db::queries()->views()->most();
                break;
            case app::values()->most_likes():
                $result = Db::queries()->likes()->most();
                break;
            case app::values()->most_comments():
                $result = Db::queries()->comments()->most();
                break;
            case app::values()->most_recent():
                $result = Db::queries()->posts()->published()->most_recent();
                break;
            case app::values()->oldest_pages():
                $result = Db::queries()->posts()->published()->oldest();
                break;
        }
        return $result;
    }
}