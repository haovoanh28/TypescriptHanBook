// Working with Generic Type Variables
function identity1<T>(arg: T): T {
    if (typeof arg == "string") {
        console.log(arg.length);
    }
    return arg;
}

// Generic Types
function identity2<T>(arg: T): T {
    return arg;
}

interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity1: GenericIdentityFn<string> = identity2;

// Generic Constrain
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints
interface LengthWise {
    length: number;
}

function loggingIdentity<T extends LengthWise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Using type parameter that is constrained by another type parameter
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = {a: 1, b: 2, c: 3, d: 4};
getProperty(x, "m");

export default {};