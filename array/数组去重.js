
/*1.跨浏览器的，数组去重的函数*/
//1.性能好的，但是不实用的
function unique(arr) {
    var ret = [];
    var hash = {};
    //遍历数组
    for (var i = 0; i < arr.length; i++) {
        //得到当前项
        var item = arr[i];
        //区分当前项的类型，数值1和字符串"1"就是不相同的
        var key = typeof(item) + item;
        //查看对象中，key是不是1，如果不是1（为null），那么就说明没有出现过，然后就添加，并且设为1
        if (hash[key] !== 1) {
            //添加项
            ret.push(item);
            //设为1
            hash[key] = 1;
        }
    }
    //返回
    return ret
}
//2.性能不好的，但是使用的
//自己写的indexOf函数，用于兼容低版本浏览器
var indexOf = [].indexOf ?
    //如果有indexOf方法
    function(arr, item) {
        return arr.indexOf(item)
    } :
    //在低版本浏览器中
    function indexOf(arr, item) {
        //遍历数组判断是否有一项相符
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return i
            }
        }
        return -1
    };

function unique(arr) {
    var ret = [];
    //遍历数组
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        //使用自己写的indexOf进行判断
        if (indexOf(ret, item) === -1) {
            ret.push(item)
        }
    }
    return ret
}