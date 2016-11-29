//合并两个数组
var merge= function (first, second) {
    //+号用来转换为数字
    var len = +second.length,
        j = 0,
        i = first.length;
    //这里j相当于索引，用while循环来遍历
    while (j < len) {
        //i是被添加处的索引
        first[i++] = second[j++];
    }

    // Support: IE<9
    // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
    //用于支持ie<9
    if (len !== len) {
        while (second[j] !== undefined) {
            first[i++] = second[j++];
        }
    }
    //调整first的长度
    first.length = i;
    //返回
    return first;
};