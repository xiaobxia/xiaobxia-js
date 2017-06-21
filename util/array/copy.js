/**
 * Created by xiaobxia on 2017/6/18.
 */
var copyArray = function (source, target) {
    var tar = target || [];
    var len = source.length;
    for (var k = 0;k<len;k++){
        target[k] = source[k];
    }
    return tar;
};