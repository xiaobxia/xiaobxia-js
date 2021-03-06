/**
 * 使用DirectoryEntry对象的createReader方法创建DirectoryReader对象
 * var dirReader = fs.root.createReader();
 * DirectoryReader对象的readEntries有两个参数，成功时的回调和失败时的回调
 *
 */
//读取目录
function readDirectory(){
    window.webkitRequestFileSystem(
        PERSISTENT,
        1024,
        //请求文件系统成功时所执行的回调函数
        function(fs){
            //创建DirectoryReader对象
            var dirReader = fs.root.createReader();
            var entries = [];
            //多次调用reader.readEntries方法一直到不再读出目录或文件
            var readEntries = function() {
                dirReader.readEntries (
                    //读取目录成功时执行的回调函数
                    function(results) {
                        //如果不在有目录或文件
                        if (!results.length) {
                            listResults(entries.sort());
                        }
                        else {
                            entries = entries.concat(toArray(results));
                            readEntries();
                        }
                    },
                    //读取目录失败时执行的回调函数
                    errorHandler
                );
            };
            readEntries(); // 开始读取目录.
        },
        //请求文件系统失败时所执行的回调函数
        errorHandler
    );
}
function listResults(entries) {
    var type;
    entries.forEach(function(entry, i) {
        if(entry.isFile)
            type="文件："+entry.name;
        else
            type="目录："+entry.name;
        document.getElementById("result").innerHTML+=type+"<br/>";
    });
}
function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
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