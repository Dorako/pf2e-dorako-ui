/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { KitPF2e } from "@item/kit";
import { ItemSheetPF2e } from "./base";
/**
 * @category Other
 */
export declare class KitSheetPF2e extends ItemSheetPF2e<KitPF2e> {
    static get defaultOptions(): {
        scrollY: string[];
        dragDrop: {
            dropSelector: string;
        }[];
        classes: string[];
        template: string;
        viewPermission: number;
        editable?: boolean | undefined;
        closeOnSubmit?: boolean | undefined;
        submitOnClose?: boolean | undefined;
        submitOnChange?: boolean | undefined;
        baseApplication?: string | undefined;
        width?: string | number | undefined;
        height?: string | number | undefined;
        top?: number | undefined;
        left?: number | undefined;
        popOut?: boolean | undefined;
        minimizable?: boolean | undefined;
        resizable?: boolean | undefined;
        id?: string | undefined;
        tabs?: TabsOptions[] | undefined;
        title?: string | undefined;
    };
    getData(): import("./base").ItemSheetDataPF2e<KitPF2e> & {
        type: string;
        hasSidebar: boolean;
        sidebarTemplate: () => "systems/pf2e/templates/items/kit-sidebar.html";
        hasDetails: boolean;
        detailsTemplate: () => "systems/pf2e/templates/items/kit-details.html";
        rarity: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
    };
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    removeItem(event: JQuery.ClickEvent): void;
    activateListeners(html: JQuery): void;
}
