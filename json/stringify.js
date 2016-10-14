var book = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011
};
//把对象序列化为json
var jsonText = JSON.stringify(book);
//在序列化时，只序列化这个数组中的属性
var jsonText1 = JSON.stringify(book, ["title", "edition"]);
//在序列化时，对键的值进行处理
var jsonText2 = JSON.stringify(book, function(key, value){
    switch(key){
        case "authors":
            return value.join(",")

        case "year":
            return 5000;

        case "edition":
            return undefined;

        default:
            return value;
    }
});
//控制序列化后的缩进，因为json是没有缩进的
var jsonText3 = JSON.stringify(book, null, 4);
//用- - 来进行缩进
var jsonText4 = JSON.stringify(book, null, "--");

/********
*******  tojson
 * *********/

var book2 = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    //tojson用于定义序列化时，产生什么
    toJSON: function(){
        return this.title;
    }
};
var jsonText5 = JSON.stringify(book);

//把json解析为对象
var bookCopy = JSON.parse(jsonText);
