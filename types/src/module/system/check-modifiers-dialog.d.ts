/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { StatisticModifier } from "../modifiers";
import { ActorPF2e } from "@actor/base";
import { RollNotePF2e } from "../notes";
import { PF2CheckDC } from "./check-degree-of-success";
export interface CheckModifiersContext {
    /** Any options which should be used in the roll. */
    options?: string[];
    /** Any notes which should be shown for the roll. */
    notes?: RollNotePF2e[];
    /** If true, this is a secret roll which should only be seen by the GM. */
    secret?: boolean;
    /** The roll mode (i.e., 'roll', 'blindroll', etc) to use when rendering this roll. */
    rollMode?: string;
    /** Should this roll be rolled with 'fortune' (2 dice, keep higher) or 'misfortune' (2 dice, keep lower)? */
    fate?: string;
    /** The actor which initiated this roll. */
    actor?: ActorPF2e;
    /** Optional title of the roll options dialog; defaults to the check name */
    title?: string;
    /** The type of this roll, like 'perception-check' or 'saving-throw'. */
    type?: string;
    /** Any traits for the check. */
    traits?: string[];
    /** Optional DC data for the check */
    dc?: PF2CheckDC;
}
/**
 * Dialog for excluding certain modifiers before rolling a check.
 * @category Other
 */
export declare class CheckModifiersDialog extends Application {
    /** The check which is being edited. */
    check: StatisticModifier;
    /** Relevant context for this roll, like roll options. */
    context: CheckModifiersContext;
    /** Callback called when the roll occurs. */
    callback?: (roll: Rolled<Roll>) => void;
    constructor(
        check: StatisticModifier,
        context?: CheckModifiersContext,
        callback?: (roll: Rolled<Roll>) => void,
    );
    /** Roll the given check, rendering the roll to the chat menu. */
    static roll(
        check: StatisticModifier,
        context?: CheckModifiersContext,
        callback?: (roll: Rolled<Roll>) => void,
    ): Promise<void>;
    getData(): {
        appId: string;
        check: StatisticModifier;
        rollModes: Record<RollMode, string>;
        rollMode: string | undefined;
        showRollDialogs: boolean;
        fortune: boolean;
        none: boolean;
        misfortune: boolean;
    };
    activateListeners(html: JQuery): void;
    onAddModifier(event: JQuery.ClickEvent): void;
    onChangeRollMode(event: JQuery.ChangeEvent): void;
    protected _getHeaderButtons(): ApplicationHeaderButton[];
}
