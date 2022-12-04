import {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    MagicItemSystemData,
} from "@item/physical/data";
import { ContainerPF2e } from ".";
export declare type ContainerSource = BasePhysicalItemSource<"backpack", ContainerSystemData>;
export declare class ContainerData extends BasePhysicalItemData<ContainerPF2e> {
    /** @override */
    static DEFAULT_ICON: ImagePath;
}
export interface ContainerData extends Omit<ContainerSource, "_id" | "effects"> {
    type: ContainerSource["type"];
    data: ContainerSource["data"];
    readonly _source: ContainerSource;
}
export interface ContainerSystemData extends MagicItemSystemData {
    capacity: {
        type: string;
        value: number;
        weightless: boolean;
    };
    currency: {
        cp: number;
        sp: number;
        gp: number;
        pp: number;
    };
}
