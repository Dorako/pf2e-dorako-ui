import { ZeroToFour, ZeroToThree } from "@module/data";
import { DiceModifierPF2e } from "@module/modifiers";
import type { ArmorData, WeaponData } from "./data";
declare type WeaponPropertyRuneType = keyof ConfigPF2e["PF2E"]["weaponPropertyRunes"];
export declare function getPropertySlots(itemData: WeaponData | ArmorData): ZeroToFour;
export declare function getPropertyRunes(
    itemData: WeaponData | ArmorData,
    slots: number,
): WeaponPropertyRuneType[];
export declare function getAttackBonus(itemData: WeaponData["data"]): number;
export declare function getArmorBonus(itemData: ArmorData["data"]): number;
export declare function getStrikingDice(itemData: WeaponData["data"]): ZeroToThree;
export declare function getResiliencyBonus(itemData: ArmorData["data"]): ZeroToThree;
export declare function getPropertyRuneModifiers(
    itemData: WeaponData | ArmorData,
): DiceModifierPF2e[];
export declare function hasGhostTouchRune(itemData: WeaponData): boolean;
export {};
