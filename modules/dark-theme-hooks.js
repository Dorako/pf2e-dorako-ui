import {
  darkThemeIncompatibleApplications,
  exclusivelyDarkApplications,
  darkThemeCompatibleApplications,
  baseThemePf2eSheets,
} from "./consts.js";
import { debug } from "./util.js";

// Supported dark theme
function markAsDarkTheme(app, html) {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme" || theme === "light-theme") return;
  debug(`render${app.constructor.name} | theme: ${theme}`);
  let html0 = html[0];
  html0.classList.add("dorako-ui");
  html0.classList.add("dark-theme");
}

// Critical hit/fumble deck
Hooks.on("renderJournalSheetPF2e", (app, html) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  if (!html[0].id.includes("JournalSheetPF2e-Compendium-pf2e-criticaldeck")) return;
  debug(`renderJournalSheetPF2e | critical-hit-fumble-deck | theme: ${theme}`);
  html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
});

// // Extended dark theme (Supported + Dialogs)
// Hooks.on("renderDialog", (app, html) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//   if (theme !== "extended") return;
//   debug(`renderDialog | dark-theme-degree: ${theme}`);
//   let html0 = html[0];
//   html0.classList.add("dorako-ui");
//   html0.classList.add("dark-theme");
// });

// // Extended dark theme support for 'fake' dialogs
// Hooks.on("renderApplication", (app, html, data) => {
//   const degree = game.settings.get("pf2e-dorako-ui", "theme.dark-theme-degree");
//   if (degree !== "extended") return;

//   debug(`renderApplication | dark-theme-degree: ${degree}`);
//   let html0 = html[0];
//   if (html0.classList.contains("dialog")) return;
//   if (!html0.classList.contains("window-app")) return;
//   const fakeDialogPatterns = ["popup", "dialog"];
//   for (const fakeDialogPattern of [...fakeDialogPatterns]) {
//     if (app.constructor.name.toLowerCase().includes(fakeDialogPattern)) {
//       debug(`render${app.constructor.name} | constructor includes '${fakeDialogPattern}' => add .dark-theme`);
//       html0.classList.add("dark-theme");
//       return;
//     }
//   }
// });

// Maximum dark theme (All '.app' applications except blacklisted ones)
for (const app of ["Application", ...baseThemePf2eSheets]) {
  Hooks.on("render" + app, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "dark-theme") return;
    if (darkThemeIncompatibleApplications.includes(app?.constructor?.name)) return;
    let html0 = html[0];
    if (!html0.classList.contains("app")) return;
    debug(`render${app.constructor.name} | theme: ${theme}`);
    html0.classList.add("dorako-ui");
    html0.classList.add("dark-theme");
  });
}

function markAsNativelyDarkTheme(app, html) {
  let html0 = html[0];
  debug(`renderApplication (${app.constructor.name}) | forced dark theme`);
  html0.classList.add("dorako-ui");
  html0.classList.add("dark-theme");
}

for (const document of [...darkThemeCompatibleApplications]) {
  Hooks.on("render" + document, markAsDarkTheme);
}

for (const document of [...exclusivelyDarkApplications]) {
  Hooks.on("render" + document, markAsNativelyDarkTheme);
}

// filepicker-plus natively uses dark mode, but doesn't use its own document type
Hooks.on("renderFilePicker", (app, html) => {
  let html0 = html[0];
  if (!game.modules.get("filepicker-plus")?.active) return;
  debug(`renderApplication (${app.constructor.name}) | forced dark theme`);
  html0.classList.add("dorako-ui");
  html0.classList.add("dark-theme");
});

// Hooks.on('init', () => {
//   if(localStorage.getItem('dark-mode') == 'true'){
//       $('body').addClass('dark-theme');
//   } else {
//       $('body').removeClass('dark-theme');
//   }
// });

// function createThemeButton(control, html, data) {
//   const name = "theme";
//   const title = "theme";
//   const icon = localStorage.getItem("dark-mode") === "true" ? "fas fa-sun" : "fas fa-moon";
//   const active = false; // localStorage.getItem('dark-mode') === 'true';
//   const btn = $(
//     `<li class="scene-control toggle ${
//       active ? "active" : ""
//     }" title="${title}" data-tool="${name}"><i class="${icon}"></i></li>`
//   );
//   btn.on("click", () => {
//     const apps = Object.values(ui.windows).filter((w) => w instanceof Application);
//     for (const app of apps) {
//       app.render();
//     }
//     // if (localStorage.getItem("dark-mode") == "true") {
//     //   localStorage.setItem("dark-mode", "false");
//     //   $("body").removeClass("dark-theme");
//     //   $("li.scene-control.toggle>i.fas.fa-moon").removeClass("fa-moon").addClass("fa-sun");
//     // } else {
//     //   localStorage.setItem("dark-mode", "true");
//     //   $("body").addClass("dark-theme");
//     //   $("li.scene-control.toggle>i.fas.fa-sun").removeClass("fa-sun").addClass("fa-moon");
//     // }
//   });
//   html.find(".main-controls").append(btn);
// }

// Hooks.on("renderSceneControls", createThemeButton);
