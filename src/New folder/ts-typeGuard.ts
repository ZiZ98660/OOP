//They allow you to narrow down the type of an object within a conditional block
// typeof
const deSomething = (x: number | string) => {
  if (typeof x === "string") {
    // console.log(x.subtr(1));
    console.log(x.substr(1));
  }
};

// var s = 'ggg'
// s.substr(1)

class Log {
  foo = 123;
  common = "123";
}

class Bar {
  bar = 123;
  common = "123";
}

function doStuff(arg: Log | Bar) {
  if (arg instanceof Log) {
    console.log(arg.foo);
    // console.log(arg.bar); /*Error!*/
  }
  if (arg instanceof Bar) {
    // console.log(arg.foo); /*Error!*/
    console.log(arg.bar);
  }
}

// in operator
interface A {
  x: number;
}

interface B {
  y: string;
}

function typeGuard(q: A | B) {
  if ("x" in q) {
    // q:A
  }
}

// Literal Type Guard
type TriState = "yes" | "no" | "unknown";

function logOutState(state: TriState) {
  if (state == "yes") {
    console.log("User selected yes");
  } else if (state == "no") {
    console.log("User selected no");
  } else {
    console.log("User has not made a selection yet");
  }
}

function strictNullCheck(a?: number | null) {
  if (a == null) return;
  
  // a is number now.
}

// User defined type guards
//returns 'someArgumentName' is 'SomeType'
interface Loo {
  loo: number;
  common: string;
}

interface Bas {
  bas: number;
  common: string;
}


/* User defined type guard*/
// function isLoo(arg: any): arg is Loo {
//   return arg.loo !== undefined;
// }

// function isLoo(arg: any): arg is Loo {
//   return arg.loo !== undefined;
// }

const isLoo = (arg: any): arg is Loo => {
  return arg.loo !== undefined
}

type ATypeGuard = 
{[x: number]: number}

const isTypeGuard = (arg: any): arg is ATypeGuard =>{ 
  return arg
}

function userDefinedTypeGuard(arg: Loo | Bas) {
  if (isLoo(arg)) {
    console.log(arg.loo);
    // console.log(arg.bar); /*Error!*/
  } else {
    // console.log(arg.loo); /*Error!*/
    console.log(arg.bas);
  }
}

userDefinedTypeGuard({ bas: 123, common: "123" });

// Type Guards and callbacks
/**
 * TypeScript doesn't assume type guards remain active in callbacks 
  as making this assumption is dangerous
 **/
declare const foo1: {
  bar?: {
    baz: string;
  };
  // bar?: {baz: string}
};

function immediate(callback: () => void) {
  callback();
}

if (foo1.bar) {
  console.log(foo1.bar.baz);
  immediate(() => {
    // console.log(foo1.bar.baz);
  });
}

if (foo1.bar) {
  console.log(foo1.bar.baz); // Okay
  const bar = foo1.bar;
  immediate(() => {
    console.log(bar.baz); // Okay
  });
}
