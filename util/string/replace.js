/*这种属于只有一个匹配项的模式，所以会传递3个参数
 /[<>"&]/g，这种是只匹配一个的
 match为模式的匹配项，pos为模式匹配项在字符串中的位置，originalText为原始字符串（每次匹配都是同一个）
 每次只匹配一个
 alert(htmlEscape("<p>&"));的情况下
 第一次3个参数为<,0,<p>&
 二次为>,2,<p>&

 */
function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&amp;lt;";
            case ">":
                return "&amp;gt;";
            case "&":
                return "&amp;amp;";
            case "\"":
                return "&amp;quot;";
        }
    });
}
/*这种属于多捕获匹配的模式，所以会传递多个参数，1为模式的匹配项，2为第一个捕获组的匹配项，3为第二个捕获组的匹配项。。。。
 最后两个参数为上文中的pos和originalText
 正则表达式中用（）括起来的就是一个捕获组
 在
 function escape2Html(str) {
 var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t,a,b) {
 return arrEntities[t];
 });
 }
 alert(escape2Html("&lt;&gt;&nbsp;"));的情况下
 得到
 all=&lt ,t=lt ,a=0 ,b=&lt;&gt;&nbsp;
 all=&gt ,t=gt ,a=4 ,b=&lt;&gt;&nbsp;

 */
/*function escape2Html(str) {
 var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
 return arrEntities[t];
 });
 }*/
function escape2Html(str) {
    var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
}
//这个函数中，是和第一种情况一样的，这里它只用了一个参数match
function html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&amp;lt;','>':'amp;gt;','&':'&amp;amp;','\"':'&amp;quot;'}[c];});
}