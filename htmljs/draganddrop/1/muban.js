function init()
{
    var source = document.getElementById("dragme");
    var dest = document.getElementById("text");
    var dragicon =document.createElement("img");
    dragicon.src="downArrow.gif";
    // (1) 拖放开始
    source.addEventListener("dragstart", function(ev)
    {
        // 向dataTransfer对象追加数据
        var dt = ev.dataTransfer;
        dt.effectAllowed = 'all';
        dt.setDragImage(dragicon,-10,-10);
        //(2) 拖动元素为dt.setData("text/plain", this.id);
        dt.setData("text/plain", "你好");
    }, false);
    // (3) dragend：拖放结束
    dest.addEventListener("dragend", function(ev)
    {
        //不执行默认处理（拒绝被拖放）
        ev.preventDefault();
    }, false);
    // (4) drop:被拖放
    dest.addEventListener("drop", function(ev)
    {
        // 从DataTransfer对象那里取得数据
        var dt = ev.dataTransfer;
        var text = dt.getData("text/plain");
        dest.textContent += text;
        //(5) 不执行默认处理（拒绝被拖放）
        ev.preventDefault();
        //停止事件传播
        ev.stopPropagation();
    }, false);
}
window.onload=function () {
    init();
};
//不设置这个时，在拖动是，鼠标下面会有禁止图标，但是还是可以用
//(6) 设置页面属性，不执行默认处理（拒绝被拖放）
document.ondragover = function(e){e.preventDefault();};
document.ondrop = function(e){e.preventDefault();};