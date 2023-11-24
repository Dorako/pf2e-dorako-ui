import { baseThemePf2eSheets, MODULE_NAME } from "./consts.js";
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

for (const application of ["Application", ...baseThemePf2eSheets]) {
  Hooks.on("render" + application, (app, html, data) => {
    if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
      return;
    }
    let colorSchemeButton = $(
      `<a class="header-button dark-theme-toggle" alt="Toggle dark theme" data-tooltip="Dark theme" data-tooltip-direction="UP"">
        <i class="fas fa-fw fa-moon"></i>
     </a>`
    );
    colorSchemeButton.click((ev) => {
      let colorScheme = html[0].dataset.colorScheme;
      if (colorScheme === "light") {
        html[0].dataset.colorScheme = "dark";
      } else {
        html[0].dataset.colorScheme = "light";
      }
    });
    let foundry2Button = $(
      `<a class="header-button foundry2-toggle" alt="Toggle Foundry2" data-tooltip="Toggle Foundry2" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-f"></i>
    </a>`
    );
    foundry2Button.click((ev) => {
      html[0].dataset.dorakoUiTheme = "foundry2";
    });
    let crbButton = $(
      `<a class="header-button crb-toggle" alt="Toggle CRB" data-tooltip="Toggle CRB" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-c"></i>
    </a>`
    );
    crbButton.click((ev) => {
      html[0].dataset.dorakoUiTheme = "crb";
    });
    let bg3Button = $(
      `<a class="header-button bg3-toggle" alt="Toggle BG3" data-tooltip="Toggle BG3" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-b"></i>
    </a>`
    );
    bg3Button.click((ev) => {
      html[0].dataset.dorakoUiTheme = "bg3";
    });
    let noThemeButton = $(
      `<a class="header-button no-theme-toggle" alt="No theme" data-tooltip="No theme" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-eraser"></i>
    </a>`
    );
    noThemeButton.click((ev) => {
      delete html[0].dataset.dorakoUiTheme;
      delete html[0].dataset.colorScheme;
    });
    html.closest(".app").find(".dark-theme-toggle").remove();
    html.closest(".app").find(".crb-toggle").remove();
    html.closest(".app").find(".foundry2-toggle").remove();
    html.closest(".app").find(".bg3-toggle").remove();
    html.closest(".app").find(".no-theme-toggle").remove();
    let titleElement = html.closest(".app").find(".window-title");
    colorSchemeButton.insertAfter(titleElement);
    crbButton.insertAfter(titleElement);
    foundry2Button.insertAfter(titleElement);
    bg3Button.insertAfter(titleElement);
    noThemeButton.insertAfter(titleElement);
  });
}

// Add debug buttons
// for (const application of ["Application", ...baseThemePf2eSheets]) {
//   Hooks.on("render" + application, (app, html, data) => {
//     if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
//       return;
//     }
//     let isDark = html[0].dataset.colorScheme === "dark";
//     let symbol = isDark ? "fa-sun" : "fa-moon";
//     let colorSchemeButton = $(
//       `<a class="header-button dark-theme-toggle" alt="Toggle dark theme" data-tooltip="Dark theme" data-tooltip-direction="UP"">
//         <i class="fas fa-fw ${symbol}"></i>
//      </a>`
//     );
//     colorSchemeButton.click((ev) => {
//       let colorScheme = html[0].dataset.colorScheme;
//       if (colorScheme === "light") {
//         html[0].dataset.colorScheme = "dark";
//       } else {
//         html[0].dataset.colorScheme = "light";
//       }

//       colorSchemeButton.find("i").toggleClass("fa-sun");
//       colorSchemeButton.find("i").toggleClass("fa-moon");
//     });
//     html.closest(".app").find(".dark-theme-toggle").remove();
//     let titleElement = html.closest(".app").find(".window-title");
//     colorSchemeButton.insertAfter(titleElement);
//   });

//   Hooks.on("render" + application, (app, html, data) => {
//     if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
//       return;
//     }
//     let theme = "dorakoUiTheme" in html[0].dataset;
//     let symbol = theme ? "fa-thin" : "fas";

//     let foundry2Button = $(
//       `<a class="header-button foundry2-toggle" alt="Toggle Foundry2" data-tooltip="Toggle Foundry2" data-tooltip-direction="UP">
//         <i class="fa-fw ${symbol} fa-f"></i>
//     </a>`
//     );
//     foundry2Button.click((ev) => {
//       let theme = "dorakoUiTheme" in html[0].dataset;
//       if (theme) {
//         delete html[0].dataset.dorakoUiTheme;
//       } else {
//         html[0].dataset.dorakoUiTheme = "foundry2";
//       }
//       foundry2Button.find("i").toggleClass("fa-thin");
//       foundry2Button.find("i").toggleClass("fas");
//     });
//     html.closest(".app").find(".foundry2-toggle").remove();
//     let titleElement = html.closest(".app").find(".window-title");
//     foundry2Button.insertAfter(titleElement);
//   });

//   Hooks.on("render" + application, (app, html, data) => {
//     if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
//       return;
//     }
//     if (!html[0].classList.contains("window-app")) return;
//     let theme = "dorakoUiTheme" in html[0].dataset;
//     let symbol = theme ? "fa-thin" : "fas";

//     let crbButton = $(
//       `<a class="header-button crb-toggle" alt="Toggle CRB" data-tooltip="Toggle CRB" data-tooltip-direction="UP">
//         <i class="fa-fw ${symbol} fa-c"></i>
//     </a>`
//     );
//     crbButton.click((ev) => {
//       let theme = "dorakoUiTheme" in html[0].dataset;
//       if (theme) {
//         delete html[0].dataset.dorakoUiTheme;
//       } else {
//         html[0].dataset.dorakoUiTheme = "crb";
//       }
//       crbButton.find("i").toggleClass("fa-thin");
//       crbButton.find("i").toggleClass("fas");
//     });
//     html.closest(".app").find(".crb-toggle").remove();
//     let titleElement = html.closest(".app").find(".window-title");
//     crbButton.insertAfter(titleElement);
//   });

//   Hooks.on("render" + application, (app, html, data) => {
//     if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
//       return;
//     }
//     if (!html[0].classList.contains("window-app")) return;
//     let theme = "dorakoUiTheme" in html[0].dataset;
//     let symbol = theme ? "fa-thin" : "fas";

//     let bg3Button = $(
//       `<a class="header-button bg3-toggle" alt="Toggle BG3" data-tooltip="Toggle BG3" data-tooltip-direction="UP">
//         <i class="fa-fw ${symbol} fa-b"></i>
//     </a>`
//     );
//     bg3Button.click((ev) => {
//       let theme = "dorakoUiTheme" in html[0].dataset;
//       if (theme) {
//         delete html[0].dataset.dorakoUiTheme;
//       } else {
//         html[0].dataset.dorakoUiTheme = "bg3";
//       }
//       bg3Button.find("i").toggleClass("fa-thin");
//       bg3Button.find("i").toggleClass("fas");
//     });
//     html.closest(".app").find(".bg3-toggle").remove();
//     let titleElement = html.closest(".app").find(".window-title");
//     bg3Button.insertAfter(titleElement);
//   });
// }

Hooks.on("renderSettingsConfig", (app, html, data) => {
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.theme.name") + `<p class="notes">${i18n("pf2e-dorako-ui.settings.theme.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.theme.application-theme"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.avatar.name") +
        `<p class="notes">${i18n("pf2e-dorako-ui.settings.avatar.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.avatar.source"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(i18n("pf2e-dorako-ui.settings.ux.name") + `<p class="notes">${i18n("pf2e-dorako-ui.settings.ux.hint")}</p>`)
    .insertBefore($('[name="pf2e-dorako-ui.ux.restructure-card-info"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.misc.name") + `<p class="notes">${i18n("pf2e-dorako-ui.settings.misc.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.misc.enable-debug-mode"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      i18n("pf2e-dorako-ui.settings.customization.name") +
        `<p class="notes">${i18n("pf2e-dorako-ui.settings.customization.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.customization.excluded-applications"]').parents("div.form-group:first"));

  const isIdleHudEnabled = game.modules.get("pf2e-token-hud")?.active;

  if (isIdleHudEnabled) {
    $("<div>")
      .addClass("form-group dorako settings-header")
      .html(
        i18n("pf2e-dorako-ui.settings.external-module.name") +
          `<p class="notes">${i18n("pf2e-dorako-ui.settings.external-module.hint")}</p>`
      )
      .insertBefore($('[name="pf2e-dorako-ui.external-module.colorize-idle-hud"]').parents("div.form-group:first"));
  } else {
    $("div[data-setting-id*=external-module]").addClass("dorako-display-none");
  }
});

Hooks.on("renderHUD", (app, html, data) => {
  const isColorized = game.settings.get("pf2e-dorako-ui", "external-module.colorize-idle-hud");
  if (!isColorized) return;
  let html0 = html[0];
  html0.classList.add("colorized");
});
