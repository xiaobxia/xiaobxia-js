/**
 * Created by xiaobxia on 2017/7/10.
 */
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

//这当中的config.raw和config.json是外部接口，用于在外部关闭和打开
}(function ($) {
    //工具类型
    $.myTool = function () {
    };
    $.extend({
        myTool2: function () {
        }
    });
    //dom类型
    $.fn.myTool3 = function () {
        //this经常是一个dom集合
        return $(this).each(function () {
            //do something
        })
    };
    $.fn.extend({
        myTool4: function () {
        }
    });
}));