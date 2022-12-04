import { ItemDataPF2e } from "@item/data";
import { CharacterData, FamiliarData, NPCData } from "@actor/data";
import { RuleElementPF2e } from "../rule-element";
/**
 * @category RuleElement
 */
export declare class PF2SetPropertyRuleElement extends RuleElementPF2e {
    onCreate(
        actorData: CharacterData | NPCData | FamiliarData,
        _item: ItemDataPF2e,
        actorUpdates: any,
    ): void;
    onDelete(
        actorData: CharacterData | NPCData | FamiliarData,
        _item: ItemDataPF2e,
        actorUpdates: any,
    ): void;
    private getSafePropertyName;
}
