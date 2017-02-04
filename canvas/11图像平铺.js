/**
 * context.createPattern(image,'repeat')
 *
 * no-repeat:不平铺
 * repeat-x:横向平铺
 * repeat-y:纵向平铺
 * repeat:全方向平铺
 */
function draw(id)
{
    var image = new Image();
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    image.src = "qc2.jpg";
    image.onload = function()
    {
        //创建填充样式，全方向平铺
        var ptrn = context.createPattern(image,'repeat');
        //指定填充样式
        context.fillStyle = ptrn;
        //填充画布
        context.fillRect(0,0,400,300);
    };
}
