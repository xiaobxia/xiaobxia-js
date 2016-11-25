
(function(root, factory) {
    //兼容amd环境
    if (typeof define === 'function' && define.amd) {
        define(factory);
        //兼容CommonJS环境
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        //当前环境
        root.xbx = factory();
    }
    //this=windows是root的实参。function是factory的实参，同时里面也包含了库的具体实现
})(this, function(context) {
    function xbx() {

    }
    xbx.VERSION="0.0.0.0"
});