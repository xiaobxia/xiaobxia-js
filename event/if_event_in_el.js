var eventInElement = function (e, block, parent, inCallback, noInCallback) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var isIn = true;
    //如果事件不在区域内
    while (target !== block) {
        //已经是最外层了
        if (target === parent) {
            //不在区域内
            isIn = false;
            break;
        }
        target = target.parentNode;
    }
    if (!isIn) {
        return inCallback ? inCallback() : true;
    } else {
        return noInCallback ? noInCallback() : false;
    }
};