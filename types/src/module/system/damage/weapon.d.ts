import { ActorDataPF2e } from "@actor/data";
import { StrikeTrait } from "@actor/data/base";
import { WeaponData } from "@item/data";
import { DamageDicePF2e, DiceModifierPF2e, ModifierPF2e } from "@module/modifiers";
import { RollNotePF2e } from "@module/notes";
import { StrikingPF2e, WeaponPotencyPF2e } from "@module/rules/rules-data-definitions";
import { DamageDieSize } from "./damage";
import { SIZES } from "@module/data";
export interface DamagePartials {
    [damageType: string]: {
        [damageCategory: string]: string;
    };
}
export interface DamageFormula {
    data: object;
    formula: string;
    partials: DamagePartials;
}
export interface DamageTemplate {
    base: {
        damageType: string;
        diceNumber: number;
        dieSize: DamageDieSize;
        modifier: number;
    };
    diceModifiers: DiceModifierPF2e[];
    effectDice: number;
    formula: {
        criticalFailure?: DamageFormula;
        failure?: DamageFormula;
        success: DamageFormula;
        criticalSuccess: DamageFormula;
    };
    name: string;
    notes: RollNotePF2e[];
    numericModifiers: ModifierPF2e[];
    traits: string[];
}
/** A pool of damage dice & modifiers, grouped by damage type. */
export declare type DamagePool = Record<
    string,
    {
        /** If true, this is the 'base' damage of the weapon or attack; some abilities scale off of base damage dice. */
        base?: boolean;
        categories: {
            [category: string]: {
                /** The static amount of damage of the current damage type and category. */
                modifier?: number;
                /** Maps the die face ('d4', 'd6', 'd8', 'd10', 'd12') to the number of dice of that type. */
                dice?: Record<string, number>;
            };
        };
    }
>;
export declare function ensureWeaponCategory(
    options: string[],
    weaponCategory: "simple" | "martial" | "advanced" | "unarmed",
): void;
export declare function ensureWeaponSize(
    options: string[],
    weaponSize: typeof SIZES[number] | null | undefined,
    wielderSize: typeof SIZES[number] | null | undefined,
): void;
/**
 * @category PF2
 */
export declare class WeaponDamagePF2e {
    static calculateStrikeNPC(
        weapon: any,
        actor: ActorDataPF2e,
        traits: StrikeTrait[] | undefined,
        statisticsModifiers: Record<string, ModifierPF2e[]>,
        damageDice: any,
        proficiencyRank: number | undefined,
        options: string[] | undefined,
        rollNotes: Record<string, RollNotePF2e[]>,
    ): DamageTemplate;
    static calculate(
        weapon: WeaponData,
        actor: ActorDataPF2e,
        traits: StrikeTrait[] | undefined,
        statisticsModifiers: Record<string, ModifierPF2e[]>,
        damageDice: Record<string, DamageDicePF2e[]>,
        proficiencyRank: number | undefined,
        options: string[] | undefined,
        rollNotes: Record<string, RollNotePF2e[]>,
        weaponPotency: WeaponPotencyPF2e | null,
        striking: Record<string, StrikingPF2e[]>,
    ): DamageTemplate;
    /** Convert the damage definition into a final formula, depending on whether the hit is a critical or not. */
    static getFormula(damage: any, critical: boolean): DamageFormula;
    /** Add dice to the given damage pool. */
    static addDice(
        pool: DamagePool,
        damageType: string,
        category: string | undefined,
        dieSize: string,
        count: number,
    ): DamagePool;
    /** Converts a damage pool to a final string formula. */
    static buildFormula(
        pool: DamagePool,
        partials?: {
            [damageType: string]: {
                [damageCategory: string]: string;
            };
        },
    ): string;
    /** Double a textual formula based on the current crit rules. */
    static doubleFormula(formula: string): string;
    private static getSelectors;
}
