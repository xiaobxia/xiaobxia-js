// 获取鼠标按键值，onmousedown事件
var getButton = function (event) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) {
        return event.button;
    } else {
        switch (event.button) {
            case 0:
                console.log('没有被按下');
                break;
            case 1:
                console.log('左键被按下');
                break;
            case 2:
                console.log('右键被按下');
                break;
            case 3:
                console.log('左键右键同时按下');
                break;
            case 4:
                console.log('中间键被按下');
                break;
            case 5:
                console.log('左键和中间键被按下');
                break;
            case 6:
                console.log('右键和中间键被按下');
                break;
            case 7:
                console.log('三个键同时按下');
                break;
        }
    }
};