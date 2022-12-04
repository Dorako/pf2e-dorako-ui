import { ActorPF2e } from "@actor/index";
import { TokenPF2e } from "../canvas/token";
import { ScenePF2e } from "../scene";
import { UserPF2e } from "../user";
import { TokenConfigPF2e } from "./sheet";
export declare class TokenDocumentPF2e extends TokenDocument<ActorPF2e> {
    /** This should be in Foundry core, but ... */
    get scene(): ScenePF2e | null;
    /** Call `onCreateToken` hook of any rule element on this actor's items */
    protected _preCreate(
        data: PreDocumentId<this["data"]["_source"]>,
        options: DocumentModificationContext,
        user: UserPF2e,
    ): Promise<void>;
    /** Synchronous actor attitude with token disposition, refresh the EffectPanel */
    protected _onUpdate(
        changed: DeepPartial<this["data"]["_source"]>,
        options: DocumentModificationContext,
        userId: string,
    ): void;
}
export interface TokenDocumentPF2e {
    readonly _object: TokenPF2e | null;
    readonly parent: ScenePF2e | null;
    _sheet: TokenConfigPF2e | null;
}
