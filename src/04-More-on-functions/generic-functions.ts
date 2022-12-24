// - Generic Functions
// https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions
// When we need to write a function where the type of the input relate to the type of the output,
// or where the types of 2 inputs are related in some way.
// In TypeScript, generics are used when we want to describe a correspondence between two values
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

// - Inference
// TS automatically choose the type for type parameter (<T>)
const s = firstElement(["a", "b", "c"]);
const n = firstElement([1, 2, 3]);

function map<T, U>(arr: T[], fn: (value: T) => U): U[] {
    return arr.map(fn);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// - Constrain
// Limit the type of kind that a type parameter can access

// Limit the generic type so that it only contains property `length
function findLongest<T extends { length: number }>(a: T, b: T): T {
    if (a.length > b.length) {
        return a;
    } else {
        return b;
    }
}

const longestArr = findLongest([1, 2], [1, 2, 3]);
const longestStr = findLongest("123", "1234");
// Because numbers don't have a `length` property => Cause error
const notOk = findLongest(10, 100);

export default {};