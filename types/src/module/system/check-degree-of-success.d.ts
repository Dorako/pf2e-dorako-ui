import { DegreeAdjustment, DegreeOfSuccess } from "../degree-of-success";
import { RollDataPF2e } from "./rolls";
import { ModifierPredicate } from "@module/modifiers";
export interface PF2CheckDCModifiers {
    all?: "one-degree-better" | "one-degree-worse";
    criticalFailure?: "one-degree-better" | "one-degree-worse";
    failure?: "one-degree-better" | "one-degree-worse";
    success?: "one-degree-better" | "one-degree-worse";
    criticalSuccess?: "one-degree-better" | "one-degree-worse";
}
export interface DegreeOfSuccessAdjustment {
    modifiers: PF2CheckDCModifiers;
    predicate?: ModifierPredicate;
}
export interface PF2CheckDC {
    label?: string;
    modifiers?: PF2CheckDCModifiers;
    scope?: "AttackOutcome" | "CheckOutcome";
    adjustments?: DegreeOfSuccessAdjustment[];
    value: number;
    visibility?: "none" | "gm" | "owner" | "all";
}
export declare const DegreeOfSuccessText: readonly [
    "criticalFailure",
    "failure",
    "success",
    "criticalSuccess",
];
export declare type DegreeOfSuccessString = typeof DegreeOfSuccessText[number];
export declare function getDegreeOfSuccess(
    roll: Roll<RollDataPF2e>,
    checkDC: PF2CheckDC,
): {
    unadjusted: DegreeOfSuccess;
    value: DegreeOfSuccess;
    degreeAdjustment: DegreeAdjustment | undefined;
};
