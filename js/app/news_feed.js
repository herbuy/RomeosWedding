
(function (){
    var NewsFeed = function(){
        var self = this;
        var content_selector="#home_news_feed";
        var scroll_selector=".romeo_layout_25_45_30_middle_column";
        self.append = function (content) {
            $(content_selector).append(content);
        };
        self.scrollToBottom = function () {
            $(scroll_selector).scrollTop(99999);
        };

        self.displayNotification = function(html){
            self.append(html);            
            self.scrollToBottom();
        };
        return self;
    };
    var RenderNotification = function(){

        var self = this;
        var actor_pic = function(msg){
            var actor_pic_id = msg.actor_picture_id;
            var actor_pic_html =
                $html.span("").width("40px").height("40px").borderRadius("19px");
            actor_pic_html.backgroundImageUrl($url.icon(actor_pic_id));
            return actor_pic_html.toString();
        };

        var render_item = function (msg, right_content) {
            var full_item = $html.div(
                $html.span(actor_pic(msg)).width("25%").maxWidth("48px")
                +
                $html.span(
                    right_content
                ).width("75%")
            ).borderBottom("1px solid #ddd").paddingBottom("0.5em").marginBottom("0.5em").toString();
            return full_item;
        };
        self.new_message = function(content){
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
        };

        self.new_stream_event = function(content){
            //working
            var msg = content[0];
            var user_messages_link = $html.link(
                msg.actor_name,$url.user_messages(msg.actor_no)
            );

            return render_item(
                msg,
                $html.div(user_messages_link.toString())+
                $html.div("posted to your stream").toString()
            );
        };

        return self;
    };
    
    (function(){
        var news_feed = new NewsFeed();
        var renderNotification = new RenderNotification();
        /*$_.new_message(function (content) {
            news_feed.displayNotification(renderNotification.new_message(content));
        });*/
        $_.new_stream_event(function (content) {
            news_feed.displayNotification(renderNotification.new_stream_event(content));
        });
    })();

})();

