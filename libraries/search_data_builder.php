<?php
class SearchWordIterator{
    private $word_array = [];
    private $word_count = 0;
    private $position = 0;
    public function __construct($word_array)
    {
        if(!is_array($word_array)){
            throw new Exception("expected array");
        }
        $this->word_array = $word_array;
        $this->word_count = count($this->word_array);
    }
    public function reset(){
        $this->position = 0;
    }
    public function has_next(){
        return $this->position < $this->word_count;
    }
    public function get_next(){
        if(!$this->has_next()){
            return "";
        }
        $next = $this->word_array[$this->position];
        $this->position +=1;
        return $next;
    }
}
interface ISearchClientToNotify{
    /** @param  SearchDelegate $sender */
    public function finished($sender);
}
abstract class SearchDelegate{
    private $input_text = "";
    private $output = "";
    private $count_per_stem = [], $affixes_per_stem = [];

    private $initialized = false;

    /** @param string $search_query
     * @param \ISearchClientToNotify $client */
    public function initialize($search_query, $client){
        $this->input_text = $search_query;
        $this->output = $this->input_text;

        //1. get suffixes

        //1.1 get key words
        $this->removeNonAlphanum();
        $this->splitBySpace();
        $this->remove_unnecessary_words();


        //2.0 count term frequency
        $this->mapWordsToStems(); //we lose count info
        $this->getCountPerWord();
        $this->count_per_stem = $this->getOutput();
        $this->getAffixesPerStem();
        $this->affixes_per_stem = $this->getOutput();

        $this->initialized = true;
        $client->finished($this);

        //print json_encode($this->getOutput());exit;
    }

    public function get_count_per_stem(){
        $this->throwExceptionIfNot($this->initialized,"first call initialize");
        return $this->count_per_stem;
    }
    public function get_suffixes_per_stem(){
        $this->throwExceptionIfNot($this->initialized,"first call initialize");
        return $this->affixes_per_stem;
    }


    protected function setOutput($value){
        $this->output = $value;
    }
    protected function getOutput(){
        return $this->output;
    }
    protected function throwExceptionIf($condition, $message)
    {
        if($condition){
            throw new Exception($message);
        }
    }
    protected function throwExceptionIfNot($condition, $message)
    {
        $this->throwExceptionIf(!$condition,$message);
    }

    private function removeNonAlphanum()
    {
        $this->setOutput(
            preg_replace("/[^\w\s]/i"," ",$this->getOutput())
        );
    }

    private function splitBySpace()
    {
        $this->setOutput(
            preg_split("/\s+/i",$this->getOutput())
        );
    }



    private function getCountPerWord()
    {
        $this->throwExceptionIfNot(is_array($this->getOutput()),"getCount expected array");
        $iterator = new SearchWordIterator($this->getOutput());
        $output = [];
        while($iterator->has_next()){
            $word = $iterator->get_next();
            if(!array_key_exists($word, $output)){
                $output[$word] = 0;
            }
            $output[$word] += 1;
        }

        $this->setOutput($output);
    }

    private function mapWordsToStems()
    {
        $this->throwExceptionIfNot(is_array($this->getOutput()),"getStem expected array");
        $iterator = new SearchWordIterator($this->getOutput());
        $output = [];
        while($iterator->has_next()){
            $word = $iterator->get_next();
            $stem = $this->get_stem($word);
            $output[] = $stem;
        }
        //we lose the count information
        $this->setOutput($output);

    }

    private function getAffixesPerStem(){
        $iterator = new SearchWordIterator(array_keys($this->getOutput()));
        $ouput = [];
        while($iterator->has_next()){
            $word_or_phrase = $iterator->get_next();
            $only_if_longer_than_number=0;
            $ouput[$word_or_phrase] = array_values(array_unique(array_merge($this->get_suffixes($word_or_phrase,$only_if_longer_than_number),$this->get_prefixes($word_or_phrase,$only_if_longer_than_number))));
        }
        $this->setOutput($ouput);
    }

    private function get_suffixes($word_or_phrase, $only_if_longer_than_number=0){

        /**
        for each letter in word
         * if letter not equal to last, continue
         *else for i = o to that position, add substring
         */

        //input
        $output = [];
        $length_of_string = strlen($word_or_phrase);//get length
        if($length_of_string < 1){
            return $output;
        }
        $last_letter = $word_or_phrase[$length_of_string - 1]; //get last letter




        //processing
        for($current_index = 0; $current_index < $length_of_string; $current_index++){
            $letter_at_index = $word_or_phrase[$current_index]; //get letter
            if($letter_at_index != $last_letter){
                continue;
            }
            for($substring_start_index = 0; $substring_start_index <= $current_index; $substring_start_index++){
                $suffix = trim(substr($word_or_phrase,$substring_start_index,$current_index-$substring_start_index+1));
                //optional processing
                if(strlen($suffix) > $only_if_longer_than_number){
                    $output[$suffix] = "";
                }
            }
        }
        //output
        return array_keys($output);
    }

    private function get_prefixes($word_or_phrase, $only_if_longer_than_number=0){
        /**
        for each letter in word
         * if letter not equal to last, continue
         *else for i = o to that position, add substring
         */

        //input
        $output = [];
        $length_of_string = strlen($word_or_phrase);
        if($length_of_string < 1){
            return $output;
        }
        $last_letter = $word_or_phrase[0];


        //processing
        for($current_index = 0; $current_index < $length_of_string; $current_index++){
            $letter_at_index = $word_or_phrase[$current_index];
            if($letter_at_index != $last_letter){
                continue;
            }
            //wea comparing with first letter, moving to the right

            for($substring_last_index = $length_of_string - 1; $substring_last_index >= $current_index; $substring_last_index--){
                $suffix = trim(substr($word_or_phrase,$current_index, $substring_last_index - $current_index + 1));
                //optional processing
                if(strlen($suffix) > $only_if_longer_than_number){
                    $output[$suffix] = "";
                }
            }
        }
        //output
        return array_keys($output);
    }

    private function get_prefixes_move_left($word_or_phrase, $only_if_longer_than_number=0){
        /**
        for each letter in word
         * if letter not equal to last, continue
         *else for i = o to that position, add substring
         */

        //input
        $length_of_string = strlen($word_or_phrase);
        $last_letter = $word_or_phrase[0];
        $output = [];

        //processing
        for($current_index = 0; $current_index < $length_of_string; $current_index++){
            $letter_at_index = $word_or_phrase[$current_index];
            if($letter_at_index != $last_letter){
                continue;
            }
            //wea comparing with first letter, moving to the right
            for($substring_start_index = $length_of_string - 1; $substring_start_index >= $current_index; $substring_start_index--){
                $suffix = trim(substr($word_or_phrase,$current_index,$substring_start_index+1));
                //optional processing
                if(strlen($suffix) > $only_if_longer_than_number){
                    $output[$suffix] = "";
                }
            }
        }
        //output
        return array_keys($output);
    }

    abstract protected function remove_unnecessary_words();
    abstract protected function get_stem($word);


}
class UnknownSearchDelegate extends SearchDelegate{

    protected function remove_unnecessary_words()
    {
        return [];
    }
    protected function get_stem($word)
    {
        return "";
    }
}
class EnglishSearchDelegate extends SearchDelegate{
    protected function remove_unnecessary_words(){
        $this->setOutput(
            array_values(array_diff($this->getOutput(),$this->unnecessary_words()))
        );
    }

    protected function get_stem($word)
    {
        $contains_vowel_pattern = "/[aeiou]/i";
        $len = strlen($word);

        $last_8_chars = substr($word,$len - 8);
        $last_7_chars = substr($word,$len - 7);
        $last_6_chars = substr($word,$len - 6);
        $last_5_chars = substr($word,$len - 5);
        $last_4_chars = substr($word,$len - 4);
        $last_3_chars = substr($word,$len - 3);
        $word_last_2_chars = substr($word,$len - 2);

        $last_char = substr($word,$len - 1);

        $second_last_char = substr($word,$len - 2,1);
        $third_last_char = substr($word,$len - 3,1);
        $fourth_last_char = substr($word,$len - 4,1);
        $fifth_last_char = substr($word,$len - 5,1);
        $sixth_last_char = substr($word,$len - 6,1);
        $seventh_last_char = substr($word,$len - 7,1);
        $eighth_last_char = substr($word,$len - 8,1);

        $chars_except_last_8 = substr($word,0,$len - 8);
        $chars_except_last_7 = substr($word,0,$len - 7);
        $chars_except_last_6 = substr($word,0,$len - 6);
        $chars_except_last_5 = substr($word,0,$len - 5);
        $chars_except_last_4 = substr($word,0,$len - 4);
        $chars_except_last_3 = substr($word,0,$len - 3);
        $chars_except_last_2 = substr($word,0,$len - 2);
        $chars_except_last = substr($word,0,$len - 1);


        $output = $word;

        if($last_3_chars == "eed" && preg_match($contains_vowel_pattern,$chars_except_last_3) && $len >=5){
            $output = $chars_except_last;
        }

        //1. continous + continous-adverb
        //e.g lie->lying->lyingly->lies
        else if($last_6_chars == "yingly" && preg_match($contains_vowel_pattern,$chars_except_last_6) && $len >=8){
            $output = $chars_except_last_6 . "ie"; //coz ie was replaced with y before forming continuous tense
        }
        else if($last_4_chars == "ying" && preg_match($contains_vowel_pattern,$chars_except_last_4) && $len >=6 ){
            $output = $chars_except_last_4 . "ie"; //coz ie was replaced with y before forming continuous tense
        }
        else if($last_3_chars == "ies" && $len >=5 ){
            $output = $chars_except_last_3 . "y"; //coz ie was replaced with y before forming continuous tense
            // e.g applies=apply, flies=fly,dries=dry,cries=cry, freebies=freeby,cookies=cooky,trophies=trophy
        }
        else if($last_3_chars == "ies" && $len ==4 ){
            $output = $chars_except_last_3 . "ie"; //coz ie was replaced with y before forming continuous tense
            // e.g lies=lie,dies=die
        }

        else if($last_8_chars == "ications"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_8)  && $len >=10 ){
                $output = $chars_except_last_8 . "y";//coz 'e' was removed to adjective
            }
        }

        //ing
        else if($last_5_chars == "ering"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_4)  && $len >=6 ){
                $output = $chars_except_last_3;//add nothing, coz nothing was removed before adding suffix
            }
        }

        //@@@@ THERE ARE THOSE WHICH AFTER REMOVE SUFFIX, MUST END IN e, y, etc

        //THE FOLLOWING PATTERNS MUST END IN 'e' after remove suffix

        //THESE ARE EXCEPTIONAL CHARACTERS: SET1 = bl,ate,se,ce,re,ge,ze,ve-- WHERE U JUST DONT REMOVE THE SUFFIX

        //e.g amaze->amaz-ing->amaz->ingly. security->secur-ing,secur-ingly, secur-ity
        //ingly
        else if($last_7_chars == "blingly" || $last_7_chars == "atingly" || $last_6_chars == "vingly" || $last_6_chars == "singly" || $last_6_chars == "cingly" || $last_6_chars == "ringly" || $last_6_chars == "gingly" || $last_6_chars == "zingly"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_6)  && $len >=8 ){
                $output = $chars_except_last_5 . "e";//coz 'e' was removed to form continuous-adverb
            }
        }

        /*else if($last_5_chars == "bling" || $last_5_chars == "ating" ||  $last_5_chars == "iting" || $last_4_chars == "ving" || $last_4_chars == "sing" || $last_4_chars == "cing" || $last_4_chars == "ring" || $last_4_chars == "ging" || $last_4_chars == "zing"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_4)  && $len >=6 ){
                //fails for populare
                $output = $chars_except_last_3 . "e";//coz 'e' was removed to form continuous-tense
            }
        }*/
        //ation
        else if($last_7_chars == "blation" || $last_7_chars == "atation" || $last_6_chars == "vation" || $last_6_chars == "sation" || $last_6_chars == "cation" || $last_6_chars == "ration" || $last_6_chars == "gation" || $last_6_chars == "zation"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_4)  && $len >=6 ){
                //fails for populare
                $output = $chars_except_last_5 . "e";//coz 'e' was removed to form continuous-tense
            }
        }
        //ity-nouns
        /*else if($last_6_chars == "bility" || $last_5_chars == "atity" || $last_4_chars == "vity" || $last_4_chars == "sity" || $last_4_chars == "city" || $last_4_chars == "rity" || $last_4_chars == "gity" || $last_4_chars == "zity"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_4)  && $len >=6 ){
                $output = $chars_except_last_3 . "e";//coz 'e' was removed to form noun
                //although passes test for mobility->mobile, it fails test for disability->disable
            }
        }*/


        else if($last_5_chars == "ively"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_5)  && $len >=7 ){
                $output = $chars_except_last_5 . "e";//coz 'e' was removed to adjective
            }
        }
        else if($last_4_chars == "ator"){
            if(preg_match($contains_vowel_pattern,$chars_except_last_4)  && $len >=6 ){
                $output = $chars_except_last_2 . "e";//coz 'e' was removed to form performer
            }
        }


        else{

            //2. FROM suffix starting with a or 'o'
            $removed_suffix = false;

            if(!$removed_suffix){

                $arr_suffixes_to_remove = [
                    //TODO:ORDER OF WORDS IN THIS LIST MATTERS TO DETERMINE ORDER IN WHICH THEY ARE EXAMINED
                    //TODO: words of same pattern shd be grouped on same line to ensure most precedent comes first [longer one]
                    //"sses",
                    "ledge",
                    "es",//
                    "fulness","ful","ness",
                    "iveness","ive",
                    "ousness","ous",//e.g consciousness, conscious
                    "alism","alist","al",//e.g formalism, formal, professionalism
                    "ance",//e.g performance
                    "ment",//e.g manage-ment, govern-ment, advertise-ment, advance-ment,
                    "able","ably",

                    "ingly","ing",
                    "edly","ed",
                    "ity",
                    "ations","ation",
                    "ionately", "ionate",
                    "ions","ion",
                    "ionally","ional",
                    "age",
                    "er","est",
                    "ness",
                    "ly","y",//e.g catty, fatty,
                    "en",//e.g lighten, soften,
                    "like",//e.g catlike,
                    "ish",//e.g. girlish,
                    "s"

                ];


                foreach ($arr_suffixes_to_remove as $suffix_to_remove){
                    $suffix_length = strlen($suffix_to_remove);

                    //TODO:IF THE WORD ENDS WITH THE SUFFIX - ENDS WITH THE SUFFIX
                    if(substr($word,$len-$suffix_length) == $suffix_to_remove){
                        //todo: ignore removing the s if word ends with ss e.g posess, access
                        if($suffix_to_remove == "s" && $word_last_2_chars == "ss"){
                            $output = $word;
                            $removed_suffix = true;
                            break;
                        }
                        else{
                            $stem = substr($word,0,$len-$suffix_length);
                            $stem_length = strlen($stem);
                            $stem_last_two_chars = substr($stem,$stem_length - 2);
                            $stem_last_3_chars = substr($stem,$stem_length - 3);

                            //if the 2 characters before the suffix are in list se,ce,re,ge,ze - it means the suffix was just added

                            if($stem_length >= 3){ //stem must be at least 3 characters - else words like cable,stable will suffer



                                /*if($suffix == "sses" || $suffix == "ss"){
                                    $output = substr($word,0,$len-$suffix_length) . "ss";
                                    $processed_suffix = true;
                                    break;
                                }*/


                                if(
                                    //no need to remove extra consonant if stem ends with ll, ss, or zz - coz was not added before suffix
                                    $stem_last_two_chars == "ll"
                                    || $stem_last_two_chars == "ss"
                                    || $stem_last_two_chars == "zz"

                                    || $stem_last_two_chars == "ar" //todo: experimental, to cater for words like popular [to avoid populare - coz stems ending with r have e added to them]
                                    || $stem_last_two_chars == "ng" //todo: experimental, to cater for words like Bang, dung, gang, gong, hang, hung, hinge, lung, long, ping, pong, rung, ring, sang, sing, song, wrong
                                    || $stem_last_two_chars == "el" //todo: experimental, to cater for words like Kennel, funnel, panel, paneling,
                                    || $stem_last_3_chars == "eat" //todo: experimental, to cater for words like eat, beat, defeat, heat, meat, neat, peat, repeat, seat, teat,

                                ){

                                    $output = $stem;
                                    $removed_suffix = true;
                                    break;
                                }

                                //todo: remove extra consonant IF last 2 chars are double consonant other than LL,SS,ZZ
                                else if(
                                    $stem_last_two_chars[0] == $stem_last_two_chars[1] //stem ends in double letter
                                    //not a vowel
                                    && $stem_last_two_chars[0] != "a"
                                    && $stem_last_two_chars[0] != "e"
                                    && $stem_last_two_chars[0] != "i"
                                    && $stem_last_two_chars[0] != "o"
                                    && $stem_last_two_chars[0] != "u"
                                    //not any of these consonants
                                    && $stem_last_two_chars[0] != "l"
                                    && $stem_last_two_chars[0] != "s"
                                    && $stem_last_two_chars[0] != "z"
                                ){

                                    $output = substr($stem,0,$stem_length-1); //remove extra consonant, coz was added before adding suffix
                                    $removed_suffix = true;
                                    break;
                                }
                                else if($stem_last_two_chars == "ye" || $stem_last_two_chars == "ee"){
                                    $output = $stem; //coz nothing was removed
                                    $removed_suffix = true;
                                    break;
                                }
                                else if(
                                    (
                                        $suffix_to_remove[0] == "e" || $suffix_to_remove == "ity" || $suffix_to_remove == "ing"

                                    )
                                    &&
                                    (
                                        $stem_last_two_chars[1] == "s"
                                        || $stem_last_two_chars[1] == "c"
                                        || $stem_last_two_chars[1] == "r"
                                        || $stem_last_two_chars[1] == "g"
                                        || $stem_last_two_chars[1] == "z"
                                        || $stem_last_two_chars[1] == "v"

                                        || $stem_last_two_chars[1] == "l" //e.g bible, article, disable[ing]

                                        || $stem_last_two_chars == "at"
                                        || $stem_last_two_chars == "bl"
                                        || $stem_last_two_chars == "it"

                                    )
                                ){
                                    $output = $stem . "e"; //e removed from these letters
                                    $removed_suffix = true;
                                    break;
                                }

                                else{
                                    $output = $stem; //coz nothing was removed
                                    $removed_suffix = true;
                                    break;
                                }
                            }
                        }

                    }




                }


            }


        }
        return $output;



    }




    private function interjections()
    {
        $interjections = "aha,ahem,ahh,ahoy,alas,arg,aw,bam,bingo,blah,boo,bravo,brrr,cheers,congratulations,dang,drat,darn,duh,eek,eh,fiddlesticks,gadzooks,gee,geewhiz,golly,goodbye,goodness,gosh,ha-ha,hallelujah,halleluyah,hello,hey,hmm,huh,humph,hurray,oh,dear,oops,ouch,ow,phew,phooey,pooh,pow,shh,shoo,thanks,there,tut-tut,uh-huh,uh-oh,ugh,uhm,umwahoo,well,whoa,whoops,wow,yeah,yes,yikes,yippee,yo,yuck";
        $arr_interjections = explode(",",$interjections);
        return $arr_interjections;
    }

    private function stop_words(){
        $stop_words = "a,able,about,above,according,accordingly,across,actually,after,afterwards,again,against,aint,all,allow,allows,almost,alone,along,already,also,although,always,am,among,amongst,amoungst,amount,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,arent,around,as,aside,ask,asking,associated,at,available,away,awfully,back,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,believe,below,beside,besides,best,better,between,beyond,bill,both,bottom,brief,but,by,call,came,can,cannot,cant,cause,causes,certain,certainly,changes,clearly,cmon,co,com,come,comes,con,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldnt,course,cry,cs,currently,de,definitely,describe,described,despite,detail,did,didnt,different,do,does,doesnt,doing,done,dont,down,downwards,due,during,each,edu,eg,eight,either,eleven,else,elsewhere,empty,enough,entirely,especially,et,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,far,few,fifteen,fifth,fify,fill,find,fire,first,five,followed,following,follows,for,former,formerly,forth,forty,found,four,from,front,full,further,furthermore,get,gets,getting,give,given,gives,go,goes,going,gone,got,gotten,greetings,had,hadnt,happens,hardly,has,hasnt,have,havent,having,he,hello,help,hence,her,here,hereafter,hereby,herein,heres,hereupon,hers,herself,hes,hi,him,himself,his,hither,hopefully,how,howbeit,however,hundred,id,ie,if,ignored,ill,im,immediate,in,inasmuch,inc,indeed,indicate,indicated,indicates,inner,insofar,instead,interest,into,inward,is,isnt,it,itd,itll,its,itself,ive,just,keep,keeps,kept,know,known,knows,last,lately,later,latter,latterly,least,less,lest,let,lets,like,liked,likely,little,look,looking,looks,ltd,made,mainly,many,may,maybe,me,mean,meanwhile,merely,might,mill,mine,more,moreover,most,mostly,move,much,must,my,myself,name,namely,nd,near,nearly,necessary,need,needs,neither,never,nevertheless,new,next,nine,no,nobody,non,none,noone,nor,normally,not,nothing,novel,now,nowhere,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,only,onto,or,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,own,part,particular,particularly,per,perhaps,placed,please,plus,possible,presumably,probably,provides,put,que,quite,qv,rather,rd,re,really,reasonably,regarding,regardless,regards,relatively,respectively,right,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,she,should,shouldnt,show,side,since,sincere,six,sixty,so,some,somebody,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,system,take,taken,tell,ten,tends,th,than,thank,thanks,thanx,that,thats,the,their,theirs,them,themselves,then,thence,there,thereafter,thereby,therefore,therein,theres,thereupon,these,they,theyd,theyll,theyre,theyve,thick,thin,think,third,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,to,together,too,took,top,toward,towards,tried,tries,truly,try,trying,ts,twelve,twenty,twice,two,un,under,unfortunately,unless,unlikely,until,unto,up,upon,us,use,used,useful,uses,using,usually,value,various,very,via,viz,vs,want,wants,was,wasnt,way,we,wed,welcome,well,went,were,werent,weve,what,whatever,whats,when,whence,whenever,where,whereafter,whereas,whereby,wherein,wheres,whereupon,wherever,whether,which,while,whither,who,whoever,whole,whom,whos,whose,why,will,willing,wish,with,within,without,wonder,wont,would,wouldnt,yes,yet,you,youd,youll,your,youre,yours,yourself,yourselves,youve,zero,inside,ahead,previous,beneath,atop,aboard,inspite,nonetheless,basically,suppose,lastly,surely,owing,briefly,instance,addition,additionally,remember,recall,similar,similarly,include,includes,including,included";
        return explode(",",$stop_words);
    }

    private function unnecessary_words()
    {
        return array_unique(array_merge($this->stop_words(),$this->interjections()));
    }

}
abstract class SearchTask implements ISearchClientToNotify{
    public function __construct($search_query,$language='en')
    {
        $search_delegate = $this->find_appropriate_search_delegate($language);
        $search_delegate->initialize($search_query,$this);
    }

    private function getSearchDelegates()
    {
        $search_delegates = [
            'en' => new EnglishSearchDelegate()
        ];
        return $search_delegates;
    }

    /** @return SearchDelegate */
    private function find_appropriate_search_delegate($language)
    {
        $supported_search_delegates = $this->getSearchDelegates();
        return array_key_exists($language, $supported_search_delegates) ? $supported_search_delegates['en'] : new UnknownSearchDelegate();
    }

}
