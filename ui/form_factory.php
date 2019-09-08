<?php
class FormFactory{

    public function create_account()
    {
        return new FormForCreateAccount();
    }
    public function login()
    {
        return new FormForLogin();
    }
    public function logout()
    {
        return new FormForLogout();
    }
    public function start_new_post($reader_for_sections)
    {
        return new FormForStartNewPost($reader_for_sections);
    }
    
    public function edit_post_content($reader_for_post)
    {
        return new FormForEditPostContent($reader_for_post);
    }
    public function edit_post_content2()
    {
        return new FormForEditPostContent2();
    }
    public function edit_extended_post_content($reader_for_post)
    {
        return new FormForEditExtendedPostContent($reader_for_post);
    }
    public function edit_post_title($reader_for_post)
    {
        return new FormForEditPostTitle($reader_for_post);
    }
    public function edit_post_title2()
    {
        return new FormForEditPostTitle2();
    }
    
    public function edit_post_picture($reader_for_post)
    {
        return new FormForEditPostPicture($reader_for_post);
    }
    public function edit_post_picture2()
    {
        return new FormForEditPostPicture2();
    }
    
    public function edit_post_video($reader_for_post)
    {
        return new FormForEditPostVideo($reader_for_post);
    }
    public function add_photo_credits($reader_for_post,$reader_for_work_type)
    {
        return new FormForAddPhotoCredits($reader_for_post,$reader_for_work_type);
    }

    public function delete_post($file_name)
    {
        return new FormForDeletePost($file_name);
    }

    public function publish_post($file_name)
    {
        return new FormForPublishPost($file_name);
    }
    public function unpublish_post($file_name)
    {
        return new FormForUnPublishPost($file_name);
    }
    public function unpublish_selected_posts()
    {
        return new FormForUnPublishSelectedPosts();
    }
    public function publish_selected_posts()
    {
        return new FormForPublishSelectedPosts();
    }

    public function post_comment($file_name)
    {
        return new FormForPostComment($file_name);
    }
    public function approve_comment($entity_id)
    {
        return new FormForApproveComment($entity_id);
    }
    public function move_comment_to_trash($entity_id)
    {
        return new FormForMoveCommentToTrash($entity_id);
    }
    public function move_comment_to_spam($entity_id)
    {
        return new FormForMoveCommentToSpam($entity_id);
    }
    

    public function publish_all_posts()
    {
        return new FormForPublishAllPosts();
    }

    public function create_multiple_posts($num_records,$reader_for_sections)
    {
        return new FormForInsertBulkPosts($num_records,$reader_for_sections);
    }

    public function attach_picture_to_post($reader_for_post)
    {
        return new FormForAttactPictureToPost($reader_for_post);
    }

    //todo: app sepcific forms
    

}