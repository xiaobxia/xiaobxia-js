/**
 * Created by Administrator on 2016/9/28.
 */
//用于扩展对象
jQuery.extend = jQuery.fn.extend = function () {
    var src, copyIsArray, copy, name, options, clone,
        //如果没有实参传入就使用空对象
        target = arguments[0] || {},
        //i最终用途是指向对象的索引，这个对象带有新属性的
        i = 1,
        length = arguments.length,
        //是否深复制，深复制就对引用类型进行复制，使他们不是指向同一个
        deep = false;

    // Handle a deep copy situation
    //如果为深度复制，那么第一个参数是一个布尔值
    //如果是布尔值
    if (typeof target === "boolean") {
        //给deep复制
        deep = target;

        // skip the boolean and the target
        //让目标从第二个参数开始
        target = arguments[i] || {};
        //自增
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    //如果目标不是对象，且不是函数
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        //目标改为空对象
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    //如果传入的参数，只有一个对象
    if (i === length) {
        //那么就把目标指向this(就是指jQuery)，这时是对jQuery对象进行扩展
        target = this;
        //自减
        i--;
    }
    //遍历带有新属性的对象
    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        //把这个对象赋给options，且不为空时
        if ((options = arguments[i]) != null) {

            // Extend the base object
            //遍历对象属性
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                //如果和被扩展的有相同的属性，就跳过这个属性
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                //如果深度复制，且新属性不为空，且新属性是个对象或是数组(就是指为引用类型)
                if (deep && copy && (jQuery.isPlainObject(copy) ||
                    (copyIsArray = jQuery.isArray(copy)))) {
                    //如果是数组,用于区分到底是数组还是对象
                    if (copyIsArray) {
                        //改为false
                        copyIsArray = false;
                        //把src复制给clone
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them

                    //再执行一遍

                    //如果不进行深度复制那个复制完后[1,2,3]被[4,5,6]覆盖，而我们希望得到[1,2,3,4,5,6]
                    /*比如
                     src = target[name]=[1,2,3];
                     copy = options[name]=[4,5,6];
                     在把数组中的值一个一个进行复制，然后返回
                    */
                    target[name] = jQuery.extend(deep, clone, copy);

                    // Don't bring in undefined values
                    //如果不是深度复制就直接复制
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};
