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
    if (isIn) {
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
        console.log("in")
    },function () {
        master.style.display = 'none';
        off(master, 'click', blockE);
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
});
var fd = {
    el: 'f-1',
    popover: 'm-1',
    template: function (index, label, style) {
        return '<li class="filter-tab-item" data-index="' + index + '" style="' + style + '"><span>' + label + '</span><div class="select-direction"><div></div></div></li>'
    },
    popoverTemplate: function () {
    },
    data: [
        {
            label: '位置',
            select: [
                {
                    label: '不限',
                    value: '0'
                }
            ]
        },
        {label: '总价'},
        {label: '户型'},
        {label: '排序'}
    ],
    closeCallback: function (target, popover) {
        popover.style.display = 'none';
    },
    openCallback: function (target, popover) {
        popover.style.display = 'block';
    },
    selectCallback: function () {
    }
};

function filterTab(option) {
    var _tab = document.getElementById(option.el);
    var _popover = document.getElementById(option.popover);
    var htmlTemplate = '';
    var data = option.data;
    var len = data.length;
    var templateFn = option.template;
    var itemStyle = 'width:' + 100 / len + '%';
    var lastActiveItem = null;
    for (var k = 0; k < len; k++) {
        htmlTemplate += templateFn(k, data[k].label, itemStyle);
    }
    _tab.innerHTML = htmlTemplate;
    on(_tab, 'click', function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        while (!target.classList.contains('filter-tab-item')) {
            if (target === _tab) {
                break;
            }
            target = target.parentNode;
        }
        if (target !== _tab) {
            if (target.classList.contains('active')) {
                target.classList.remove('active');
                option.closeCallback(target, _popover);
                lastActiveItem = null;
            } else {
                target.classList.add('active');
                if (lastActiveItem) {
                    lastActiveItem.classList.remove('active');
                }
                option.openCallback(target, _popover);
                lastActiveItem = target;
            }
        }
    })
}
filterTab(fd);
var ss = document.getElementById('m-1');
