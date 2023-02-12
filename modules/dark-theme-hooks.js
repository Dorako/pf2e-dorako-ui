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

// Dark theme journal hook
Hooks.on("renderJournalSheetPF2e", (app, html) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
  if (!isDarkJournals) return;
  let html0 = html[0];
  if (html0.matches(premiumModuleSelector)) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | matches premiumModuleSelector => do not add .dorako-ui or .dark-theme`
    );
    return;
  }
  html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
  console.debug(
    `${MODULE_NAME} | renderJournalSheetPF2e | enable-dark-theme-journals: ${isDarkJournals} => add .dorako-ui .dark-theme`
  );
});

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
