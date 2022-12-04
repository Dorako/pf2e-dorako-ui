/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { ItemPF2e } from "@item/base";
import { CreaturePF2e } from "@actor/creature";
import { ZeroToFour } from "@module/data";
/**
 * Base class for NPC and character sheets
 * @category Actor
 */
export declare abstract class CreatureSheetPF2e<
    ActorType extends CreaturePF2e,
> extends ActorSheetPF2e<ActorType> {
    protected renderItemSummary(div: JQuery, item: Embedded<ItemPF2e>, chatData: any): void;
    getData(): any;
    /**
     * Get the font-awesome icon used to display a certain level of skill proficiency
     */
    protected getProficiencyIcon(level: ZeroToFour): string;
    activateListeners(html: JQuery): void;
}
