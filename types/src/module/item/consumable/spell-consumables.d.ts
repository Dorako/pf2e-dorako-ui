import type { ActorPF2e } from "@actor/index";
import { ConsumableData, ConsumableSource, SpellSource, TrickMagicItemCastData } from "@item/data";
import { DCOptions } from "@module/dc";
export declare enum SpellConsumableTypes {
    Scroll = 0,
    Wand = 1,
}
export declare function createConsumableFromSpell(
    type: SpellConsumableTypes,
    spellData: SpellSource,
    heightenedLevel?: number,
): Promise<ConsumableSource>;
export declare function canCastConsumable(actor: ActorPF2e, item: ConsumableData): boolean;
export interface TrickMagicItemDifficultyData {
    arc?: number;
    rel?: number;
    occ?: number;
    nat?: number;
}
export declare function calculateTrickMagicItemCheckDC(
    itemData: ConsumableData,
    options?: DCOptions,
): TrickMagicItemDifficultyData;
export declare function calculateTrickMagicItemCastData(
    actor: ActorPF2e,
    skill: string,
): TrickMagicItemCastData;
