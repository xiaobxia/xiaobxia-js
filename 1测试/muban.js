function domY() {
    var queryDom = arguments[0],
        position = arguments[1] || {x: 0, y: 0};
    if (typeof position !="object") {
        return;
    }
    if (queryDom.offsetParent) {
        position.x = position.x + queryDom.offsetLeft;
        position.y = position.y + queryDom.offsetTop;
        position = arguments.callee(queryDom.offsetParent, position)
    }
    return position;
}
var one = document.getElementById("one");
var two = document.getElementById("four");
var po = domY(two);
console.log(po);
