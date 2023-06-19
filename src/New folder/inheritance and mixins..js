// /*
// INHERITANCE
//  If an object A inherits from an Object B then, A=B
// B = base/parent object
// - helps reduce code redundancy

// *BUILT-iN OBJECT CONSTRUCTOR*
// Object()
// */

// PROTOTYPES
// two ways of accessing object prototype
//- var objectPrototype = object.constructor.prototype
//- using Object.getPrototypeOf()
var person = new Object();
var prototypeOfPerson = Object.getPrototypeOf(person);

//can also be accessed via the __proto__ pseudo property

// isPrototypeOf() represent a method that returns a boolean value \
//to confirm if the Object has the said prototype

/*
CREATING OBJECTS
using =>
*/
Object.create();

/*
CREATING OBJECTS
null objects
*/
Object.create(null);

var myObject = Object.create(null);

var person = {
  name: "John",
  surname: "Doe",
};

var myObject = Object.create(person);

/*
CREATING OBJECTS
objects with specified properties
*/
var person = {
  name: "",
  surname: "",
};

var developer = Object.create(person, {
  knownLanguage: {
    writable: true,
    configurable: true,
  },
});

var user = {
  name: "",
  email: "",
  surname: "",
};

var developer = Object.create(user, {
  knownLanguage: {
    writable: true,
    enumerable: true,
  },
});
/*
Here, we added the knownLanguage property to the developer
object by specifying a property descriptor. As result,
the developer object will have the properties inherited from
its prototype object and the new property defined
 at the creation stage.
*/

/*
Creating prototypes using the ES6 syntax Object.setPrototypeOf()
*/
var person = { name: "John", surname: "Smith" };
var developer = { knownLanguage: "JavaScript" };

Object.setPrototypeOf(developer, person);

console.log(developer.name); //result: "John"
console.log(developer.surname); //result: "Smith"

/*
PROTOTYPE CHAINING
Inheritance of Constructors
*/
function Person1(name, surname) {
  this.name = name;
  this.surname = surname;
}

class Developer {
  constructor(name, surname, knownLanguage) {
    Person1.apply(this, arguments);
    this.knownLanguage = knownLanguage;
  }
}

var johnSmith = new Developer("John", "Smith", "JavaScript");
console.log(johnSmith.name); //result:  "John"
console.log(johnSmith.surname); //result:  "Smith"
console.log(johnSmith.knownLanguage); //result:  "JavaScript"

Developer.prototype = Object.create(Person1.prototype);
Developer.prototype.constructor = Developer;

class Person2 {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
  getFullName() {
    return this.name + " " + this.surname;
  }
}

class Developer1 extends Person2 {
  constructor(name, surname, knownLanguage) {
    super(name, surname);
    this.knownLanguage = knownLanguage;
  }
  displayCompetency() {
    console.log(`${super.getFullName()} knows ${this.knownLanguage}`);
  }
}

/*
CONTROLLING INHERITANCE
Overriding methods
*/

function Person3(name, surname) {
  this.name = name;
  this.surname = surname;
}

Person3.prototype.getFullName = function () {
  return this.name + " " + this.surname;
};

function Developer2(name, surname, knownLanguage) {
  Person3.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

Developer2.prototype = new Person3();
Developer2.prototype.constructor = Developer2;
Developer2.prototype.getFullName = function () {
  return "Dev" + Person3.prototype.getFullName.call(this);
};

function User(name, surname){
  this.name = name
  this.surname = surname
}

User.prototype.getFullName = function(){
  return this.name + " " + this.surname;
}

function Agent(name, surname, contractLength){
  User.apply(this, name, surname)
  this.contractLength = contractLength
}

Agent.prototype = new User()
Agent.prototype.constructor = Agent
Agent.prototype.getFullName = function(){
  return 'Agent ' + User.prototype.getFullName.call(this)
}

/*
Any JavaScript function has the call() and apply()methods.
Both run the function in the context of the first argument,
but while call() accepts a list of values as the
function's parameters, apply() accepts an array of values
*/

var johnSmith = new Person("John", "Smith");
var marioRossi = new Developer("Mario", "Rossi", "JavaScript");
console.log(johnSmith.getFullName()); //result:"John Smith"
console.log(marioRossi.getFullName()); //result:"Dev Mario Rossi"

/* Overriding methods - ES6 Syntax */

class Developer extends Person {
  constructor(name, surname, knownLanguage) {
    super(name, surname);
    this.knownLanguage = knownLanguage;
  }

  getFullName() {
    return "Dev " + super.getFullName();
  }
}

/* Overriding Properties */
function Per(name, surname) {
  this.name = name;
  this.surname = surname;
}

Object.defineProperty(Per.prototype, "fullName", {
  get: function () {
    return this.name + " " + this.surname;
  },
});

function Dev(name, surname, knownLanguage) {
  Per.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

Dev.prototype = new Per();
Dev.prototype.constructor = Dev;

Object.defineProperty(Dev.prototype, "fullName", {
  get: function () {
    return "Dev " + this.name + " " + this.surname;
  },
});

/*
// Implementing multiple inheritance =>
Ability to inherit features from more than one
object or class at the same time
*/

function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

function Developer4(name, surname, knownLanguage) {
  Person.apply(this, arguments);
  this.knownLanguage = knownLanguage;
}

function Student(name, surname, subjectOfStudy) {
  Person.apply(this, arguments);
  this.subjectOfStudy = subjectOfStudy;
}

function DevStudent(name, surname, knownLanguage, subjectOfStudy) {
  Developer4.call(this, name, surname, knownLanguage);
  Student.call(this, name, surname, subjectOfStudy);
}

/*
Creating and using Mixins
**
The term mixin is usually used to specify a collection
of functions available to be shared among objects or classes
*/
var myMixin = {
  getFullName: function () {
    return this.name + " " + this.surname;
  },
};

/*
 It implements a generic function, not bound to a
 specific object constructor and available to be mixed
 with the members of other object.
**
In order to enable the mixing of the members, we need
a specific function such as the following
*/
function augment(destination, source) {
  for (var methodName in source) {
    if (source.hasOwnProperty(methodName)) {
      destination[methodName] = source[methodName];
    }
  }
  return destination;
}

function extend(destination, source){
  for(var method in source){
    if(source.hasOwnProperty(method)){
      destination[method] = source[method]
    }
  }
}
Object.assign
/*
ES6 method Object.assign() has exactly the same behavior
as the augment() function
**
With this tool, we can easily add the members of our mixin
to the members created by thePerson() constructor:
*/
augment(Person.prototype, myMixin);

var johnSmiths = new Person("John", "Smiths");
console.log(johnSmiths.getFullName()); //result: "John Smiths"

/*
A more accurate mixin function might allow us to select
which members to add:
*/
function augmentExtended(destination, source, ...methodNames) {
  if (methodNames) {
    for (var methodName of methodNames) {
      if (source.hasOwnProperty(methodName)) {
        destination[methodName] = source[methodName];
      }
    }
  } else {
    for (var methodName in source) {
      if (source.hasOwnProperty(methodName)) {
        destination[methodName] = source[methodName];
      }
    }
  }
  return destination;
}

augmentExtended(Person.prototype, namingMixin, "getFullName");
augmentExtended(Person.prototype, movingMixin, "goLeft", "goRight");
augmentExtended(
  Person.prototype,
  studyingMixin,
  "readTopic",
  "writeTopic",
  "repeatTopic"
);

//  MIXING CLASSES
class Employee {
  constructor(name, surname, id) {
    this.name = name;
    this.surname = surname;
    this.id = id;
  }
}

var workMixin = {
  getEmployeeId: function () {
    return "Employee id: " + id;
  },
};

augment(Employee.prototype, workMixin);

var maryJane = new Employee("Mary", "Jane", "853023");
console.log(maryJane.getEmployeeId());

// **
function mixEmployeeIdWith(superclass) {
  return class extends superclass {
    getEmployeeId() {
      return "Employee id: " + id;
    }
  };
}

class ExtendedEmployee extends mixEmployeeIdWith(Employee) {}

var johnDoe = new ExtendedEmployee("John", "Doe", "840931");

class User {
  constructor(name, surname, id, knownLanguage) {
    this.name = name;
    this.surname = surname;
    this.knownLanguage = knownLanguage;
    this.id = id;
  }
}

function mixNamingWith(superclass) {
  return class extends superclass {
    getFullName() {
      return this.name + " " + this.surname;
    }
  };
}

function mixEmployeeIdWith(superclass) {
  return class extends superclass {
    getEmployeeId() {
      return `
      Employee Name: ${this.getFullName()}
      Employee id:  ${this.id}
      `;
    }
  };
}

function mixKnownLanguageWith(superclass) {
  return class extends superclass {
    getKnownLanguage() {
      return "adept in " + this.knownLanguage;
    }
  };
}

class ExtendedUser extends mixNamingWith(
  mixEmployeeIdWith(mixKnownLanguageWith(User))
) {}

var maryJane = new ExtendedUser("Mary", "Jane", "89234", "Java");

console.log(maryJane.getFullName());

// console.log(("b" + "a" + +"a" + "a").toLowerCase());
