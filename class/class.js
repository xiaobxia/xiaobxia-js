//添加类
var addClass = function (elem, className) {
    //检索字符，如果字符没有出现（返回-1就是没有出现）
    if ((" " + elem.className + " ").indexOf(" " + className + " ") == -1) {
        //如果元素的类名为空就直接添加
        if (elem.className == "") {
            elem.className = className;
        } else {
            //如过类名不为空就添加前加入空格
            elem.className += (" " + className);
        }
    }
};
//判断有没有类
var hasClass = function (elem, className) {
    if ((" " + elem.className + " ").indexOf(" " + className + " ") == -1) {
        //如果元素的类名为空
        return 0;
    } else {
        return 1;
    }
};
//移除类
var removeClass = function (elem, className) {
    //把要移除的类从元素的类当中移除，保存在一个变量当中
    var newClass = (" " + elem.className + " ").replace(" " + className + " ", " ");
    //截取字符串，参数1是为了剔除开头的空格，参数二的原因是为了剔除最后一个空格
    elem.className = newClass.substr(1, newClass.length - 2);
};
