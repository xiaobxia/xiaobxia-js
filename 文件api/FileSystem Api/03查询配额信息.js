//查询磁盘配额信息
function queryQuota(){
    /**
     * 使用window.webkitStorageInfo.queryUsageAndQuota方法
     * type：TEMPORARY 临时，查询临时保存
     *      PERSISTENT 永久，查询永久数据
     * successCallback：成功时的回调函数，1参数为指定的已用空间尺寸，2参数为指定的全部空间尺寸
     * errorCallback：失败时的回调函数，参数为FileError对象
     *
     */
    window.webkitStorageInfo.queryUsageAndQuota(PERSISTENT,
        //查询磁盘配额信息成功时执行的回调函数
        function(usage,quota){
            var text="查询磁盘配额信息成功<br>已用磁盘空间:"
            var strBytes,intBytes;
            if(usage>=1024*1024*1024){
                intBytes=Math.floor(usage/(1024*1024*1024));
                text+=intBytes+"GB ";
                usage=usage%(1024*1024*1024);
            }
            if(usage>=1024*1024){
                intBytes=Math.floor(usage/1024*1024);
                text+=intBytes+"MB ";
                usage=usage%1024*1024;
            }
            if(usage>=1024){
                intBytes=Math.floor(usage/1024);
                text+=intBytes+"KB ";
                usage=usage%1024;
            }
            text+=usage+"Bytes";
            text+="<br>磁盘配额的总空间：";
            if(quota>=1024*1024*1024){
                intBytes=Math.floor(quota/(1024*1024*1024));
                text+=intBytes+"GB ";
                quota=quota%(1024*1024*1024);
            }
            if(quota>=1024*1024){
                intBytes=Math.floor(quota/(1024*1024));
                text+=intBytes+"MB ";
                quota=quota%(1024*1024);
            }
            if(quota>=1024){
                intBytes=Math.floor(quota/1024);
                text+=intBytes+"KB ";
                quota=quota%1024;
            }
            text+=quota+"Bytes";
            document.getElementById("result").innerHTML = text;
        },
        //申请磁盘配额失败时执行的回调函数
        errorHandler);
}
function errorHandler(e) {
    var msg = '';
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
    document.getElementById("result").innerHTML = '当前操作引发错误:' + msg;
}