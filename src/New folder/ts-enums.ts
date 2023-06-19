enum AnimalFlags {
  None = 0,
  HasClaws = 1 << 0,
  CanFly = 1 << 1,
}

type Animal = {
  flags: AnimalFlags;
};

const printAnimalAbilities = (animal: Animal) => {
  let animalFlags = animal.flags;

  animalFlags & AnimalFlags.HasClaws ? console.log("animal has claws") : "";

  animalFlags & AnimalFlags.CanFly ? console.log("animal can fly") : "";

  if (animalFlags == AnimalFlags.None) {
    console.log("nothing");
  }
};

let animal: Animal = {
  flags: AnimalFlags.None,
};

// Bitwise operators
animal.flags |= AnimalFlags.HasClaws; //used to add flags
animal.flags &= ~AnimalFlags.HasClaws; //used to clear a flag
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
/'|' is used to combine flags/;

// String Enums

export enum EvidenceTypeEnum {
  UNKNOWN = "",
  PASSPORT_VISA = "passport_visa",
  PASSPORT = "passport",
  SIGHTED_STUDENT_CARD = "sighted_student_edu_id",
  SIGHTED_KEYPASS_CARD = "sighted_keypass_card",
  SIGHTED_PROOF_OF_AGE_CARD = "sighted_proof_of_age_card",
}

type Evidence = {
  cardTypes: EvidenceTypeEnum;
};

// let someStringFromBackend: Evidence = {
//     cardTypes: EvidenceTypeEnum.UNKNOWN || EvidenceTypeEnum.PASSPORT
// }

const printCardType = (someStringFromBackend) => {
  const value: EvidenceTypeEnum = someStringFromBackend;

  if (value === EvidenceTypeEnum.PASSPORT) {
    console.log("You provided a passport");
    console.log(value);
  }
  if (value === EvidenceTypeEnum.SIGHTED_KEYPASS_CARD) {
    console.log("You provided a key pass card");
    console.log(value);
  }
  if (value === EvidenceTypeEnum.PASSPORT_VISA) {
    console.log("You provided a passport visa");
    console.log(value);
  }
};

// Enum with static functions
// enum + namespace merging adds static method to an enum
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

namespace Weekday {
  export const isBusinessDay = (day: Weekday): boolean => {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        // true;
        return true;
    }
  };
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;

var d = Weekday.isBusinessDay(sun);

enum Players {
  Messi,
  Ronaldo,
  Pele,
  Hazard,
  Maradonna,
  Neymar,
}

// namespace Players {
//     export const isGOAT = (player: Players) => {
//         switch(player){
//             case Players.Hazard:
//             case Players.Neymar:
//                 return false
//             default: true
//                 return true
//         }
//     }
// }

namespace Players {
  export const isGOAT = (player: Players) => {
    switch (player) {
      case Players.Hazard:
      case Players.Neymar:
        return false;
      default:
        true;
        return true;
    }
  };
}

const ney = Players.Neymar;

console.log(Players.isGOAT(ney));

// you can split (and extend) an enum definition across multiple files
enum Color {
  Red,
  Green,
  Blue,
}

enum Color {
  DarkRed = 3,
  DarkGreen,
  DarkBlue,
}

window.helloWorld = () => console.log("hello world");
window.helloWorld();
// window.helloWorld('g')

String.prototype.endsWith = function (suffix: string): boolean {
  var str: string = this;
  return (str && str.indexOf(suffix, str.length - suffix.length)) !== -1;
};

String.prototype.capitalize = function capitalize() {
  var str: string = this;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const str: string = "ray";

str.capitalize();
