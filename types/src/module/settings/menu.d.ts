interface SettingsTemplateData extends ClientSettingsData {
    key: string;
    value: unknown;
}
export interface MenuTemplateData extends FormApplicationData {
    settings: SettingsTemplateData[];
}
export declare abstract class SettingsMenuPF2e extends FormApplication {
    static readonly namespace: string;
    get namespace(): string;
    static readonly SETTINGS: ReadonlyArray<string>;
    /** Settings to be registered and also later referenced during user updates */
    protected static get settings(): Record<string, ClientSettingsData>;
    static registerSettings(): void;
    getData(): MenuTemplateData;
    protected _updateObject(_event: Event, data: Record<string, unknown>): Promise<void>;
}
export {};
