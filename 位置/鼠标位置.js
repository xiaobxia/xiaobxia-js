
var getCoordInDocumentExample = function(){
    //通过id得到元素
    var coords = document.getElementById("coords");
    //监听事件
    coords.onmousemove = function(e){
        //把事件对象传入
        var pointer = getCoordInDocument(e);
        //显示
        var coord = document.getElementById("coord");
        coord.innerHTML = "X,Y=("+pointer.x+", "+pointer.y+")";
    }
};
var getCoordInDocument = function(e) {
    //得到事件对象
    e = e || window.event;
    //在jQuery和火狐中pageX就是
    //e.clientX是在窗口的位置
    //document.documentElement.scrollLeft是兼容非谷歌内核，document.body.scrollLeft兼容谷歌内核
    //窗口位置加页面的滚动的大小
    var x = e.pageX || (e.clientX +
        (document.documentElement.scrollLeft
        || document.body.scrollLeft));
    var y= e.pageY || (e.clientY +
        (document.documentElement.scrollTop
        || document.body.scrollTop));
    return {'x':x,'y':y};
};
window.onload = function(){
    getCoordInDocumentExample();
};