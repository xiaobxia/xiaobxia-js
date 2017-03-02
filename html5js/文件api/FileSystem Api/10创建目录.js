/**
 * 使用DirectoryEntry对象来代表一个目录
 * DirectoryEntry对象的属性
 * isFile：true，为文件。false，为目录。
 * isDirectory：true，为目录。false，为文件。
 * name：目录的目录名
 * fullPath：目录的完整路径
 * filesystem：目录所在的文件系统对象
 *
 * 使用DirectoryEntry对象的getDirectory方法方法在一个目录中获取或者创建目录
 * getDirectory方法有4个参数
 * 1.字符串，要创建或是获取的子目录名
 * 2.自定义对象，创建目录时对象的create属性为true，获取目录时对象的create属性为false
 * 3.成功时的回调函数，参数为DirectoryEntry对象
 * 4.失败时的回调函数，参数为FileError对象
 */
//创建目录
function createDirectory(){
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求目录系统成功时所执行的回调函数
        function(fs){
            //创建目录
            var directoryName = document.getElementById("directoryName").value;

            fs.root.getDirectory(
                directoryName,
                { create: true },
                //创建目录成功时所执行的回调函数
                function(dirEntry){
                    var text = "目录完整路径："+dirEntry.fullPath+"<br>";
                    text += "目录名："+dirEntry.name+"<br>";
                    document.getElementById("result").innerHTML = text;
                },
                //创建目录失败时所执行的回调函数
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