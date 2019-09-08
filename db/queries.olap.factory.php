<?php

class SuperAdminGetPostsPublishedOnSelectedDays extends QueryForGetPosts{
    protected function getAdditionalSQLTest()
    {
        return Db::fields()->date_in_full()->inList(
            Db::computed_values()->get_value_list_from_csv(app::argument()->csv_selected_days()->getValue())
        );
    }
    
}
class FactoryForOLAPQueries{
    public function get_posts_published_on_selected_days()
    {
        
        return new SuperAdminGetPostsPublishedOnSelectedDays();
    }

    public function get_days_with_posts()
    {
        $query = new SelectQueryForApplication();
        $query->from(app::values()->posts());
        $query->select_distinct();
        $query->select(Db::fields()->date_in_full());
        return $query;
    }

    public function get_users_with_posts()
    {
        $query = new SelectQueryForApplication();
        $query->from(app::values()->posts());
        $query->select_distinct();
        $query->select(Db::fields()->author_id())->select(Db::computed_values()->full_name_for_id(Db::fields()->author_id()->as_(app::values()->author_name())));
        return $query;
    }

    
}