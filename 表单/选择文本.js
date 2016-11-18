var addEvent = function (elem, eventName, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, handler, false);
    } else if (elem.attachEvent) {
        //兼容ie
        elem.attachEvent("on" + eventName, handler);
    }
};
//得到焦点时，可以一次性删除所有文字
addEvent(textbox,"focus",function (event) {
    var e = event || window.event,
        target = event.target || event.srcElement;
    target.select();
});
//得到用户选择的（类似于复制时的那种选择）文本
function getSelectedText(textbox){
    if (typeof textbox.selectionStart == "number"){
        return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
    } else if (document.selection){
        //兼容ie浏览器
        return document.selection.createRange().text;
    }
}
function selectText(textbox, startIndex, stopIndex){
    if (textbox.setSelectionRange){
        textbox.setSelectionRange(startIndex, stopIndex);
        //兼容ie
    } else if (textbox.createTextRange){
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex);
        range.moveEnd("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}