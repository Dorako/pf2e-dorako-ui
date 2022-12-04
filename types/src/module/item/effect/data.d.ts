import { ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { EffectPF2e } from ".";
export declare type EffectSource = BaseNonPhysicalItemSource<"effect", EffectSystemData>;
export declare class EffectData extends BaseNonPhysicalItemData<EffectPF2e> {
    /** @override */
    static DEFAULT_ICON: ImagePath;
}
export interface EffectData extends Omit<EffectSource, "_id" | "effects"> {
    type: EffectSource["type"];
    data: EffectSource["data"];
    system: EffectSource["data"]; // v10 shim, later this will be removed when the types are replaced
    readonly _source: EffectSource;
}
export interface EffectSystemData extends ItemSystemData {
    level: {
        value: number;
    };
    expired: boolean;
    remaining: string;
    duration: {
        value: number;
        unit: string;
        sustained: boolean;
        expiry: "turn-start" | "turn-end";
    };
    start: {
        value: number;
        initiative: number | null;
    };
    tokenIcon?: {
        show: boolean;
    };
}
