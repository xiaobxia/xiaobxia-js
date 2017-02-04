/**
 * 发送部分
 * js数组转换为ArrayBuffer对象
 *
 */
function postArrayBuffer(){
    var check=document.getElementsByName("check");
    var tmpArray=new Array();
    for(var i=0;i<check.length;i++)
    {
        if(check[i].checked)
            tmpArray.push(i);
    }
    //产生ArrayBuffer对象
    var buffer = new ArrayBuffer(tmpArray.length);
    var bytearray = new Int8Array(buffer);
    for(var i=0;i<tmpArray.length;i++)
    {
        bytearray[i]=tmpArray[i];
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'putData.php', true);
    //发送的是buffer
    xhr.send(buffer);
}
/**
 * 下载
 * 指定 xhr.responseType = 'arraybuffer';
 * 把响应的数据，转化为数组
 *  var bytearray = new Int8Array(this.response);
 */
function getArrayBuffer(){
    var check=document.getElementsByName("check");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getData.php', true);
    //指定类型
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
        if (this.status == 200) {
            var bytearray = new Int8Array(this.response);
            for(var i=3;i<bytearray.byteLength;i++)
            {
                check[bytearray[i]].checked=true;
            }
        }
    };
    xhr.send();
}