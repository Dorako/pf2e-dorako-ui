/**
 * Degree of Success rules as of https://2e.aonprd.com/Rules.aspx?ID=319
 */
export interface DieRoll {
    dieValue: number;
    modifier: number;
}
export declare enum DegreeOfSuccess {
    CRITICAL_FAILURE = 0,
    FAILURE = 1,
    SUCCESS = 2,
    CRITICAL_SUCCESS = 3,
}
export declare enum DegreeAdjustment {
    LOWER = 0,
    INCREASE = 1,
}
export declare function adjustDegreeOfSuccess(
    adjustment: DegreeAdjustment,
    degreeOfSuccess: DegreeOfSuccess,
): DegreeOfSuccess;
/**
 * @param dieValue rolled number on the die
 * @param degreeOfSuccess current success value
 */
export declare function adjustDegreeByDieValue(
    dieValue: number,
    degreeOfSuccess: DegreeOfSuccess,
): DegreeOfSuccess;
export declare function calculateDegreeOfSuccess(roll: DieRoll, dc: number): DegreeOfSuccess;
