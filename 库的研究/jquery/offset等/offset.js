/**
 * 获得在页面中的位置
 * */
var offset= function (options) {
    //如果如果有参数就是set
    if (arguments.length) {
        return options === undefined ?
            this :
            this.each(function (i) {
                jQuery.offset.setOffset(this, options, i);
            });
    }

    var docElem, win,
        box = {
            top: 0,
            left: 0
        },
        elem = this[0],
        //元素所在的文档,如document
        doc = elem && elem.ownerDocument;

    if (!doc) {
        return;
    }
    //普通浏览器认识这个，chrome不认识
    docElem = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    if (!jQuery.contains(docElem, elem)) {
        return box;
    }

    //如果有就用getBoundingClientRect
    //得到相对于窗口的位置
    if (typeof elem.getBoundingClientRect !== "undefined") {
        box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        //pageXOffset 设置或返回当前页面相对于窗口显示区左上角的 X 位置。
        // pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。
        //页面一般都在窗口上面，约上面y越大
        //相对于窗口的位置+滚动的位置-边框的大小
        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
    };
};