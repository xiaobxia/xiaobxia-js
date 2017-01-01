/**
 * 1.编译结果缓存
 *  缓存很好理解，一次编译多次渲染。通常是保存初步正则替换后的字符串中间值，重复渲染时直接拿来使用。
 * 2.编译结果静态化
 *  编译模板字符串生成一个字符串拼接的函数，而不是每次创建函数。渲染操作就相当于一次函数调用，代入变量完成字符串拼接并返回。
 * 3.在现代浏览器中字符串连接使用+比join数组快
 * 4.split() 截断分析(分割开替换)优于全正则替换
 */
