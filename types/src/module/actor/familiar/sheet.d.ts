/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { FamiliarPF2e } from "@actor/familiar";
import type { ItemPF2e } from "@item/base";
/**
 * @category Actor
 */
export declare class FamiliarSheetPF2e extends ActorSheet<FamiliarPF2e, ItemPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(): any;
    activateListeners(html: JQuery): void;
}
