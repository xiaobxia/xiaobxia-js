(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    //1000/60 ms
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
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
var four=document.getElementById("four");
function time() {
    four.innerHTML=Date.now();
}
var df=new Tick({fps: 10, fn:time});
df.init();