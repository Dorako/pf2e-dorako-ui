import { Size } from "@module/data";
import { ABCItemPF2e } from "../abc";
import { AncestryData } from "./data";
export declare class AncestryPF2e extends ABCItemPF2e {
    static get schema(): typeof AncestryData;
    get hitPoints(): number;
    get speed(): number;
    get size(): Size;
}
export interface AncestryPF2e {
    readonly data: AncestryData;
}
