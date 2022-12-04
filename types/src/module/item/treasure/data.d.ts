import {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    PhysicalSystemData,
} from "@item/physical/data";
import { TreasurePF2e } from ".";
export declare type TreasureSource = BasePhysicalItemSource<"treasure", TreasureSystemData>;
export declare class TreasureData extends BasePhysicalItemData<TreasurePF2e> {
    /** @override */
    static DEFAULT_ICON: ImagePath;
}
export interface TreasureData extends Omit<TreasureSource, "_id" | "effects"> {
    type: TreasureSource["type"];
    data: TreasureSource["data"];
    readonly _source: TreasureSource;
    isInvested: null;
}
export interface TreasureSystemData extends PhysicalSystemData {
    denomination: {
        value: "pp" | "gp" | "sp" | "cp";
    };
    value: {
        value: number;
    };
}
