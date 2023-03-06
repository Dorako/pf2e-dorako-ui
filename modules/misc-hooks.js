import { baseThemePf2eSheets, MODULE_NAME, premiumModuleSelector } from "./consts.js";
import migrate from "./settings/migrations.js";
import { i18n, debug, warn } from "./util.js";

Hooks.once("ready", () => {
  debug("ready");
});

Hooks.once("ready", () => {
  debug("Attempting to migrate...");
  migrate();
});

Hooks.once("ready", () => {
  if (!game.modules.get("monks-little-details")?.active) return;
  if (!game.settings.get("monks-little-details", "window-css-changes")) return;
  if (!game.settings.get("pf2e-dorako-ui", "mld-nag")) return;
  if (!game.user.isGM) return;
  new Dialog({
    title: "Dorako UI - Monk's Little Details conflict",
    content: `
      <p>Monk's Little Details has a default-on setting that influences the look of application windows.</p>
      <p>Dorako UI already affects application windows, so it is recommended to disable the setting.</p>
      <p>If you want to make application windows opaque, Dorako UI has a setting for changing all glassy backgrounds.</p>
      <p>Dorako UI can change your settings for you using the following buttons:</p>`,
    buttons: {
      disable: {
        label: "Disable MLD setting",
        callback: () => {
          game.settings.set("monks-little-details", "window-css-changes", false);
        },
      },
      opaque: {
        label: "Disable MLD setting + use Dorako UI opaque background",
        callback: () => {
          game.settings.set("monks-little-details", "window-css-changes", false);
          game.settings.set("pf2e-dorako-ui", "theme.glass-bg", "rgba(40, 40, 40, 1)");
        },
      },
      "dont-ask": {
        label: "Do nothing, don't ask again",
        callback: () => {
          game.settings.set("pf2e-dorako-ui", "mld-nag", false);
        },
      },
    },
    default: "disable",
  }).render(true);
});

Hooks.once("ready", () => {
  if (!game.modules.get("token-action-hud")?.active) return;
  if (game.settings.get("token-action-hud", "style") === "dorakoUI") return;
  if (!game.settings.get("pf2e-dorako-ui", "tah-nag")) return; // if nag has been disabled
  new Dialog({
    title: "Dorako UI - Token Action HUD style",
    content: `
      <p>Token Action HUD ships with a setting that matches the style of Dorako UI.</p>
      <p>Dorako UI can turn the setting on for you (recommended).</p>`,
    buttons: {
      enable: {
        label: "Enable Dorako UI style",
        callback: () => {
          game.settings.set("token-action-hud", "style", "dorakoUI");
        },
      },
      "dont-ask": {
        label: "Do nothing, don't ask again",
        callback: () => {
          game.settings.set("pf2e-dorako-ui", "tah-nag", false);
        },
      },
    },
    default: "enable",
  }).render(true);
});

Hooks.on("tokenActionHudCoreReady", () => {
  if (game.settings.get("token-action-hud-core", "style") === "dorakoUI") return;
  if (!game.settings.get("pf2e-dorako-ui", "tah-nag")) return; // if nag has been disabled
  new Dialog({
    title: "Dorako UI - Token Action HUD Core style",
    content: `
      <p>Token Action HUD Core ships with a setting that matches the style of Dorako UI.</p>
      <p>Dorako UI can turn the setting on for you (recommended).</p>`,
    buttons: {
      enable: {
        label: "Enable Dorako UI style",
        callback: () => {
          game.settings.set("token-action-hud-core", "style", "dorakoUI");
        },
      },
      "dont-ask": {
        label: "Do nothing, don't ask again",
        callback: () => {
          game.settings.set("pf2e-dorako-ui", "tah-nag", false);
        },
      },
    },
    default: "enable",
  }).render(true);
});

// If misc.skin-crb-journal is on, all non-premium module journals should have .dalvyn-journal
// Hooks.on("renderApplication", (app, html, data) => {
//   let html0 = html[0];
//   if (!(html0.classList.contains("journal-entry") || html0.classList.contains("monks-enhanced-journal"))) return;
//   if (html0.matches(premiumModuleSelector)) {
//     console.debug(
//       `${MODULE_NAME} | render${app.constructor.name} | matches premiumModuleSelector => do not add .dorako-ui`
//     );
//     return;
//   }
//   if (html[0].id.includes("JournalSheetPF2e-Compendium-pf2e-criticaldeck")) return;
//   const isDalvyn = game.settings.get("pf2e-dorako-ui", "misc.skin-crb-journal");
//   if (!isDalvyn) return;
//   console.debug(
//     `${MODULE_NAME} | render${app.constructor.name} | is .journal-entry and skin-crb-journal = true => add .dalvyn-journal`
//   );
//   html0.classList.add("dalvyn-journal");
// });

for (const appName of ["JournalSheet", "JournalPageSheet"]) {
  //"JournalPageSheet"
  Hooks.on("render" + appName, (app, html, data) => {
    const isDalvyn = game.settings.get("pf2e-dorako-ui", "misc.skin-crb-journal");
    if (!isDalvyn) return;
    if (html[0].id.includes("JournalSheetPF2e-Compendium-pf2e-criticaldeck")) return;
    html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dalvyn-journal");

    // html[0].classList.add("dorako-ui");
    // html[0].classList.add("dalvyn-journal");
    // has to be added here because premium journals also style the sidebar, not just the journal body
  });
}

Hooks.on("renderJournalTextPageSheet", (app, html, data) => {
  const isDalvyn = game.settings.get("pf2e-dorako-ui", "misc.skin-crb-journal");
  if (!isDalvyn) return;
  if (html[0].id.includes("JournalSheetPF2e-Compendium-pf2e-criticaldeck")) return;
  html[0].classList.add("dorako-ui");
  html[0].classList.add("dalvyn-journal");
});

// // Add .dorako-ui.dark-theme to the page if it is not a page included in a premium module-styled journal
// Hooks.on("renderJournalTextPageSheet", (app, html, data) => {
//   let journalFrame = app?.object?.parent?.sheet;
//   if (!journalFrame) return;
//   let frameHtml = journalFrame?.element;
//   if (!frameHtml || frameHtml.length == 0) return;
//   if (frameHtml[0].matches(premiumModuleSelector)) return;
//   const isDalvyn = game.settings.get("pf2e-dorako-ui", "misc.skin-crb-journal");
//   if (!isDalvyn) return;
//   console.debug(`${MODULE_NAME} | render${app.constructor.name} | skin-crb-journal = true => add .dalvyn-journal`);
//   html[0].classList.add("dalvyn-journal");
//   frameHtml.closest(".app").find(".journal-entry-content").addClass("dorako-ui");
//   const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
//   if (!isDarkJournals) return;
//   frameHtml.closest(".app").find(".journal-entry-content").addClass("dark-theme");
// });

Hooks.on("getItemSheetPF2eHeaderButtons", (sheet, buttons) => {
  if (!game.settings.get(`${MODULE_NAME}`, "misc.send-to-chat")) {
    return;
  }

  buttons.unshift({
    label: i18n(`${MODULE_NAME}.text.send-to-chat`),
    class: "send",
    icon: "fas fa-comment-alt",
    onclick: async () => {
      if (sheet.document.actor) {
        await sheet.document.toChat(); // Can post directly
      } else {
        const json = sheet.document.toJSON();
        const actor =
          canvas.tokens.controlled[0]?.actor ?? // Selected token's corresponding actor
          game.user?.character ?? // Assigned actor
          new Actor({ name: game.user.name, type: "character" }); // Dummy actor fallback

        await new sheet.document.constructor(json, { parent: actor }).toChat();
      }
    },
  });
});

Hooks.on("renderCombatTracker", addScalingToCombatTrackerAvatars);

function addScalingToCombatTrackerAvatars(app, html, data) {
  const combatImagesActive = game.modules.get("combat-tracker-images")?.active;
  $(".combatant", html).each(function () {
    let id = this.dataset.combatantId;
    let combatant = game.combat.combatants.get(id);
    let scale = combatant.token.texture.scaleX;
    let tokenImageElem = this.getElementsByClassName("token-image")[0];
    if (scale < 1 || (combatImagesActive && combatant.actor.getFlag("combat-tracker-images", "trackerImage"))) {
      scale = 1;
    }
    tokenImageElem.setAttribute("style", "transform: scale(" + Math.abs(scale) + ")");
  });
}

// Add debug buttons
for (const application of ["Application", ...baseThemePf2eSheets]) {
  Hooks.on("render" + application, (app, html, data) => {
    if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
      return;
    }
    let isDark = html[0].classList.contains("dark-theme");
    let symbol = isDark ? "fa-sun" : "fa-moon";
    let openBtn = $(
      `<a class="header-button dark-theme-toggle" alt="Toggle dark theme" data-tooltip="Dark theme" data-tooltip-direction="UP"">
        <i class="fas fa-fw ${symbol}"></i>
     </a>`
    );
    openBtn.click((ev) => {
      html[0].classList.toggle("dark-theme");
      openBtn.find("i").toggleClass("fa-sun");
      openBtn.find("i").toggleClass("fa-moon");
    });
    html.closest(".app").find(".dark-theme-toggle").remove();
    let titleElement = html.closest(".app").find(".window-title");
    openBtn.insertAfter(titleElement);
  });

  Hooks.on("render" + application, (app, html, data) => {
    if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
      return;
    }
    let isDorako = html[0].classList.contains("dorako-ui");
    let symbol = isDorako ? "fa-thin" : "fas";

    let openBtn = $(
      `<a class="header-button dorako-ui-toggle" alt="Toggle Dorako UI" data-tooltip="Dorako UI" data-tooltip-direction="UP">
        <i class="fa-fw ${symbol} fa-d"></i>
    </a>`
    );
    openBtn.click((ev) => {
      html[0].classList.toggle("dorako-ui");
      openBtn.find("i").toggleClass("fa-thin");
      openBtn.find("i").toggleClass("fas");
    });
    html.closest(".app").find(".dorako-ui-toggle").remove();
    let titleElement = html.closest(".app").find(".window-title");
    openBtn.insertAfter(titleElement);
  });
}

Hooks.once("ready", (app, html, data) => {
  if (!game.settings.get(`${MODULE_NAME}`, "ux.start-sidebar-collapsed")) return;
  ui.sidebar.collapse();
});

Hooks.once("ready", (app, html, data) => {
  if (!game.settings.get(`${MODULE_NAME}`, "ux.start-navigation-collapsed")) return;
  ui.nav.collapse();
});

Hooks.on("renderSettingsConfig", (app, html, data) => {
  $("<div>")
    .addClass("form-group dorako-ui settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.theme.name") + `<p class="notes">${i18n("pf2e-dorako-ui.settings.theme.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.theme.application-theme"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako-ui settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.avatar.name") +
        `<p class="notes">${i18n("pf2e-dorako-ui.settings.avatar.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.avatar.source"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako-ui settings-header")
    .html(i18n("pf2e-dorako-ui.settings.ux.name") + `<p class="notes">${i18n("pf2e-dorako-ui.settings.ux.hint")}</p>`)
    .insertBefore($('[name="pf2e-dorako-ui.ux.chat-input-height"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako-ui settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.misc.name") + `<p class="notes">${i18n("pf2e-dorako-ui.settings.misc.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.misc.enable-debug-mode"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako-ui settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.customization.name") +
        `<p class="notes">${i18n("pf2e-dorako-ui.settings.customization.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.customization.excluded-applications"]').parents("div.form-group:first"));
});
