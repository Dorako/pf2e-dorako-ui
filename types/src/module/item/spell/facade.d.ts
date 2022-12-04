import { ActorPF2e } from "@actor/base";
import { SpellcastingEntryPF2e } from "../spellcasting-entry";
import { SpellSource } from "./data";
/**
 * This is an outdated class.
 * All new spell functionality should go in spell.ts, and some
 * existing functionality is going to be duplicated in spell
 * until we can sever this class.
 */
export declare class SpellFacade {
    data: SpellSource;
    castingActor?: ActorPF2e;
    _castLevel: number;
    spellcastingEntry?: SpellcastingEntryPF2e;
    constructor(
        data: SpellSource,
        scope?: {
            castingActor?: ActorPF2e;
            castLevel?: number;
        },
    );
    get spellcastingEntryId(): string;
    get spellLevel(): import("../../data").ZeroToTen;
    get heightenedLevel(): number;
    get damage(): {
        value: string;
        applyMod: false;
    };
    get damageValue(): string | null;
    get damageParts(): (string | number)[];
    get scaling(): {
        mode: string;
        formula: string;
    };
    get castLevel(): number;
    get autoScalingSpell(): boolean;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    get traditions(): ("arcane" | "divine" | "occult" | "primal")[];
    get heighteningModes(): Record<string, number>;
    get heightenedParts(): string[];
}
