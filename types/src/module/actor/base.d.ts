/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { DamageDicePF2e, RawPredicate } from "../modifiers";
import { ItemPF2e, PhysicalItemPF2e } from "@item";
import type { ConditionPF2e, ArmorPF2e } from "@item/index";
import { WeaponData, ItemSourcePF2e, ItemType } from "@item/data";
import type { ActiveEffectPF2e } from "@module/active-effect";
import { ActorSheetPF2e } from "./sheet/base";
import { SaveString, SkillAbbreviation, VisionLevel } from "./creature/data";
import { AbilityString } from "./data/base";
import { ActorDataPF2e, ActorSourcePF2e } from "./data";
import { TokenDocumentPF2e } from "@module/token-document";
import { UserPF2e } from "@module/user";
import { ConditionType } from "@item/condition/data";
interface ActorConstructorContextPF2e extends DocumentConstructionContext<ActorPF2e> {
    pf2e?: {
        ready?: boolean;
    };
}
/**
 * Extend the base Actor class to implement additional logic specialized for PF2e.
 * @category Actor
 */
export declare class ActorPF2e extends Actor<TokenDocumentPF2e> {
    physicalItems: Collection<Embedded<PhysicalItemPF2e>>;
    constructor(data: PreCreate<ActorSourcePF2e>, context?: ActorConstructorContextPF2e);
    get traits(): Set<string>;
    get level(): number;
    /**
     * Whether the actor can see, given its token placement in the current scene.
     * A meaningful implementation is found in `CreaturePF2e`.
     */
    get canSee(): boolean;
    get visionLevel(): VisionLevel;
    /** Add effect icons from effect items and rule elements */
    get temporaryEffects(): TemporaryEffect[];
    /** Get the actor's held shield. Meaningful implementation in `CreaturePF2e`'s override. */
    get heldShield(): Embedded<ArmorPF2e> | null;
    /**
     * As of Foundry 0.8: All subclasses of ActorPF2e need to use this factory method rather than having their own
     * overrides, since Foundry itself will call `ActorPF2e.create` when a new actor is created from the sidebar.
     */
    static create<A extends ActorPF2e>(
        this: ConstructorOf<A>,
        data: PreCreate<A["data"]["_source"]>,
        context?: DocumentModificationContext,
    ): Promise<A | undefined>;
    static create<A extends ActorPF2e>(
        this: ConstructorOf<A>,
        data: PreCreate<A["data"]["_source"]>[],
        context?: DocumentModificationContext,
    ): Promise<A[]>;
    static create<A extends ActorPF2e>(
        this: ConstructorOf<A>,
        data: PreCreate<A["data"]["_source"]>[] | PreCreate<A["data"]["_source"]>,
        context?: DocumentModificationContext,
    ): Promise<A[] | A | undefined>;
    prepareBaseData(): void;
    /** Prepare physical item getters on this actor and containers */
    prepareEmbeddedEntities(): void;
    /** Disable active effects from a physical item if it isn't equipped and (if applicable) invested */
    applyActiveEffects(): void;
    /** Synchronize the token image with the actor image, if the token does not currently have an image */
    private prepareTokenImg;
    _applyInitiativeRollToCombatTracker(roll: Roll): void;
    getStrikeDescription(weaponData: WeaponData): {
        description: string;
        criticalSuccess: string;
        success: string;
    };
    /**
     * Get all tokens linked to this actor in all scenes
     * @returns An array of TokenDocuments
     */
    getAllTokens(): TokenDocument[];
    /**
     * Roll a Skill Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     */
    rollSkill(event: JQuery.Event, skillName: SkillAbbreviation): void;
    /**
     * Roll a Lore (Item) Skill Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     * @param skill {String}    The skill id
     */
    rollLoreSkill(event: JQuery.Event, item: Embedded<ItemPF2e>): void;
    /**
     * Roll a Save Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     */
    rollSave(event: JQuery.Event, saveName: SaveString): void;
    /**
     * Roll an Ability Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     */
    rollAbility(event: JQuery.Event, abilityName: AbilityString): void;
    /**
     * Roll a Attribute Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     * @param skill {String}    The skill id
     */
    rollAttribute(event: JQuery.Event, attributeName: string): void;
    /**
     * Apply rolled dice damage to the token or tokens which are currently controlled.
     * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
     *
     * @param roll The chat entry which contains the roll data
     * @param multiplier A damage multiplier to apply to the rolled damage.
     */
    static applyDamage(
        roll: JQuery,
        multiplier: number,
        attribute?: string,
        modifier?: number,
        {
            shieldID,
        }?: {
            shieldID?: string;
        },
    ): Promise<boolean>;
    /**
     * Apply rolled dice damage to the token or tokens which are currently controlled.
     * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
     */
    static rollSave(ev: JQuery.ClickEvent, item: Embedded<ItemPF2e>): Promise<void>;
    /**
     * Set initiative for the combatant associated with the selected token or tokens with the rolled dice total.
     * @param roll The chat entry which contains the roll data
     */
    static setCombatantInitiative(roll: JQuery): Promise<void>;
    _setShowUnpreparedSpells(entryId: string, spellLevel: number): Promise<void>;
    isLootableBy(user: UserPF2e): boolean;
    /**
     * Handle how changes to a Token attribute bar are applied to the Actor.
     * This allows for game systems to override this behavior and deploy special logic.
     * @param attribute The attribute path
     * @param value     The target attribute value
     * @param isDelta   Whether the number represents a relative change (true) or an absolute change (false)
     * @param isBar     Whether the new value is part of an attribute bar, or just a direct value
     */
    modifyTokenAttribute(
        attribute: string,
        value: number,
        isDelta?: boolean,
        isBar?: boolean,
        selectedShield?: Embedded<ArmorPF2e> | null,
    ): Promise<this>;
    /**
     * Moves an item to another actor's inventory.
     * @param targetActor Instance of actor to be receiving the item.
     * @param item        Instance of the item being transferred.
     * @param quantity    Number of items to move.
     * @param containerId Id of the container that will contain the item.
     * @return The target item, if the transfer is successful, or otherwise `null`.
     */
    transferItemToActor(
        targetActor: ActorPF2e,
        item: Embedded<ItemPF2e>,
        quantity: number,
        containerId?: string,
    ): Promise<Embedded<PhysicalItemPF2e> | null>;
    /** Find an item already owned by the actor that can stack with the to-be-transferred item */
    private findStackableItem;
    /**
     * Moves an item into the inventory into or out of a container.
     * @param actor       Actor whose inventory should be edited.
     * @param getItem     Lambda returning the item.
     * @param containerId Id of the container that will contain the item.
     */
    stashOrUnstash(item: Embedded<PhysicalItemPF2e>, containerId?: string): Promise<void>;
    /**
     * Handle how changes to a Token attribute bar are applied to the Actor.
     * This allows for game systems to override this behavior and deploy special logic.
     */
    _calculateHealthDelta(args: {
        hp: {
            value: number;
            temp: number;
        };
        sp: {
            value: number;
        };
        delta: number;
    }): {
        update: any;
        delta: number;
    };
    static getActionGraphics(
        actionType: string,
        actionCount?: number,
    ): {
        imageUrl: ImagePath;
        actionGlyph: string;
    };
    /**
     * Adds a custom modifier that will be included when determining the final value of a stat. The
     * name parameter must be unique for the custom modifiers for the specified stat, or it will be
     * ignored.
     */
    addCustomModifier(
        stat: string,
        name: string,
        value: number,
        type: string,
        predicate?: RawPredicate,
        damageType?: string,
        damageCategory?: string,
    ): Promise<void>;
    /** Removes a custom modifier by name. */
    removeCustomModifier(stat: string, modifier: number | string): Promise<void>;
    /** Adds custom damage dice. */
    addDamageDice(param: DamageDicePF2e): Promise<void>;
    /** Removes damage dice by name. */
    removeDamageDice(selector: string, dice: number | string): Promise<void>;
    /** Toggle the given roll option (swapping it from true to false, or vice versa). */
    toggleRollOption(rollName: string, optionName: string): Promise<this>;
    /** Set the given roll option. */
    setRollOption(rollName: string, optionName: string, enabled: boolean): Promise<this>;
    /** Unset (i.e., delete entirely) the given roll option. */
    unsetRollOption(rollName: string, optionName: string): Promise<this>;
    /** Enable the given roll option for thie given roll name. */
    enableRollOption(rollName: string, optionName: string): Promise<this>;
    /** Disable the given roll option for the given roll name. */
    disableRollOption(rollName: string, optionName: string): Promise<this>;
    /** Obtain roll options relevant to rolls of the given types (for use in passing to the `roll` functions on statistics). */
    getRollOptions(rollNames: string[]): string[];
    static getRollOptions(flags: ActorPF2e["data"]["flags"], rollNames: string[]): string[];
    getAbilityMod(ability: AbilityString): number;
    /** Decrease the value of condition or remove it entirely */
    decreaseCondition(
        conditionSlug: ConditionType | Embedded<ConditionPF2e>,
        {
            forceRemove,
        }?: {
            forceRemove: boolean;
        },
    ): Promise<void>;
    /** Increase a valued condition, or create a new one if not present */
    increaseCondition(
        conditionSlug: ConditionType | Embedded<ConditionPF2e>,
        {
            max,
        }?: {
            max: number;
        },
    ): Promise<void>;
}
export interface ActorPF2e {
    readonly data: ActorDataPF2e;
    _sheet: ActorSheetPF2e<ActorPF2e> | ActorSheet<ActorPF2e, ItemPF2e> | null;
    get itemTypes(): {
        [K in ItemType]: Embedded<InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][K]>>[];
    };
    /** See implementation in class */
    createEmbeddedDocuments(
        embeddedName: "ActiveEffect",
        data: PreCreate<foundry.data.ActiveEffectSource>[],
        context?: DocumentModificationContext,
    ): Promise<ActiveEffectPF2e[]>;
    createEmbeddedDocuments(
        embeddedName: "Item",
        data: PreCreate<ItemSourcePF2e>[],
        context?: DocumentModificationContext,
    ): Promise<ItemPF2e[]>;
    createEmbeddedDocuments(
        embeddedName: "ActiveEffect" | "Item",
        data: PreCreate<foundry.data.ActiveEffectSource>[] | PreCreate<ItemSourcePF2e>[],
        context?: DocumentModificationContext,
    ): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
    /** See implementation in class */
    updateEmbeddedDocuments(
        embeddedName: "ActiveEffect",
        updateData: EmbeddedDocumentUpdateData<ActiveEffectPF2e>[],
        options?: DocumentModificationContext,
    ): Promise<ActiveEffectPF2e[]>;
    updateEmbeddedDocuments(
        embeddedName: "Item",
        updateData: EmbeddedDocumentUpdateData<ItemPF2e>[],
        options?: DocumentModificationContext,
    ): Promise<ItemPF2e[]>;
    updateEmbeddedDocuments(
        embeddedName: "ActiveEffect" | "Item",
        updateData: EmbeddedDocumentUpdateData<ActiveEffectPF2e | ItemPF2e>[],
        options?: DocumentModificationContext,
    ): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
    getCondition(
        conditionType: ConditionType,
        {
            all,
        }: {
            all: true;
        },
    ): Embedded<ConditionPF2e>[];
    getCondition(
        conditionType: ConditionType,
        {
            all,
        }: {
            all: false;
        },
    ): Embedded<ConditionPF2e> | null;
    getCondition(conditionType: ConditionType): Embedded<ConditionPF2e> | null;
    getCondition(
        conditionType: ConditionType,
        {
            all,
        }: {
            all: boolean;
        },
    ): Embedded<ConditionPF2e>[] | Embedded<ConditionPF2e> | null;
    getFlag(scope: string, key: string): any;
    getFlag(scope: "pf2e", key: "rollOptions.all.target:flatFooted"): boolean;
}
export {};
