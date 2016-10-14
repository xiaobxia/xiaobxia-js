/*
 首先sort(),如果要让value1在value前就返回负数，如果要让value1在value2后就返回正数
 由此看见这是个让数组从大到小的函数，逻辑是越小的在后面
 运行时：
 0和1比，得到[1,0,5,10,15]
 0和5比，得到[1,0,0,10,15]
 1和5比,得到[5,1,0,10,15]
 0和10比，得到[5,1,0,0,15]
 1和10比，得到[5,1,1,0,15]
 5和10比，得到[10,5,1,0,15]
 */
function compare(value1, value2) {
    if (value1 < value2) {
        return 1;
    } else if (value1 > value2) {
        return -1;
    } else {
        return 0;
    }
}

var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values);//15,10,5,1,0

//这也是个大到小的，逻辑是b大于a时返回正，那么b就在前面，返回正的时候右边的在前面
var b = function (array) {
    return array.sort(function (a, b) {
        return b - a;
    })
};
alert(b(values));