import { PhysicalItemData, TraitChatData } from "@item/data";
import { Rarity } from "@module/data";
import { ItemPF2e } from "@item/index";
import type { ContainerPF2e } from "@item/index";
import { IdentificationStatus, MystifiedData } from "./data";
export declare abstract class PhysicalItemPF2e extends ItemPF2e {
    private _container;
    get level(): number;
    get traits(): Set<string>;
    get rarity(): Rarity;
    get quantity(): number;
    get isEquipped(): boolean;
    get identificationStatus(): IdentificationStatus;
    get isIdentified(): boolean;
    get isAlchemical(): boolean;
    get isMagical(): boolean;
    get isInvested(): boolean | null;
    get isCursed(): boolean;
    get isInContainer(): boolean;
    /** Get this item's container, returning null if it is not in a container */
    get container(): Embedded<ContainerPF2e> | null;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /** Can the provided item stack with this item? */
    isStackableWith(item: PhysicalItemPF2e): boolean;
    getMystifiedData(status: IdentificationStatus): MystifiedData;
    setIdentificationStatus(status: IdentificationStatus): Promise<void>;
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
    /** Include mystification-related rendering instructions for views that will display this data. */
    protected traitChatData(dictionary: Record<string, string>): TraitChatData[];
}
export interface PhysicalItemPF2e {
    readonly data: PhysicalItemData;
}
