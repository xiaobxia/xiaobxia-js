/**
 * 1.取得canvas的dom
 * 2.取得上下文
 * 3.设定样式
 * fillStyle：填充的样式
 * strokeStyle：边框的样式
 * 4.lineWidth：指定线宽
 * 5.绘制
 * context.fillRect(x,y,width,height);
 * context.strokeRect(x,y,width,height);
 * 6.擦除
 * context.clearRect(x,y,width,height);
 */
function draw(id) {
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    context.fillStyle = "red";
    context.strokeStyle = "blue";
    context.lineWidth=1;
    context.fillRect(50,50,100,100);
    context.strokeRect(50,50,100,100);
}
