import { PhysicalItemPF2e } from "../physical";
import { ArmorCategory, ArmorData, ArmorGroup, BaseArmorType } from "./data";
export declare class ArmorPF2e extends PhysicalItemPF2e {
    static get schema(): typeof ArmorData;
    isStackableWith(item: PhysicalItemPF2e): boolean;
    get isShield(): boolean;
    get isArmor(): boolean;
    get baseType(): BaseArmorType | null;
    get group(): ArmorGroup | null;
    get category(): ArmorCategory;
    get dexCap(): number | null;
    get strength(): number | null;
    get checkPenalty(): number | null;
    get speedPenalty(): number;
    get acBonus(): number;
    get hitPoints(): {
        current: number;
        max: number;
    };
    get hardness(): number;
    get brokenThreshold(): number;
    get isBroken(): boolean;
    prepareBaseData(): void;
    getChatData(
        this: Embedded<ArmorPF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        properties: (string | null)[];
        traits: import("../data").TraitChatData[];
        armor: {
            value: number;
        };
        armorType: {
            value: "medium" | "light" | "unarmored" | "heavy" | "shield";
        };
        baseItem:
            | "explorers-clothing"
            | "padded-armor"
            | "leather-armor"
            | "studded-leather-armor"
            | "chain-shirt"
            | "hide-armor"
            | "scale-mail"
            | "chain-mail"
            | "breastplate"
            | "splint-mail"
            | "half-plate"
            | "full-plate"
            | "hellknight-plate"
            | null;
        group: {
            value: "composite" | "chain" | "cloth" | "leather" | "plate" | null;
        };
        strength: {
            value: number;
        };
        dex: {
            value: number;
        };
        check: {
            value: number;
        };
        speed: {
            value: number;
        };
        potencyRune: {
            value: import("../../data").ZeroToFour;
        };
        resiliencyRune: {
            value: import("./data").ResilientRuneType;
        };
        propertyRune1: {
            value: string;
        };
        propertyRune2: {
            value: string;
        };
        propertyRune3: {
            value: string;
        };
        propertyRune4: {
            value: string;
        };
        invested: {
            value: boolean | null;
        };
        quantity: {
            value: number;
        };
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
export interface ArmorPF2e {
    readonly data: ArmorData;
}
