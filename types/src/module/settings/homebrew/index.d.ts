/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { MenuTemplateData, SettingsMenuPF2e } from "../menu";
import { BaseWeaponType } from "@item/weapon/data";
import "@yaireo/tagify/src/tagify.scss";
export declare type ConfigPF2eHomebrewList = typeof HomebrewElements.SETTINGS[number];
export declare type HomebrewSettingsKey = `homebrew.${ConfigPF2eHomebrewList}`;
export interface HomebrewTag<T extends ConfigPF2eHomebrewList = ConfigPF2eHomebrewList> {
    id: T extends "baseWeapons"
        ? BaseWeaponType
        : T extends Exclude<ConfigPF2eHomebrewList, "baseWeapons">
        ? keyof ConfigPF2e["PF2E"][T]
        : never;
    value: string;
}
export declare class HomebrewElements extends SettingsMenuPF2e {
    static readonly namespace = "homebrew";
    /** Whether this is the first time the homebrew tags will have been injected into CONFIG and actor derived data */
    private static initialRefresh;
    static readonly SETTINGS: readonly [
        "creatureTraits",
        "featTraits",
        "languages",
        "magicSchools",
        "spellTraits",
        "weaponCategories",
        "weaponGroups",
        "baseWeapons",
    ];
    static get defaultOptions(): FormApplicationOptions & {
        title: string;
        id: string;
        template: string;
        width: number;
        height: string;
        closeOnSubmit: boolean;
    };
    protected static get settings(): Record<ConfigPF2eHomebrewList, ClientSettingsData>;
    getData(): MenuTemplateData;
    activateListeners($form: JQuery<HTMLFormElement>): void;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(
        event: Event,
        { updateData, preventClose, preventRender }?: OnSubmitFormOptions,
    ): Promise<Record<string, unknown>>;
    protected _updateObject(
        _event: Event,
        data: Record<ConfigPF2eHomebrewList, HomebrewTag[]>,
    ): Promise<void>;
    /** Prepare and run a migration for each set of tag deletions from a tag map */
    private processDeletions;
    /** Assign the homebrew elements to their respective `CONFIG.PF2E` objects */
    static refreshTags(): void;
}
