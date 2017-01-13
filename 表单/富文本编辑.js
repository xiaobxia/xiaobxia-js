/**
 * "<div class='editable' id='richedit' contenteditable></div>"
 *
 */
var div=document.getElementById("ad");
//打开可编辑模式
div.contenteditable="true";
/**
 * 交互方式通过document.execCommand()
 * 方法有3个参数：1.要执行的命令 2.是否让浏览器提供界面（为了兼容性始终设为false） 3.执行命令要的值（如果不需要为null）
 */
document.execCommand("bold",false,null);
