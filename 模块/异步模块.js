(function (F) {
    var moduleCache={},
        /**
         * 作用在于修改模块的状态并且调用function(mod){}*/
        setModule=function (moduleName,params,callback) {
            var _module,fn;
            if(moduleCache[moduleName]){
                _module=moduleCache[moduleName];
                //修改状态为加载完成
                _module.status="loaded";
                //dom不依赖其他所以params为0
                //得到模块的接口，callback是F.module("lib/dom",function () {})中的function
                _module.exports=callback?callback.apply(_module,params):null;
                //fn是function(mod)
                while(fn=_module.onload.shift()){
                    fn(_module.exports);
                }
            }else{
                //params是模块的集合
                //callback是功能
                callback&&callback.apply(null,params);
            }
        },
        loadModule=function (moduleName,callback) {
            var _module;
            /*
            * event.js先于dom.js
            * 又因为event依赖dom
            * 所以会先检测dom的加载情况
            * */
            if(moduleCache[moduleName]){
                _module=moduleCache[moduleName];
                /**
                 * index之后的结果是loading状态
                 * */
                if(_module.status==="loaded"){
                    setTimeout(callback(_module.exports),0);
                }else {
                    /*
                    * 存放function(mod)
                    * 加载event时最终存放了两个function(mod)
                    * */
                    _module.onload.push(callback);
                }
                //在index.js中依赖的模块就是在这里注册初始化，并加载
            }else {
                moduleCache[moduleName]={
                    moduleName: moduleName,
                    status: "loading",
                    exports: null,
                    onload: [callback]
                };
                loadScript(getUrl(moduleName));
            }
        },
        getUrl=function (moduleName) {
            return String(moduleName).replace(/\.js$/g,"")+".js";
        },
        loadScript=function (src) {
            var _script=document.createElement("script");
            _script.type = 'text/javascript';
            _script.async = true;
            _script.charset = 'UTF-8';
            _script.src=src;
            (document.getElementsByTagName('head')[0]
            || document.getElementsByTagName('body')[0]).appendChild(_script);
        };
        F.module=function (url,modDeps,modCallback) {
            var args=Array.slice.call(arguments),
                callback=args.pop(),
                deps=(args.length&&args[args.length-1] instanceof Array)? args.pop():[],
                mUrl=args.length?args.pop():null,
                params=[],
                depsCount=0,
                i=0,
                len;
            if(len=deps.length){
                while (i<len){
                    //用这种方式传入i是为了保护闭包function(mod){}中的i
                    (function (i) {
                       depsCount++;
                        loadScript(deps[i],function (mod) {
                            //params是F.module("lib/event",["lib/dom"],function (dom) {})
                            //上个例子中的dom的实参，callback是function (dom) {}
                            params[i]=mod;
                            //保存所需的依赖的个数
                            depsCount--;
                            if(depsCount===0){
                                setModule(mUrl,params,callback);
                            }
                        });
                    }(i));
                    i++;
                }
            }else {
                //[]里面本该存放
                setModule(mUrl,[],callback);
            }
        }
})((function () {
    return window.F={};
})());