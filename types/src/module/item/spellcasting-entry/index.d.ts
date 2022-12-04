import { ItemPF2e } from "../base";
import { SpellcastingEntryData } from "./data";
export declare class SpellcastingEntryPF2e extends ItemPF2e {
    static get schema(): typeof SpellcastingEntryData;
    get ability(): "str" | "dex" | "con" | "int" | "wis" | "cha";
    get tradition(): "focus" | "arcane" | "divine" | "occult" | "primal" | "ritual" | "halcyon";
    get isSpontaneous(): boolean;
    get isInnate(): boolean;
}
export interface SpellcastingEntryPF2e {
    readonly data: SpellcastingEntryData;
}
