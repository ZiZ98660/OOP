import React from "react";
import { String, Union } from "ts-toolbelt";
// import { Key } from "ts-toolbelt/out/Any/Key";
// Removing a member of a union type
export type Letters = "a" | "b" | "c";

type RemoveC<T> = T extends "c" ? never : T;

type WithoutC = RemoveC<Letters>;

// Building Loose autocomplete with typescript
// type IconSize = 'sm' | 'xs' | Omit<string, 'xs' | 'sm'>
type IconSize = LooseAutocomplete<"sm" | "xs">;

type LooseAutocomplete<T extends string> = T | Omit<string, T>;

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