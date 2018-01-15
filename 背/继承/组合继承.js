/**
 * Created by xiaobxia on 2018/1/11.
 */
// 定义一个动物类
function Animal (name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function(){
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
};
function Cat(name){
    // 执行了Animal的构造方法
    Animal.call(this);
    this.name = name || 'Tom';
}
//TODO 虽然得到了Animal的原型方法，但是也又一次地得到了实例方法
Cat.prototype = new Animal();

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true