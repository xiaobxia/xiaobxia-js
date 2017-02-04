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
    xhr.send(bb);
}