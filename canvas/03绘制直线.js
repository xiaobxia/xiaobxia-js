/**
 * 1.开始路径
 * 2.说明样式
 * 3.创建线的路径
 * 4.关闭路径
 * 5.绘制
 *
 * API说明
 *
 * moveTo(x,y);
 * 光标移动到x,y处
 *
 * lineTo(x,y);
 * 创建一条从光标处到x,y处的线，同时光标移动到x,y处
 *
 * context.lineCap="round";
 * 添加线帽
 * butt:默认值，不添加线帽
 * round：为直线添加圆形线帽
 * square：为直线添加正方形线帽
 *
 * context.lineJoin="round";
 * 交汇的拐角形状
 * miter：默认值，创建尖角拐角
 * round：创建圆角拐角
 * bevel：创建斜角拐角
 *
 *
 *
 */
function draw(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.beginPath();
    context.lineWidth=10;

    context.lineCap="round";
    context.lineJoin="round";
    context.moveTo(20,20);
    context.lineTo(20,200);
    context.stroke();
}


