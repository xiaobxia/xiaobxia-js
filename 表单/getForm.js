function huoqu() {
    //得到id为form1的表单
    var form = document.getElementById("form1");
    //得到页面中所有表单
    var firstForm = document.forms[0];
    //得到名称为form2的表单
    //通过name选择可以通过[];
    var myForm = document.forms["form2"];
}
//表单有elements属性
function elshuxing() {
    var form = document.getElementById("form1");
    //得到第一个字段
    var form1=form.elements[0];
    //名为"form-box"的字段
    var form2=form.elements["form-box"];
    //长度
    var len=form.elements.length;
}

