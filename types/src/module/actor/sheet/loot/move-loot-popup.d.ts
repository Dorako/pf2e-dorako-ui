/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/base";
interface MoveLootOptions extends FormApplicationOptions {
    maxQuantity: number;
}
interface MoveLootFormData extends FormData {
    quantity: number;
}
declare type MoveLootCallback = (quantity: number) => void;
export declare class MoveLootPopup extends FormApplication<{}, MoveLootOptions> {
    onSubmitCallback: MoveLootCallback;
    constructor(object: ActorPF2e, options: MoveLootOptions, callback: MoveLootCallback);
    getData(): {
        maxQuantity: number;
        object?: {} | undefined;
        options?: FormApplicationOptions | undefined;
        title?: string | undefined;
    };
    static get defaultOptions(): FormApplicationOptions;
    activateListeners(html: JQuery): void;
    _updateObject(_event: ElementDragEvent, formData: MoveLootFormData): Promise<void>;
}
export {};
