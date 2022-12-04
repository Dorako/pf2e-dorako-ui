import { RuleElementPF2e } from "../rule-element";
import { CharacterData, NPCData } from "@actor/data";
import { SkillAbbreviation } from "@actor/creature/data";
import { PF2CheckDCModifiers } from "@system/check-degree-of-success";
/**
 * @category RuleElement
 */
export declare class PF2AdjustDegreeOfSuccessRuleElement extends RuleElementPF2e {
    onBeforePrepareData(actorData: CharacterData | NPCData): void;
    skillAbbreviationFromString(skill: string): SkillAbbreviation | undefined;
    isAdjustmentData(adjustment: PF2CheckDCModifiers): boolean;
}
