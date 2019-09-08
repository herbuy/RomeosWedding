var $url = (function(){
    
    var BaseUrl = function(){
        //encapsulation
        var urlParts = [];
        
        //abstaction
        this.addPath = function(string){
            //todo: url encode
            urlParts.push(string);
        };
        this.toString = function(){
            return urlParts.join("/");
        };
        //constructor
        this.addPath($env.request_scheme());
        this.addPath($env.domain_path());        
    };
    
    var Assets = function(){
        this.__proto__ = new BaseUrl();
        this.__proto__.constructor = Assets;
        this.addPath("assets");        
    };

    var Asset = function(name){
        this.__proto__ = new Assets();
        this.__proto__.constructor = Asset;
        this.addPath(name);
    };
       
    //======================
    var self = this;    
        
    //abstraction
    self.asset = function(name){
        return (new Asset(name)).toString();        
    };
    
    
    return self;
})();
