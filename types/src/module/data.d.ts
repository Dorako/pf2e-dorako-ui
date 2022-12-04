/** The size property of creatures and equipment */
export declare const SIZES: readonly ["tiny", "sm", "med", "lg", "huge", "grg"];
export declare type Size = typeof SIZES[number];
/** The rarity trait of creatures, equipment, spells, etc. */
export declare const RARITIES: readonly ["common", "uncommon", "rare", "unique"];
export declare type Rarity = typeof RARITIES[number];
export interface ValuesList<T extends string = string> {
    value: T[];
    custom: string;
}
/** Generic { value, label, type } type used in various places in actor/items types. */
export interface LabeledValue {
    label: string;
    value: number | string;
    type: string;
    exceptions?: string;
}
export interface LabeledString extends LabeledValue {
    value: string;
}
export interface LabeledNumber extends LabeledValue {
    value: number;
}
/** Literal numeric types */
export declare type ZeroToTwo = 0 | 1 | 2;
export declare type ZeroToThree = ZeroToTwo | 3;
export declare type ZeroToFour = ZeroToThree | 4;
export declare type ZeroToTen = ZeroToFour | 5 | 6 | 7 | 8 | 9 | 10;
