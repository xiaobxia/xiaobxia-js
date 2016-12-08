F.module(["lib/event","lib/dom"],function (events,dom) {
    events.on("six","click",function () {
        dom.html("four","ok");
    });
});
/**
 * 说明依赖，
 * 在moduleCache注册依赖的模块
 * 并异步加载
 * */