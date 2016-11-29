
//用于看元素顶部有没有超过边界
var belowthefold = function (element, settings) {
    var fold;
    //如果是在window中：滚动+高度
    //window的scrollTop是body的margin
    if (settings.container === undefined || settings.container === window) {
        fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
    } else {
        //如果是在父元素中就是
        //offset获得当前视口的偏移
        fold = $(settings.container).offset().top + $(settings.container).height();
    }
    //元素对视窗的距离
    return fold <= $(element).offset().top - settings.threshold;
};
//是否超出边界（太右了）
var rightoffold = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = $window.width() + $window.scrollLeft();
    } else {
        fold = $(settings.container).offset().left + $(settings.container).width();
    }

    return fold <= $(element).offset().left - settings.threshold;
};
//是否在视框外(above视框)
var abovethetop = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = $window.scrollTop();
    } else {
        fold = $(settings.container).offset().top;
    }

    return fold >= $(element).offset().top + settings.threshold + $(element).height();
};
//在视框左边，还没进入视框
var leftofbegin = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = $window.scrollLeft();
    } else {
        fold = $(settings.container).offset().left;
    }

    return fold >= $(element).offset().left + settings.threshold + $(element).width();
};
//判断是否在视框内
var inviewport = function (element, settings) {
    //四个越界判断都为false
    return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
};





