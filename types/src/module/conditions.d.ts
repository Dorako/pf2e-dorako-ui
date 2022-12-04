import { ModifierPF2e } from "./modifiers";
import type { ConditionData, ConditionSource } from "@item/condition/data";
import { ConditionPF2e } from "@item/condition";
import { TokenPF2e } from "./canvas/token";
/** A helper class to manage PF2e Conditions. */
export declare class ConditionManager {
    static _compediumConditions: Map<string, ConditionData>;
    static _customConditions: Map<string, ConditionData>;
    static _compendiumConditionStatusNames: Map<string, ConditionData>;
    static _customStatusNames: Map<string, ConditionData>;
    static __conditionsCache: Map<string, ConditionData>;
    /**
     * Gets a collection of conditions.
     * @return A list of status names.
     */
    static get conditions(): Map<string, ConditionData>;
    /** Gets a list of condition names. */
    static get conditionsNames(): IterableIterator<string>;
    /** Gets a list of status names. */
    static get statusNames(): IterableIterator<string>;
    static init(): Promise<void>;
    /**
     * Get a condition using the condition name.
     * @param conditionKey A list of conditions
     */
    static getCondition(conditionKey: string): ConditionData;
    /**
     * Get a condition using the status name.
     * @param statusName A list of conditions
     */
    static getConditionByStatusName(statusName: string): ConditionData | undefined;
    /**
     * Creates a new custom condition object.
     * @param name The name of the condition.
     * @param data The condition data to use.
     * @return True if the object was created.
     */
    static createCustomCondition(name: string, data: ConditionData): boolean;
    /**
     * Deletes a custom condition object.
     * @param name The name of the condition.
     * @return True if the object was deleted.
     */
    static deleteCustomCondition(name: string): boolean;
    /**
     * Takes a list of valued conditions with the same base and selects the highest value.
     * @param conditions A filtered list of conditions with the same base name.
     * @param updates    A running list of updates to make to embedded items.
     */
    private static processValuedCondition;
    /**
     * Takes a list of toggle conditions with the same base and selects the first.
     *
     * @param conditions A filtered list of conditions with the same base name.
     * @param updates    A running list of updates to make to embedded items.
     */
    private static processToggleCondition;
    /**
     * Clears any overrides from a condition.
     *
     * @param condition The condition to check, and remove, any overrides.
     * @param updates   A running list of updates to make to embedded items.
     */
    private static clearOverrides;
    private static processOverride;
    private static processConditions;
    /**
     * Gets a map of modifiers from a collection of conditions.
     *
     * @param conditions A collection of conditions to retrieve modifiers from.
     * @return A map of PF2Modifiers from the conditions collection.
     */
    static getModifiersFromConditions(
        conditions: IterableIterator<ConditionData>,
    ): Map<string, Array<ModifierPF2e>>;
    /**
     * Adds a condition to a token.
     * @param name  A collection of conditions to retrieve modifiers from.
     * @param token The token to add the condition to.
     */
    static addConditionToToken(
        name: string | ConditionSource,
        token: TokenPF2e,
    ): Promise<ConditionPF2e | null>;
    private static createConditions;
    /**
     * Removes a condition from a token.
     * @param name  A collection of conditions to retrieve modifiers from.
     * @param token The token to add the condition to.
     */
    static removeConditionFromToken(id: string | string[], token: TokenPF2e): Promise<void>;
    private static deleteConditions;
    static updateConditionValue(id: string, token: TokenPF2e, value: number): Promise<void>;
    static getFlattenedConditions(items: ConditionData[]): any[];
    private static sortCondition;
}
