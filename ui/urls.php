<?php

abstract class UrlForResource{
    //todo: baseclass for all internal urls in your application
    
    ///----- CHANGE THIS LINE TO TRUE IF APP IS ONLINE

    //===================
    /** @var WebAddress $web_address */
    private $web_address;
    public function __construct()
    {
        $this->web_address = app::settings()->build_web_address($this->getAddressObject());
        //$this->web_address->set_fragment(PageSectionId::top());

    }

    protected function add_path_part($string){
        if(strlen(trim($string)) < 1){
            return;
        }
        $this->web_address->add_path_part($string);
    }
    protected function add_path_part_if($condition,$string){
        if(!$condition){
            return;
        }
        $this->add_path_part($string);
    }

    public function add_is_iframe(){
        $this->add_path_part(app::values()->ifrm());
        return $this;
    }
    protected function set_file_name($string){
        $this->web_address->set_file_name($string);
    }
    protected function set_query_parameter($key,$value){
        $this->web_address->set_query_parameter($key,$value);
    }
    protected function set_fragment($string){
        $this->web_address->set_fragment($string);
    }

    protected function getAddressObject()
    {
        return new HttpWebAddress();
    }
    public function __toString()
    {
        //===========
        $full_url_as_String = $this->web_address->__toString();        
        //app::sitemap()->addUrlFromString($full_url_as_String);
        return $full_url_as_String;
    }
    public function addToSitemap(){
        app::sitemap()->addUrlFromString($this->web_address->__toString());
        return $this;
    }
    
    public function gotoAddress(){
        $address_string = $this->__toString();
        header("location: $address_string");
    }

    public function gotoAddressIf($condition)
    {
        if ($condition) {
            $this->gotoAddress();
        }
    }
    public function gotoAddressIfSubmittedForm(){        
        $this->gotoAddressIf(
            ContentTypeSentToServer::get()->is_multi_part_form_data()
        );
    }

    public function toImage(){
        $img = new SmartImage($this);
        return $img;
    }
    
    public function toLink($content = ''){
        $link = ui::html()->anchor();
        $link->set_href($this);
        if(trim($content) != ""){
            $link->add_child($content);
        }
        $link->set_attribute("onClickSetToaster","Loading.. please wait");
        return $link;
    }

    public function toLinkTargetingIframe($content = ''){
        $this->add_is_iframe();
        
        $link = $this->toLink($content);
        $link->
        set_attribute("target","my_iframe")->
        set_attribute('onclick',"iframe_load_url('my_iframe','$this');");
        return $link;
    }
    public function toForm(){
        $form = new SmartTaskForm();
        $form->set_url($this);
        return $form;
    }

}
class UrlForHome extends UrlForResource{
    
}

class UrlForAsset extends UrlForResource{
    public function __construct($file_name)
    {
        parent::__construct();
        $this->add_path_part(app::values()->assets());
        $this->add_path_part($file_name);
    }
}
class UrlForAds extends UrlForResource{
    public function __construct($file_name)
    {
        parent::__construct();
        $this->add_path_part(app::values()->assets());
        $this->add_path_part(app::values()->ads());
        $this->add_path_part($file_name);
    }
}
class UrlForAssetForDepartment extends UrlForResource{
    public function __construct($file_name)
    {
        parent::__construct();
        $this->add_path_part(app::values()->assets());
        $this->add_path_part(app::values()->dpts());
        $this->add_path_part($file_name);
    }
}
class UrlForAdminPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->admin());
    }
}

class UrlForSuperAdminPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->super_admin());
    }
}

class UrlForSuperAdminDailyPerformance extends UrlForSuperAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->daily_performance());
    }
}

class UrlForSuperAdminDailyPerformancePostsPublishedOnSelectedDays extends UrlForSuperAdminDailyPerformance{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->posts_published());
    }
}

class UrlForCreateAccountPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->create_account());
    }
}

class UrlForLoginPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->login());
    }
}

class UrlForSearchPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->search());
    }
}

class UrlForStatistics extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->statistics());
    }
}

class UrlForAbout extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->about());
    }
}

class UrlForContactUs extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->contact_us());
    }
}
abstract class UrlForAdminEdit extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->edit());
    }
}

abstract class UrlForAdminEditPostBaseClass extends UrlForAdminEdit{
    public function __construct($section_name,$post_id,$field_name = null)
    {
        parent::__construct();
        $this->add_path_part($section_name);
        $this->add_path_part($post_id);
        if(!is_null($field_name)){
            $this->add_path_part($field_name);
        }
    }
}

class UrlForAdminEditPost extends UrlForAdminEditPostBaseClass{
    public function __construct($post_id)
    {
        parent::__construct(app::values()->post(),$post_id);
    }
}

class UrlForAdminEditPostPreview extends UrlForAdminEditPostBaseClass{
    public function __construct($post_id)
    {
        parent::__construct(app::values()->post(),$post_id,app::values()->preview());
    }
}

class UrlForAdminEditPostTitle extends UrlForAdminEditPostBaseClass{
    public function __construct($post_id)
    {
        parent::__construct(app::values()->post(),$post_id,app::values()->title());
    }
}

class UrlForAdminEditPostImage extends UrlForAdminEditPostBaseClass{
    public function __construct($post_id)
    {
        parent::__construct(app::values()->post(),$post_id,app::values()->photo());
    }
}

class UrlForAdminEditPostContent extends UrlForAdminEditPostBaseClass{
    public function __construct($post_id)
    {
        parent::__construct(app::values()->post(),$post_id,app::values()->content());
    }
}
class UrlForAdminEditExtendedPostContent extends UrlForAdminEditPostContent{
    public function __construct($post_id)
    {
        parent::__construct($post_id);
        $this->add_path_part(app::values()->extended());
    }
}

class UrlForAdminChangePostPicture extends UrlForAdminEditPost{
    public function __construct($post_id)
    {
        parent::__construct($post_id);
        $this->add_path_part(app::values()->picture());
    }
}


class UrlForViewPost extends UrlForResource{
    public function __construct($post_id)
    {
        parent::__construct();
        $this->add_path_part(app::values()->posts());
        $this->add_path_part($post_id);
    }
}

class UrlForUser extends UrlForResource{
    public function __construct($file_name)
    {
        parent::__construct();        
        $this->add_path_part($file_name);
        $this->add_path_part(app::values()->profile());
    }
}

class UrlForViewImage extends UrlForResource{
    public function __construct($post_id)
    {
        parent::__construct();
        $this->add_path_part(app::values()->images());
        $this->add_path_part(app::values()->get());
        $this->add_path_part($post_id);
    }
}

abstract class UrlForAdminView extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->view());
    }
}

class UrlForAdminProducts extends UrlForAdminPage{
    public function __construct($type='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->products());
        $this->add_path_part($type);

    }
}
class UrlForAdminFacilities extends UrlForAdminPage{
    public function __construct($type='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->facilities());
        $this->add_path_part($type);
    }
}
class UrlForAdminWork extends UrlForAdminPage{
    public function __construct($type='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->work());
        $this->add_path_part($type);
    }
}
class UrlForAdminProfiles extends UrlForAdminPage{
    public function __construct($type='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->profiles());
        $this->add_path_part($type);
    }
}
class UrlForAdminPhotos extends UrlForAdminPage{
    public function __construct($type='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->photos());
        $this->add_path_part($type);
    }
}
class UrlForAdminTips extends UrlForAdminPage{
    public function __construct($type='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->tips());
        $this->add_path_part($type);
    }
}
class UrlForAdminStatusUpdates extends UrlForAdminPage{
    
    public function __construct($type='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->status());
        $this->add_path_part($type);
    }
}


class UrlForAdminViewPosts extends UrlForAdminView{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->posts());
    }
}
class UrlForAdminPreviewDraftPosts extends UrlForAdminViewPosts{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->preview());
    }
}

class UrlForAdminViewPostsPublished extends UrlForAdminViewPosts{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->published());
    }
}

class UrlForAdminManagePost extends UrlForAdminViewPosts{
    public function __construct($post_id)
    {
        parent::__construct();
        $this->add_path_part($post_id);
    }
}

class UrlForAttachPictureToPost extends UrlForAdminManagePost{
    public function __construct($post_id)
    {
        parent::__construct($post_id);
        $this->add_path_part(app::values()->add_image());
    }
}

class UrlForManagePictures extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->images());
    }
}
class UrlForAddPictures extends UrlForManagePictures{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->add());
    }
}

//todo: app specific
class UrlForDepartmentPage extends UrlForResource{
    public function __construct($department_code)
    {
        parent::__construct();
        $this->add_path_part($department_code);
        $this->add_path_part("section");
    }
}

class UrlForProductsPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->products());
    }
}
class UrlForFacilitiesPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->facilities());
    }
}
class UrlForWorkPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->work());
    }
}
class UrlForArticlesPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->articles());
    }
}
class UrlForProfilesPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->profiles());
    }
}
class UrlForEventsPage extends UrlForResource{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->events());
    }
}

class UrlForProductTypePage extends UrlForResource{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->add_path_part($type_code);
        $this->add_path_part(app::values()->for_hire_or_sale());
        $this->add_path_part(app::values()->best());
        $this->add_path_part(app::values()->products());
    }
}

class UrlForProfileTypePage extends UrlForResource{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->add_path_part($type_code);
        $this->add_path_part(app::values()->for_hire());
        $this->add_path_part(app::values()->best());
        $this->add_path_part(app::values()->service_providers());
    }
}

class UrlForFacilityTypePage extends UrlForResource{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->add_path_part($type_code);
        $this->add_path_part(app::values()->for_hire());
        $this->add_path_part(app::values()->best());
        $this->add_path_part(app::values()->facilities());
    }
}

class UrlForWorkTypePage extends UrlForResource{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->add_path_part($type_code);
        $this->add_path_part(app::values()->best());
        $this->add_path_part(app::values()->work());
    }
}

class UrlForEventTypePage extends UrlForResource{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->add_path_part($type_code);
        $this->add_path_part(app::values()->best());
        $this->add_path_part(app::values()->events());
    }
}

class UrlForArticleTypePage extends UrlForResource{
    public function __construct($type_code)
    {
        parent::__construct();
        $this->add_path_part($type_code);
        $this->add_path_part(app::values()->best());
        $this->add_path_part(app::values()->articles());
    }
}

 
class UrlForAdminAddPost extends UrlForAdminPage{
    public function __construct($item_type_code='')
    {
        parent::__construct();
        $this->add_path_part(app::values()->add());
        $this->add_path_part_if($item_type_code,$item_type_code);
    }
}

class UrlForAdminAddProduct extends UrlForAdminAddPost{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->product());
    }
}
class UrlForAdminAddProductOfType extends UrlForAdminAddProduct{
    public function __construct($type)
    {
        parent::__construct();
        $this->add_path_part($type);
    }
}
class UrlForAdminAddFacility extends UrlForAdminAddPost{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->facility());
    }
}
class UrlForAdminAddFacilityOfType extends UrlForAdminAddFacility{
    public function __construct($type)
    {
        parent::__construct();
        $this->add_path_part($type);
    }
}
class UrlForAdminAddWork extends UrlForAdminAddPost{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->work());
    }
}
class UrlForAdminAddWorkOfType extends UrlForAdminAddWork{
    public function __construct($type)
    {
        parent::__construct();
        $this->add_path_part($type);
    }
}
class UrlForAdminAddArticle extends UrlForAdminAddPost{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->article());
    }
}
class UrlForAdminAddArticleOfType extends UrlForAdminAddArticle{
    public function __construct($type)
    {
        parent::__construct();
        $this->add_path_part($type);
    }
}

class UrlForAdminAddEvent extends UrlForAdminAddPost{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->event());
    }
}
class UrlForAdminAddEventOfType extends UrlForAdminAddEvent{
    public function __construct($type)
    {
        parent::__construct();
        $this->add_path_part($type);
    }
}
class UrlForAdminAddProfile extends UrlForAdminAddPost{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->profile());
    }
}
class UrlForAdminAddProfileOfType extends UrlForAdminAddProfile{
    public function __construct($type)
    {
        parent::__construct();
        $this->add_path_part($type);
    }
}

class UrlForAdminAddStatusUpdate extends UrlForAdminAddPost{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->status_update());
    }
}

class UrlForAdminAddStatusUpdateOfType extends UrlForAdminAddStatusUpdate{
    public function __construct($type)
    {
        parent::__construct();
        $this->add_path_part($type);
    }
}

class UrlForAdminContentOnBoardingPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_onboarding());
    }
}

class UrlForAdminContentPlanningPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_planning());
    }
}
class UrlForAdminContentResearchPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_research_and_ideation());
    }
}
class UrlForAdminContentCreationPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_creation());
    }
}
class UrlForAdminContentEditingPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_editing());
    }
}
class UrlForAdminContentAuditingPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_auditing());
    }
}
class UrlForAdminQualityAndCredibilityPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_quality_and_credibility());
    }
}
class UrlForAdminContentExpertRoundUpPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_expert_round_up());
    }
}
class UrlForAdminContentInboundPage extends UrlForAdminPage{
    public function __construct()
    {
        parent::__construct();
        $this->add_path_part(app::values()->content_inbound());
    }
}

