/**
 * Created by xiaobxia on 2017/6/18.
 */
var toNumber = function (target, df) {
    var num = parseInt(target);
    return isNaN(num) ? df : num;
}