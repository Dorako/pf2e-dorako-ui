import { MODULE_NAME, systemSheets } from "./consts.js";
import { lookupThemeAndSchemeForKey } from "./ui-theme.js";
import { i18n, debug, warn } from "./util.js";

Hooks.once("ready", () => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  if (theme === "no-theme") return;
  document.body.classList.remove("theme-light");
  document.body.classList.remove("theme-dark");

  const uiTheme = lookupThemeAndSchemeForKey(theme);
  const { dorakoUiTheme, colorScheme } = uiTheme;
  // document.body.classList.add("theme-" + colorScheme);
  // This doesn't make sense, because there can be interface theme elements that are influenced, which do not use the UI theme
});

Hooks.once("ready", () => {
  if (!game.modules.get("pf2e-dorako-ux")) return;
  if (game.modules.get("pf2e-dorako-ux")?.active) return;
  if (!game.user.isGM) return;
  new Dialog({
    title: "Dorako UX is not active!",
    content: `
      <p>Dorako UI is dependant on the module Dorako UX.</p>
      <p>It's probably already installed, but not enabled.</p>
      <p>Go to Manage Modules and enable it, hit Save Module Settings, and reload.</p>`,
    buttons: {
      OK: {
        label: "OK",
        callback: () => {},
      },
    },
    default: "OK",
  }).render(true);
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
        label: "Disable MLD setting + use Dorako UI opaque app theme",
        callback: () => {
          game.settings.set("monks-little-details", "window-css-changes", false);
          game.settings.set("pf2e-dorako-ui", "theme.app-theme", "opaque");
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

for (const application of ["Application", ...systemSheets]) {
  Hooks.on("render" + application, (app, html, data) => {
    if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
      return;
    }
    let colorSchemeButton = $(
      `<a class="header-button dark-theme-toggle" alt="Toggle color scheme" data-tooltip="Toggle color scheme" data-tooltip-direction="UP"">
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
      html[0].dataset.theme = "foundry2";
    });
    let crbButton = $(
      `<a class="header-button crb-toggle" alt="Toggle CRB" data-tooltip="Toggle CRB" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-c"></i>
    </a>`
    );
    crbButton.click((ev) => {
      html[0].dataset.theme = "crb";
    });
    let bg3Button = $(
      `<a class="header-button bg3-toggle" alt="Toggle BG3" data-tooltip="Toggle BG3" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-b"></i>
    </a>`
    );
    bg3Button.click((ev) => {
      html[0].dataset.theme = "bg3";
    });
    let discordButton = $(
      `<a class="header-button discord-toggle" alt="Toggle Discord" data-tooltip="Toggle Discord" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-d"></i>
    </a>`
    );
    discordButton.click((ev) => {
      html[0].dataset.theme = "discord";
    });
    let dnd5e2Button = $(
      `<a class="header-button dnd5e2-toggle" alt="Toggle D&D 5e" data-tooltip="Toggle D&D 5e" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-dragon"></i>
    </a>`
    );
    dnd5e2Button.click((ev) => {
      html[0].dataset.theme = "dnd5e2";
    });
    let noThemeButton = $(
      `<a class="header-button no-theme-toggle" alt="No theme" data-tooltip="No theme" data-tooltip-direction="UP">
        <i class="fa-fw fas fa-eraser"></i>
    </a>`
    );
    noThemeButton.click((ev) => {
      delete html[0].dataset.theme;
      delete html[0].dataset.colorScheme;
    });
    html.closest(".app").find(".dark-theme-toggle").remove();
    html.closest(".app").find(".crb-toggle").remove();
    html.closest(".app").find(".foundry2-toggle").remove();
    html.closest(".app").find(".bg3-toggle").remove();
    html.closest(".app").find(".discord-toggle").remove();
    html.closest(".app").find(".dnd5e2-toggle").remove();
    html.closest(".app").find(".no-theme-toggle").remove();
    let titleElement = html.closest(".app").find(".window-title");
    colorSchemeButton.insertAfter(titleElement);
    crbButton.insertAfter(titleElement);
    foundry2Button.insertAfter(titleElement);
    bg3Button.insertAfter(titleElement);
    discordButton.insertAfter(titleElement);
    dnd5e2Button.insertAfter(titleElement);
    noThemeButton.insertAfter(titleElement);
  });
}

Hooks.on("renderSettingsConfig", (app, html, data) => {
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      `<p class="name">` +
        i18n("pf2e-dorako-ui.settings.theme.name") +
        `</p> <p class="notes">${i18n("pf2e-dorako-ui.settings.theme.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.theme.app-theme"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      `<p class="name">` +
        i18n("pf2e-dorako-ui.settings.avatar.name") +
        `</p> <p class="notes">${i18n("pf2e-dorako-ui.settings.avatar.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.avatar.source"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(i18n("pf2e-dorako-ui.settings.ux.name") + `<p class="notes">${i18n("pf2e-dorako-ui.settings.ux.hint")}</p>`)
    .insertBefore($('[name="pf2e-dorako-ui.ux.restructure-card-info"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      `<p class="name">` +
        i18n("pf2e-dorako-ui.settings.misc.name") +
        `</p> <p class="notes">${i18n("pf2e-dorako-ui.settings.misc.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.misc.enable-debug-mode"]').parents("div.form-group:first"));
  $("<div>")
    .addClass("form-group dorako settings-header")
    .html(
      `<p class="name">` +
        i18n("pf2e-dorako-ui.settings.customization.name") +
        `</p> <p class="notes">${i18n("pf2e-dorako-ui.settings.customization.hint")}</p>`
    )
    .insertBefore($('[name="pf2e-dorako-ui.customization.excluded-applications"]').parents("div.form-group:first"));

  const isIdleHudEnabled = game.modules.get("pf2e-hud")?.active;

  if (isIdleHudEnabled) {
    $("<div>")
      .addClass("form-group dorako settings-header")
      .html(
        `<p class="name">` +
          i18n("pf2e-dorako-ui.settings.external-module.name") +
          `</p> <p class="notes">${i18n("pf2e-dorako-ui.settings.external-module.hint")}</p>`
      )
      .insertBefore($('[name="pf2e-dorako-ui.external-module.colorize-idle-hud"]').parents("div.form-group:first"));
  } else {
    $("div[data-setting-id*=external-module]").addClass("dorako-display-none");
  }
});

for (const application of ["PF2eHudPersistent", "PF2eHudTooltip", "PF2eHudToken"]) {
  Hooks.on("render" + application, (app, html, data) => {
    const isColorized = game.settings.get("pf2e-dorako-ui", "external-module.colorize-idle-hud");
    if (!isColorized) return;
    html.classList.add("colorized");
  });
}
