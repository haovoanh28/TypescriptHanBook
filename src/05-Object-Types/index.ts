// 01 - Property Modifiers
// Each property in an object type can have a couple of things:
//  - type
//  - is optional ?
//  - is writable ?

// Optional Properties
type Shape = {}

declare function getShape(): Shape;

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

// Provide default value for optional properties to get rid of checking undefined process.
function paintShape({shape, xPos = 0, yPos = 0}: PaintOptions) {
    // For optional parameters, remember to check undefined.
    console.log("x coordinate at: ",);
}

const shape = getShape();
paintShape({shape: shape});
paintShape({shape, xPos: 100});
paintShape({shape, yPos: 100});
paintShape({shape, xPos: 100, yPos: 100});

// `readonly` Properties
// A `readonly` property can't be written
// It won't change any behavior at runtime
interface SomeType {
    readonly prop: string;
}

function doSomething(obj: SomeType) {
    console.log(obj.prop); // can read;
    obj.prop = "value"; // can't write
}

// Using `readonly` on object just make sure that the property can't be re-assigned.
// But we still can change the value of object member.
interface Home {
    readonly resident: {
        name: string; age: number
    };
}

function visitForBirthday(home: Home) {
    home.resident.age = 10; // can update property's members.
    // but can't re-assign.
    home.resident = {
        name: "A",
        age: 12
    };
}

// TS won't check `readonly` when check whether 2 types are compatible
// Readonly property can be changed via alias
interface Person {
    name: string;
    age: number;
}

interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person = {
    name: "Xiao",
    age: 0
};

let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age); // print 0
writablePerson.age++;
console.log(readonlyPerson.age); // print 1

// 02 - Index Signatures
// Sometimes you don't know all the names of a type's properties ahead of time, but you do know the shape of value
//  => Use index signatures to describe the type of possible value.
interface StringArray {
    [index: number]: string;
}

declare function getStringArray(): StringArray;

const myArray: StringArray = getStringArray();

// When we index with a number, it will return a value type string.
const secondItem = myArray[1];

// String index signatures will enforce that all property match their return type.
// This is because the string index declares that obj.property is also available as object["property"]
interface NumberDictionary {
    [index: string]: number | string;

    length: number;
    name: string;
}

// Make index signatures `readonly` to prevent assignment to their indices
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

declare function getReadonlyStringArray(): ReadonlyStringArray;

let myReadonlyStringArray: ReadonlyStringArray = getReadonlyStringArray();
myReadonlyStringArray[0] = "value";

// 03 - Extending Types
interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

interface AnotherInterface {
}

interface AddressWithUnit extends BasicAddress, AnotherInterface {
    unit: string;
}

// 04 - Intersection Types
// Combine existing object type. It's kinda like extending type in `interface`
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

type ColorfulCircle = Colorful & Circle;

function draw(circle: Colorful & Circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}

draw({color: "blue", radius: 42});
draw({color: "red", raidus: 42}); // miss-spell

// Interfaces vs Intersections
// The main difference between the two is how conflicts are handled.
// And this is also the reason why you should choose one over the other.

// 05 - Generic Object Types
interface Box<T> {
    contents: T;
}

let x: Box<string> = {
    contents: "hello world"
};

function setContent<T>(box: Box<T>, newContents: T) {
    box.contents = newContents;
}

// Since type aliases, unlike interfaces, can describe more than just object types, we can also use them to write other kinds of generic helper types.
type OrNull<T> = T | null;
type OneOrMany<T> = T | T[];
type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>;
type OneOrManyOrNullStrings<T> = OneOrManyOrNull<string>;

// - The `array` Type
// These are equal
let myArr1: string[] = [];
let myArr2: Array<string> = [];
let myArr3: Array<string> = new Array<string>();

// - The `ReadonlyArray` Type
// The ReadonlyArray is a special type that describes arrays that shouldn’t be changed.
function doStuff(values: ReadonlyArray<string>) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // ...but we can't mutate 'values'.
    values.push("aa");
}

// Short hand syntax
let readonlyStr1: ReadonlyArray<string> = ["a", "b", "c"];
let readonlyStr2: readonly string[] = ["a", "b", "c"];

// 06 - Tuple Types
// Think of it as fixed array.
type StringNumberPair = [string, number];

// or
interface IStringNumberPair {
    length: 2;
    0: string;
    1: number;
}

function doSomethingWithTuple(pair: StringNumberPair) {
    const a = pair[0];
    const b = pair[1];
    const c = pair[2];

    // Destruct type
    const [val1, val2] = pair;
    console.log(val1);
    console.log(val2);
}

doSomethingWithTuple(["hello", 2]);

type Either2dOr3d = [number, number, number?]

function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord;
}

// Tuples can also have rest elements, which have to be an array/tuple type
type StringNumberBooleans = [string, number, ...boolean[]]; // Start with `string`, `number`, ending with any number of `boolean`
type StringBooleansNumber = [string, ...boolean[], number]; // Start with `string`, end with `number`, anything between is `boolean`
type BooleansStringNumber = [...boolean[], string, number]; // Start with any number of `boolean`, end with string and number

// A tuple with a rest element has no set “length” - it only has a set of well-known elements in different positions.
const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// Why this is useful ?
// It allow TS to correspond tuples with parameter lists.
// Tuples can be used in rest parameters and arguments.
function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
}

// equivalent to
function readButtonInput2(name: string, version: number, ...input: boolean[]) {
}

// `readonly` Tuple Type
function doSomethingWithReadonlyTuple(pair: readonly [string, number]) {
    pair[0] = "hello!";
}

// Tuples tend to be created and left un-modified in most code, so annotating tuple as `readonly` when possible is a good default.
// Important that array literal with `const` assertion is equal to `readonly` tuple
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}

// point is `readonly. So it won't be compatible with [number, number]
// To fix this, change argument to [x, y]: readonly [number, number]
distanceFromOrigin(point);
export default {};