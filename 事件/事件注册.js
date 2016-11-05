var addEvent = function(elem, eventName, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, handler, false);
    } else if (elem.attachEvent) {
        //兼容ie
        elem.attachEvent("on" + eventName, handler);
    }
};