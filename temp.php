<?php

//TEXT VISITOR

class SearchTextVisitor{
    public function replace_non_alpha($string){
        return preg_replace("/[^\w\s]/i"," ",$string);
    }
    public function split_by_space($string){
        return preg_split("/\s+/i",$string);
    }
    
    
}
class WordArrayVisitor{
    /** returns a new array without un-necessary english words */
    public function remove_unnecessary_words($arr_words){
        return array_values(array_diff($arr_words,$this->unnecessary_words()));
    }
}
class SuffixesVisitor{

}
class PostsVisitor{

}
class ExtendedPostsVisitor{

}
class OrderedPostsVisitor{

}