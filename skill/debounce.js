/**
 * 去抖是事件结束一段时间后执行
 *
 * 通过setTimeout来进行延时
 */
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
