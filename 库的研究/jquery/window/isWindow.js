/**
 * 对象不为空
 * 对象的window属性就是它自己
 */
var isWindow= function (obj) {
    return obj != null && obj == obj.window;
};