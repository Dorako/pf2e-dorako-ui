// Extended dark theme
Hooks.on("renderDialog", (sheet, html) => {
  const degree = game.settings.get("pf2e-dorako-ui", "theme.dark-theme-degree");
  if (degree !== "extended") return;
  
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
});

// Maximum dark theme
Hooks.on("renderApplication", (sheet, html) => {
  const degree = game.settings.get("pf2e-dorako-ui", "theme.dark-theme-degree");
  if (degree !== "maximum") return;
  let html0 = html[0];
  if (html0.classList.contains("dark-theme-blacklist")) return;
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
});


function markAsDarkTheme(sheet, html) {
  const degree = game.settings.get("pf2e-dorako-ui", "theme.dark-theme-degree");
  if (degree === "none" || degree === "maximum") return;
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
}

function markAsBlacklisted(sheet, html) {
  const degree = game.settings.get("pf2e-dorako-ui", "theme.dark-theme-degree");
  if (degree !== "maximum") return;
  let html0 = html[0];
  html0.classList.add("dark-theme-blacklist");
}

function markAsNativelyDarkTheme(sheet, html) {
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
}

// Supported dark themes
const foundryDocuments     = ["CombatTrackerConfig","InvitationLinks","SupportDetails","ToursManagement","WorldConfig","KeybindingsConfig", "FilePicker", "SettingsConfig", "PermissionConfig", "AVConfig", "DefaultTokenConfig", "FontConfig", "FolderConfig", "RollTableConfig", "PlaylistConfig", "CombatantConfig", "MeasuredTemplateConfig", "DocumentOwnershipConfig", "DocumentSheetConfig", "ModuleManagement", "MacroConfig", "Compendium", "CardsConfig", "WallConfig", "AmbientLightConfig", "AmbientSoundConfig", "TileConfig", "DrawingConfig"];
const pf2eDocuments        = ["TokenConfigPF2e", "HomebrewElements", "VariantRulesSettings", "AutomationSettings", "MetagameSettings", "WorldClockSettings", "PersistentDamageDialog", "SceneConfigPF2e"];
const moduleDocuments      = ["RollPrompt", "SavingThrowApp", "AssignXPApp", "ContestedRollApp", "ActiveTileConfig", "DFChatEditor"];
const dorakoUiDocuments    = ["AvatarSettings","MiscSettings","ThemeSettings","UiUxSettings"]
const blacklistedDocuments = ["ImagePopout","EnhancedJournal","JournalSheetPF2e"]
const nativelyDarkDocuments  = ["FABattlemaps", "FADownloader"]

for (const document of [...foundryDocuments, ...pf2eDocuments, ...moduleDocuments, ...dorakoUiDocuments]) {
  Hooks.on("render"+document, markAsDarkTheme)
}

for (const document of [...blacklistedDocuments]) {
  Hooks.on("render"+document, markAsBlacklisted)
}

for (const document of [...nativelyDarkDocuments]) {
  Hooks.on("render"+document, markAsNativelyDarkTheme)
}

// filepicker-plus natively uses dark mode, but doesn't use its own document type
Hooks.on("renderFilePicker", (sheet, html) => {
  let html0 = html[0];
  if (!game.modules.get("filepicker-plus")?.active) return;
  html0.classList.add("dorako-theme");
  html0.classList.add("dark-theme");
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
