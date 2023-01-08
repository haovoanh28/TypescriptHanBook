// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

// We can use an indexed access type to look up a specific property on another type:
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
