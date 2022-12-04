/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/base";
interface PopupData extends FormApplicationData<ActorPF2e> {
    tokenInfo: Array<{
        id: string;
        name: string;
        checked: boolean;
    }>;
}
export declare class LootNPCsPopup extends FormApplication<ActorPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    activateListeners(html: JQuery): void;
    _updateObject(
        _event: Event,
        formData: FormData & {
            selection?: boolean;
        },
    ): Promise<void>;
    getData(): PopupData;
}
export {};
