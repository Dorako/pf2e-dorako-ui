import * as util from '../util.js'
import {
  ThemeSettings
} from "./theme-settings.js";
import {
  UXSettings
} from "./ux-settings.js";
import {
  AvatarSettings
} from "./avatar-settings.js";
import {
  MiscSettings
} from "./misc-settings.js";

function injectCSS(filename) {
  const head = document.getElementsByTagName("head")[0];
  const mainCss = document.createElement("link");
  mainCss.setAttribute("rel", "stylesheet");
  mainCss.setAttribute("type", "text/css");
  mainCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/" + filename + ".css");
  mainCss.setAttribute("media", "all");
  head.insertBefore(mainCss, head.lastChild);
}

Hooks.once("init", async () => {

  game.settings.registerMenu("pf2e-dorako-ui", "theme", {
    name: "pf2e-dorako-ui.settings.theme.name",
    label: "pf2e-dorako-ui.settings.theme.label",
    hint: "pf2e-dorako-ui.settings.theme.hint",
    icon: "fas fa-adjust",
    type: ThemeSettings,
    restricted: false
  });
  ThemeSettings.registerSettings();

  game.settings.registerMenu("pf2e-dorako-ui", "avatar", {
    name: "pf2e-dorako-ui.settings.avatar.name",
    label: "pf2e-dorako-ui.settings.avatar.label",
    hint: "pf2e-dorako-ui.settings.avatar.hint",
    icon: "fas fa-circle-user",
    type: AvatarSettings,
    restricted: false
  });
  AvatarSettings.registerSettings();

  game.settings.registerMenu("pf2e-dorako-ui", "ux", {
    name: "pf2e-dorako-ui.settings.ux.name",
    label: "pf2e-dorako-ui.settings.ux.label",
    hint: "pf2e-dorako-ui.settings.ux.hint",
    icon: "fas fa-sliders",
    type: UXSettings,
    restricted: false
  });
  UXSettings.registerSettings();

  game.settings.registerMenu("pf2e-dorako-ui", "misc", {
    name: "pf2e-dorako-ui.settings.misc.name",
    label: "pf2e-dorako-ui.settings.misc.label",
    hint: "pf2e-dorako-ui.settings.misc.hint",
    icon: "fas fa-question-circle",
    type: MiscSettings,
    restricted: false
  });
  MiscSettings.registerSettings();


  injectCSS("dorako-ui");
  injectCSS("reset");
  injectCSS("main");
  injectCSS("dark-theme");
  injectCSS("dark-theme-messages");
  injectCSS("module-support");
  injectCSS("messages");
  injectCSS("npc-sheet");
  injectCSS("loot-sheet");
  injectCSS("chat-bubbles");

  const root = document.querySelector(":root").style;
  if (game.settings.get("pf2e-dorako-ui", "ux.center-hotbar")) {
    document.getElementById("ui-bottom").classList.add("centered");
  }

  root.setProperty("--avatar-size", game.settings.get("pf2e-dorako-ui", "avatar.size").toString() + "px");
  root.setProperty("--chat-input-height", game.settings.get("pf2e-dorako-ui", "ux.chat-input-height").toString() + "px");

  if (game.settings.get("pf2e-dorako-ui", "misc.skin-crb-journal")) {
    injectCSS("crb-journal");
    injectCSS("fonts");
  }

  if (game.settings.get("pf2e-dorako-ui", "misc.skin-combat-carousel")) injectCSS("combat-carousel");
  if (game.settings.get("pf2e-dorako-ui", "ux.compact-ui")) injectCSS("compact-ui");
  if (game.settings.get("pf2e-dorako-ui", "ux.no-logo")) injectCSS("no-logo");
  if (game.settings.get("pf2e-dorako-ui", "ux.no-chat-control-icon")) injectCSS("no-chat-control-icon");
  const pcSheetSetting = game.settings.get("pf2e-dorako-ui", "theme.pc-sheet-theme");
  if (pcSheetSetting == "dark-theme") injectCSS("pc-sheet-dark");
  const familiarSheetSetting = game.settings.get("pf2e-dorako-ui", "theme.familiar-sheet-theme");
  if (familiarSheetSetting == "dark" || familiarSheetSetting == "darkRedHeader") injectCSS("familiar-sheet-dark");
  if (familiarSheetSetting == "darkRedHeader") injectCSS("familiar-sheet-dark-red-header");
});

Hooks.once("ready", () => {
  const frostedGlass = game.settings.get("pf2e-dorako-ui", "theme.frosted-glass");
  if (!frostedGlass) return;
  $('body').addClass('frosted-glass');
  const root = document.querySelector(":root").style;
  root.setProperty("--frosted-glass", frostedGlass);
});

Hooks.once("ready", () => {
  const glassBg = game.settings.get("pf2e-dorako-ui", "theme.glass-bg");
  if (!glassBg) return;
  const root = document.querySelector(":root").style;
  root.setProperty("--glass-bg", glassBg, "important");
});

Hooks.once("renderSidebar", () => {
  const noCards = game.settings.get("pf2e-dorako-ui", "ux.no-cards");
  if (!noCards) return;
  $(".item[data-tab=cards]").addClass("dorako-display-none");
});


// /**
//  * For more information about FormApplications, see:
//  * https://hackmd.io/UsmsgTj6Qb6eDw3GTi5XCg
//  */
// class SettingsMenu extends FormApplication {
//   // lots of other things...

//   static get defaultOptions() {
//     return mergeObject(super.defaultOptions, {
//         id: 'X-settings',
//         title: "X Settings",
//         classes: ['sheet'],
//         template: 'modules/pf2e-dorako-ui/templates/menu.hbs',
//         width: 800,
//     });
// }

//   getData() {
//     return game.settings.get('pf2e-dorako-ui', 'allSettings');
//   }

//   _updateObject(event, formData) {
//     const data = expandObject(formData);
//     game.settings.set('pf2e-dorako-ui', 'allSettings', data);
//   }

// }