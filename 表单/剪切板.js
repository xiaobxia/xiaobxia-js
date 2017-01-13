/**
 * 事件
 * beforecopy 在发生复制操作之前
 * copy 发生复制操作时
 * beforecut 发生剪切操作前
 * cut 发生剪切操作时
 * beforepaste 发生粘贴操作前
 * paste 发生粘贴操作时
 *
 * clipboardData对象有setDate,getDate,clearDate方法
 *
 */

var EventUtil={
    //设置剪切板内容
    setClipboardText: function(event, value){
        //现代浏览器中clipboardData对象在event中访问
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
            //在ie中clipboardData对象在window对象中访问
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },
    //得到剪切板内容
    getClipboardText: function(event){
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    }
};

//使用例子
(function(){
    var textbox = document.getElementById("txtPhone");
    //监听事件
    EventUtil.addHandler(textbox, "paste", function(event){
        //得到事件对象
        event = EventUtil.getEvent(event);
        //得到文字
        var text = EventUtil.getClipboardText(event);
        if (!/^\d*$/.test(text)){
            //阻止默认行为
            EventUtil.preventDefault(event);
        }
    });
})();

