var values = [0, 1, 5, 10, 15];

var b = function (array) {
    return array.sort(function (a, b) {
        return b - a;
    })
};
alert(b(values));

