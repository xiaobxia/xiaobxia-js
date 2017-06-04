var eventInElement = function (e, block, parent, inCallback, noInCallback) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var isIn = true;
    while (target !== block) {
        if (target === parent) {
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