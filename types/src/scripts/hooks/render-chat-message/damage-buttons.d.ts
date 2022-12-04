/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/base";
/** Add apply damage buttons after a chat message is rendered */
export declare function listen(message: ChatMessage<ActorPF2e>, html: JQuery): Promise<void>;
