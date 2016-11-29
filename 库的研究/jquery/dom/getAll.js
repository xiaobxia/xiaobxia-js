/**
 * 用于得到一个上下文中的所有标签
 */
function getAll(context, tag) {
    var elems, elem,
        i = 0,
        //getElementsByTagName要比querySelectorAll来得快
        //先用getElementsByTagName，再用querySelectorAll
        found = typeof context.getElementsByTagName !== "undefined" ?
            context.getElementsByTagName(tag || "*") :
            typeof context.querySelectorAll !== "undefined" ?
                context.querySelectorAll(tag || "*") :
                undefined;

    //如果两个方法都不存在
    if (!found) {
        //遍历子节点(循环会自调用并深入节点)
        for (found = [], elems = context.childNodes || context;
             (elem = elems[i]) != null; i++
        ) {
            //如果没有指定tag，或是元素的标签名和tag匹配上，就添加
            if (!tag || jQuery.nodeName(elem, tag)) {
                //添加这个元素
                found.push(elem);
            } else {
                //深入节点把得到的值合并
                jQuery.merge(found, getAll(elem, tag));
            }
        }
    }
    //如果自己本身(上下文)也匹配，那么把自己也算上，返回
    return tag === undefined || tag && jQuery.nodeName(context, tag) ?
        jQuery.merge([context], found) :
        found;
}