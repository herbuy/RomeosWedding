<?php
class ListFactory{
    
    public function reviews($reader)
    {
        return new StreamOfPostsAt50Percent($reader);
    }
    
    public function admin_draft_posts($reader)
    {
        return new ListOfDraftPosts($reader);
    }

    public function admin_published_posts($reader)
    {
        return new ListOfPublishedPosts($reader);
    }

    public function public_view_of_published_posts($reader)
    {
        return new PublicViewOfPublishedPosts($reader);
    }
    public function stream_on_landing_page($reader)
    {
        return new StreamOnLandingPage($reader);
    }

    public function stats_per_section($reader)
    {
        return new ListOfStatsPerSection($reader,ui::text_with_contrast_colors("SECTION","STATISTICS"));
    }

    public function stats_per_year($reader)
    {
        return new ListOfStatsPerYear($reader,ui::text_with_contrast_colors("YEAR ","STATISTICS"));
    }
    public function stats_per_month($reader)
    {
        return new ListOfStatsPerMonth($reader,ui::text_with_contrast_colors("MONTHLY ","STATISTICS"));
    }
    public function stats_per_week($reader)
    {
        return new ListOfStatsPerWeek($reader,ui::text_with_contrast_colors("WEEKLY ","STATISTICS"));
    }
    public function stats_per_day($reader)
    {
        return new ListOfStatsPerDay($reader,ui::text_with_contrast_colors("DAILY ","STATISTICS"));
    }

    public function departments($reader_for_depts)
    {
        return ui::html()->nav()->add_child( new ListOfDepartments($reader_for_depts));
    }
    public function items_types($reader)
    {
        return ui::html()->nav()->add_child( new ListOfItemTypes($reader));
    }
    public function product_types($reader)
    {
        return ui::html()->nav()->add_child( new ListOfProductTypes($reader));
    }
    public function facility_types($reader)
    {
        return ui::html()->nav()->add_child( new ListOfFacilityTypes($reader));
    }
    public function work_types($reader)
    {
        return ui::html()->nav()->add_child( new ListOfWorkTypes($reader));
    }
    public function event_types($reader)
    {
        return ui::html()->nav()->add_child( new ListOfEventTypes($reader));
    }
    public function article_types($reader)
    {
        return ui::html()->nav()->add_child( new ListOfArticleTypes($reader));
    }
    public function profile_types($reader)
    {
        return ui::html()->nav()->add_child( new ListOfProfileTypes($reader));
    }
}