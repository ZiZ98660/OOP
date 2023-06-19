"use strict";
// _jsx("img", {
//   src: "https://google.com/images/logo.jpg",
//   alt: "Google",
// });

const add = (x, y) => x + y;

const log =
  (fn) =>
  (...args) => {
    return fn(...args);
  };

const logAdd = log(add(2, 4));

console.log(logAdd);

// Impure fns
const fn = (y) => (x = x + y);

// Immutability
var arr = [1, 2, 3];
const add3 = (arr) => arr.concat(3);

// Currying
const addFn = (x) => (y) => x + y;
const add1 = addFn(1);
add1(2); // 3

// FunctionAsChild
const FunctionAsChild = ({ children }) => children();

{
  <FunctionAsChild>{() => <div>Hello, world!</div>}</FunctionAsChild>;
}

const Name = ({ children }) => children("Ziz");

{
  <Name>{(name) => <div>Hello, {name}!</div>}</Name>;
}

const renderUserMenu = () => <a href="#">User Menu</a>;

const renderAdminMenu = () => <a href="#">Admin Menu</a>;
return (
  <div>
    <h1>Welcome Back!</h1>
    {userExists && renderUserMenu()}
    {userIsAdmin && renderAdminMenu()}
  </div>
);
