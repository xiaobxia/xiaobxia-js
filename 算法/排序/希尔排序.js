/**
 * 希尔排序
 * 提升了插入排序的性能
 */
function shellSort(arr){
    var gap=Math.floor(arr.length/2);
    while(gap>0){
        for(var i=gap;i<arr.length;i++){
            temp=arr[i];
            for(var j=i;j>=gap&&arr[j-gap]>temp;j-=gap){
                arr[j]=arr[j-gap];
            }
            arr[j]=temp;
        }
        gap=Math.floor(gap/2);
    }
    return arr;
}
var arr = [2,3,6,4,2,1,90,100,20,5];
console.log(shellSort(arr));  //[1, 2, 2, 3, 4, 5, 6, 20, 90, 100]