/**
 * 配合FileRender对象
 * 获取文件通过FileEntry对象的file方法
 * 参数为成功的回调函数和失败的回调函数
 * 再使用FileReader对象读取
 */
//读取文件
function readFile(){
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            var filename = document.getElementById("FileName").value;
            //获取文件对象
            fs.root.getFile(filename,
                {create:false},
                //获取文件对象成功时所执行的回调函数
                function(fileEntry) {
                    //获取文件
                    fileEntry.file(
                        //获取文件成功时所执行的回调函数
                        function(file) {
                            var reader = new FileReader();
                            //并没有指明以什么方式读取
                            reader.onloadend = function(e) {
                                var txtArea = document.createElement('textarea');
                                txtArea.value = this.result;
                                document.body.appendChild(txtArea);
                            };
                            reader.readAsText(file);
                        },
                        //获取文件失败时所执行的回调函数
                        errorHandler
                    );
                },
                //获取文件对象失败时所执行的回调函数
                errorHandler);
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