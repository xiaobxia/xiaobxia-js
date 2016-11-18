var addEvent = function(elem, eventName, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, handler, false);
    } else if (elem.attachEvent) {
        //兼容ie
        elem.attachEvent("on" + eventName, handler);
        //绑定上下文的，不过好像不能直接写在这个函数中，因为fn的参数是个问题
        /*elem.attachEvent("on" + eventName,function (e) {
            handler.call(elem,e);
        })*/
    }
};
var removeHandler=function(element, type, handler){
    if (element.removeEventListener){
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent){
        element.detachEvent("on" + type, handler);
    } else {
        element["on" + type] = null;
    }
};