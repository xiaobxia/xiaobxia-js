/**
 * FileReader对象的作用主要是把文件读入内存，并读取文件中的数据
 * 可以用来读取并显示
 *
 * 方法
 * 除了abort不需要参数，其他方法的参数都为Blob对象或是file对象
 * readAsArrayBuffer()  读取为ArrayBuffer对象
 * readAsBinaryString()  读取为二进制字符串
 * readAsText()  读取为文本数据  可以有第二个参数规定编码方式
 * readAsDataURL()  读取为DataURL
 * abort()  中断读取操作
 *
 * 事件
 * onabort 读取中断时触发
 * onerror 读取出错时触发
 * onloadstart  读取开始时触发
 * onprogess 读取中
 * onload 读取成功时触发
 * onloadend 读取完成时触发，无论是否成功
 */
//创建FileReader对象
var reader=new FileReader();

//将文件以Data URL形式进行读入页面
function readAsDataURL()
{
    //检查是否为图像文件
    var file = document.getElementById("file").files[0];
    if(!/image\/\w+/.test(file.type))
    {
        alert("请确保文件为图像类型");
        return false;
    }
    var reader = new FileReader();
    //将文件以Data URL形式进行读入页面
    reader.readAsDataURL(file);
    reader.onload = function(e)
    {
        var result=document.getElementById("result");
        //在页面上显示文件
        result.innerHTML = '<img src="'+this.result+'" alt=""/>'
    }
}
//将文件以二进制形式进行读入页面
function readAsBinaryString()
{
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    //将文件以二进制形式进行读入页面
    reader.readAsBinaryString(file);
    reader.onload = function(f)
    {
        var result=document.getElementById("result");
        //在页面上显示二进制数据
        result.innerHTML=this.result;
    }
}
//将文件以文本形式进行读入页面
function readAsText()
{
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    //将文件以文本形式进行读入页面
    reader.readAsText(file);
    reader.onload = function(f)
    {
        var result=document.getElementById("result");
        //在页面上显示读入文本
        result.innerHTML=this.result;
    }
}
//readAsArrayBuffer的使用示例
function file_onchange()
{
    var file=document.getElementById("file").files[0];
    if(!/image\/\w+/.test(file.type))
    {
        alert("请选择一个图像文件！");
        return;
    }
    var slice=file.slice(0,4);
    var reader = new FileReader();
    reader.readAsArrayBuffer(slice);
    var type;
    reader.onload = function(e)
    {
        var buffer=this.result;
        var view=new DataView(buffer);
        var magic=view.getInt32(0,false);
        if(magic<0)
            magic = magic + 0x100000000;
        magic=magic.toString(16).toUpperCase();
        if(magic.indexOf('FFD8FF') >=0)
            type="jpg文件";
        if(magic.indexOf('89504E47') >=0)
            type="png文件";
        if(magic.indexOf('47494638') >=0)
            type="gif文件";
        if(magic.indexOf('49492A00') >=0)
            type="tif文件";
        if(magic.indexOf('424D') >=0)
            type="bmp文件";
        document.getElementById("result").innerHTML ='您选择的文件类型为：'+type;
    }
}