var class2type = {};
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
    function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
        //得到例如class2type["[object Boolean]"]=boolean
    });

var type=function (obj) {
    //如果是个null
    if (obj == null) {
        return obj + "";
    }
    //如果是个引用类型或是function
    return typeof obj === "object" || typeof obj === "function" ?
        //toString是toString方法的缓存
    class2type[toString.call(obj)] || "object" :
        //用于返回基本类型
        typeof obj;
};


/**
 * 自己的封装
 * 类jQuery的
 * */


/**
 * constructor的
 * */
function getType(obj) {
    if( obj === null ) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
    obj.constructor.name.toLowerCase() || "object" :
        typeof obj;
}