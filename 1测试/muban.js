function unique5(array){
    var r = [];
    //[1,2,3,1,2]
    //先取1对比，发现有相同，这时就拿2对比后面，发现也有相同，然后拿3对比，发现没有相同，所以添加3
    //这时i为2（数字3的索引），因为3前面的要么是已经被添加的，要么是后面还会出现的
    for(var i = 0, l = array.length; i < l; i++) {
        for(var j = i + 1; j < l; j++){
            if (array[i] === array[j]) {
                j = ++i;
            }
        }
        r.push(array[i]);
    }
    return r;
}
var a=[1,2,1,3,1,1,2,3];
alert(unique5(a));