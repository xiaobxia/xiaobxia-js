/**
 * 节流器
 * 节流器是过一定时间执行一次,期间的都被忽略
 *
 * 获取当前时间然后对比上次执行的时间
 */
var throttle = function (action, delay) {
    var statTime = 0;
    return function () {
        var currTime = +new Date();
        if (currTime - statTime > delay) {
            action.apply(this, arguments);
            statTime = currTime;
        }
    }
};