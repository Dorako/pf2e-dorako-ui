import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
export declare class Migration596SetSlugSourceIds extends MigrationBase {
    static version: number;
    /** Only PF2e system compendia will be checked against */
    private sourceIdPattern;
    private readonly itemPacks;
    /** Cached compendium content */
    private static packContent;
    constructor();
    private getPackContent;
    /** Look through each pack and attempt to find the originating item */
    private findCompendiumItem;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
