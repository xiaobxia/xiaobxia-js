/**
 * Created by xiaobxia on 2017/10/26.
 */
/**
 * 缺点
 * 1.在实例化的时候无法给父类传参
 * 2.无法多继承
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

function Cat(sex) {
    this.sex = sex || '男';
}
Cat.prototype = new Animal('Cat');


var cat = new Cat();

//打印出的cat
var catConsole = {
    constructor: 'Cat',
    sex: '男',
    proto: {
        constructor: 'Animal',
        name: 'Cat',
        sleep: 'fuc',
        proto: {
            constructor: 'Object',
            eat: 'fuc',
        }
    }
};

console.log(cat.name);
cat.eat('fish');
cat.sleep();
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true


