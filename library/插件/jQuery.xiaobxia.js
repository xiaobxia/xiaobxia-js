(function (factory) {
    //用于兼容其他规范和库
    if (typeof define === 'function' && define.amd) {
        //用于Require.js加载一个jQuery插件
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        //全局模式
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    //定时器对象
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
                this.temptimer++;
                this.timer = setTimeout(function () {
                    that.fn();
                    that.runtimer.call(that);
                }, this.interval);
            } else {
                clearTimeout(this.timer);
            }
        } else {
            this.timer = setTimeout(function () {
                that.fn();
                that.runtimer.call(that);
            }, this.interval);
        }
    };
    $.extend({//设置定时器
        xSetTimer: function (fn, interval, times) {
            return new Mytimer(fn, interval, times);
        },
        //清理定时器
        xClearTimer: function (object) {
            clearTimeout(object.timer);
        }
    });
    //数组操作部分
    $.extend({
        //类数组对象转换为数组
        xConvertToArray: function (nodes) {
            var array = null;
            try {
                //使用slice方法转换为数组,此方法在IE8及以下不适用
                array = Array.prototype.slice.call(nodes, 0);
            } catch (ex) {
                //进行手动枚举对象
                array = new Array();
                for (var i = 0, len = nodes.length; i < len; i++) {
                    array.push(array[i]);
                }
            }
            return array;
        },
        //数组去重
        xUnique: function (arr) {
            var ret = [];
            var hash = {};
            //遍历数组
            for (var i = 0; i < arr.length; i++) {
                //得到当前项
                var item = arr[i];
                //区分当前项的类型，数值1和字符串"1"就是不相同的
                var key = typeof(item) + item;
                //查看对象中，key是不是1，如果不是1（为null），那么就说明没有出现过，然后就添加，并且设为1
                if (hash[key] !== 1) {
                    //添加项
                    ret.push(item);
                    //设为1
                    hash[key] = 1;
                }
            }
            //返回
            return ret
        },
        //数组正向排序
        xSortF: function (array) {
            return array.sort(function (a, b) {
                return a - b;
            });
        },
        //数组逆向排序
        xSortR: function (array) {
            return array.sort(function (a, b) {
                return b - a;
            })
        }
    });
    //验证输入值
    //URL的操作
    $.extend({
        xGetQueryStringArgs: function () {
            //get query string without the initial ?
            var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
                //object to hold data
                args = {},
                //get individual items
                items = qs.length ? qs.split("&") : [],
                item = null,
                name = null,
                value = null,
                //used in for loop
                i = 0,
                len = items.length;
            //assign each item onto the args object
            for (i = 0; i < len; i++) {
                item = items[i].split("=");
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);
                if (name.length) {
                    args[name] = value;
                }
            }
            return args;
        }
    });
    //表单验证模块

    $.extend({
        xVerify: (function () {
            var REMAL=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var arithmetic = {
                isNull: function (value) {
                    return value.length == 0;
                },
                isEail: function (value) {
                    return REMAL.test(value);
                }
            };
            return function (type, value) {
                value = value.replace(/^\s+|\s+$/g, "");
                return arithmetic[type] ? arithmetic[type](value) : false;
            }
        })()
    })


}));

