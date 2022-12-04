/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CreatureSheetPF2e } from "../creature/sheet";
import { NPCPF2e } from "@actor/index";
import { IdentifyCreatureData } from "@module/recall-knowledge";
import { ConditionData, EffectData, ItemDataPF2e, SpellcastingEntryData } from "@item/data";
import { ActorSheetDataPF2e, SheetInventory } from "../sheet/data-types";
import { LabeledString } from "@module/data";
import { NPCAttributes, NPCSkillData, NPCStrike, NPCSystemData } from "./data";
import { CreatureTraitsData, SaveString, SkillAbbreviation } from "@actor/creature/data";
interface NPCSheetLabeledValue extends LabeledString {
    localizedName?: string;
}
interface ActionsDetails {
    label: string;
    actions: ItemDataPF2e[];
}
interface ActionActions {
    passive: ActionsDetails;
    free: ActionsDetails;
    reaction: ActionsDetails;
    action: ActionsDetails;
}
interface Attack {
    attack: NPCStrike;
    traits: {
        label: string;
        description: string;
    }[];
}
declare type Attacks = Attack[];
interface NPCSystemSheetData extends NPCSystemData {
    attributes: NPCAttributes & {
        shieldBroken?: boolean;
    };
    details: NPCSystemData["details"] & {
        alignment: {
            localizedName?: string;
        };
    };
    sortedSkills: Record<string, NPCSkillData>;
    traits: CreatureTraitsData & {
        senses: NPCSheetLabeledValue[];
        size: {
            localizedName?: string;
        };
    };
}
/** Additional fields added in sheet data preparation */
interface NPCSheetData extends ActorSheetDataPF2e<NPCPF2e> {
    actions: ActionActions;
    attacks: Attacks;
    data: NPCSystemSheetData;
    items: SheetItemData[];
    effectItems: EffectData[];
    conditions: ConditionData[];
    spellcastingEntries: SpellcastingSheetData[];
    orphanedSpells: boolean;
    orphanedSpellbook: any;
    identifyCreatureData?: IdentifyCreatureData;
    identifySkillDC?: number;
    identifySkillAdjustment?: string;
    identifySkillProgression?: string;
    identificationSkills?: string[];
    identificationSkillList?: string;
    specificLoreDC?: number;
    specificLoreAdjustment?: string;
    specificLoreProgression?: string;
    unspecificLoreDC?: number;
    unspecificLoreAdjustment?: string;
    unspecificLoreProgression?: string;
    isNotCommon?: boolean;
    actorSize?: string;
    actorAttitudes?: ConfigPF2e["PF2E"]["attitude"];
    actorAttitude?: string;
    traits?: Record<string, string>;
    immunities?: Record<string, string>;
    languages?: Record<string, string>;
    isWeak?: boolean;
    isElite?: boolean;
    eliteState: "active" | "inactive";
    weakState: "active" | "inactive";
    notAdjusted: boolean;
    inventory: SheetInventory;
    hasShield?: boolean;
}
declare type SheetItemData<T extends ItemDataPF2e = ItemDataPF2e> = T & {
    glyph: string;
    imageUrl: string;
    traits: {
        label: string;
        description?: string;
    }[];
    chatData?: unknown;
    data: {
        components: {
            somatic: boolean;
            verbal: boolean;
            material: boolean;
        };
        bonus: {
            value: number;
            total?: number;
        };
        isAgile?: boolean;
        prepared?: boolean;
        tradition?: {
            ritual: boolean;
            focus: boolean;
        };
        weaponType?: string;
    };
};
interface SpellcastingSheetData extends SheetItemData<SpellcastingEntryData> {
    spellbook?: any;
}
export declare class NPCSheetPF2e extends CreatureSheetPF2e<NPCPF2e> {
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        submitOnClose: boolean;
        scrollY: string[];
    };
    /** Show either the actual NPC sheet or a briefened lootable version if the NPC is dead */
    get template(): string;
    /** Use the token name as the title if showing a lootable NPC sheet */
    get title(): string;
    get isLootSheet(): boolean;
    /**
     * Prepares items in the actor for easier access during sheet rendering.
     * @param actorData Data from the actor associated to this sheet.
     */
    protected prepareItems(sheetData: NPCSheetData): void;
    getData(): NPCSheetData;
    /**
     * Subscribe to events from the sheet.
     * @param html HTML content ready to render the sheet.
     */
    activateListeners(html: JQuery<HTMLElement>): void;
    private prepareOptions;
    private prepareAbilities;
    private prepareSize;
    private prepareAlignment;
    private preparePerception;
    protected prepareSenses(actorData: NPCSystemSheetData): void;
    private prepareSkills;
    private prepareSpeeds;
    private prepareSaves;
    /**
     * Prepares the actions list to be accessible from the sheet.
     * @param actorData Data of the actor to be shown in the sheet.
     */
    private prepareActions;
    private prepareAttacks;
    /**
     * Prepare spells and spell entries
     * @param sheetData Data of the actor to show in the sheet.
     */
    private prepareSpellcasting;
    /**
     * Prepares the equipment list of the actor.
     * @param sheetData Data of the sheet.
     */
    prepareInventory(sheetData: { items: ItemDataPF2e[] }): SheetInventory;
    private get isWeak();
    private get isElite();
    private getSizeLocalizedKey;
    private getAbilityNameKey;
    private rollPerception;
    private rollAbility;
    rollNPCSkill(event: JQuery.ClickEvent, skillId: SkillAbbreviation): void;
    rollSave(event: JQuery.ClickEvent, saveId: SaveString): void;
    private onClickRollable;
    private hideControls;
    private showControls;
    private baseInputOnFocus;
    private baseInputOnFocusOut;
    private onSkillsEditClicked;
    private onClickExpandable;
    private onClickToChat;
    private onClickMakeWeak;
    private onClickMakeElite;
    private onChangeSpellcastingEntry;
    private onSpellSlotIncrementReset;
    private assignActionGraphics;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
export {};
