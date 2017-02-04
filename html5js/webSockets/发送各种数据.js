/**
 * 发送文件
 */
var webSocket=new WebSocket("ws://xxxxxx");
var file=document.getElementById("ii").files[0];
webSocket.send(file);
/**
 * 发送二进制数据
 */
var img=canvas_context.getImageData(0,0,100,100);
var binary=new Uint8Array(img.data.length);
for(var i=0;i<img.data.length;i++){
    binary[i]=img.data[i];
}
webSocket.send(binary.buffer);
/**
 * 接受二进制数据
 */
webSocket.binaryType="arraybuffer";
webSocket.onmessage=function (e) {
    console.log(e.data.byteLength);
};