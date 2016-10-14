jQuery.fn = jQuery.prototype = {
    //这里没有入栈的操作，对比map
    //因为只是使用数组执行以下操作，并没有改变这个数组，所以不用保存this指向
    each: function (callback) {
        return jQuery.each(this, callback);
    }
};

jQuery.extend({
    each: function (obj, callback) {
        var length, i = 0;

        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                //在判断的过程中执行了这个函数
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }

        return obj;
    }
});