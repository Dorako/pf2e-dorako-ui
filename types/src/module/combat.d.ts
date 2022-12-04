import { CombatantPF2e } from "./combatant";
export declare class CombatPF2e extends Combat<CombatantPF2e> {
    get active(): boolean;
    /** Exclude orphaned and loot-actor tokens from combat */
    createEmbeddedDocuments(
        embeddedName: "Combatant",
        data: PreCreate<foundry.data.CombatantSource>[],
        context?: DocumentModificationContext,
    ): Promise<CombatantPF2e[]>;
}
export interface CombatPF2e {
    readonly data: foundry.data.CombatData<this, CombatantPF2e>;
}
