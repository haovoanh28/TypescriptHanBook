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
    } else {
        // Here, id has type `number`
        console.log(id);
    }
}

// Type Alias: Give the type a name.
type ID = number | string;

// Interfaces: Another way to name an object type
interface Point {
    x: number;
    y: number;
}

function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord({x: 3, y: 7});

// Differences Between Type Aliases and Interfaces
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

export default {};