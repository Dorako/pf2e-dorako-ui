/**
 * Given an array and a key function, create a map where the key is the value that
 * gets returned when each item is pushed into the function. Accumulate
 * items in an array that have the same key
 * @param array
 * @param criterion
 * @return
 */
export declare function groupBy<T, R>(array: T[], criterion: (value: T) => R): Map<R, T[]>;
/**
 * Given an array, adds a certain amount of elements to it
 * until the desired length is being reached
 */
export declare function padArray<T>(array: T[], requiredLength: number, padWith: T): T[];
/**
 * Return a new object that combines all the keys and values from
 * both. If both have the same key, assign the value of the merge function.
 * Example:
 *     // returns {a: 3, b: 5, c: 0}
 *     combineObjects({a: 3, b: 4}, {b: 1, c: 0}, (a, b) => a+b)
 * @param first
 * @param second
 * @param mergeFunction if duplicate keys exist, both values
 * are passed into this function to return the result
 * @return
 */
export declare function combineObjects<V>(
    first: Record<RecordKey, V>,
    second: Record<RecordKey, V>,
    mergeFunction: (first: V, second: V) => V,
): Record<RecordKey, V>;
declare type RecordKey = string | number;
/**
 * Similar to combineObjects, just for maps
 * @param first
 * @param second
 * @param mergeFunction
 */
export declare function combineMaps<K, V>(
    first: Map<K, V>,
    second: Map<K, V>,
    mergeFunction: (first: V, second: V) => V,
): Map<K, V>;
export declare type Optional<T> = T | null | undefined;
/**
 * Returns true if the string is null, undefined or only consists of 1..n spaces
 */
export declare function isBlank(text: Optional<string>): text is null | undefined | "";
/**
 * Parses a string, number, null or undefined into a Number
 * @param value
 * @return parsed value or undefined/null if either was provided or
 * undefined if it couldn't be parsed as a number
 */
export declare function toNumber(value: Optional<string> | Optional<number>): Optional<number>;
/**
 * Used as a function reference
 */
export declare function add(x: number, y: number): number;
/**
 * Adds a + if positive, nothing if 0 or - if negative
 */
export declare function addSign(number: number): string;
/**
 * No idea why this isn't built in
 */
export declare function sum(values: number[]): number;
/**
 * Zip to arrays together based on a given zip function
 * @param a
 * @param b
 * @param zipFunction
 */
export declare function zip<A, B, R>(a: A[], b: B[], zipFunction: (a: A, b: B) => R): R[];
export interface Fraction {
    numerator: number;
    denominator: number;
}
/**
 * Continually apply a function on the result of itself until times is reached
 *
 * @param func
 * @param times
 * @param start start element, also result if times is 0
 */
export declare function applyNTimes<T>(func: (val: T) => T, times: number, start: T): T;
/**
 * Check if a key is present in a given object in a type safe way
 *
 * @param obj The object to check
 * @param key The key to check
 */
export declare function objectHasKey<O>(obj: O, key: keyof any): key is keyof O;
/**
 * Check if a value is present in the provided array. Especially useful for checking against literal tuples
 */
export declare function tupleHasValue<A extends readonly unknown[]>(
    array: A,
    value: unknown,
): value is A[number];
/**
 * The system's sluggification algorithm of entity names
 * @param name The name of the entity (or other object as needed)
 */
export declare function sluggify(entityName: string): string;
export declare function getActionIcon(actionType: string, fallback: string): string;
export declare function getActionIcon(actionType: string, fallback: string | null): string | null;
export declare function getActionIcon(actionType: string): string;
/**
 * Returns a character that can be used with the Pathfinder action font
 * to display an icon.
 */
export declare function getActionGlyph(actionType: string): string;
export declare function ErrorPF2e(message: string): Error;
export {};
