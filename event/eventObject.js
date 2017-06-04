var getEvent = function (event) {
    return event ? event : window.event;
};
var getEventTarget = function (event) {
    return event.target || event.srcElement;
};
//得到事件对象中的name为"submit-btn"的元素
var btn = target.elements["submit-btn"];
//阻止冒泡
var stopPropagation = function (event) {
    if (event.stopPropagation){
        event.stopPropagation();
    } else{
        event.cancelBubble = true;
    }
};
//阻止默认行为
var preventDefault=function (event) {
    if(event.preventDefault){
        event.preventDefault();
    }else {
        event.returnValue=false;
    }
};