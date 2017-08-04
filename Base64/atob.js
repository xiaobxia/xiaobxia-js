/**
 * 把调用canvas的toDataURL方法把canvas保存为base64编码的字符串
 * 把base64编码转换为二进制，然后发送给服务器
 */
var canvas;
function draw(id)
{
    canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    context.fillStyle = "rgb(0, 0, 255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgb(255, 255, 0)";
    context.fillRect(10, 20, 50, 50);
}
function imgSave(){
    var data=canvas.toDataURL("image/jpeg");
    data=data.replace("data:image/jpeg;base64,","");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "uploadImage.php");
    xhr.sendAsBinary(window.atob(data));
}