<?php

class BrowserFieldForPage extends BrowserField{
    //todo: a means to convert the browser field for pahe to a page object
    protected function getName()
    {
        return app::values()->page();
    }
    public function toPage(){
        $page = null;
        switch ($this->value()){
            default:
                $page = ui::pages()->home();
                break;
            case app::values()->create_account():
                $page = ui::pages()->create_account();
                break;
            case app::values()->login():
                $page = ui::pages()->login();
                break;
            case app::values()->search():
                $page = ui::pages()->search();
                break;

            case app::values()->admin():
                $page = ui::pages()->admin();
                break;
            case app::values()->super_admin():
                $page = ui::pages()->super_admin();
                break;
            case app::values()->super_admin_daily_performance():
                $page = ui::pages()->super_admin_daily_performance();
                break;
            case app::values()->super_admin_get_posts_published_on_selected_days():
                $page = ui::pages()->super_admin_get_posts_published_on_selected_days();
                break;
            
                
            case app::values()->admin_add_images():
                $page = ui::pages()->admin_add_images();
                break;
            case app::values()->admin_view_posts():
                $page = ui::pages()->admin_view_posts();
                break;
            case app::values()->admin_preview_draft_posts():
                $page = ui::pages()->admin_preview_draft_posts();
                break;
                

            case app::values()->admin_view_posts_published():
                $page = ui::pages()->admin_view_posts_published();
                break;
            case app::values()->admin_statistics():
                $page = ui::pages()->admin_statistics();
                break;
            case app::values()->admin_edit_post():
                $page = ui::pages()->admin_edit_post();
                break;
            case app::values()->admin_edit_post_preview():
                $page = ui::pages()->admin_edit_post_preview();
                break;
            case app::values()->admin_edit_post_title():
                $page = ui::pages()->admin_edit_post_title();
                break;
            case app::values()->admin_edit_post_photo():
                $page = ui::pages()->admin_edit_post_photo();
                break;
            case app::values()->admin_edit_post_content():
                $page = ui::pages()->admin_edit_post_content();
                break;
            case app::values()->admin_edit_extended_post_content():
                $page = ui::pages()->admin_edit_extended_post_content();
                break;
            case app::values()->admin_edit_post_picture():
                $page = ui::pages()->admin_edit_post_picture();
                break;

            case app::values()->admin_add():
                $page = ui::pages()->admin_add();
                break;
            case app::values()->admin_add_product():
                $page = ui::pages()->admin_add_product();
                break;
            case app::values()->admin_add_facility():
                $page = ui::pages()->admin_add_facility();
                break;
            case app::values()->admin_add_work():
                $page = ui::pages()->admin_add_work();
                break;
            case app::values()->admin_add_article():
                $page = ui::pages()->admin_add_article();
                break;
            case app::values()->admin_add_event():
                $page = ui::pages()->admin_add_event();
                break;
            case app::values()->admin_add_profile():
                $page = ui::pages()->admin_add_profile();
                break;
            case app::values()->admin_add_status_update():
                $page = ui::pages()->admin_add_status_update();
                break;

            case app::values()->admin_add_product_of_type():
                $page = ui::pages()->admin_add_product_of_type();
                break;
            case app::values()->admin_add_facility_of_type():
                $page = ui::pages()->admin_add_facility_of_type();
                break;
            case app::values()->admin_add_work_of_type():
                $page = ui::pages()->admin_add_work_of_type();
                break;
            case app::values()->admin_add_article_of_type():
                $page = ui::pages()->admin_add_article_of_type();
                break;
            case app::values()->admin_add_event_of_type():
                $page = ui::pages()->admin_add_event_of_type();
                break;
            case app::values()->admin_add_profile_of_type():
                $page = ui::pages()->admin_add_profile_of_type();
                break;
            case app::values()->admin_add_status_update_of_type():
                $page = ui::pages()->admin_add_status_update_of_type();
                break;

            case app::values()->get_post():
                $page = ui::pages()->get_post();
                break;
            case app::values()->attach_image_to_post():
                $page = ui::pages()->attach_image_to_post();
                break;

            case app::values()->about():
                $page = ui::pages()->about_us();
                break;
            case app::values()->contact_us():
                $page = ui::pages()->contact_us();
                break;

            //todo: app specific
            case app::values()->department():
                $page = ui::pages()->department();
                break;

            case app::values()->products():
                $page = ui::pages()->products();
                break;
            case app::values()->work():
                $page = ui::pages()->work();
                break;
            case app::values()->facilities():
                $page = ui::pages()->facilities();
                break;
            case app::values()->articles():
                $page = ui::pages()->articles();
                break;
            case app::values()->events():
                $page = ui::pages()->events();
                break;
            case app::values()->profiles():
                $page = ui::pages()->profiles();
                break;
            case app::values()->user_profile():
                $page = ui::pages()->user_profile();
                break;

            case app::values()->product_type():
                $page = ui::pages()->product_type();
                break;
            case app::values()->work_type():
                $page = ui::pages()->work_type();
                break;
            case app::values()->facility_type():
                $page = ui::pages()->facility_type();
                break;
            case app::values()->article_type():
                $page = ui::pages()->article_type();
                break;
            case app::values()->event_type():
                $page = ui::pages()->event_type();
                break;
            case app::values()->profile_type():
                $page = ui::pages()->profile_type();
                break;

            case app::values()->admin_products():
                $page = ui::pages()->admin_products();
                break;
            case app::values()->admin_facilities():
                $page = ui::pages()->admin_facilities();
                break;
            case app::values()->admin_work():
                $page = ui::pages()->admin_work();
                break;
            case app::values()->admin_profiles():
                $page = ui::pages()->admin_profiles();
                break;

            case app::values()->admin_photos():
                $page = ui::pages()->admin_photos();
                break;
            case app::values()->admin_tips():
                $page = ui::pages()->admin_tips();
                break;
            
            case app::values()->admin_status():
                $page = ui::pages()->admin_status();
                break;
            

            case app::values()->content_onboarding():
                $page = ui::pages()->content_onboarding();
                break;
            case app::values()->content_planning():
                $page = ui::pages()->content_planning();
                break;
            case app::values()->content_research_and_ideation():
                $page = ui::pages()->content_research_and_ideation();
                break;
            case app::values()->content_creation():
                $page = ui::pages()->content_creation();
                break;
            case app::values()->content_editing():
                $page = ui::pages()->content_editing();
                break;
            case app::values()->content_auditing():
                $page = ui::pages()->content_auditing();
                break;
            case app::values()->content_quality_and_credibility():
                $page = ui::pages()->content_quality_and_credibility();
                break;
            case app::values()->content_expert_round_up():
                $page = ui::pages()->content_expert_round_up();
                break;
            case app::values()->content_inbound():
                $page = ui::pages()->content_inbound();
                break;
            case app::values()->content_publishing():
                $page = ui::pages()->content_publishing();
                break;
            case app::values()->content_promotion():
                $page = ui::pages()->content_promotion();
                break;
            case app::values()->content_marketing():
                $page = ui::pages()->content_marketing();
                break;
            case app::values()->content_guest_posts():
                $page = ui::pages()->content_guest_posts();
                break;
            case app::values()->content_statistics_and_records():
                $page = ui::pages()->content_statistics_and_records();
                break;
            case app::values()->content_outdated():
                $page = ui::pages()->content_outdated();
                break;
            case app::values()->content_memes():
                $page = ui::pages()->content_memes();
                break;

        }
        return $page;

    }
}