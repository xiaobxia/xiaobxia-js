/**
 * Created by xiaobxia on 2018/1/15.
 */
/**
 * new关键字的行为
 */
function Base(name) {
    this.name = name || 'cat';
}

var obj = (function (name) {
    var temp = {};
    temp.__proto__ = Base.prototype;
    var result = Base.call(temp, name);
    return typeof result === 'object' ? result : temp;
})('cat1');