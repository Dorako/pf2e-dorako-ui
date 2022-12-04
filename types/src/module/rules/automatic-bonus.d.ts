import { RuleElementSyntheticsPF2e } from "./rules-data-definitions";
export declare class AutomaticBonusProgression {
    /**
     * @param level The name of this collection of statistic modifiers.
     * @param synthetics All relevant modifiers for this statistic.
     */
    static concatModifiers(level: number, synthetics: RuleElementSyntheticsPF2e): void;
    private static abpValues;
}
