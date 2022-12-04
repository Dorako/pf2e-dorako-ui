import { SkillAbbreviation } from "@actor/creature/data";
import { AbilityString } from "./base";
export declare const ABILITY_ABBREVIATIONS: readonly ["str", "dex", "con", "int", "wis", "cha"];
export declare const CREATURE_ACTOR_TYPES: readonly ["character", "npc", "familiar"];
export declare const SAVE_TYPES: readonly ["fortitude", "reflex", "will"];
export declare const CONDITION_TYPES: readonly [
    "blinded",
    "broken",
    "clumsy",
    "concealed",
    "confused",
    "controlled",
    "dazzled",
    "deafened",
    "doomed",
    "drained",
    "dying",
    "encumbered",
    "enfeebled",
    "fascinated",
    "fatigued",
    "flat-footed",
    "fleeing",
    "friendly",
    "frightened",
    "grabbed",
    "helpful",
    "hidden",
    "hostile",
    "immobilized",
    "indifferent",
    "invisible",
    "observed",
    "paralyzed",
    "persistent",
    "petrified",
    "prone",
    "quickened",
    "restrained",
    "sickened",
    "slowed",
    "stunned",
    "stupefied",
    "unconscious",
    "undetected",
    "unfriendly",
    "unnoticed",
    "wounded",
];
export declare const SKILL_ABBREVIATIONS: readonly [
    "acr",
    "arc",
    "ath",
    "cra",
    "dec",
    "dip",
    "itm",
    "med",
    "nat",
    "occ",
    "prf",
    "rel",
    "soc",
    "ste",
    "sur",
    "thi",
];
export declare const SKILL_DICTIONARY: {
    acr: string;
    arc: string;
    ath: string;
    cra: string;
    dec: string;
    dip: string;
    itm: string;
    med: string;
    nat: string;
    occ: string;
    prf: string;
    rel: string;
    soc: string;
    ste: string;
    sur: string;
    thi: string;
};
interface SkillExpanded {
    ability: AbilityString;
    shortform: SkillAbbreviation;
}
export declare const SKILL_EXPANDED: Record<string, SkillExpanded>;
export declare const SUPPORTED_ROLL_OPTIONS: string[];
export {};
