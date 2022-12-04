import { BaseWeaponProficiencyKey, CharacterData, WeaponGroupProficiencyKey } from "./data";
import { AncestryPF2e } from "@item/ancestry";
import { BackgroundPF2e } from "@item/background";
import { ClassPF2e } from "@item/class";
import { CreaturePF2e } from "../index";
import { FeatPF2e } from "@item/feat";
export declare class CharacterPF2e extends CreaturePF2e {
    static get schema(): typeof CharacterData;
    get ancestry(): AncestryPF2e | null;
    get background(): BackgroundPF2e | null;
    get class(): ClassPF2e | null;
    get heritage(): FeatPF2e | null;
    prepareBaseData(): void;
    /** Adjustments from ABC items are made after all items are prepared but before active effects are applied. */
    applyActiveEffects(): void;
    prepareDerivedData(): void;
    private prepareInitiative;
    private prepareAncestry;
    private prepareBackground;
    private prepareClass;
    /** Toggle the invested state of an owned magical item */
    toggleInvested(itemId: string): Promise<boolean>;
    /** Add a proficiency in a weapon group or base weapon */
    addCombatProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    removeCombatProficiency(
        key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey,
    ): Promise<void>;
}
export interface CharacterPF2e {
    readonly data: CharacterData;
}
