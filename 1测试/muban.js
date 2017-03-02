var $ = function (id) {
    return typeof id === "string" ? document.getElementById(id) : id
};
var addEvent = function (elem, eventName, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, handler, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + eventName, handler);
    }
};
var ss=13;
var dd="13";
var inp=$("five");
var btn=$("eight");
addEvent(btn,"click",function () {
    console.log(ss);
    console.log(dd);
    console.log(inp.value);
});



