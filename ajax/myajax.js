
function AjaxQuery(option) {
    this.url=option.url;
    this.type=option.type;
    this.fn=option.success;
    this.query=option.data;
    this.headers=option.headers;
    this.dataType=option.dataType;
    this.init();
}
AjaxQuery.prototype = {
    constructor: AjaxQuery,
    init: function () {
        var xhrObj=null;
        var that=this;
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
        function setQueryString(url, args) {
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
        }
        xhrObj=createXHR();
        xhrObj.onreadystatechange=function (event) {
            var data=xhrObj.responseText;
            if (xhrObj.readyState == 4){
                if ((xhrObj.status >= 200 && xhrObj.status < 300) || xhrObj.status == 304){
                    if (that.dataType&&that.dataType.toLowerCase()==="json"){
                        data=JSON.parse(data);
                    }
                    that.fn(data);
                } else {

                }
            }
        };
        var queryUrl;
        if (this.query){
            queryUrl = setQueryString(this.url, this.query);
        }else {
            queryUrl=this.url;
        }
        xhrObj.open(this.type,queryUrl,true);
        if(this.headers){
            for(var headersKey in this.headers){
                xhrObj.setRequestHeader(headersKey,this.headers[headersKey]);
            }
        }
        xhrObj.send();
    }
};