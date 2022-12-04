export declare class MystifiedTraits {
    private static mystifiedTraits;
    static compile(): void;
    /** Exclude any mystified traits from the provided trait list */
    static has(trait: string): boolean;
}
export declare const PHYSICAL_ITEM_TYPES: readonly [
    "armor",
    "backpack",
    "consumable",
    "equipment",
    "treasure",
    "weapon",
];
export declare const TRADITION_TRAITS: readonly ["arcane", "primal", "divine", "occult"];
