import { Coins } from "@item/treasure/helpers";
import { ActorPF2e } from "../../base";
interface PopupFormData extends Coins {
    removeByValue: boolean;
}
/**
 * @category Other
 */
export declare class RemoveCoinsPopup extends FormApplication<ActorPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    _updateObject(_event: Event, formData: PopupFormData): Promise<void>;
}
export {};
