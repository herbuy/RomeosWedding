<?php
class LinkToPage extends SmartLink{
    //todo": override this class to provide links in your application
}
class LinkToLoginPage extends LinkToPage{
    public function __construct()
    {
        parent::__construct();
        $this->set_href(ui::urls()->loginPage());
    }
}

class LinkToAdminPage extends LinkToPage{
    public function __construct()
    {
        parent::__construct();
        $this->set_href(ui::urls()->adminPage());
    }
}
