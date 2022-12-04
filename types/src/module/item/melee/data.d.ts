import { ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import type { MeleePF2e } from ".";
export declare type MeleeSource = BaseNonPhysicalItemSource<"melee", MeleeSystemData>;
export declare class MeleeData extends BaseNonPhysicalItemData<MeleePF2e> {
    /** @override */
    static DEFAULT_ICON: ImagePath;
}
export interface MeleeData extends Omit<MeleeSource, "_id" | "effects"> {
    type: MeleeSource["type"];
    data: MeleeSource["data"];
    readonly _source: MeleeSource;
}
export interface MeleeDamageRoll {
    damage: string;
    damageType: string;
}
export interface MeleeSystemData extends ItemSystemData {
    attack: {
        value: string;
    };
    damageRolls: Record<string, MeleeDamageRoll>;
    bonus: {
        value: number;
    };
    attackEffects: {
        value: string[];
    };
    weaponType: {
        value: "melee" | "ranged";
    };
}
