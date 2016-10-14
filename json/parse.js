var book = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    releaseDate: new Date(2011, 11, 1)
};
//把对象序列化成json
var jsonText = JSON.stringify(book);
//控制键对应的值
var bookCopy = JSON.parse(jsonText, function(key, value){
    if (key == "releaseDate"){
        //序列化时Date对象被转化为字符串
        return new Date(value);
    } else {
        return value;
    }
});

