/**
 * 移动使用的是moveTo方法，使用的方法和copyTo相同
 * 但是使用moveTo后，源文件会被删除
 *
 * 重命名的实现方法为，把文件用moveTo移动，但是移动到相同的目录中
 * 在moveTo中指定新的名称
 */
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
//文件重命名
function renameFile(){
    var folder=document.getElementById("folder").value;
    var oldFileName=document.getElementById("oldFileName").value;
    var newFileName=document.getElementById("newFileName").value;
    //申请磁盘空间
    window.requestFileSystem(window.PERSISTENT, 1024*1024, function(fs) {
        rename(fs.root, folder+'/'+oldFileName,newFileName,folder+'/');
    }, errorHandler);
}
function rename(cwd,oldFileName,newFileName,folder) {
    cwd.getFile(oldFileName, {create:false},
        //获取文件成功时执行的回调函数
        function(fileEntry) {
            cwd.getDirectory(folder, {create:false},
                //获取文件目录成功时执行的回调函数
                function(folder) {
                    //指定新的名称
                    fileEntry.moveTo(folder,newFileName,
                        //文件重命名操作成功时执行的回调函数
                        function() {
                            document.getElementById("result").innerHTML ='修改文件名成功,新文件名：'+newFileName;
                        },
                        //文件重命名操作失败时执行的回调函数
                        errorHandler
                    );
                },
                //获取目录失败时执行的回调函数
                errorHandler);
            //获取文件失败时执行的回调函数
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