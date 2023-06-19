import { useState } from "react";
// AKA strict object literal checking
function logName(something: { name: string }) {
  console.log(something.name);
}

var animal = { name: "cow", diet: "vegan, but has milk of own species" };
logName(animal);

// Allowing extra properties
var x: {
  foo: number;
  [x: string]: unknown;
  // [x: number]: unknown
};
x = {
  foo: 1,
  z: "string",
  y: "d",
  as: 122,
};

var z = x.as as number;

interface State {
  a: string;
  b: string;
}

const [state, setState] = useState({} as State);

setState({ a: "hello", b: state.b });
