##### 组合继承
1.使用Super.call(this)，得到实例方法
2.把子类的prototype指向Super，但是产生了一个问题，那就是又一次地得到了实例方法
##### 寄生组合继承
1.使用Super.call(this)，得到实例方法
2.创建一个没有Super实例方法，但是有Super原型方法的副本
3.把子类的prototype指向副本
