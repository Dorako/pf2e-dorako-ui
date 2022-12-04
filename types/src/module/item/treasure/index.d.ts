import { PhysicalItemPF2e } from "@item/physical";
import { TreasureData } from "./data";
export declare class TreasurePF2e extends PhysicalItemPF2e {
    static get schema(): typeof TreasureData;
    getChatData(
        this: Embedded<TreasurePF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        traits: import("../data").TraitChatData[];
        denomination: {
            value: "cp" | "gp" | "pp" | "sp";
        };
        value: {
            value: number;
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
        invested?:
            | {
                  value: boolean | null;
              }
            | undefined;
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
}
export interface TreasurePF2e {
    readonly data: TreasureData;
}
