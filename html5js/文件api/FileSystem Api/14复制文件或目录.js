/**
 * 使用DirectoryEntry对象或是FileEntry对象的copyTo方法将目录中的文件或子目录复制到另一个目录中
 * copyTo方法有4个参数
 * 1.一个DirectoryEntry对象，用于指明复制到那目录
 * 2.可选，字符串，指定复制后这个东西叫什么名字
 * 3.可选，成功时的回调
 * 4.可选，失败后的回调
 *
 * 例子中文件的复制过程
 * 1.申请磁盘空间，因为复制过来需要空间
 * 2.获取要被复制的文件
 * 3.在获取文件成功的回调中，获取复制到的目录
 * 4.在获取目录的回调中使用copyTo方法
 */
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
//复制文件
function copyFile(){
    var src=document.getElementById("src").value;
    var dest=document.getElementById("dest").value;
    var fileName=document.getElementById("fileName").value;
    //申请磁盘空间
    window.requestFileSystem(window.PERSISTENT, 1024*1024, function(fs) {
        copy(fs.root, src+'/'+fileName, dest+'/');
    }, errorHandler);
}
function copy(cwd, src, dest) {
    cwd.getFile(src, {create:false},
        //获取被复制文件成功时执行的回调函数
        function(fileEntry) {
            cwd.getDirectory(dest, {create:false},
                //获取复制目标目录成功时执行的回调函数
                function(dirEntry) {
                    fileEntry.copyTo(dirEntry,fileEntry.name,
                        //复制文件操作成功时执行的回调函数
                        function() {
                            document.getElementById("result").innerHTML ='文件复制成功';
                        },
                        //复制文件操作失败时执行的回调函数
                        errorHandler
                    );
                },
                //获取复制目标目录失败时执行的回调函数
                errorHandler);
            //获取被复制文件失败时执行的回调函数
        }, errorHandler);
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