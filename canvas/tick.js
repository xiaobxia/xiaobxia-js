/*
var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function tick() {
    requestAnimationFrame(tick);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。
        //例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。
        //这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。偏差了120ms
        //以上例：delta=112，interval=100，要移除12的偏差
        then = now - (delta % interval);
        draw(); // ... Code for Drawing the Frame ...
    }
}
tick();*/
function Tick(config) {
    this.fps=config.fps;
    this.fn=config.fn;
    this.then=Date.now();
}
Tick.prototype={
    init:function () {
        var interval=1000/this.fps,
            that=this,
            now,delta;
        requestAnimationFrame(function () {
            that.init.call(that);
        });
        now = Date.now();
        delta = now - this.then;
        if (delta > interval) {
            this.then = now - (delta % interval);
            this.fn();
        }
    }
};
