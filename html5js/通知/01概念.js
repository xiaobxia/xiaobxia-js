/**
 * 用户在其他页面也会有消息弹窗，一般用于邮件提醒等
 */
if(window.Notification){
    //支持通知API
}else {
    //不支持
}
//向用户请求权限,必须要显式得触发事件
document.getElementById("btn").addEventListener("click",function () {
    window.Notification.requestPermission();
},false);
/**
 * window.Notification.permission查看浏览器是否被授权
 * default：未被授予
 * grant：被授予
 * denied：拒接
 */
if(window.Notification.permission=="granted"){

}
/**
 * 创建通知
 * title:通知到的标题
 * options：是一个对象
 * 属性
 * dir：指定通知的文字方向，ltr：从左向右，rtl：从右向左，默认为ltr
 * lang：用于标识通知所使用的语言，有效的BCP 47语言标识
 * body：字符串，指定显示的内容
 * tag：字符串，指定id
 * icon：图片的URL地址
 */
var notification=new Notification(title,options);
/**
 * 方法
 * Notification.close()  关闭通知
 * event
 * Notification.ondisplay(onshow)= function() {alert('通知被显示');};
 * Notification.onclose = function() {alert('通知被关闭');};
 * Notification.onclick = function() {alert('通知被点击');};
 * Notification.onerror = function() {alert('通知出错');};
 */
/**
 * 使用例子
 */
var NotificationTest;
function createNotification(){
    if (window.Notification.permission == "granted") {
        NotificationTest=new Notification('简单文本通知',
            {icon:'downArrow.gif',body:'通知内容'});
        /*for(var i=0;i<10;i++)
         NotificationTest=new Notification('简单文本通知',{icon:'downArrow.gif',tag:'MyID',body:' 第'+i+'条通知内容'});*/
        NotificationTest.onshow = function() {alert('通知被显示');};
        NotificationTest.onclose = function() {alert('通知被关闭');};
    }
    else if(window.Notification.permission == "default"){
        window.Notification.requestPermission();
    }
}
function closeNotification(){
    NotificationTest.close();
}