import { Alignment } from "@actor/creature/data";
import { Living } from "./living";
declare const damageTypes: Set<
    | "mental"
    | "chaotic"
    | "evil"
    | "good"
    | "lawful"
    | "fire"
    | "acid"
    | "cold"
    | "electricity"
    | "force"
    | "positive"
    | "sonic"
    | "negative"
    | "poison"
    | "bludgeoning"
    | "piercing"
    | "slashing"
    | "bleed"
>;
export declare type SetElement<SetType extends Set<unknown>> = SetType extends Set<
    infer ElementType
>
    ? ElementType
    : never;
export declare type DamageType = SetElement<typeof damageTypes>;
export declare function isDamageType(value: string): value is DamageType;
declare const attackTraits: Set<
    | "unarmed"
    | "light"
    | "magical"
    | "air"
    | "earth"
    | "fire"
    | "water"
    | "adamantine"
    | "coldiron"
    | "ghostTouch"
    | "silver"
    | "area-damage"
    | "darkwood"
    | "mithral"
    | "orichalcum"
    | "salt"
    | "salt water"
    | "vorpal"
    | "warpglass"
    | "nonlethal attacks"
    | "persistent-damage"
>;
export declare type AttackTrait = SetElement<typeof attackTraits>;
export declare function isAttackTrait(trait: string): trait is AttackTrait;
declare const combinedTraits: Set<
    | "all"
    | "physical"
    | "energy"
    | "unarmed"
    | "light"
    | "mental"
    | "magical"
    | "chaotic"
    | "evil"
    | "good"
    | "lawful"
    | "air"
    | "earth"
    | "fire"
    | "water"
    | "acid"
    | "cold"
    | "electricity"
    | "force"
    | "positive"
    | "sonic"
    | "negative"
    | "poison"
    | "adamantine"
    | "coldiron"
    | "ghostTouch"
    | "silver"
    | "bludgeoning"
    | "piercing"
    | "slashing"
    | "bleed"
    | "critical-hits"
    | "precision"
    | "area-damage"
    | "darkwood"
    | "mithral"
    | "orichalcum"
    | "salt"
    | "salt water"
    | "splash-damage"
    | "vorpal"
    | "warpglass"
    | "nonlethal attacks"
    | "persistent-damage"
    | "non-magical"
>;
export declare type CombinedTrait = SetElement<typeof combinedTraits>;
export declare function isCombinedTrait(trait: string): trait is CombinedTrait;
export declare class DamageValues {
    private readonly normal;
    private readonly precision;
    private readonly critical;
    private readonly criticalPrecision;
    private readonly splash;
    private readonly traits;
    constructor({
        normal,
        precision,
        critical,
        criticalPrecision,
        splash,
        traits,
    }?: {
        normal?: number;
        precision?: number;
        critical?: number;
        criticalPrecision?: number;
        splash?: number;
        traits?: Set<AttackTrait>;
    });
    total(): number;
    totalPrecision(): number;
    totalCritical(): number;
    totalSplash(): number;
    getTraits(): Set<
        | "all"
        | "physical"
        | "energy"
        | "unarmed"
        | "light"
        | "mental"
        | "magical"
        | "chaotic"
        | "evil"
        | "good"
        | "lawful"
        | "air"
        | "earth"
        | "fire"
        | "water"
        | "acid"
        | "cold"
        | "electricity"
        | "force"
        | "positive"
        | "sonic"
        | "negative"
        | "poison"
        | "adamantine"
        | "coldiron"
        | "ghostTouch"
        | "silver"
        | "bludgeoning"
        | "piercing"
        | "slashing"
        | "bleed"
        | "critical-hits"
        | "precision"
        | "area-damage"
        | "darkwood"
        | "mithral"
        | "orichalcum"
        | "salt"
        | "salt water"
        | "splash-damage"
        | "vorpal"
        | "warpglass"
        | "nonlethal attacks"
        | "persistent-damage"
        | "non-magical"
    >;
    withoutCritical(): DamageValues;
    withoutPrecision(): DamageValues;
    withoutSplash(): DamageValues;
    addDamage(value: number): DamageValues;
    copy({
        normal,
        precision,
        critical,
        criticalPrecision,
        splash,
        traits,
    }: {
        normal?: number;
        precision?: number;
        critical?: number;
        criticalPrecision?: number;
        splash?: number;
        traits?: Set<AttackTrait>;
    }): DamageValues;
}
export declare type Damage = Map<DamageType, DamageValues>;
export declare type DamageExceptions = Set<CombinedTrait>[];
interface HasValue {
    /**
     * Due to the "take the highest one" rule we need to actually figure out how much critical, precision and splash damage
     * resistance would actually reduce
     * @param damage
     * @param damageType
     */
    calculateValue(damage: Damage, damageType: DamageType): number;
}
declare class Modifier {
    protected exceptions: DamageExceptions;
    protected type: string;
    constructor({ exceptions, type }: { exceptions?: DamageExceptions; type: string });
    /**
     * A single trait or damage combination can disable all resistance/weaknesses/immunities.
     * @param damageTraits all traits applicable for the damage pool
     * @return true if the current exception applies
     */
    exceptionApplies(damageTraits: Set<string>): boolean;
    getType(): string;
}
export declare class Immunity extends Modifier {
    copy({ type, exceptions }: { type?: string; exceptions?: DamageExceptions }): Immunity;
}
export declare class Weakness extends Modifier implements HasValue {
    private readonly value;
    constructor({
        type,
        value,
        exceptions,
    }: {
        type: string;
        value: number;
        exceptions?: DamageExceptions;
    });
    calculateValue(damage: Damage, damageType: DamageType): number;
}
export declare class Resistance extends Modifier implements HasValue {
    private readonly value;
    private readonly doubleResistanceVsNonMagical;
    constructor({
        type,
        value,
        doubleResistanceVsNonMagical,
        exceptions,
    }: {
        type: string;
        value: number;
        doubleResistanceVsNonMagical?: boolean;
        exceptions?: DamageExceptions;
    });
    calculateValue(damage: Damage, damageType: DamageType): number;
    withReducedValue(reduceBy: number): Resistance;
    getValue(): number;
}
export declare function removeAlignmentDamage(damage: Damage, alignment: Alignment): void;
export declare function removePositiveOrNegativeDamage(damage: Damage, living: Living): void;
interface DamageOptions {
    disregardTargetAlignment: boolean;
}
/**
 * Implementation of https://2e.aonprd.com/Rules.aspx?ID=342
 *
 * @param damage damage split up by parts
 * @param immunities a list of immunities; one type can be present multiple times, we use the highest one
 * @param weaknesses a list of weaknesses; one type can be present multiple times, we use the highest one
 * @param resistances a list of resistances; one type can be present multiple times, we use the highest one
 * @param living whether we need to apply positive/negative damage
 * @param alignment whether we need to apply alignment damage
 * @param damageOptions flags for damage calculation
 * @param damageOptions.disregardTargetAlignment if true, will remove the check for the target alignment and always deal alignment damage
 * @return the final calculated damage
 */
export declare function calculateDamage({
    damage,
    immunities,
    resistances,
    weaknesses,
    living,
    alignment,
    damageOptions,
}: {
    damage: Damage;
    immunities?: Immunity[];
    resistances?: Resistance[];
    weaknesses?: Weakness[];
    living?: Living;
    alignment?: Alignment;
    damageOptions?: DamageOptions;
}): number;
export interface GolemImmunityConstructor {
    slowedRoundsFormula?: string;
    harmedFormula?: string;
    healedFormula?: string;
}
/**
 * A spell can trigger multiple types of damage (e.g. https://2e.aonprd.com/Spells.aspx?ID=32) so there can be more
 * than one result; the formula that should be rolled is damage for harm/heal or rounds for slowed
 */
export declare class GolemMagicImmunityResult {
    private readonly slowedRoundsFormula?;
    private readonly harmedFormula?;
    private readonly healedFormula?;
    constructor({ slowedRoundsFormula, harmedFormula, healedFormula }?: GolemImmunityConstructor);
    getSlowedRoundsFormula(): string | undefined;
    getHarmedFormula(): string | undefined;
    getHealedFormula(): string | undefined;
}
export interface GolemMagicImmunity {
    healedBy: {
        type: Set<CombinedTrait>;
        formula: string;
    };
    harmedBy: {
        type: Set<CombinedTrait>;
        formula: string;
        areaOrPersistentFormula: string;
    };
    slowedBy: Set<CombinedTrait>;
}
/**
 * Only call this function if the damage originated from a spell and the target has golem like magic immunity
 *
 * @param damage dealt spell damage
 * @param immunity golem immunity
 * @return
 */
export declare function golemAntiMagic(
    damage: Damage,
    immunity: GolemMagicImmunity,
): GolemMagicImmunityResult;
export interface ParsedException {
    doubleResistanceVsNonMagical: boolean;
    except: DamageExceptions;
}
/**
 * Used to parse new stat blocks imported from AoN or migrate existing ones
 *
 * This method needs to deal with the following string value crap:
 *
 * * except magical silver
 * * except force, ghost touch, or positive; double resistance vs. non-magical
 * * except adamantine or bludgeoning
 * * except cold iron
 * * except magical
 * * except unarmed attacks
 * * except non-magical
 * * except force or ghost touch
 * @param exceptions string as listed above
 */
export declare function parseExceptions(exceptions: string | undefined | null): ParsedException;
/**
 * Some feats and spells reduce resistances by a certain value; apply this to resistances before damage calculation
 *
 * @param resistances all resistances
 * @param reductions map of resistance type to reduction value
 */
export declare function reduceResistances(
    resistances: Resistance[],
    reductions: Map<string, number>,
): Resistance[];
export {};
