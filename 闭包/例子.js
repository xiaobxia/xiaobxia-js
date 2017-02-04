/**
 * 在这里result得到f2。
 * 因为result是全局变量，所以不会被回收，所以fn2一直存在。
 * 因为f2依赖于f1，所以f1也一直在。
 * nAdd是全局的，自身也是闭包。
 **/
function f1(){
    var n=999;
    nAdd=function(){n+=1};
    function f2(){
        alert(n);
    }
    return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000

for(var i = 0, file; file = files[i]; ++i){
    //因为闭包的关系
    (function(f) {
        fs.root.getFile(file.name, {create: true}, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                    document.getElementById("result").innerHTML+='复制文件名为：'+f.name+'<br/>';
                };
                fileWriter.onerror = errorHandler
                fileWriter.write(f);
            }, errorHandler);
        }, errorHandler);
    })(file);
}