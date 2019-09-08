<?php
interface IDecoratableGetPostsQuery{
    /** @return SelectQueryForApplication */
    public function getSelectQuery();
    public function getTableName();
}

class DecoratorForGetPostsQuery{
    /** @param IDecoratableGetPostsQuery $query
     * */
    public function __construct($decoratableGetPostQuery)
    {
        $this->selectFields($decoratableGetPostQuery);
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    protected function selectFields($query)
    {
        $this->select_views($query);
        $this->select_likes($query);
        $this->select_comments($query);
        $this->select_author_name($query);
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_views($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->total_views_on_post(
                Db::fields()->file_name()->inTable($query->getTableName())
            )->as_(app::values()->views())
        );
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_likes($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->total_likes_on_post(
                Db::fields()->file_name()->inTable($query->getTableName())
            )->as_(app::values()->likes())
        );
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_comments($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->total_comments_on_post(
                Db::fields()->file_name()->inTable($query->getTableName())
            )->as_(app::values()->comments())
        );
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_author_name($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->full_name_for_id(
                Db::fields()->author_id()->inTable($query->getTableName())
            )->as_(app::values()->author_name())
        );
    }
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
interface IDecoratableGetPostsQuery0{
    /** @return SelectQueryForApplication */
    public function getSelectQuery();
    public function getTableName();
}

class DecoratorForGetPostsQuery0{
    /** @param IDecoratableGetPostsQuery $query
     * */
    public function __construct($decoratableGetPostQuery)
    {
        $this->selectFields($decoratableGetPostQuery);
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    protected function selectFields($query)
    {
        $query->getSelectQuery()->select_everything();

        $this->select_views($query);
        $this->select_likes($query);
        $this->select_comments($query);
        $this->select_author_name($query);
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_views($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->total_views_on_post(
                Db::fields()->file_name()->inTable($query->getTableName())
            )->as_(app::values()->views())
        );
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_likes($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->total_likes_on_post(
                Db::fields()->file_name()->inTable($query->getTableName())
            )->as_(app::values()->likes())
        );
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_comments($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->total_comments_on_post(
                Db::fields()->file_name()->inTable($query->getTableName())
            )->as_(app::values()->comments())
        );
    }
    /** @param IDecoratableGetPostsQuery $query
     * */
    private function select_author_name($query)
    {
        $query->getSelectQuery()->select(
            Db::computed_values()->full_name_for_id(
                Db::fields()->author_id()->inTable($query->getTableName())
            )->as_(app::values()->author_name())
        );
    }
}