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
            return (new Function(k, fn.$)).apply(d, v);
        }
    };
    if (!fn.$) {
        fn.$ = 'var $="";';
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
    return data ? fn(data, fast) : fn;
}