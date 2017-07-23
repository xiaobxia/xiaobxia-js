/**
 * Created by xiaobxia on 2017/7/23.
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