/**
 * FileEntry对象表示受到沙盒保护的文件系统中的每一个文件
 * 访问文件系统时，得到的FileSystem对象中的root属性是一个DirectoryEntry对象，代表文件系统的根目录对象
 * DirectoryEntry对象的getFile方法用于在一个目录中创建或获取文件
 * 4个参数
 * 1.字符串，创建或获取的文件名
 * 2.自定义对象，创建文件时对象的create属性为true，获取时对象的create属性为false
 * 创建文件时如果文件已存在，则覆盖原文件。如果文件被其他方式打开，则抛出错误
 * 3.成功的回调函数，参数为FileEntry对象
 * 4.错误的回调函数，参数为FileError对象
 *
 * FileEntry对象的属性
 * isFile：true，为文件。false，为目录。
 * isDirectory：true，为目录。false，为文件。
 * name：文件名，包括扩展名。
 * fullPath：文件的完整路径
 * filesystem：文件所在的文件系统对象
 */
//创建文件
function createFile(){
    var size = document.getElementById("FileSize").value;
    window.webkitRequestFileSystem(
        PERSISTENT,
        size,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            //创建文件
            var filename = document.getElementById("FileName").value;
            fs.root.getFile(
                filename,
                { create: true },
                //创建文件成功时所执行的回调函数
                function(fileEntry){
                    var text = "文件完整路径："+fileEntry.fullPath+"<br>";
                    text += "文件名："+fileEntry.name+"<br>";
                    document.getElementById("result").innerHTML = text;
                },
                //创建文件失败时所执行的回调函数
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