<?php

class QueryForUpdateItemScore extends UpdateQueryForApp{
    private $file_name;

    public function __construct($file_name)
    {
        $this->file_name = $file_name;
        parent::__construct();

        //print $this->queryForGetTotalScore();exit;

        $this->update(app::values()->posts())
        ->where(Db::fields()->entity_id()->isEqualTo(EntityIdFromFileName::get($this->file_name)))
        ->set(Db::fields()->total_score()->toSQLValue(
            $this->queryForGetTotalScore())
        );

        //update the hard-factor score of the post in the search index

        //print $this;exit;
    }


    private function queryForGetTotalScore()
    {
        $query_dictionary = $this->getQueryDictionary();
        $queries = array_values($query_dictionary);//todo: the keys were purely for understanding what the query computes

        /** @var SQLValueBase $sql_expression */
        $sql_expression = null;
        /** @var SelectQueryForApplication $select_query */
        foreach ($queries as $select_query){
            if(!$sql_expression){
                $sql_expression = $select_query;
            }
            else{
                $sql_expression = $sql_expression->plus($select_query);
            }
        }
        return $sql_expression;
    }
    private function getQueryDictionary(){
        //todo: all the queries are select queries, so that we can call query->plus(query)
        //todo: reduce redundacy by changing only what is need in the queries below
        //todo: apply log and weighting to some of the score factors
        //update item score should update both weighted score as well as individual score likes total views, total comments, etc

        /* 
        search factors: domain(country,keywords), page(tf,idf,title,description,h1,topic/humingbird,), category, url, h1,h2,h3, back link anchor text, image alt text, meta text
        link title, country of refering brand,
        local searches, transactional searches
        */
        return
            array(
                //DOMAIN FACTORS
                "domain_age"=>Db::post_computations($this->file_name)->author_signup_timestamp()->log10_plus_1()->log10_plus_1()
            ,
                "whois_domain"=>Db::post_computations($this->file_name)->author_whois()->length()->log10_plus_1()->log10_plus_1()
            ,
                "domain_authority"=>Db::post_computations($this->file_name)->author_authority()->log10_plus_1()->log10_plus_1()
            ,
                "brand_name"=>Db::post_computations($this->file_name)->author_name()->log10_plus_1()->log10_plus_1()
            ,
                "brand_facebook_page"=>Db::post_computations($this->file_name)->author_facebook_page_url()->log10_plus_1()->log10_plus_1()
            ,
                "brand_twitter_page"=>Db::post_computations($this->file_name)->author_twitter_page_url()->log10_plus_1()->log10_plus_1()
            ,
                "brand_linkedin_page"=>Db::post_computations($this->file_name)->author_linked_page_url()->log10_plus_1()->log10_plus_1()
            ,
                "brand_youtube_channel"=>Db::post_computations($this->file_name)->author_youtube_channel_url()->log10_plus_1()->log10_plus_1()
            ,
                "brand_legitimacy_score"=>Db::post_computations($this->file_name)->author_legitimacy_score()->log10_plus_1()->log10_plus_1()
            ,
                "brand_whatsApp number"=>Db::post_computations($this->file_name)->author_whatsapp_number()->log10_plus_1()->log10_plus_1()
            ,
                //country
                //domain keywords, times changed ownership
                //PAGE FACTORS
               /* "title_length"=>Db::post_computations($this->file_name)->title()->length()->log10_plus_1()->log10_plus_1()
            ,
                "description_length"=>Db::post_computations($this->file_name)->description()->length()->log10_plus_1()->log10_plus_1()
            ,*/
                //MULTIMEDIA
                "image_presence"=>Db::post_computations($this->file_name)->picture_file_name()->length()->log10_plus_1()->log10_plus_1()
            
                //image size [width, height - here]

                //content recency
                //"last_updated"=>Db::post_computations($this->file_name)->timestamp_last_updated()->log10_plus_1()->log10_plus_1(),
                //"total_updates"=>Db::post_computations($this->file_name)->total_updates()->log10_plus_1()->log10_plus_1(),
                //"update_frequency"=>Db::post_computations($this->file_name)->update_frequency()->log10_plus_1()->log10_plus_1()
                //LINKS: outbound, internal, inbound

                //affiliate links: users/brands can link to other brands
            


                //update_frequnecy e.g daily and magnitude (can use tanimoto)
                //sindicated vs originality of content

                //mobile friendliness e.g. number of paragraphs, length of paragraphs
                //"image_presence"=>Db::post_computations($this->file_name)->picture_file_name()->length()->log10_plus_1()->log10_plus_1()

                //category factors e.g category views, category likes, category comments

                //reference factors - could be implemented as links but tagged as say [references]
                //bullets - formatted as [bullets], [heading], [subheading], [contact], [phone], [email], [website]
                
            ,
                "total_sources"=>Db::post_computations($this->file_name)->total_sources()->log10_plus_1()->log10_plus_1()
            ,
                "total_phone_contacts"=>Db::post_computations($this->file_name)->total_phone_contacts()->log10_plus_1()->log10_plus_1()
            ,
                "total_mail_contacts"=>Db::post_computations($this->file_name)->total_mail_contacts()->log10_plus_1()->log10_plus_1()
            ,
                "total_web_contacts"=>Db::post_computations($this->file_name)->total_web_contacts()->log10_plus_1()->log10_plus_1()
            ,
                "total_headings"=>Db::post_computations($this->file_name)->total_headings()->log10_plus_1()->log10_plus_1()
            ,
                "total_bullets"=>Db::post_computations($this->file_name)->total_bullets()->log10_plus_1()->log10_plus_1()
            ,
                "total_paragraphs"=>Db::post_computations($this->file_name)->total_paragraphs()->log10_plus_1()->log10_plus_1()
                /* 
                back link factors:total linking domains/brands,linking brand age, total linking posts, linking brand authority, total_links from bad neighbors
                total links from ads (spammy?)
                total links from forums (spammy)
                total links per source (spam if high)
                link velocity
                
                */
            ,
                "total_images"=>Db::post_computations($this->file_name)->total_images()->log10_plus_1()->log10_plus_1()
            ,
                "total_words"=>Db::post_computations($this->file_name)->total_words()->log10_plus_1()->log10_plus_1()
            ,
                "total_links"=>Db::post_computations($this->file_name)->total_outbound_links()->log10_plus_1()->log10_plus_1()
                //skip search factors like bounce rate, click through rate coz they will need some additional implementation
            ,
                "total_visits"=>Db::post_computations($this->file_name)->total_visits()->log10_plus_1()->log10_plus_1(),
                "total_bookmarks"=>Db::post_computations($this->file_name)->total_saves()->log10_plus_1()->log10_plus_1()
            ,

                //BRAND FACTORS

                //brand-popularity (views,likes, comments, searches)

                // brand-trust (brand-age, brand-legitimacy contact-info + verification )


                //ymyl = expert + quality + reference + contacts + support info + reviews + updates + endorsements

                //PAGE FACTORS
                "item_freshness"=>Db::fields()->timestamp()->log10_plus_1()->log10_plus_1()
            ,
                "content length"=>Db::fields()->content()->length()->log10_plus_1()->log10_plus_1()
                //profanities + ads + givverish + ip + autoGen +  duplication
                //ITEM AGE
            ,
                //Item.Popularity.Engagemment
                "views"=>(new SelectQueryForApplication())
                ->from(app::values()->views())
                ->where(Db::fields()->file_name()->isLikeString(EntityIdFromFileName::get($this->file_name)))
                ->select(Db::fields()->file_name()->count())
                ,
                    "likes"=> (new SelectQueryForApplication())
                    ->from(app::values()->likes())//todo: changed here
                    ->where(Db::fields()->file_name()->isLikeString(EntityIdFromFileName::get($this->file_name)))
                    ->select(Db::fields()->file_name()->count())
                ,
                    "comments"=> (new SelectQueryForApplication())
                    ->from(app::values()->comments())//todo: changed here
                    ->where(Db::fields()->file_name()->isLikeString(EntityIdFromFileName::get($this->file_name)))
                    ->select(Db::fields()->file_name()->count())
                /**/

        );
    }

}

#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
class SQLCommandListForPublishPost extends SQLCommandListForMotokaviews{
    public function __construct($file_name)
    {
        parent::__construct();
        $this->add_item_or_list(new QueryForPublishPost($file_name));

    }
}


/**
 * TODO: HOW VALUABLE, TRUSTABLE, GENUINE AND SAFE depends on the following factors
 * YOUR POSTS ARE BOOSTED ACCORDING TO THESE RULES
 *
 *  //====== GETTING THE START POINTS WHILE ADDING A POST/MOVIE==================================
 * $points-query =
 * from user points
 * where user id = current user id
 * group by user id
 * select sum points as starting points
 *------
 * insert into posts set starting-points=[$points-query]
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * e.g if your item/movie is viewed, it boosts ranking for all the movies you will post, and the current ones
 * -but we can't update all movies/posts where you are the author by adding a point coz they might be millions
 *
 *========== TODO: AUTHOR / USER / ACCOUNT FACTORS I.E SIMILAR TO DOMAIN FACTORS E.g user-name/posts/01
 * TABLE: user-points
 *
 * FACTOR 1: ACCOUNT AGE -- determines trustable/untrustable - coz trust is built over-time
 * ADDING USER POINTS [With conditional insert
 * on register
 * -insert into user-points set user id=1, point-type=registration, points=1/registration-timestamp
 *========= POSTING FACTORS =========================== e.g. hackers post once or on same day, so each additional post erans more
 * TODO: ON POST [consistency point,category points]
 *-author consistency points
 * -insert into user-points reward-type=consistent-posting,  total-points = if( last_post_date(current-user-query) = current_date, 0, 1)
 * -post-points.insert(posted-to-category-[name], 1) //e.g could reward products=1, articles=0.5,
 *
 * =========== HEADING + CONTENT FACTORS
 * LENGTH [ideal title shd be 64 chars
 * table:-ideal-length (of=title/content, etc; value=64, 1000)
 * userpoints.insert(type=content-length, value= [1 - min(absolute( len(title) - ideal_length) / ideal-length-query, 1)]
 * i.e @@@@ get difference between ideal-length and actual-length, get its absolute value, divide it by ideal length, get min between result and 1
 * **at that pont, the max pont that one can get is 1, and the minimum is 0
 *
 * TOPIC COVERAGE [one point for each unique stem]
 * for each stem in stems
 * userpoints.insert(mentioned-topic-[topic], 1)
 *
 * === GEO FACTORS e.g reward for adding location
 *event=posted-to-[kampala]
 *
 * ====== PROFNANITIES ===============
 *
 * ============= IMAGE FACTORS ============================
 * ON ADD/UPDATE IMAGE/MULTIMEDIA
 * user-point.insert(added-image/updated-image,1)
 * post-points.insert(added-image,1)
 *============== ENGAGEMENT FACTORS =============================
 * ON ENGAGEMENT e.g item view, like, comment, bookmark
 * user-points.insert(event-type=got-view,got-like,got-comment, points=0.01,0.1,1)
 * post-points.insert(event-type=got-view,got-like,got-comment, points=0.01,0.1,1)
 *============== FRESHNESS FACTORS ============================
 * ON UPDATE POST e.g item view, like, comment
 * user-points.insert(event-type=updated-title, points = 1) //could split into update title, updated-content
 * ============== TRUST FACTORS ================
 * ON UPDATE CONTACTS
 * user-points.insert(updated-contact, 1)
 * user-points.insert(updated-contact, 1) where post id in my posts
 *
 * ================= DOMAIN FACTORS e.g to encourage photographers
 *
 * ON VISIT [where referrer not this domain --if it is internal it is a view, not visit]
 *  event=visited-blocked | non-blocked
 * DIRECT TRAFFIC
 * event=typed-url-directly vs refferer
 * ============ REPEAT TRAFFIC
 * event=repeat-traffic vs first-time-visit
 * user-points.insert(got-visit, 1) -- if it is from a previous visiting referrer, earn less points 1/number of such previous visits
 * **that means if it is the first visit from that refererrer, get full point, if 2nd, get 1/2, if 3rd, get 1/3, if millionth, 1/1M
 * post-points.insert(got-visit, 1)
 *%%% todo: points based on domain factors e.g. facebook=1, twitter=0.5, other=0.1
 * userpoints.add(type=[referer-name,referer-trust,
 * post-points.add(
 * todo: if later people are abusing, we can reduce the points earned from a given referrer-trust-level
 * NOTE: it is like objects are observing events like on update contancts, so that they too can add more queries to the transaction/comand list
 * todo: this is more like gamification e.g your post earned/got 3 points
 * todo: we can later summarize using BI tools quarter-points for a post by referrer
 * todo: people need to know about this scoring mechanism, but hopefully they wont abuse it. Also tell us where we need to put marketing emphasis
 *
 *========== SEARCH POINTS
 * event-type-points
 * post-points.add(event-type=clicked-through-search-result, points=1)
 *
 *
 * =================
 * TODO: might have table of weights for various factors
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
/* IN SUMMARY
 * total points = start-points + earned-points
 * -------
 * start-points = brand-points         *
 * earned-points = onpost + on-engagement
 * --------
 * brand-points = brand-popularity (views,likes, comments, searches) + brand-trust (brand-age/freshness + brand-legitimacy + contact-info + verification ) +
 *on-post/content = content-freshness + geo-info + topic-coverage + content(length + YMYL factors) + profanities + ads + givverish + ip + autoGen +  duplication
 *
 *----------
 *ymyl = expert + quality + reference + contacts + support info + reviews + updates + endorsements
 */
//print "working-calculating points for new post";exit;