var xbx = function () {
    var method = {};
    method.$ = function (id) {
        return typeof id === "string" ? document.getElementById(id) : id
    };
    method.$$ = function (tagName, oParent) {
        return (oParent || document).getElementsByTagName(tagName)
    };
    method.$$$ = function (className) {
        return document.getElementsByClassName(className)
    };
    method.addClass = function (elem, className) {
        if ((" " + elem.className + " ").indexOf(" " + className + " ") == -1) {
            if (elem.className == "") {
                elem.className = className;
            } else {
                elem.className += (" " + className);
            }
        }
    };
    method.hasClass = function (elem, className) {
        if ((" " + elem.className + " ").indexOf(" " + className + " ") == -1) {
            return 0;
        } else {
            return 1;
        }
    };
    method.removeClass = function (elem, className) {
        var newClass = (" " + elem.className + " ").replace(" " + className + " ", " ");
        elem.className = newClass.substr(1, newClass.length - 2);
    };
    method.removeAllClass = function (elem) {
        elem.className = "";
    };
    //设置属性
    method.setAttr = function (ele, attr, value) {
        ele.setAttribute(attr, value);
    };
    //得到属性
    method.getAttr = function (ele, attr) {
        return ele.getAttribute(attr);
    };
    //移除属性
    method.removeAttr = function (ele, attr) {
        ele.removeAttribute(attr);
    };
    //返回节点名
    method.getNodeName = function (ele, str) {
        return ele.nodeName.toLowerCase() === str;
    };
    method.addEvent = function (elem, eventName, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(eventName, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + eventName, handler);
        }
    };
    method.getEvent = function (event) {
        return event ? event : window.event;
    };
    method.getEventTarget = function (event) {
        return event.target || event.srcElement;
    };
    method.stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };
    method.preventDefault = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };
    method.domPosition = function () {
        var queryDom = arguments[0],
            position = arguments[1] || {x: 0, y: 0};
        if (typeof position != "object") {
            return;
        }
        if (queryDom.offsetParent) {
            position.x = position.x + queryDom.offsetLeft;
            position.y = position.y + queryDom.offsetTop;
            position = arguments.callee(queryDom.offsetParent, position)
        }
        return position;
    };
    method.extend = function () {
        var i = 1,
            len = arguments.length,
            target = arguments[0];
        for (i; i < len; i++) {
            for (var j in arguments[i]) {
                target[j] = arguments[i][j];
            }
        }
        return target;
    };
    method.objectToArray = function (nodes) {
        var array = null;
        try {
            array = Array.prototype.slice.call(nodes, 0);
        } catch (ex) {
            array = new Array();
            for (var i = 0, len = nodes.length; i < len; i++) {
                array.push(array[i]);
            }
        }
        return array;
    };
    method.unique = function (arr) {
        var ret = [];
        var hash = {};
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var key = typeof(item) + item;
            if (hash[key] !== 1) {
                ret.push(item);
                hash[key] = 1;
            }
        }
        return ret
    };
    method.sortSTL = function (array) {
        return array.sort(function (a, b) {
            return a - b;
        });
    };
    method.sortLTS = function (array) {
        return array.sort(function (a, b) {
            return b - a;
        })
    };
    function MyTimer(fn, interval, times) {
        this.fn = fn;
        this.interval = interval;
        this.times = times;
        this.temptimer = 0;
        this.timer = null;
        this.runtimer();
    }

    MyTimer.prototype.runtimer = function () {
        var that = this;
        if (this.times) {
            if (this.temptimer < this.times) {
                this.temptimer++;
                this.timer = setTimeout(function () {
                    that.fn();
                    that.runtimer.call(that);
                }, this.interval);
            } else {
                clearTimeout(this.timer);
            }
        } else {
            this.timer = setTimeout(function () {
                that.fn();
                that.runtimer.call(that);
            }, this.interval);
        }
    };
    method.setTimer = function (fn, interval, times) {
        return new MyTimer(fn, interval, times);
    };
    method.clearTimer = function (object) {
        clearTimeout(object.timer);
    };
    method.setQueryString = function (url, args) {
        var key, name, value;
        if (typeof args !== "object") {
            return false;
        }
        url += (url.indexOf("?") == -1 ? "?" : "&");
        for (key in args) {
            name = encodeURIComponent(key);
            value = encodeURIComponent(args[key]);
            url += name + "=" + value + "&";
        }
        url = url.substring(0, url.length - 1);
        return url;
    };
    method.getQueryStringArgs = function () {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
            args = {},
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    };
    function AjaxQuery(option) {
        this.url = option.url;
        this.type = option.type;
        this.success = option.success;
        this.data = option.data;
        this.headers = option.headers;
        this.dataType = option.dataType;
    }

    AjaxQuery.prototype = {
        constructor: AjaxQuery,
        init: function (exd) {
            var key,
                xhrObj = null;
            that = this;
            if (exd) {
                for (key in exd) {
                    this[key] = exd[key];
                }
            }
            function createXHR() {
                if (typeof XMLHttpRequest != "undefined") {
                    createXHR = function () {
                        return new XMLHttpRequest();
                    };
                } else if (typeof ActiveXObject != "undefined") {
                    createXHR = function () {
                        if (typeof arguments.callee.activeXString != "string") {
                            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                    "MSXML2.XMLHttp"],
                                i, len;
                            for (i = 0, len = versions.length; i < len; i++) {
                                try {
                                    new ActiveXObject(versions[i]);
                                    arguments.callee.activeXString = versions[i];
                                } catch (ex) {
                                }
                            }
                        }
                        return new ActiveXObject(arguments.callee.activeXString);
                    };
                } else {
                    createXHR = function () {
                        throw new Error("No XHR object available.");
                    };
                }
                return createXHR();
            }

            xhrObj = createXHR();
            xhrObj.onreadystatechange = function (event) {
                var data = xhrObj.responseText;
                if (xhrObj.readyState == 4) {
                    if ((xhrObj.status >= 200 && xhrObj.status < 300) || xhrObj.status == 304) {
                        if (that.dataType && that.dataType.toLowerCase() === "json") {
                            data = JSON.parse(data);
                        }
                        that.success(data);
                    } else {

                    }
                }
            };
            var queryUrl;
            if (this.data) {
                queryUrl = method.setQueryString(this.url, this.data);
            } else {
                queryUrl = this.url;
            }
            xhrObj.open(this.type, queryUrl, true);
            if (this.headers) {
                for (var headersKey in this.headers) {
                    xhrObj.setRequestHeader(headersKey, this.headers[headersKey]);
                }
            }
            xhrObj.send();
        }
    };
    method.ajax = function (op) {
        return new AjaxQuery(op);
    };
    method.throttle = function () {
        var isClear = arguments[0], fn;
        if (typeof  isClear === "boolean") {
            fn = arguments[1];
            fn._throttleID && clearTimeout(fn._throttleID);
        } else {
            fn = isClear;
            param = arguments[1];
            var p = xbx.extend({context: null, args: [], time: 300}, param);
            arguments.callee(true, fn);
            fn._throttleID = setTimeout(function () {
                fn.apply(p.context, p.args)
            }, p.time)
        }
    };
    method.verify = (function () {
        var EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            ONLY_LETTER_OR_NUMBER = /^[a-z0-9]+$/i,
            HAS_LETTER_OR_NUMBER = /[a-z0-9]+/i,
            ONLY_LETTER = /^[a-zA-Z]+$/i,
            HAS_LETTER = /[a-zA-Z]+/i,
            ONLY_NUMBER = /^[0-9]+$/,
            HAS_NUMBER = /[0-9]+/,
            ONLY_CHINSES = /^[\u2E80-\u9FFF]+$/,
            HAS_CHINSES = /[\u2E80-\u9FFF]+/,
            ONLY_LETTER_AND_NUMBER = /^[a-z]+[0-9]+$/i,
            HAS_SPACE = /\s+/,
            HAS_EXCEPT_C_N_L = /[^\u2E80-\u9FFFa-zA-Z0-9]+/;

        var arithmetic = {
            isNull: function (value) {
                return value.length == 0;
            },
            email: function (value) {
                return EMAIL.test(value);
            },
            onlyLetOrNum: function (value) {
                return ONLY_LETTER_OR_NUMBER.test(value);
            },
            hasLetOrNum: function (value) {
                return HAS_LETTER_OR_NUMBER.test(value);
            },
            onlyLetAndNum: function (value) {
                return ONLY_LETTER_AND_NUMBER.test(value);
            },
            onlyCn: function (value) {
                return ONLY_CHINSES.test(value);
            },
            hasCn: function (value) {
                return HAS_CHINSES.test(value);
            },
            onlyNum: function (value) {
                return ONLY_NUMBER.test(value);
            },
            hasNum: function (value) {
                return HAS_NUMBER.test(value);
            },
            onlyLet: function (value) {
                return ONLY_LETTER.test(value);
            },
            hasLet: function (value) {
                return HAS_LETTER.test(value);
            },
            hasSpace: function (value) {
                return HAS_SPACE.test(value);
            },
            hasExCLN: function (value) {
                return HAS_EXCEPT_C_N_L.test(value);
            }
        };
        return function (type, value) {
            value = value.replace(/^\s+|\s+$/g, "");
            return arithmetic[type] ? arithmetic[type](value) : false;
        }
    })();
    method.mousePosition = function (e) {
        e = e || window.event;
        var x = e.pageX || (e.clientX +
            (document.documentElement.scrollLeft
            || document.body.scrollLeft));
        var y = e.pageY || (e.clientY +
            (document.documentElement.scrollTop
            || document.body.scrollTop));
        return {'x': x, 'y': y};
    };
    return method;
}();