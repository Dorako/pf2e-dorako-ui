function injectSheetTheme(sheet, html) {
  const theme = game.settings.get("pf2e-dorako-ui", "app-sheet-theme");
  if (theme === "default") return;
  
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(theme);
}

const foundryDocuments = ["InvitationLinks","SupportDetails","ToursManagement","WorldConfig","KeybindingsConfig", "FilePicker", "SettingsConfig", "PermissionConfig", "AVConfig", "DefaultTokenConfig", "FontConfig", "FolderConfig", "RollTableConfig", "PlaylistConfig", "CombatantConfig", "MeasuredTemplateConfig", "DocumentOwnershipConfig", "DocumentSheetConfig", "ModuleManagement", "MacroConfig", "Compendium", "CardsConfig", "WallConfig", "AmbientLightConfig", "AmbientSoundConfig", "TileConfig", "DrawingConfig"];
const pf2eDocuments    = ["TokenConfigPF2e", "HomebrewElements", "VariantRulesSettings", "AutomationSettings", "MetagameSettings", "WorldClockSettings", "PersistentDamageDialog", "SceneConfigPF2e"];
const moduleDocuments  = ["RollPrompt", "SavingThrowApp", "AssignXPApp", "ContestedRollApp", "ActiveTileConfig", "DFChatEditor"];

for (const document of [...foundryDocuments, ...pf2eDocuments, ...moduleDocuments]) {
  Hooks.on("render"+document, injectSheetTheme)
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

// function initialize(html){
//   let openBtn = $(`<a class="dark-mode-toggle" title="Toggle theme"><i class="fas fa-sun"></i>Theme</a>`);
//   openBtn.click(ev => {
//       if(localStorage.getItem('dark-mode') == 'true'){
//           localStorage.setItem('dark-mode', 'false');
//           $('body').removeClass('dark-theme');
//           $('a.dark-mode-toggle>i.far.fa-sun').removeClass('far').addClass('fas');
//       } else {
//           localStorage.setItem('dark-mode', 'true');
//           $('body').addClass('dark-theme');
//           $('a.dark-mode-toggle>i.fas.fa-sun').removeClass('fas').addClass('far');
//       }
//   });
//   html.closest('.app').find('.dark-mode-toggle').remove();
//   let titleElement = html.closest('.app').find('.window-title');
//   openBtn.insertAfter(titleElement);
// }

// Hooks.on('renderDialog', (app, html, data) => {
//   initialize(html);
// });

// Hooks.on('init', () => {
//   if(localStorage.getItem('dark-mode') == 'true'){
//       $('body').addClass('dark-theme');
//   } else {
//       $('body').removeClass('dark-theme');
//   }
// });

// function createThemeButton(control, html, data) {
//     const name = 'theme';
//     const title = 'theme';
//     const icon = (localStorage.getItem('dark-mode') === 'true') ? 'far fa-sun' : 'far fa-moon';
//     const active = false; // localStorage.getItem('dark-mode') === 'true';
//     const btn = $(`<li class="scene-control toggle ${active ? 'active' : ''}" title="${title}" data-tool="${name}"><i class="${icon}"></i></li>`);
//     btn.on('click', () => {
//       if(localStorage.getItem('dark-mode') == 'true'){
//           localStorage.setItem('dark-mode', 'false');
//           $('body').removeClass('dark-theme');
//           $('li.scene-control.toggle>i.far.fa-moon').removeClass('fa-moon').addClass('fa-sun');
//       } else {
//           localStorage.setItem('dark-mode', 'true');
//           $('body').addClass('dark-theme');
//           $('li.scene-control.toggle>i.far.fa-sun').removeClass('fa-sun').addClass('fa-moon');
//       }});
//     html.find('.main-controls').append(btn);
// }

// Hooks.on('renderSceneControls', createThemeButton);
