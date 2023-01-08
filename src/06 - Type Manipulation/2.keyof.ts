// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
// `keyof` take an object and produce string or numeric literal unions of its keys.

type Point = { x: number; y: number }
type P = keyof Point;

// If the type has a string or number index signature, keyof will return those types instead:
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

// M is string | number — this is because JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"].
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;


export default {};