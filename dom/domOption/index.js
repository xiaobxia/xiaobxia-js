/**
 * Created by xiaobxia on 2017/6/19.
 */
//复制克隆节点
function cloneNode(source, deep) {
    return source.cloneNode(deep);
}
function domToArray(dom) {
    var array=[];
    for (var i=0;i<dom.length;i++){
        array.push(dom[i]);
    }
    return array;
}
module.exports = {
    cloneNode: cloneNode,
    domToArray: domToArray
}