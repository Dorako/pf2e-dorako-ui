import { MODULE_NAME, premiumModuleSelector } from "./consts.js";

// Should return true for anything premium
export function isPremiumApplication(app, html, data, appName) {
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
    const fvttPremium = new RegExp(/^pf2e-(beginner-box|abomination-vaults|kingmaker|km|mercenary-marketplace-vol1|pfs)/);
    if (fvttPremium.test(key)) {
      console.debug(
        `${MODULE_NAME} | ${appName} contains key matching '^pf2e-(beginner-box|abomination-vaults|kingmaker|km|mercenary-marketplace-vol1|pfs)' => add .premium`
      );
      html[0].classList.add("premium");
      html.closest(".app").find(".journal-entry-content").addClass("premium");
      return true;
    }
  }
  const isKingmaker = "pf2e-kingmaker.KingmakerJournalSheet" === app.document?.flags?.["core"]?.sheetClass;
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

Hooks.on("renderSWPFCompendiumTOC", (app, html, appName) => {
  console.debug(`${MODULE_NAME} | ${appName} starts with 'SWPF' => add .premium`);
  html[0].classList.add("premium");
  // html.closest(".app").find(".journal-entry-content").addClass(".premium");
});
