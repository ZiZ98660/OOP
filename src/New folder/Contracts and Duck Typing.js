/* Managing Dynamic Typing */
// Data typing and objects
// function SoftwareHouse() {
//   this.employees = [];
// }

// SoftwareHouse.prototype.hire = function (dev) {
//   this.employees.push(dev);
// };

class SoftwareHouse {
  constructor() {
    this.employees = [];
  }
  hire(dev) {
    this.employees.push(dev);
  }
}

class eSportsArena {
  constructor() {
    this.team = [];
  }
  recruit(gamer) {
    if (gamer instanceof Person) {
      this.team.push(gamer);
    } else {
      throw new Error("only humans can participate in this competition");
    }
  }

  isAProGamer() {
    var proTeam = [];
    var participant;
    var requiredModule;
    for (participant of this.team) {
      // participant = this.team[i]
      requiredModule = participant.proGamer();
      proTeam.push(requiredModule);
    }
    return proTeam;
  }
}

function SoftwareCompany() {
  this.employees = [];
  SoftwareCompany.prototype.hire = function (dev) {
    this.employees.push(dev);
  };
}

class SoftwareCompany {
  constructor() {
    this.employees = [];
  }
  hire() {
    this.employees.push(dev);
  }
}

// Typeof operator
/*The hire() method does no checking on the values passed.
This seems unlikely, since the software house would hire just
persons, not every type of object:
*/
var johnSmith = { name: "John", surname: "Smith" };
var lassie = { name: "Lassie", breed: "Collie" };
var table = { type: "round", legsNumber: 1 };
var swHouse = new SoftwareHouse();
swHouse.hire(johnSmith);
swHouse.hire(lassie);

swHouse.hire(table);
console.log(swHouse.employees.length); //result:  3

/*
Even if we use the typeof operator, we will not be able to
distinguish persons from other types of objects
*/

// Instanceof operator
/*
To overcome the limitation of the typeof operator on object values,
we can impose constraint on the objects that can be passed to the
hire() method by accepting only instances of the Person()
constructor function.
*/
function Person(name, surname) {
  this.name = name;
  this.surname;
}

var johnDoe = new Person("John", "Doe");
console.log(johnDoe instanceof Person); // result: true

class SoftwareHouse {
  constructor() {
    this.employees = [];
  }
  hire(dev) {
    if (dev instanceof Person) {
      this.employees.push(dev);
    } else {
      throw new Error("This software company only hires persons!");
    }
  }
}
/*
Now, the hire() method will accept only persons, throwing
an exception if a different typeof instance is passed as
an argument
*/
swHouse.hire(johnSmith);
swHouse.hire(lassie); //result:  Error
swHouse.hire(table); //result:  Error

class SoftwareHouseOne {
  constructor() {
    this.employees = [];
  }
  hire(dev) {
    if (dev instanceof Person) {
      this.employees.push(dev);
    } else {
      throw new Error("This software company only hires persons!");
    }
  }
  createSoftware() {
    var newSoftware = [];
    var employee;
    var module;
    for (var i = 0; i < this.employees.length; i++) {
      employee = this.employees[i];
      module = employee.writeCode();
      newSoftware.push(module);
    }
    return newSoftware;
  }
}

// Duck Typing
// implementing contracts and interfaces via duck typing
/*
- Duck typing is a programming technique where a contract
is established between a function and its caller, requiring
the parameters passed in by the caller to have specific members.
- Duck typing is not so much a type system as it is an
approach to treating objects as if they are certain types
*based on their behavior* rather than their declared type
*/

class SoftwareHouse1 {
  constructor() {
    this.employees1 = [];
  }

  hire1(dev) {
    if (dev && dev["writeCode"] && dev["writeCode"] instanceof Function) {
      this.employees1.push(dev);
    } else {
      throw new Error("The argument does not implement writeCode() method");
    }
  }
}

// class SoftwareCompany {
//   constructor() {
//     this.employees = [];
//   }

//   hire(dev) {
//     if (dev && dev["writeCode"] && dev["writeCode"] instanceof Function) {
//       this.employees.push(dev);
//     } else {
//       throw new Error("");
//     }
//   }
// }

/*
This approach works but it tends to make the hire() method very
verbose, especially if more than one member has to be checked.
*/

// A more readable and generic approach

var SoftwareHouse = (function () {
  // implements function is kept private by the IIFE
  function implement(obj, method) {
    return obj && obj[method] && obj[method] instanceof Function;
  }
  return class {
    constructor() {
      this.employees = [];
    }
    hire(dev) {
      if (implement(dev, "writeCode")) {
        this.employees.push(dev);
      } else {
        throw new Error("The argument does not implement writeCode method");
      }
    }
  };
})();

// properties could also be checked for
// var SoftwareCompany = (function () {
//   function implementsMethod(obj, method) {
//     return !!(obj && obj[method] && obj[method] instanceof Function);
//   }
//   function implementsProperty(obj, property) {
//     return !!(obj && obj[property] && !(obj[property] instanceof Function));
//   }
//   return class {
//     constructor() {
//       this.employees = [];
//     }
//     hire(dev) {
//       if (
//         implementsMethod(dev, "writeCode") &&
//         implementsProperty(dev, "name")
//       ) {
//         this.employees.push(dev);
//       } else {
//         throw new Error(
//           "The argument is not compatible with the required interface"
//         );
//       }
//     }
//   };
// })();

/* Note that the double not operator(!!) is used in order to force the 
conversion to Boolean, when the property or method is undefined. */

// A general solution
/*
We can attach the implementsMethod() and implementsProperty() methods 
to the prototype of the Object() constructor, as shown here:
*/
Object.prototype.implementsMethod = function (method) {
  return !!(this[method] && this[method] instanceof Function);
};
Object.prototype.implementsProperty = function (property) {
  return !!(this[property] && !(this[property] instanceof Function));
};

var johnSmith = {
  name: "John",
  surname: "Smith",
  writeCode: function () {
    return console.log("writes Java");
  },
};

johnSmith.implementsMethod("name"); //result: false
johnSmith.implementsMethod("writeCode"); //result: true
johnSmith.implementsMethod("writePoems"); //result: false

class SoftwareHouse {
  constructor() {
    this.employees = [];
  }

  hire(dev) {
    if (dev.implementsMethod("writeCode") && dev.implementsProperty("name")) {
      this.employees.push(dev);
    } else {
      throw new Error(
        "The argument is not compatible with the required interface"
      );
    }
  }
}

/*
  Even if this is a powerful approach, it should be pointed out that 
  in general attaching methods to the prototype of a built-in 
  constructor is not a good practice. It might clash with other 
extensions or future additions of the ECMAScript standard.
*/

// EMULATING INTERFACES WITH DUCK TYPING

class Interface {
  constructor(name, methods = [], properties = []) {
    this.name = name;
    this.methods = [];
    this.properties = [];

    for (let i = 0, len = this.methods.length; i < len; i++) {
      if (typeof methods[i] !== "string") {
        throw new Error(
          "interface constructor expects method to be passed in a string"
        );
      }
      this.methods.push(methods[i]);
    }

    for (let i = 0, len = properties.length; i < len; i++) {
      if (typeof properties[i] !== "string") {
        throw new Error(
          "Interface constructor expects property names to be passed in as a string"
        );
      }
      this.properties.push(properties[i]);
    }
  }
  isImplementedBy(obj) {
    var methodsLen = this.methods.length;
    var propertiesLen = this.properties.length;
    var currentMember;

    if (obj) {
      // check methods
      for (let i = 0; i < methodsLen; i++) {
        currentMember = methodsLen[i];

        if (!obj[currentMember] || typeof obj[currentMember] !== "function") {
          throw new Error(`The object does not implement the 
          interface ${this.name}. Method ${currentMember} is not found.`);
        }
      }

      // check properties
      for (let i = 0; i < propertiesLen; i++) {
        currentMember = propertiesLen[i];

        if (!obj[currentMember] || typeof obj[currentMember] === "function") {
          throw new Error(`The object does not implement the 
          interface ${this.name}. Property ${currentMember} is not found.`);
        }
      }
    } else {
      throw new Error("No object to check!");
    }
  }
}

/*
- In essential parts, the class constructor takes three arguments: 
the name of the interface, an array of method names, and an array 
of property names. 

- By creating an instance of the Interface class, we are declaring 
the existence of a contract requiring the implementation
of the methods and properties passed as arguments

- Now, we can easily create an interface requiring the constraints 
an object must comply with in order to interact with other objects.

- For example, we can create an interface that establishes the 
criteria by which a candidate can be hired:
*/

var IHireable = new Interface("IHireable", ["writeCode"], ["name"]);

class Google {
  constructor() {
    this.employees = [];
  }

  hire(dev) {
    IHireable.isImplementedBy(dev);
    this.employees.push(dev);
  }
}

var googleIT = new Google();

// Multiple interface implementation

class eSportsArena {
  constructor() {
    this.team = [];
  }
  recruit(gamer) {
    if (gamer instanceof Person) {
      this.team.push(gamer);
    } else {
      throw new Error("only humans can participate in this competition");
    }
  }

  isAProGamer() {
    var proTeam = [];
    var participant;
    var requiredModule;
    for (var i = 0; i < this.team.length; i++) {
      participant = this.team[i];
      requiredModule = participant.proGamer();
      proTeam.push(requiredModule);
    }
    return proTeam;
  }
}
