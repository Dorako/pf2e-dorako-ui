/// <reference types="jquery" />
import { ChatMessagePF2e } from "@module/chat-message";
import { ActorPF2e } from "../actor/base";
import { ItemDataPF2e, ItemSourcePF2e, TraitChatData } from "./data";
import { ItemSheetPF2e } from "./sheet/base";
import { UserPF2e } from "@module/user";
interface ItemConstructionContextPF2e extends DocumentConstructionContext<ItemPF2e> {
    pf2e?: {
        ready?: boolean;
    };
}
/** Override and extend the basic :class:`Item` implementation */
export declare class ItemPF2e extends Item<ActorPF2e> {
    constructor(data: PreCreate<ItemSourcePF2e>, context?: ItemConstructionContextPF2e);
    /** The sluggified name of the item **/
    get slug(): string | null;
    /** The compendium source ID of the item **/
    get sourceId(): string | undefined;
    get traits(): Set<string>;
    get description(): string;
    protected _preCreate(
        data: PreDocumentId<this["data"]["_source"]>,
        options: DocumentModificationContext,
        user: UserPF2e,
    ): Promise<void>;
    protected _onCreate(
        data: ItemSourcePF2e,
        options: DocumentModificationContext,
        userId: string,
    ): void;
    protected _onUpdate(
        changed: DeepPartial<this["data"]["_source"]>,
        options: DocumentModificationContext,
        userId: string,
    ): void;
    protected _onDelete(options: DocumentModificationContext, userId: string): void;
    /**
     * Create a chat card for this item and send it to the chat log. Many cards contain follow-up options for attack
     * rolls, effect application, etc.
     */
    toChat(
        this: Embedded<ItemPF2e>,
        event?: JQuery.TriggeredEvent,
    ): Promise<ChatMessagePF2e | undefined>;
    /**
     * Internal method that transforms data into something that can be used for chat.
     * Currently renders description text using TextEditor.enrichHTML()
     */
    protected processChatData<T>(htmlOptions: EnrichHTMLOptions | undefined, data: T): T;
    getChatData(
        this: Embedded<ItemPF2e>,
        htmlOptions?: EnrichHTMLOptions,
        _rollOptions?: Record<string, any>,
    ): unknown;
    protected traitChatData(dictionary: Record<string, string>): TraitChatData[];
    /**
     * Roll a Weapon Attack
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollWeaponAttack(
        this: Embedded<ItemPF2e>,
        event: JQuery.ClickEvent,
        multiAttackPenalty?: number,
    ): void;
    /**
     * Roll Weapon Damage
     * Rely upon the DicePF2e.damageRoll logic for the core implementation
     */
    rollWeaponDamage(this: Embedded<ItemPF2e>, event: JQuery.ClickEvent, critical?: boolean): void;
    /**
     * Roll a NPC Attack
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollNPCAttack(
        this: Embedded<ItemPF2e>,
        event: JQuery.ClickEvent,
        multiAttackPenalty?: number,
    ): void;
    /**
     * Roll NPC Damage
     * Rely upon the DicePF2e.damageRoll logic for the core implementation
     */
    rollNPCDamage(this: Embedded<ItemPF2e>, event: JQuery.ClickEvent, critical?: boolean): void;
    /**
     * Roll Spell Damage
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollSpellcastingEntryCheck(this: Embedded<ItemPF2e>, event: JQuery.ClickEvent): void;
    /**
     * Roll Spell Damage
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollSpellAttack(
        this: Embedded<ItemPF2e>,
        event: JQuery.ClickEvent,
        multiAttackPenalty?: number,
    ): void;
    /**
     * The heightened level is not transferred correctly to spell chat cards.
     * Therefore you have to look into the triggering's event proximity.
     * @param event
     */
    static findSpellLevel(event: any): number;
    /**
     * Roll Spell Damage
     * Rely upon the DicePF2e.damageRoll logic for the core implementation
     */
    rollSpellDamage(this: Embedded<ItemPF2e>, event: JQuery.ClickEvent): void;
    /**
     * Roll Counteract check
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollCounteract(this: Embedded<ItemPF2e>, event: JQuery.ClickEvent): void;
    calculateMap(): {
        label: string;
        map2: number;
        map3: number;
    };
    static calculateMap(item: ItemDataPF2e): {
        label: string;
        map2: number;
        map3: number;
    };
    /** Don't allow the user to create a condition or spellcasting entry from the sidebar. */
    static createDialog(
        data?: {
            folder?: string;
        },
        options?: FormApplicationOptions,
    ): Promise<ItemPF2e | undefined>;
}
export interface ItemPF2e {
    readonly data: ItemDataPF2e;
    flags: ItemDataPF2e["flags"]; // v10 shim, will be replaced when types update
    readonly parent: ActorPF2e | null;
    readonly _sheet: ItemSheetPF2e<this>;
}
export {};
