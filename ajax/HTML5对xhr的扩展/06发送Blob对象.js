/**
 * 复制页面时使用了document.documentElement.outerHTML方法
 *
 */
window.URL = window.URL || window.webkitURL;
//复制当前页面
function uploadDocument(){
    //得到页面的Blob对象
    var bb= new Blob([document.documentElement.outerHTML]);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'test.php?fileName='+getFileName(), true);
    var progressBar = document.getElementById('progress');
    //进度条的用法
    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            progressBar.value = (e.loaded / e.total) * 100;
            document.getElementById("result").innerHTML = '已完成进度：'+progressBar.value+'%';
        }
    };
    //发送
    xhr.send(bb);
}
//获取当前页面文件的文件名
function  getFileName(){
    var   url=window.location.href;
    var   pos=url.lastIndexOf("\\");
    if   (pos==-1)     //pos==-1表示为本地文件
        pos=url.lastIndexOf("/");   //本地文件路径分割符为"/"
    var   fileName=url.substring(pos+1);   //从url中获得文件名
    return fileName;
}