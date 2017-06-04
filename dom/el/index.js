//通过id
function $(id, oParent) {
    return (oParent || document).getElementById(id);
}
//获取tagName
function $$(tagName, oParent) {
    return (oParent || document).getElementsByTagName(tagName)
}
//通过类获取
function $$$(className, oParent) {
    return (oParent || document).getElementsByClassName(className)
}
//getElementsByTagName要比querySelectorAll来得快
var queryAll = (function queryAll() {
    if (document.querySelectorAll) {
        return document.querySelectorAll;
    } else {
        var s = document.createStyleSheet();
        return function (r, c, i, j, a) {
            a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
            for (i = r.length; i--;) {
                s.addRule(r[i], 'k:v');
                for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                s.removeRule(0);
            }
            return c;
        };
    }
})();
module.exports = {
    $: $,
    $$: $$,
    $$$: $$$,
    queryAll: queryAll
};
