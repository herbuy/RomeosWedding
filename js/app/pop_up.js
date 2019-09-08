
(function popDownBehavior() {
    
    var headerArea = (function () {
        var self = this;
        var selector = "#pop_up_header";

        //supported methods
        self.click = function (callback) {
            $(selector).click(callback);
        };
        return self;
    })();

    var contentArea = (function () {
        var self = this;
        var selector = "#pop_up_content_area";
        var visible = null;

        //supported methods
        self.show = function () {
            $(selector).slideDown();
            visible = true;
        };
        self.hide = function () {
            $(selector).slideUp();
            visible = false;
        };
        self.toggleVisibility = function () {
            if (self.isVisible()) {
                self.hide();
            } else {
                self.show();
            }
        };
        self.append = function (content) {
            $(selector).append(content);
        };
        self.scrollToBottom = function () {
            $(selector).scrollTop(99999);
        };

        self.isVisible = function () {
            return visible;
        };

        (function __construct() {
            $(selector).hide();
            visible = false;
        })();

        return self;

    })();

    var actor_pic;
    actor_pic = function(msg){
        var actor_pic_id = msg.actor_picture_id;
        var actor_pic_html =
            $html.span("").width("40px").height("40px").borderRadius("19px");
        actor_pic_html.backgroundImageUrl($url.icon(actor_pic_id));
        return actor_pic_html.toString();
    };

    var render_item;
    render_item = function (msg, right_content) {
        var full_item = $html.div(
            $html.span(actor_pic(msg)).width("25%").maxWidth("48px")
            +
            $html.span(
                right_content
            ).width("75%")
        ).borderBottom("1px solid #ddd").paddingBottom("0.5em").marginBottom("0.5em").toString();
        return full_item;
    };
    
    var displayNotification;
    displayNotification = function (full_item) {
        contentArea.append(full_item);
        contentArea.show();
        contentArea.scrollToBottom();
    };
    
    (function(){
        $("#pop_down").css({"display": "inline-block"});
        headerArea.click(function (e) {
            contentArea.toggleVisibility();
        });
        
        this.prototype = new SSEListener();
        
        this.prototype.error = function (content) {
            displayNotification("<div>error:" + content + "</div>");            
        };
        this.prototype.new_message = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var user_messages_link = $html.link(
                    msg.actor_name,$url.user_messages(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(user_messages_link.toString())+
                    $html.div(msg.content).toString()
                );
            })());
                         
        };
        
        this.prototype.new_cash_transfer = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.user_cash(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("sent you cash").toString()
                );
            })());
              
        };
        this.prototype.new_cash_deposit = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.user_cash_deposited(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("deposited cash to your account").toString()
                );
            })());
            
        };
        this.prototype.new_cash_withdraw = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.user_cash_withdrawn(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("withdrew cash from your account").toString()
                );
            })());
            
        };
        this.prototype.new_post = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.user_blogs(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("posted this to you:").toString()
                );
            })());
            
        };
        
        this.prototype.new_offer = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.product_offers(msg.product_id)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("offered to buy this item:").toString()
                );
            })());
            
        };
        
        this.prototype.new_product_recommendation = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.user_product_recommendations(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("recommended for you this item:").toString()
                );
            })());
            
        };
        this.prototype.new_contact = function(content){
            
        };
        this.prototype.new_product_message = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.user_product_messages(msg.actor_no, msg.product_id)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("sent you a message about this item:").toString()
                );
            })());
            
        };
        
        this.prototype.new_offer_comment = function(content){
            //
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.offer_comments(msg.offer_id)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("commented on the offer:").toString()
                );
            })());
            
        };
        this.prototype.new_blog_comment = function(content){
            //working
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.blog_comments(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("commented on a post:").toString()
                );
            })());
            
        };
        
        this.prototype.new_stream_event = function(content){
            displayNotification((function(){
                var msg = content[0];
                var details_link = $html.link(
                    msg.actor_name,$url.home(msg.actor_no)
                );

                return render_item(
                    msg,
                    $html.div(details_link.toString())+
                    $html.div("posted to your stream:").toString()
                );
            })());
            
        };
    })();

})();
