<?php
ini_set("memory_limit","64M");
require_once("load_modules.php");

function record_page_traffic()
{
//@@@@@@@@@@@ TRACK VISITS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//who visiting
    $visitor_id = Db::computed_values()->current_user_id_before_validating();
    $visit_id = SecureSession::getIdAfterSha1();
    $page_view_id = "will be a hash of many other factors to avoid colliding"; //EntityIdGenerator::newId();
    $post_file_name = app::browser_fields()->file_name();
    $post_entity_id = EntityIdFromFileName::get($post_file_name);

//print json_encode($_SERVER);exit;

//traffic source
    $referer = ServerVariables::http_referer();
    $user_agent = ServerVariables::http_user_agent();
    $referer_domain = ServerVariables::http_referer_domain();

//===== USE COLUMN ORIENTED DATA BASE, where each column is a file on its own - so we can perform sum, mode, average, etc
//time information
    $year = date("Y");
    $month = date("M");
    $day_of_week = date("D");
    $day = date("d");

//print date("H");exit;

    $time_of_day =
        date("H") < 4 ?
            "late-night" :
            (
            date("H") < 8 ? "early-morning" :
                (
                date("H") < 10 ? "morning" :
                    (
                    date("H") < 12 ? "mid-morning" :
                        (
                        date("H") < 17 ? "afternoon" :
                            (
                            date("H") < 20 ? "evening" :
                                "night"
                            )
                        )
                    )
                )
            );


    $hour = date("H");
    $min = date("i");
    $sec = date("s");

    $page_id = app::browser_fields()->page()."" ? app::browser_fields()->page() : "home";
    $page = array_key_exists("REDIRECT_URL",$_SERVER) ? $_SERVER["REDIRECT_URL"] : "home";

    file_put_contents("spark/traffic.txt", join(" ", [$day_of_week, $day, $month, $year, $time_of_day, $hour, $min, $sec, $page_id, $referer_domain, $visit_id, $page, $referer]) . "\r\n", FILE_APPEND);


    /*print $time_of_day;exit;
    print $day;exit;
    print $day_of_week;exit;
    print $month;exit;
    print $year;exit;
    print $page_view_id;exit;
    print $referer_domain;exit;
    print $user_agent;exit;
    print $referer;exit;
    print $post_entity_id;exit;
    print $post_file_name;exit;
    print $visit_id;exit;*/

//which people are viewing my posts
//from what hosts - HTTP_HOST ** assumes web
//using which user agents - HTTP_USER_AGENT [we can mine/identify/extract browserName/version[space]
//from which page they come the most to esp. to this post what could be the reason - HTTP_REFERER
//what posts is a session viewing or has a session viewed in the last n days - PHPSESSID
//from which addresses are they viewing my posts - REMOTE_ADDR

//at what times [time cateogies] are they viewing the posts - REQUEST_TIME - and what days of the week, months,


//what posts are they viewing

//are they viewing from over the web or mobile or browser
    //print json_encode($_SERVER);
    //exit;
}
record_page_traffic();


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
$cmd = ui::browser_fields()->cmd()->toCmd();
$cmd->execute();
//return;
$page = ui::browser_fields()->page()->toPage();
$page_wrapper = new MotokaPageWrapper($page);


//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: *");
//header("Access-Control-Max-age: 1728000");
//header("Access-Control-Allow-Headers: *");
print $page_wrapper."";

//6. save any necessary states
app::sitemap()->serializeToFile(app::settings()->host_file_for_php_sitemap());
app::sitemap()->build(app::settings()->host_file_for_xml_sitemap());




