<?php
class NotificationObject{
    private $text = '';
    private $arr_verbs = array();

    public function __construct($text)
    {
        $this->text = $text;
    }
    public function __toString()
    {
        return $this->text;
    }

    public function add_verb($string)
    {
        if(is_a($string,'NotificationVerb')){
            $this->arr_verbs[] = $string;
        }
    }
    public function original(){
        return $this->text;
    }
    public function the(){
        return $this->replace_article(__FUNCTION__);
    }
    public function his(){
        return $this->replace_article(__FUNCTION__);
    }
    public function her(){
        return $this->replace_article(__FUNCTION__);
    }
    public function my(){
        return $this->replace_article(__FUNCTION__);
    }
    public function your(){
        return $this->replace_article(__FUNCTION__);
    }
    public function their(){
        return $this->replace_article(__FUNCTION__);
    }


    public function me(){
        return __FUNCTION__;
    }
    public function you(){
        return __FUNCTION__;
    }
    public function him(){
        return __FUNCTION__;
    }
    public function her2(){
        return __FUNCTION__;
    }
    public function them(){
        return __FUNCTION__;
    }
    public function it(){
        return __FUNCTION__;
    }

    public function permutations()
    {
        //input
        $what_array = array($this->text, $this->my(), $this->your(),$this->his(), $this->her(), $this->their());

        //processing
        $output = "";
        foreach ($what_array as $what){
            /** @var NotificationVerb $notif_verb */
            foreach ($this->arr_verbs as $notif_verb){
                $output .= sprintf("<div>%s %s</div>",$notif_verb->did(),$what);
                $output .= sprintf("<div>%s %s</div>",$notif_verb->is_doing(),$what);
                $output .= sprintf("<div>%s %s</div>",$notif_verb->will_do(),$what);
                $output .= "<hr/>";
            }
        }
        //output
        return $output;

    }

    private function isArticle($word)
    {
        $articles = array(
            'a','an','the', 'my','your','his','her','their'
        );
        foreach ($articles as $article){
            if($article == $word){
                return true;
            }
        }
        return false;
    }

    private function replace_article($new_article)
    {
        $parts = explode(" ", $this->text);
        if (is_array($parts) && $this->isArticle($parts[0])) {
            $parts[0] = $new_article;
            return join(" ", $parts);
        }
        return $this->text;
    }
}


class NotificationVerb{
    private $verb, $past_tense,$present_tense,$verb_if_does;
    public function __construct($verb, $past_tense, $present_tense, $verb_if_does){
        $this->verb = $verb;
        $this->past_tense = $past_tense;
        $this->present_tense = $present_tense;
        $this->verb_if_does = $verb_if_does;

    }

    //DO
    public function do_(){
        return $this->verb;
    }
    public function will_do(){
        return sprintf("will %s",$this->do_());
    }
    public function will_not_do(){
        return sprintf("will not %s",$this->do_());
    }
    public function did_not_do(){
        return sprintf("did not %s",$this->do_());
    }
    public function should_do(){
        return sprintf("should %s",$this->do_());
    }
    public function should_not_do(){
        return sprintf("should not %s",$this->do_());
    }
    public function must_do(){
        return sprintf("must %s",$this->do_());
    }
    public function must_not_do(){
        return sprintf("must not %s",$this->do_());
    }
    public function might_do(){
        return sprintf("might %s",$this->do_());
    }
    public function might_not_do(){
        return sprintf("might not %s",$this->do_());
    }
    public function may_do(){
        return sprintf("may %s",$this->do_());
    }
    public function may_not_do(){
        return sprintf("may not %s",$this->do_());
    }
    public function could_do(){
        return sprintf("could %s",$this->do_());
    }
    public function could_not_do(){
        return sprintf("could not %s",$this->do_());
    }
    public function can_do(){
        return sprintf("can %s",$this->do_());
    }
    public function can_not_do(){
        return sprintf("can not %s",$this->do_());
    }

    //does and does not
    public function does(){
        return $this->verb_if_does;
    }

    //DOING
    public function doing(){
        return $this->present_tense;
    }
    public function is_doing(){
        return sprintf("is %s",$this->doing());
    }
    public function are_doing(){
        return sprintf("are %s",$this->doing());
    }
    public function will_be_doing(){
        return sprintf("will be %s",$this->doing());
    }
    public function was_doing()
    {
        return sprintf("was %s",$this->doing());
    }

    //DID
    public function did(){
        return $this->past_tense;
    }
    public function has_done(){
        return sprintf("has %s",$this->did());
    }
    public function have_done(){
        return sprintf("have %s",$this->did());
    }
    public function will_have_done(){
        return sprintf("will have %s",$this->did());
    }

}

//test
//input
abstract class SampleNotifications
{
    /** @var  NotificationVerb $verb */
    private $verb;
    /** @var  NotificationObject $object */
    private $object;

    protected function object(){
        return $this->object;
    }
    protected function verb(){
        return $this->verb;
    }

    public function __toString()
    {
        $what = new NotificationObject($this->object_name());
        $this->object = $what;
        $verb = new NotificationVerb($this->verb_name(), $this->did(), $this->doing(), $this->does());
        $this->verb = $verb;

        $applicable_verbs_for_attend = $this->arr_applicable_verb_variants();
        $wedding_verbs = $this->arr_applicable_object_variants();

        //processing
        $output = '';
        foreach ($applicable_verbs_for_attend as $applicable_Verb) {
            foreach ($wedding_verbs as $wedding_reference) {
                $output .= sprintf("%s %s", $applicable_Verb, $wedding_reference);
                $output .= "<br/>";
            }
        }
        return "$output";
        //print $what->permutations();

    }

    abstract protected function object_name();
    abstract protected function verb_name();
    abstract protected function did();
    abstract protected function doing();
    abstract protected function does();
    abstract protected function arr_applicable_verb_variants();
    abstract protected function arr_applicable_object_variants();
}
class SampleNotificationsForAttendWedding extends SampleNotifications{
    protected function object_name()
    {
        return 'a wedding';
    }

    protected function verb_name()
    {
        return 'attend';
    }

    protected function did()
    {
        return 'attended';
    }

    protected function doing()
    {
        return 'attending';
    }

    protected function does()
    {
        return 'attends';
    }

    protected function arr_applicable_verb_variants()
    {
        return array(
            $this->verb()->did(),
            $this->verb()->was_doing(),
            $this->verb()->is_doing(),
            $this->verb()->will_be_doing(),
            $this->verb()->will_not_do(),
            $this->verb()->
            might_not_do()
        );
    }

    protected function arr_applicable_object_variants()
    {
        return array(
            $this->object()->original(),
            $this->object()->the(),
            $this->object()->your());
    }
}

class SampleNotificationsForCreatePage extends SampleNotifications{
    protected function object_name()
    {
        return 'a page';
    }

    protected function verb_name()
    {
        return 'create';
    }

    protected function did()
    {
        return 'created';
    }

    protected function doing()
    {
        return 'creating';
    }

    protected function does()
    {
        return 'creates';
    }

    protected function arr_applicable_verb_variants()
    {
        return array(
            $this->verb()->did()
        );
    }

    protected function arr_applicable_object_variants()
    {
        return array(
            $this->object()->original(),
            $this->object()->the(),
            $this->object()->your());
    }
}

class SampleNotificationsForUpdatePage extends SampleNotificationsForCreatePage{

    protected function verb_name()
    {
        return 'update';
    }

    protected function did()
    {
        return 'updated';
    }

    protected function doing()
    {
        return 'updating';
    }

    protected function does()
    {
        return 'updates';
    }

    protected function arr_applicable_verb_variants()
    {
        return array(
            $this->verb()->did(), $this->verb()->will_be_doing()
        );
    }

    protected function arr_applicable_object_variants()
    {
        return array(
            $this->object()->original(),
            $this->object()->the(),
            $this->object()->your());
    }
}

class SampleNotificationsForCommentOnGown extends SampleNotifications{
    protected function object_name()
    {
        return 'a gown';
    }

    protected function verb_name()
    {
        return 'comment on';
    }

    protected function did()
    {
        return 'commented on';
    }

    protected function doing()
    {
        return 'commenting on';
    }

    protected function does()
    {
        return 'comments on';
    }

    protected function arr_applicable_verb_variants()
    {
        return array(
            $this->verb()->did()
        );
    }

    protected function arr_applicable_object_variants()
    {
        return array(
            $this->object()->original(),
            $this->object()->the(),
            $this->object()->your(),
            $this->object()->it()
        );
    }
}


    print sprintf(
        "%s<hr/>%s<hr/>%s<hr/>%s",
        new SampleNotificationsForAttendWedding(),
        new SampleNotificationsForCreatePage(),
        new SampleNotificationsForUpdatePage(),
        new SampleNotificationsForCommentOnGown()
    );

