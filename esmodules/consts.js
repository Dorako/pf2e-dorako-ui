// CONSTANTS
export const MODULE_NAME = "pf2e-dorako-ui";

/* ----------------------------------------- */
/* Legacy consts                             */
/* ----------------------------------------- */
export const darkThemeIncompatibleApplications = ["SceneActorsLayer","HarrowReadingSheet","KingmakerJournalSheet","ClockAddDialog","ImprovedJournalSheet","WindowTabs","Ye","SwadeVehicleSheet","SwadeNPCSheet","JournalSheet","CharacterSheet","Tokenizer","JournalTextTinyMCESheetPF2e","JournalTextPageSheet","AbilityBuilderPopup","AttributeBuilder","TokenActionHUD","CustomHotbar","SceneDarknessAdjuster","EffectsPanel","Notifications", "Pause","TokenHUD","HeadsUpDisplay","Sidebar","HotbarPF2e","SceneNavigation", "SceneControls","PlayerList", "ImagePopout","EnhancedJournal","JournalSheetPF2e"]
export const exclusivelyDarkApplications = ["FABattlemaps", "FADownloader"]
export const baseThemeCoreFoundryApplications = ["ImagePopout","SceneControls", "SidebarTab", "PlayerList", "HeadsUpDisplay", "Notifications", "TokenHUD", "Sidebar","SceneNavigation", "Hotbar"];
export const baseThemePf2eApplications = ["VehicleSheetPF2e","HotbarPF2e", "EffectsPanel", "SceneDarknessAdjuster"]; // "JournalSheetPF2e",
export const baseThemePf2eSheets = ["KingdomSheetPF2e","CreatureSheetPF2e","PartySheetPF2e","SpellPreparationSheet","ItemSheet","NPCSheetPF2e","VehicleSheetPf2e","FamiliarSheetPF2e","HazardSheetPF2e", "CharacterSheetPF2e","LootSheetPF2e"]; //|| "ItemSheet","ActorSheet"

export const baseThemeModuleApplications = ["SmallTimeApp","SearchApp","ControlManager","HUD","ItemPileConfig","PinCushionHUD","CombatCarousel","CommonToolbar","MonksHotbarExpansion","CustomHotbar"];

export const baseThemeApplications = [...baseThemeCoreFoundryApplications,...baseThemePf2eApplications,...baseThemeModuleApplications];

/* ----------------------------------------- */
/* Premium module                            */
/* ----------------------------------------- */
export const premiumModuleSelector = ".pf2e-yom, .pf2e-ii, .pf2e-woii, .seasonofghosts, .seasonofghosts-wrapper, .skykingstomb-wrapper, .skykingstomb, .stolenfate-wrapper, .stolenfate, .harrow-reading, .harrow, .pf2e-km, .kingdom-app, .swpf-sheet, .swpf-wrapper, .pf2e-av, .pf2e-bb, .gatewalkers-wrapper, .gatewalkers, .outlaws-wrapper, .outlaws, .bloodlords-wrapper, .bloodlords, .kingmaker-wrapper, .kingmaker"; //

/* ----------------------------------------- */
/* Apps                                      */
/* ----------------------------------------- */
export const coreApps = ["ImagePopout","SceneControls", "SidebarTab", "PlayerList", "HeadsUpDisplay", "Notifications", "TokenHUD","SceneNavigation", "Hotbar"]; // "Sidebar"
export const systemApps = ["EffectsPanel", "SceneDarknessAdjuster"];
export const moduleApps = ["ExtendedSettingsConfig","HUD","TokenBar", "TokenActionHud","SmallTimeApp","SearchApp","ControlManager","HUD","ItemPileConfig","PinCushionHUD","CommonToolbar","MonksHotbarExpansion","CustomHotbar"];
export const themedApps = [...coreApps, ...systemApps, ...moduleApps];

/* ----------------------------------------- */
/* Window apps                               */
/* ----------------------------------------- */
export const systemSheets = ["CreatureSheetPF2e","PartySheetPF2e","SpellPreparationSheet","ItemSheet","NPCSheetPF2e","VehicleSheetPF2e","FamiliarSheetPF2e","HazardSheetPF2e", "CharacterSheetPF2e","LootSheetPF2e"]; //|| "ItemSheet","ActorSheet", "KingdomSheetPF2e"
export const limitedScopeApplications = ["KingdomSheetPF2e","CreatureSheetPF2e", "CharacterSheetPF2e", "PartySheetPF2e", "NPCSheetPF2e", "HazardSheetPF2e","VehicleSheetPF2e", "HUD"];

/* ----------------------------------------- */
/* Excluded                                  */
/* ----------------------------------------- */
export const excludedApplications = ["ItemMenuApp","LevelsUI", "SpecialEffectsManagement", "ParticleEffectsManagement", "FilterEffectsManagementConfig"]; //"ChatLogPF2e"