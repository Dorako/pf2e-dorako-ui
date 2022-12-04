import { ItemPF2e } from "../index";
import { FeatData, FeatType } from "./data";
export declare class FeatPF2e extends ItemPF2e {
    static get schema(): typeof FeatData;
    get featType(): {
        value: FeatType;
        label: string;
    };
    getChatData(
        this: Embedded<FeatPF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        properties: (string | null)[];
        traits: import("../data").TraitChatData[];
        featType: {
            value:
                | "ancestry"
                | "class"
                | "general"
                | "skill"
                | "archetype"
                | "curse"
                | "heritage"
                | "ancestryfeature"
                | "classfeature"
                | "bonus"
                | "pfsboon"
                | "deityboon"
                | "variantrule";
        };
        actionType: {
            value: "passive" | "action" | "reaction" | "free";
        };
        actionCategory: {
            value: string;
        };
        actions: {
            value: string;
        };
        prerequisites: {
            value: import("./data").PrerequisiteTagData[];
        };
        location: string;
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
export interface FeatPF2e {
    readonly data: FeatData;
}
