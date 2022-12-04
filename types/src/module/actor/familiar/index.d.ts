import { CharacterPF2e, NPCPF2e } from "@actor/index";
import { CreaturePF2e } from "../creature";
import { ItemSourcePF2e } from "@item/data";
import { ActiveEffectPF2e } from "@module/active-effect";
import { ItemPF2e } from "@item/base";
import { FamiliarData } from "./data";
export declare class FamiliarPF2e extends CreaturePF2e {
    static get schema(): typeof FamiliarData;
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | NPCPF2e | null;
    /** Set base emphemeral data for later updating by derived-data preparation */
    prepareBaseData(): void;
    /** Active effects on a familiar require a master, so wait until embedded documents are prepared */
    applyActiveEffects(): void;
    prepareDerivedData(): void;
}
export interface FamiliarPF2e {
    readonly data: FamiliarData;
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
        data: PreCreate<foundry.data.ActiveEffectSource>[] | Partial<ItemSourcePF2e>[],
        context?: DocumentModificationContext,
    ): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
}
