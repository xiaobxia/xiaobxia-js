/**
 *如果元素就是window
 *如果是文档就返回
 */

function getWindow(elem) {
    return jQuery.isWindow(elem) ?
        elem :
        //nodeType文档类型
        elem.nodeType === 9 ?
            //在浏览器中返回关联document的window对象，如果没有则返回null
        elem.defaultView || elem.parentWindow :
            false;
}