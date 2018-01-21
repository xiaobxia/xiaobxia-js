/**
 * 可以通过判断网页的隐藏和显示，判断是否暂停视频播放
 */
function requestFullScreen(elem) {
    elem = elem || document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.webkitRequestFullScreen) {
        // 对 Chrome 特殊处理，
        // 参数 Element.ALLOW_KEYBOARD_INPUT 使全屏状态中可以键盘输入。
        if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        // Safari 浏览器中，如果方法内有参数，则 Fullscreen 功能不可用。
        else {
            elem.webkitRequestFullScreen();
        }
    }
    else if (elem.mozRequestFullScreen) {
        // 在moz下，elem只能是文档
        elem.mozRequestFullScreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
}

var onFullScreenChange = function (fn) {
    var doc = document.documentElement;
    var fullscreenchange, fullscreen;
    if ('requestFullscreen' in doc) {
        fullscreen = 'fullscreen';
        fullscreenchange = 'fullscreenchange';
    } else if ('webkitRequestFullScreen' in doc) {
        fullscreen = 'webkitIsFullScreen';
        fullscreenchange = 'webkitfullscreenchange';
    } else if ('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) {
        fullscreen = 'mozFullScreen';
        fullscreenchange = 'mozfullscreenchange';
    } else {
        console.log('不支持fullScreen');
        return false;
    }
    document.addEventListener(
        'webkitfullscreenchange',
        function (e) {
            var isFullScreen = document.fullscreen ||
                document.webkitIsFullScreen ||
                document.mozFullScreen ||
                false;
            fn(isFullScreen);
        },
        false
    );
};

onFullScreenChange(function (f) {
    console.log(f)
});