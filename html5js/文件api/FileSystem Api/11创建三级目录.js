/**
 * 递归地创建
 */
var path = '_test_page/test1/test2';
//创建目录
function createDirectory(rootDirEntry, folders){
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            //使用递归函数创建每一级子目录
            createDir(fs.root, path.split('/'));
        },
        //请求文件系统失败时所执行的回调函数
        errorHandler
    );
}
//创建目录时使用的递归函数
function createDir(rootDirEntry, folders){
    //将“/foo/.//bar”之类的目录名中的'./' or '/'文字剔除
    if (folders[0] == '.' || folders[0] == '') {
        folders = folders.slice(1);
    }
    rootDirEntry.getDirectory(folders[0], {create: true},
        //创建目录成功时所执行的回调函数
        function(dirEntry) {
            //如果之后还有路径就在它后面创建
            if (folders.length) {
                document.getElementById("result").innerHTML += dirEntry.name+"目录已创建<br/>";
                //调用递归函数创建该目录下的子目录
                createDir(dirEntry, folders.slice(1));
            }
        },
        //创建目录失败时所执行的回调函数
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