/**
 * 实现的思想在于当表单submit触发以后
 * 对表单中的submit的按钮进行禁用
 */
var addEvent = function (elem, eventName, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, handler, false);
    } else if (elem.attachEvent) {
        //兼容ie
        elem.attachEvent("on" + eventName, handler);
    }
};
addEvent(form, "submit", function (event) {
    var e = event || window.event,
        target = event.target || event.srcElement;
    //得到事件对象中的name为"submit-btn"的元素
    var btn = target.elements["submit-btn"];
    btn.disabled = true;
});