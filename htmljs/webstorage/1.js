//得到
sessionStorage.getItem("name");
sessionStorage.getItem("book");
//移除
sessionStorage.removeItem("name");
sessionStorage.removeItem("book");
//设置
sessionStorage.setItem("name", "Nicholas");
sessionStorage.setItem("book", "Professional JavaScript");
//清除
sessionStorage.clear();
//遍历1
var i, key, value;
for (i = 0, len = sessionStorage.length; i < len; i++) {
    key = sessionStorage.key(i);
    value = sessionStorage.getItem(key);
    alert(key + "=" + value);
}
//遍历2
for (var key2 in sessionStorage) {
    var value1 = sessionStorage.getItem(key2);
}
//如果不支持localStorage,就用globalStorage来代替(几乎全部支持)
function getLocalStorage() {
    if (typeof localStorage == "object") {
        return localStorage;
    } else if (typeof globalStorage == "object") {
        return globalStorage[location.host];
    } else {
        throw new Error("Local storage not available.");
    }
}
//事件
EventUtil.addHandler(document, "storage", function (event) {
    //event对象有4个属性
    //发生变化的存储空间域名
    alert("Storage changed for " + event.domain);
    //发生变化的键
    alert("Storage changed for " + event.key);
    //新值
    alert("Storage changed for " + event.newValue);
    //久值
    alert("Storage changed for " + event.oldValue);
});
