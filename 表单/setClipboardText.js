/**
 * Created by xiaobxia on 2017/12/27.
 */
/**
 * 给复制内容添加版权信息
 */
document.addEventListener('copy', function (event) {
    setClipboardText(event);
});


function setClipboardText(event) {
    event.preventDefault();
    var node = document.createElement('div');
    var selection = window.getSelection(0);
    var rawText = window.getSelection(0).toString();
    node.innerHTML = rawText;
    var htmlData = '<div>复制内容:' + node.innerHTML + '</div>';
    var textData = '复制内容:' + rawText;
    //clipboardData更好，选择的时候不会失去焦点
    if (event.clipboardData) {
        event.clipboardData.setData("text/html", htmlData);
        event.clipboardData.setData('text/plain', textData);
    } else if (window.clipboardData) {
        return window.clipboardData.setData("text", textData);
    } else {
        var body = document.getElementsByTagName('body')[0];
        var fakeElement = document.createElement('div');
        fakeElement.style.position = 'absolute';
        fakeElement.style.left = '-99999px';
        body.appendChild(fakeElement);
        fakeElement.innerHTML = textData;
        selection.selectAllChildren(fakeElement);
        window.setTimeout(function () {
            body.removeChild(fakeElement);
        }, 0);
    }
}


