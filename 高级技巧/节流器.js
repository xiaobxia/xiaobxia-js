//节流器是过一定时间执行一次,期间的都被忽略
/*使用例子
* addEvent(windows,"scroll",throttleV2(fn,1000))
* */
var throttleV2 = function(action, delay){
    var statTime = 0;

    return function() {
        var currTime = +new Date();
        if (currTime - statTime > delay) {
            action.apply(this, arguments);
            statTime = currTime ;
        }
    }
};