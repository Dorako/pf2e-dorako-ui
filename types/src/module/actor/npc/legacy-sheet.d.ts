/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { NPCLegacyEditSheetPF2e } from "./legacy-edit-sheet";
export declare class NPCLegacySheetPF2e extends NPCLegacyEditSheetPF2e {
    get template(): string;
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        submitOnClose: boolean;
        scrollY: string[];
    };
    get title(): string;
    getData(): any;
    private getLootData;
    get isLootSheet(): boolean;
    /** Increases the NPC via the Elite/Weak adjustment rules */
    npcAdjustment(increase: boolean): void;
    /** Check if Elite */
    get npcIsElite(): boolean;
    /** Check if Weak */
    get npcIsWeak(): boolean;
    /**
     * Roll NPC Damage using DamageRoll
     * Rely upon the DicePF2e.damageRoll logic for the core implementation
     */
    rollNPCDamageRoll(event: any, damageRoll: any, item: any): void;
    /** Toggle expansion of an attackEffect ability if it exists. */
    expandAttackEffect(attackEffectName: string, event: JQuery.TriggeredEvent): void;
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
}
