/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { TokenDocumentPF2e } from ".";
export declare class TokenConfigPF2e extends TokenConfig<TokenDocumentPF2e> {
    /** Hide token-sight settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
}
