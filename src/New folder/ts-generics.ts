// documents meaningful type dependencies between members
/**
 * Class instance members
 * Class methods
 * function arguments
 * function return value
 */
// class Queue {
//     private data = [] as any[]
//     push(item){
//         this.data.push(item)
//     }
//     pop() { return this.data.shift(); }
// }

// class QueueNumber extends Queue {
//     push(item: number) { super.push(item); }
//     // ts-ignore
//     pop(): number { return this.data.shift(); }
//   }
//   const queue = new QueueNumber();
//   queue.push(0);
//   queue.push(1); // ERROR : cannot push a string. Only numbers allowed

/** A class definition with a generic parameter */
class Queue<T> {
  private data = [] as T[];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T | undefined {
    return this.data.shift();
  }
}

const queue = new Queue<string>();
queue.push("0");
queue.pop();

// class Qu<T>{
//     private data: Array<any> = []
//     push( item: T) {
//         this.data.push(item)
//     }
//     pop(): T | undefined {
//         return this.data.shift()
//     }
// }

// function reverse<T>(items: T[]): T[]{
//     var toreturn = [] as T[]
//     for(let i = items.length - 1; i >= 0; i--){
//         toreturn.push(items[i])
//     }
//     return toreturn
// }

// function reverse<T>(items: T[]): T[]  {
//     var reversedArray: Array<T> = []
//     for(let i = items.length - 1; i >= 0; i--){
//         reversedArray.push(items[i])
//     }

//     return reversedArray
// }

const reverse = <T>(items: T[]): T[] => {
  var reversedArray: T[] = [];
  for (let i = items.length - 1; i >= 0; i--) {
    reversedArray.push(items[i]);
  }
  return reversedArray;
};

const Arr = [1, 2, 3];
var reversed = reverse(Arr);

// Safety!
// reversed[0] = '1';     // Error!
// reversed = ['1', '2']; // Error!

reversed[0] = 1; // Okay
reversed = [1, 2]; // Okay

// Generics created just for a member function
class Utility {
  reverse<T>(items: T[]): T[] {
    var reversedArray: Array<T> = [];
    for (let i = items.length - 1; i >= 0; i--) {
      reversedArray.push(items[i]);
    }
    return reversedArray;
  }
}

let utility = new Utility();

utility.reverse<number>(Arr);

// Design Pattern: Convenience generic
declare function parse<T>(name: string): T;

// declare function parse(name: string): any

// const something = parse('something') as string

const getJSON = async <T>(params: {
  url: string;
  headers?: { [key: string]: string };
}): Promise<T> => {
  const fetchParams = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(params.headers || {}),
  } as const;
  const response = await fetch(params.url, fetchParams);
  const result: T = await response.json();
  return result;
};

type LoadUsersResponse = {
  users: {
    name: string;
    email: string;
  }[];
};

function loadUsers() {
  return getJSON<LoadUsersResponse>({ url: "https://example.com/users" });
}

// generic is only used as an argument
declare function send<T>(arg: T): void;

const Concat = <T extends any[], U extends any[]>(
  args1: T,
  ...args2: U
): Array<any> => {
  return args1.concat(...args2);
};

Concat([1, 2, "4"], ["y", true, 1]);

// type Includes<T extends readonly any[], TItem> =

// const s = 4

const addIdToOject = <T>(obj: T) => {
  return {
    ...obj,
    id: "342",
  };
};

const res = addIdToOject({
  name: "ziz",
  age: 23,
});

// const getKeyWithTheHighestValue = <T>(
//   obj: T
// ): {
//   key: keyof T
//   value: number
// } =>

const getValue = <T, K extends keyof T>(obj: T, key: K) => {
  if (key === "bad") {
    throw Error(`Don't access the bad key`);
  }
  return obj[key];
};

const res1 = getValue(
  {
    a: 1,
    b: "fg",
    c: true,
    bad: "fc",
  },
  "bad"
);
