/*用法
* var isIPad= browser.version.iPad;
* */
var browser = {
    version: function () {
        //得到内核
        var b = navigator.userAgent;
        return {
            trident: /Trident/i.test(b),//IE内核
            presto: /Presto/i.test(b),//opera内核
            webKit: /AppleWebKit/i.test(b),
            gecko: /Gecko/i.test(b) && !/KHTML/i.test(b),//火狐内核
            mobile: /AppleWebKit.*Mobile.*/i.test(b),
            ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(b),
            android: /Android/i.test(b) || /Linux/i.test(b),
            windowsphone: /Windows Phone/i.test(b),
            iPhone: /iPhone/i.test(b),
            iPad: /iPad/i.test(b),
            MicroMessenger: /MicroMessenger/i.test(b),
            webApp: !/Safari/i.test(b),
            edge: /edge/i.test(b),
            weibo: /Weibo/i.test(b),
            uc: /UCBrowser/i.test(b),
            qq: /MQQBrowser/i.test(b),
            baidu: /Baidu/i.test(b)
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};