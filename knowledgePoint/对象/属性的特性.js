/**
 * 得到属性的描述符,对于自有属性
 * {value:1, writeable:true, enumerable:true, configurable: true}
 * 值，可写性，可枚举性，可配置性
 */
Object.getOwnPropertyDescriptor({x:1},x);

/**
 * 设置属性特性
 */
var a={};
Object.defineProperty(a,"x",{value:1, writeable:true, enumerable:true, configurable: true});
Object.defineProperties(a,{
    x:{value:1, writeable:true, enumerable:true, configurable: true},
    y:{value:1, writeable:true, enumerable:true, configurable: true}
});




