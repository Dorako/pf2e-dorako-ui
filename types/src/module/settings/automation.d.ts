import { SettingsMenuPF2e } from "./menu";
declare type ConfigPF2eListName = typeof AutomationSettings.SETTINGS[number];
export declare class AutomationSettings extends SettingsMenuPF2e {
    static readonly namespace = "automation";
    static readonly SETTINGS: readonly ["rulesBasedVision", "effectExpiration", "lootableNPCs"];
    static get defaultOptions(): FormApplicationOptions & {
        title: string;
        id: string;
        template: string;
        width: number;
        height: string;
        closeOnSubmit: boolean;
    };
    protected static get settings(): Record<ConfigPF2eListName, ClientSettingsData>;
}
export {};
