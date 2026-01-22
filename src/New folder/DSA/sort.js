const mergeSort = (arr) => {
    if(arr.length <= 1) return arr

    const mid = Math.floor(arr.length / 2)

    const lhs_vals = mergeSort(arr.slice(0, mid))
    const rhs_vals = mergeSort(arr.slice(mid))

    let sorted = []
    let a = 0
    let b = 0

    while (a < lhs_vals.length && b < rhs_vals.length){
        if (lhs_vals[a] < rhs_vals[b]){
            sorted.push(lhs_vals[a])
            a++
        }else{
            sorted.push(rhs_vals[b])
            b++
        }
    }

    while (a < lhs_vals.length){
        sorted.push(lhs_vals[a]);
        a++;
    }
    while (b < rhs_vals.length){
        sorted.push(rhs_vals[b]);
        b++;
    }
    return sorted
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray);

const minIdx = (list) => {
    let min = 0
    let i = 0
    while (i < list.length){
        if (list[i] < list[min]){
            min = i
        }
        i++
    }
    return min
}

const selectionSort = (arr) => {
    let sorted = []

    while (arr.length > 0){

        const min = minIdx(arr)
        sorted.push(arr.splice(min, 1)[0])
    }

    return sorted
    
}

console.log("selection sort", selectionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));


const quickSort = (arr = []) => {
    if (Array.isArray(arr) && arr.length <= 1) return arr
    
    let pivot = 0
    let grtr_num_list = []
    let lssr_num_list = []
    let i = 0

   while (i < arr.slice(1).length){
    if (arr.slice(1)[i] <= arr[pivot]) {
      lssr_num_list.push(arr.slice(1)[i]);
    } else {
      grtr_num_list.push(arr.slice(1)[i]);
    }
    i++
   }

   return [...quickSort(lssr_num_list), arr[pivot], ...quickSort(grtr_num_list)];
   
  
}

console.log("quick sort", quickSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));


