/**
 * @param elems jQuery的this
 * @param fn 函数
 * @param key 属性
 * @param value 值
 * @param chainable 是否可以链式调用，如果是get动作，为false，如果是set动作，为true
 * @param emptyGet 如果jQuery没有选中到元素的返回值
 * @param raw value是否为原始数据，如果raw是true，说明value是原始数据，如果是false，说明raw是个函数
 * @returns {*}
 */
/*
* css: function( name, value ) {
    return jQuery.access( this, function( elem, name, value ) {
 　　　　　　//code
 }, name, value, arguments.length > 1 );
 }
    */
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
    var i = 0,
        length = elems.length,//jquery对象的长度
        bulk = key == null;//false

    // Sets many values
    if ( jQuery.type( key ) === "object" ) {//键值对方式赋值
        chainable = true;//链式
        for ( i in key ) {//遍历递归调用自身
            jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
        }

        // Sets one value
    } else if ( value !== undefined ) {//单赋值
        chainable = true;//链式
        //这种情况也是赋值 如.attr( attributeName, function(index, attr) )传入的value就是一个函数
        if ( !jQuery.isFunction( value ) ) {//如果第四个参数不是函数，raw为true
            raw = true;
        }

        if ( bulk ) {//key为null或者undefined时
            // Bulk operations run against the entire set
            if ( raw ) {
                fn.call( elems, value );//不知道这种情况什么时候出现
                fn = null;

                // ...except when executing function values
            } else {
                bulk = fn;
                fn = function( elem, key, value ) {
                    return bulk.call( jQuery( elem ), value );
                };
            }
        }

        if ( fn ) {//如果第二个参数函数存在
            for ( ; i < length; i++ ) {//对jquery数组中的每一个元素调用回调
                //如果value不是函数 fn(elems[i], key,value);
                //如果value是函数：fn(elems[i], key,value.call( elems[i], i, fn( elems[i], key )));
                fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
            }
        }
    }

    return chainable ? //如果是链式
        elems : //返回jquery对象

        // Gets 不是链式，是获取值
        bulk ? //key为undefined或者null
            fn.call( elems ) :
            length ? fn( elems[0], key ) : emptyGet; //如果jquery对象有长度，获取对象第一个元素的键值，没长度，返回emptyGet
}