/**
 * 步骤
 * 1.创建新对象
 * var path=new Path2D();
 * 2.创建图像路径
 * path.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
 * 3.关闭路径
 * path.closePath();
 * 4.说明样式
 * context.fillStyle = 'rgba(255, 0, 0, 0.25)';
 * 5.绘制
 * context.fill(path);
 * 参数里说明路径
 *
 * 绘制的API
 *
 * path1.addPath(path2)
 * 把一个路径添加到另一个路径上
 *
 * moveTo(x,y);
 *
 * lineTo(x,y);
 *
 * rect(x,u,w,h);
 *
 * arc(x,y, radius, startAngle, endAngle, anticlockwise)
 *
 * ellipse(x,y, radius, startAngle, endAngle, anticlockwise)
 *
 * arcTo(x1,y1,x2,y2,radiusX[,radiusY,rotation])
 *
 * bezierCurveTo(cx1,cy1,cx2,cy2,x,y)
 * cx1,cy1,cx2,cy2为第一控制点，第二控制点的坐标
 * x,y为终点坐标
 *
 * quadraticCurveTo(cx,cy,x,y)
 * cx,cy为控制点坐标
 * x,y为终点坐标
 *
 * closePath()
 */
function draw(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    for(var i = 0; i < 10; i++)
    {
        var path=new Path2D();
        path.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        path.closePath();
        context.fillStyle = 'rgba(255, 0, 0, 0.25)';
        context.fill(path);
    }
}


