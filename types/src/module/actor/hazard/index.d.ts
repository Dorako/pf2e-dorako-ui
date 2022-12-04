import { HazardData } from "./data";
import { ActorPF2e } from "@actor/index";
export declare class HazardPF2e extends ActorPF2e {
    static get schema(): typeof HazardData;
}
export interface HazardPF2e {
    readonly data: HazardData;
}
