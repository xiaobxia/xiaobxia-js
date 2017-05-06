/**
 * 同步加载模块
 * module变量代表当前模块。这个变量是一个对象，
 * 它的exports属性（即module.exports）是对外的接口
 *
 * module.exports 导出对外的变量或接口
 * require()来导入其他模块的输出到当前模块作用域中。
 *
 */
// moduleA.js
module.exports = function( value ){
    return value * 2;
}

// moduleB.js
var multiplyBy2 = require('./moduleA');
var result = multiplyBy2(4);