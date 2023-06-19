var Person = (function () {
  var priv = new WeakMap();
  var _ = function (instance) {
    return priv.get(instance);
  };

  class PersonClass {
    constructor() {
      var privMembers = { email: "" };
      priv.set(this, privMembers);

      this.name = "";
      this.surname = "";

      Object.defineProperty(this, "fullName", {
        get: function () {
          return `${this.name} ${this.surname}`;
        },
        set: function (value) {
          var parts = value.toString().split(" ");
          this.name = parts[0] || "";
          this.surname = parts[1] || "";
        },
      });

      Object.defineProperty(this, "email", {
        get: function () {
          return _(this).email;
        },
        set: function (value) {
          var emailRegExp = /\w+@\w+\.\w{2,4}/i;
          if (emailRegExp.test(value)) {
            _(this).email = value;
            console.log("nice!");
          } else {
            throw new Error("Invalid email address");
          }
        },
      });
    }
  }
  return PersonClass;
})();

var p = new Person();

p.email = "bolu@email.com";

// **
// function mixEmployeeIdWith(superclass) {
//   return class extends superclass {
//     getEmployeeId() {
//       return "Employee id: " + this.id;
//     }
//   };
// }

// class ExtendedEmployee extends mixEmployeeIdWith(Employee) {}

// var johnDoe = new ExtendedEmployee("John", "Doe", "840931");

// console.log(johnDoe.getEmployeeId());

var GoogleUser = (function () {
  "use strict";
  var privProp = new WeakMap();
  var _ = function (instance) {
    return privProp.get(instance);
  };

  class GoogleUserClass {
    constructor() {
      var privateMembers = {
        email: "",
      };

      privProp.set(this, privateMembers);

      this.name = "";
      this.surname = "";
    }

    get fullName() {
      return `${this.name} ${this.surname}`;
    }

    set fullName(value) {}
  }

  return GoogleUserClass;
})();
