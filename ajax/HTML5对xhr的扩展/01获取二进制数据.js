/**
 * HTML5以前获取二进制数据的方法
 * 使用overrideMimeType方法重载数据的Mime Type类型
 * 将charset修改为用户自定义类型
 */
var xhr = new XMLHttpRequest();
xhr.open("GET", "test.png", true);
xhr.overrideMimeType("text/plain; charset=x-user-defined");
xhr.onreadystatechange = function (e) {
    if (this.readyState == 4 && this.status == 200) {
        var binstr = this.responseText;
        for (var i = 0, len = binstr.length; i < len; i++) {
            var c = binstr.charCodeAt(i);
            var byte = c & 0xff;
        }
    }
};
xhr.send();

/**
 * HTML5的方式
 * responseType属性：在客户端中指定服务器的返回数据类型
 * 值为：text，arraybuffer，blob，json，document
 *
 * response属性：请求成功后，XMLHttpRequest对象的response属性返回响应的数据
 * responseType：text，response：字符串
 * responseType：arraybuffer，response：ArrayBuffer对象
 * responseType：blob，response：Blob对象
 * responseType：json，response：json对象
 * responseType：document，response：Document对象
 *
 */