import { RuleElementSource } from "./rules-data-definitions";
import { RuleElementPF2e } from "./rule-element";
import { ItemPF2e } from "../item";
export { RuleElementPF2e };

export declare type RuleElementConstructor = new (
    data: RuleElementSource,
    item: Embedded<ItemPF2e>,
) => RuleElementPF2e;

/**
 * @category RuleElement
 */
export declare class RuleElements {
    static readonly builtin: Record<string, RuleElementConstructor>;
    static custom: Record<string, RuleElementConstructor>;
    static fromOwnedItem(item: Embedded<ItemPF2e>): RuleElementPF2e[];
}
