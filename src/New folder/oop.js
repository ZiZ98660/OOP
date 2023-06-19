function TheatreSeats() {
  this._seats = [];
}

TheatreSeats.prototype.placePerson = function (person) {
  this._seats.push(person);
};

// A meta-closure approach
var TheatreSeats1 = (function () {
  var seats = [];

  function TheatreSeats1Constructor() {
    this.maxSize = 10;
  }

  TheatreSeats1Constructor.prototype.placePerson = function (person) {
    seats.push(person);
  };

  TheatreSeats1Constructor.prototype.countOccupiedSeats = function () {
    return seats.length;
  };

  TheatreSeats1Constructor.prototype.isSoldOut = function () {
    return seats.length >= this.maxSize;
  };

  TheatreSeats1Constructor.prototype.countFreeSeats = function () {
    return this.maxSize - seats.length;
  };

  return TheatreSeats1Constructor;
})();

// Managing isolated private members
var TheaterSeats = (function () {
  var priv = {};
  var id = 0;

  function TheaterSeatsConstructor() {
    this.id = id++;
    this.maxSize = 10;

    priv[this.id] = {};
    priv[this.id].seats = [];
  }

  TheaterSeatsConstructor.prototype.placePerson = function (person) {
    priv[this.id].seats.push(person);
  };

  TheaterSeatsConstructor.prototype.countOccupiedSeats = function () {
    return priv[this.id].seats.length;
  };

  TheaterSeatsConstructor.prototype.isSoldOut = function () {
    return priv[this.id].seats.length >= this.maxSize;
  };
  TheaterSeatsConstructor.prototype.countFreeSeats = function () {
    return this.maxSize - priv[this.id].seats.length;
  };
  return TheaterSeatsConstructor;
})();

var t1 = new TheaterSeats();

// function Person(name, surname) {
//   this.name = name;
//   this.surname = surname;
//   this.parent = null;
// }

// const Person = (name, surname) => {
//   name;
//   surname;
// };

// OOP using weakMaps

var CinemaSeats = (function () {
  var priv = new WeakMap();

  function CinemaSeatsConstructor() {
    var privMembers = { seats: [] };
    priv.set(this, privMembers);

    this.maxSize = 10;
  }

  CinemaSeatsConstructor.prototype.placePerson = function (person) {
    priv.get(this).seats.push(person);
  };
  return CinemaSeatsConstructor;
})();

var TheatreSeats = (function () {
  var priv = new WeakMap();

  var _ = function (instance) {
    return priv.get(instance);
  };

  function TheatreSeatsConstructor() {
    var privateMembers = { seats: [] };
    priv.set(this, privateMembers);

    this.maxSize = 10;
  }

  TheatreSeatsConstructor.prototype.placePerson = function (person) {
    return _(this).seats.push(person);
  };
})();

// Controlling access to public properties
//using getters amd setters
/* Object Literals  */
var person = {
  name: "john",
  surname: "doe",
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
  set fullName(value) {
    var parts = value.toString().split(" ");
    this.name = parts[0] || "";
    this.surname = parts[1] || "";
  },
};

/* Constructor */
var Person2 = (function () {
  function PersonConstructor() {
    var _email = ""; //Properties with Internal state

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
        return _email;
      },
      set: function (value) {
        var emailRegExp = /\w+@\w+\.\w{2,4}/i;
        if (emailRegExp.test(value)) {
          _email = value;
        } else {
          throw new Error("Invalid email address!");
        }
      },
    });
  }
  return PersonConstructor;
})();

var Person3 = (function () {
  var priv = new WeakMap();
  var _ = function (instance) {
    return priv.get(instance);
  };

  function PersonConstructor() {
    var privateMembers = { email: "" };
    priv.set(this, privateMembers);

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
        } else {
          throw new Error("Invalid email address!");
        }
      },
    });
  }
  return PersonConstructor;
})();

//CONSTRUCTOR
const P = (name, surname) => {
  name;
  surname;
};

var per = new P();

/*
After revision of OOP, study State management (ContextAPI, Zustand, useReducer 👍)
*/

function User() {
  var priv = new WeakMap();
  var _ = function (instance) {
    return priv.get(instance);
  };

  function UserConstructor() {
    var privMembers = {
      email: "",
    };

    priv.set(this, privMembers);

    this.name = "";
    this.surname = "";
  }

  Object.defineProperty(UserConstructor.prototype, "fullName", {
    get: function () {
      return `${this.name} ${this.surname}`;
    },
    set: function (value) {
      var parts = value.toString().split(" ");
      this.name = parts[0] || "";
      this.surname = parts[1] || "";
    },
  });

  Object.defineProperty(UserConstructor.prototype, "email", {
    get: function () {
      return _(this).email;
    },
    set: function (value) {
      var emailRegExp = /\w+@\w+\.\w{2,4}/i;
      emailRegExp.test(value)
        ? (_(this).email = value)
        : console.log("Type a valid email address, wanker!");
    },
  });
  return UserConstructor;
}

// var user = User();
// var user1 = new user();
// user1.email = "olutimedia@gmail.com";
