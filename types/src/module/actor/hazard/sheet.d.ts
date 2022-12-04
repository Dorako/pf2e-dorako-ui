/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { HazardPF2e } from ".";
export declare class HazardSheetPF2e extends ActorSheetPF2e<HazardPF2e> {
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        submitOnClose: boolean;
        scrollY: string[];
    };
    /** Get the HTML template path to use depending on whether this sheet is in edit mode */
    get template(): string;
    getData(): any;
    prepareItems(sheetData: any): void;
    activateListeners(html: JQuery): void;
}
