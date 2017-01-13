/**
 * 插入排序
 * 比冒泡排序快一点
 */

function insertSort(arr){
    // 从第二个元素开始，因为要留出一个坑
    for(var i=1;i<arr.length;i++){
        var x=arr[i];
        for(var j=i-1;arr[j]>x;j--){  //后挪空出位置 .
            arr[j+1]=arr[j];
        }
        if(arr[j+1]!=x){
            arr[j+1]=x;
        }
    }
    return arr;
}
var arr=[2,3,6,4,2,1,90,100,20,5];
console.log(insertSort(arr,2)); // [1, 2, 2, 3, 4, 5, 6, 20, 90, 100]