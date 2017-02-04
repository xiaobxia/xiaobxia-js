
function sendText() {
    var txt=document.getElementById("text1").value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'test.php', true);
    //也起到了说明数据的作用
    xhr.responseType = 'text';
    xhr.onload = function(e) {
        if (this.status == 200) {
            document.getElementById("result").innerHTML=this.response;
        }
    };
    //用txt发数据
    xhr.send(txt);
}