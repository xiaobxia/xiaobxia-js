//申请磁盘配额
function getQuota(){
    //得到input用于填写需要的磁盘配额
    var size = document.getElementById("capacity").value;
    /**
     * 申请磁盘配额的函数
     * type：TEMPORARY 临时，在磁盘空间不足时会删除数据
     *      PERSISTENT 永久
     * size：申请的磁盘大小
     * successCallback：成功时的回调函数，参数是申请成功的磁盘大小
     * errorCallback：失败时的回调函数，参数FileError对象，保存错误信息
     *
     */
    window.webkitStorageInfo.requestQuota(PERSISTENT,size,
        //申请磁盘配额成功时执行的回调函数
        function(grantedBytes){
            //把申请到的大小变为特定格式
            var text="申请磁盘配额成功<br>磁盘配额尺寸:"
            var strBytes,intBytes;
            //1G
            if(grantedBytes>=1024*1024*1024){
                intBytes=Math.floor(grantedBytes/(1024*1024*1024));
                text+=intBytes+"GB ";
                grantedBytes=grantedBytes%(1024*1024*1024);
            }
            //1M
            if(grantedBytes>=1024*1024){
                intBytes=Math.floor(grantedBytes/(1024*1024));
                text+=intBytes+"MB ";
                grantedBytes=grantedBytes%(1024*1024);
            }
            //1K
            if(grantedBytes>=1024){
                intBytes=Math.floor(grantedBytes/1024);
                text+=intBytes+"KB ";
                grantedBytes=grantedBytes%1024;
            }
            //1b
            text+=grantedBytes+"Bytes";
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
            msg = '对文件或目录所指定的修改处理不能被执行';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = '指定的状态无效';
    };
    document.getElementById("result").innerHTML = '当前操作引发错误:' + msg;
}