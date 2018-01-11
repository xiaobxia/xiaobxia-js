##### 原型链继承
1.子类的prototype指向Super，存在的问题在于没法向Super传参，同时Super的实例方法不应该在子类的原型中，而应该也在子类的实例方法中
##### 组合继承
1.使用Super.call(this)，得到实例方法，同时也可以向Super传参
2.把子类的prototype指向Super，但是产生了一个问题，那就是又一次地得到了实例方法
##### 寄生组合继承
1.使用Super.call(this)，得到实例方法，同时也可以向Super传参
2.创建一个没有Super实例方法，但是有Super原型方法的副本
3.把子类的prototype指向副本
