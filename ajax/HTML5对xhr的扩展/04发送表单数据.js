/**
 * 使用formData对象
 * 如果追加数据，可以使用append来追加数据
 * 然后send这个formData对象
 */
function sendForm() {
    var form=document.getElementById("form1");
    var formData = new FormData(form);
    formData.append('add_data', '测试'); //在发送之前添加附加数据

    var xhr = new XMLHttpRequest();
    xhr.open('POST','test.php',true);
    xhr.onload = function(e) {
        if (this.status == 200) {
            document.getElementById("result").innerHTML=this.response;
        }
    };
    xhr.send(formData);
}