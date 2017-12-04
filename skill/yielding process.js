/*
该技巧为了不阻塞代码，把大量的处理分成一部分一部分处理
例如循环，把循环分成一块一块得进行，用setTimeout，不阻塞代码
条件：这个处理无需同步完成，数据无需按顺序完成，改动前的代码运行需要花50ms以上完成
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