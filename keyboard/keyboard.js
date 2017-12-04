/**
 * Created by Administrator on 2016/10/3.
 */
//在jQuery中
$inp.bind('keydown', function (e) {
    var key = e.which;
    //如果是回车按下
    if (key == 13) {
        e.preventDefault();
        //要做的事情
    }
});

//在原生javascript中
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    //如果是按Esc
    if(e && e.keyCode==27){
        //要做的事情
    }
};

//---与ctrl键一起---

//在jQuery中
$inp.bind('keydown', function (e) {
    var key = e.which;
    //如果是回车按下
    if (e.ctrlKey && key == 13) {
        e.preventDefault();
        //要做的事情
    }
});

//在原生javascript中
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    //如果是按Esc
    if(e && e.ctrlKey && e.keyCode === 27){
        //要做的事情
    }
};
