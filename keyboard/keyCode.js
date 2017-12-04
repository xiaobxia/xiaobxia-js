//得到事件的键值
var getCharCode= function(event){

        return event.keyCode;

};
//得到指定位置的数字对应的键值
var str = "HELLO WORLD";
var n = str.charCodeAt(0);//72
//通过键值得到对应的字符
var a = String.fromCharCode(65);//A