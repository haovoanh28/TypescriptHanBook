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

export default {};