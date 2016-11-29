/*1.跨浏览器的，转换为数组的函数
 2.典型使用场景把nodelist或是arguments对象转换为真正的数组*/
function convertToArray(nodes) {
    var array=null;
    try {
        //使用slice方法转换为数组,此方法在IE8及以下不适用
        array=Array.prototype.slice.call(nodes, 0);
    } catch (ex) {
        //进行手动枚举对象
        array =new Array();
        for(var i=0,len=nodes.length;i<len;i++){
            array.push(array[i]);
        }
    }
    return array;
}
