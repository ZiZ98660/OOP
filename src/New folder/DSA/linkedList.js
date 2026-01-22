// linked list

const n1 = {
    data: 100

}

const n2 = {
    data: 200
}

n1.next = n2


class Node {
    constructor(data, next = null) {
        this.data = data
        this.next = next
    }
}
class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
        
    }

  insertFirst(data){
    this.head = new Node (data, this.head)
  }
  printList(){
    let current = this.head
    while (current) {
        console.log(current)
        current = current.next
    }
  }

  insertLast(data){
    let node = new Node(data)
    let current
    if(!this.head){
        this.head = node
    } else {
        current = this.head

        while(current.next) {
            current = current.next
        }

        current.next = node
        
    }
  }

} 

const ll = new LinkedList()
ll.insertFirst(100)
ll.insertFirst(200)
ll.insertFirst(300)

ll.printList()

// functions
const printLinkedList = (head) => {
    let current = head
    while (current){
        console.log(current.data)
        current = current.next 
    }
}

const recursivePrint = (head) => {
    if (!head) return;
    console.log(head.data);
    recursivePrint(head.next)
}

const linkedListVal = (head) => {
    const vals = []
    let current = head
    while (current){
        vals.push(current.data)
        current = current.next
    }
    return vals
}

const linkedListValRecursive = (head) => {
    const vals = []
    fillValues(head, vals)
    // if (!head) return
    // vals.push(head.data)
    // linkedListValRecursive(head.next)
    return vals
}

const fillValues = (head, vals) => {
  if (!head) return
  vals.push(head.data)
  linkedListValRecursive(head.next)
}

const sumList = (head) => {
    let sum = 0
    let current = head
    while (current){
        sum += current.data
        current = current.next
    }

    return sum

}

const sumListRecursive = (head) => {
    if (!head) return
    return head.data + sumListRecursive(head.next)
}

const findListVal = (head, target) => {
  let current = head;
  while (current) {
    if (current.data === target) return true
    current = current.next
  }
  return false
};

const findListValRecursive = (head, target) => {
    if (!head) return false
    if (head.data === target) return true
    return findListValRecursive(head.next, target)    
}

const getNodeValue = (head, index) => {
   let count = 0
    let current = head 

    while (current) {
        if (count === index) return current.data
        count ++
        current = current.next
    }
    return null
}


const getNodeValueRecursive = (head, index) => {
    if (!head) return null
    if(index === 0) return head.data
    return getNodeValueRecursive(head.next, index - 1)
}

const reverseList = (head) => {
let prev = null
let current = head
while (current){
    const next = current.next
    current.next = prev
    prev = current
    current = next
}
return prev
}

const reverseListRecursive = (head, prev = null) => {
    if (!head) return prev
    const next = head.next
    head.next = prev
    return reverseListRecursive(next, head)
}
 

const a = (h) => {
    let prev = null
    let cur = h
    while(cur) {
        const next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return prev
}

// {
// a => b => c => null
// head = a; prev = null
// looping through; 
// current = head
// current = next = a
//  ...a => null
// prev = current = a
// ...b => a => null
// cur = next = b
// ...c => b => a => null
// prev = current = b
// ...c => b => a => null
// cur = next = c
// ...null => c => b => a => null
// prev = current = c
// ...null => c => b => a => null
// }



const zipperList = (head1, head2) => {
    let tail = head1
    let current1 = head1
    let current2 = head2
    let count = 0

    while(current1 && current2) {
        if (count % 2 === 0){
            tail.next = current2
            current2 = current2.next
        }else{
            tail.next = current1
            current1 = current1.next
        }

        tail = tail.next
        count++
    }

    if (current1) tail.next = current1
    if (current2) tail.next = current2

    return head1
}


const zipperListRecursive = (h1, h2) => {
    if (!h1 && !h2) return null
    if (h1 && !h2) return h1
    if (h2 && !h1) return h2

    const n1 = h1.next
    const n2 = h2.next
    h1.next = h2
    h2.next = zipperListRecursive(n1, n2)

    return h1
}

// Helper class for linked list nodes
class CustomNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

// Helper function to build a linked list from an array
function buildLinkedList(arr) {
    if (arr.length === 0) return null
    let head = new CustomNode(arr[0])
    let current = head
    for (let i = 1; i < arr.length; i++) {
        current.next = new CustomNode(arr[i])
        current = current.next
    }
    return head
}

console.log('ll', buildLinkedList([50, 100, 150]))

// Helper function to print linked list
function printLinkedList1(head) {
    let arr = []
    let current = head
    while (current) {
        arr.push(current.val)
        current = current.next
    }
    console.log(arr.join(' -> '))
}

// Test the zipperListRecursive function
const list1 = buildLinkedList([1, 3, 5])
const list2 = buildLinkedList([2, 4, 6, 8, 10])
console.log("List 1:")
printLinkedList1(list1)
console.log("List 2:")
printLinkedList1(list2)

const zipped = zipperListRecursive(list1, list2)
console.log("Zipped List:")
printLinkedList1(zipped)


 