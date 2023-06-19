// Variable Definition
// let foo = 123; // foo is a `number`
// let bar = "Hello"; // bar is a `string`
// foo = bar; // Error: cannot assign `string` to a `number`

// Function Return Types
function add(a: number, b: number) {
  return a + b;
}

// Assignment
type Adder = (a: number, b: number) => number;
let addFunc: Adder = (a, b) => a + b;

// declare const foo: Adder

let fig = {
  a: 123,
  b: 456,
};

// fig.a = 'hello' //error!

type T_Adder = (numbers: { a: number; b: number }) => number;
function iTakeAnAdder(adder: T_Adder) {
  return adder({ a: 1, b: 2 });
}
iTakeAnAdder(({ a, b }) => {
  // Types of `a` and `b` are inferred
  // a = "hello"; // Would Error: cannot assign `string` to a `number`
  return a + b;
});
