//去抖是事件结束一段时间后执行
/*使用例子
* addEvent(windows,"scroll",debounce(fn,1000))*/
//更好
var debounce = function(action, delay) {
    var timer = null;
    return function() {
        var self = this,
            args = arguments;

        clearTimeout(timer);
        timer = setTimeout(function() {
            action.apply(self, args)
        }, delay);
    }
};
/*使用例子
* addEvent(windows,"scroll",function(){
*   debounce2(fn,{time:1000});
* })
* */
var debounce2=function () {
    var isClear=arguments[0],fn;
    if(typeof  isClear ==="boolean"){
        fn=arguments[1];
        fn._debounceID&&clearTimeout(fn._debounceID);
    }else {
        fn=isClear;
        param=arguments[1];
        var p =extend({context:null,args:[],time:300},param);
        arguments.callee(true,fn);
        fn._debounceID=setTimeout(function () {
            fn.apply(p.context,p.args)
        },p.time)
    }
};
//使用节流器的要点fn必须是在事件的外面，如果写在里面，那么每次事件发生时，会重新声明fn，那么fn的计时器句柄也就不存在了
