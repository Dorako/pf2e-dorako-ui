import { ActorPF2e } from "@actor/index";
import { ItemPF2e } from "@item/index";
import { SelectableTagField, TagSelectorOptions } from "./index";
export declare abstract class TraitSelectorBase<
    EntityType extends ActorPF2e | ItemPF2e = ActorPF2e | ItemPF2e,
> extends FormApplication<EntityType> {
    choices: Record<string, string>;
    objectProperty: string;
    constructor(object: EntityType, options?: TagSelectorOptions);
    protected abstract get configTypes(): readonly SelectableTagField[];
    static get defaultOptions(): FormApplicationOptions & {
        id: string;
        classes: string[];
        width: string;
        height: number;
    };
    protected abstract _updateObject(
        event: Event,
        formData: Record<string, unknown>,
    ): Promise<void>;
    /**
     * Builds an object of all keys of this.configTypes from CONFIG.PF2E
     * @returns An object of all key and translated value pairs sorted by key
     */
    private getChoices;
    /** Sort and localize choices */
    protected sortChoices(choices: Record<string, string>): Record<string, string>;
}
export interface TraitSelectorBase {
    options: TagSelectorOptions;
}
