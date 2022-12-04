import { CreatureData } from "@actor/data";
import { RuleElementPF2e } from "../rule-element";
import { RuleElementSyntheticsPF2e } from "@module/rules/rules-data-definitions";
import { ItemDataPF2e } from "@item/data";
/**
 * @category RuleElement
 */
export declare class PF2TokenEffectIconRuleElement extends RuleElementPF2e {
    constructor(ruleData: any, item: ItemDataPF2e);
    onAfterPrepareData(actorData: CreatureData, synthetics: RuleElementSyntheticsPF2e): void;
}
