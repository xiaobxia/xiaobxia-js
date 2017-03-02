var o={
    x:1,
    y:2
};
//检测属性是不是自有属性
o.hasOwnProperty("x");//true
//检测是个自有属性并且是可以枚举的
o.propertyIsEnumerable("x");//true

