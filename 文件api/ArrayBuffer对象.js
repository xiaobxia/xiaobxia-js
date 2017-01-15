/**
 * ArrayBuffer对象的用意在于，操作音频和视频等二进制数据
 * ArrayBuffer对象代表装在数据的缓存区
 * ArrayBuffer不能被直接操作，而是通过ArrayBufferView来进行操作
 *
 */
//创建ArrayBuffer对象，同时需要说明缓存区长度，其有length属性
var buf=new ArrayBuffer(32);
/**
 * 一般不直接使用ArrayBufferView对象而是使用它的子类
 * 类型  字节长度  描述
 * Int8Array 1 8位整数数组
 * Uint8Array 1 8位无符号整数数组
 * Uint8ClampedArray 1 8位无符号整数数组
 * Int16Array 2 16位整数数组
 * Uint16Array 2 16位无符号整数数组
 * Int32Array 4 32位整数数组
 * Uint32Array 4 32位无符号整数数组
 * Float32Array 4 32位IEEE浮点数数组
 * Float64Array 8 64位IEEE浮点数数组
 */
//还有两个可选参数byteOffset：偏移值，length：长度
var Int8=new Int8Array(ArrayBuffer);
//读取第5个字节
var byte=Int32[4];
//设置第5个字节
Int8[5]=1;

/**
 *
 */
function aa() {

}