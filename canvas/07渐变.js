/**
 * 1.声明一个渐变
 * 2.说明渐变的样子
 * 3.赋值给context.fillStyle
 *
 * API说明
 * context.createLinearGradient(x,y,xe,ye)
 * 起始点和终点的坐标
 *
 * g1.addColorStop(0,'rgb(255,255,0)');
 * 说明样式，0为起始处，1为终点处
 *
 * context.createRadialGradient(xs,ys,rs,xe,ye,re);
 * 说明径向渐变
 * 起始处和终点处的坐标和半径
 *
 */
function draw(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var g1 = context.createLinearGradient(0,0,0,300);
    g1.addColorStop(0,'rgb(255,255,0)');
    g1.addColorStop(1,'rgb(0,255,255)');
    context.fillStyle = g1;
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    var g2 = context.createLinearGradient(0,0,300,0);
    g2.addColorStop(0,'rgba(0,0,255,0.5)');
    g2.addColorStop(1,'rgba(255,0,0,0.5)');
    for(var i = 0; i < 10; i++)
    {
        context.beginPath();
        context.fillStyle = g2;
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
}