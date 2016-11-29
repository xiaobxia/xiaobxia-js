/**
 * 用来扩展请求信息
 * 对需要深复制和不需要深复制的分类处理
 **/
function ajaxExtend(target, src) {
    var deep, key,
        //保存了不需要深复制的信息
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    //遍历要扩展的设置
    for (key in src) {
        //属性不为未定义
        if (src[key] !== undefined) {
            //如果是不需要深复制的，即刻赋值
            //如果需要深复制，把内容保存在deep中
            (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
        }
    }
    if (deep) {
        //进行深复制
        jQuery.extend(true, target, deep);
    }
    //返回对象
    return target;
}