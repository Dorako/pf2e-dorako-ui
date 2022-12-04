import { ModifierPF2e } from "@module/modifiers";
import { RollParameters } from "@system/rolls";
import { RollNotePF2e } from "@module/notes";
import { ActorPF2e } from "@actor";
import { DegreeOfSuccessAdjustment } from "@system/check-degree-of-success";
export interface StatisticCheckData {
    adjustments?: DegreeOfSuccessAdjustment[];
    label?: string;
    modifiers?: ModifierPF2e[];
    type: string;
}
export interface StatisticDifficultyClassData {
    base?: number;
    labelKey?: string;
    modifiers?: ModifierPF2e[];
}
export interface StatisticData {
    name: string;
    check?: StatisticCheckData;
    dc?: StatisticDifficultyClassData;
    modifiers?: ModifierPF2e[];
    notes?: RollNotePF2e[];
}
export interface StatisticCheck {
    modifiers: ModifierPF2e[];
    roll: (
        args: RollParameters & {
            modifiers: ModifierPF2e[];
        },
    ) => void;
    totalModifier: (options?: { options?: string[] }) => number;
    value: number;
}
export interface StatisticDifficultyClass {
    labelKey: string;
    value: number;
}
export interface StatisticWithDC {
    dc(options?: { options?: string[] }): StatisticDifficultyClass;
}
export interface StatisticWithCheck {
    get check(): StatisticCheck;
}
export interface Statistic extends StatisticWithCheck, StatisticWithDC {}
export declare class StatisticBuilder {
    static from(
        actor: ActorPF2e,
        data: StatisticData &
            ({
                check: StatisticCheckData;
            } & {
                dc: StatisticDifficultyClassData;
            }),
    ): StatisticWithCheck & StatisticWithDC;
    static from(
        actor: ActorPF2e,
        data: StatisticData & {
            check: StatisticCheckData;
        },
    ): StatisticWithCheck;
    static from(
        actor: ActorPF2e,
        data: StatisticData & {
            dc: StatisticDifficultyClassData;
        },
    ): StatisticWithDC;
}
