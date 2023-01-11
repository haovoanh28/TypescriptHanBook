// When you don’t want to repeat yourself, sometimes a type needs to be based on another type.
// Mapped types build on the syntax for index signatures, which are used to declare the types of properties which have not been declared ahead of time:

type Horse = {};

type OnlyBoolsAndHorses = {
    [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
    del: true,
    rodney: false,
};

// A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a `keyof`) to iterate through keys to create a type
type OptionsFlags<T> = {
    [Property in keyof T]: boolean
}

// In this example, OptionsFlags will take all the properties from the type Type and change their values to be a boolean.
type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;


export default {};