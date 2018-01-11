/**
 * Created by xiaobxia on 2018/1/11.
 */
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
    var animal = new Animal();
    for(var p in animal){
        Cat.prototype[p] = animal[p];
    }
    Cat.prototype.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false，不是Animal的实例
console.log(cat instanceof Cat); // true