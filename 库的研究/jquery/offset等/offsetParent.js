/**
 * 使用方法$("#a").offsetParent
 * 解决如果没有定位的元素，则 offsetParent 为最近的 table/td 元素或者跟元素 body
 */
var offsetParent= function () {
    //在这里this指向$("#a")
    //使用map使jquery对象转换为数组，并callback.call(elem,i,elem)
    return this.map(function () {
        //原生方法得到
        /*
        * 元素的 position 为 fixed 或者 display 为 none , 则 offsetParent 为 null
        * 元素 offsetParent 查找其父节点，如果 position 不为 static 即 relative/absolute/fixed ，
        * 则为返回该节点
        * 如果为 static ( position 不设置时默认为 static )，则继续向上层节点查询进行 position 判断
        * 如果没有定位的元素，则 offsetParent 为最近的 table/td 元素或者跟元素 body
        */
        var offsetParent = this.offsetParent;
        //如果父不是html，也没有定位，就深入下去
        while (offsetParent && (!jQuery.nodeName(offsetParent, "html") &&
        jQuery.css(offsetParent, "position") === "static")) {
            //原生方法，同过while进行深入
            offsetParent = offsetParent.offsetParent;
        }
        //返回
        return offsetParent || documentElement;
    });
};