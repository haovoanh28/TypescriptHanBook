// Optional Parameters
// https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters
// Rule: When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument
function optionalParameter(x?: number) {
    // x is actually `number` | `undefined` because unspecified parameters in JS get the value of `undefined`
    console.log(x?.toFixed());
}

// Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i); // invoked with 2 arguments
        callback(arr[i]); // invoked with 1 argument
    }
}

// What people usually intend when writing `index?` as an optional parameter
// is that they want both of these calls to be legal:
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

// This is actually mean is that callback might get invoked with one argument.
// TS will raise an error on possible undefined value
myForEach([1, 2, 3], (a, i) => console.log(i.toFixed()));

// In JS, if we call a function with more arguments than parameters, the extra arguments are simply ignored.
// TS behave the same way.
// So instead of writing optional parameter for callback, we should simply define it as a normal parameter,

function myForEach2(arr: any[], callback: (arg: any, index: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i); // invoked with 2 arguments
    }
}

// All are ok
// Since we always call callback function with 2 arguments => `a` and `i` always have value
//  => If we don't use `i` in the body of function, TS will simply ignore it.
myForEach2([1, 2, 3], (a) => console.log(a));
myForEach2([1, 2, 3], (a, i) => console.log(a, i));
myForEach2([1, 2, 3], (a, i) => console.log(i.toFixed()));



export default {};
