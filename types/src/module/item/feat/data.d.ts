import { ItemLevelData, ItemSystemData, ItemTraits } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { FeatPF2e } from ".";
export declare type FeatSource = BaseNonPhysicalItemSource<"feat", FeatSystemData>;
export declare class FeatData extends BaseNonPhysicalItemData<FeatPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface FeatData extends Omit<FeatSource, "_id" | "effects"> {
    type: FeatSource["type"];
    data: FeatSource["data"];
    readonly _source: FeatSource;
}
export declare type FeatTrait = keyof ConfigPF2e["PF2E"]["featTraits"];
export declare type FeatTraits = ItemTraits<FeatTrait>;
export declare type FeatType = keyof ConfigPF2e["PF2E"]["featTypes"];
export interface PrerequisiteTagData {
    value: string;
}
interface FeatSystemData extends ItemSystemData, ItemLevelData {
    featType: {
        value: FeatType;
    };
    actionType: {
        value: keyof ConfigPF2e["PF2E"]["actionTypes"];
    };
    actionCategory: {
        value: string;
    };
    actions: {
        value: string;
    };
    prerequisites: {
        value: PrerequisiteTagData[];
    };
    location: string;
}
export {};
