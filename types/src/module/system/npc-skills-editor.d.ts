/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { NPCSkillData } from "@actor/npc/data";
import type { NPCPF2e } from "@actor/index";
import type { ItemPF2e, LorePF2e } from "@item/index";
/**
 * Specialized form to setup skills for an NPC character.
 */
export declare class NPCSkillsEditor extends FormApplication<NPCPF2e> {
    newItems: ItemPF2e[];
    constructor(actor: NPCPF2e, options: FormApplicationOptions);
    get npc(): NPCPF2e;
    static get defaultOptions(): FormApplicationOptions;
    /** Prepare data to be sent to HTML. */
    getData(): {
        skills: Record<string, NPCSkillData>;
        missingSkills: Record<string, NPCSkillData>;
        object?: NPCPF2e | undefined;
        options?: FormApplicationOptions | undefined;
        title?: string | undefined;
    };
    /**
     * Subscribe to events from HTML.
     * @param html
     */
    activateListeners(html: JQuery): void;
    private onAddSkillClicked;
    private onRemoveSkillClicked;
    private onAddLoreSkillClicked;
    private onEditSkillClicked;
    /**
     * Apply changes to the actor based on the data in the form.
     * @param event
     * @param formData
     */
    _updateObject(_event: Event, formData: any): Promise<void>;
    isLoreSkill(skillId: string): boolean;
    /**
     * Checks if a skill is a regular skill or not.
     * @param skillId ID of the skill to check.
     */
    isRegularSkill(skillId: string): boolean;
    /**
     * Converts from the 3-letter ID to the full, lower-letter name.
     * @param skillId ID of the skill.
     */
    findSkillName(skillId: string): string;
    /**
     * Finds the skill item related to the skill provided.
     * Each skill in the characters has an item in the items collection
     * defining the skill. They are of 'lore' type, even for non-lore skills.
     * @param skillId ID of the skill to search for.
     */
    findSkillItem(skillId: string): Embedded<LorePF2e> | null;
}
