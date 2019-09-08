var $env = (function(){
    var is_offline = true;
    var self = this;
    self.request_scheme = function(){
        return "http://";
    };
    self.domain_path = function(){
        return is_offline ? "localhost/romeoswedding" : "www.romeoswedding.com";
    };
    return self;
})();