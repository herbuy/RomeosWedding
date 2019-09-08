<?php
class KickerFactory{
    
    public function custom($content)
    {
        return new KickerForCustomContent($content);
    }
}