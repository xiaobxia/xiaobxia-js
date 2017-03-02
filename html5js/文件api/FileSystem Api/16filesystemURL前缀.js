/**
 * 这种URL是给src或href使用的
 * "filesystem:http//"+应用域名+"temporary"或是"persistent"+文件名格式
 * 例子 filesystem:http//localhost/persistent/test.jpg
 * window.resolveLocalFileSystemURL方法可以通过这种URL得到FileEntry对象
 *
 * 这种URL也可以通过FileEntry对象的toURL方法得到
 *
 * 
 */
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
var fileSystemURL;
//创建图片
function createImg(){
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            var filename =document.getElementById("fileName").value;
            //获取文件对象
            fs.root.getFile(filename,
                {create:false},
                //获取文件成功时所执行的回调函数
                function(fileEntry) {
                    var img = document.createElement('img');
                    //在img的src中指定路径
                    fileSystemURL=fileEntry.toURL();
                    img.src = fileSystemURL;
                    document.getElementById("form1").appendChild(img);
                    document.getElementById("btnGetFile").disabled=false;
                },
                //获取文件失败时所执行的回调函数
                errorHandler);
        },
        //请求文件系统失败时所执行的回调函数
        errorHandler
    );
}
function getFile(){
    window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL ||window.webkitResolveLocalFileSystemURL;
    window.resolveLocalFileSystemURL(fileSystemURL,
        //获取文件对象成功时执行的回调函数
        function(fileEntry) {
            document.getElementById("result").innerHTML="文件名为:"+fileEntry.name;
        },
        //获取文件对象失败时执行的回调函数
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