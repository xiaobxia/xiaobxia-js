var throttle=function () {
    var isClear=arguments[0],fn;
    if(typeof  isClear ==="boolean"){
        fn=arguments[1];
        fn._throttleID&&clearTimeout(fn._throttleID);
    }else {
        fn=isClear;
        param=arguments[1];
        var p =extend({context:null,args:[],time:300},param);
        arguments.callee(true,fn);
        fn._throttleID=setTimeout(function () {
            fn.apply(p.context,p.args)
        },p.time)
    }
};
//使用节流器的要点fn必须是在事件的外面，如果写在里面，那么每次事件发生时，会重新声明fn，那么fn的计时器句柄也就不存在了