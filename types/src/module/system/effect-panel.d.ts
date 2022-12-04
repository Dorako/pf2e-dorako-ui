/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/base";
import { ConditionData, EffectData } from "@item/data";
interface EffectPanelData {
    conditions?: ConditionData[];
    effects?: EffectData[];
    actor?: ActorPF2e;
}
export declare class EffectPanel extends Application {
    actor?: any;
    private timeout;
    static get defaultOptions(): ApplicationOptions & {
        popOut: boolean;
        template: string;
    };
    /**
     * Debounced and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh(): void;
    getData(options?: ApplicationOptions): EffectPanelData;
    activateListeners(html: JQuery): void;
    private static get actor();
    private static getParentConditionsBreakdown;
    private static getRemainingDurationLabel;
}
export {};
