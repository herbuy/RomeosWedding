<?php
class LinkFactory{
    public function adminPage(){
        return new LinkToAdminPage();
    }
    
    public function login()
    {
        return new LinkToLoginPage();
    }

    public function manage_posts()
    {
        return ui::urls()->manage_posts()->toLink();
    }

    public function view_post($file_name)
    {
        return ui::urls()->view_post($file_name)->toLink();
    }

    public function add_pictures()
    {
        return ui::urls()->add_pictures()->toLink();
    }
    public function attach_picture_to_post($file_name)
    {
        return ui::urls()->attach_picture_to_post($file_name)->toLink();
    }
    public function manage_pictures()
    {
        return ui::urls()->manage_pictures()->toLink();
    }

    public function view_picture($file_name)
    {
        return ui::urls()->view_image($file_name)->toLink();
    }

    public function adminEditPost($file_name)
    {
        return ui::urls()->adminEditPost($file_name)->toLink();
    }
    public function adminEditPostTitle($file_name)
    {
        return ui::urls()->adminEditPostTitle($file_name)->toLink();
    }

    public function adminEditPostContent($file_name)
    {
        return ui::urls()->adminEditPostContent($file_name)->toLink();
    }
    public function adminEditExtendedPostContent($file_name)
    {
        return ui::urls()->adminEditExtendedPostContent($file_name)->toLink();
    }

    public function adminViewPosts()
    {
        return ui::urls()->adminViewPosts()->toLink();
    }

    public function adminViewPostsPublished()
    {
        return ui::urls()->adminViewPostsPublished()->toLink();
    }

    public function adminChangePostPicture($file_name)
    {
        return ui::urls()->adminChangePostPicture($file_name)->toLink();
    }

    public function home()
    {
        return ui::urls()->home()->toLink();
    }


}