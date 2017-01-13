function tppl(tpl, data, fast) {
    /**
     * fn.$: 保存了function的code
     * fn.$$: 保存了function的缓存
     */
    var fn = function (d, f) {
        //如果快速
        if (f) {
            //得到fn.$$或生成fn.$$
            fn.$$ = fn.$$ || new Function(fn.$);
            //返回执行的结果
            return fn.$$.apply(d);
        } else {
            var i,
                //缓存key
                k = [],
                //缓存value
                v = [];
            //遍历data进行添加
            for (i in d) {
                k.push(i);
                v.push(d[i]);
            }
            /**
             * k=[title,list]
             * v=['标签',['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']]
             * (new Function(k, fn.$))等同于
             * function(title,list)
             * {
             *      fn.$;
             * }
             */
            console.log(new Function(k, fn.$));
            return (new Function(k, fn.$)).apply(d, v);
        }
    };
    //如果没有code
    if (!fn.$) {
        //js: var $="";
        fn.$ = 'var $="";';
        /**
         * 把所有换行替换为" "  \r:回车符,\t:制表符,\n:换行符
         * 把'替换为\'
         * 按[:分割
         */
        var tpls = tpl.replace(/[\r\t\n]/g, "").replace(/\'/g, "\\'").split('<%'),
            i = 0;
        //使用while提升速度
        while (i < tpls.length) {
            var p = tpls[i];
            if (i) {
                var x = p.indexOf('%>');
                var a = p.substr(0, x);
                if (a.indexOf("=") === 0) {
                    fn.$ += "$+" + a + ";";
                } else {
                    fn.$ += a;
                }
                p = p.substr(x + 2)
            }
            fn.$ += "$+='" + p + "';";
            i++;
        }
        fn.$ += "return $";
    }
    console.log(fn.$);
    return data ? fn(data, fast) : fn;
}
var data = {
    title: '标签',
    list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = tppl(document.getElementById('test').innerHTML, data);
document.getElementById('seven').innerHTML = html;
/**
 * 说明依赖，
 * 在moduleCache注册依赖的模块
 * 并异步加载
 * */
var dd=/java(?!script)/;
var ss="javasdcriptdf";
console.log(dd.test(ss));
