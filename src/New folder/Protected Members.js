// var Person = (function () {
//   var protectedMembers;

//   function capitalize(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   function PersonConstructor(name, surname, protected) {
//     protectedMembers = protected || {};
//     protectedMembers.capitalize = capitalize;

//     this.name = capitalize(name);
//     this.surname = capitalize(surname);
//   }

//   return PersonConstructor;
// })();

// function Developer(name, surname, knownLanguage) {
//   var parentProtected = {};
//   Person.call(this, name, surname, parentProtected);
//   this.knownLanguage = parentProtected.capitalize(knownLanguage);
// }


  var Person4 = (function() {
    var protectedMembers

    function capitalize(string){
        return string.charAt(0) = string.slice(1)
    }

    function PersonConstructor(name, surname, protected){
        protectedMembers = protected || {}
        protectedMembers.capitalize = capitalize

        this.name = capitalize(name)
        this.surname = capitalize(surname)
    }
    return PersonConstructor
 }()) 

 function Programmer(name, surname, knownLanguage){
    var parentProtected = {}
    Person4.call(this, name, surname, parentProtected)
    this.knownLanguage = parentProtected.capitalize(knownLanguage)
 } 