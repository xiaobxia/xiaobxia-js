/**
 * Created by xiaobxia on 2017/10/26.
 */
/**
 * 缺点
 * 1.是子类的实例，不是父类的实例
 * 2.只能继承父类的实例属性和方法，不能继承原型属性/方法
 * 3.无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
 */

// 定义一个动物类
function Animal(name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};


function Cat(name){
    Animal.call(this);
    this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat);

var catConsole = {
    constructor: 'Cat',
    name: 'Tom',
    sleep: 'fuc',
    proto: {
        constructor: 'Cat'
    }
};

console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false，不是Animal的实例
console.log(cat instanceof Cat); // true