/// <reference types="jquery" />
/// <reference types="tooltipster" />
interface FormInputData extends ClientSettingsData {
    key: string;
    value: unknown;
    isSelect: boolean;
    isCheckbox: boolean;
    isDateTime: boolean;
}
interface TemplateData extends FormApplicationData {
    settings: FormInputData[];
}
interface UpdateData {
    dateTheme: string;
    timeConvention: boolean;
    playersCanView: boolean;
    syncDarkness: boolean;
    worldCreatedOn: string;
}
export declare class WorldClockSettings extends FormApplication {
    static get defaultOptions(): FormApplicationOptions & {
        title: string;
        id: string;
        template: string;
        width: number;
        height: string;
        closeOnSubmit: boolean;
    };
    getData(): TemplateData;
    /** Register World Clock settings */
    static registerSettings(): void;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, data: UpdateData): Promise<void>;
    /** Settings to be registered and also later referenced during user updates */
    private static get settings();
}
export {};
