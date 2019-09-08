/* global $html */

var $_ = (function () {

    //FUNCTION DECLARATIONS

    //OBJECT DECLARATIONS
    var StatusMessage;
    var EventListeners;
    var connection;

    StatusMessage = function (messageText) {
        console.log(messageText);
    };

    EventListeners = function () {
        var self = this;
        var subscribers = [];
        self.subscribe = function (callback) {
            if (typeof (callback) === "function") {
                subscribers.push(callback);
            }
        };
        
        self.notify = function (eventArgs) {
            setTimeout(function(e){
                for (var i = 0; i < subscribers.length; i++) {
                var cb = subscribers[i]; 
                cb(eventArgs);
            }
            },40);
        };
    };

    var requestForSetSessionId;
    requestForSetSessionId = function () {
        var requestObj = JSONValue.object();
        requestObj.set("cmd", JSONValue.string("set_session_id"));
        requestObj.set("session_id", JSONValue.string($.cookie("PHPSESSID")));
        requestObj = requestObj.toString();
        return requestObj;
    };

    connection = function () {

        //VARIABLE DECLARATIONS
        var self = this;
        var domain = "127.0.0.1";
        var protocol = "ws";
        var port = "8080";
        var state = "initial";
        var ws = null;
        var pendingQueries = [];
        //FUNCTION DECLARATIONS
        var setState;
        var createSocket;
        var onError;
        var onClose;
        var onOpen;
        var onMessage;
        var tryReconnectLater;
        var sendAnyPendingQueries;
        //OBJECT DECLARATIONS

        tryReconnectLater = function () {
            var timerId;
            timerId = setTimeout(function (e) {
                clearTimeout(timerId);
                if (state != "open") {
                    new StatusMessage("trying to reconnect...");
                    createSocket();
                }
            }, 5000);
        };

        sendAnyPendingQueries = function () {

        };

        setState = function (newState) {
            state = newState;
            new StatusMessage("Connection status: " + state);
        };


        onError = function (e) {
            setState("error");
        };
        onClose = function (e) {
            setState("closed");
            tryReconnectLater();
        };
        onOpen = function (e) {
            setState("open");
        };
        onMessage = function (e) {
            try
            {
                var json_object = JSON.parse(e.data);
                var event = json_object.event;
                var content = json_object.content;
                if (!event) {
                    new StatusMessage("event attribute missing");
                } else if (event === "error") {
                    new StatusMessage("ERROR!! " + content);
                    listeners_for_error.notify(content);
                } else if (event === "session_id_requested") {
                    new StatusMessage("session id requested!!");
                    self.send(requestForSetSessionId());
                } else if (event === "session_id_set") {
                    new StatusMessage("session id set!!");
                    setState("ready");
                    sendAnyPendingQueries();
                } else if (event === "message_sent") {
                    new StatusMessage("MESSAGE SENT!!");
                    listeners_for_message_sent.notify(content);
                } else if (event === "new_message") {
                    new StatusMessage("new message");
                    listeners_for_new_message.notify(content);
                } else if (event === "user_messages") {
                    new StatusMessage("user messages received!!");
                    //onUserMessages.notify(content);
                } else if (event === "new_session") {
                    //friends
                    new StatusMessage("new session");
                } else if (event === "logged_out") {
                    //friends
                    new StatusMessage("logged out");
                } else if (event === "new_product") {
                    //friends
                    new StatusMessage("new product");                    
                } else if (event === "new_user") {
                    //self
                    new StatusMessage("new user");
                } else if (event === "new_product_category") {
                    new StatusMessage("new product category");
                } else if (event === "new_cash_transfer") {
                    //working
                    new StatusMessage("new cash transfer");
                    listeners_for_new_cash_transfer.notify(content);
                } else if (event === "new_cash_deposit") {
                    //working
                    new StatusMessage("new cash deposit");
                    listeners_for_new_cash_deposit.notify(content);
                } else if (event === "new_cash_withdraw") {
                    //working
                    new StatusMessage("new cash withdraw");
                    listeners_for_new_cash_withdraw.notify(content);
                } else if (event === "new_post") {
                    //working
                    new StatusMessage("new post");
                    listeners_for_new_post.notify(content);
                } else if (event === "new_ad") {
                    //all
                    new StatusMessage("new ad");
                    listeners_for_new_ad.notify(content);
                } else if (event === "new_ad_click") {
                    //actor
                    new StatusMessage("new ad click");
                } else if (event === "new_offer") {
                    //working
                    new StatusMessage("new offer");
                    listeners_for_new_offer.notify(content);
                } else if (event === "new_product_picture") {
                    //all
                    new StatusMessage("new product picture");
                    listeners_for_new_product_picture.notify(content);
                } else if (event === "new_picture") {
                    //self
                    new StatusMessage("new picture");
                    listeners_for_new_picture.notify(content);
                } else if (event === "new_profile_picture") {
                    //friends
                    new StatusMessage("new profile picture");
                    listeners_for_new_profile_picture.notify(content);
                } else if (event === "new_product_recommendation") {
                    //working
                    new StatusMessage("new product recommendation");
                    listeners_for_new_product_recommendation.notify(content);
                } else if (event === "new_contact") {
                    //target
                    new StatusMessage("new contact");
                    listeners_for_new_contact.notify(content);
                } else if (event === "new_product_message") {
                    //working
                    new StatusMessage("new product message");
                    listeners_for_new_product_message.notify(content);
                } else if (event === "new_phone_invitation") {
                    //none
                    new StatusMessage("new phone invitation");
                } else if (event === "new_email_invitation") {
                    //none
                    new StatusMessage("new email invitation");
                } else if (event === "new_order_from_product") {
                    //self
                    new StatusMessage("new order from product");
                } else if (event === "new_order_from_recommendation") {
                    //self
                    new StatusMessage("new order from recommendation");
                } else if (event === "new_order_from_offer") {
                    //self
                    new StatusMessage("new order from offer");
                } else if (event === "new_order_confirmation") {
                    //targets
                    new StatusMessage("new order confirmation");
                } else if (event === "new_offer_comment") {
                    new StatusMessage("new offer comment");
                    listeners_for_new_offer_comment.notify(content);
                } else if (event === "new_blog_comment") {
                    new StatusMessage("new blog comment");
                    listeners_for_new_blog_comment.notify(content);
                } else if (event === "new_product_comment") {
                    new StatusMessage("new product comment");
                    listeners_for_new_product_comment.notify(content);
                } else if (event === "new_blog_category") {
                    new StatusMessage("new blog category");
                    listeners_for_new_blog_category.notify(content);
                } else if (event === "new_stream_event") {
                    new StatusMessage("new stream event");
                    listeners_for_new_stream_event.notify(content);
                }
            } catch (exception) {
                new StatusMessage(exception);
            }
        };

        createSocket = function () {
            try {
                ws = new WebSocket(protocol + "://" + domain + ":" + port);
                ws.onerror = onError;
                ws.onclose = onClose;
                ws.onopen = onOpen;
                ws.onmessage = onMessage;
            } catch (exception) {
                new StatusMessage("failed to connect");
                tryReconnectLater();
            }

        };


        self.send = function (request_string) {
            new StatusMessage("sending: " + request_string);
            if (typeof (request_string) === "object") {
                request_string = request_string.toString();
            }
            /*if(state != "open"){
             
             createSocket();
             }*/
            ws.send(request_string);
        };
        self.log = function (msg) {
            new StatusMessage(msg);
        };
        
        var listeners_for_error = new EventListeners();
        self.error = function (callback) {
            listeners_for_error.subscribe(callback);
        };

        var listeners_for_message_sent = new EventListeners();
        self.message_sent = function (callback) {
            listeners_for_message_sent.subscribe(callback);
        };

        var listeners_for_new_message = new EventListeners();
        self.new_message = function (callback) {
            listeners_for_new_message.subscribe(callback);
        };
        var listeners_for_new_session = new EventListeners();
        self.new_session = function (callback) {
            listeners_for_new_session.subscribe(callback);
        };
        var listeners_for_loggedout = new EventListeners();
        self.logged_out = function (callback) {
            listeners_for_loggedout.subscribe(callback);
        };
        var listeners_for_new_product = new EventListeners();
        self.new_product = function (callback) {
            listeners_for_new_product.subscribe(callback);
        };
        
        var listeners_for_new_user = new EventListeners();
        self.new_user = function (callback) {
            listeners_for_new_user.subscribe(callback);
        };
        
        var listeners_for_new_product_category = new EventListeners();
        self.new_product_category = function (callback) {
            listeners_for_new_product_category.subscribe(callback);
        };
        
        var listeners_for_new_cash_transfer = new EventListeners();
        self.new_cash_transfer = function (callback) {
            listeners_for_new_cash_transfer.subscribe(callback);
        };
        
        var listeners_for_new_cash_deposit = new EventListeners();
        self.new_cash_deposit = function (callback) {
            listeners_for_new_cash_deposit.subscribe(callback);
        };
        
        var listeners_for_new_cash_withdraw = new EventListeners();
        self.new_cash_withdraw = function (callback) {
            listeners_for_new_cash_withdraw.subscribe(callback);
        };
        
        var listeners_for_new_post = new EventListeners();
        self.new_post = function (callback) {
            listeners_for_new_post.subscribe(callback);
        };
        var listeners_for_new_ad = new EventListeners();
        self.new_ad = function (callback) {
            listeners_for_new_ad.subscribe(callback);
        };
        var listeners_for_new_ad_click = new EventListeners();
        self.new_ad_click = function (callback) {
            listeners_for_new_ad_click.subscribe(callback);
        };
        var listeners_for_new_offer = new EventListeners();
        self.new_offer = function (callback) {
            listeners_for_new_offer.subscribe(callback);
        };
        var listeners_for_new_product_picture = new EventListeners();
        self.new_product_picture = function (callback) {
            listeners_for_new_product_picture.subscribe(callback);
        };
        var listeners_for_new_picture = new EventListeners();
        self.new_picture = function (callback) {
            listeners_for_new_picture.subscribe(callback);
        };
        var listeners_for_new_profile_picture = new EventListeners();
        self.new_profile_picture = function (callback) {
            listeners_for_new_profile_picture.subscribe(callback);
        };
        var listeners_for_new_product_recommendation = new EventListeners();
        self.new_product_recommendation = function (callback) {
            listeners_for_new_product_recommendation.subscribe(callback);
        };
        var listeners_for_new_contact = new EventListeners();
        self.new_contact = function (callback) {
            listeners_for_new_contact.subscribe(callback);
        };
        var listeners_for_new_product_message = new EventListeners();
        self.new_product_message = function (callback) {
            listeners_for_new_product_message.subscribe(callback);
        };
        var listeners_for_new_phone_invitation = new EventListeners();
        self.new_phone_invitation = function (callback) {
            listeners_for_new_phone_invitation.subscribe(callback);
        };
        var listeners_for_new_email_invitation = new EventListeners();
        self.new_email_invitation = function (callback) {
            listeners_for_new_email_invitation.subscribe(callback);
        };
        var listeners_for_new_order_from_product = new EventListeners();
        self.new_order_from_product = function (callback) {
            listeners_for_new_order_from_product.subscribe(callback);
        };
        var listeners_for_new_order_from_recommendation = new EventListeners();
        self.new_order_from_recommendation = function (callback) {
            listeners_for_new_order_from_recommendation.subscribe(callback);
        };
        var listeners_for_new_order_from_offer = new EventListeners();
        self.new_order_from_offer = function (callback) {
            listeners_for_new_order_from_offer.subscribe(callback);
        };
        var listeners_for_new_order_confirmation = new EventListeners();
        self.new_order_confirmation = function (callback) {
            listeners_for_new_order_confirmation.subscribe(callback);
        };
        var listeners_for_new_offer_comment = new EventListeners();
        self.new_offer_comment = function (callback) {
            listeners_for_new_offer_comment.subscribe(callback);
        };
        var listeners_for_new_blog_comment = new EventListeners();
        self.new_blog_comment = function (callback) {
            listeners_for_new_blog_comment.subscribe(callback);
        };
        var listeners_for_new_product_comment = new EventListeners();
        self.new_product_comment = function (callback) {
            listeners_for_new_product_comment.subscribe(callback);
        };
        var listeners_for_new_blog_category = new EventListeners();
        self.new_blog_category = function (callback) {
            listeners_for_new_blog_category.subscribe(callback);
        };
        var listeners_for_new_stream_event = new EventListeners();
        self.new_stream_event = function (callback) {
            listeners_for_new_stream_event.subscribe(callback);
        };
        
        (function __construct() {
            createSocket();
        })();
        return self;

    };
    return new connection();
})();


var jq_utils = (function () {
    var self = this;
    self.scrollToBottom = function (selector) {
        $(selector).scrollTop(
                99999
                );
    };
    self.JSONObjectFromForm = function (selector) {

        var form = $(selector);
        var inputs = form.find("input");

        var output = JSONValue.object();
        inputs.each(function (e) {
            var key = $(this).attr("name");
            var value = $(this).val();
            if (key) {
                value = value ? value : "";
                value = (value === "" || isNaN(value)) ? JSONValue.string(value) : JSONValue.number(value);
                output.set(key, value);
            }
        });
        return output;
    };

    self.getUserMessageTemplateString = function () {
        var template_source = $("#log [data-role=list-item]").first();
        var msg_template = template_source.clone().wrap("<div>").parent().html();
        return msg_template + "";
    };

    self.displayContent = function (contentObject, itemRenderCallback, hostSelector) {
        var html = "";
        var length = contentObject.length;
        for (var i = 0; i < length; i++) {
            var item_html = itemRenderCallback(contentObject, i);
            html += item_html;
        }
        $(hostSelector).html(html);
        self.scrollToBottom(hostSelector);
    };

    self.displaySentContent = function (contentObject, itemRenderCallback, hostSelector) {
        var length = contentObject.length;
        if (length && length > 0) {
            var item_html = itemRenderCallback(contentObject, 0);
            $(hostSelector).find("[ui_id=9999]").remove();
            $(hostSelector).append(item_html);
        } else {
            //$(".pg_u_msgs__sec_u_msgs__item_host").append("<div style='background-color:#f77'>content empty for sent message. disable do not commit</div>");
        }
    };

    return self;

})();




