// Other Types to Know About
// https://www.typescriptlang.org/docs/handbook/2/functions.html#other-types-to-know-about

// Rest Parameters and Arguments
// Rest Paremeters
// The type of rest parameters must be in form of Array<T> or T[] or a tuple type
function mutiply(n: number, ...m: number[]) {
    return m.map(x => n * x);
}

const a = mutiply(10, 1, 2, 3, 4);

// Rest Arguments
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// In TS, array is mutable => It can change value after the creation.
// `args` variable can be added new value later, but Math.atan2 only receive 2 parameters
//  => Using rest arguments will not accept
const args = [8, 5];

// Interred as 2-length tuple
const argsFixed = [8, 5] as const;
const angle = Math.atan2(...argsFixed);

// Parameter Destructuring
function sum({a, b, c}: { a: number, b: number, c: number }) {
    console.log(a + b + c);
}

sum({a: 10, b: 3, c: 9});

export default {};

