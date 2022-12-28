// Function Overloads
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
// Used when we want to specify a function that can be called in different ways,
// to do this, write some function signatures (2 or more), followed by the body of the function.
function makeDate(timestamp: number): Date; // Overload signatures
function makeDate(m: number, d: number, y: number): Date; // Overload signatures

// Function implementation
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// Overload Signatures and the Implementation Signature
// Rule:    The signature of the implementation is not visible from the outside.
//          When writing an overloaded function, you should always have two or more signatures above the implementation of the function.

// This is a common source of confusion. Often people will write code like this and not understand why there is an error:
function fn(x: string): void;
function fn() {
    // ...
}

// Expected to be able to call with zero arguments
fn();

// The implementation signature must also be compatible with the overload signatures.
function fn2(x: boolean): void;
function fn2(x: string): void;
function fn2(x: string | boolean) {

}

function fn3(x: string): string;
function fn3(x: number): boolean;
function fn3(x: string | number): string | boolean {
    if (typeof x === "string") {
        return "aaa";
    }

    return false;
}

// Writing Good Overloads
// https://www.typescriptlang.org/docs/handbook/2/functions.html#writing-good-overloads

// 01 - Always prefer parameters with union types instead of overloads when possible
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
    return x.length;
}

// This function is fine; we can invoke it with strings or arrays.
// However, we can’t invoke it with a value that might be a string or an array,
// because TypeScript can only resolve a function call to a single overload:
len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);

// Because both overloads have the same argument count and same return type, we can instead write a non-overloaded version of the function:
function len2(x: any[] | string) {
    return x.length;
}

// 02 - Declaring `this` in a Function
// When you need more control over what object `this` represents.
const user = {
    id: 123,

    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    },
};

interface User {
    id: number;
    admin: boolean;
}

declare function getDB(): DB;

interface DB {
    filterUsersAdmin(filter2: (this: User) => boolean): User[];
}

const db = getDB();
// Note that you need to use `function` not arrow function to get this behavior
const admins = db.filterUsersAdmin(function () {
    return this.admin;
});

export default {};