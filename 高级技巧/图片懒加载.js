/*<img class="lazy" src="img/grey.gif" data-original="img/example.jpg" width="765" height="574">
兼容没有javascript的情况
 <noscript><img src="img/example.jpg" width="765" height="574"></noscript>*/
var throttle=function () {
    var isClear=arguments[0],fn;
    if(typeof  isClear ==="boolean"){
        fn=arguments[1];
        fn._throttleID&&clearTimeout(fn._throttleID);
    }else {
        fn=isClear;
        param=arguments[1];
        var p =extend({context:null,args:[],time:300},param);
        arguments.callee(true,fn);
        fn._throttleID=setTimeout(function () {
            fn.apply(p.context,p.args)
        },p.time)
    }
};
function LazyLoad(id) {
    //得到容器
    this.container = document.getElementById(id);
    //得到img元素集合
    this.imgs = this.getImgs();
    //初始化
    this.init();
}
LazyLoad.prototype = {
    init: function () {
        //先扫描一遍看是否有需要显示的
        this.update();
        this.bindEvent();
    },
    //得到容器下的img元素并返回
    getImgs: function () {
        var arr=[];
        var imgs=this.container.getElementsByTagName("img");
        for(var i=0,len=imgs.length;i<len;i++){
            arr.push(imgs[i]);
        }
        return arr;
    },
    update: function () {
        //如果没有img就返回
        if(!this.imgs.length){
            return;
        }
        var i=this.imgs.length;
        //遍历imgs元素指定src
        for(--i;i>=0;i--){
            //判断如果在框内
            if(this.shouldShow(i)){
                this.imgs[i].src=this.imgs[i].getAttribute("data-src");
                this.imgs.splice(i,1);
            }
        }
    },
    //判断img是否在视框内
    shouldShow: function (i) {
        var img = this.imgs[i],
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            scrollBottom = scrollTop + document.documentElement.clientHeight,
            imgTop = this.pageY(img),
            imgBottom = imgTop + img.offsetHeight;
        return (imgBottom > scrollTop && imgBottom < scrollBottom || (imgTop > scrollTop && imgTop < scrollBottom));
    },
    //返回元素在页面的位置
    pageY: function (element) {
        if(element.offsetParent()){
            return element.offsetTop+this.pageY(element.offsetParent);
        }else {
            return element.offsetTop;
        }
    },
    //事件绑定
    on:  function (elem, eventName, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(eventName, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + eventName, handler);
        }
    },
    //事件监听
    bindEvent:function () {
        var that=this;
        this.on(window,"resize",function () {
            throttle(that.update,{context: that});
        });
        this.on(window,"scroll",function () {
            throttle(that.update,{context: that});
            }
        );
    }
};