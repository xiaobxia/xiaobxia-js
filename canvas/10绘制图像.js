/**
 * 绘制图像
 * 1.创建image对象
 * 2.指明src
 * 3.onload事件上画图
 * 4.context.drawImage方法画图
 *
 * API说明
 *
 * context.drawImage(image,x,y)
 *
 * context.drawImage(image,x,y,w,h)
 *
 * context.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
 * 把画布上的image图，截取一部分再画
 * sx,sy,sw,sh，画布上的源位置
 * dx,dy,dw,dh，复制到的位置
 *
 */
function draw(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    image = new Image();
    image.src = "qc.jpg";
    image.onload = function()
    {
        drawImg(context,image);
    };
}
function drawImg(context,image)
{
    for(var i = 0;i < 7;i++)
        context.drawImage(image,0 + i * 50,0 + i * 25,100,100);
}
