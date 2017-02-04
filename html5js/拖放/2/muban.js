function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    //把id名给Text
    ev.dataTransfer.effectAllowed="all";
    ev.dataTransfer.setData("text/html",ev.target.id);

}

function drop(ev)
{
    ev.preventDefault();
    //得到数据就是id名
    //数据类型用哪个并没有区别
    ev.dataTransfer.dropEffect="all";
    var data=ev.dataTransfer.getData("text/html");

    //通过id添加
    ev.target.appendChild(document.getElementById(data));
}