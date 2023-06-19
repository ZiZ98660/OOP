// var greeting = "Good morning";

// function greets(person) {
//   var fullName = person.name + " " + person.surname;

//   function displayGreeting() {
//     console.log(greeting + " " + fullName);
//   }

//   displayGreeting();
// }

// var greet = greets({ name: "John", surname: "Smith" });

// console.log(greet);

var greeting = "Good morning";

function greets(person) {
  var fullName = person.name + " " + person.surname;

  return function () {
    console.log(greeting + " " + fullName);
  };
}

displayGreeting = greets({ name: "John", surname: "Smith" });

displayGreeting();

const s = 4;
s ||= 0;
s = 3;
