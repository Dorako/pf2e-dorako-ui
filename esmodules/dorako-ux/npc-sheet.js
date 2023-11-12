Hooks.on("renderNPCSheetPF2e", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => do not add .dorako-ux`);
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
  const collapseImmunities = immunities.length === 0 && (immunities.custom === undefined || immunities.custom === "");
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

Hooks.on("renderCreatureSheetPF2e", (app, html, data) => {
  html.addClass("dorako-ux");
});
