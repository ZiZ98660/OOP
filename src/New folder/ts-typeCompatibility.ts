// structural typing
interface Point {
  x: number;
  y: number;
}

class Point2D {
  constructor(public x: number, public y: number) {}
}

let p: Point;
// OK, because of structural typing
p = new Point2D(1, 2);

// bi-variant
/** Event Hierarchy */
interface Event {
  timestamp: number;
}
interface MouseEvent extends Event {
  a: number;
  b: number;
}
interface KeyEvent extends Event {
  keycode: number;
}

/** Sample event listener */
enum EventType {
  Mouse,
  Keyboard,
}

type E = (e: Event) => void;

function addEventListener(eventType: EventType, handler: (n: Event) => void) {}

// Unsound, but useful and common
// addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.a + "," + e.b))

// Undesirable alternatives in presence of soundness
addEventListener(EventType.Mouse, (e: Event) =>
  console.log((<MouseEvent>e).a + "," + (<MouseEvent>e).b)
);
addEventListener(EventType.Mouse, <E>(
  ((e: MouseEvent) => console.log(e.a + "," + e.b))
));

/** Type Hierarchy */
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

let iTakePoint2D = (point: Point2D) => {
  /* do something */
};
let iTakePoint3D = (point: Point3D) => {
  /* do something */
};

iTakePoint3D = iTakePoint2D;
// iTakePoint2D = iTakePoint3D
//Type '(point: Point3D) => void' is not assignable to type '(point: Point2D) => void'.
