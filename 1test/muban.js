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
addEvent(document,"click",function (e) {
    var event=e||window.event,
        target=event.currentTarget;
    if(target.id=="one"){
        alert("a");
    }
});
var clipboard = new Clipboard('#copyBtn');
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});


