<?php
class SearchTaskForGetPostsThatMatchQuery extends SearchTask{
    private $all_suffixes;
    private $sql_test;

    public function finished($sender)
    {
        $this->merge_all_suffixes($sender);
        $this->buildWhereClause();
        //$this->getPostsFromIndex();

        //print "working";


        //build query

        //extends query
        //order posts
        //find results
        //return results
    }

    private function buildWhereClause()
    {
        $all_suffixes = $this->all_suffixes;
        if (is_array($all_suffixes) && count($all_suffixes) > 0) {
            $sql_value_list = new SQLValueList();
            foreach ($all_suffixes as $suffix) {
                $sql_value_list->add(new SQLString($suffix));
            }
            $sql_test = Db::fields()->stem_suffix()->inList($sql_value_list);
            $this->sql_test = $sql_test;
        } else {
            $this->sql_test = (new SQLInt(1))->isEqualToInt(0);
        }
    }

    /**
     * @param \SearchDelegate $sender
     */
    private function merge_all_suffixes($sender)
    {
        $suffixes_per_stem = $sender->get_suffixes_per_stem();
        //merge suffixes irrespective of stem
        $iterator = new SearchWordIterator(array_values($suffixes_per_stem));
        $all_suffixes = [];
        while ($iterator->has_next()) {
            $all_suffixes = array_merge($all_suffixes, $iterator->get_next());
        }
        $this->all_suffixes = $all_suffixes;
    }
    
    
    private $query_for_index_posts;

    public function get($start_index,$max_number)
    {
        $query = new SelectQueryForApplication();
        $query->from(app::values()->post_search_index());
        $query->where($this->sql_test);
        $query->group_by(Db::fields()->post_id());
        $query->select(Db::fields()->post_id());
        $query->select(Db::fields()->stem_suffix_weight()->sum()->as_(app::values()->total_stem_suffix_weight()));
        $query->limit($start_index, $max_number);
        return $query;
        
    }
}

abstract class SearchTaskForAddPostSectionSuffixes extends SearchTask{


    private $suffixes_per_stem;
    private $counts_per_stem;

    public function finished($sender)
    {
        $this->suffixes_per_stem = $sender->get_suffixes_per_stem();
        $this->counts_per_stem = $sender->get_count_per_stem();        
    }

    public function get_command_list($file_name, $min_location_weight,$max_location_weight)
    {
        $weight_range = $max_location_weight - $min_location_weight;
        $command_list = new SQLCommandListForMotokaviews();
        if (is_array($this->suffixes_per_stem) && is_array($this->counts_per_stem) && count($this->suffixes_per_stem) == count($this->counts_per_stem)) {
            foreach ($this->suffixes_per_stem as $stem => $suffixes) {
                $count = $this->counts_per_stem[$stem];
                for ($suffix_index = 0; $suffix_index < count($suffixes); $suffix_index++) {
                    $suffix = $suffixes[$suffix_index];
                    $fractional_length = strlen($suffix) / strlen($stem);
                    $weight = $min_location_weight + $weight_range * $fractional_length * log10(10 + $count);// * min( $count / 1000,1);


                    $command_list->add(
                        $this->get_single_query($max_location_weight, $min_location_weight, $file_name, $stem, $count, $suffix, $weight));
                }

            }
        }
        return $command_list;
    }

    abstract protected function get_single_query($max_location_weight, $min_location_weight, $file_name, $stem, $count, $suffix, $weight);

}

class SearchTaskForAddPostTitleSuffixes extends SearchTaskForAddPostSectionSuffixes{
    protected function get_single_query($max_location_weight, $min_location_weight, $file_name, $stem, $count, $suffix, $weight)
    {
        return new QueryForAddPostTitleSuffixes(
            $file_name,
            $stem,
            $count,
            0,
            $min_location_weight,
            $max_location_weight,
            $suffix,
            $weight

        );
    }
}
class SearchTaskForAddPostContentSuffixes extends SearchTaskForAddPostSectionSuffixes{
    protected function get_single_query($max_location_weight, $min_location_weight, $file_name, $stem, $count, $suffix, $weight)
    {
        return new QueryForAddPostContentSuffixes(
            $file_name,
            $stem,
            $count,
            0,
            $min_location_weight,
            $max_location_weight,
            $suffix,
            $weight

        );
    }
}