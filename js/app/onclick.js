
var formSubmitListener = (function(){
    //encapsulation
    var FormSubmitListener = function(senderElement){
        var self = this;
        //todo: STATE CHANGES from submitting, success, failed, reveresed
        
      //communicate with server, and based on return event, handle accordingly
      //e.g display recommendation sent
      self.displayWaitIndicator();
      //incase web socket closes before receive response
      //handle $_.new_recommendation, recommendation_sent
    };
    //abstraction
    this.new_instance = function(senderElement){
        return new FormSubmitListener(senderElement);
    };
    
})();


