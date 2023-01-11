// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
// Format SomeType extends OtherType ? TrueType : FalseType;
interface Animal {
    live(): void;
}

interface Dog extends Animal {
    woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

// The power of conditional types comes from using them with generics.
interface IdLabel {
    id: number /* some fields */
    ;
}

interface NameLabel {
    name: string /* other fields */
    ;
}

// Bad version
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
}

// Improve version
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

// We can then use that conditional type to simplify our overloads down to a single function with no overloads.
function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
}

let a = createLabel2(1);
let b = createLabel2("a");
let c = createLabel2(Math.random() ? "hello" : 42);
let d = createLabel2(false);

export default {};