var url1 = "www.baidu.com?name3=value3", abc;
function addqueryarg(url, args) {
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
abc = addqueryarg(url1, {name1: "value1",name2:"value2"});
alert(abc);
