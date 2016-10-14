//我自己写的，超时调用代替间歇调用
function Mytimer(fn, interval, times) {
    this.fn = fn;
    this.interval = interval;
    this.times = times;
    this.temptimer = 0;
    this.timer = null;
    this.runtimer();
}
Mytimer.prototype.runtimer = function () {
    var that = this;
    if (this.times) {
        if (this.temptimer < this.times) {
            this.fn();
            this.temptimer++;
            this.timer = setTimeout(function () {
                that.runtimer.call(that);
            }, this.interval);
        } else {
            clearTimeout(this.timer);
        }
    } else {
        this.fn();
        this.timer = setTimeout(function () {
            that.runtimer.call(that);
        }, this.interval);
    }
};