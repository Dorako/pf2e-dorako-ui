/**
 * Implementation of Earn Income rules on https://2e.aonprd.com/Skills.aspx?ID=2&General=true
 */
import { ProficiencyRank } from "@item/data";
import { Coins } from "../../module/item/treasure/helpers";
import { DCOptions } from "../../module/dc";
import { DegreeOfSuccess, DieRoll } from "../../module/degree-of-success";
declare type TrainedProficiencies = Exclude<ProficiencyRank, "untrained">;
export interface EarnIncomeResult {
    rewards: {
        perDay: Partial<Coins>;
        combined: Partial<Coins>;
    };
    degreeOfSuccess: DegreeOfSuccess;
    daysSpentWorking: number;
    level: number;
    dc: number;
    roll: number;
}
export interface PerDayEarnIncomeResult {
    rewards: Partial<Coins>;
    degreeOfSuccess: DegreeOfSuccess;
}
export interface EarnIncomeOptions {
    useLoreAsExperiencedProfessional: boolean;
}
export declare function multiplyIncome(income: Partial<Coins>, factor: number): Partial<Coins>;
/**
 * @param level number between 0 and 20
 * @param days how many days you want to work for
 * @param roll the actual die roll
 * @param proficiency proficiency in the relevant skill
 * @param earnIncomeOptions feats or items that affect earn income
 * @param dcOptions if dc by level is active
 */
export declare function earnIncome(
    level: number,
    days: number,
    roll: DieRoll,
    proficiency: TrainedProficiencies,
    earnIncomeOptions: EarnIncomeOptions,
    dcOptions: DCOptions,
): EarnIncomeResult;
export {};
