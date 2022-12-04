import { ActiveEffectPF2e } from "@pf2e/module/active-effect";
import { ActorPF2e } from "@pf2e/module/actor";
import { CompendiumBrowser } from "@pf2e/module/apps/compendium-browser";
import { CompendiumDirectoryPF2e } from "@pf2e/module/apps/ui/compendium-directory";
import { CanvasPF2e } from "@pf2e/module/canvas";
import { TokenPF2e } from "@pf2e/module/canvas/token";
import { ChatMessagePF2e } from "@pf2e/module/chat-message";
import { CombatPF2e } from "@pf2e/module/combat";
import { CombatantPF2e } from "@pf2e/module/combatant";
import { ConditionManager } from "@pf2e/module/conditions";
import { FolderPF2e } from "@pf2e/module/folder";
import { ItemPF2e } from "@pf2e/module/item";
import { MacroPF2e } from "@pf2e/module/macro";
import {
    AbilityModifier,
    CheckModifier,
    ModifierPF2e,
    MODIFIER_TYPE,
    ProficiencyModifier,
    StatisticModifier,
} from "@pf2e/module/modifiers";
import { RuleElementPF2e, RuleElements } from "@pf2e/module/rules/rules";
import { ScenePF2e } from "@pf2e/module/scene";
import { HomebrewSettingsKey, HomebrewTag } from "@pf2e/module/settings/homebrew";
import { CombatTrackerPF2e } from "@pf2e/module/system/combat-tracker";
import { EffectPanel } from "@pf2e/module/system/effect-panel";
import { EffectTracker } from "@pf2e/module/system/effect-tracker";
import { CheckPF2e } from "@pf2e/module/system/rolls";
import { WorldClock } from "@pf2e/module/system/world-clock";
import { TokenDocumentPF2e } from "@pf2e/module/token-document";
import { UserPF2e } from "@pf2e/module/user";
import { StatusEffects } from "@pf2e/scripts/actor/status-effects";
import { PF2ECONFIG, StatusEffectIconType } from "@pf2e/scripts/config";
import { DicePF2e } from "@pf2e/scripts/dice";
import { rollActionMacro, rollItemMacro } from "@pf2e/scripts/macros/hotbar";
import { launchTravelSheet } from "@pf2e/scripts/macros/travel/travel-speed-sheet";
import { calculateXP } from "@pf2e/scripts/macros/xp";
import { remigrate } from "@pf2e/scripts/system/remigrate";

declare global {
    interface Game {
        pf2e: {
            actions: { [key: string]: Function };
            compendiumBrowser: CompendiumBrowser;
            worldClock: WorldClock;
            effectPanel: EffectPanel;
            effectTracker: EffectTracker;
            rollActionMacro: typeof rollActionMacro;
            rollItemMacro: typeof rollItemMacro;
            gm: {
                calculateXP: typeof calculateXP;
                launchTravelSheet: typeof launchTravelSheet;
            };
            system: {
                remigrate: typeof remigrate;
            };
            Dice: typeof DicePF2e;
            StatusEffects: typeof StatusEffects;
            ConditionManager: typeof ConditionManager;
            ModifierType: typeof MODIFIER_TYPE;
            Modifier: typeof ModifierPF2e;
            AbilityModifier: typeof AbilityModifier;
            ProficiencyModifier: typeof ProficiencyModifier;
            StatisticModifier: typeof StatisticModifier;
            CheckModifier: typeof CheckModifier;
            Check: typeof CheckPF2e;
            RuleElements: typeof RuleElements;
            RuleElement: typeof RuleElementPF2e;
            TextEditor: typeof TextEditor;
        };
    }

    interface ConfigPF2e
        extends Config<
            ActiveEffectPF2e,
            ActorPF2e,
            ChatMessagePF2e,
            CombatantPF2e,
            CombatPF2e,
            FolderPF2e,
            ItemPF2e,
            MacroPF2e,
            ScenePF2e,
            TokenDocumentPF2e
        > {
        debug: Config["debug"] & {
            ruleElement: boolean;
        };

        PF2E: typeof PF2ECONFIG;
        time: {
            roundTime: number;
        };
        ui: Config<
            ActiveEffectPF2e,
            ActorPF2e,
            ChatMessagePF2e,
            CombatantPF2e,
            CombatPF2e,
            FolderPF2e,
            ItemPF2e,
            MacroPF2e,
            ScenePF2e,
            TokenDocumentPF2e
        >["ui"] & {
            combat: typeof CombatTrackerPF2e;
            compendium: typeof CompendiumDirectoryPF2e;
        };
    }

    const CONFIG: ConfigPF2e;
    const canvas: CanvasPF2e;
    namespace globalThis {
        // eslint-disable-next-line no-var
        var game: Game<
            ActorPF2e,
            ChatMessagePF2e,
            CombatPF2e,
            ItemPF2e,
            MacroPF2e,
            ScenePF2e,
            UserPF2e
        >;
    }

    interface Window {
        DicePF2e: typeof DicePF2e;
        PF2eStatusEffects: typeof StatusEffects;
        PF2eConditionManager: typeof ConditionManager;
        PF2ModifierType: typeof MODIFIER_TYPE;
        PF2Modifier: typeof ModifierPF2e;
        AbilityModifier: typeof AbilityModifier;
        ProficiencyModifier: typeof ProficiencyModifier;
        PF2StatisticModifier: typeof StatisticModifier;
        PF2CheckModifier: typeof CheckModifier;
        PF2Check: typeof CheckPF2e;
    }

    interface ClientSettings {
        get(module: "pf2e", setting: "ancestryParagonVariant"): boolean;
        get(module: "pf2e", setting: "automation.rulesBasedVision"): boolean;
        get(module: "pf2e", setting: "automation.effectExpiration"): boolean;
        get(module: "pf2e", setting: "automation.lootableNPCs"): boolean;
        get(module: "pf2e", setting: "defaultTokenSettings"): boolean;
        get(module: "pf2e", setting: "defaultTokenSettingsBar"): number;
        get(module: "pf2e", setting: "defaultTokenSettingsName"): string;
        get(module: "pf2e", setting: "enabledRulesUI"): boolean;
        get(module: "pf2e", setting: "freeArchetypeVariant"): boolean;
        get(module: "pf2e", setting: "ignoreCoinBulk"): boolean;
        get(module: "pf2e", setting: "pfsSheetTab"): boolean;
        get(module: "pf2e", setting: "staminaVariant"): 0 | 1;
        get(module: "pf2e", setting: "statusEffectType"): StatusEffectIconType;
        get(module: "pf2e", setting: "worldSchemaVersion"): number;
        get(module: "pf2e", setting: "drawCritFumble"): boolean;
        get(module: "pf2e", setting: "critFumbleButtons"): boolean;
        get(
            module: "pf2e",
            setting: "homebrew.weaponCategories",
        ): HomebrewTag<"weaponCategories">[];
        get(module: "pf2e", setting: HomebrewSettingsKey): HomebrewTag[];
        get(module: "pf2e", setting: "identifyMagicNotMatchingTraditionModifier"): 0 | 2 | 5 | 10;
    }

    interface WorldSettingsStorage {
        get(setting: "pf2e.worldSchemaVersion"): string | undefined;
        getItem(setting: "pf2e.worldSchemaVersion"): string | null;
    }

    const BUILD_MODE: "development" | "production";
}
