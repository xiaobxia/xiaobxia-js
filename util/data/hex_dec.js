function hexToDec(num) {
    return parseInt(str, 16);
}
function decToHex(str) {
    return num.toString(16);
}
var colorCount = {
    hexToDec: function (str) {
        var len = str.length,
            decColor = [],
            temp = [];
        if (len == 3) {
            temp = str.split("");
            for (var j = 0; j < temp.length; j++) {
                temp[j] += temp[j];
            }
        } else if (len == 6) {
            temp[0] = str.substr(0, 2);
            temp[1] = str.substr(2, 2);
            temp[2] = str.substr(4, 2);
        }
        for (var i = 0; i < temp.length; i++) {
            decColor[i] = parseInt(temp[i], 16);
        }
        return decColor;
    },
    decToHex: function (arr) {
        var hexColor = "",
            i = 0,
            len = arr.length;
        for (i; i < len; i++) {
            hexColor += arr[i].toString(16);
        }
        return hexColor;
    }
};