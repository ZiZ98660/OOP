/*
Singleton pattern
Factory pattern
Abstract factory pattern
Builder pattern
Object pool pattern
*/

//  Creating A Singleton
var IdGenerator = (function () {
  var instance;
  var counter = 0;
  var Constructor = function () {
    if (!instance) {
      instance = this;
    }
    return instance;
  };
  Constructor.prototype.newId = function () {
    return ++counter;
  };
  return Constructor;
})();

var IdGenerator = (function () {
  var instance;
  var counter = 0;
  return class {
    constructor() {
      if (!instance) {
        instance = this;
      }
      return instance;
    }
    newId() {
      return ++counter;
    }
  };
})();

// Object Factory

class Developer {
  constructor(skills, benefits) {
    this.skills = ["programming"].concat(skills);
    this.salary = 4000;
    this.benefits = ["computer"].concat(benefits);
  }
}
class Salesman {
  constructor(skills, benefits) {
    this.skills = ["selling"].concat(skills);
    this.salary = 50000;
    this.benefits = ["computer"].concat(benefits);
  }
}
class BusinessAnalyst {
  constructor(skills, benefits) {
    this.skills = ["analyzing"].concat(skills);
    this.salary = 60000;
    this.benefits = ["computer"].concat(benefits);
  }
}

class SoftwareHouse {
  constructor() {
    this.employees = [];
  }
  hireDeveloper() {
    var dev = new Developer(["JavaScript"], ["smartphone"]);
    this.employees.push(dev);
  }
  hireSalesman() {
    var sm = new Salesman(["communication"], ["smartphone", "car"]);
    this.employees.push(sm);
  }
  hireBusinessAnalyst() {
    var ba = new BusinessAnalyst(
      ["communication", "writing"],
      ["smartphone", "tablet"]
    );
    this.employees.push(ba);
  }
}

//Building the factory
/*
The application of the factory pattern frees our class from the 
responsibility of getting objects whose creation process 
may be complex and out of its main goal
*/
class RecruitmentAgency {
  getStaffMember(role, skills, benefits) {
    var member;

    switch (role.toLowercase()) {
      case "dev":
        member = new Developer(skills, benefits);
        break;
      case "sale":
        member = new Salesman(skills, benefits);
        break;
      case "ba":
        member = new BusinessAnalyst(skills, benfits);
        break;
      default:
        throw new Error("Unable to hire people for the role " + role);
    }
    return member;
  }
}

var agency = new RecruitmentAgency();

var newDevStaff = agency.getStaffMember("dev", ["C++, C#"], ["tablet"]);

// Factory with constructor registration

class RecruitmentAgency1 {
  constructor() {
    this.objConstructors = {};
  }
  register(role, constructor) {
    this.objConstructors[role] = constructor;
  }

  getStaffMember(role, skills, benefits) {
    var objConstructor = this.objConstructors[role];
    var member;

    if (objConstructor) member = new objConstructor(skills, benefits);
    return member;
  }
}

var agency1 = new RecruitmentAgency1();
agency1.register("dev", Developer);
agency1.register("ba", BusinessAnalyst);
agency1.register("sale", Salesman);
