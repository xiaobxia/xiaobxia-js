/**
 * 复制文件其实就是写入文件
 * 使用fileWrite.write(file)
 * 配合input控件，获取文件
 * file继承自Blob对象
 *
 * 过程
 * 从外部得到，再写入文件系统
 */
//复制磁盘中的文件
function myfile_onchange(){
    var files=document.getElementById("myfile").files;
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求文件系统成功时所执行的回调函数
        function(fs){
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