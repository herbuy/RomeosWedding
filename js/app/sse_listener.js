function SSEListener(){
    var self = this;
        
    var logEvent;
    logEvent = function(title,content){
        console.log(title+": "+content);
    };

    this.error = function(content){logEvent("ERROR OCCURED",content);};
    this.new_message = function(content){var msg = content[0];logEvent("some new message",msg);};
    this.new_session = function(content){var msg = content[0];logEvent("new session",msg);};
    this.logged_out = function(content){var msg = content[0];logEvent("logged out",msg);};
    this.new_product = function(content){var msg = content[0];logEvent("new product",msg);};
    this.new_user = function(content){var msg = content[0];logEvent("new user",msg);};
    this.new_product_category = function(content){var msg = content[0];logEvent("new product category",msg);};
    this.new_cash_transfer = function(content){var msg = content[0];logEvent("new cash transfer",msg);};
    this.new_cash_deposit = function(content){var msg = content[0];logEvent("new cash deposit",msg);};
    this.new_cash_withdraw = function(content){var msg = content[0];logEvent("new cash withdraw",msg);};
    this.new_post = function(content){var msg = content[0];logEvent("new post",msg);};
    this.new_ad = function(content){var msg = content[0];logEvent("new ad",msg);};
    this.new_ad_click = function(content){var msg = content[0];logEvent("new ad click",msg);};
    this.new_offer = function(content){var msg = content[0];logEvent("new offer",msg);};
    this.new_product_picture = function(content){var msg = content[0];logEvent("new product picture",msg);};
    this.new_picture = function(content){var msg = content[0];logEvent("new picture",msg);};
    this.new_profile_picture = function(content){var msg = content[0];logEvent("new profile picture",msg);};
    this.new_product_recommendation = function(content){var msg = content[0];logEvent("new product recommendation",msg);};
    this.new_contact = function(content){var msg = content[0];logEvent("new contact",msg);};
    this.new_product_message = function(content){var msg = content[0];logEvent("new product message",msg);};
    this.new_phone_invitation = function(content){var msg = content[0];logEvent("new phone invitation",msg);};
    this.new_email_invitation = function(content){var msg = content[0];logEvent("new email invitation",msg);};
    this.new_order_from_product = function(content){var msg = content[0];logEvent("new order from product",msg);};
    this.new_order_from_recommendation = function(content){var msg = content[0];logEvent("new order from recommendation",msg);};
    this.new_order_from_offer = function(content){var msg = content[0];logEvent("new order from offer",msg);};
    this.new_order_confirmation = function(content){var msg = content[0];logEvent("new order confirmation",msg);};
    this.new_offer_comment = function(content){var msg = content[0];logEvent("new offer comment",msg);};
    this.new_blog_comment = function(content){var msg = content[0];logEvent("new blog comment",msg);};
    this.new_product_comment = function(content){var msg = content[0];logEvent("new product comment",msg);};
    this.new_blog_category = function(content){var msg = content[0];logEvent("new blog category",msg);};
    this.new_stream_event = function(content){var msg = content[0];logEvent("new stream event",msg);};

    //try to bind to events
    (function(){
        $_.error(function(content){self.error(content);});
        $_.new_message(function(content){self.new_message(content);});
        $_.new_session(function(content){self.new_session(content);});
        $_.logged_out(function(content){self.logged_out(content);});
        $_.new_product(function(content){self.new_product(content);});
        $_.new_user(function(content){self.new_user(content);});
        $_.new_product_category(function(content){self.new_product_category(content);});
        $_.new_cash_transfer(function(content){self.new_cash_transfer(content);});
        $_.new_cash_deposit(function(content){self.new_cash_deposit(content);});
        $_.new_cash_withdraw(function(content){self.new_cash_withdraw(content);});
        $_.new_post(function(content){self.new_post(content);});
        $_.new_ad(function(content){self.new_ad(content);});
        $_.new_ad_click(function(content){self.new_ad_click(content);});
        $_.new_offer(function(content){self.new_offer(content);});
        $_.new_product_picture(function(content){self.new_product_picture(content);});
        $_.new_picture(function(content){self.new_picture(content);});
        $_.new_profile_picture(function(content){self.new_profile_picture(content);});
        $_.new_product_recommendation(function(content){self.new_product_recommendation(content);});
        $_.new_contact(function(content){self.new_contact(content);});
        $_.new_product_message(function(content){self.new_product_message(content);});
        $_.new_phone_invitation(function(content){self.new_phone_invitation(content);});
        $_.new_email_invitation(function(content){self.new_email_invitation(content);});
        $_.new_order_from_product(function(content){self.new_order_from_product(content);});
        $_.new_order_from_recommendation(function(content){self.new_order_from_recommendation(content);});
        $_.new_order_from_offer(function(content){self.new_order_from_offer(content);});
        $_.new_order_confirmation(function(content){self.new_order_confirmation(content);});
        $_.new_offer_comment(function(content){self.new_offer_comment(content);});
        $_.new_blog_comment(function(content){self.new_blog_comment(content);});
        $_.new_product_comment(function(content){self.new_product_comment(content);});
        $_.new_blog_category(function(content){self.new_blog_category(content);});
        $_.new_stream_event(function(content){self.new_stream_event(content);});
    })();

    return this;
}