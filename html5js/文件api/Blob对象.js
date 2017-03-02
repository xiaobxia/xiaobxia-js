/**
 * Blob对象是原始二进制数据，file也继承自这个对象
 * 有两个属性
 * size：字节长度
 * type：MIME类型
 * 可以对type的类型区分文件类型
 */
function showFileType(dom) {
    var fileList=dom.files,
        len=fileList.length,
        inf={};
    for(var i=0;i<len;i++){
        inf[fileList[i].type]=fileList[i].size;
    }
    console.log(inf);
}
/**
 * 创建Blob对象
 * 第一个参数是一个数组，可以放任意数量的一下对象
 * ArrayBuffer对象
 * ArrayBufferView对象
 * Blob对象
 * String对象
 * 第二个参数为type，指对象的MIME类型，可以不适用改参数
 */

var blob=new Blob(["1234"+"5678"],{type:"text/plain"});
function dd(dom) {
    var text="asdhjk";
    var b=new Blob([text]);
    if(window.URL){
        //下载下来的是一个二进制的文件
        dom.innerHTML='<a download href="'+window.URL.createObjectURL(b)+'" target="_blank">文件下载</a>'
    }
}