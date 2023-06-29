import { baseThemeApplications, baseThemePf2eSheets, MODULE_NAME, premiumModuleSelector } from "./consts.js";

// Add .dorako-ui to all always-styled applications (Does not include pf2e sheets)
for (const appName of [...baseThemeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    // if (app.constructor.name.startsWith("SWPF")) return; // SWPFCompendiumTOC, SWPFSheet
    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    if (excludeString.toLowerCase().includes(appName.toLowerCase())) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .dorako-ui`
      );
      return;
    }
    let html0 = html[0];
    console.debug(`${MODULE_NAME} | baseThemeApplications | render${app.constructor.name} => add .dorako-ui`);
    // console.debug({ app });
    html0.classList.add("dorako-ui");
  });
}

// Hooks.on("renderMerchantApp", (app, html, data) => {
//   let html0 = html[0];
//   html0.classList.add("dorako-ui");
//   console.debug(`${MODULE_NAME} | LOOK AT ME`);
//   console.log({ app });
//   console.log({ html });
//   console.log({ data });
//   app.options.classes.push("dorako-ui");
// });

Hooks.on("renderSvelteApplication", (app) => {
  app.element[0].classList.add("dorako-ui");
});

// // Add .dorako-ui to all whitelisted Applications
// for (const app of [...baseThemeApplications]) {
//   Hooks.on("render" + app, (app, html, data) => {
//     let html0 = html[0];
//     const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//     if (theme === "no-theme") {
//       console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => do not add .dorako-ui`);
//       return;
//     }
//     console.debug(`${MODULE_NAME} | baseThemeApplications | render${app.constructor.name} => add .dorako-ui`);
//     html0.classList.add("dorako-ui");
//   });
// }

// TAH Core
Hooks.on("renderTokenActionHud", (app, html, data) => {
  if (
    game.modules.get("token-action-hud-core")?.active &&
    game.settings.get("token-action-hud-core", "style") === "dorakoUI"
  ) {
    let html0 = html[0];
    console.debug(`${MODULE_NAME} | render${app.constructor.name} => add .dorako-ui`);
    html0.classList.add("dorako-ui");
    return;
  }
  console.debug(`${MODULE_NAME} | render${app.constructor.name} but style !== "dorakoUI" => do not add .dorako-ui`);
});

// TAH (Original)
Hooks.on("renderTokenActionHUD", (app, html, data) => {
  // reconsider logic
  if (game.modules.get("token-action-hud")?.active && game.settings.get("token-action-hud", "style") === "dorakoUI") {
    let html0 = html[0];
    console.debug(`${MODULE_NAME}  | render${app.constructor.name} => add .dorako-ui`);
    html0.classList.add("dorako-ui");
    return;
  }
  console.debug(`${MODULE_NAME}  | render${app.constructor.name} but style !== "dorakoUI" => do not add .dorako-ui`);
});

// Add .dorako-ui to all .dialog applications
Hooks.on("renderDialog", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => do not add .dorako-ui`);
    return;
  }
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | pushing .dorako-ui class option`);
  // console.debug({ app });
  app.options?.classes?.push("dorako-ui");
  // let position = app.position;
  // position.height += 6;
  // position.width += 6;
  // app.setPosition(position);
  app.render();
});

// Add .dorako-ui and .dialog to all "Dialogs"
Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (html0.classList.contains("dialog")) return;
  if (!html0.classList.contains("window-app")) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => do not add .dorako-ui`);
    return;
  }
  const fakeDialogPatterns = ["popup", "dialog"];
  for (const fakeDialogPattern of [...fakeDialogPatterns]) {
    if (app.constructor.name.toLowerCase().includes(fakeDialogPattern)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | constructor includes '${fakeDialogPattern}' => add .dialog .dorako-ui`
      );
      html0.classList.add("dorako-ui");
      html0.classList.add("dialog");
      return;
    }
  }
});

// Add .dorako-ui to all PF2E "applications", add .dorako-ui-skip to generalized stuff
for (const app of [...baseThemePf2eSheets]) {
  Hooks.on("render" + app, (app, html, data) => {
    let html0 = html[0];
    // if (!app.constructor.name.endsWith("PF2e")) return; <- SpellPreparationSheet doesn't end with PF2e
    if (!html0.classList.contains("window-app")) return;
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme === "no-theme") {
      return;
    }
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is PF2e .window-app "Application" => add .dorako-ui`
    );
    html0.classList.add("dorako-ui");
    html.find("select.tag").addClass("dorako-ui-skip");
    html.find(".initiative-select select").addClass("dorako-ui-skip");
  });
}

// Add 'light-theme' to journal-entry-content if dark theme journals is not enabled
for (const appName of ["JournalSheet", "JournalPageSheet"]) {
  //"JournalPageSheet"
  Hooks.on("render" + appName, (app, html, data) => {
    if (html[0].id.includes("JournalSheetPF2e-Compendium-pf2e-criticaldeck")) return;
    // html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dalvyn-journal");
    const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
    if (!isDarkJournals) {
      html.closest(".app").find(".journal-entry-content").addClass("dorako-ui light-theme");
      return;
    } else {
      html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
      return;
    }
  });
}

// Do not style selects on loot sheets
Hooks.on("renderLootSheetPF2e", (app, html, data) => {
  html.find("select").addClass("dorako-ui-skip");
});

// Do not style input fields on hazard sheets
Hooks.on("renderHazardSheetPF2e", (app, html, data) => {
  html.find("input").addClass("dorako-ui-skip");
});

// Re-organize NPC sheets, do not apply base styling to selects or input fields
Hooks.on("renderNPCSheetPF2e", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => do not add .dorako-ui`);
    return;
  }
  const acDetails = app.object.attributes.ac.details;
  const collapseAc = acDetails === "";
  const hpDetails = app.object.attributes.hp.details;
  const hpTemp = app.object.attributes.hp.temp;
  const collapseHp = hpDetails === "" && hpTemp === 0;
  const collapseInitiative = app.object.attributes.initiative.ability === "perception";
  const collapseToggles = app.object.system.toggles?.length === 0;
  const collapseSaves = app.object.system.attributes.allSaves.value === "";

  const immunities = app.object.system.attributes.immunities;
  const collapseImmunities = immunities.length === 0 && immunities.custom === "";
  const weaknesses = app.object.system.attributes.weaknesses;
  const collapseWeaknesses = weaknesses.length === 0;
  const resistances = app.object.system.attributes.resistances;
  const collapseResistances = resistances.length === 0;

  html.find("select").addClass("dorako-ui-skip");
  html.find("input").addClass("dorako-ui-skip");

  if (collapseAc) {
    let section = html.find(".armor-section")[0];
    section.classList.add("collapsed");
  }

  if (collapseHp) {
    let section = html.find(".health-section")[0];
    section.classList.add("collapsed");
  }

  if (collapseInitiative) {
    let section = html.find(".initiative")[0];
    section.classList.add("collapsed");
  }

  if (collapseToggles) {
    let section = html.find(".toggles")[0];
    section.classList.add("dorako-display-none");
  }

  if (collapseImmunities) {
    let section = html.find(".immunities")[0];
    section.classList.add("collapsed", "empty");
  }

  if (collapseWeaknesses) {
    let section = html.find(".weaknesses")[0];
    section.classList.add("collapsed", "empty");
  }

  if (collapseResistances) {
    let section = html.find(".resistances")[0];
    section.classList.add("collapsed", "empty");
  }

  let saves = html.find(".saves")[0];
  let saveDetails = html.find(".save-details")[0];
  saveDetails.classList.remove("side-bar-section");

  let initiative = html.find(".initiative")[0];
  let newSaves = document.createElement("div");
  newSaves.classList.add("saves-section", "side-bar-section");
  newSaves.appendChild(saves);
  newSaves.appendChild(saveDetails);
  initiative.parentNode.insertBefore(newSaves, initiative.nextSibling);

  if (collapseSaves) {
    let section = html.find(".saves-section")[0];
    section.classList.add("collapsed");
  }
});

// // Blue player sheet
// Hooks.on("renderCharacterSheetPF2e", (app, html, data) => {
//   html.closest(".app").find("aside").wrap("<div class='blue'></div>");
// });
