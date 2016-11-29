//兼容火狐
if (window.getComputedStyle) {
    getStyles = function (elem) {
        //在浏览器中返回关联document的window对象，如果没有则返回null
        var view = elem.ownerDocument.defaultView;

        if (!view || !view.opener) {
            view = window;
        }
        return view.getComputedStyle(elem);
    };
}else if (documentElement.currentStyle) {
    getStyles = function (elem) {
        return elem.currentStyle;
    };
}