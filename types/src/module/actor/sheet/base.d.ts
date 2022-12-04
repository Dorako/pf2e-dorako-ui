/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemPF2e } from "@item/base";
import { ItemSourcePF2e } from "@item/data";
import { MagicSchool, SpellData, SpellSystemData } from "@item/spell/data";
import { Coins } from "@item/treasure/helpers";
import { BasicSelectorOptions, TagSelectorType } from "@system/trait-selector";
import type { ActorPF2e } from "../base";
import { ActorSheetDataPF2e, CoinageSummary } from "./data-types";
import { ActorDataPF2e } from "@actor/data";
import { DropCanvasDataPF2e } from "@scripts/system/dragstart-handler";
interface SpellSheetData extends SpellData {
    spellInfo?: unknown;
    data: SpellSystemData & {
        school: {
            value: MagicSchool;
            str?: string;
        };
    };
}
/**
 * Extend the basic ActorSheet class to do all the PF2e things!
 * This sheet is an Abstract layer which is not used.
 * @category Actor
 */
export declare abstract class ActorSheetPF2e<TActor extends ActorPF2e> extends ActorSheet<
    TActor,
    ItemPF2e
> {
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        submitOnClose: boolean;
        scrollY: string[];
    };
    get isEditable(): boolean;
    /** Can non-owning users loot items from this sheet? */
    get isLootSheet(): boolean;
    getData(): ActorSheetDataPF2e<TActor>;
    protected abstract prepareItems(sheetData: { actor: ActorDataPF2e }): void;
    protected findActiveList(): JQuery<HTMLElement>;
    protected static coinsToSheetData(coins: Coins): CoinageSummary;
    protected prepareTraits(traits: any): void;
    /**
     * Insert a spell into the spellbook object when rendering the character sheet
     * @param actorData    The Actor data being prepared
     * @param spellbook    The spellbook data being prepared
     * @param spellData        The spell data being prepared
     */
    protected prepareSpell(
        actorData: ActorDataPF2e,
        spellbook: any,
        spellData: SpellSheetData,
    ): void;
    /**
     * Insert prepared spells into the spellbook object when rendering the character sheet
     * @param spellcastingEntry    The spellcasting entry data being prepared
     * @param spellbook            The spellbook data being prepared
     */
    protected preparedSpellSlots(spellcastingEntry: any, spellbook: any): void;
    /**
     * Prepare Spell SLot
     * Saves the prepared spell slot data to the actor
     * @param spellLevel The level of the spell slot
     * @param spellSlot The number of the spell slot
     * @param spell The item details for the spell
     * @param entryId The ID of the spellcastingEntry
     */
    private allocatePreparedSpellSlot;
    /**
     * Remove Spell Slot
     * Removes the spell from the saved spell slot data for the actor
     * @param spellLevel The level of the spell slot
     * @param spellSlot The number of the spell slot
     */
    private removePreparedSpellSlot;
    /**
     * Sets the expended state of a  Spell Slot
     * Marks the slot as expended which is reflected in the UI
     * @param spellLevel The level of the spell slot
     * @param spellSlot The number of the spell slot
     */
    private setExpendedPreparedSpellSlot;
    /** Save any open tinyMCE editor before closing */
    close(options?: { force?: boolean }): Promise<void>;
    activateListeners(html: JQuery): void;
    onClickDeleteItem(event: JQuery.ClickEvent | JQuery.ContextMenuEvent): Promise<void>;
    protected _canDragStart(selector: string): boolean;
    protected _canDragDrop(selector: string): boolean;
    /** Add support for dropping actions and toggles */
    protected _onDragStart(event: ElementDragEvent): void;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: ElementDragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    protected _onDropItemCreate(itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    onDropItem(data: DropCanvasDataPF2e<ItemSourcePF2e>): Promise<ItemPF2e[]>;
    /** Extend the base _onDrop method to handle dragging spells onto spell slots. */
    protected _onDropItem(
        event: ElementDragEvent,
        data: DropCanvasDataPF2e<ItemSourcePF2e>,
    ): Promise<ItemPF2e[]>;
    /**
     * Moves an item between two actors' inventories.
     * @param event         Event that fired this method.
     * @param sourceActorId ID of the actor who originally owns the item.
     * @param targetActorId ID of the actor where the item will be stored.
     * @param itemId           ID of the item to move between the two actors.
     */
    moveItemBetweenActors(
        event: ElementDragEvent,
        sourceActorId: string,
        sourceTokenId: string,
        targetActorId: string,
        targetTokenId: string,
        itemId: string,
    ): Promise<void>;
    private moveSpell;
    /**
     * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
     */
    private onItemRoll;
    /**
     * Handles expanding and contracting the item summary,
     * delegating the populating of the item summary to renderItemSummary()
     */
    protected onItemSummary(event: JQuery.ClickEvent): void;
    /**
     * Triggers toggling the visibility of an item summary element,
     * delegating the populating of the item summary to renderItemSummary()
     */
    toggleItemSummary(
        li: JQuery,
        options?: {
            instant?: boolean;
        },
    ): void;
    /**
     * Called when an item summary is expanded and needs to be filled out.
     */
    protected renderItemSummary(div: JQuery, _item: ItemPF2e, chatData: any): void;
    /** Opens an item container */
    private toggleContainer;
    /** Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset */
    private onClickCreateItem;
    /** Handle creating a new spellcasting entry for the actor */
    private createSpellcastingEntry;
    /**
     * Handle removing an existing spellcasting entry for the actor
     */
    private removeSpellcastingEntry;
    private onAddCoinsPopup;
    private onRemoveCoinsPopup;
    private onSellAllTreasure;
    protected onTraitSelector(event: JQuery.ClickEvent): void;
    /** Construct and render a tag selection menu */
    protected tagSelector(
        selectorType: Exclude<TagSelectorType, "basic">,
        options?: FormApplicationOptions,
    ): void;
    protected tagSelector(selectorType: "basic", options: BasicSelectorOptions): void;
    /** Prevent `ActorSheet#_getSubmitData` from preventing the submission of updates to overridden values */
    protected _getSubmitData(updateData?: Record<string, unknown>): Record<string, unknown>;
    protected _onSubmit(
        event: Event,
        options?: OnSubmitFormOptions,
    ): Promise<Record<string, unknown>>;
    /**
     * A user edits numeric values on actor sheets that are frequently modified by data preparation: we should be able
     * to infer the intended change by adding the difference between their update and the prepared value to the
     * underlying base value.
     */
    protected getIntendedChange(propertyPath: string, update: number): number;
    /** Hide the sheet-config button unless there is more than one sheet option. */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    /** Override of inner render function to maintain item summary state */
    protected _renderInner(
        data: Record<string, unknown>,
        options: RenderOptions,
    ): Promise<JQuery<HTMLElement>>;
}
export {};
