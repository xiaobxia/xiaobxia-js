/**
 * 速度快的，但是占内存，用时间换空间
 * 在hash中存入(类型+值)，arr的元素和hash对比，如果不存在就添加
 * */

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


/**
 * 建立一个新数组，遍历arr，如果arr中的项在新数组中不存在就添加，存在就略过
 * 自己写indexOf函数，用于兼容低版本浏览器
 * 性能不好的，但是实用的
 * 性能不好的原因在于，在低浏览器中会有两次循环
 * */

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
function unique5(array){
    var r = [];
    //[1,2,3,1,2]
    //先取1对比，发现有相同，这时就拿2对比后面，发现也有相同，然后拿3对比，发现没有相同，所以添加3
    //这时i为2（数字3的索引），因为3前面的要么是已经被添加的，要么是后面还会出现的
    for(var i = 0, l = array.length; i < l; i++) {
        for(var j = i + 1; j < l; j++){
            if (array[i] === array[j]) {
                j = ++i;
            }
        }
        r.push(array[i]);
    }
    return r;
}