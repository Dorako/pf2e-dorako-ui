import { TrickMagicItemDifficultyData } from "@item/consumable/spell-consumables";
import type { ConsumablePF2e } from "@item";
import type { ActorPF2e } from "@actor";
declare type TrickMagicItemSkill = TrickMagicItemPopup["SKILLS"][number];
export declare class TrickMagicItemPopup {
    /** The wand or scroll being "tricked" */
    readonly item: Embedded<ConsumablePF2e>;
    /** The actor doing the tricking */
    readonly actor: ActorPF2e;
    /** The skill DC of the action's check */
    readonly checkDC: TrickMagicItemDifficultyData;
    /** Trick Magic Item skills */
    private readonly SKILLS;
    private translations;
    constructor(item: Embedded<ConsumablePF2e>);
    private initialize;
    handleTrickItem(skill: TrickMagicItemSkill): void;
}
export {};
