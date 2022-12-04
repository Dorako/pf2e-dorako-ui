import { ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import type { KitPF2e } from ".";
export declare type KitSource = BaseNonPhysicalItemSource<"kit", KitSystemData>;
export declare class KitData extends BaseNonPhysicalItemData<KitPF2e> {
    /** @override */
    static DEFAULT_ICON: ImagePath;
}
export interface KitData extends Omit<KitSource, "_id" | "effects"> {
    type: KitSource["type"];
    data: KitSource["data"];
    readonly _source: KitSource;
}
export interface KitEntryData {
    pack?: string;
    id: string;
    img: ImagePath;
    quantity: number;
    name: string;
    isContainer: boolean;
    items?: {
        [key: number]: KitEntryData;
    };
}
export interface KitSystemData extends ItemSystemData {
    items: Record<string, KitEntryData>;
}
