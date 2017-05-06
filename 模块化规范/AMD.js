/**
 * define(id?: String, dependencies?: String[], factory: Function|Object);
 *
 * id
 * 是模块的名字，它是可选的参数。
 *
 * dependencies
 * 指定了所要依赖的模块列表，它是一个数组，也是可选的参数，
 * 每个依赖的模块的输出将作为参数一次传入 factory 中。
 * 如果没有指定 dependencies，那么它的默认值是 ["require", "exports", "module"]。
 */
define('myModule', ['jquery'], function($) {
    // $ 是 jquery 模块的输出
    $('body').text('hello world');
});
// 使用
define(['myModule'], function(myModule) {});


define(['package/lib'], function(lib){
    function foo(){
        lib.log('hello world!');
    }

    return {
        foo: foo
    };
});
//AMD规范允许输出的模块兼容CommonJS规范，这时define方法需要写成下面这样：
define(function (require, exports, module){
    var someModule = require("someModule");
    var anotherModule = require("anotherModule");

    someModule.doTehAwesome();
    anotherModule.doMoarAwesome();

    exports.asplode = function (){
        someModule.doTehAwesome();
        anotherModule.doMoarAwesome();
    };
});