import { ABCItemPF2e } from "../abc";
import { BackgroundData } from "./data";
export declare class BackgroundPF2e extends ABCItemPF2e {
    static get schema(): typeof BackgroundData;
}
export interface BackgroundPF2e {
    readonly data: BackgroundData;
}
