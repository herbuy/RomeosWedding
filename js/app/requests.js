
var app_requests = (function () {
    var self = this;

    self.jsonObjectForGetUserMessages = function () {
        var obj = JSONValue.object();
        obj.set("cmd", JSONValue.string("user_messages"));
        obj.set("entity_id", JSONValue.string(
                $(".pg_u_msgs__sec_u_msgs__item_host").attr("user_id")
                )
                );
        return obj;
    };
})();
