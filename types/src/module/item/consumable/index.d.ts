import { ConsumableData, ConsumableType } from "./data";
import { PhysicalItemPF2e, SpellPF2e } from "@item";
import { TrickMagicItemCastData } from "@item/data";
export declare class ConsumablePF2e extends PhysicalItemPF2e {
    static get schema(): typeof ConsumableData;
    get consumableType(): ConsumableType;
    get charges(): {
        current: number;
        max: number;
    };
    get embeddedSpell(): Embedded<SpellPF2e> | null;
    getChatData(
        this: Embedded<ConsumablePF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        traits: import("@item/data").TraitChatData[];
        properties: string[];
        usesCharges: boolean;
        hasCharges: boolean;
        consumableType: string;
        isUsable: boolean;
        uses: {
            value: number;
            max: number;
            per: any;
            autoUse: boolean;
            autoDestroy: boolean;
        };
        charges: {
            value: number;
            max: number;
        };
        consume: {
            value: string;
            _deprecated: boolean;
        };
        autoUse: {
            value: boolean;
        };
        autoDestroy: {
            value: boolean;
            _deprecated: boolean;
        };
        spell: {
            data?: import("@item/data").SpellSource | null | undefined;
            heightenedLevel?: number | null | undefined;
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
        activation: {
            type: string;
            cost: number;
            condition: string;
        };
        duration: {
            value: any;
            units: string;
        };
        target: {
            value: any;
            units: string;
            type: string;
        };
        range: {
            value: any;
            long: any;
            units: any;
        };
    };
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
    /** Use a consumable item, sending the result to chat */
    consume(this: Embedded<ConsumablePF2e>): Promise<void>;
    castEmbeddedSpell(
        this: Embedded<ConsumablePF2e>,
        trickMagicItemData?: TrickMagicItemCastData,
    ): Promise<void>;
}
export interface ConsumablePF2e {
    readonly data: ConsumableData;
}
