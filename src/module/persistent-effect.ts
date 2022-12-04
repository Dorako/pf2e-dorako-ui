import { ItemPF2e } from "@pf2e/module/item";
import { EffectData, ItemDataPF2e } from "@pf2e/module/item/data";

export const typeImages: Record<string, ImagePath> = {
    bleed: "systems/pf2e/icons/spells/blade-barrier.webp",
    piercing: "systems/pf2e/icons/equipment/weapons/throwing-knife.webp",
    bludgeoning: "systems/pf2e/icons/equipment/weapons/bola.webp",
    slashing: "systems/pf2e/icons/equipment/weapons/scimitar.webp",
    fire: "systems/pf2e/icons/spells/flaming-sphere.webp",
    acid: "systems/pf2e/icons/spells/blister.webp",
    cold: "systems/pf2e/icons/spells/chilling-spray.webp",
    electricity: "systems/pf2e/icons/spells/chain-lightning.webp",
    sonic: "systems/pf2e/icons/spells/cry-of-destruction.webp",
    force: "systems/pf2e/icons/spells/magic-missile.webp",
    mental: "systems/pf2e/icons/spells/modify-memory.webp",
    poison: "systems/pf2e/icons/spells/acidic-burst.webp",
    lawful: "systems/pf2e/icons/equipment/adventuring-gear/merchant-scale.webp",
    chaotic: "systems/pf2e/icons/spells/dinosaur-form.webp",
    good: "systems/pf2e/icons/spells/angelic-wings.webp",
    evil: "systems/pf2e/icons/spells/daemonic-pact.webp",
    positive: "systems/pf2e/icons/spells/moment-of-renewal.webp",
    negative: "systems/pf2e/icons/spells/grim-tendrils.webp",
};

export type DamageType = keyof typeof typeImages;

/**
 * Data involving persistent damage
 */
export interface PersistentData {
    damageType: DamageType;
    value: string;
    dc: number;
}

/**
 * All possible persistent data types that may exist due to old versions.
 * These properties are nudged into new ones.
 */
interface PersistentDataOld extends PersistentData {
    type?: Capitalize<DamageType> | "bleeding";
}

/**
 * Retrieves persistent data values from item data if exists.
 * Also handles "migrations" in a way.
 */
export function getPersistentData(flags: { persistent?: PersistentDataOld }): PersistentData {
    const data = flags.persistent;
    if (data) {
        // Ensure damage type is suitable for the latest version
        let damageType = data.damageType ?? data.type?.toLowerCase();
        if (damageType === "bleeding") damageType = "bleed";

        return {
            damageType,
            dc: data.dc ?? 15,
            value: data.value,
        };
    }
}

/**
 * Update item name and description based on persistent flags
 */
Hooks.on("preUpdateItem", (item: ItemPF2e, update: Partial<ItemDataPF2e>) => {
    if (update?.flags?.persistent) {
        // Merge the persistent flags. This also "migrates" the flags.
        const previous = item.flags?.persistent as PersistentData;
        const persistent = getPersistentData({
            persistent: mergeObject({ ...previous }, update.flags.persistent),
        });

        update.flags.persistent = persistent;
        update.name = createPersistentTitle(persistent);

        const slug = `persistent-damage-${persistent.damageType}`;
        mergeObject(update, { system: { slug } });
    }
});

export function createPersistentTitle(data: PersistentData) {
    const { damageType, value, dc } = data;
    const typeName = game.i18n.localize(CONFIG.PF2E.damageTypes[damageType]);
    const dcStr = dc === 15 ? "" : ` DC${String(dc)}`;
    const conditionName = game.i18n.localize("PF2E.condition.persistent-damage.name");
    return `${conditionName} [${typeName} ${String(value)}${dcStr}]`;
}

/**
 * Creates the persistent effect data that can be used to create an item.
 * @param damageType
 * @param value
 * @returns
 */
export function createPersistentEffect(persistent: PersistentData): DeepPartial<EffectData> {
    return {
        type: "effect",
        name: createPersistentTitle(persistent),
        system: {
            slug: `persistent-damage-${persistent.damageType}`,
            description: {
                value: "Persistent Damage from some source. Deals damage at the end of each turn and needs a check to remove.",
            },
            duration: {
                expiry: "turn-end",
                unit: "unlimited",
                value: 0,
                sustained: false,
            },
            rules: [],
            tokenIcon: {
                show: true,
            },
        },
        flags: { persistent },
        img: typeImages[persistent.damageType],
    };
}
