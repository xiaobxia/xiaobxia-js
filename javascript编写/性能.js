/**数据
 *1.多使用numbers与booleans类型。
 *2.尽可能在同一个数组中存放单个类型
 *3.缓存全局变量在局部变量当中
*/
function example(a, b) {
    // 在这里编译器希望参数是number而不用进行类型转换。
    console.log(++a * ++b);
}
example("1", 2); //不好
example(1, 2); //好

let badArray = [1, true, 0]; // 不好，混合了类型
let array = [1, 0, 1]; // 好
/** 比较
 * if(a) then bla 这个类型的条件选择语句中传入随意类似的a值。
 * 尽可能使用 === 这个严格比较操作符而不是 == 操作符。
 * 在类型检测时尽量避免与null进行比较，尽量使用values instanceof Array。
 * */
if (a) { //不好
}
if (a === 2) { //好
}
/**
 * arguments
 * 尽可能避免使用arguments[index]方式进行参数获取。
 * 尽量避免修改传入的参数变量。
 * */
function mul(a, b) {
    if(a===b){
        return (arguments[0]*arguments[1]); // 不好
    }else {
        return (a*b); // 好
    }
}

function test(a, b) {
    a = 5; // 不好，直接修改了参数
    let tmp = a; // 好，使用中间量
    tmp *= 2;
}
/**
 * 不建议使用的语法
 *  eval
 *  with
 *  try/catch
*/

/**
 * 对象
 *  当我们访问或者设置某个实例的未预定义变量值的时候会创建一个隐类。
*/
class Vector {
    constructor(x, y) {
        // compiler finds and expects member declarations here
        this.x = x;
        this.y = y;
    }
}
let vec2 = new Vector(2, 2);
// 不好，因为并没有定义z属性
vec2.z = 0;

/**
 * 循环
 * 尽可能的缓存数组长度的计算值
 * 避免使用 for-in 语法来遍历某个数组
 * 如果已知对象属性，最好不要使用for-in
 * 使用前缀自增表达式，也能带来小小的性能提升。（++i代替i++）
 * 在for之外声明变量
 * switch比if else快
*/
// 不好的做法
for (let key in array) {

}

let i = 0;
for (; i < array.length; ++i) {
    key = array[i];
}

// 好
let i = 0;
let key = null;
let length = array.length;
for (; i < length; ++i) {
    key = array[i];
}
for(var i = 0; i < 10; i++) { //最快
}
for(var prop in object) { //第二快
}
[1,2].forEach(function(value, index, array) { //最慢
 });

//在现代浏览器中createElement的性能比innerHtml好

//在现代浏览器中字符串连接使用+比join数组快

//for循环如果只要找一个东西，找到就break，减少无用的判断
for(var i = 0; i < handlers.length; i++){
    //找出本次需要处理的事件下标
    if(handlers[i] == handler){
        break;
    }
}

(function () {
    var aa=[1,2,3],
        len=aa.length,
        k=aa.length-1;
   for (var i=0;i<aa.length;i++){

   }
   for(var j=0;j<len;j++){
       //减少了对aa.length的查询
   }
   for (;k>=0;k--){
       //只有一个变量
   }
})();

