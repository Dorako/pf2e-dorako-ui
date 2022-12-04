import { ActorPF2e } from "@actor/base";
import { ItemPF2e } from "@item/base";
export declare class ActiveEffectPF2e extends ActiveEffect {
    get isDisabled(): boolean;
    get isEnabled(): boolean;
    /** Apply this ActiveEffect to the actor immediately upon spellcasting */
    get applyOnCast(): boolean;
    prepareBaseData(): void;
    /** Parse non-primitive change values just prior to application to the actor */
    apply(actor: ActorPF2e, change: ApplicableChangeData<this>): unknown;
    /** Create a non-existing property before the parent class applies an upgrade */
    protected _applyUpgrade(actor: ActorPF2e, change: ApplicableChangeData<this>): unknown;
    /** Disable this active effect for a single data-preparation cycle  */
    temporarilyDisable(this: Embedded<ActiveEffectPF2e>, actor: ActorPF2e): void;
    private valueIsLookupData;
    private grantItem;
    private revokeItem;
    /** Propagate deletion of prototype token overrides to any placed tokens */
    protected _onDelete(options: DocumentModificationContext, userId: string): void;
}
export interface ActiveEffectPF2e {
    readonly parent: ActorPF2e | ItemPF2e;
    getFlag(scope: string, key: string): unknown;
    getFlag(scope: "core", key: "overlay"): string | undefined;
    getFlag(scope: "core", key: "statusId"): string | undefined;
    getFlag(scope: "pf2e", key: "applyOnCast"): boolean | undefined;
}
