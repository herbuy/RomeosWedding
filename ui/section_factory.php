<?php
class SectionFactory{
    public function reviews_and_comments(){
        return new SectionForReviewsAndComments();
    }

    public function preNav()
    {
        return new SectionForPreNav();
    }

    public function postOrUpdateArticles()
    {
        return new SectionForPostArticles();
    }

    public function footer($reader_for_current_user)
    {
        return new SectionForTheFooter($reader_for_current_user);
    }

    public function topNav()
    {
        return new SectionForTopNav();
    }

    public function admin_navigation_box()
    {
        return new SectionForAdminNavigationBox();
    }

    public function total_content()
    {
        return new SectionForTotalContent();
    }

    public function article_details($reader,$reader_for_photo_credits)
    {
        return new SectionForArticleDetails($reader,$reader_for_photo_credits);        
    }
    public function article_details_in_preview_mode($reader,$reader_for_photo_credits)
    {
        return new SectionForArticleDetailsInPreviewMode($reader,$reader_for_photo_credits);
    }
    public function extended_post_tokens($reader_for_extended_post_tokens)
    {
        return new SectionForExtendedPostTokens($reader_for_extended_post_tokens);
    }

    public function contact_info()
    {
        $info = new LayoutForNRows();
        $info->addNewRow()->add_child("Tel: +256 0773 035 608");
        $info->addNewRow()->add_child("Email: romeoswedding@gmail.com");
        
        return $info;
    }

    public function actions_for_edit_post($reader_for_post)
    {
        return new ListOfActionsForEditPost($reader_for_post);
    }

    public function edit_post($reader_for_post,$reader_for_extended_post_tokens)
    {
        return new SectionForEditPost($reader_for_post,$reader_for_extended_post_tokens);
    }

    public function header()
    {
        return new PageHeaderForHome();
    }

    public function contact_us()
    {
    }


}