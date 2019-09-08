<?php
class WebsiteSettings{
    //todo: an object to store application settings. Change them to match your needs
    public function db_host(){
        return TheWebsite::is_offline() ? "localhost": "localhost";
    }
    public function db_username(){
        return TheWebsite::is_offline() ? "root": "romeoswe_dding";
    }
    public function db_password(){
        return TheWebsite::is_offline() ? "usbw": "#r.o.m.e.o.s.w.e.d.d.i.n.g#";
    }
    public function db_name(){
        return TheWebsite::is_offline() ? "romeo": "romeoswe_dding";
    }

    public function build_web_address($web_address){
        if(TheWebsite::is_online()){
            $web_address->add_domain_component("www");
            $web_address->add_domain_component("romeoswedding");
            $web_address->add_domain_component("com");
        }
        else{
            $web_address->add_domain_component("localhost");
            $web_address->add_path_part("romeoswedding");
        }
        return $web_address;
    }
    
    public function host_file_for_php_sitemap(){
        return TheWebsite::is_offline() ? "sitemap.phpobject.localhost": "sitemap.phpobject";        
    }

    public function host_file_for_xml_sitemap(){
        return TheWebsite::is_offline() ? "sitemap.localhost.xml": "sitemap.xml";
    }

}