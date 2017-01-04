/**
 * 使用方法
 [: if (title){ :]
      [: for (var i=0;i<list.length;i++) { :]
          <div>[:=i:]. [:=list[i].user:]</div>
      [:}:]
      [:=this.name||"name is not found !":]
   [:}:]
 var data = {
      title: '标签',
      list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
   };
 var html = tppl(document.getElementById('test').innerHTML, data);
 */
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
         * /**
         * 把所有换行替换为" "  \r:回车符,\t:制表符,\n:换行符
         * 把'替换为\'
         * 按[:分割
         * ["  "," if (title){ :]  "," for (var i=0;i<list.length;i++) { :]  <div>",
         * "=i:]. ","=list[i].user:]</div>  ","}:]  ",
         * "=this.name||"name is not found !":]  ","}:] "]
         */

        var tpls = tpl.replace(/[\r\t\n]/g, " ").replace(/\'/g, "\\'").split('[:'),
            i = 0;
        //使用while提升速度
        while (i < tpls.length) {
            //得到项
            var p = tpls[i];
            //略过第一个
            if (i) {
                var x = p.indexOf(':]');
                fn.$ += p.substr(0, x);
                p = p.substr(x + 2)
            }
            //匹配[=::]
            fn.$ += "$+='" + p.replace(/\[\=\:(.*?)\:\]/g, "'+$1+'") + "';";
            i++;
        }
        fn.$ += "return $";
    }
    return data ? fn(data, fast) : fn;
}
