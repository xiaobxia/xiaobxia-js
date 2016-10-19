var CookieUtil = {

    get: function (name){
        //编码
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;
        //如果存在
        if (cookieStart > -1){
            //再到对应键的位置后面的第一个分号的位置
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            //如果不存在
            if (cookieEnd == -1){
                //结束的位置在最后面
                cookieEnd = document.cookie.length;
            }
            //把值截取下来，并解码
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        } 

        return cookieValue;
    },
    //设置cookie
    set: function (name, value, expires, path, domain, secure) {
        //编码
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
    
        if (path) {
            cookieText += "; path=" + path;
        }
    
        if (domain) {
            cookieText += "; domain=" + domain;
        }
    
        if (secure) {
            cookieText += "; secure";
        }
    
        document.cookie = cookieText;
    },
    //删除cookie，把值设为空，把时间设为过期
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }

};