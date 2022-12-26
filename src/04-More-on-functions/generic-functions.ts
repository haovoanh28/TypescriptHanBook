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

// Working with constraint value
function findMinimumLength<T extends { length: number }>(obj: T, minimum: number): T {
    if (obj.length >= minimum) {
        return obj;
    } else {
        // Type '{ length: number; }' is not assignable to type 'T'. { length: number; }' is assignable to the constraint of type 'T',
        // but 'T' could be instantiated with a different subtype of constraint '{ length: number; }'.
        // Basically, i
        return {length: minimum};
    }
}

// Specifying Type Arguments
// https://www.typescriptlang.org/docs/handbook/2/functions.html#specifying-type-arguments
// When TS can't infer the intended type arguments in a generic call,
// we need to specify it.
function combine<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.concat(arr2);
}

// TS inferred type argument to number, which we don't want it.
const combineArr = combine([1, 2, 3], ["hello"]);
// Manually specify <T>
const combineArr2 = combine<string | number>([1, 2, 3], ["aaa", "bbb"]);

// Guidelines for writing good generic functions

// 1. Push Type Parameter Down
// Rule: When possible, use the type parameter itself rather than constraining it
function firstElement1<T>(arr: T[]) { // good
    return arr[0];
}

function firstElement2<T extends any[]>(arr: T) { // bad
    return arr[0];
}

const a = firstElement1([1, 2, 3]);
// TS infers return type as `any` because it resolves arr[0] expression
// using the constraint type, rather than 'waiting' to resolve the type that we passed in during the call.
const b = firstElement2([1, 2, 3]);

// 2. Use Fewer Type Parameters
// Rule: Always use as few type parameters as possible
function filter1<T>(arr: T[], func: (arg: T) => boolean): T[] { // good
    return arr.filter(func);
}

function filter2<T, F extends (arg: T) => boolean>(arr: T[], func: F): T[] { // bad
    // F doesn’t do anything but make the function harder to read and reason about!
    return arr.filter(func);
}

// 3. Type parameters should appear twice
// Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it


export default {};