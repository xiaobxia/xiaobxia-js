//字符串中所有at的实例
var a=/at/g;
//匹配第一个bat或cat不区分大小写
var b=/[bc]at/i;
//匹配所有以at结尾的3个字符的组合，不区分大小写
var c=/.at/gi;
//匹配a，b，c中的任意一个字符
var d=/[abc]/;
//匹配a，b，c之外的任意字符
var e=/[^abc]/;

//匹配字符串ab或ed或ef
var f=/ab|cd|ef/;
//匹配3个数字或是4个小写字母
var g=/\d{3}|[a-z]{4}]/;
//从左往右，当匹配到了a，就不会去匹配ab了
var h=/a|ab/;

//匹配java，后面可以有script也可以没有
var i=/java(script)?/;
//匹配ab或cd一次或多次，或匹配ef
var j=/(ab|cd)?|ef/;
//一个或多个小写字符后面跟着一个或多个数字
var k=/[a-z]+\d+/;
//一样的功能，但是可以抽取数字
var m=/[a-z]+(\d+)/;
//\1代表第一个圆括号内的表达式，\2指的(Ss)cript,按左括号的位置来规定
var n=/([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/;

//\1不止引用了['"],还要求前面的['"]和\1所匹配的要相同，['"]匹配了'的话\1也得匹配'
//匹配'或",后面跟着一个或多个除'和"之外的字符0次或多次，后面又跟着'或"
//匹配单引号和双引号之间0个或多个字符，不要求前后的引号相同
var o=/['"][^'"]*['"]]/;
//这时要求前后的引号相同
var p=/['"][^'"]*\1]/;

//这时\2为(fun\w*)，因为(?:)产生分组，但不计入索引
var q=/([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/;

//匹配javascript，这个javascript的前面得是字符串的开头，后面得是字符串的结尾
//也就是只能匹配javascript，而不能匹配javascriptjavascript
var r=/^javascript$/;

//匹配java，这个java的前面是一个单词的边界，后面也是一个单词的边界
var s=/\bjava\b/;

//匹配java后面紧跟:,匹配得到的是java而不是java:
var t=/java(?=\:)/;
//匹配java后面不跟script的，匹配得到的是java
var u=/java(?!script)/;


