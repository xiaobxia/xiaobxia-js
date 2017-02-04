/**
 * 定义：闭包就是一个函数，捕获作用域内的外部绑定(例如，不是自己的参数)。这些绑定是为之后使用(即使在该作用域已结束)而被定义的。
 *
 */
//捕获局部变量
function sayHi() {
    var word="Hi";
    return function () {
        return "I say"+word;
    }
}
var a=sayHi();
a();//I say Hi

//捕获参数
function say(b) {
    return function () {
        return "I say"+b;
    }
}
var sayHi=say("Hi");
sayHi();//I say Hi

//自由变量
function add(s) {
    return function (n) {
        return s+n;
    }
}
var add10=add(10);
add10(1);//11
var add100=add(100);
add100(1);//101

//遮蔽
function ss(dd) {
    return function (dd) {
        return dd+1;
    }
}
var cc=ss(11);
cc(3);//4

/**
 * 特性
 */
//捕获函数时
//就像创建了函数的副本一样
var aa = function (n) {
    return (n % 2) === 0;
};
function cc(fun) {
    return function (bb) {
        return fun.apply(null, bb);
    }
}
var hh = cc(aa);//false
console.log(hh([45]));
aa = function (n) {
    return (n % 2) !== 0;
};
var kk = cc(aa);
console.log(hh([45]));//false
console.log(kk([45]));//true

/**
 * 为对象时，和为函数时不同
 * 重新声明：创建时保存的是引用
 * 重新声明时aa不再是原来那个aa，所以hh还保留着原来那个aa的引用说以值不会变
 *
 * 修改值时：aa只是被修改了，它还是原来那个aa
 *
 */

var aa =  {
    c: 4
};
function cc(obj) {
    return function () {
        return console.log(obj);
    }
}
var hh = cc(aa);
hh();//{c:4}
aa =  {
    c: 5
};
var kk = cc(aa);
hh();//{c:4}
kk();//{c: 5}
//后一种情况
var aa =  {
    c: 4
};
function cc(obj) {
    return function () {
        return console.log(obj);
    }
}
var hh = cc(aa);
hh();//{c:4}
aa.b=7;
var kk = cc(aa);
hh();//{c:4,b:7}
kk();//{c:4,b:7}

/**
 * 字符串时
 *
 */
var aa =  "ll"
function cc(obj) {
    return function () {
        return console.log(obj);
    }
}
var hh = cc(aa);
hh();//ll
aa+="bb";
var kk = cc(aa);
hh();//ll
kk();//llbb

var aa =  "ll"
function cc(obj) {
    return function () {
        return console.log(obj);
    }
}
var hh = cc(aa);
hh();//ll
aa="bb";
var kk = cc(aa);
hh();//ll
kk();//bb

