/**
 * Implementation of Identify Magic and Identify Alchemy Rules for items
 * https://2e.aonprd.com/Actions.aspx?ID=24
 * https://2e.aonprd.com/Actions.aspx?ID=44
 *
 * See https://www.youtube.com/watch?v=MJ7gUq9InBk for interpretations
 */
import { PhysicalItemData } from "./data";
import { DCOptions } from "../dc";
import { PhysicalItemPF2e } from "./physical";
export declare class IdentifyMagicDCs {
    arc: number;
    nat: number;
    rel: number;
    occ: number;
    constructor(arc: number, nat: number, rel: number, occ: number);
}
export declare class IdentifyAlchemyDCs {
    cra: number;
    constructor(cra: number);
}
export declare class GenericIdentifyDCs {
    dc: number;
    constructor(dc: number);
}
export declare function isMagical(itemData: PhysicalItemData): boolean;
interface IdentifyItemOptions extends DCOptions {
    notMatchingTraditionModifier: number;
}
export declare function identifyItem(
    item: PhysicalItemPF2e,
    { proficiencyWithoutLevel, notMatchingTraditionModifier }: IdentifyItemOptions,
): GenericIdentifyDCs | IdentifyMagicDCs | IdentifyAlchemyDCs;
export declare function getUnidentifiedPlaceholderImage(itemData: PhysicalItemData): string;
export {};
