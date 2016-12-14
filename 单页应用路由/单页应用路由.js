/*
 *author:https://github.com/kliuj
 **使用方法
 *        1：注册路由 : spaRouters.map('/name',function(transition){
 //异步加载js
 spaRouters.asyncFun('name.js',transition)
 //或者同步执行回调
 spaRouters.syncFun(function(transition){},transition)
 })
 2：初始化      spaRouters.init()
 3：跳转  href = '#/name'
 */
/**
 * 1.初始化，注册load和hashchange时执行urlChange
 * 2.urlChange：得到路由看有没有在routers中注册，没有注册就回到index，注册了就去执行回调
 *  使用map在routers中注册
 */
(function() {
    //工具函数
    var util = {
        //获取路由的路径和详细参数
        //格式www.baidu.com#a?name=ccc&password=dddd
        getParamsUrl:function(){
            var hashDeatail = location.hash.split("?"),
                //hashName=a
                hashName = hashDeatail[0].split("#")[1],
                //params=["name=ccc","password=dddd"]
                params = hashDeatail[1] ? hashDeatail[1].split("&") : [],//参数内容
                query = {};
            for(var i = 0;i<params.length ; i++){
                var item = params[i].split("=");
                query[item[0]] = item[1]
            }
            //query={name:ccc,password:dddd}
            return     {
                path:hashName,
                query:query
            }
        }
    };
    function spaRouters(){
        /**
         * 保存注册的所有路由，防止用户自己修改path结果去了没有意义的地址
         * {a:function(){}},a和对应的callback
         */
        this.routers = {};
        /**
         * beforeFun=function(op){
         *  //做些事
         *  op.next();//执行回调
         * }
         *
         */
        this.beforeFun = null;
        this.afterFun = null;
    }
    spaRouters.prototype={
        init:function(){
            var self = this;
            //页面加载时匹配路由
            window.addEventListener('load',function(){
                self.urlChange()
            });
            //路由有变化时
            window.addEventListener('hashchange',function(){
                self.urlChange()
            });
            //异步引入js通过回调传递参数
            window.SPA_RESOLVE_INIT = null;
        },
        //作用就是执行路径对应的回调
        refresh:function(currentHash){
            var self = this;
            //如果有执行回调前所要做的函数
            if(self.beforeFun){
                self.beforeFun({
                    to:{
                        path:currentHash.path,
                        query:currentHash.query
                    },
                    next:function(){
                        self.routers[currentHash.path].callback.call(self,currentHash)
                    }
                })
            }else{
                //执行当前路由下对应的回调
                self.routers[currentHash.path].callback.call(self,currentHash)
            }
        },
        //路由处理
        urlChange:function(){
            //得到路由的信息
            var currentHash = util.getParamsUrl();
            //如果在routers中注册了路由(需手动注册)
            //防止用户自己修改path结果去了没有意义的地址
            if(this.routers[currentHash.path]){
                this.refresh(currentHash)
            }else{
                //不存在的地址重定向到首页,#/index
                location.hash = '/index'
            }
        },
        //单层路由注册
        //就是注册在routers里
        map:function(path,callback){
            path = path.replace(/\s*/g,"");//过滤空格
            //有回调并且是个函数
            if(callback && Object.prototype.toString.call(callback) === '[object Function]' ){
                this.routers[path] ={
                    callback:callback,//回调
                    fn:null //存储异步的js文件文件
                }
            }
        },
        //注册beforeFun
        beforeEach:function(callback){
            if(Object.prototype.toString.call(callback) === '[object Function]'){
                this.beforeFun = callback;
            }
        },
        //注册afterFun
        afterEach:function(callback){
            if(Object.prototype.toString.call(callback) === '[object Function]'){
                this.afterFun = callback;
            }
        },
        //路由异步懒加载js文件
        asyncFun:function(file,transition){
            var self = this;
            //如果已经加载过了
            if(self.routers[transition.path].fn){
                self.afterFun && self.afterFun(transition)
                self.routers[transition.path].fn(transition)
            }else{
                //异步下载文件
                var _body= document.getElementsByTagName('body')[0];
                var scriptEle= document.createElement('script');
                scriptEle.type= 'text/javascript';
                scriptEle.src= file;
                scriptEle.async = true;
                SPA_RESOLVE_INIT = null;
                scriptEle.onload= function(){
                    /**
                     * 给新加载的js文件传递参数
                     * 在文件中会有SPA_RESOLVE_INIT=function
                     * 对SPA_RESOLVE_INIT重新赋值
                     * fn包含所有逻辑
                     */
                    self.afterFun && self.afterFun(transition);
                    self.routers[transition.path].fn = SPA_RESOLVE_INIT;
                    self.routers[transition.path].fn(transition);
                };
                _body.appendChild(scriptEle);
            }
        },
        //同步操作
        syncFun:function(callback,transition){
            this.afterFun && this.afterFun(transition)
            callback &&　callback(transition)
        }

    };
    //注册到window全局
    window.spaRouters = new spaRouters();
})();