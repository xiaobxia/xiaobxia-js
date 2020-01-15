/**
 * Created by xiaobxia on 2017/12/18.
 */
// 原生触发
function changeTitle(title){
    document.title = title;
    var iframe = document.createElement("iframe");
    iframe.addEventListener('load', function() {
        setTimeout(function() {
            iframe.removeEventListener('load');
            document.body.removeChild(iframe);
        }, 0);
    });
    document.body.appendChild(iframe);
}

//修改title
//基于jQuery或Zepto
function change_title(title){
    document.title = title;
    // hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
    $iframe.on('load',function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($('body'));
}

$('#demo1').on('click', function(){
    change_title('demo1 title');
});

document.getElementById('demo2').ontouchend = function(){
    changeTitle('demo2 title');
}