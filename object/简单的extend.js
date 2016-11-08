var extend=function () {
    var i=1,
        len=arguments.length,
        target=arguments[0];
    for(i;i<len;i++){
        for (var j in arguments[i]){
            target[j]=arguments[j];
        }
    }
    return target;
};