import { PhysicalItemPF2e } from "@item/physical";
import { ContainerData } from "./data";
export declare class ContainerPF2e extends PhysicalItemPF2e {
    /** This container's contents, reloaded every data preparation cycle */
    contents: Collection<Embedded<PhysicalItemPF2e>>;
    static get schema(): typeof ContainerData;
    /** Reload this container's contents following Actor embedded-document preparation */
    prepareContents(this: Embedded<ContainerPF2e>): void;
    getChatData(
        this: Embedded<ContainerPF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        traits: import("../data").TraitChatData[];
        capacity: {
            type: string;
            value: number;
            weightless: boolean;
        };
        currency: {
            cp: number;
            sp: number;
            gp: number;
            pp: number;
        };
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
}
export interface ContainerPF2e {
    readonly data: ContainerData;
}
