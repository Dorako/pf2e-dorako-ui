import * as translationsPF2e from "../../../en.json";
declare type TranslationsPF2e = Record<string, TranslationDictionaryValue> &
    typeof translationsPF2e;
export declare class LocalizePF2e {
    static ready: boolean;
    private static _translations;
    static get translations(): TranslationsPF2e;
}
export {};
