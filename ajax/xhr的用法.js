//创建对象
function createXHR(){
    //判断是否存在
    if (typeof XMLHttpRequest != "undefined"){
        //如果存在，修改函数
        createXHR = function(){
            return new XMLHttpRequest();
        };
        //如果是ie7，及以前的版本
    } else if (typeof ActiveXObject != "undefined"){
        //修改函数
        createXHR = function(){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;

                for (i=0,len=versions.length; i < len; i++){
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                    } catch (ex){
                        //skip
                    }
                }
            }

            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        createXHR = function(){
            throw new Error("No XHR object available.");
        };
    }

    return createXHR();
}
var xhr = createXHR();

/*********************
*********************/

//响应部分
xhr.onreadystatechange = function(event){
    /*readyState的状态值
    0:未初始化
    1:启动
    2:发送
    3:接收
    4:完成*/
    if (xhr.readyState == 4){
        //状态200是成功的标志
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            //这一句得到响应的头部信息
            alert(xhr.getResponseHeader("MyHeader"));
            alert(xhr.getAllResponseHeaders());
            //在这里是得到数据后的操作，这里还有个xhr.responseText是返回的数据
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful: " + xhr.status);
        }
    }
};
xhr.open("get", "example.txt", true);
//发送头部信息，在open和send之间
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);

//在接收到响应以前取消请求
xhr.abort();