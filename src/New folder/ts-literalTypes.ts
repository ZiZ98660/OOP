// Literals are exact values that are JavaScript primitives.
/"* Sting Literals *"/;
let hello: "hello";
// hello ='Bar' //Type '"Bar"' is not assignable to type '"hello"'

type CardinalDirection = "North" | "East" | "South" | "West";
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;

// type EveryDirection

function iTakeFoo(foo: "foo") {}
const test = {
  someProp: "foo",
};

// iTakeFoo(test.someProp) // Error: Argument of type string is not assignable to parameter of type 'foo'
/*This is because test is inferred to be of type {someProp: string}*/
const test1 = {
  someProp: "foo" as "foo",
};
iTakeFoo(test1.someProp);
/* OR */
type Test = {
  someProp: "foo";
};
const test3: Test = {
  someProp: "foo",
};
iTakeFoo(test3.someProp);

// String based enums
//  TypeScript enums are number based. can have a Key:value structure
/** Utility function to create a K:V from a list of strings */
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
// And then generate the literal type union using 'keyof typeof'

/** Create a K:V */
const Direction = strEnum(["North", "South", "East", "West"]);

/** Create a Type */
type T_Direction = keyof typeof Direction;

let sample: T_Direction;
