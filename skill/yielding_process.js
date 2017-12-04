/**
 * 在处理数组的时候，如果复杂计算，并且无需同步完成，那就可以分割处理
 */
var data = [12,123,1234,453,436,23,23,5,4123,45,346,5634,2234,345,342];
//array是数组，process是函数，context是调用对象
function chunk(array, process, context){
    setTimeout(function(){
        //这里是一个一个进行,可以使用别的数组分割方法，几个几个的进行
        var item = array.shift();
        process.call(context, item);

        if (array.length > 0){
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}

function printValue(item){
    var div = document.getElementById("myDiv");
    div.innerHTML += item + "<br>";
}

chunk(data, printValue);