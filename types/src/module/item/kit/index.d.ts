import { ActorPF2e } from "@actor/index";
import { ItemPF2e } from "@item/index";
import { KitData, KitEntryData } from "./data";
export declare class KitPF2e extends ItemPF2e {
    static get schema(): typeof KitData;
    get entries(): KitEntryData[];
    /** Inflate this kit and add its items to the provided actor */
    dumpContents(
        actor: ActorPF2e,
        kitEntries?: KitEntryData[],
        containerId?: string,
    ): Promise<void>;
}
export interface KitPF2e {
    readonly data: KitData;
}
