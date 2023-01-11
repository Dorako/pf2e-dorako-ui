function injectSheetTheme(sheet, html) {
  const theme = game.settings.get("pf2e-dorako-ui", "app-sheet-theme");
  if (theme === "default") return;
  
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(theme);
}

const foundryHooks = ["renderFilePicker", "renderSettingsConfig", "renderPermissionConfig", "renderAVConfig", "renderDefaultTokenConfig", "renderFontConfig", "renderFolderConfig", "renderRollTableConfig", "renderPlaylistConfig", "renderCombatantConfig", "renderMeasuredTemplateConfig", "renderDocumentOwnershipConfig", "renderDocumentSheetConfig", "renderModuleManagement", "renderMacroConfig", "renderCompendium", "renderCardsConfig", "renderWallConfig", "renderAmbientLightConfig", "renderAmbientSoundConfig", "renderTileConfig", "renderDrawingConfig"];
const pf2eHooks    = ["renderTokenConfigPF2e", "renderHomebrewElements", "renderVariantRulesSettings", "renderAutomationSettings", "renderMetagameSettings", "renderWorldClockSettings", "renderPersistentDamageDialog", "renderSceneConfigPF2e"];
const moduleHooks  = ["renderRollPrompt", "renderSavingThrowApp", "renderAssignXPApp", "renderContestedRollApp", "renderActiveTileConfig", "renderDFChatEditor"];

for (const hookName of foundryHooks) {
  console.log("HI");
  Hooks.on(hookName, injectSheetTheme)
}

for (const hookName of pf2eHooks) {
  Hooks.on(hookName, injectSheetTheme)
}

for (const hookName of moduleHooks) {
  Hooks.on(hookName, injectSheetTheme)
}

// filepicker-plus natively uses dark mode
Hooks.on("renderFilePicker", (sheet, html) => {
  let html0 = html[0];
  if (!game.modules.get("filepicker-plus")?.active) return;
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
});

// FABattlemaps natively uses dark mode
Hooks.on("renderFABattlemaps", (sheet, html) => { // Forgotten Adventure Battlemaps, natively dark
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
});

// FABattlemaps natively uses dark mode
Hooks.on("renderFADownloader", (sheet, html) => { // Forgotten Adventure Battlemaps, natively dark
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
});

Hooks.on("renderDialog", (sheet, html) => {
  const theme = game.settings.get("pf2e-dorako-ui", "dialog-sheet-theme");
  if (theme === "default") return;
  
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(theme);
});