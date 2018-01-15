/**
 * Created by xiaobxia on 2018/1/15.
 */
/**
 * new关键字的行为
 */
function Base() {
    this.name = 'cat';
}
var obj = (function () {
    var temp  = {};
    temp.__proto__ = Base.prototype;
    var result = Base.call(temp);
    return typeof result === 'object'? result : temp;
})();