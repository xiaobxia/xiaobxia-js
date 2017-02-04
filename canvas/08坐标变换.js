/**
 * 坐标变换变换的是上下文的坐标
 *
 * API说明
 *
 * context.translate(25,25);
 * 平移
 *
 * context.scale(0.95,0.95);
 * 放大
 *
 * context.rotate(Math.PI / 10);
 * 旋转，正数为顺时针，负数为逆时针
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
    // 图形绘制
    context.translate(200,50);
    context.fillStyle = 'rgba(255,0,0,0.25)';
    for(var i = 0;i < 50;i++)
    {
        context.translate(25,25);
        context.scale(0.95,0.95);
        context.rotate(Math.PI / 10);
        context.fillRect(0,0,100,50);
    }
}
