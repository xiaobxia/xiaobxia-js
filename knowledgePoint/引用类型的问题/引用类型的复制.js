var obj1={};
var obj2=obj1;
obj1.name="a";
alert(obj2.name);//"a"
//这里说明obj1和obj2都引用了同一个对象
var a=[1,2,3];
var b=a;
b[0]=2;
alert(a===b);//true
//对于数组也是

//所以如果要复制出一个独立的引用类型就要历遍它
function copyArray(array) {
    var source=array,
        len=source.length,
        result=[];
    for (var i=0;i<len;i++){
        result[i]=source[i];
    }
    return result;
}
//对象的复制可以参照深复制
