function sayName(obj) {
    obj.name="a";
}
var person={};
sayName(person);
alert(person);//"a"
//person仍被改变，但是这并不能说明参数是按引用传递的，其实它仍是按值传递的，但是obj对按引用来访问同一个对象
function setName(obj) {
    obj.name="a";
    obj={};
    obj.name="b";
}
var person1={};
setName(person1);
alert(person1);//"a"
//原来的引用保持不变
//其实当obj重写时，这个变量引用就变成局部变量了，局部变量会在函数执行完毕后销毁
