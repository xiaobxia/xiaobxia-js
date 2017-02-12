var bb=["a","b","c","d","e"];
var cc=["f","g"];

//连接两个或更多的数组，并返回结果。
var a=bb.concat(cc);	//["a","b","c","d","e","f","g"]

//检测数值元素的每个元素是否都符合条件。
bb.every(function (str) {
    return str.length<5;
});//true

//检测数值元素，并返回符合条件所有元素的数组。
bb.filter(function (str) {
    return str=="a";
});
//["a"]

indexOf();	//搜索数组中的元素，并返回它所在的位置。
join();	//把数组的所有元素放入一个字符串。
lastIndexOf();	//返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
map();	//通过指定函数处理数组的每个元素，并返回处理后的数组。
pop();	//删除数组的最后一个元素并返回删除的元素。
push();	//向数组的末尾添加一个或更多元素，并返回新的长度。
reverse();	//反转数组的元素顺序。
shift();	//删除并返回数组的第一个元素。

//选取数组的的一部分，并返回一个新数组。
bb.slice(1);//["b","c","d","e"]
//从index为2开始，到index为4以前（不包括4）
bb.slice(2,4);//["c","d"]

some();	//检测数组元素中是否有元素符合指定条件。
sort();	//对数组的元素进行排序。

//从数组中添加或删除元素。
//从index为2处开始移除3个，用"a"取代
bb.splice(2,3,"a");//["a","b","a"];
//从index为1处开始移除1个元素
bb.splice(1,1);//["a","c","d","e"];

toString();	//把数组转换为字符串，并返回结果。
unshift();	//向数组的开头添加一个或更多元素，并返回新的长度。
valueOf();	//返回数组对象的原始值。