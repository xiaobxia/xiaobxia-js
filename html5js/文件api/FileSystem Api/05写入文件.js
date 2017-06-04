/**
 * 利用FileEntry对象的createWriter方法创建FileWriter对象
 * FileWriter对象
 * write方法 在获取到的文件中写入二进制数据，参数是一个Blob对象
 * event
 * onwriteend 文件操作结束时触发，无论成功或者失败
 * onerror 文件操作失败时触发
 *
 */
//写入文件操作
function createFile(){
    var size = document.getElementById("FileSize").value;
    window.webkitRequestFileSystem(
        PERSISTENT,
        size,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            var filename = document.getElementById("FileName").value;
            //创建文件
            fs.root.getFile(filename,
                {create: true},
                function(fileEntry) {
                    fileEntry.createWriter(function(fileWriter) {
                        //结束时触发，无论成功或者失败
                        fileWriter.onwriteend = function(e) {
                            document.getElementById("result").innerHTML ='写文件操作结束';
                        };
                        //失败时触发
                        fileWriter.onerror = function(e) {
                            document.getElementById("result").innerHTML='写文件操作失败: ';
                        };
                        var blob = new Blob(['测试']);
                        fileWriter.write(blob);
                    }, errorHandler);
                }, errorHandler);
        },
        //请求文件系统失败时所执行的回调函数
        errorHandler
    );
}
function errorHandler(e)
{
    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = '文件系统所使用的存储空间的尺寸超过磁盘限额控制中指定的空间尺寸';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = '未找到文件或目录';
            break;
        case FileError.SECURITY_ERR:
            msg = '操作不当引起安全性错误';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = '对文件或目录所指定的操作不能被执行';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = '指定的状态无效';
    };
    document.getElementById("result").innerHTML = "当前操作引发错误："+msg;
}