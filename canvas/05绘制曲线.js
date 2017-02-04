/**
 * 1.开始路径
 * 2.说明样式
 * 3.创建线的路径
 * 4.关闭路径
 * 5.绘制
 *
 * API说明
 *
 * context.arcTo(x1,y1,x2,y2,radiusX[,radiusY,rotation]);
 * x1,y1,x2,y2是起始点和终点的坐标
 * radiusX：横向半径
 * radiusY：纵向半径
 * rotation：顺时针方向旋转角度
 *
 */
function draw(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(150,20);
    //这时起点相对于0,0的坐标为300,120
    context.arcTo(150,100,50,20,30);
    context.stroke();
}




