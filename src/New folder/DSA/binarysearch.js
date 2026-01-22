const binarySearch = (arr, target) => {
    let first = 0
    let last = arr.length - 1

    while (first <= last) {
        const midpoint = Math.floor((first + last) / 2)
       if  (arr[midpoint] === target){
        return midpoint
       } else if (arr[midpoint] < target){
            first = midpoint + 1
       } else {
            last = midpoint - 1
       }
    }
    return -1
}

const recursiveBinarySearch = (arr, target) => {
    let first = 0
    let last = arr.length - 1
    if (arr.length !== 0) {
        const midpoint = Math.floor((first + last) / 2)
        if (arr[midpoint] === target) {
            return true
        } else if (arr[midpoint] < target) {
            return recursiveBinarySearch(arr.slice(midpoint + 1), target)
        } else {
            return recursiveBinarySearch(arr.slice(first, midpoint), target)
        }
    }
    return false
}

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 

console.log(binarySearch(list, 7)) 
console.log(recursiveBinarySearch(list, 7))
