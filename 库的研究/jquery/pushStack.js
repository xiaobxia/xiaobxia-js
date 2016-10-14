jQuery.fn = jQuery.prototype = {
    //入栈
    pushStack: function (elems) {
        //和end配合使用
        //在这里this.constructor可能是个数字为属性的对象，所以能当数组合并
        var ret = jQuery.merge(this.constructor(), elems);

        //给这个对象保存this指向，用于在使用end()的时候返回
        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;
        ret.context = this.context;

        // Return the newly-formed element set
        return ret;
    },
    //将匹配的元素列表变为前一次的状态，得到上一次的this的指向
    //如$("p").find("span").end()，选取所有的p元素，查找并选取span子元素，然后再回过来选取p元素
    end: function () {
        return this.prevObject || this.constructor();
    }
};