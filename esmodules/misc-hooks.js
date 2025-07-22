import { MODULE_NAME, systemSheets } from "./consts.js";
import { lookupThemeAndSchemeForKey } from "./ui-theme.js";
import { i18n, debug, warn } from "./util.js";

Hooks.once("ready", () => {
  ChatLog.NOTIFY_DURATION = game.settings.get("pf2e-dorako-ui", "customization.chatlog-notify-seconds") * 1000;
  const applicationTheme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  const interfaceTheme = game.settings.get("pf2e-dorako-ui", "theme.interface-theme");
  const coreColorScheme = game.settings.get("core", "uiConfig")?.colorScheme;
  // if (sheetTheme === "no-theme" || interfaceTheme === "no-theme") return;
  // some themes only support generalized dark theme
  if (interfaceTheme != "no-theme") {
    $("body").attr("data-interface-theme", interfaceTheme);
    $("body").attr("data-interface-color-scheme", coreColorScheme.interface);
    // removing these might be overkill
    // document.getElementById("interface").classList.remove("themed");
    // document.getElementById("interface").classList.remove("theme-light");
    // document.getElementById("interface").classList.remove("theme-dark");
  }
  if (applicationTheme != "no-theme") {
    $("body").attr("data-application-theme", applicationTheme);
  }

  if (
    (applicationTheme === "bg3" || applicationTheme === "discord") &&
    game.settings.get("core", "uiConfig").colorScheme.applications != "dark"
  ) {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
  }
  // The chatlog itself can't have a core foundry theme, since different messages can have different Dorako UI themes
  var chatLog = document.querySelector("#sidebar .chat-log");
  chatLog.classList.remove("themed");
  chatLog.classList.remove("theme-light");
  chatLog.classList.remove("theme-dark");
  // also needs to be done for popped out chat log on render
});

// remove core theme from supported v1 applications
for (const appName of [...systemSheets]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const applicationTheme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (applicationTheme == "no-theme") {
      return;
    }
    html[0].classList.remove("themed");
    html[0].classList.remove("theme-light");
    html[0].classList.remove("theme-dark");
  });
}

Hooks.once("ready", () => {
  if (game.user.isGM && game.modules.get("pf2e-dorako-ux")?.active) {
    new Dialog({
      title: "Dorako UX is active!",
      content: `
        <p>Dorako UX is not supported for FVTT v13+.</p>
        <p>Go ahead and uninstall it.</p>
        <p>For radial effects HUD, use PF2e Effects Halo.</p>`,
      buttons: {
        OK: {
          label: "OK",
          callback: () => {},
        },
      },
      default: "OK",
    }).render(true);
  }
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
          game.settings.set("pf2e-dorako-ui", "theme.interface-theme", "opaque");
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

// for (const application of ["Application", ...systemSheets]) {
//   Hooks.on("render" + application, (app, html, data) => {
//     if (!game.settings.get(`${MODULE_NAME}`, "misc.enable-debug-mode")) {
//       return;
//     }
//     let colorSchemeButton = $(
//       `<a class="header-button dark-theme-toggle" alt="Toggle color scheme" data-tooltip="Toggle color scheme" data-tooltip-direction="UP"">
//         <i class="fas fa-fw fa-moon"></i>
//      </a>`
//     );
//     colorSchemeButton.click((ev) => {
//       let colorScheme = html[0].dataset.colorScheme;
//       if (colorScheme === "light") {
//         html[0].dataset.colorScheme = "dark";
//       } else {
//         html[0].dataset.colorScheme = "light";
//       }
//     });
//     let foundry2Button = $(
//       `<a class="header-button foundry2-toggle" alt="Toggle Foundry2" data-tooltip="Toggle Foundry2" data-tooltip-direction="UP">
//         <i class="fa-fw fas fa-f"></i>
//     </a>`
//     );
//     foundry2Button.click((ev) => {
//       html[0].dataset.theme = "foundry2";
//     });
//     let crbButton = $(
//       `<a class="header-button crb-toggle" alt="Toggle CRB" data-tooltip="Toggle CRB" data-tooltip-direction="UP">
//         <i class="fa-fw fas fa-c"></i>
//     </a>`
//     );
//     crbButton.click((ev) => {
//       html[0].dataset.theme = "crb";
//     });
//     let bg3Button = $(
//       `<a class="header-button bg3-toggle" alt="Toggle BG3" data-tooltip="Toggle BG3" data-tooltip-direction="UP">
//         <i class="fa-fw fas fa-b"></i>
//     </a>`
//     );
//     bg3Button.click((ev) => {
//       html[0].dataset.theme = "bg3";
//     });
//     let discordButton = $(
//       `<a class="header-button discord-toggle" alt="Toggle Discord" data-tooltip="Toggle Discord" data-tooltip-direction="UP">
//         <i class="fa-fw fas fa-d"></i>
//     </a>`
//     );
//     discordButton.click((ev) => {
//       html[0].dataset.theme = "discord";
//     });
//     let dnd5e2Button = $(
//       `<a class="header-button dnd5e2-toggle" alt="Toggle D&D 5e" data-tooltip="Toggle D&D 5e" data-tooltip-direction="UP">
//         <i class="fa-fw fas fa-dragon"></i>
//     </a>`
//     );
//     dnd5e2Button.click((ev) => {
//       html[0].dataset.theme = "dnd5e2";
//     });
//     let noThemeButton = $(
//       `<a class="header-button no-theme-toggle" alt="No theme" data-tooltip="No theme" data-tooltip-direction="UP">
//         <i class="fa-fw fas fa-eraser"></i>
//     </a>`
//     );
//     noThemeButton.click((ev) => {
//       delete html[0].dataset.theme;
//       delete html[0].dataset.colorScheme;
//     });
//     html.closest(".app").find(".dark-theme-toggle").remove();
//     html.closest(".app").find(".crb-toggle").remove();
//     html.closest(".app").find(".foundry2-toggle").remove();
//     html.closest(".app").find(".bg3-toggle").remove();
//     html.closest(".app").find(".discord-toggle").remove();
//     html.closest(".app").find(".dnd5e2-toggle").remove();
//     html.closest(".app").find(".no-theme-toggle").remove();
//     let titleElement = html.closest(".app").find(".window-title");
//     colorSchemeButton.insertAfter(titleElement);
//     crbButton.insertAfter(titleElement);
//     foundry2Button.insertAfter(titleElement);
//     bg3Button.insertAfter(titleElement);
//     discordButton.insertAfter(titleElement);
//     dnd5e2Button.insertAfter(titleElement);
//     noThemeButton.insertAfter(titleElement);
//   });
// }

Hooks.on("renderSettingsConfig", (app, html, data) => {
  // $("<h3>")
  //   .addClass("") //border
  //   .html("PF2e Dorako UI")
  //   .insertBefore($('[name="pf2e-dorako-ui.theme.interface-theme"]').parents("div.form-group:first"));
  // define breakpoints for groups
  // wrap groups in fieldset
  // add legend to fieldset with group name
  // add hint(?) to fieldset with description
  // var prefix = "<fieldset>";
  // prefix += `<legend>${i18n("pf2e-dorako-ui.settings.avatar.name")}</legend>`;
  // prefix += `<p class="hint">${i18n("pf2e-dorako-ui.settings.avatar.hint")}`;
  // $('[name="pf2e-dorako-ui.theme.interface-theme"]').parents("div.form-group:last").prepend(prefix);
  // $('[name="pf2e-dorako-ui.avatar.source"]').parents("div.form-group:last").append("</fieldset>");

  // document
  //   .querySelector(`.main [data-tab="pf2e-dorako-ui"]`)
  //   .insertAdjacentHTML("afterbegin", `<h3 class="">Dorako UI</h2>`);

  $(".main .form-group").wrap("<fieldset></fieldset>");
  document
    .querySelector(`[for="settings-config-pf2e-dorako-ui.theme.interface-theme"]`)
    .parentElement.parentElement.insertAdjacentHTML(
      "beforebegin",
      `<fieldset><legend>` +
        i18n("pf2e-dorako-ui.settings.theme.name") +
        `</legend>` +
        `<p class="hint">` +
        i18n("pf2e-dorako-ui.settings.theme.hint") +
        `</p>` +
        `</fieldset>`
    );
  document
    .querySelector(`[for="settings-config-pf2e-dorako-ui.avatar.source"]`)
    .parentElement.parentElement.insertAdjacentHTML(
      "beforebegin",
      `<hr/><fieldset><legend>` +
        i18n("pf2e-dorako-ui.settings.avatar.name") +
        `</legend>` +
        `<p class="hint">` +
        i18n("pf2e-dorako-ui.settings.avatar.hint") +
        `</p>` +
        `</fieldset>`
    );
  document
    .querySelector(`[for="settings-config-pf2e-dorako-ui.customization.excluded-applications"]`)
    .parentElement.parentElement.insertAdjacentHTML(
      "beforebegin",
      `<hr></hr><fieldset><legend>` +
        i18n("pf2e-dorako-ui.settings.customization.name") +
        `</legend>` +
        `<p class="hint">` +
        i18n("pf2e-dorako-ui.settings.customization.hint") +
        `</p>` +
        `</fieldset>`
    );
  // document
  //   .querySelector(`[for="settings-config-pf2e-dorako-ui.misc.enable-debug-mode"]`)
  //   .parentElement.parentElement.insertAdjacentHTML(
  //     "beforebegin",
  //     `<hr></hr><fieldset><legend>` +
  //       i18n("pf2e-dorako-ui.settings.misc.name") +
  //       `</legend>` +
  //       `<p class="hint">` +
  //       i18n("pf2e-dorako-ui.settings.misc.hint") +
  //       `</p>` +
  //       `</fieldset>`
  //   );
  document
    .querySelector(`[for="settings-config-pf2e-dorako-ui.external-module.colorize-idle-hud"]`)
    .parentElement.parentElement.insertAdjacentHTML(
      "beforebegin",
      `<hr></hr><fieldset><legend>` +
        i18n("pf2e-dorako-ui.settings.external-module.name") +
        `</legend>` +
        `<p class="hint">` +
        i18n("pf2e-dorako-ui.settings.external-module.hint") +
        `</p>` +
        `</fieldset>`
    );
});

// Hooks.on("renderSettingsConfig", (app, html, data) => {
//   $("<h3>")
//     .addClass("") //border
//     .html("PF2e Dorako UI")
//     .insertBefore($('[name="pf2e-dorako-ui.theme.interface-theme"]').parents("div.form-group:first"));

//   $("<div>")
//     .addClass("form-group dorako settings-header")
//     .html(
//       `<label class="name">` +
//         i18n("pf2e-dorako-ui.settings.theme.name") +
//         `</label> <p class="hint">${i18n("pf2e-dorako-ui.settings.theme.hint")}</p>`
//     )
//     .insertBefore($('[name="pf2e-dorako-ui.theme.interface-theme"]').parents("div.form-group:first"));
//   $("<div>")
//     .addClass("form-group dorako settings-header")
//     .html(
//       `<label class="name">` +
//         i18n("pf2e-dorako-ui.settings.avatar.name") +
//         `</label> <p class="hint">${i18n("pf2e-dorako-ui.settings.avatar.hint")}</p>`
//     )
//     .insertBefore($('[name="pf2e-dorako-ui.avatar.source"]').parents("div.form-group:first"));
//   $("<div>")
//     .addClass("form-group dorako settings-header")
//     .html(
//       `<label class="name">` +
//         i18n("pf2e-dorako-ui.settings.ux.name") +
//         `</label> <p class="hint">${i18n("pf2e-dorako-ui.settings.ux.hint")}</p>`
//     )
//     .insertBefore($('[name="pf2e-dorako-ui.ux.restructure-card-info"]').parents("div.form-group:first"));
//   $("<div>")
//     .addClass("form-group dorako settings-header")
//     .html(
//       `<label class="name">` +
//         i18n("pf2e-dorako-ui.settings.misc.name") +
//         `</label> <p class="hint">${i18n("pf2e-dorako-ui.settings.misc.hint")}</p>`
//     )
//     .insertBefore($('[name="pf2e-dorako-ui.misc.enable-debug-mode"]').parents("div.form-group:first"));
//   $("<div>")
//     .addClass("form-group dorako settings-header")
//     .html(
//       `<label class="name">` +
//         i18n("pf2e-dorako-ui.settings.customization.name") +
//         `</label> <p class="hint">${i18n("pf2e-dorako-ui.settings.customization.hint")}</p>`
//     )
//     .insertBefore($('[name="pf2e-dorako-ui.customization.excluded-applications"]').parents("div.form-group:first"));

//   const isIdleHudEnabled = game.modules.get("pf2e-hud")?.active;

//   if (isIdleHudEnabled) {
//     $("<div>")
//       .addClass("form-group dorako settings-header")
//       .html(
//         `<p class="name">` +
//           i18n("pf2e-dorako-ui.settings.external-module.name") +
//           `</p> <p class="notes">${i18n("pf2e-dorako-ui.settings.external-module.hint")}</p>`
//       )
//       .insertBefore($('[name="pf2e-dorako-ui.external-module.colorize-idle-hud"]').parents("div.form-group:first"));
//   } else {
//     $("div[data-setting-id*=external-module]").addClass("dorako-display-none");
//   }
// });

Hooks.once("ready", () => {
  const isColorized = game.settings.get("pf2e-dorako-ui", "external-module.colorize-idle-hud");
  if (!isColorized) return;
  document.body.classList.add("pf2e-hud-colorized");
});

Hooks.on("renderNPCSheetPF2e", (app, html, data) => {
  if (html[0].tagName === "FORM") return;
  // const setting = game.settings.get("pf2e-dorako-ux", "moving.restructure-npc-sheets");
  // if (!setting) return;
  html[0].classList.add("dorako-ux");
  const acDetails = app.object.attributes.ac.details;
  const collapseAc = acDetails === "";
  const hpDetails = app.object.attributes.hp.details;
  const hpTemp = app.object.attributes.hp.temp;
  const collapseHp = hpDetails === "" && hpTemp === 0;

  if (collapseAc) {
    let section = html.find(".armor-class")[0];
    section.classList.add("collapsed");
  }

  if (collapseHp) {
    let section = html.find(".health")[0];
    section.classList.add("collapsed");
  }
});

Hooks.on("renderFamiliarSheetPF2e", (app, html, data) => {
  if (html[0].tagName === "FORM") return;
  // const setting = game.settings.get("pf2e-dorako-ux", "moving.restructure-npc-sheets");
  // if (!setting) return;
  html[0].classList.add("dorako-ux");
  let buttons = html.find(`a[data-action="roll-check"]`);
  for (var i = 0, all = buttons.length; i < all; i++) {
    buttons[i].classList.add("button");
  }
});
