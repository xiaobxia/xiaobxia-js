var hasOwn=Object.prototype.hasOwnProperty;
var type = {
    get: function (obj) {
        if (obj === null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
        obj.constructor.name.toLowerCase() || "object" :
            typeof obj;
    },
    isWindow: function (obj) {
        return obj != null && obj == obj.window;
    },
    isArray: Array.isArray || function (obj) {
        return type.get(obj) === "array";
    },
    isFunction: function (obj) {
        return type.get(obj) === "function";
    },
    isPlainObject: function (obj) {
        var key;
        if (!obj || type.get(obj) !== "object" || obj.nodeType || type.isWindow(obj)) {
            return false;
        }
        try {
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
/**
 * 依赖于类型检测
 * */
function extend() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== "object" && typeof target!== "function") {
        target = {};
    }
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (type.isPlainObject(copy) ||
                    (copyIsArray = type.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && type.isArray(src) ? src : [];
                    } else {
                        clone = src && type.isPlainObject(src) ? src : {};
                    }
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}
