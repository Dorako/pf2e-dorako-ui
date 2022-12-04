import type { ActorPF2e } from "@actor/base";
import type { EffectData } from "@item/data";
import type { EffectPF2e } from "@item/index";
export declare class EffectTracker {
    private trackedEffects;
    private insert;
    register(effect: Embedded<EffectPF2e>): void;
    unregister(effect: EffectData): void;
    refresh(): Promise<void>;
    removeExpired(actor?: ActorPF2e): Promise<void>;
}
