/// <reference types="jquery" />
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor/index";
import { CheckModifiersContext } from "@module/system/check-modifiers-dialog";
import { RollDataPF2e } from "@system/rolls";
export declare class ChatMessagePF2e extends ChatMessage<ActorPF2e> {
    getHTML(): Promise<JQuery>;
    protected _onCreate(
        data: foundry.data.ChatMessageSource,
        options: DocumentModificationContext,
        userId: string,
    ): void;
}
export interface ChatMessagePF2e {
    readonly data: foundry.data.ChatMessageData<this>;
    /** @todo: change back to getter when prettier updates with syntax support */
    readonly roll: Rolled<Roll<RollDataPF2e>>;
    getFlag(scope: "core", key: "RollTable"): unknown;
    getFlag(scope: "pf2e", key: "canReroll"): boolean | undefined;
    getFlag(scope: "pf2e", key: "damageRoll"): object | undefined;
    getFlag(scope: "pf2e", key: "totalModifier"): number | undefined;
    getFlag(
        scope: "pf2e",
        key: "context",
    ):
        | (CheckModifiersContext & {
              rollMode: RollMode;
          })
        | undefined;
}
