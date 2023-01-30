// CONSTANTS
export const MODULE_NAME = "pf2e-dorako-ui";

// THEMING

// prettier-ignore
export const darkThemeCompatibleCoreFoundryApplications = ["CombatTrackerConfig","InvitationLinks","SupportDetails","ToursManagement","WorldConfig","KeybindingsConfig", "FilePicker", "SettingsConfig", "PermissionConfig", "AVConfig", "DefaultTokenConfig", "FontConfig", "FolderConfig", "RollTableConfig", "PlaylistConfig", "CombatantConfig", "MeasuredTemplateConfig", "DocumentOwnershipConfig", "DocumentSheetConfig", "ModuleManagement", "MacroConfig", "Compendium", "CardsConfig", "WallConfig", "AmbientLightConfig", "AmbientSoundConfig", "TileConfig", "DrawingConfig"];
// prettier-ignore
export const darkThemeCompatiblePf2eApplications = ["NPCSheetPF2e","CharacterSheetPF2e","TokenConfigPF2e", "HomebrewElements", "VariantRulesSettings", "AutomationSettings", "MetagameSettings", "WorldClockSettings", "PersistentDamageDialog", "SceneConfigPF2e"];
// prettier-ignore
export const darkThemeCompatibleModuleApplications = ["RollPrompt", "SavingThrowApp", "AssignXPApp", "ContestedRollApp", "ActiveTileConfig", "DFChatEditor"];
// prettier-ignore
export const dorakoUiApplications = ["AvatarSettings","MiscSettings","ThemeSettings","UXSettings"]
// prettier-ignore
export const darkThemeIncompatibleApplications = ["JournalTextTinyMCESheetPF2e","JournalTextPageSheet","AbilityBuilderPopup","TokenActionHUD","CustomHotbar","SceneDarknessAdjuster","EffectsPanel","Notifications", "Pause","TokenHUD","HeadsUpDisplay","Sidebar","HotbarPF2e","SceneNavigation", "SceneControls","PlayerList", "ImagePopout","EnhancedJournal","JournalSheetPF2e"]
// prettier-ignore
export const exclusivelyDarkApplications = ["FABattlemaps", "FADownloader"]

// prettier-ignore
export const baseThemeCoreFoundryApplications = ["ImagePopout","ChatMessage","SceneControls", "SidebarTab", "PlayerList", "HeadsUpDisplay", "Notifications", "TokenHUD", "Sidebar","SceneNavigation"];
// prettier-ignore
export const baseThemePf2eApplications = ["HotbarPF2e", "EffectsPanel", "SceneDarknessAdjuster"]; // "JournalSheetPF2e",
// prettier-ignore
export const baseThemePf2eSheets = ["ItemSheet","ActorSheet","LootSheetPF2e"]; //"FamiliarSheetPF2e","HazardSheetPF2e"
// prettier-ignore
export const baseThemeModuleApplications = ["CommonToolbar","MonksHotbarExpansion","CustomHotbar", "TokenActionHUD"]

// prettier-ignore
export const baseThemeApplications = [...baseThemeCoreFoundryApplications,...baseThemePf2eApplications,...baseThemeModuleApplications, ...dorakoUiApplications];
// prettier-ignore
export const darkThemeCompatibleApplications = [...darkThemeCompatibleCoreFoundryApplications, ...darkThemeCompatibleModuleApplications, ...darkThemeCompatiblePf2eApplications, ...dorakoUiApplications]

// prettier-ignore
export const premiumModuleJournalSelector = ".gatewalkers-wrapper, .outlaws-wrapper, .bloodlords-wrapper .kingmaker-wrapper"; // pf2e-av

// CLASSES
export class Avatar {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.type = "avatar";
  }
}

export class CombatantAvatar extends Avatar {
  constructor(name, image) {
    super(name, image);
    this.type = "combatant";
  }
}

export class ActorAvatar extends Avatar {
  constructor(name, image) {
    super(name, image);
    this.type = "actor";
  }
}

export class TokenAvatar extends Avatar {
  constructor(name, image, scale, isSmall) {
    super(name, image);
    this.type = "token";
    this.scale = scale;
    this.isSmall = isSmall;
  }
}
