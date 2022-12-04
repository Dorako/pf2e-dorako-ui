import { CharacterData, NPCData } from "@actor/data";
import { RuleElementPF2e } from "../rule-element";
import { RuleElementSyntheticsPF2e } from "../rules-data-definitions";
/**
 * @category RuleElement
 */
export declare class PF2StrikeRuleElement extends RuleElementPF2e {
    onBeforePrepareData(
        actorData: CharacterData | NPCData,
        { strikes }: RuleElementSyntheticsPF2e,
    ): void;
}
