var Waiter = function () {
    var dfd = [],
        doneArr = [],
        failArr = [],
        slice = Array.prototype.slice,
        that = this;

    //Promise对象
    var Promise = function () {
        //Promise对象实例的自身的状态
        this.resolved = false;
        this.rejected = false;
    };
    Promise.prototype = {
        //解决了问题
        resolve: function () {
            //Promise对象实例的状态修改为解决
            this.resolved = true;
            //dfd数组中存放了所有Promise实例
            if (!dfd.length) {
                return;
            }
            //如果有Promise实例还没被改状态，或是拒绝，就不执行成功时的函数
            for (var i = dfd.length - 1; i >= 0; i--) {
                if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
                    return;
                }
                //被解决的就清除
                dfd.splice(i, 1);
            }
            //执行函数
            _exec(doneArr);
        },
        //被拒接
        reject: function () {
            //修改当前Promise的状态
            this.rejected = true;
            if (!dfd.length) {
                return;
            }
            dfd.splice(0);
            //只要有一个被拒绝就执行失败时的函数
            _exec(failArr);

        }
    };
    //用于返回Promise实例
    that.Deferred = function () {
        return new Promise();
    };
    //执行函数，执行数组中存放的函数
    function _exec(arr) {
        var i = 0,
            len = arr.length;
        for (; i < len; i++) {
            try {
                arr[i] && arr[i]();
            } catch (e) {
            }
        }
    }
    //得到Promise实例，筛选后
    that.when = function () {
        //dfd中存放Promise实例
        dfd=slice.call(arguments);
        var i=dfd.length;
        //因为是传进来的，所以要遍历，清理一下
        for (--i;i>=0;i--){
            /*除去
             * 1.空的
             * 2.已经被执行设定过状态的异步函数(resoled,rejected)状态
             * 3.并不是Promise实例的
             */
            if(!dfd[i]||dfd[i].resolved||dfd[i].rejected||!dfd[i] instanceof Promise){
                dfd.splice(i,1);
            }
        }
        //链式调用
        return that;
    };
    //得到所有承诺完成后索要执行的函数
    that.done = function () {
        doneArr=doneArr.concat(slice.call(arguments));
        return that;
    };
    //得到承诺有失败后的索要执行的函数
    that.fail = function () {
        failArr=failArr.concat(slice.call(arguments));
        return that;
    }
};
//创建Waiter实例
var waiter=new Waiter();
//first是自调用的，所以返回的其实是Promise实例
var first=function () {
    //Deferred函数用于返回一个Promise实例
    var dtd =waiter.Deferred();
    setTimeout(function () {
        console.log("first finish");
        dtd.resolve();
    },5000);
    return dtd;
}();
var second=function () {
    var dtd =waiter.Deferred();
    setTimeout(function () {
        console.log("second finish");
        dtd.resolve();
    },10000);
    return dtd;
}();
//when函数得到Promise实例，done函数，成功后执行的函数
//执行完when的时候first和second都还没改为被解决的状态
//done中的函数由改状态的函数中执行
waiter.when(first,second).done(function () {
    console.log("success");
},function () {
    console.log("success again");
});