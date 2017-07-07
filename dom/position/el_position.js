/**
 * 我的写法
 * */

function domPosition() {
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

/**
 * 仿jQuery的写法
 */
var getOffset= function (element) {
    var docElem, win,
        box = {
            top: 0,
            left: 0
        },
        elem = element,
        doc = elem && elem.ownerDocument;

    if (!doc) {
        return;
    }
    docElem = doc.documentElement;
    if (typeof elem.getBoundingClientRect !== "undefined") {
        box = elem.getBoundingClientRect();
    }
    win=doc.defaultView || doc.parentWindow;
    return {
        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
    };
};