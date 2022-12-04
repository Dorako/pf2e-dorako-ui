/// <reference types="jquery" />
/// <reference types="tooltipster" />
interface PackInfo {
    load: boolean;
    name: string;
}
declare type TabData<T> = {
    action: T | null;
    bestiary: T | null;
    equipment: T | null;
    feat: T | null;
    hazard: T | null;
    spell: T | null;
};
export declare class CompendiumBrowser extends Application {
    sorters: any;
    filters: Record<string, Record<string, boolean>>;
    ranges: any;
    settings: TabData<{
        [key: string]: PackInfo;
    }>;
    navigationTab: Tabs;
    data: TabData<object>;
    constructor(options?: {});
    initCompendiumList(): void;
    loadSettings(): void;
    hookTab(): void;
    openTab(tab: string): Promise<void>;
    loadTab(tab: string): Promise<void>;
    _loadedPacks(tab: string): string[];
    loadActions(): Promise<{
        actions: {};
        actionTraits: {
            [k: string]: any;
        };
        skills: {
            acrobatics: string;
            arcana: string;
            athletics: string;
            crafting: string;
            deception: string;
            diplomacy: string;
            intimidation: string;
            medicine: string;
            nature: string;
            occultism: string;
            performance: string;
            religion: string;
            society: string;
            stealth: string;
            survival: string;
            thievery: string;
            lore: string;
        };
        proficiencies: readonly [
            "PF2E.ProficiencyLevel0",
            "PF2E.ProficiencyLevel1",
            "PF2E.ProficiencyLevel2",
            "PF2E.ProficiencyLevel3",
            "PF2E.ProficiencyLevel4",
        ];
    }>;
    loadBestiary(): Promise<{
        bestiaryActors: {};
        actorSize: {
            tiny: string;
            sm: string;
            med: string;
            lg: string;
            huge: string;
            grg: string;
        };
        alignment: {
            LG: string;
            NG: string;
            CG: string;
            LN: string;
            N: string;
            CN: string;
            LE: string;
            NE: string;
            CE: string;
        };
        traits: {
            [k: string]: any;
        };
        languages: {
            [k: string]: any;
        };
        source: string[];
        rarities: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
    }>;
    loadHazards(): Promise<{
        hazardActors: {};
        traits: {
            [k: string]: any;
        };
        source: string[];
        rarities: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
    }>;
    loadEquipment(): Promise<{
        inventoryItems: {};
        armorTypes: {
            unarmored: string;
            light: string;
            medium: string;
            heavy: string;
            shield: string;
        };
        armorGroups: {
            composite: string;
            chain: string;
            cloth: string;
            leather: string;
            plate: string;
        };
        weaponTraits: {
            [k: string]: any;
        };
        itemTypes: {
            weapon: string;
            armor: string;
            equipment: string;
            consumable: string;
            treasure: string;
            backpack: string;
            kit: string;
        };
        rarities: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
        weaponTypes: {
            simple: string;
            martial: string;
            advanced: string;
            unarmed: string;
        };
        weaponGroups: {
            club: string;
            knife: string;
            brawling: string;
            spear: string;
            sword: string;
            axe: string;
            flail: string;
            polearm: string;
            pick: string;
            hammer: string;
            shield: string;
            dart: string;
            bow: string;
            sling: string;
            bomb: string;
        };
    }>;
    loadFeats(): Promise<{
        feats: {};
        featClasses: {
            alchemist: string;
            barbarian: string;
            bard: string;
            champion: string;
            cleric: string;
            druid: string;
            fighter: string;
            investigator: string;
            monk: string;
            oracle: string;
            ranger: string;
            rogue: string;
            sorcerer: string;
            swashbuckler: string;
            witch: string;
            wizard: string;
        };
        featSkills: {
            acrobatics: string;
            arcana: string;
            athletics: string;
            crafting: string;
            deception: string;
            diplomacy: string;
            intimidation: string;
            medicine: string;
            nature: string;
            occultism: string;
            performance: string;
            religion: string;
            society: string;
            stealth: string;
            survival: string;
            thievery: string;
            lore: string;
        };
        featAncestry: {};
        featTimes: string[];
        rarities: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
    }>;
    loadSpells(): Promise<{
        classes: {};
        times: string[];
        schools: {};
        categories: {
            spell: string;
            focus: string;
            ritual: string;
        };
        traditions: {
            arcane: string;
            divine: string;
            occult: string;
            primal: string;
        };
        spells: {};
        rarities: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
        spellTraits: {
            acid: string;
            air: string;
            attack: string;
            auditory: string;
            aura: string;
            chaotic: string;
            cold: string;
            concentrate: string;
            consecration: string;
            curse: string;
            darkness: string;
            death: string;
            detection: string;
            disease: string;
            divination: string;
            earth: string;
            electricity: string;
            emotion: string;
            evil: string;
            extradimensional: string;
            fear: string;
            fire: string;
            force: string;
            fortune: string;
            fungus: string;
            good: string;
            healing: string;
            hex: string;
            incapacitation: string;
            inhaled: string;
            light: string;
            linguistic: string;
            litany: string;
            mental: string;
            metamagic: string;
            mindless: string;
            misfortune: string;
            morph: string;
            move: string;
            necromancy: string;
            negative: string;
            nonlethal: string;
            olfactory: string;
            plant: string;
            poison: string;
            polymorph: string;
            positive: string;
            possession: string;
            prediction: string;
            revelation: string;
            scrying: string;
            shadow: string;
            sleep: string;
            sonic: string;
            stance: string;
            teleportation: string;
            visual: string;
            water: string;
        };
    }>;
    static get defaultOptions(): ApplicationOptions & {
        classes: never[];
        template: string;
        width: number;
        height: number;
        resizable: boolean;
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
    };
    get title(): string;
    activateListeners(html: JQuery): void;
    private addPhysicalItemsToSelectedTokens;
    private createPhysicalItemFromCompendiumId;
    injectActorDirectory(): void;
    clearObject(obj: object): {
        [k: string]: any;
    };
    _getActionImg(action: string): string;
    getData(): {
        user: import("../../user").UserPF2e;
        settings: TabData<{
            [key: string]: PackInfo;
        }>;
    } & object;
    filterSpells(li: JQuery): Promise<void>;
    getFilterResult(element: HTMLElement): boolean;
    isWithinFilteredBounds(element: HTMLElement): boolean;
    resetFilters(html: JQuery): void;
    sortSpells(list: JQuery, byName: boolean): HTMLElement[];
}
export {};
