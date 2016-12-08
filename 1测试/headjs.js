(function (F) {
    var moduleCache={},
        setModule=function (moduleName,params,callback) {
            var _module,fn;
            if(moduleCache[moduleName]){
                _module=moduleCache[moduleName];
                _module.status="loaded";
                _module.exports=callback?callback.apply(_module,params):null;
                while(fn=_module.onload.shift()){
                    fn(_module.exports);
                }
            }else{
                callback&&callback.apply(null,params);
            }
        },
        loadModule=function (moduleName,callback) {
            var _module;
            if(moduleCache[moduleName]){
                _module=moduleCache[moduleName];
                if(_module.status==="loaded"){
                    setTimeout(callback(_module.exports),0);
                }else {
                    _module.onload.push(callback);
                }
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
            var dd=String(moduleName).replace(/\.js$/g,"")+".js";
            return dd;
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
        var args=[].slice.call(arguments),
            //得到回调，执行逻辑
            callback=args.pop(),
            //依赖
            deps=(args.length&&args[args.length-1] instanceof Array)? args.pop():[],
            //模块地址
            mUrl=args.length?args.pop():null,
            params=[],
            depsCount=0,
            i=0,
            len;
        //判断条件为deps.length，同时赋值给len
        if(len=deps.length){
            while (i<len){
                (function (i) {
                    depsCount++;
                    loadModule(deps[i],function (mod) {
                        params[i]=mod;
                        depsCount--;
                        if(depsCount===0){
                            setModule(mUrl,params,callback);
                        }
                    });
                }(i));
                i++;
            }
        }else {
            setModule(mUrl,[],callback);
        }
    }
})((function () {
    return window.F={};
})());