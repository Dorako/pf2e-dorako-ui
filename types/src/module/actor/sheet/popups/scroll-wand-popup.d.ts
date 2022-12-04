import { ActorPF2e } from "@actor/index";
import { SpellSource } from "@item/spell/data";
/**
 * @category Other
 */
export declare class ScrollWandPopup extends FormApplication<ActorPF2e> {
    onSubmitCallback: (a: number, b: string, spellData: SpellSource) => void;
    spellData?: SpellSource;
    constructor(
        object: ActorPF2e,
        options: FormApplicationOptions,
        callback: (a: number, b: string, c: SpellSource) => void,
        spellData: SpellSource,
    );
    static get defaultOptions(): FormApplicationOptions;
    getData(): FormApplicationData<ActorPF2e>;
    _updateObject(
        _event: Event,
        formData: {
            itemType: string;
            level: number;
        },
    ): Promise<void>;
}
