/**
 * 读取一个file，使用FileReader对象的readAsBinaryString方法，读取为二进制
 * 再使用btoa方法把二进制读取为base64编码
 */
var result=document.getElementById("result");
var file=document.getElementById("file");
if (typeof FileReader == 'undefined' )
{
    result.innerHTML = "<p>抱歉，你的浏览器不支持 FileReader</p>";
    file.setAttribute( 'disabled','disabled' );
}
function file_onchange(){
    document.getElementById("btnReadPicture").disabled=false;
}
function readPicture()
{
    //检查是否为图像文件
    var file = document.getElementById("file").files[0];
    if(!/image\/\w+/.test(file.type))
    {
        alert("请确保文件为图像类型");
        return false;
    }
    var reader = new FileReader();
    //将文件以二进制形式进行读入页面
    reader.readAsBinaryString(file);
    reader.onload = function(f)
    {
        var result=document.getElementById("result");
        var src="data:"+file.type+";base64,"+window.btoa(this.result);
        result.innerHTML = '<img src="'+src+'" alt=""/>'
    }
}