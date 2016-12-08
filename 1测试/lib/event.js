F.module("lib/event",["lib/dom"],function (dom) {
    var events={
        on:function (id,type,fn) {
            dom.g(id)["on"+type]=fn;
        }
    };
    return events;
});
/**
 * 执行这里的时候是文件已经被加载了的时候
 * 于是在moduleCache中已经注册过了
 * 用处在于修改状态*/