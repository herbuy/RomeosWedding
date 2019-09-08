<?php
class DataPageFunctions{
    public static function get_array()
    {
        return array(
            app::values()->get_posts_by_current_user(),            
            app::values()->get_posts(),
            
            app::values()->get_posts_by_user(),
            app::values()->get_posts_by_search_query(),
            app::values()->get_related_posts(),
            
            app::values()->get_posts_latest_1(),
            app::values()->get_posts_latest_2(),
            app::values()->get_posts_latest_3(),
                        
            app::values()->get_post(),
            app::values()->register_the_view(),
            app::values()->update_item_score(),
            app::values()->get_most_recent_post(),

            app::values()->get_current_user(),
            app::values()->get_user(),
            app::values()->get_users_except(),
            

            #====content mgt related
            app::values()->get_draft_post(),
            app::values()->get_draft_posts(),
            app::values()->get_extended_post_content(),
            app::values()->get_extended_post_tokens(),
            app::values()->get_comments(),
            app::values()->get_comments_for_post(),
            
            app::values()->get_file_content(),
            app::values()->admin_get_stats_per_section(),
            app::values()->admin_get_stats_per_year(),
            app::values()->admin_get_stats_per_month(),
            app::values()->admin_get_stats_per_week(),
            app::values()->admin_get_stats_per_day(),

            app::values()->get_content_audit(),

            app::values()->get_photo_credits_for_post(),

            //todo: add more commands here as your app grows
            app::values()->departments(),
            app::values()->department(),
                        
            app::values()->item_types(),
            app::values()->product_types(),
            app::values()->work_types(),
            app::values()->facility_types(),
            app::values()->event_types(),
            app::values()->article_types(),
            app::values()->profile_types(),
            app::values()->status_types(),

            //===== product type, wor type, etc
            app::values()->product_type(),
            app::values()->work_type(),
            app::values()->facility_type(),
            app::values()->article_type(),
            app::values()->event_type(),
            app::values()->profile_type(),
            app::values()->status_type(),
            
            //======= footer pages
            app::values()->products(),
            app::values()->facilities(),
            app::values()->work(),
            app::values()->articles(),
            app::values()->events(),
            app::values()->profiles(),
            app::values()->status_updates(),
            

            //======= by department
            app::values()->products_in_department(),
            app::values()->facilities_in_department(),
            app::values()->work_in_department(),
            app::values()->articles_in_department(),
            app::values()->events_in_department(),
            app::values()->profiles_in_department(),

            //===== posts by profile type, etc
            app::values()->products_by_type(),
            app::values()->work_by_type(),
            app::values()->facilities_by_type(),
            app::values()->events_by_type(),
            app::values()->profiles_by_type(),
            app::values()->articles_by_type(),

            //records
            app::values()->most_views(),
            app::values()->most_likes(),
            app::values()->most_comments(),
            app::values()->most_recent(),
            app::values()->oldest_pages(),
            
            //OLAP
            app::values()->super_admin_get_days_with_posts(),
            app::values()->super_admin_get_users_with_posts(),
            app::values()->super_admin_get_posts_published_on_selected_days()

        );
    }
}