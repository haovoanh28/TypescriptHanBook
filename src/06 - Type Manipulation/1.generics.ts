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

let myIdentity1: <T>(arg: T) => T = identity2;
