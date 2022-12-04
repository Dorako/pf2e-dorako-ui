/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/base";
import { TraitSelectorBase } from "./base";
import { SelectableTagField } from "./index";
export declare class TraitSelectorSpeeds extends TraitSelectorBase<ActorPF2e> {
    objectProperty: string;
    static get defaultOptions(): FormApplicationOptions & {
        id: string;
        classes: string[];
        width: string;
        height: number;
    } & {
        template: string;
        title: string;
    };
    protected get configTypes(): readonly SelectableTagField[];
    getData(): any;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
    protected getUpdateData(formData: Record<string, unknown>): {
        type: string;
        label: string;
        value: string;
    }[];
}
export interface TraitSelectorSpeeds {
    options: FormApplicationOptions;
}
