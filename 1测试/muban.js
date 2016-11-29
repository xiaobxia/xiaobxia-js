
var a=document.getElementById("four");
$("#six").on("click",function () {
    var c=$("#four").height(),
        n=$("#four").innerHeight(),
        o=$("#four").outerHeight();
    var b="h:"+c+" i:"+n+" o:"+o;
    alert(b);
});

