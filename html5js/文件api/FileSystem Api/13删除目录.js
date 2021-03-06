
//删除目录
function deleteDirectory(){
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            //获取目录
            var directoryName = document.getElementById("directoyName").value;
            fs.root.getDirectory(
                directoryName,
                { create: false },
                //获取目录成功时所执行的回调函数
                function(dirEntry){
                    dirEntry.removeRecursively(
                        //删除目录成功时所执行的回调函数
                        function() {
                            document.getElementById("result").innerHTML =dirEntry.name+'目录被删除';
                        },
                        //删除目录失败时所执行的回调函数
                        errorHandler
                    );
                },
                //获取目录失败时所执行的回调函数
                errorHandler
            );
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