/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemPF2e } from "@item/base";
import { ItemSourcePF2e } from "@item/data";
import { CharacterPF2e } from ".";
import { CreatureSheetPF2e } from "../creature/sheet";
export declare class CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        submitOnClose: boolean;
        scrollY: string[];
    } & {
        classes: string[];
        width: number;
        height: number;
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
        showUnpreparedSpells: boolean;
    };
    get template(): string;
    protected _updateObject(event: Event, formData: any): Promise<void>;
    getData(): any;
    /**
     * Organize and classify Items for Character sheets
     */
    protected prepareItems(sheetData: any): void;
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    /** Handle clicking of proficiency-rank adjustment buttons */
    private onClickAdjustStat;
    /** Handle clicking of lore and spellcasting entry adjustment buttons */
    private onClickAdjustItemStat;
    /**
     * Get the font-awesome icon used to display a certain level of focus points
     * expection focus = { points: 1, pool: 1}
     */
    private getFocusIcon;
    private onIncrementModifierValue;
    private onDecrementModifierValue;
    private onAddCustomModifier;
    private onRemoveCustomModifier;
    private onToggleAutomation;
    protected _onDropItemCreate(itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    private isFeatValidInFeatSlot;
    /** Handle cycling of dying, wounded, or doomed */
    private onClickDyingWoundedDoomed;
    private getNearestSlotId;
    private onToggleSignatureSpell;
    protected _onDropItem(
        event: ElementDragEvent,
        data: DropCanvasData<ItemSourcePF2e>,
    ): Promise<ItemPF2e[]>;
    /**
     * Handle a drop event for an existing Owned Item to sort that item
     * @param event
     * @param itemData
     */
    protected _onSortItem(event: ElementDragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    protected _onSubmit(event: any): Promise<Record<string, unknown>>;
    /**
     * Get the font-awesome icon used to display a certain level of dying
     */
    private getDyingIcon;
    /**
     * Get the font-awesome icon used to display a certain level of wounded
     */
    private getWoundedIcon;
    /**
     * Get the font-awesome icon used to display a certain level of doomed
     */
    private getDoomedIcon;
    /** Get the font-awesome icon used to display hero points */
    private getHeroPointsIcon;
}
