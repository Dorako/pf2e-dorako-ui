import { ActorPF2e } from "@pf2e/module/actor";
import { ActorDataPF2e } from "@pf2e/module/actor/data";
import { BaseActorAttributes } from "@pf2e/module/actor/data/base";

declare global {
    interface HealingData {
        "fast-healing"?: {
            value: number;
            notes?: string;
        };
        regeneration?: {
            value: number;
            notes?: string;
            suppressedBy?: Array<string | string[]>;
            suppressed?: boolean;
        };
    }

    type ExtendedAttributes<T extends BaseActorAttributes> = T & {
        healing?: HealingData;
    }

    type ExtendedData<T extends ActorDataPF2e> = T & {
        data: {
            attributes: ExtendedAttributes<T['data']['attributes']>;
        }
    }

    /**
     * Actor Extended with additional data from this module
     */
    type ExtendedActor<T extends ActorPF2e> = T & {
        data: ExtendedData<T['data']>;
    }
}
