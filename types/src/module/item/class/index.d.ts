import type { CharacterPF2e } from "@actor/character";
import { ABCItemPF2e } from "../abc";
import { ClassData } from "./data";
export declare class ClassPF2e extends ABCItemPF2e {
    static get schema(): typeof ClassData;
    get hpPerLevel(): number;
    addFeatures(actor: CharacterPF2e): Promise<void>;
    ensureClassFeaturesForLevel(actor: CharacterPF2e, minLevelInput?: number): Promise<void>;
}
export interface ClassPF2e {
    readonly data: ClassData;
}
