import { ActorSystemData, BaseActorDataPF2e, BaseActorSourcePF2e } from "@actor/data/base";
import { LootPF2e } from ".";
/** The stored source data of a loot actor */
export declare type LootSource = BaseActorSourcePF2e<"loot", LootSystemData>;
export declare class LootData extends BaseActorDataPF2e<LootPF2e> {
    static DEFAULT_ICON: ImagePath;
}
/** Wrapper type for loot-specific data. */
export interface LootData extends Omit<LootSource, "effects" | "items" | "token"> {
    type: LootSource["type"];
    data: LootSource["data"];
    readonly _source: LootSource;
}
/** The system-level data of loot actors. */
export interface LootSystemData extends ActorSystemData {
    lootSheetType: "Merchant" | "Loot";
    hiddenWhenEmpty: boolean;
    [key: string]: any;
}
