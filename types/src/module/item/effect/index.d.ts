import { ItemPF2e } from "../base";
import { EffectData } from "./data";
export declare class EffectPF2e extends ItemPF2e {
    static get schema(): typeof EffectData;
    static readonly DURATION_UNITS: Record<string, number>;
    prepareData(): void;
    get totalDuration(): number;
    get remainingDuration(): {
        expired: boolean;
        remaining: number;
    };
}
export interface EffectPF2e {
    readonly data: EffectData;
}
