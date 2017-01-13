/**
 * 表单在提交给服务器以前会触发submit事件，阻止submit的默认行为就可以阻止表单提交
 * 阻止表单提交应该监听submit事件而不是click事件
 * 不同的浏览器触发submit和click事件的顺序不同
 */
var form = document.getElementById("form1");
EventUtil.addHander(form, "submit", function (e) {
    var event = EventUtil.getEvent(e);
    EventUtil.preventDefault(event);
});
