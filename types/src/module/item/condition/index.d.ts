import { ItemPF2e } from "../base";
import { ConditionData } from "./data";
export declare class ConditionPF2e extends ItemPF2e {
    static get schema(): typeof ConditionData;
    get value(): number | null;
    get duration(): number | null;
    /** Is the condition currently active? */
    get isActive(): boolean;
    /** Is the condition from the pf2e system or a module? */
    get fromSystem(): boolean;
    /** Is the condition found in the token HUD menu? */
    get isInHUD(): boolean;
}
export interface ConditionPF2e {
    readonly data: ConditionData;
    getFlag(scope: string, key: string): unknown;
    getFlag(scope: "core", key: "sourceId"): string | undefined;
    getFlag(scope: "pf2e", key: "condition"): true | undefined;
}
