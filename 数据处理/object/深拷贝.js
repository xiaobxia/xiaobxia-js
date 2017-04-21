/**
 * Created by asus on 2017/4/21.
 */
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];
        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        if(prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : {};
            deepClone(prop, obj[i]);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}