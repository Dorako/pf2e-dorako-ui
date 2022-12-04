import { PhysicalItemPF2e } from "../physical";
import { BaseWeaponType, WeaponCategory, WeaponData, WeaponGroup } from "./data";
export declare class WeaponPF2e extends PhysicalItemPF2e {
    static get schema(): typeof WeaponData;
    isStackableWith(item: PhysicalItemPF2e): boolean;
    get baseType(): BaseWeaponType | null;
    get group(): WeaponGroup | null;
    get category(): WeaponCategory | null;
    prepareBaseData(): void;
    getChatData(
        this: Embedded<WeaponPF2e>,
        htmlOptions?: EnrichHTMLOptions,
    ): {
        traits: import("../data").TraitChatData[];
        proficiency: {
            type: string;
            value: number;
        };
        properties: (string | null)[];
        attackRoll: number;
        canAttack: boolean;
        isTwohanded: boolean;
        wieldedTwoHands: boolean;
        isFinesse: boolean;
        map2: number;
        map3: number;
        weaponType: {
            value: "advanced" | "martial" | "unarmed" | "simple" | null;
        };
        group: {
            value:
                | "bomb"
                | "shield"
                | "club"
                | "dart"
                | "flail"
                | "pick"
                | "sling"
                | "spear"
                | "knife"
                | "brawling"
                | "sword"
                | "axe"
                | "polearm"
                | "hammer"
                | "bow"
                | null;
        };
        baseItem:
            | "staff"
            | "adze"
            | "aklys"
            | "alchemical-bomb"
            | "alchemical-crossbow"
            | "aldori-dueling-sword"
            | "arrows"
            | "bastard-sword"
            | "battle-axe"
            | "battle-lute"
            | "bladed-diabolo"
            | "bladed-hoop"
            | "bladed-scarf"
            | "blowgun-darts"
            | "blowgun"
            | "bo-staff"
            | "boarding-axe"
            | "boarding-pike"
            | "bola"
            | "bolts"
            | "buugeng"
            | "clan-dagger"
            | "claw"
            | "claw-blade"
            | "club"
            | "combat-grapnel"
            | "composite-longbow"
            | "composite-shortbow"
            | "crossbow"
            | "dagger"
            | "daikyu"
            | "dart"
            | "dogslicer"
            | "dwarven-war-axe"
            | "elven-curve-blade"
            | "exquisite-sword-cane-sheath"
            | "exquisite-sword-cane"
            | "falchion"
            | "fangwire"
            | "fauchard"
            | "fighting-fan"
            | "filchers-fork"
            | "fire-poi"
            | "fist"
            | "flail"
            | "gaff"
            | "gauntlet"
            | "gill-hook"
            | "glaive"
            | "gnome-flickmace"
            | "gnome-hooked-hammer"
            | "greataxe"
            | "greatclub"
            | "greatpick"
            | "greatsword"
            | "guisarme"
            | "halberd"
            | "halfling-sling-staff"
            | "hand-adze"
            | "hand-crossbow"
            | "hatchet"
            | "heavy-crossbow"
            | "horsechopper"
            | "javelin"
            | "jaws"
            | "juggling-club"
            | "kama"
            | "katana"
            | "katar"
            | "khakkara"
            | "khopesh"
            | "kukri"
            | "lance"
            | "light-hammer"
            | "light-mace"
            | "light-pick"
            | "longbow"
            | "longspear"
            | "longsword"
            | "mace"
            | "machete"
            | "main-gauche"
            | "mambele"
            | "maul"
            | "meteor-hammer"
            | "monkeys-fist"
            | "morningstar"
            | "naginata"
            | "nightstick"
            | "nine-ring-sword"
            | "nunchaku"
            | "ogre-hook"
            | "orc-knuckle-dagger"
            | "orc-necksplitter"
            | "pick"
            | "poi"
            | "polytool"
            | "ranseur"
            | "rapier"
            | "rhoka-sword"
            | "rungu"
            | "sai"
            | "sap"
            | "sawtooth-saber"
            | "scimitar"
            | "scorpion-whip"
            | "scourge"
            | "scythe"
            | "shears"
            | "shield-bash"
            | "shield-boss"
            | "shield-spikes"
            | "shortbow"
            | "shortsword"
            | "shuriken"
            | "sickle"
            | "sling-bullets"
            | "sling"
            | "spear"
            | "spiked-chain"
            | "spiked-gauntlet"
            | "starknife"
            | "stiletto-pen"
            | "sword-cane"
            | "tamchal-chakram"
            | "taw-launcher"
            | "tekko-kagi"
            | "temple-sword"
            | "tengu-gale-blade"
            | "throwing-knife"
            | "thunder-sling"
            | "tricky-pick"
            | "trident"
            | "urumi"
            | "wakizashi"
            | "war-flail"
            | "war-razor"
            | "warhammer"
            | "whip-claw"
            | "whip"
            | "wish-blade"
            | "wish-knife"
            | "wooden-taws"
            | null;
        hands: {
            value: boolean;
        };
        bonus: {
            value: number;
        };
        damage: import("./data").WeaponDamage;
        bonusDamage?:
            | {
                  value: string;
              }
            | undefined;
        splashDamage?:
            | {
                  value: string;
              }
            | undefined;
        range: {
            value: string;
        };
        reload: {
            value: string;
        };
        ability: {
            value: "str" | "dex" | "con" | "int" | "wis" | "cha";
        };
        MAP: {
            value: string;
        };
        potencyRune: {
            value: import("../../data").ZeroToFour;
        };
        strikingRune: {
            value: "" | import("./data").StrikingRuneType;
        };
        propertyRune1: {
            value: string;
        };
        propertyRune2: {
            value: string;
        };
        propertyRune3: {
            value: string;
        };
        propertyRune4: {
            value: string;
        };
        property1: {
            value: string;
            dice: number;
            die: string;
            damageType: string;
            critDice: number;
            critDie: string;
            critDamage: string;
            critDamageType: string;
        };
        selectedAmmoId?: string | undefined;
        invested: {
            value: boolean | null;
        };
        quantity: {
            value: number;
        };
        hp: {
            value: number;
        };
        maxHp: {
            value: number;
        };
        hardness: {
            value: number;
        };
        brokenThreshold: {
            value: number;
        };
        weight: {
            value: number;
        };
        equippedBulk: {
            value: string;
        };
        unequippedBulk: {
            value: string;
        };
        price: {
            value: number;
        };
        equipped: {
            value: boolean;
        };
        identification: import("../physical/data").IdentificationData;
        stackGroup: {
            value: string;
        };
        bulkCapacity: {
            value: string;
        };
        negateBulk: {
            value: string;
        };
        containerId: {
            value: string | null;
        };
        preciousMaterial: {
            value: string;
        };
        preciousMaterialGrade: {
            value: string;
        };
        collapsed: {
            value: boolean;
        };
        size: {
            value: "med" | "tiny" | "sm" | "lg" | "huge" | "grg";
        };
        description: {
            value: string;
            chat: string;
            unidentified: string;
        };
        source: {
            value: string;
        };
        options?:
            | {
                  value: string[];
              }
            | undefined;
        usage: {
            value: string;
        };
        rules: import("../../rules/rules-data-definitions").RuleElementData[];
        slug: string | null;
        level: {
            value: number;
        };
    };
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
}
export interface WeaponPF2e {
    readonly data: WeaponData;
}
