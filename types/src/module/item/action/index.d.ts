import { ItemPF2e } from "@item/base";
import { ActionData } from "./data";
export declare class ActionPF2e extends ItemPF2e {
    static get schema(): typeof ActionData;
    prepareData(): void;
    getChatData(
        this: Embedded<ActionPF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        properties: (string | null)[];
        traits: import("../data").TraitChatData[];
        actionType: {
            value: "passive" | "action" | "reaction" | "free";
        };
        actionCategory: {
            value: string;
        };
        weapon: {
            value: string;
        };
        actions: {
            value: string;
        };
        requirements: {
            value: string;
        };
        trigger: {
            value: string;
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
    };
}
export interface ActionPF2e {
    readonly data: ActionData;
}
