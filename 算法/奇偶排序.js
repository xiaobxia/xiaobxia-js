function oddEvenSort(arr){
    //swaped用来控制循环是否要继续，如果左边的都比右边的小，则退出循环，返回排好的数组
    var swaped=true;
    var k=0;
    while(swaped){
        if(k>0){
            swaped=false;
        }
        for(var i=k;i<arr.length-1;i+=2){
            if(arr[i]>arr[i+1]){
                // 如果左边的数字比右边的大，两者交换位置
                arr[i]=[ arr[i+1], arr[i+1]=arr[i] ][0];
                swaped=true;
            }

        }
        k=[1,0][k]; //奇数和偶数之间的转行
    }
    return arr;
}

var arr=[2,3,6,4,2,1,90,100,20,5];
console.log(oddEvenSort(arr)); // [1, 2, 2, 3, 4, 5, 6, 20, 90, 100]