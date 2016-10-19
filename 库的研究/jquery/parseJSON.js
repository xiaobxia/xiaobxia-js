//在后来的版本中已被删除，推荐使用原生的方法
var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function (data) {

    // 查看浏览器是否有原生的方法
    if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data + "");
    }

    var requireNonComma,
        depth = null,
        str = jQuery.trim(data + "");
    //是否存在str是的话
    return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {
        if (requireNonComma && comma) {
            depth = 0;
        }
        if (depth === 0) {
            return token;
        }
        requireNonComma = open || comma;
        depth += !close - !open;
        return "";
    })) ?
        (Function("return " + str))() :
        jQuery.error("Invalid JSON: " + data);
};