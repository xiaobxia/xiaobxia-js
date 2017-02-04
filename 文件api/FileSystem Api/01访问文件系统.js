//浏览器兼容
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;
//如果存在当前api
if(window.requestFileSystem)
    initFS();
/**
 * requestFileSystem方法参数
 * type：window.TEMPORARY 临时存储空间，可以被浏览器自行删除
 *      window.PERSISTENT 永久存储空间，不能被浏览器自行删除，只能通过用户或引用程序删除
 * size：指定所使用的文件存储空间大小
 * successCallback：指定成功后所执行的回调函数，参数为FileSystem对象
 * opt_errorCallback：指定错误后所执行的回调函数，参数为FileSystem对象
 */
function initFS() {
    //1024*1024代表1m
    window.requestFileSystem(window.TEMPORARY, 1024*1024,
        function(filesystem) {
            fs = filesystem;
        }, errorHandler);
}
function errorHandler(e) {
    var msg = '';
    //错误码所对应的名称
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
    }
    document.getElementById("result").innerHTML = '当前操作引发错误:' + msg;
}