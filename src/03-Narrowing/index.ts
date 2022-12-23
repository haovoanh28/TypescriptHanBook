// https://www.typescriptlang.org/docs/handbook/2/narrowing.html
// The process of refining types to more specific types than declared is called narrowing.

function padLeft(padding: number | string, input: string) {
    console.log(padding); // padding here is of type `number` or `string`

    if (typeof padding === "number") {
        return " ".repeat(padding) + input; // padding here is of type `number`
    }
    return padding + input; // padding here is of type `string`
}

// Truthiness narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing
// Narrow when Javascript coercion happens
function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
        for (const s of strs) {
            console.log(s);
        }
    } else if (typeof strs === "string") {
        console.log(strs);
    }
}

// Equality narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#equality-narrowing
// TypeScript also uses switch statements and equality checks like ===, !==, ==, and != to narrow types. For example:
function equalityNarrowing(x: string | number, y: string | boolean) {
    if (x === y) {
        // Because of strict equal check, x and y must have the same type to continue the flow.
        //  => x & y have type `string` in common.
        //  => When x & y are equal type => Both are `string`.
        console.log(x);
        console.log(y);
    } else {
        console.log(x);
        console.log(y);
    }
}

// JavaScript’s looser equality checks with == and != also get narrowed correctly.
// checking whether something == null actually not only checks whether it is specifically the value null -
// it also checks whether it’s  potentially undefined.
// The same applies to == undefined: it checks whether a value is either null or undefined.
interface Container {
    value: number | null | undefined;
}

function multipleValue(container: Container, factor: number) {
    // Remove both `null` and `undefined` from the type
    if (container.value != null) {
        console.log(container.value); // container.value is now of type `number`
    }
}

// The `in` operator narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing
// Used to narrow object type
type Fish = { swim: () => void }
type Bird = { fly: () => void }
type Human = {
    swim: () => void;
    punch: () => void
}

// Note the `return` keyword => It will make the code outside the first `if` the false branch
function move(animal: Fish | Bird) {
    if ("swim" in animal) { // `true` branch
        return animal.swim(); // animal here only has method `swim`
    }

    // Since if the above statement is matched, the function will return
    //  => this context is kind of `else` branch
    //  => animal here only has method `fly`
    return animal.fly();
}

function move2(species: Fish | Bird | Human) {
    if ("swim" in species) {
        species.swim();
    } else {
        species.fly();
    }
}

// `instanceof` narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing
// Used to check if a value is an instance of another value
function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toLocaleDateString());
    } else {
        console.log(x.toUpperCase());
    }
}

// Assignment narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#assignments
// TS checks the right side of the assignment to narrow the type of the left side
// TS checks the declared type (the first type of the variable) to verify assignability
let x = Math.random() < 0.5 ? 10 : "random";
x = 5; // number can be assigned to x because it's part of the declared type
x = "3"; // string can be assigned to x because it's part of the declared type
x = false; // but boolean can't because it isn't part of the declared type

// Control flow analysis
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#control-flow-analysis
// TS narrows type as it encounters type guards and assignments.
function controlFlowAnalysisExample() {
    let x: number | string | boolean;
    x = Math.random() < 5;
    console.log(x); // x is boolean;

    if (Math.random() > 1) {
        x = 5;
        console.log(x);
    } else {
        x = "some string";
        console.log(x);
    }

    // x is number | string, miss boolean. Why ?
    // Because on the above `if` branch, there are 2 case that can change the value of x
    //  => It's either a number or a string => x is of type number | string
    return x;
}

// Type predicates
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
// It's user-defined type guard: A function whose return is a TYPE PREDICATE.
// `pet is Fish` is type predicate. It's in form `parameterName is Type`,
// where `parameterName` must be the name of parameter from the current function signature.

declare function getSmallPet(): Fish | Bird;

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

let myPet = getSmallPet();

if (isFish(myPet)) {
    // pet is Fish
    console.log(myPet.swim);
} else {
    // pet is Bird
    console.log(myPet.fly);
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
// In addition, classes can use `this is Type` to narrow their type
// https://www.typescriptlang.org/docs/handbook/2/classes.html#this-based-type-guards

// Discriminated unions
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// When every type in a union has a common property with literal types => TS marks it as `discriminated unions`
// => Narrow out the member of union

// The problem with this is that type-checker doesn't have any way to know whether
// `radius` or `sideLength` are present based on `kind` property.
interface Shape1 {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
}

// Tell type-checker what we know.
interface ICircle {
    kind: "circle"; // discriminant property
    radius: number;
}

interface ISquare {
    kind: "square"; // discriminant property
    sideLength: number;
}

interface ITriangle {
    kind: "triangle";
    sideLength: number;

}

type Shape2 = ICircle | ISquare | ITriangle;

function handleShape1(shape: Shape1) {
    if (shape.kind == "circle") {
        // TS doesn't know radius will belong to kind circle
        //  1. Check undefine for radius (It's BAD because it can cause error-prone since the shape also can access property `sideLength`).
        //  2. Refactor type Shape.
        console.log(Math.PI * shape.radius ** 2);
        console.log(Math.PI * shape.sideLength ** 2); // We can access sideLength although the kind is circle.
    }
}

function handleShape2(shape: Shape2) {
    if (shape.kind == "circle") {
        // Now the error is gone and we can only access `radius`.
        console.log(Math.PI * shape.radius ** 2);
    }

    // Another way
    switch (shape.kind) {
        case "circle":
            console.log(shape.radius);
            break;
        case "square":
            console.log(shape.sideLength);
            break;
        default:
            const _exhaustiveCheck: never = shape; // Missing handler for some cases
            return _exhaustiveCheck;
    }
}


export default {};