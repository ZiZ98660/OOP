Object.preventExtensions();
Object.freeze();
Object.seal();

/* 
If we want to prevent addition of new members to an object 
we can use the Object.preventExtensions() method
*/

var person = { name: "John", surname: "Smith" };
Object.preventExtensions(person);

person.age = 32;
console.log(person.age); //result: undefined

/*
We can use the Object.preventExtensions() method in a 
constructor in order to avoid property addition both to the 
constructor instances and the derived constructors
*/
function Person(name, surname) {
  this.name = name;
  this.surname = surname;

  Object.preventExtensions(this);
}

/*
With this definition, any derived constructor will not 
be able to add new properties:
*/
function Developer(name, surname, knownLanguage) {
  Person.apply(this, name, ...arguments);
  this.knownLanguage = knownLanguage;
}

var dev = new Developer("Mario", "Rossi", "JavaScript");
console.log(dev.knownLanguage); //result:    undefined

// Object.seal()

function Person1(name, surname) {
  this.name = name;
  this.surname = surname;

  Object.seal(this);
}

//Object.isSealed()

var person = new Person1();

if (!Object.isSealed(person)) {
  delete person.name;
}

/*
Even if we cannot add or remove members to a sealed object 
nor modify their configuration, we can still change 
its members value
*/

/*
Object.freeze() method
- makes objects immutable
We can check if an object is immutable using the Object.isFrozen() method:
*/
