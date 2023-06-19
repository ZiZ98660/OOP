/* TypeScript's type system allows you to mark individual properties on an
 interface as readonly
*/

function RO(config: { readonly bar: number; readonly bas: number }) {}

let config = { bar: 123, bas: 123 };

RO(config);

// you can use readonly in interface and type definitions as well:
type RO = {
  readonly bar: number;
  readonly bas: number;
};

let ro: RO = { bar: 123, bas: 65 };

// ro.bar = 456 //Cannot assign to 'bar' because it is a read-only property

/*There is a type Readonly that takes a type T and marks all of its properties
as readonly using mapped types*/
type Foo = {
  bar: number;
  bas: number;
};
/**Makes all properties in type Foo read-only */
type FooReadonly = Readonly<Foo>;

let fou: Foo = { bar: 123, bas: 456 };
let fooReadonly: FooReadonly = { bar: 123, bas: 456 };

fou.bar = 456; // Okay
// fooReadonly.bar = 456; // ERROR: bar is readonly

interface Lou {
  bez: string;
  common: number;
} 

type LouReadonly = Readonly<Lou>;

let louReadonly: LouReadonly = {
  bez: "123",
  common: 23,
};

// Seamless Immutable
// You can even mark index signatures as readonly:
interface ReadonlyFoo {
  readonly [x: number]: number;
}

let foo2: ReadonlyFoo = { 0: 123, 2: 345 };

let f: ReadonlyArray<number> = [1, 2, 3];
console.log(f[0]); // Okay
// f.push(4);           // Error: `push` does not exist on ReadonlyArray as it mutates the array
f = f.concat([4]); // Okay: create a copy

/**const
 * is for a variable reference
 * the variable cannot be reassigned to anything else.

** readonly is
 * for a property
 * the property can be modified because of aliasing
 */

/*21*/
let f2: {
  readonly bar: number;
} = {
  bar: 123,
};

const iMutate = (f2: { bar: number }) => {
  f2.bar = 456;
};

iMutate(f2);

interface F3 {
  readonly bar: number;
}
let f3: F3 = {
  bar: 123,
};

function iTakeF3(f3: F3) {
  // f3.bar = 456; // Error! bar is readonly
}

iTakeF3(f3); // The f3 argument is aliased by the f3 parameter
