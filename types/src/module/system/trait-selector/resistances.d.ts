/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/index";
import { TraitSelectorBase } from "./base";
import { SelectableTagField } from "./index";
export declare class TraitSelectorResistances extends TraitSelectorBase<ActorPF2e> {
    objectProperty: string;
    static get defaultOptions(): FormApplicationOptions & {
        id: string;
        classes: string[];
        width: string;
        height: number;
    } & {
        id: string;
        classes: string[];
        template: string;
        title: string;
        width: string;
        height: number;
    };
    protected get configTypes(): readonly SelectableTagField[];
    getData(): any;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
    protected getUpdateData(formData: Record<string, unknown>): Record<string, unknown>[];
}
export interface TraitSelectorResistances {
    options: FormApplicationOptions;
}
