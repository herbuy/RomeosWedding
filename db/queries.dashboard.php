<?php

class QueryForGetContentAudit extends SelectQueryForApplication{
    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->posts());
        $this->group_by(app::values()->item_type_code());
        $this->select_field(app::values()->item_type_code());
        $this->select_count_everything(new SQLIdentifier(app::values()->total()));

        //todo: we could update the items type table with these totals and let totals be incremented after new post
    }
}

class QueryForGetComments extends SelectQueryForApplication{

    public function __construct()
    {
        parent::__construct();
        $this->from(app::values()->comments())->
        select_everything();
    }
}
