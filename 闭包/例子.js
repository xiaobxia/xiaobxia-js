/**
 * 在这里result得到f2。
 * 因为result是全局变量，所以不会被回收，所以fn2一直存在。
 * 因为f2依赖于f1，所以f1也一直在。
 * nAdd是全局的，自身也是闭包。
 **/
function f1(){
    var n=999;
    nAdd=function(){n+=1};
    function f2(){
        alert(n);
    }
    return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000