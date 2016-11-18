//得到滚轮的值
var getWheelDelta = function (event) {
    if (event.wheelDelta) {
        return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
    } else {
        return -event.detail * 40;
    }
};