import { ItemDataPF2e } from "@item/data";
import { CharacterData, NPCData } from "@actor/data";
import { RuleElementPF2e } from "../rule-element";
/**
 * @category RuleElement
 */
export declare class PF2TokenImageRuleElement extends RuleElementPF2e {
    onCreate(
        actorData: CharacterData | NPCData,
        item: ItemDataPF2e,
        actorUpdates: any,
        tokens: any[],
    ): void;
    onDelete(
        actorData: CharacterData | NPCData,
        item: ItemDataPF2e,
        actorUpdates: any,
        tokens: any[],
    ): void;
}
