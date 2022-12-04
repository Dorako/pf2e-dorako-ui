import { RuleElementPF2e } from "../rule-element";
import { RuleElementSyntheticsPF2e } from "../rules-data-definitions";
import { CharacterData, NPCData } from "@actor/data";
/**
 * @category RuleElement
 */
export declare class PF2StrikingRuleElement extends RuleElementPF2e {
    onBeforePrepareData(
        actorData: CharacterData | NPCData,
        { striking }: RuleElementSyntheticsPF2e,
    ): void;
}
