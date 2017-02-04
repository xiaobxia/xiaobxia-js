/**
 * 1.开始路径
 * 2.说明样式
 * 3.创建线的路径
 * 4.关闭路径
 * 5.绘制
 *
 * API说明
 *
 * context.setLineDash([5]);
 * 这时代表线的长度和间距都为5
 *
 * context.setLineDash([5,10]);
 * 长度为5，间距为10
 *
 * context.setLineDash([5,10,15,20]);
 * 长度为5，间距为10和长度为15，间距为20的虚线样式交替
 *
 * context.setLineDash([5,10,15]);
 * 奇数个参数，被扩展为context.setLineDash([5,10,15，5,10,15]);
 *
 * context.getLineDash()
 * 得到虚线的数组
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
    context.lineWidth=5;
    context.setLineDash([5]);
    //context.setLineDash([5,10]);
    //context.setLineDash([5,10,15,20]);
    //context.setLineDash([5,10,15]);
    //console.log(context.getLineDash());
    context.moveTo(20,20);
    context.lineTo(200,20);
    context.stroke();
}
