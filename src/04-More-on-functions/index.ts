// Function type expressions
// The simplest way to DESCRIBE a function.
function greeter(fn: (a: string) => void) {
    fn("Hello, World");
}

// Call signatures
// https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures
// Describe something callable with PROPERTIES.
type DescriptableFunction = {
    description: string;

    // This make DescriptableFunction callable
    // Note the difference syntax is it uses `:` instead of `=>` to
    (someArg: number): boolean;
}

function doSomething(fn: DescriptableFunction) {
    console.log(fn.description + " return " + fn(6));
}

// Construct signature
// https://www.typescriptlang.org/docs/handbook/2/functions.html#construct-signatures
// Signature for constructor
type SomeObject = any;
type SomeConstructor = {
    new(s: string): SomeObject;
}

function constructorSignatureExample(ctor: SomeConstructor) {
    return new ctor("aa");
}

type CallOrConstruct = {
    new(s: string): Date;
    (n?: number): number;
}

export default {};