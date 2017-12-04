function addURLparam(url, name, value) {
    url += (url.indexOf("?") === -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;

}
//我的写法
function myaddURLparam(url, data) {
    var i, l, part, parts, name, value;
    if (typeof data === "undefined") {
        return false;
    }
    if (data.indexOf("&") !== -1) {
        parts = data.split("&");
        for (i = 0, l = parts.length; i < l; i++) {
            url += (url.indexOf("?") === -1 ? "?" : "&");
            part = parts[i].split("=");
            name = encodeURIComponent(part[0]);
            value = encodeURIComponent(part[1]);
            url += name + "=" + value;
        }

    } else {
        url += (url.indexOf("?") === -1 ? "?" : "&");
        part = data.split("=");
        name = encodeURIComponent(part[0]);
        value = encodeURIComponent(part[1]);
        url += name + "=" + value;
    }
    return url;
}

//我的用对象的写法
function addqueryarg(url,args) {
    var key, name, value;
    if (typeof args !== "object") {
        return false;
    }
    url += (url.indexOf("?") === -1 ? "?" : "&");
    for(key in args){
        name=encodeURIComponent(key);
        value=encodeURIComponent(args[key]);
        url += name + "=" + value+"&";
    }
    url=url.substring(0,url.length-1);
    return url;
}

