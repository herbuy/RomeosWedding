var JSONValue = {
    number: function(number){
        var JSONNumber = function (number){
            if(isNaN(number)){
                throw "expected number";
            }
            this.toString = function(){
                return number;
            };
        };
        return new JSONNumber(number);
    },
    string: function(string){
        var JSONString = function (string){
            this.toString = function(){
                var escape = function (string) {
                    return string.replace('"','\\"')
                };
                return '"' + escape(string) + '"';
            };
        };
        return new JSONString(string);
    },
    array: function(){
        var JSONArray = function (){
            var arr = [];
            var self = this;

            this.toString = function(){
                var output = "[";
                var separator = "";
                for(var i = 0; i < arr.length;i++){
                    var itemAsString = arr[i].toString();
                    output += separator + itemAsString;
                    separator = ",";
                }
                output += "]";
                return output;
            };

            this.push = function (value) {
                arr.push(value);
                return self;
            };
        };
        return new JSONArray();
    },
    object: function(){
        var JSONObject = function (){
            var pairs = [];
            var self = this;

            var Pair = function (key, value) {
                var self = this;

                self.toString = function () {
                    return key.toString() + ":" + value.toString();
                };
            };

            this.set = function (key, value) {
                pairs.push(
                    new Pair(
                        new JSONValue.string(key),
                        value
                    )
                );
                return self;
            };

            this.toString = function(){
                var output = "{";
                var separator = "";
                for(var i = 0; i < pairs.length;i++){
                    var itemAsString = pairs[i].toString();
                    output += separator + itemAsString;
                    separator = ",";
                }
                output += "}";
                return output;
            };
            
            this.toJSON = function(){
                return JSON.parse(self.toString());
            }
        };
        return new JSONObject();
    }

};
