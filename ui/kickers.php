<?php

class Kicker extends SmartDiv{

}
class UnderlinedKicker extends Kicker{
    //todo: override this to provide kickers for each type of post in your application
    public function __construct()
    {
        parent::__construct();
        $this->border_bottom("2px solid tomato");
    }
}

class KickerForCustomContent extends UnderlinedKicker{
    public function __construct($content)
    {
        parent::__construct();
        $this->add_child($content);
    }
}

