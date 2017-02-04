/**
 * 追加数据建立在写入文件之上，
 * 写入文件是写整个，追加数据是在尾部添加
 * 使用fileWriter的seek方法，参数是位置
 *
 */
//向文件中追加数据
function addData(){
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            var filename = document.getElementById("FileName").value;
            //创建文件
            fs.root.getFile(filename,
                {create:false},
                function(fileEntry) {
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.onwriteend = function(e) {
                            document.getElementById("result").innerHTML ='向文件中追加数据成功';
                        };
                        fileWriter.onerror = function(e) {
                            document.getElementById("result").innerHTML='向文件中追加数据失败: ';
                        };
                        //指明是追加数据，并指明位置
                        fileWriter.seek(fileWriter.length);
                        var blob = new Blob(['追加的数据']);
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