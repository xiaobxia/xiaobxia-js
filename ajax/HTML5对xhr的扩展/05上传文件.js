/**
 * 发送文件是通过formData对象进行发送
 * 也可以使用Blob对象发送，所有file对象都是一个Blob对象
 * 在form的dom上设置enctype属性：<form id="form1" enctype="multipart/form-data">
 *
 */
function uploadFile() {
    var formData = new FormData();
    var files=document.getElementById("file1").files;
    for (var i = 0;i<files.length;i++) {
        var file=files[i];
        //添加在追加数据中
        formData.append('myfile[]', file);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST','test.php', true);
    xhr.onload = function(e) {
        if (this.status == 200) {
            document.getElementById("result").innerHTML=this.response;
        }
    };
    xhr.send(formData);
}