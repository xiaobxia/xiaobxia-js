var extend = function () {
    var i = 1,
        len = arguments.length,
        target = arguments[0],
        temp = null;
    for (i; i < len; i++) {
        temp = arguments[i];
        for (var key in temp) {
            if (temp.hasOwnProperty(key)) {
                target[k] = temp[k];
            }
        }
    }
    return target;
};