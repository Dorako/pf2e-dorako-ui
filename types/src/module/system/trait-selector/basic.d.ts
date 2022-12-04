/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/index";
import { ItemPF2e } from "@item/index";
import { TraitSelectorBase } from "./base";
import { BasicSelectorOptions, SelectableTagField } from "./index";
export declare class TagSelectorBasic extends TraitSelectorBase {
    allowCustom: boolean;
    searchString: string;
    private filterTimeout;
    constructor(object: ActorPF2e | ItemPF2e, options: BasicSelectorOptions);
    protected get configTypes(): readonly SelectableTagField[];
    static get defaultOptions(): FormApplicationOptions & {
        id: string;
        classes: string[];
        width: string;
        height: number;
    } & {
        template: string;
        title: string;
        height: number;
    };
    getData(): {
        choices: Record<
            string,
            {
                label: string;
                selected: boolean;
            }
        >;
        allowCustom: boolean;
        custom: string | null;
        object?: ActorPF2e | ItemPF2e | undefined;
        options?: FormApplicationOptions | undefined;
        title?: string | undefined;
    };
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
    private getUpdateData;
    /**
     * Filter the potential traits to only show ones which match a provided search string
     * @param searchString The search string to match
     */
    private search;
    /**
     * Handle trait filtering through search field
     * Toggle the visibility of indexed trait entries by name match
     */
    private onFilterResults;
}
export interface TagSelectorBasic {
    options: BasicSelectorOptions;
}
