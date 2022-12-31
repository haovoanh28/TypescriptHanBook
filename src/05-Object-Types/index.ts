// Property Modifiers
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

export default {};