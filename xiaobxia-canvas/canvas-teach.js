/******************
        关于矩形的绘制
 *****************/
function draw(id) {
    //得到canvas元素
    var canvas = document.getElementById(id);
    //如果没有则中断
    if (canvas == null)
        return false;
    //得到上下文
    var context = canvas.getContext('2d');
    //定义填充样式
    context.fillStyle = "#EEEEFF";
    //画填充矩形
    context.fillRect(0, 0, 400, 300);
    context.fillStyle = "red";
    //定义边框样式
    context.strokeStyle = "blue";
    //定义线宽
    context.lineWidth=1;
    context.fillRect(50,50,100,100);
    //画框矩形
    context.strokeRect(50,50,100,100);
    //擦除矩形
    context.clearRect(50,50,100,100);
}
/******************
 圆和椭圆的绘制
 *****************/
function draw2(id)
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
        //开始路径
        context.beginPath();
        //画圆
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        //画椭圆的方法
        context.ellipse(i * 25, i * 25, i * 10,i * 20,30,0, Math.PI * 2,true);
        //关闭路径，如果不关闭路径，那么前面画的会在每个循环中再画一遍
        context.closePath();
        context.fillStyle = 'rgba(255, 0, 0, 0.25)';
        //填充
        context.fill();
        //画框
        context.stroke();
    }
}
/******************
 直线的绘制
 *****************/
function draw3(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.beginPath();
    context.lineWidth="10";
    //定义线帽的样式，参数为[butt,round,square]
    context.lineCap="round";
    //定义转折处的样式，参数为[miter,round,bevel]
    context.lineJoin="round";
    //移动到一个坐标
    context.moveTo(20,20);
    //画一条线到坐标出，同时光标也移动到该处
    context.lineTo(20,200);
    context.lineTo(200,200);
    context.stroke();
}

