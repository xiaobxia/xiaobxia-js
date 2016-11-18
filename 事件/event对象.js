var getEvent = function (event) {
    return event ? event : window.event;
};
var getEventTarget = function (event) {
    return event.target || event.srcElement;
};
var stopPropagation = function (event) {
    if (event.stopPropagation){
        event.stopPropagation();
    } else{
        event.cancelBubble = true;
    }
};
var preventDefault=function (event) {
    if(event.preventDefault){
        event.preventDefault();
    }else {
        event.returnValue=false;
    }
};