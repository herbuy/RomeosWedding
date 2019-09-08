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
        var div = document.createElement('div');
        show_load_indicator();
        window.frames[iframe_id].location = url;
    }
    catch(ex){
    }

}