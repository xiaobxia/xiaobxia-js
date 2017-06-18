/**
 * Created by xiaobxia on 2017/6/1.
 */
const hasOwn=Object.prototype.hasOwnProperty;
let type = {
    //得到数据的类型
    get: function (obj) {
        //如果是null，那就为null
        if (obj === null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            obj.constructor.name.toLowerCase() || "object" :
            typeof obj;
    },
    //判断是不是window对象
    isWindow: function (obj) {
        //对象不为空，且对象的window属性就是自身那么就认为是window
        return obj !== null && obj === obj.window;
    },
    //判断是不是数组
    isArray: Array.isArray || function (obj) {
        return type.get(obj) === "array";
    },
    //判断是不是函数
    isFunction: function (obj) {
        return type.get(obj) === "function";
    },
    isNumber: function (obj) {
        return type.get(obj) === 'number';
    },
    //判断是不是扁平的对象
    isPlainObject: function (obj) {
        let key;
        //如果不是对象，是html，是window就返回false
        if (!obj || type.get(obj) !== "object" || obj.nodeType || type.isWindow(obj)) {
            return false;
        }
        try {
            //判断构造器和原型
            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }
        for (key in obj) {
        }
        return key === undefined || hasOwn.call(obj, key);
    }
};

module.exports = type;