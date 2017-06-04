const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();
const once = function (el, event, fn) {
    var listener = function () {
        if (fn) {
            fn.apply(this, arguments);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};
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
var btn = document.getElementById('c-1');
var master = document.getElementById('m-1');
var block = document.getElementById('c-2');
var blockE = function (e) {
    eventInElement(e, block, master, function () {
        master.style.display = 'none';
        off(master, 'click', blockE);
    },function () {
        console.log("in")
    });
};
on(btn, 'click', function () {
    if (master.style.display === 'block') {
        master.style.display = 'none';
        off(master, 'click', blockE);
    } else {
        master.style.display = 'block';
        on(master, 'click', blockE);
    }
})

