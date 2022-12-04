import type { ActorPF2e } from "@actor/base";
import { CombatPF2e } from "./combat";
import { TokenDocumentPF2e } from "./token-document";
export declare class CombatantPF2e extends Combatant {
    /** In order for the Combat Tracker's "Skip Defeated" feature to function, a Combatant instance needs a `defeated`
     *  property or an ActiveEffect with a flag located at `core.statusId`, corresponding with
     *  the value of CONFIG.Combat.defeatedStatusId
     */
    get defeated(): boolean;
    /**
     * Hide the tracked resource if the combatant represents a non-player-owned actor
     * @todo Make this a configurable with a metagame-knowledge setting
     */
    updateResource(): {
        value: number;
    } | null;
    _getInitiativeFormula(): string;
}
export interface CombatantPF2e {
    readonly parent: CombatPF2e | null;
    _actor: ActorPF2e | null;
    _token: TokenDocumentPF2e | null;
}
