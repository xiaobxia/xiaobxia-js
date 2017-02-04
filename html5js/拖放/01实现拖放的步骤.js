/**
 * 1.将想要拖放的对象元素的draggable属性设置为true，img元素和a元素默认可以拖放
 * 2.编写于拖放有关事件的处理代码
 *
 * 被拖放的元素的事件：
 * dragstart：开始拖放的操作
 * drag：拖放过程中
 *
 * 拖放过程中鼠标经过的元素（拖放到的目标对象也算是经过的元素）
 * dragenter：进入本元素范围内
 * dragover：在本元素范围内运动
 * dragleave：离开本元素的范围
 *
 * 拖放到的目标对象
 * drop：有元素拖放到了本元素内
 * dragend：拖放操作结束
 *
 */
/**
 * 注意点
 * 1.开始拖动（dragstart事件发生时），使用setData方法把数据存入DataTransfer对象，
 * 参数1：数据的MIME类型，支持的有：text/plain,text/html,text/xml,text/uri-list
 * 参数2：数据，如"你好"，如果为this.id或event.target.id那就是这个元素（text时是文字，html时是dom）
 * getData方法参数是MIME类型
 *
 * 2.对于拖放的目标，dragend或dragover事件内要preventDefault，取消默认行为（默认行为是不接受元素）
 *
 * 3.drop事件也要关闭默认处理
 *
 * 4.页面也要关闭默认处理，页面不能拒绝拖放，页面拒绝了拖放其元素也是拒绝拖放
 * document.ondragover = function(e){e.preventDefault();};
 * document.ondrop = function(e){e.preventDefault();};
 *
 * 5.有些浏览器中，被拖放元素要添加"-weblit-user-drag:element"这个css属性
 *
 */
function init()
{
    var source = document.getElementById("dragme");
    var dest = document.getElementById("text");
    // (1) 拖放开始
    source.addEventListener("dragstart", function(ev)
    {
        // 向dataTransfer对象追加数据
        var dt = ev.dataTransfer;
        dt.effectAllowed = 'all';
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
//(6) 设置页面属性，不执行默认处理（拒绝被拖放）
document.ondragover = function(e){e.preventDefault();};
document.ondrop = function(e){e.preventDefault();};