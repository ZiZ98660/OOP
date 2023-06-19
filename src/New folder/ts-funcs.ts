// OverLoading
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d,
  };
}

// Declaring functions
type LongHand = {
  (a: number): number;
};
type ShortHand = (a: number) => number;

// You can only add overloads in the long hand declaration version
type LongHandDeclaration = {
  (a: number): number;
  (a: string): string;
};

/* Callable */
type ReturnString = () => string;

// An instance of this interface would be a function that returns a string
declare const foo: ReturnString;
const bar = foo(); // bar is inferred as a string

interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}

// An interface can provide multiple callable annotations to specify
// function overloading
interface Overload {
  (foo: string): string;
  (foo: number): number;
}

function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
  if (typeof foo === "number") {
    return foo * foo;
  } else if (typeof foo === "string") {
    return foo.capitalize();
  }
}

const overloaded: Overload = stringOrNumber;
const num = overloaded("e4");

/*
like the body of any interface, you can use the body of a callable 
interface as a type annotation for a variable
*/
// const overloaded: {
//     (foo: string): string
//     (foo: number): number
// } = (foo: any) => foo

// Arrow Syntax
// a function that takes a number and returns a string
const simple: (foo: number) => string = (foo) => foo.toString() as string;

// Newable
// special type of callable type annotation with the prefix new
// simply means that you need to invoke with 'new' key word
interface StringCallable {
  new (): string;
}

declare const Foo: StringCallable;
const baz = new Foo();
baz;
