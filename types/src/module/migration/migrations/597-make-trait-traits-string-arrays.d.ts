import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Change `delimiter`-delimited string traits into arrays of strings */
export declare class Migration597MakeTraitTraitsArrays extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
