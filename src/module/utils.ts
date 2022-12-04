/**
 * Calculates the average expected result for a roll.
 * @param formula
 * @returns
 */
export function calculateRoll(formula: string) {
    if (!formula) return { max: 0, min: 0, average: 0 };
    const max = new Roll(formula).evaluate({ maximize: true }).total;
    const min = new Roll(formula).evaluate({ minimize: true }).total;
    const average = (max - min) / 2 + min;
    return { min, average, max };
}
