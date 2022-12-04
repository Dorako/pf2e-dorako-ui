/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { LootPF2e } from "@actor/loot";
import { ItemSourcePF2e } from "@item/data";
import { LootSheetDataPF2e } from "../sheet/data-types";
import { ItemPF2e } from "@item";
export declare class LootSheetPF2e extends ActorSheetPF2e<LootPF2e> {
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        submitOnClose: boolean;
        scrollY: string[];
    } & {
        editable: boolean;
        classes: string[];
        width: number;
        height: number;
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
    };
    get template(): string;
    get isLootSheet(): boolean;
    getData(): LootSheetDataPF2e;
    activateListeners(html: JQuery<HTMLElement>): void;
    prepareItems(sheetData: any): void;
    private distributeCoins;
    private lootNPCs;
    protected _onDropItem(
        event: ElementDragEvent,
        data: DropCanvasData<ItemSourcePF2e>,
    ): Promise<ItemPF2e[]>;
}
