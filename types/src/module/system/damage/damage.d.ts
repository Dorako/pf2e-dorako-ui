/** The possible standard damage die sizes. */
export declare type DamageDieSize = "d4" | "d6" | "d8" | "d10" | "d12";
/** Provides constants for typical damage categories, as well as a simple API for adding custom damage types and categories. */
export declare const DamageCategory: Readonly<{
    /**
     * Physical damage; one of bludgeoning, piercing, or slashing, and usually caused by a physical object hitting you.
     */
    PHYSICAL: string;
    /**
     * Energy damage; one of acid, cold, electricity, fire, or sonic. Generally caused by either magic or strong natural
     * phenomena (like storms, harsh weather, etc).
     */
    ENERGY: string;
    /**
     * Alignment damage; one of chaotic, evil, good, or lawful. Generally caused by special magic weapons and by some
     * extraplanar creatures.
     */
    ALIGNMENT: string;
    /**
     * Map a damage type to it's corresponding damage category. If the type has no category, the type itself will be
     * returned.
     */
    fromDamageType: (damageType: string) => string;
    /** Adds a custom damage type -> category mapping. This method can be used to override base damage type/category mappings. */
    addCustomDamageType: (category: string, type: string) => void;
    /** Removes the custom mapping for the given type. */
    removeCustomDamageType: (type: string) => boolean;
    /** Get a set of all damage categories (both base and custom). */
    allCategories: () => Set<string>;
    /** Get a set of all of the base rule damage types. */
    baseCategories: () => Set<string>;
    /** Get a set of all custom damage categories (exluding the base damage types). */
    customCategories: () => Set<string>;
    /** Get the full current map of damage types -> their current damage category (taking custom mappings into account). */
    currentTypeMappings: () => Record<string | number, string>;
    /** Map a damage category to the set of damage types in it. */
    toDamageTypes: (category: string) => Set<string>;
    /** Clear all custom damage type mappings. */
    clearCustom: () => void;
}>;
/** Maps damage types to their damage category; these are the immutable base mappings used if there is no override. */
export declare const BASE_DAMAGE_TYPES_TO_CATEGORIES: Readonly<Record<string, string>>;
/** Custom damage type mappings; maps damage types to their damage category. */
export declare const CUSTOM_DAMAGE_TYPES_TO_CATEGORIES: Record<string, string>;
