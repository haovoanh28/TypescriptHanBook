// Optional properties
// In JavaScript, if you access a property that doesn’t exist, you’ll get the value undefined rather than a runtime error.
// Because of this, when you read from an ptionoal property, you’ll have to check for undefined before using it.
function printName(obj: { first: string; last?: string }) {
    // Error - might crash if 'obj.last' wasn't provided!
    console.log(obj.last.toUpperCase());

    if (obj.last !== undefined) {
        // implement
    }

    // ES6
    console.log(obj.last?.toUpperCase());
}

// Both OK
printName({first: "Bob"});
printName({first: "Alice", last: "Alisson"});

// Union Types
// Each type in union is called a union member
function printId(id: number | string) {
    console.log("Your ID is: " + id)

    // TS will only allow operation if it is valid for EVERY MEMBER of the union.
    // Because of .toUpperCase() only available on `string`, it will cause error.
    console.log(id.toUpperCase());

    // Solution: narrow the union
    // Narrowing occurs when Typescript can deduce a more specific type for a value based on the structure of the code
    if (typeof id == "string") {
        console.log(id.toUpperCase());
    }
    else {
        // Here, id has type `number`
        console.log(id);
    }
}

export default {};