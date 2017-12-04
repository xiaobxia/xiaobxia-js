/**
 * 观察者模式
 *
 * 思想在于自定义事件
 * 注册事件然后分发事件
 */
var Observer = (function () {
    var message = {};
    return {
        register: function (type, fn) {
            if (typeof message[type] === "undefined") {
                message[type] = [fn];
            } else {
                message[type].push(fn);
            }
        },
        fire: function (type, args) {
            if (!message[type]) {
                return;
            }
            var events = {
                    type: type,
                    args: args || {}
                },
                len = message[type].length;
            for (var i = 0; i < len; i++) {
                message[type][i].call(this, events);
            }
        },
        remove: function (type, fn) {
            if (message[type] instanceof Array) {
                var i = message[type].length - 1;
                for (; i >= 0; i--) {
                    message[type][i] === fn && message[type].splice(i, 1);
                }
            }
        }
    }
})();