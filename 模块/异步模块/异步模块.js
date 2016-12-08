/**
 * 1.如果是index，那就实现异步加载dom和event，
 * 同时在他们的onload上添加回调告诉他们完善自己后就过来当实参完善我(当我的实参)。
 *
 * 2.如果是dom先加载，没有依赖，那就完善自己的功能
 * 同时去绑定在自己身上的，需要自己当实参的地方，把自己的接口给它。
 *
 * 然后event加载了，他加载自己的依赖，发现dom加载过了，
 * 他就把dom的接口当自己的实参，完善自己，
 * 同时去绑定在自己身上的，需要自己当实参的地方，把自己的接口给它。
 *
 * 然后index被完善
 *
 * 3.如果是event先加载，他依赖dom，
 * 他就去dom的onload那里添加自己的回调，告诉dom完善自己后就来完善我(当我的实参)
 *
 * 然后dom加载了，没有依赖，完善自己的功能
 * 同时去绑定在自己身上的，需要自己当实参的地方，把自己的接口给它。
 *
 * 然后event被完善
 * 同时去绑定在自己身上的，需要自己当实参的地方，把自己的接口给它。
 *
 * 然后index被完善
 */
(function (F) {
    var moduleCache = {},
        /**
         * 1.如果自己是index那么就传入其他的模块的接口然后工作
         * 2.如果自己是功能模块那就初始化，完善自己的功能
         * @param moduleName 模块的id
         * @param params     依赖的模块接口(object)
         * @param callback   自己模块的功能
         */
        setModule = function (moduleName, params, callback) {
            var _module, fn;
            //对应自己的功能模块的情况
            if (moduleCache[moduleName]) {
                _module = moduleCache[moduleName];
                //修改状态为加载完成
                _module.status = "loaded";
                /**
                 * 得到模块的接口
                 * callback自己的功能
                 * 返回的结果一般是object
                 * dom不依赖其他所以params为0
                 */
                _module.exports = callback ? callback.apply(_module, params) : null;
                /**
                 * 把自己当实参传递给需要自己的模块
                 * fn是function(mod)
                 */
                while (fn = _module.onload.shift()) {
                    fn(_module.exports);
                }
                //对应了自己不是模块只是功能的情况(就是index)
            } else {
                /**
                 * params是依赖的接口，作为实参
                 * callback是自己的功能
                 */
                callback && callback.apply(null, params);
            }
        },
        /**
         * 加载所依赖的模块
         * 如果是第一次请求这个模块，那就异步加载
         * 如果是模块已经加载过了
         * @param moduleName 模块的名字
         * @param callback
         */
        loadModule = function (moduleName, callback) {
            var _module;
            //如果已经申请加载文件了
            if (moduleCache[moduleName]) {
                _module = moduleCache[moduleName];
                /**
                 *  如果依赖的模块是初始化并完善过自己功能的
                 * */
                if (_module.status === "loaded") {
                    //依赖加载过了那就直接完善自己功能
                    setTimeout(callback(_module.exports), 0);
                } else {
                    //依赖没有加载那就在依赖上绑定，告诉他加载好了的时候就来传给我
                    _module.onload.push(callback);
                }
                /**
                 * index文件加载的情况
                 * 这里的callback是function(mod)
                 */
            } else {
                moduleCache[moduleName] = {
                    moduleName: moduleName,
                    status: "loading",
                    exports: null,
                    //onload里是如果自己加载完成了，帮助把自己当实参传递的函数
                    onload: [callback]
                };
                loadScript(getUrl(moduleName));
            }
        },
        getUrl = function (moduleName) {
            return String(moduleName).replace(/\.js$/g, "") + ".js";
        },
        loadScript = function (src) {
            var _script = document.createElement("script");
            _script.type = 'text/javascript';
            _script.async = true;
            _script.charset = 'UTF-8';
            _script.src = src;
            (document.getElementsByTagName('head')[0]
            || document.getElementsByTagName('body')[0]).appendChild(_script);
        };
    F.module = function (url, modDeps, modCallback) {
        var args = Array.slice.call(arguments),
            //基于模块的功能
            callback = args.pop(),
            //存放依赖的模块
            deps = (args.length && args[args.length - 1] instanceof Array) ? args.pop() : [],
            //自己的地址，同时也是id
            mUrl = args.length ? args.pop() : null,
            //功能函数的参数，通常是另一个模块
            params = [],
            //依赖的数目
            depsCount = 0,
            i = 0,
            len;
        //如果有依赖的模块
        if (len = deps.length) {
            while (i < len) {

                //使用闭包保留外部环境如mUrl， callback
                (function (i) {
                    //给依赖计数，位置很重要，因为要用来传递
                    depsCount++;
                    /**
                     * function(mod)的作用是生成实参并帮助其完善功能
                     * mod是模块的接口
                     */
                    loadModule(deps[i], function (mod) {
                        //params是所依赖的接口的集合
                        //mod是接口
                        params[i] = mod;
                        //如果依赖都传入了那么就开始实现自己的功能
                        //如果依赖还没都传入那就先停着
                        depsCount--;
                        if (depsCount === 0) {
                            setModule(mUrl, params, callback);
                        }
                    });
                    //为了使i能保留
                }(i));
                i++;
            }
            //如果没有依赖的模块
        } else {
            setModule(mUrl, [], callback);
        }
    }
})((function () {
    return window.F = {};
})());