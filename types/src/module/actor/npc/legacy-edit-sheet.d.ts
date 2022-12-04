/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CreatureSheetPF2e } from "../creature/sheet";
import { NPCPF2e } from ".";
export declare class NPCLegacyEditSheetPF2e extends CreatureSheetPF2e<NPCPF2e> {
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        submitOnClose: boolean;
        scrollY: string[];
    };
    /** Get the correct HTML template path to use for rendering this particular sheet */
    get template(): string;
    /** Add some extra data when rendering the sheet to reduce the amount of logic required within the template. */
    getData(): any;
    /** Organize and classify Items for NPC sheets */
    protected prepareItems(sheetData: any): void;
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
}
