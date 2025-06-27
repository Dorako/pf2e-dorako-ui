// CONSTANTS
export const MODULE_NAME = "pf2e-dorako-ui";


/* ----------------------------------------- */
/* Premium module                            */
/* ----------------------------------------- */
export const premiumModuleSelector = ".preyfordeath, .preyfordeath-wrapper, .curtaincall-wrapper, .curtaincall, .sf2eplaytest, .sf2eplaytest-wrapper, .wardensofwildwood, .wardensofwildwood-wrapper, .sevendooms, .sevendooms-wrapper, .rusthenge, .rusthenge-wrapper, .pfs05, .pfs05Pt2 .pfs05Pt1, .pfs05Pt1-wrapper, .pf2e-yom, .pf2e-ii, .pf2e-woii, .seasonofghosts, .seasonofghosts-wrapper, .skykingstomb-wrapper, .skykingstomb, .stolenfate-wrapper, .stolenfate, .harrow-reading, .harrow, .pf2e-km, .kingdom-app, .swpf-sheet, .swpf-wrapper, .pf2e-av, .pf2e-bb, .gatewalkers-wrapper, .gatewalkers, .outlaws-wrapper, .outlaws, .bloodlords-wrapper, .bloodlords, .kingmaker-wrapper, .kingmaker"; //

/* ----------------------------------------- */
/* Apps                                      */
/* ----------------------------------------- */
export const coreApps = ["ImagePopout","SceneControls", "SidebarTab", "Players", "HeadsUpDisplay", "Notifications", "TokenHUD","SceneNavigation", "Hotbar"]; // "Sidebar"
export const systemApps = ["ABCPicker","EffectsPanel", "SceneDarknessAdjuster"];
export const moduleApps = ["MobileUI", "MobileMenu", "WindowMenu","ClockPanel","CoreHUD","HUD","TokenBar", "TokenActionHud","SmallTimeApp","SearchApp","ControlManager","HUD","ItemPileConfig","PinCushionHUD","CommonToolbar","MonksHotbarExpansion","CustomHotbar"];
export const appV2Apps = ["ABCPicker","SearchAppV2","PF2eHudSidebar","PF2eHudToken","PF2eHudTooltip","PF2eHudPersistent","PF2eHudTracker"];
export const themedApps = [...coreApps, ...systemApps, ...moduleApps];

/* ----------------------------------------- */
/* Window apps                               */
/* ----------------------------------------- */
export const systemSheets = ["WorldClock", "ArmySheetPF2e","CreatureSheetPF2e","PartySheetPF2e","SpellPreparationSheet","ItemSheet","NPCSheetPF2e","VehicleSheetPF2e","FamiliarSheetPF2e","HazardSheetPF2e", "CharacterSheetPF2e","LootSheetPF2e"]; //|| "ItemSheet","ActorSheet", "KingdomSheetPF2e"
export const moduleWindowApps = ["ExtendedSettingsConfig"];
export const limitedScopeApplications = ["CompendiumBrowser","PF2eHudPersistent","ABCPicker","RolodexApplication","ArmySheetPF2e","KingdomSheetPF2e","CreatureSheetPF2e", "CharacterSheetPF2e", "PartySheetPF2e", "NPCSheetPF2e", "HazardSheetPF2e","VehicleSheetPF2e", "HUD"];

/* ----------------------------------------- */
/* v13                                       */
/* ----------------------------------------- */
export const interfaceApp = ["Players", "Hotbar"]

/* ----------------------------------------- */
/* Excluded                                  */
/* ----------------------------------------- */
export const excludedApplications = ["SearchAppShell","TokenActionHud","JournalSheet","CampingSheet","KingdomSheet","ChatPopout","Terminal","PF2EBestiary","SigilPF2EAdventureImporter","PreyJournalSheet","PF2eHudTextPopup","PF2eHudItemPopup","ItemAnimationsApp","ActorAnimationsApp","AnimationHistoryApp", "UserAnimationsApp", "WorldAnimationsApp","JSONEditorApp", "VCEChatLog", "AutorecMenuApp","GmScreenApplicationDrawer","MixerApp","EnhancedJournal","PartyOverviewApp","KingdomBuilder","ChatLogPF2e","ItemMenuApp","LevelsUI", "SpecialEffectsManagement", "ParticleEffectsManagement", "FilterEffectsManagementConfig"]; //

/* ----------------------------------------- */
/* Frameworks                                */
/* ----------------------------------------- */
export const frameworks = ["Svelte", "Vue"]


/* ----------------------------------------- */
/* Classes                                   */
/* ----------------------------------------- */
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

export class SubjectAvatar extends Avatar {
  constructor(name, image, scale, isSmall) {
    super(name, image);
    this.type = "subject-texture";
    this.scale = scale;
    this.isSmall = isSmall;
  }
}
