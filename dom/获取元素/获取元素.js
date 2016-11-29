//获取ID
var $ = function (id) {
    return typeof id === "string" ? document.getElementById(id) : id
};
//获取tagName
var $$ = function (tagName, oParent) {
    return (oParent || document).getElementsByTagName(tagName)
};
//通过类获取
var $$$ = function (className) {
    return document.getElementsByClassName(className)
};
//getElementsByTagName要比querySelectorAll来得快
