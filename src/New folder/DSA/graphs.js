// Depth--First Traversal
// Breadth-First Traversal



const graph = {
    a: ['c', 'b'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: [],
}

const dFS = (graph, source) => {
  const stack = [source];

  while (stack.length) {
    let current = stack.pop();
    console.log(current)

    for (let neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
};

dFS(graph, 'a'); //abdfce

const recDFS = (graph, source) => {
    console.log(source)
    for (let neighbor of graph[source]){
        recDFS(graph, neighbor)
    }
}

const bfSPrint = (graph, source) => {
    let queue = [source]
    let front = 0

    while (queue.length && front < queue.length ) {
        let current = queue[front++]
        console.log(current)

        for (let neighbor of graph[current]){
            queue.push(neighbor)
        }
    }
}