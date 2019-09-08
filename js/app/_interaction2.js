$("form").submit(function(e){
    chapShowToaster("Submitting.. please wait");
});


var lightBox = (function (){
    var self = this;
    var identifier = null;

    self.identifier = function(){
        return identifier;
    };

    var showLightBox = function(){
        $(".lightbox").fadeIn();
        $(".lightbox_bg").fadeIn();
        return self;
    };
    var hideLightBox = function(){
        $(".lightbox").fadeOut();
        $(".lightbox_bg").fadeOut();
        return self;
    };
    self.setPercentWidth = function(new_percent_width){
        var percent_width = isNaN(new_percent_width) ? 94 : new_percent_width;
        var percent_margin = 100 - percent_width;
        var percent_margin_left = percent_margin / 2;
        var percent_margin_right = percent_margin / 2;
        $(".lightbox").css({width:percent_width+"%",marginLeft:percent_margin_left+"%",marginRight:percent_margin_right+"%"});
        return self;
    };

    var setTitle = function(newTitle){
        $(".lightbox_title").html(newTitle);
        return self;
    };
    var setContent = function(newContent){
        $(".lightbox_content").html(newContent);
        return self;
    };

    self.setOptions = function(jsonObject){
        setTitle(jsonObject.title || "");
        setContent(jsonObject.content || "");
        self.setPercentWidth(jsonObject.percent_width);
        var show = jsonObject.show || false;
        identifier = jsonObject.identifier || null;

        if(show){
            showLightBox();
        }
        else{
            hideLightBox();
        }
        return self;
    };

    $$(".lightbox_close_btn").click(function(e){
        hideLightBox();
        return false;
    });
    $$(".lightbox_bg").click(function(e){
        hideLightBox();
        return false;
    });

    return self;
})();

/*
$$(".accept_offer").click(function(e){
    var sender = e.target;
    
    var originalVal = $(sender).val();
    $(sender).val("Accepting..");
    $.ajax({
        method:"post",
        url:"json/accept_offer.php",
        success:function(data){  
            var json = JSON.parse(data) || {};
            if(json.error === ""){
                $(sender).val("offer accepted");
            }
            else{
                $(sender).val(json.error);
                setTimeout(function(){
                    $(sender).val(originalVal);
                },3000);
            }
                        
        },
        error:function(e){
            $(sender).val("failed");
            setTimeout(function(){
                $(sender).val(originalVal);
            },3000);
            //after timeout
        }
    });
    return false;
    
});
*/

function getLoadIndicator(){
    var indicator = document.getElementById("load_indicator");
    return indicator;
    //return typeof (indicator) === 'object' ? indicator : document.createElement('div');
}
function show_load_indicator(){
    try{
        getLoadIndicator().style.display = "block";
    }
    catch(ex){
    }
}
function hide_load_indicator(){
    try{
        getLoadIndicator().style.display = "none";
    }
    catch(ex){
    }
}
function iframe_load_url(iframe_id,url){
    try{

        //var div = document.createElement('div');
        //show_load_indicator();
        //window.frames[iframe_id].location = url;
    }
    catch(ex){
    }

}


jEvent.ready(function(){
    //alert("document ready");
    //get the url

    var EditorCenterStage = function(){

        var self = this;
        var selector = "[name=my_iframe]";

        self.loadUrl = function(url){
            $(selector).html(["<h1>Please Wait...</h1><img style='height:100px; width:100px;margin:auto;display:block' src='",$url.asset("busy-indicator-blue5.gif"),"'/>"].join(""));
            $.ajax({
                url:url,
                method:"get",
                error:function(e){
                    $(selector).html("Failed to load. Check Network");
                },
                success:function(result){
                    $(selector).html(result);
                }
            });
        };

        //load default data
        self.loadUrl($(selector).attr("src"));

        return self;
    };

    var editorCenter = new EditorCenterStage();
    //editor.loadUrl()

    $("[target=my_iframe]").click(function(e){
        editorCenter.loadUrl($(this).attr("href"));
        return false;
    });

    //new LightBoxInteraction();


    /*
    $$("input").click(function(e){
        //alert("wooow");
    });

    $$("input").change(function(e){
        alert(e.target.value);
        //alert(e.target.value);
    });*/


    //Lightbox related functionality
    /*$$(".zoomable_image").click(function(e){
        var src = $(e.target).attr("src") || "";
        lightBox.setOptions({
            title:"LARGE VIEW",
            content:"<div style='background-image:url(%s);height:100%;background-size:contain;background-repeat:no-repeat;background-position:center'/>".replace("%s",src),
            show:true,
            percent_width:94,
            identifier:"image_zoom"
        });
        return false;
    });*/
    var getLoginPercentWidth = function(){
        var clientWidth = $(document).width();
        var dialogWidth = Math.max(0.3 * clientWidth, 300);
        return Math.min(dialogWidth * 100 / clientWidth,94);
    };
    $$(".js_login_link").click(function(e){
        lightBox.setOptions({
            title:"PLEASE LOGIN",content:$(".js_login_dialog").html(),
            show:true, percent_width:getLoginPercentWidth(),identifier:"login"
        });
        return false;
    });

    window.addEventListener('resize',function(e){
        if(lightBox.identifier() === "login"){
            lightBox.setPercentWidth(getLoginPercentWidth());
        }
    });

    $$(".js_global_menu_btn").click(function(e){
        lightBox.setOptions({
            title:"Go to page",content:$(".js_global_menu_items").html(),
            show:true, percent_width:94
        });
        return false;
    });

});
//$$(".accept_offer").disableClick();
    
    