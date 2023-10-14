import { MODULE_NAME, premiumModuleSelector } from "./consts.js";

// Should return true for anything premium
function isPremiumApplication(app, html, data, appName) {
  if (app.constructor.name.startsWith("SWPF")) {
    console.debug(`${MODULE_NAME} | ${appName} starts with 'SWPF' => add .premium`);
    html[0].classList.add("premium");
    html.closest(".app").find(".journal-entry-content").addClass(".premium");
    return true;
  }
  for (var key in app.document?.flags) {
    //prettier-ignore
    const sigilPremium = new RegExp(/^pf2e-ap\d{3}-/);
    if (sigilPremium.test(key)) {
      console.debug(`${MODULE_NAME} | ${appName} contains key matching '^pf2e-ap{3}-' => add .premium`);
      html[0].classList.add("premium");
      html.closest(".app").find(".journal-entry-content").addClass("premium");

      return true;
    }
  }
  for (var key in app.document?.flags) {
    //prettier-ignore
    const fvttPremium = new RegExp(/^pf2e-(beginner-box|abomination-vaults|kingmaker|km|mercenary-marketplace-vol1)/);
    if (fvttPremium.test(key)) {
      console.debug(
        `${MODULE_NAME} | ${appName} contains key matching '^pf2e-(beginner-box|abomination-vaults|kingmaker)' => add .premium`
      );
      html[0].classList.add("premium");
      html.closest(".app").find(".journal-entry-content").addClass("premium");
      return true;
    }
  }
  const isKingmaker = "pf2e-kingmaker.KingmakerJournalSheet" === app.document?.flags["core"]?.sheetClass;
  if (isKingmaker) {
    console.debug(`${MODULE_NAME} | ${appName} contains core flags for kingmaker => add .premium`);
    html[0].classList.add("premium");
    html.closest(".app").find(".journal-entry-content").addClass("premium");
    return true;
  }
  if (html[0].matches(premiumModuleSelector)) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | matches premiumModuleSelector => do not add .dorako-ui`
    );
    html[0].classList.add("premium");
    return true;
  }
  return false;
}

("pf2e-kingmaker.KingmakerJournalSheet");

Hooks.on("renderKingmakerJournalSheet", (app, html, data) => {
  console.debug(`${MODULE_NAME} | renderKingmakerJournalSheet' => add .premium`);
  html[0].classList.add("premium");
  html.closest(".app").find(".journal-entry-content").addClass(".premium");
});

Hooks.on("renderJournalSheet", (app, html, data) => {
  isPremiumApplication(app, html, data, "JournalSheet");
});

Hooks.on("renderJournalPageSheet", (app, html, data) => {
  isPremiumApplication(app, html, data, "JournalPageSheet");
});

Hooks.on("renderJournalTextPageSheet", (app, html, data) => {
  isPremiumApplication(app, html, data, "JournalTextPageSheet");
});

// adds .dorako-ui to all .window-app Applications that are not .premium
Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (!html0.classList.contains("window-app")) return;
  // TODO: This also triggers for SceneConfigPF2e
  if (isPremiumApplication(app, html, data, app.constructor.name)) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme" || theme == "foundry2-theme") {
    return;
  }
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | is .window-app => add .dorako-ui`);
  html0.classList.add("dorako-ui");
});

// adds .dorako-ui to AV and BB journals specifically, since those have no special frames
Hooks.on("renderApplication", (app, html, data) => {
  const journal = app.document;
  if (!journal) return;
  const flags = journal?.flags;
  // TODO: This also triggers for SceneConfigPF2e
  if (flags.hasOwnProperty("pf2e-abomination-vaults") || flags.hasOwnProperty("pf2e-beginner-box")) {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | AV or BB => add .dorako-ui despite .premium`);
    html[0].classList.add("dorako-ui");
  }
});

Hooks.on("renderSWPFCompendiumTOC", (app, html, appName) => {
  console.debug(`${MODULE_NAME} | ${appName} starts with 'SWPF' => add .premium`);
  html[0].classList.add("premium");
  // html.closest(".app").find(".journal-entry-content").addClass(".premium");
});
