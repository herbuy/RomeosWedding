
//library of html elements
//===============================

var $html = (function(){

    var $html_ = function(){
        var self = this;
        self.toString = function () {
            return self.toHtml();
        };

        var canHaveChildren = true;
        var tag = "span";

        var getTag = function () {
            return (new SmartHtmlSpecialChars(tag)).getText();
        };
        self.toHtml = function () {
            var attribute_string = attributesAsString();
            if(attribute_string.length > 0){
                attribute_string = " " + attribute_string;
            }
            var style_string = stylesAsString();
            if(style_string.length > 0){
                style_string = " style='" + style_string + "'";
            }
            var output = "<"+getTag()+attribute_string+style_string;
            output += canHaveChildren ? ">" : "/>";
            if(!canHaveChildren){
                return output;
            }
            output += childrenAsString();
            output += "</" + getTag() + ">";
            return output;
        };
        var children = [];
        var childrenAsString = function () {
            var output = "";
            for(var i = 0; i < children.length;i++){
                output += children[i].toString();
            }
            return output;
        };

        var attribute_dictionary = {};
        

        var attributesAsString = function () {

            var output = "";
            var delimiter = "";
            for (var key in attribute_dictionary){
                var attr_name = (new SmartHtmlSpecialChars(key.toString())).getText();
                var attr_value = (new SmartHtmlSpecialChars(attribute_dictionary[key].toString())).getText();
                output +=  delimiter + attr_name + "='" + attr_value + "'";
                delimiter = " ";
            }
            return output;
        };
        
        var style_dictionary = {};
        var stylesAsString = function () {

            var output = "";
            var delimiter = "";
            for (var key in style_dictionary){
                var attr_name = (new SmartHtmlSpecialChars(key.toString())).getText();
                var attr_value = (new SmartHtmlSpecialChars(style_dictionary[key].toString())).getText();
                output +=  delimiter + attr_name + ":" + attr_value;
                delimiter = ";";
            }
            return output;
        };
        var setStyle = function(key,value){
            style_dictionary[key] = value;
            return self;
        };
        self.position = function(value){
            return setStyle('position',value);            
        };
        self.positionStatic = function(){
            return self.position('static');            
        };
        self.positionRelative = function(){
            return self.position('relative');            
        };
        self.positionAbsolute = function(){
            return self.position('absolute');            
        };
        self.positionFixed = function(){
            return self.position('fixed');            
        };
        self.top = function(value){
            return setStyle('top',value);            
        };
        self.left = function(value){
            return setStyle('left',value);             
        };
        self.width = function(value){
            return setStyle('width',value);            
        };
        self.maxWidth = function(value){
            return setStyle('max-width',value);            
        };
        self.minWidth = function(value){
            return setStyle('min-width',value);            
        };
        
        self.height = function(value){
            return setStyle('height',value);             
        };
        self.maxHeight = function(value){
            return setStyle('max-height',value);             
        };
        self.minHeight = function(value){
            return setStyle('min-height',value);             
        };
        self.backgroundImageUrl = function(value){
            return setStyle('background-image',["url(",value,")"].join(""));              
        };
        self.borderRadius = function(value){
            return setStyle('border-radius',value);             
        };
        self.border = function(value){
            return setStyle('border',value);             
        };
        self.borderWidth = function(value){
            return setStyle('border-width',value);             
        };
        self.borderColor = function(value){
            return setStyle('border-color',value);             
        };
        self.borderStyle = function(value){
            return setStyle('border-style',value);             
        };
        self.borderTop = function(value){
            return setStyle('border-top',value);             
        };
        self.borderTopWidth = function(value){
            return setStyle('border-top-width',value);             
        };
        self.borderTopColor = function(value){
            return setStyle('border-top-color',value);             
        };
        self.borderTopStyle = function(value){
            return setStyle('border-top-style',value);             
        };
        self.borderLeft = function(value){
            return setStyle('border-left',value);             
        };
        self.borderLeftWidth = function(value){
            return setStyle('border-left-width',value);             
        };
        self.borderLeftColor = function(value){
            return setStyle('border-left-color',value);             
        };
        self.borderLeftStyle = function(value){
            return setStyle('border-left-style',value);             
        };
        self.borderRight = function(value){
            return setStyle('border-right',value);             
        };
        self.borderRightWidth = function(value){
            return setStyle('border-right-width',value);             
        };
        self.borderRightColor = function(value){
            return setStyle('border-right-color',value);             
        };
        self.borderRightStyle = function(value){
            return setStyle('border-right-style',value);             
        };
        self.borderBottom = function(value){
            return setStyle('border-bottom',value);             
        };
        self.borderBottomWidth = function(value){
            return setStyle('border-bottom-width',value);             
        };
        self.borderBottomColor = function(value){
            return setStyle('border-bottom-color',value);             
        };
        self.borderBottomStyle = function(value){
            return setStyle('border-bottom-style',value);             
        };
        self.padding = function(value){
            return setStyle('padding',value);             
        };
        self.paddingTop = function(value){
            return setStyle('padding-top',value);             
        };
        self.paddingLeft = function(value){
            return setStyle('padding-left',value);             
        };
        self.paddingRight = function(value){
            return setStyle('padding-right',value);             
        };
        self.paddingBottom = function(value){
            return setStyle('padding-bottom',value);             
        };
        self.margin = function(value){
            return setStyle('margin',value);             
        };
        self.marginTop = function(value){
            return setStyle('margin-top',value);             
        };
        self.marginLeft = function(value){
            return setStyle('margin-left',value);             
        };
        self.marginRight = function(value){
            return setStyle('margin-right',value);             
        };
        self.marginBottom = function(value){
            return setStyle('margin-bottom',value);             
        };
                
        self.addChild = function(smartHTMLElement){
            children.push(smartHTMLElement);
            return self;
        };

        self.setAttribute = function (name,value) {
            attribute_dictionary[name] = value;
            return self;
        };
        self.setLang = function (value) {
            return self.setAttribute("lang",value);
        };
        self.setLangToEn = function () {
            return self.setLang("en");
        };
        //===============
        self.setCharset = function (value) {
            return self.setAttribute("charset",value);            
        };
        self.setCharsetToUtf8 = function () {
            self.setCharset("utf-8");
            return self;
        };

        self.setSrc = function (value) {
            return self.setAttribute("src",value);            
        };
        self.setHref = function(url){
            return self.setAttribute("href",url);            
        };
        //===============
        self.setTagTo =  function (string) {
            //todo:do html special chars
            tag = string;
            return self;
        };
       
        var make = function (tag,content) {
            var html = new $html_();
            html.setTagTo(tag);            
            html.addChild(content);
            return html;
        };
        self.link = function (content,url) {
            var anchor = make("a",content);
            anchor.setHref(url);  
            return anchor;
        };
        self.headlink = function () {
            return make("link",null);            
        };
        self.body = function (content) {
            return make("body",content);
        };
        self.html = function (content) {
            return make("html",content);
        };
        self.head = function (content) {
            return make("head",content);
        };
        self.title = function (content) {
            return make("title",content);
        };
        self.script = function (content) {
            return make("script",content);
        };
        self.div = function (content) {
            return make("div",content);
        };
        self.span = function (content) {
            return make("span",content);
        };
        self.meta = function () {
            return make("meta",null);
        };
        self.h1 = function (content) {
            return make("h1",content);
        };
        self.h2 = function (content) {
            return make("h2",content);
        };
        self.h3 = function (content) {
            return make("h3",content);
        };
        self.h4 = function (content) {
            return make("h4",content);
        };
        self.h5 = function (content) {
            return make("h5",content);
        };
        self.h6 = function (content) {
            return make("h6",content);
        };
        return self;

    };
    
    var SmartHtmlSpecialChars = function(string) {

        var self = this;
        var reHtmlSpecialChar = /^[<>'"&]$/;

        self.getText = function () {
            var strValue = string;
            var strOutput = "";
            var index = 0;
            while (index < strValue.length) {

                if (reHtmlSpecialChar.test(strValue.charAt(index))) {
                    var newText = getNewText(strValue.charAt(index));
                    strOutput += "&" + newText + ";";
                }
                else {
                    strOutput += strValue.charAt(index);
                }
                index++;
            }
            return strOutput;
        };

        var getNewText = function (string) {
            switch (string) {
                case "<":
                    return "lt";
                case ">":
                    return "gt";
                case "'":
                    return "quot";
                case '"':
                    return "quot";
                case "&":
                    return "amp";
                default:
                    return string;
            }
        };
    };

    return new $html_();
})();