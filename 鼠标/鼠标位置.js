//相对于浏览器窗口
function mousePositionClient(event) {
    var e = event || window.event,
        position = {};
    position.x = e.clientX;
    position.y = e.clientY;
    return position;
}
//相对于屏幕
function mousePositionScreen(event) {
    var e = event || window.event,
        position = {};
    position.x = event.screenX;
    position.y = event.screenY;
    return position;
}
//相对于页面
function mousePositionPage(event) {
    var e = event || window.event,
        position = {};
    var pageX = event.pageX,
        pageY = event.pageY;
    //如果没有pageX对象
    if (pageX === undefined) {
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    }
    if (pageY === undefined) {
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
    }
    position.x = pageX;
    position.y = pageY;
    return position;

}