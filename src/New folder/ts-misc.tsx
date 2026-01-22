import React from "react";
import { String, Union } from "ts-toolbelt";
// import { Key } from "ts-toolbelt/out/Any/Key";
// Removing a member of a union type
export type Letters = "a" | "b" | "c";

type RemoveC<T> = T extends "c" ? never : T;

type WithoutC = RemoveC<Letters>;

type LooseAutocomplete<T extends string> = T | Omit<string, T>;
// Building Loose autocomplete with typescript
// type IconSize = 'sm' | 'xs' | Omit<string, 'xs' | 'sm'>
type IconSize = LooseAutocomplete<"sm" | "xs">;


interface IconProps {
  size: IconSize;
}

export const Icon = (props: IconProps) => {
  return <></>;
};

const Comp1 = () => {
  return (
    <>
      <Icon size="xs"></Icon>
      <Icon size="lg"></Icon>
    </>
  );
};

// Dynamic fuction arguments with Generics
export type Event =
  | {
      type: "LOG_IN";
      payload: {
        userId: string;
      };
    }
  | {
      type: "SIGN_OUT";
    };

// const sendEvent = (eventType: Event['type'], payload?: any) => {}
const sendEvent = <T extends Event["type"]>(
  ...args: Extract<Event, { type: T }> extends { payload: infer Tpayload }
    ? [type: T, payload: Tpayload]
    : [type: T]
) => {};

sendEvent("LOG_IN", {
  userId: "345",
});

sendEvent("SIGN_OUT");

// function sendEvent<T extends Event['type']>(
//   ...args: Extract<Event, {type: T}> extends {payload: infer P}
//   ? [type: T, payload: P]
//   : [type: T]
// ){}
// sendEvent("LOG_IN", {
//   userId: "345",
// });



// noUncheckedIndexAccess
// export const myObj: Record<string, string[]> = {}
// myObj.foo.push('bar')

/**
 * Makes a comparison between two unknown types,
 *
 *  K and U. It is set up to use a type argument T
 * and then runs a comparison to see if T extends K or U. If T matches
 * with K, then the result of IsSameType is 1, and if it matches with U,
 * the result is 2. If either of these results are true, then the overall
 * result of IsSameType is true, and if not, the result is false.
 */
type IsSameType<K extends unknown, U extends unknown> = (<T>() => T extends K
  ? 1
  : 2) extends <T>() => T extends U ? 1 : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? IsSameType<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

// Example usage
type ArrayType = [1, 2, 3, "hello"];
type IsNumberIncluded = Includes<ArrayType, 2>; // Result: true
type IsStringIncluded = Includes<ArrayType, 'world'>; // Result: false

type res = boolean extends true ? 1 : 0;

const func = (check: boolean) => {
  return 123;
};

type FuncRes = ReturnType<typeof func>;

// type Result_Generics = typeof func extends (...args: any)
// => any
// ? 1 : 0

type Result_Generics = typeof func extends (...args: any) => infer R
  ? R
  : never;

type CustomReturnType<K> = K extends (...args: any) => infer T ? T : never;

// type Query = typeof query

// type SplitQuery = String.Split<Query, '?'>[1]

// type QueryElements = String.Split<SplitQuery, '&'>
// type Qnum = QueryElements[number]

// type QueryParams = {
//   [QueryElement in QueryElements[number]]: {
//     [Key in String.Split<QueryElement, '='>[0]]:
//     String.Split<QueryElement, '='>[1]
//   }
// }[Qnum]

// type Q = typeof q;

const q = `/home?name=ziz+id=1375&profession=programmer`;

type SQ = String.Split<typeof q, "?">[1];

type _p = String.Split<String.Replace<SQ, "+", "&">, "&">;

type e = Union.Merge<
  {
    [p in _p[number]]: {
      [Key in String.Split<p, "=">[0]]: String.Split<p, "=">[1];
    };
  }[_p[number]]
>;

const obj: e = {
  name: "ziz",
  profession: "programmer",
  id: "1375",
};




//
// const getKeyWithTheHighestValue = <K>(
//   obj: K
//   ): {
//     key: keyof
//   } =>

type MapTuple<T extends readonly unknown[], F> = T extends [infer First, ...infer Rest]
  ? [F extends (arg: First) => infer R ? R : never, ...MapTuple<Rest, F>]
  : [];

type OriginalTuple = | readonly [1, 2, 3] | readonly [1, 2, 3, string]; // Original tuple with mixed types
type MappedTuple = MapTuple<OriginalTuple, (x: number) => string>; // Result: [string, string, string]

// Function to validate the mapped tuple type
const validateMappedTuple = <T extends ReadonlyArray<unknown>, F extends (arg: T[number]) => unknown>(
  tuple: T,
  mapper: F
): MapTuple<T, F> => {
  return tuple.map(mapper) as MapTuple<T, F>;
};

const mapTpl  = (tpl: readonly unknown[]): readonly unknown[] => {
  if (!tpl.length) return tpl; // Base case: if the tuple is empty, return it as is.

  const [first, ...rest] = tpl; // Destructure the first element and the rest of the tuple.

  if (typeof first === "number") {
    // If the first element is a number, convert it to a string and recursively process the rest.
    return [first.toString(), ...mapTpl(rest)];
  }

  // If the first element is not a number, recursively process the rest.
  return [first, ...mapTpl(rest)];
};


const mapped = mapTpl([1, 2, 3, "hello", true]); // Example usage
console.log(mapped)

// Example usage
const originalTuple = [1, 2, 3] as const; // Original tuple with mixed types
const mappedTuple = validateMappedTuple(originalTuple, (x) => Number(x));
console.log(mappedTuple); // Output: ["1", "2", "3"]



type CapitalizeString<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T;

type OriginalString = "hello";
type CapitalizedString = CapitalizeString<OriginalString>; // Result: "Hello"







type Compose<F, G> = F extends (arg: infer A) => infer R
  ? G extends (arg: R) => infer S
    ? (arg: A) => S
    : never
  : never;

type Func1 = (x: number) => string;
type Func2 = (x: string) => boolean;

type ComposedFunc = Compose<Func1, Func2>; // Result: (x: number) => boolean

const func1: Func1 = (x) => x.toString(); // Converts number to string
const func2: Func2 = (x) => x === "42";  // Checks if string is "42"

const composedFunc: ComposedFunc = (x) => func2(func1(x)); // Composes func1 and func2

console.log(composedFunc(42)); // true
console.log(composedFunc(10)); // false


type State =
  | { current: "idle"; next: "loading" }
  | { current: "loading"; next: "success" | "error" }
  | { current: "success"; next: "idle" }
  | { current: "error"; next: "idle" };

type Transition<S extends State["current"], N extends State["next"]> = Extract<
  State,
  { current: S; next: N }
>;

type ValidTransition = Transition<"idle", "loading">; // Result: { current: "idle"; next: "loading" }
type InvalidTransition = Transition<"idle", "success">; // Result: never



function performTransition<T extends State["current"], U extends State["next"]>(
  currentState: T,
  nextState: U
): Transition<T, U> {
  // Logic for transitioning between states
  return { current: currentState, next: nextState } as Transition<T, U>;
}

// Valid transition
const valid = performTransition("idle", "loading"); // Works fine

// Invalid transition
const invalid = performTransition("idle", "success"); // TypeScript error