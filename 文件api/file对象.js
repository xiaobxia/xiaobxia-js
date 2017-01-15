/**
 * file对象有两个属性
 * name:文件名
 * lastModifiedDate:最后修改日期
 */
function fileObject(dom) {
    var fileList=dom.files,
        len=fileList.length,
        inf={};
    for(var i=0;i<len;i++){
        inf[fileList[i].name]=fileList[i].lastModifiedDate;
    }
    console.log(inf);
}