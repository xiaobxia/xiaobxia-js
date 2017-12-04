/**
 * Created by xiaobxia on 2017/9/24.
 */
//导出，下载文件
function downloadWordHandler() {
    let turnForm = document.createElement('form');
    turnForm.method = 'POST';
    turnForm.action = '';

    let input1 = document.createElement('input');
    input1.setAttribute('name', '');
    input1.setAttribute('type', 'hidden');
    input1.setAttribute('value', '');
    turnForm.appendChild(input1);

    document.body.appendChild(turnForm);
    turnForm.submit();
    turnForm.parentNode.removeChild(turnForm);
}

//写法2，使用流
const FileSaver = require('file-saver');

function save(data) {
    //参数是返回的流
    let blob = new Blob([data], {type: 'application/octet-stream,charset=UTF-8'});
    let fileName = 'export.xls';
    FileSaver.saveAs(blob, fileName);
}

