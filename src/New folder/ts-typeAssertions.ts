// const git = {}
// git.bar = 123

interface Git {
  bar: number;
  baz: string;
}

const git = {} as Git;
git.bar = 123;

var loo: any;
var bas = <string>loo;

var lou = <Git>{
  bar: 12,
};

var bez: Git = {
  bar: 45,
  baz: "free",
};

// Double assertion
const handler = (event: Event) => {
  // let element = event as HTMLElement: Error
  let element = event as unknown as HTMLElement;
};
