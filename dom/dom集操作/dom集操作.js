//把dom集变成真正意义上的数组，在ie中直接对元素集执行数组方法slice会报错
function domToArray(dom) {
    var array=[];
    for (var i=0;i<dom.length;i++){
        array.push(dom[i]);
    }
    return array;
}