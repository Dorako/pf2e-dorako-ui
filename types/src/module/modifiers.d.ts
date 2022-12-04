import { AbilityString } from "@actor/data/base";
import { DamageDieSize } from "@system/damage/damage";
export declare const PROFICIENCY_RANK_OPTION: readonly string[];
export declare function ensureProficiencyOption(options: string[], proficiencyRank: number): void;
/**
 * The canonical pathfinder modifier types; modifiers of the same type do not stack (except for 'untyped' modifiers,
 * which fully stack).
 */
export declare const MODIFIER_TYPE: Readonly<{
    readonly ABILITY: "ability";
    readonly PROFICIENCY: "proficiency";
    readonly CIRCUMSTANCE: "circumstance";
    readonly ITEM: "item";
    readonly POTENCY: "potency";
    readonly STATUS: "status";
    readonly UNTYPED: "untyped";
}>;
export declare type ModifierType = typeof MODIFIER_TYPE[keyof typeof MODIFIER_TYPE];
export interface RawModifier {
    /** The name of this modifier; should generally be a localization key (see en.json). */
    name: string;
    /** The display name of this modifier, overriding the name field if specific; can be a localization key (see en.json). */
    label?: string;
    /** If true, this modifier will be applied to the final roll; if false, it will be ignored. */
    enabled: boolean;
    /** If true, these custom dice are being ignored in the damage calculation. */
    ignored: boolean;
    /** If true, this modifier is a custom player-provided modifier. */
    custom: boolean;
    /** The damage type that this modifier does, if it modifies a damage roll. */
    damageType?: string;
    /** A predicate which determines when this modifier is active. */
    predicate: RawPredicate;
    /** If true, this modifier is only active on a critical hit. */
    critical?: boolean;
    /** The list of traits that this modifier gives to the underlying attack, if any. */
    traits?: string[];
}
/**
 * Represents a discrete modifier, either bonus or penalty, to a statistic or check.
 * @category PF2
 */
export declare class ModifierPF2e implements RawModifier {
    name: string;
    label?: string;
    /** The actual numeric benefit/penalty that this modifier provides. */
    modifier: number;
    /** The type of this modifier - modifiers of the same type do not stack (except for `untyped` modifiers). */
    type: ModifierType;
    enabled: boolean;
    /** The source which this modifier originates from, if any. */
    source?: string;
    /** Any notes about this modifier. */
    notes?: string;
    ignored: boolean;
    custom: boolean;
    damageType?: string;
    /** The damage category */
    damageCategory?: string;
    predicate: RawPredicate;
    critical?: boolean;
    traits?: string[];
    /** Status of automation (rules or active effects) applied to this modifier */
    automation: {
        key: string | null;
        enabled: boolean;
    };
    /**
     * Create a new modifier.
     * @param name The name for the modifier; should generally be a localization key.
     * @param modifier The actual numeric benefit/penalty that this modifier provides.
     * @param type The type of the modifier - modifiers of the same type do not stack (except for `untyped` modifiers).
     * @param enabled If true, this modifier will be applied to the result; otherwise, it will not.
     * @param source The source which this modifier originates from, if any.
     * @param notes Any notes about this modifier.
     */
    constructor(
        name: string,
        modifier: number,
        type: string,
        enabled?: boolean,
        source?: string,
        notes?: string,
    );
}
export declare type MinimalModifier = Pick<ModifierPF2e, "name" | "type" | "modifier">;
export declare const STRENGTH: Readonly<{
    withScore: (score: number) => ModifierPF2e;
}>;
export declare const DEXTERITY: Readonly<{
    withScore: (score: number) => ModifierPF2e;
}>;
export declare const CONSTITUTION: Readonly<{
    withScore: (score: number) => ModifierPF2e;
}>;
export declare const INTELLIGENCE: Readonly<{
    withScore: (score: number) => ModifierPF2e;
}>;
export declare const WISDOM: Readonly<{
    withScore: (score: number) => ModifierPF2e;
}>;
export declare const CHARISMA: Readonly<{
    withScore: (score: number) => ModifierPF2e;
}>;
export declare const AbilityModifier: Readonly<{
    /**
     * Create a modifier from a given ability type and score.
     * @param ability str = Strength, dex = Dexterity, con = Constitution, int = Intelligence, wis = Wisdom, cha = Charisma
     * @param score The score of this ability.
     * @returns The modifier provided by the given ability score.
     */
    fromAbilityScore: (ability: AbilityString, score: number) => ModifierPF2e;
}>;
export declare const UNTRAINED: Readonly<{
    atLevel: (_level: number) => ModifierPF2e;
}>;
export declare const TRAINED: Readonly<{
    atLevel: (level: number) => ModifierPF2e;
}>;
export declare const EXPERT: Readonly<{
    atLevel: (level: number) => ModifierPF2e;
}>;
export declare const MASTER: Readonly<{
    atLevel: (level: number) => ModifierPF2e;
}>;
export declare const LEGENDARY: Readonly<{
    atLevel: (level: number) => ModifierPF2e;
}>;
export declare const ProficiencyModifier: Readonly<{
    /**
     * Create a modifier for a given proficiency level of some ability.
     * @param level The level of the character which this modifier is being applied to.
     * @param rank 0 = untrained, 1 = trained, 2 = expert, 3 = master, 4 = legendary
     * @returns The modifier for the given proficiency rank and character level.
     */
    fromLevelAndRank: (level: number, rank: number) => ModifierPF2e;
}>;
/**
 * Represents the list of commonly applied modifiers for a specific creature statistic. Each
 * statistic or check can have multiple modifiers, even of the same type, but the stacking rules are
 * applied to ensure that only a single bonus and penalty of each type is applied to the total
 * modifier.
 * @category PF2
 */
export declare class StatisticModifier {
    /** The name of this collection of modifiers for a statistic. */
    name: string;
    /** The list of modifiers which affect the statistic. */
    protected _modifiers: ModifierPF2e[];
    /** The total modifier for the statistic, after applying stacking rules. */
    totalModifier: number;
    /** Allow decorating this object with any needed extra fields. <-- ಠ_ಠ */
    [key: string]: any;
    /**
     * @param name The name of this collection of statistic modifiers.
     * @param modifiers All relevant modifiers for this statistic.
     */
    constructor(name: string, modifiers?: ModifierPF2e[]);
    /** Get the list of all modifiers in this collection (as a read-only list). */
    get modifiers(): readonly ModifierPF2e[];
    /** Add a modifier to this collection. */
    push(modifier: ModifierPF2e): void;
    /** Delete a modifier from this collection by name. */
    delete(modifierName: string): void;
    /** Apply stacking rules to the list of current modifiers, to obtain a total modifier. */
    applyStackingRules(): void;
}
/**
 * Represents the list of modifiers for a specific check.
 * @category PF2
 */
export declare class CheckModifier extends StatisticModifier {
    /**
     * @param name The name of this check modifier.
     * @param statistic The statistic modifier to copy fields from.
     * @param modifiers Additional modifiers to add to this check.
     */
    constructor(name: string, statistic: StatisticModifier, modifiers?: ModifierPF2e[]);
}
export interface RawPredicate {
    all?: string[];
    any?: string[];
    not?: string[];
    test?: (options?: string[]) => boolean;
}
/**
 * Encapsulates logic to determine if a modifier should be active or not for a specific roll based
 * on a list of string values. This will often be based on traits, but that is not required - sneak
 * attack could be an option that is not a trait.
 * @category PF2
 */
export declare class ModifierPredicate implements RawPredicate {
    /** The options must have ALL of these entries for this predicate to pass.  */
    all: string[];
    /** The options must have AT LEAST ONE of these entries for this predicate to pass. */
    any: string[];
    /** The options must NOT HAVE ANY of these entries for this predicate to pass. */
    not: string[];
    /** Test if the given predicate passes for the given list of options. */
    static test(predicate?: RawPredicate, options?: string[]): boolean;
    constructor(param?: RawPredicate);
    /** Test this predicate against a list of options, returning true if the predicate passes (and false otherwise). */
    test(options?: string[]): boolean;
}
interface DamageDiceOverride {
    dieSize?: DamageDieSize;
    damageType?: string;
}
/**
 * Represents extra damage dice for one or more weapons or attack actions.
 * @category PF2
 */
export declare class DiceModifierPF2e implements RawModifier {
    name: string;
    label?: string;
    /** The number of dice to add. */
    diceNumber: number;
    /** The size of the dice to add. */
    dieSize?: DamageDieSize;
    critical: boolean;
    /** The damage category of these dice. */
    category?: string;
    damageType?: string;
    traits: string[];
    /** If true, these dice overide the base damage dice of the weapon. */
    override?: DamageDiceOverride;
    ignored: boolean;
    enabled: boolean;
    custom: boolean;
    predicate: ModifierPredicate;
    constructor(
        param: Partial<DiceModifierPF2e> & {
            name: string;
        },
    );
}
export declare class DamageDicePF2e extends DiceModifierPF2e {
    /** The selector used to determine when   */
    selector: string;
    constructor(params: Partial<DamageDicePF2e> & Pick<DamageDicePF2e, "selector" | "name">);
}
export {};
