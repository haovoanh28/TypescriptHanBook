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


export default {};