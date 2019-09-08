//just set this as prototype to extend it e.g this.prototype = new SSEListener();

(function (){
    var Flyout = function(){
        var self = this;
        var FlyoutHeader = function(){
            var self = this;
            var selector = "#notification_flyout_toggle";
            self.click = function (callback) {
                $(selector).click(callback);
            };
            
            var highlight = function(){
                $(selector).css({"color":"#ffc","font-weight":"bold"});                
            };
            var unhighlight = function(){
                $(selector).css({"color":"initial","font-weight":"initial"});
            };
                        
            var notificationCount = 0;
            var renderNotificationCount = function(){
                if(notificationCount === 0){
                    $(selector).html("Notifications")
                    unhighlight();
                }
                else{
                    $(selector).html(["Notifications(",notificationCount,")"].join(""));
                    highlight();
                }
            };
            var incrementNotificationCount = function(){
                notificationCount += 1;
                renderNotificationCount();
            };
            self.resetNotificationCount = function(){
                notificationCount = 0;
                renderNotificationCount();
            };
            
            (function(){

            this.prototype = new  SSEListener();


            this.prototype.new_message = function (content) {
                incrementNotificationCount();
            };
            this.prototype.new_stream_event = function (content) {
                incrementNotificationCount();
            };
        })();
        
            return self;
        };
        var FlyoutContent = function(){
            var self = this;
            var selector = "#notification_flyout";
            var content_selector="#notification_flyout_content";
            var visible = null;
            
            self.onVisible = function(sender){};
            self.onHidden = function(sender){};

            self.isVisible = function () {
                return visible;
            };

            self.show = function () {
                $(selector).slideDown();
                visible = true;
                self.onVisible(self);
            };
            self.hide = function () {
                $(selector).slideUp();
                visible = false;
                self.onHidden(self);
            };
            self.toggleVisibility = function () {
                if (self.isVisible()) {
                    self.hide();
                } else {
                    self.show();
                }
            };
            self.append = function (content) {
                $(content_selector).append(content);
            };
            self.scrollToBottom = function () {
                $(content_selector).scrollTop(99999);
            };

            self.displayNotification = function(html){
                self.append(html);
                //self.show();
                self.scrollToBottom();
            };


            return self;
        };
        self.header = new FlyoutHeader();
        self.content = new FlyoutContent();

        return self;
    };

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

    (function(){
        var flyout = new Flyout();
        flyout.content.onHidden = function(sender){
            //flyout.header.unhighlight();
        };
        flyout.content.onVisible = function(sender){
            
            flyout.header.resetNotificationCount();
            
        };
        
        flyout.content.hide();
        flyout.header.click(function(e){
            flyout.content.toggleVisibility();            
            return false;
        });
        //handler notification counter events
        
        //handle server side events

        (function(){

            this.prototype = new  SSEListener();

            this.prototype.new_message = function (content) {
                
                flyout.content.displayNotification((function(){
                    //working
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
            this.prototype.new_stream_event = function (content) {
                console.log("woooowestttt...");
            };
        })();


    })();

})();

