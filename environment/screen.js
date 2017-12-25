var screen = {
    isRetina: function () {
        return window.devicePixelRatio > 1;
    }
}
/**
 * 设置viewport，和根字体大小
 */
function setAdaptive() {
    var _baseFontSize = 10;
    //和width有关
    var winWidth = 0;
    if (window.innerWidth) {
        winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)){
        winWidth = document.body.clientWidth;
    }
    //通过深入Document内部对body进行检测，获取窗口大小
    if(document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth){
        winWidth = document.documentElement.clientWidth;
    }
    var _fontscale = winWidth/375;
    var ua = navigator.userAgent;
    var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    var dpr = parseInt((window.devicePixelRatio || 1), 10);
    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
    }
    var scale = 1 / dpr;
    var metaEl = document.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        document.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale);
    document.documentElement.style.fontSize = (_baseFontSize / 2 * dpr * _fontscale)+'px';
    document.documentElement.setAttribute('data-dpr', dpr);
}