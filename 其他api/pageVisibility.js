/**
 * Created by xiaobxia on 2018/1/21.
 */
/**
 * 可以通过判断网页的隐藏和显示，判断是否暂停视频播放
 */
var onPageVisibilityChange = function (callback) {
    // 也可以通过判断document.visibilityState
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    }
    else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    }
    else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    }
    else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    document.addEventListener(visibilityChange, function () {
        callback(!document[hidden]);
    }, false);
};

onPageVisibilityChange(function (show) {
    console.log(show);
    if (show) {
        console.log('显示')
    }
    else {
        console.log('隐藏')
    }
});
