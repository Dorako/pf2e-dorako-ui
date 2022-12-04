import { PhysicalItemPF2e } from "../physical";
import { EquipmentData } from "./data";
export declare class EquipmentPF2e extends PhysicalItemPF2e {
    static get schema(): typeof EquipmentData;
    getChatData(
        this: Embedded<EquipmentPF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        properties: (string | null)[];
        traits: import("../data").TraitChatData[];
        invested: {
            value: boolean | null;
        };
        quantity: {
            value: number;
        };
        baseItem: string | null;
        hp: {
            value: number;
        };
        maxHp: {
            value: number;
        };
        hardness: {
            value: number;
        };
        brokenThreshold: {
            value: number;
        };
        weight: {
            value: number;
        };
        equippedBulk: {
            value: string;
        };
        unequippedBulk: {
            value: string;
        };
        price: {
            value: number;
        };
        equipped: {
            value: boolean;
        };
        identification: import("../physical/data").IdentificationData;
        stackGroup: {
            value: string;
        };
        bulkCapacity: {
            value: string;
        };
        negateBulk: {
            value: string;
        };
        containerId: {
            value: string | null;
        };
        preciousMaterial: {
            value: string;
        };
        preciousMaterialGrade: {
            value: string;
        };
        collapsed: {
            value: boolean;
        };
        size: {
            value: "med" | "tiny" | "sm" | "lg" | "huge" | "grg";
        };
        description: {
            value: string;
            chat: string;
            unidentified: string;
        };
        source: {
            value: string;
        };
        options?:
            | {
                  value: string[];
              }
            | undefined;
        usage: {
            value: string;
        };
        rules: import("../../rules/rules-data-definitions").RuleElementData[];
        slug: string | null;
        level: {
            value: number;
        };
    };
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
}
export interface EquipmentPF2e {
    readonly data: EquipmentData;
}
