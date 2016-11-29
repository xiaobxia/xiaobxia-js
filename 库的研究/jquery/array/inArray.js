//判断在数组中的位置
//elem在arr中的位置，从i开始，默认为0
var inArray= function (elem, arr, i) {
    var len;
    //如果数组存在
    if (arr) {
        //如果有indexOf方法
        if (indexOf) {
            //返回 arr.indexOf(elem,i)
            return indexOf.call(arr, elem, i);
        }
        //得到数组长度
        len = arr.length;
        //如果没i，默认为0，如果i小于0就倒着来
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        //遍历i后面的几项
        for (; i < len; i++) {
            //如果这个索引在数组中有，且里面的数和elem匹配，返回索引
            // Skip accessing in sparse arrays
            if (i in arr && arr[i] === elem) {
                return i;
            }
        }
    }
    //如果没传arr，或是没找到返回-1
    return -1;
};