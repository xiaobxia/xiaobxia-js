jQuery.fn = jQuery.prototype = {
    //将一组元素转换成数组
    map: function (callback) {

        return this.pushStack(
            //使用时$().map(fn),this指$()
            jQuery.map(this,
                function (elem, i) {
                    return callback.call(elem, i, elem);
                }
            )
        );
    }
};

jQuery.extend({
    map: function (elems, callback, arg) {
        var length, value,
            i = 0,
            ret = [];

        //看是不是一个数组
        if (isArrayLike(elems)) {
            length = elems.length;
            //遍历数组
            for (; i < length; i++) {
                //对每个值操作，并返回值
                value = callback(elems[i], i, arg);
                //添加上
                if (value != null) {
                    ret.push(value);
                }
            }


        } else {
            //如果是对象就遍历对象
            for (i in elems) {
                value = callback(elems[i], i, arg);

                if (value != null) {
                    ret.push(value);
                }
            }
        }

        // 压平任何嵌套数组
        return concat.apply([], ret);
    }
});