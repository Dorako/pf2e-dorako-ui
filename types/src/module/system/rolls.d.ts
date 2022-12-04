/// <reference types="jquery" />
import { CheckModifiersContext } from "./check-modifiers-dialog";
import { StatisticModifier } from "../modifiers";
import { PF2CheckDC } from "./check-degree-of-success";
import { DamageTemplate } from "@system/damage/weapon";
import { ChatMessagePF2e } from "@module/chat-message";
import { ZeroToThree } from "@module/data";
export interface RollDataPF2e extends RollData {
    totalModifier?: number;
    degreeOfSuccess?: ZeroToThree;
}
/** Possible parameters of a RollFunction */
export interface RollParameters {
    /** The triggering event */
    event?: JQuery.Event;
    /** Any options which should be used in the roll. */
    options?: string[];
    /** Optional DC data for the roll */
    dc?: PF2CheckDC;
    /** Callback called when the roll occurs. */
    callback?: (roll: Rolled<Roll>) => void;
    /** Other roll-specific options */
    [keys: string]: any;
}
interface RerollOptions {
    heroPoint?: boolean;
    keep?: "new" | "best" | "worst";
}
export declare class CheckPF2e {
    /**
     * Roll the given statistic, optionally showing the check modifier dialog if 'Shift' is held down.
     */
    static roll(
        check: StatisticModifier,
        context?: CheckModifiersContext,
        event?: JQuery.Event,
        callback?: (roll: Rolled<Roll>) => void,
    ): void;
    /** Reroll a rolled check given a chat message. */
    static rerollFromMessage(
        message: ChatMessagePF2e,
        { heroPoint, keep }?: RerollOptions,
    ): Promise<void>;
    /**
     * Renders the reroll.
     * This function is rather complicated, as we can unfortunately not pass any values to the renderChatMessage hook.
     * This results in the need to parse the failure and success classes used by foundry directly into the template.
     * Another point of concern is the reason, the render function of rolls does only return a string.
     * This means we cannot use any of the fancy js functions like getElementsByClass etc.
     * @param roll - The reroll that is to be rerendered
     */
    static renderReroll(roll: Roll): Promise<string>;
    /**
     * Takes a rendered roll and inserts the specified class for failure or success into it.
     * @param rollHtml - The prerendered roll template.
     * @param classToInsert - The specifier whether we want to have a success or failure.
     */
    static insertNatOneAndNatTwentyIntoRollTemplate(
        rollHtml: string,
        classToInsert: string,
    ): string;
}
/**
 * @category PF2
 */
export declare class DamageRollPF2e {
    /**
     * @param damage
     * @param context
     * @param event
     * @param callback
     */
    static roll(
        damage: DamageTemplate,
        context: any,
        _event: JQuery.Event | undefined,
        callback?: Function,
    ): void;
}
export {};
