/**
 * 步骤
 * 1.开始路径
 * 2.创建图形路径
 * 3.关闭路径
 * 4.设定样式
 * 5.绘制
 *
 * 为什么要关闭路径？
 * 如果不关闭路径，之前的路径会被重新再画
 *
 * API说明
 *
 * 开始路径
 * context.beginPath();
 *
 * 创建圆
 * context.arc(x,y, radius, startAngle, endAngle, anticlockwise);
 * radius：半径，startAngle：起始角，endAngle：结束角，anticlockwise：是否逆时针
 * 例子context.arc(100, 200, 10, 0, Math.PI * 2, true);
 *
 * 关闭路径
 * context.closePath();
 *
 * 绘制
 * 填充时是圆，画边框时是圆环
 * context.fill();
 * context.stroke();
 *
 * 创建椭圆
 * context.ellipse(x,y, radius, startAngle, endAngle, anticlockwise);
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
    var n = 0;
    for(var i = 0; i < 10; i++)
    {
        context.beginPath();
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        //context.ellipse(i * 25, i * 25, i * 10,i * 20,30,0, Math.PI * 2,true);
        context.closePath();
        context.fillStyle = 'rgba(255, 0, 0, 0.25)';
        context.fill();
    }
}
