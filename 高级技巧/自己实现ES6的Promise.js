function Promise(fn) {
    this.resolved=false;
    this.rejected=false;
    if(typeof fn=="function"){
        fn.apply(this,[this.resolve,this.reject]);
    }else if(fn instanceof Promise){
        return fn;
    }else {
        this.data=fn;
    }
}
Promise.prototype={
    //then函数要返回新实例，以链式调用
    //当success中返回的是Promise实例
    then:function (success,_fail) {
        if(this.resolved){
            return new Promise(success(this.data));
        }
        if(_fail&&this.rejected){
            _fail(this.err);
        }

    },
    resolve:function (data) {
        this.resolved=true;
        /*TODO
            如果data是个Promise实例，把this指向这个实例
         */
        this.data=data;
    },
    reject:function (err) {
        this.rejected=true;
        this.err=err;
    }
};
