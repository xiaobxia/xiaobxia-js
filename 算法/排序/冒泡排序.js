/**
 * 冒泡排序
 * 交换的次数最多，所以它的性能是最差的
 */
function bubbleSort(arr){
    var len=arr.length;
    for(var i=0;i<len;i++){
        for(var j=0;j<len-1-i;j++){
            if(arr[j]>arr[j+1]){   //相邻元素两两对比
                var temp=arr[j+1];  //交互位置,所以大的都放到了最后面
                arr[j+1]=arr[j];
                arr[j]=temp;
            }
        }
    }
    return arr;
}
var arr=[2,3,6,4,2,1,90,100,20,5];
console.log(bubbleSort(arr)); // [1, 2, 2, 3, 4, 5, 6, 20, 90, 100]
