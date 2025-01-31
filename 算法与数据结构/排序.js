/*
 * 排序算法
 * 排序--外排序
      |_内排序__比较排序
            |__非比较排序

 * 稳定性?
 * Ai = Aj，排序后Ai与Aj的相对位置不变
 * 稳定的好处？
 * 排序算法如果稳定，那么从一个键排序，再从另一个键上排序，第一次排序的结果可以被第二个键所用
 */



var data = [];
for (let i=0; i<10; i++) {
    data.push(Math.floor(Math.random()*100));
}



/* 
 * 直接插入排序(插入排序)
 * 最差时间复杂度 ---- 最坏情况为输入序列是降序排列的,此时时间复杂度O(n^2)
 * 最优时间复杂度 ---- 最好情况为输入序列是升序排列的,此时时间复杂度O(n)
 * 平均时间复杂度 ---- O(n^2)
 * 稳定
 */
function InsertSort(arr, order=1) {
    for(let i=1; i<arr.length; i++) {
        let temp = arr[i], j;
        for(j=i; j>=0 && order?arr[j-1]<temp:arr[j-1]>temp; j--) {
            arr[j] = arr[j-1];
        }
        arr[j] = temp;
    }

    return arr;
}



/*
 * 希尔排序(插入排序)
 * 最差时间复杂度 ---- 根据步长序列的不同而不同。已知最好的为O(n(logn)^2)
 * 最优时间复杂度 ---- O(n)
 * 平均时间复杂度 ---- 根据步长序列的不同而不同。
 */
function ShellSort(arr, order=1) {
    let gap = parseInt(arr.length / 2);

    while(gap > 0) {
        for(let i=gap; i<arr.length; i++) {
            let temp = arr[i], j;
            for(j=i-gap; j>=0 && order?temp>arr[j]:temp<arr[j]; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
        gap = parseInt(gap/2);
    }

    return arr;
}


/*
 * 直接选择排序(选择排序)
 * 平均时间复杂度 ---- O(n^2)。
 */
function SelectSort(arr, order=1) {
    for(let i=0; i<arr.length; i++) {
        let temp = i;
        for(let j=i+1; j<arr.length; j++) {
            if(order ?arr[j] > arr[temp] : arr[j] < arr[temp]) {
                temp = j;
            }
        }

        if(temp != i) {
            arr[temp] -= arr[i];
            arr[i] += arr[temp];
            arr[temp] = arr[i] - arr[temp];
        }
    }

    return arr;
}


/*
 * 堆排序(选择排序)
 * 最差时间复杂度 ---- O(nlogn)
 * 最优时间复杂度 ---- O(nlogn)
 * 平均时间复杂度 ---- O(nlogn)
 */
function HeapSort(arr, order=1) {
    let len = arr.length,
        result = [];

    // 构造初始堆
    for(let i=parseInt(len/2); i>=0; i--) {
        heap(i, len-1);
    }   

    // 进行堆排序
    for(let i=len; i>=1; i--) {
        result.push(arr[0]);
        arr[0] = arr[i-1];

        heap(0, i-1);
    }

    return result;

    function heap(s, e) {
        let i = s, j = (2 * s), temp = arr[s];

        while(j<e) {
            if(arr[j+1]) {
                if(order) {
                    arr[j] < arr[j+1] && (j++)
                } else {
                    arr[j] > arr[j+1] && (j++)
                }
            } 

            if(order ? temp<arr[j] : temp>arr[j]) {
                arr[i] = arr[j];
                i=j;
                j = (2*j) +1;
            } else {
                break;
            }
        }
        arr[i] = temp;
    }
}



/*
 * 归并排序
 * 归并排序分为递归实现和非递归实现
 * 最差时间复杂度 ---- O(nlogn)
 * 最优时间复杂度 ---- O(nlogn)
 * 平均时间复杂度 ---- O(nlogn)
 */
function MergeSort(arr, order=1) {
    
    for(let len=1; len<arr.length; len *= 2) {
        let data = [];

        for(let j=0; j<arr.length; j += len*2) {
            data.push(...merge(arr.slice(j, j+len), arr.slice(j+len, j+2*len)));
        }

        arr = data;
    }

    return arr;

    function merge(arr1, arr2) {
        let arr = [],
        i=0, j=0;

        while(i<arr1.length && j<arr2.length) {
            if(order ? arr1[i]>arr2[j] : arr1[i]<arr2[j]) {
                arr.push(arr1[i++])
            }else {
                arr.push(arr2[j++])
            }

        }

        if(i>=arr1.length) {
            while(j<arr2.length) {
                arr.push(arr2[j++])
            }
        }else {
            while(i<arr1.length) {
                arr.push(arr1[i++])
            }
        }

        return arr;
    }
}   



/*
 * 冒泡排序(交换排序)
 */
function BubbleSort(arr, order=1) {
    for(let i=0; i<arr.length; i++) {
        for(let j=i+1; j<arr.length; j++) {
            if(order?arr[i]<arr[j]:arr[i]>arr[j]) {
                arr[i] -= arr[j];
                arr[j] += arr[i];
                arr[i] = arr[j] - arr[i];
            }
        }
    }

    return arr;
}



/*
 * 快速排序(交换排序)
 * 最差时间复杂度 ---- 每次选取的基准都是最大的元素（或者每次都是最小），导致每次只划分出了一个子序列，需要进行n-1次划分才能结束递归，时间复杂度为O(n^2)
 * 最优时间复杂度 ---- 每次选取的基准都能使划分均匀，只需要logn次划分就能结束递归，时间复杂度为O(nlogn)
 * 平均时间复杂度 ---- O(nlogn)
 */


function quickSort(arr, order=1) {
    if(arr.length <= 1) { return arr; }

    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [],
        right = [];
 
    for(let i=0; i<arr.length; i++) {
        if(order ? arr[i]>pivot : arr[i]<pivot) {
            left.push(arr[i]);
        }else {
            right.push(arr[i])
        }
    }

    return quickSort(left, order).concat([pivot], quickSort(right, order));
}