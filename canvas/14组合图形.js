/**
 * canvas中默认一个图画在另一个图上面，看见部分按绘制顺序
 *
 * context.globalCompositeOperation 用以说明组合方式
 */
function draw(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var oprtns = [
        //新图显示重叠部分，其他透明，原图显示未重叠部分，其他透明
        "source-atop",
        //做in运算，只显示新图中与原图重叠部分，其他部分透明
        "source-in",
        //做out运算，只显示新图中与原图不重叠部分，其他部分透明
        "source-out",
        //新图覆盖旧图上
        "source-over",
        //原图显示重叠部分，其他透明，新图显示未重叠部分，其他透明
        "destination-atop",
        //做in运算，只显示中原图与新图重叠部分，其他部分透明
        "destination-in",
        //做out运算，只显示原图中与新图不重叠部分，其他部分透明
        "destination-out",
        //新图在旧图下
        "destination-over",
        //重叠部分做加色处理
        "lighter",
        //只绘制新图，原图中未与新图重叠部分变透明
        "copy",
        //绘制不重叠部分，重叠部分变透明
        "xor"
    ];
    i=8;    //读者可自行修改该参数来显示想要查看的组合效果
    //绘制原有图形（蓝色长方形）
    context.fillStyle = "blue";
    context.fillRect(10, 10, 60, 60);
    /*设置组合方式，从组合的参数数组中挑选组合方式，此处因为i是8，
     所以选择oprtns数组中第9(数组从0开始计算）个组合方式lighter*/
    context.globalCompositeOperation = oprtns[i];
    //设置新图形（红色圆形）
    context.beginPath();
    context.fillStyle = "red";
    context.arc(60, 60, 30, 0, Math.PI*2, false);
    context.fill();
}
