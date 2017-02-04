/**
 * web Sockets并不适用于标准http服务器，需要专门支持的服务器
 * http://变为ws://,https://变为wss://
 * web Sockets不受同源策略影响
 */
var socket=new WebSocket("ws://xxxxxx");
//只能发送字符串
socket.send("xxx");
/**
 * 只能用DOM0级的写法写
 */
//接受数据
socket.onmessage=function (event) {
    var data=event.data;
};
//成功建立连接的事件
socket.open=function () {
};
//发生错误，连接不能持续
socket.onerror=function () {
};
//连接关闭
socket.onclose=function () {
};

