import {
  darkThemeIncompatibleApplications,
  exclusivelyDarkApplications,
  darkThemeCompatibleApplications,
  baseThemePf2eSheets,
  MODULE_NAME,
  premiumModuleSelector,
} from "./consts.js";

// Supported dark theme
function markAsDarkTheme(app, html) {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme" || theme === "light-theme") return;
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme}`);
  let html0 = html[0];
  html0.classList.add("dorako-ui");
  html0.classList.add("dark-theme");
}

// Critical hit/fumble deck
Hooks.on("renderJournalSheetPF2e", (app, html) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  if (!html[0].id.includes("JournalSheetPF2e-Compendium-pf2e-criticaldeck")) return;
  console.debug(
    `${MODULE_NAME} | renderJournalSheetPF2e | critical-hit-fumble-deck | theme: ${theme} => add .dorako-ui .dark-theme`
  );
  html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
});

// Add .dorako-ui to all .journal-entry Applications
// This hook is used to give modules (AV) a chance to add their own classes first
Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (!html0.classList.contains("journal-entry")) return;
  if (html0.matches(premiumModuleSelector)) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | matches premiumModuleSelector => do not add .dorako-ui`
    );
    return;
  }
  const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
  if (!isDarkJournals) {
    html.closest(".app").find(".journal-entry-content").addClass("dorako-ui light-theme");
    return;
  }
  if (html0.matches(premiumModuleSelector)) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | matches premiumModuleSelector => do not add .dorako-ui or .dark-theme`
    );
    return;
  }
  html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
  console.debug(
    `${MODULE_NAME} | render${app.constructor.name} | enable-dark-theme-journals: ${isDarkJournals} => add .dorako-ui .dark-theme to .journal-entry-content`
  );
});

// Add .dorako-ui.dark-theme to the page if it is not a page included in a premium module-styled journal
Hooks.on("renderJournalTextPageSheet", (app, html, data) => {
  let journalFrame = app?.object?.parent?.sheet;
  if (!journalFrame) return;
  let frameHtml = journalFrame?.element;
  if (!frameHtml || frameHtml.length == 0) return;
  // if (frameHtml[0].matches(premiumModuleSelector)) return;
  const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
  if (!isDarkJournals) {
    html.closest(".app").find(".journal-entry-content").addClass("dorako-ui light-theme");
    return;
  }
  console.debug(
    `${MODULE_NAME} | render${app.constructor.name} | enable-dark-theme-journals: ${isDarkJournals} => add .dorako-ui .dark-theme to .journal-entry-content`
  );
  frameHtml.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
});

// MEJ dark theme not quite right yet
// Hooks.on("renderEnhancedJournal", (app, html, data) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//   if (theme === "no-theme") return;
//   html[0].classList.add(theme);
//   const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
//   if (!isDarkJournals) {
//     html.closest(".app").find(".journal-entry-content").addClass("dorako-ui light-theme");
//     return;
//   }
//   html.closest(".app").find(".journal-entry-content").addClass(`dorako-ui dark-theme`);
//   // ^ seems like this doesn't work, perhaps fires before the data exists.
//   // html.closest(".app").find(".journal-page-content").addClass(`dorako-ui dark-theme`);
//   // ^ seems like this doesn't work, perhaps fires before the data exists.
// });

// for (const appName of ["JournalSheet"]) {
//   // "JournalPageSheet"
//   Hooks.on("render" + appName, (app, html, data) => {
//     const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
//     if (!isDarkJournals) return;
//     html[0].classList.add("dark-theme");
//   });
// }

// Maximum dark theme (All '.app' applications except blacklisted ones)
for (const app of ["Application", ...baseThemePf2eSheets]) {
  Hooks.on("render" + app, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "dark-theme") return;
    if (darkThemeIncompatibleApplications.includes(app?.constructor?.name)) return;
    let html0 = html[0];
    if (html0.matches(premiumModuleSelector)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | matches premiumModuleSelector => do not add .dorako-ui or .dark-theme`
      );
      return;
    }
    if (!html0.classList.contains("app")) return;
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme}`);
    html0.classList.add("dorako-ui");
    html0.classList.add("dark-theme");
  });
}

Hooks.on("renderSvelteApplication", (app) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "dark-theme") return;
  if (darkThemeIncompatibleApplications.includes(app?.constructor?.name)) return;
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme}`);
  app.element[0].classList.add("dorako-ui");
  app.element[0].classList.add("dark-theme");
});

function markAsNativelyDarkTheme(app, html) {
  let html0 = html[0];
  console.debug(`${MODULE_NAME} | renderApplication (${app.constructor.name}) | forced dark theme`);
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
  console.debug(`${MODULE_NAME} | renderApplication (${app.constructor.name}) | forced dark theme`);
  html0.classList.add("dorako-ui");
  html0.classList.add("dark-theme");
});
