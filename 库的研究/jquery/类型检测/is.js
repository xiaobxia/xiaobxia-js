var isFunction=function (obj) {
    return jQuery.type(obj) === "function";
};

var isArray= Array.isArray || function (obj) {
    return jQuery.type(obj) === "array";
};


/**
 * 参数对象是否是纯粹的对象 （ 通过“{}”或者“new Object”创建的 ）
 * 不能是自己的工厂函数建立的对象
 **/

var isPlainObject= function (obj) {
    var key;

    //如果obj不存在，不是对象，是dom节点，是window，就返回。
    if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
    }
    try {
        //hasOwn={}.hasOwnProperty
        //对象的构造器存在，但不是自己(暗指其的实例，new出来的),而且构造器是自己定义的(new Array并不是自己定义的)
        //返回错误
        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
    } catch (e) {
        return false;
    }

    // Support: IE<9
    // Handle iteration over inherited properties before own properties.
    //用于兼容ie9以下
    if (!support.ownFirst) {
        for (key in obj) {
            return hasOwn.call(obj, key);
        }
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    //用空循环加速遍历，得到最后一个key，因为如果是继承的，key就是原型上的
    for (key in obj) {
    }
    //如果最后一个键是undefined或者这个键是自己的(不是原型的)
    //返回正确
    return key === undefined || hasOwn.call(obj, key);
};