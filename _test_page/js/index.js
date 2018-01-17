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

console.log(new Animal())

function Cat(name){
    // 执行了Animal的构造方法
    Animal.call(this);
    this.name = name || 'Tom';
}
(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = Animal.prototype;
    //将实例作为子类的原型
    console.log(new Super())
    //TODO cat的原型应该是Animal，而super是没有实例方法的Animal
    //TODO 相较于组合继承，减少了开销
    Cat.prototype = new Super();
})();

// Test Code
var cat = new Cat();
Animal.prototype.aa = 'aa';
console.log(cat);
console.log(cat.name);
console.log(cat.sleep);
console.log(cat instanceof Animal); // true
//TODO 首先因为是new Cat,所以一定是Cat的实例
console.log(cat instanceof Cat); //true