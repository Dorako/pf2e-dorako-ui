/// <reference types="jquery" />
import { ActorPF2e } from "@actor/base";
import { CreatureData } from "@actor/data";
import { ModifierPF2e } from "@module/modifiers";
import { ItemPF2e, ArmorPF2e } from "@item";
import { RuleElementPF2e } from "@module/rules/rule-element";
import { RollNotePF2e } from "@module/notes";
import { RuleElementSyntheticsPF2e } from "@module/rules/rules-data-definitions";
import { ActiveEffectPF2e } from "@module/active-effect";
import { DegreeOfSuccessAdjustment, PF2CheckDC } from "@system/check-degree-of-success";
import { VisionLevel } from "./data";
import { Statistic } from "@system/statistic";
/** An "actor" in a Pathfinder sense rather than a Foundry one: all should contain attributes and abilities */
export declare abstract class CreaturePF2e extends ActorPF2e {
    /** Used as a lock to prevent multiple asynchronous redraw requests from triggering an error */
    redrawingTokenEffects: boolean;
    get visionLevel(): VisionLevel;
    get hasDarkvision(): boolean;
    get hasLowLightVision(): boolean;
    get canSee(): boolean;
    get hitPoints(): {
        current: number;
        max: number;
    };
    get attributes(): this["data"]["data"]["attributes"];
    get perception(): Statistic;
    get fortitude(): Statistic;
    get reflex(): Statistic;
    get will(): Statistic;
    get deception(): Statistic;
    get stealth(): Statistic;
    get wornArmor(): Embedded<ArmorPF2e> | null;
    /** Get the held shield of most use to the wielder */
    get heldShield(): Embedded<ArmorPF2e> | null;
    /** Refresh the vision of any controlled tokens linked to this creature */
    protected refreshVision(): void;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    protected _onUpdate(
        changed: DeepPartial<this["data"]["_source"]>,
        options: DocumentModificationContext,
        userId: string,
    ): void;
    /** Compute custom stat modifiers provided by users or given by conditions. */
    protected prepareCustomModifiers(rules: RuleElementPF2e[]): RuleElementSyntheticsPF2e;
    /**
     * Roll a Recovery Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     */
    rollRecovery(): void;
    /** Redraw token effect icons after adding/removing partial ActiveEffects to Actor#temporaryEffects */
    redrawTokenEffects(): void;
    protected buildStatistic(
        stat: {
            adjustments?: DegreeOfSuccessAdjustment[];
            modifiers: readonly ModifierPF2e[];
            notes?: RollNotePF2e[];
        },
        name: string,
        label: string,
        type: string,
    ): Statistic;
    private buildSavingThrowStatistic;
    protected createAttackRollContext(
        event: JQuery.Event,
        rollNames: string[],
    ): {
        event: JQuery.Event;
        options: string[];
        targets: Set<ActorPF2e | null>;
        dc: PF2CheckDC | undefined;
    };
    protected createDamageRollContext(event: JQuery.Event): {
        event: JQuery.Event;
        options: string[];
        targets: Set<ActorPF2e | null>;
    };
    private createStrikeRollContext;
}
export interface CreaturePF2e {
    readonly data: CreatureData;
    /**
     * See implementation in class
     * @override
     */
    updateEmbeddedDocuments(
        embeddedName: "ActiveEffect",
        updateData: EmbeddedDocumentUpdateData<this>[],
        options?: DocumentModificationContext,
    ): Promise<ActiveEffectPF2e[]>;
    updateEmbeddedDocuments(
        embeddedName: "Item",
        updateData: EmbeddedDocumentUpdateData<this>[],
        options?: DocumentModificationContext,
    ): Promise<ItemPF2e[]>;
    updateEmbeddedDocuments(
        embeddedName: "ActiveEffect" | "Item",
        updateData: EmbeddedDocumentUpdateData<this>[],
        options?: DocumentModificationContext,
    ): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
}
