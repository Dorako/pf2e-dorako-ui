import { ItemSheetDataPF2e, ItemSheetPF2e } from "./base";
import { PhysicalItemPF2e } from "@item/physical";
export declare class PhysicalItemSheetPF2e<
    TItem extends PhysicalItemPF2e = PhysicalItemPF2e,
> extends ItemSheetPF2e<TItem> {
    /** Show the identified data for editing purposes */
    getData(): ItemSheetDataPF2e<TItem>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
