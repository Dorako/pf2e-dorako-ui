import { baseThemeApplications, baseThemePf2eSheets, premiumModuleJournalSelector } from "./consts.js";
import { debug, warn } from "./util.js";

// Debugging
Hooks.on("renderApplication", (app, html, data) => {
  debug(`renderApplication | render${app.constructor.name}`);
  console.debug({ app });
});

// Add .dorako-ui to all whitelisted Applications
for (const app of [...baseThemeApplications]) {
  Hooks.on("render" + app, (app, html, data) => {
    let html0 = html[0];
    debug(`baseThemeApplications | render${app.constructor.name} => add .dorako-ui`);
    console.debug({ app });
    html0.classList.add("dorako-ui");
  });
}

// Add .dorako-ui to all .window-app Applications
Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (!html0.classList.contains("window-app")) return;
  if (html0.matches(premiumModuleJournalSelector)) {
    debug(`render${app.constructor.name} | matches premiumModuleJournalSelector => do not add .dorako-ui`);
    return;
  }
  debug(`render${app.constructor.name} | is .window-app => add .dorako-ui`);
  html0.classList.add("dorako-ui");
});

// Add .dorako-ui to all .window-app "Applications", add .dorako-ui-skip to generalized stuff
for (const app of [...baseThemePf2eSheets]) {
  Hooks.on("render" + app, (app, html, data) => {
    let html0 = html[0];
    if (!html0.classList.contains("window-app")) return;
    debug(`baseThemePf2eSheets | render${app.constructor.name} => add .dorako-ui`);
    console.debug({ app });
    html0.classList.add("dorako-ui");
    html.find("select.tag").addClass("dorako-ui-skip");
  });
}

// Add .dorako-ui and .dialog to all "Dialogs"
Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (html0.classList.contains("dialog")) return;
  if (!html0.classList.contains("window-app")) return;
  const fakeDialogPatterns = ["popup", "dialog"];
  for (const fakeDialogPattern of [...fakeDialogPatterns]) {
    if (app.constructor.name.toLowerCase().includes(fakeDialogPattern)) {
      debug(`render${app.constructor.name} | constructor includes '${fakeDialogPattern}' => add .dialog .dorako-ui`);
      html0.classList.add("dorako-ui");
      html0.classList.add("dialog");
      return;
    }
  }
});

Hooks.on("renderLootSheetPF2e", (app, html, data) => {
  html.find("select").addClass("dorako-ui-skip");
});

Hooks.on("renderNPCSheetPF2e", (app, html, data) => {
  const npcTheme = game.settings.get("pf2e-dorako-ui", "theme.npc-sheet-theme");
  if (npcTheme === "default") return;
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(npcTheme);
  const acDetails = app.object.attributes.ac.details;
  const collapseAc = acDetails === "";
  const hpDetails = app.object.attributes.hp.details;
  const hpTemp = app.object.attributes.hp.temp;
  const collapseHp = hpDetails === "" && hpTemp === 0;
  const collapseInitiative = app.object.attributes.initiative.ability === "perception";
  const collapseToggles = app.object.system.toggles.length === 0;
  const collapseSaves = app.object.system.attributes.allSaves.value === "";

  const immunities = app.object.system.attributes.immunities;
  const collapseImmunities = immunities.length === 0 && immunities.custom === "";
  const weaknesses = app.object.system.attributes.weaknesses;
  const collapseWeaknesses = weaknesses.length === 0;
  const resistances = app.object.system.attributes.resistances;
  const collapseResistances = resistances.length === 0;

  if (true) {
    html.find("select").addClass("dorako-ui-skip");
    html.find("input").addClass("dorako-ui-skip");
  }

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

Hooks.on("renderLootSheetPF2e", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.loot-sheet-theme");
  if (theme === "default") return;
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(theme);
});
