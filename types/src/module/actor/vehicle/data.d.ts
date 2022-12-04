import {
    ActorSystemData,
    BaseActorAttributes,
    BaseActorDataPF2e,
    BaseActorSourcePF2e,
    BaseHitPointsData,
} from "@actor/data/base";
import { VehiclePF2e } from ".";
/** The stored source data of a vehicle actor */
export declare type VehicleSource = BaseActorSourcePF2e<"vehicle", VehicleSystemData>;
/** The boxed data object of the vehicle actor */
export declare class VehicleData extends BaseActorDataPF2e<VehiclePF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface VehicleData extends Omit<VehicleSource, "effects" | "items" | "token"> {
    type: VehicleSource["type"];
    data: VehicleSource["data"];
    readonly _source: VehicleSource;
}
interface VehicleHitPointsData extends BaseHitPointsData {
    brokenThreshold: number;
}
interface VehicleAttributes extends BaseActorAttributes {
    ac: {
        value: number;
        check: number;
        details: string;
    };
    hardness: number;
    hp: VehicleHitPointsData;
}
/** The system-level data of vehicle actors. */
interface VehicleSystemData extends ActorSystemData {
    attributes: VehicleAttributes;
    saves: {
        fortitude: {
            rank: number;
            value: number;
            saveDetail: string;
        };
    };
    [key: string]: any;
}
export {};
