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

export default {};