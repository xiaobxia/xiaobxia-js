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