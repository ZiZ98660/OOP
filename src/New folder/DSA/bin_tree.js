class BinaryNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Create tree nodes
// const a = new BinaryNode('a');
// const b = new BinaryNode('b');
// const c = new BinaryNode('c');
// const d = new BinaryNode('d');
// const e = new BinaryNode('e');
// const f = new BinaryNode('f');

const a = new BinaryNode(1);
const b = new BinaryNode(34);
const c = new BinaryNode(2);
const d = new BinaryNode(17);
const e = new BinaryNode(5);
const f = new BinaryNode(8);

//
//         a
//        / \
//       b   c
//      / \   \
//     d   e   f
//
//         1
//        / \
//       34   2
//      / \   \
//     17   5   8

// DFS => a, b, d, e, c, f - stack
// BFS => a, b, c, d, e, f - queue

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

// Correct depthFirstValues implementation (pre-order DFS, iterative)
const depthFirstValues = (root) => {
    if (!root) return [];
    let stack = [root];
    let values = [];

    while (stack.length){
        let current = stack.pop()
        // console.log(current.val)
        values.push(current.val)

        if (current.right) stack.push(current.right);
        if (current.left) stack.push(current.left);
    }
    return values;
}

// console.log(depthFirstValues(a));

const recDepthFirstValues = (root) => {
    if (!root) return []
    const left_vals = recDepthFirstValues(root.left)
    const right_vals = recDepthFirstValues(root.right)
    return [root.val, ...left_vals, ...right_vals]
}

console.log('recursive:', recDepthFirstValues(a));

const breadthFirstValues = (root) => {
    if (!root) return []
    let queue = [root]
    let values = []

    while (queue.length) {
        let current = queue.shift()
        values.push(current.val)

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
    return values
}

console.log("BFS:", breadthFirstValues(a));

const sumBinTree = (root) => {
    if (!root) return 0
    let queue = [root]
    let sum = 0
    let front = 0


    while (front < queue.length){
        let current = queue[front++]
        sum += current.val

       if (current.left) queue.push(current.left);
       if (current.right) queue.push(current.right);     

    }
        return sum
}

console.log("SumF:", sumBinTree(a));

const recursiveSumBinTree = (root) => {
    if (!root) return 0
    const lhs_vals = recursiveSumBinTree(root.left)
    const rhs_vals = recursiveSumBinTree(root.right)

    return root.val + lhs_vals + rhs_vals
}

console.log("recSum:", recursiveSumBinTree(a));

const treeIncludes = (root, target) => {
    // if (!root) return null
    let stack = [root]

    while (stack.length) {
        let current = stack.pop()
    if (current.val === target) return true;
         

        if(current.right) stack.push(current.right)
        if (current.left) stack.push(current.left)
    }

    return false
}

console.log("Target:", treeIncludes(a, 34));


const recTreeIncludes = (root, target) => {
    if (!root) return false
    if (root.val === target) return true;
    const lhs_vals = recTreeIncludes(root.left, target);
    const rhs_vals = recTreeIncludes(root.right, target);

    return lhs_vals || rhs_vals;
}

console.log("Target:", recTreeIncludes(a, 4));

const findMin = (root) => {
    if (!root) return null;
   let stack = [root]
   let min = root.val

   while (stack.length) {
    let current = stack.pop()
    if (current.val < min){
        min = current.val
    }
    if (current.right) stack.push(current.right)
    if (current.left) stack.push(current.left)
   }
   return min
}
                    
console.log("Min:", findMin(a));

const maxPathSumRecursive = (root) => {
    if (!root.left || !root.right) return root.val

    const maxLeft = maxPathSumRecursive(root.left) 
    const maxRight = maxPathSumRecursive(root.right) 

    return root.val + Math.max(maxLeft, maxRight)
    

}

console.log("MaxPath:", maxPathSumRecursive(a));


const mPS = (root) => {
  if (!root) return -Infinity;
  let stack = [root];
  let max = -Infinity;
  let sum = root.val;

  while (stack.length) {
    let current = stack.shift();
    if (!current.left && !current.right && current.val > max) {
        max = current.val;
    }

    if (current.left) {
      stack.push(current.left);
      sum += current.left.val;
    }
    if (current.right) {
      stack.push(current.right);
      sum += current.right.val;
    }
  }
  return max + sum;
};









```
        1 (a)
       / \
    34(b)  2(c)
    / \      \
 17(d) 5(e)  8(f)
```














const maxPathSumIterative = (root) => {
  if (!root) return -Infinity;

  let queue = [{ node: root, sum: root.val }];
  let max = -Infinity;

  while (queue.length) {
    let { node, sum } = queue.shift();

    if (!node.left && !node.right && sum > max) {
      max = sum;
    }
    if (node.left) {
      queue.push({ node: node.left, sum: sum + node.left.val });
    }
    if (node.right) {
      queue.push({ node: node.right, sum: sum + node.right.val });
    }
  }
  return max;
};

console.log("MaxPath:", maxPathSumIterative(a));
