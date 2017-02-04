//兼容DB
window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
    window.mozIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange|| window.webkitIDBKeyRange ||
    window.msIDBKeyRange;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor ||
    window.msIDBCursor;
//兼容window.URL
window.URL = window.URL || window.webkitURL;
//数据库的操作
var dbName = 'imgDB'; //数据库名
var dbVersion = 20150418; //版本号
var idb;
function init(){
    var dbConnect = indexedDB.open(dbName, dbVersion); //连接数据库
    dbConnect.onsuccess = function(e){//连接成功
        idb = e.target.result; //获取数据库
    };
    dbConnect.onerror = function(){
        alert('数据库连接失败');
    };
    dbConnect.onupgradeneeded = function(e){
        idb = e.target.result;
        var tx = e.target.transaction;
        tx.onabort = function(e){
            alert('对象仓库创建失败');
        };
        var name = 'img';
        var optionalParameters = {
            keyPath: 'id',
            autoIncrement: true
        };
        var store = idb.createObjectStore(name,  optionalParameters);
        alert('对象仓库创建成功');
    };
}
function downloadPic(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'sl.jpg', true);
    //指定responseType
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
        if (this.status == 200) {
            //转化为Blob
            var bb = new Blob([this.response]);
            //用FileReader对象读取Blob
            var reader = new FileReader();
            reader.readAsDataURL(bb);
            reader.onload = function(f)
            {
                var result=document.getElementById("result");
                //在IndexDB数据库中保存二进制数据
                var tx = idb.transaction(['img'],"readwrite");
                tx.oncomplete = function(){alert('保存数据成功');}
                tx.onabort = function(){alert('保存数据失败'); }
                var store = tx.objectStore('img');
                var value = {
                    img:this.result
                };
                store.put(value);
            }
        }
    };
    xhr.send();
}
function showPic(){
    var tx = idb.transaction(['img'],"readonly");
    var store = tx.objectStore('img');
    var req = store.get(1);
    req.onsuccess = function(){
        if(this.result == undefined){
            alert("没有符合条件的数据");
        }
        else{
            var img = document.createElement('img');
            img.src = this.result.img;
            document.body.appendChild(img);
        }
    }
    req.onerror = function(){
        alert("获取数据失败");
    }
}
//如果指定为blob类型，则 xhr.responseType="blob"
//然后直接读取this.response,reader.readAsDataURL(this.response)