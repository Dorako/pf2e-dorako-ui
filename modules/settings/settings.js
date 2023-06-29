import * as util from "../util.js";
import { ThemeSettings } from "./theme-settings.js";
import { UXSettings } from "./ux-settings.js";
import { AvatarSettings } from "./avatar-settings.js";
import { MiscSettings } from "./misc-settings.js";
import { CustomizationSettings } from "./customization-settings.js";

function injectCSS(filename) {
  const head = document.getElementsByTagName("head")[0];
  const mainCss = document.createElement("link");
  mainCss.setAttribute("rel", "stylesheet");
  mainCss.setAttribute("type", "text/css");
  mainCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/" + filename + ".css");
  mainCss.setAttribute("media", "all");
  head.insertBefore(mainCss, head.lastChild);
}

export function refreshChat() {
  if (game.messages.size > 100) {
    return ui.notifications.warn(game.i18n.localize("pf2e-dorako-ui.text.large-chatlog-warning"));
  }
  const messages = game.messages.filter((m) => m instanceof ChatMessage);
  for (const message of messages) {
    ui.chat.updateMessage(message);
  }
}

Hooks.once("init", async () => {
  util.debug("init");

  game.settings.register("pf2e-dorako-ui", "mld-nag", {
    scope: "world",
    config: false,
    default: true,
    type: Boolean,
  });

  game.settings.register("pf2e-dorako-ui", "tah-nag", {
    scope: "client",
    config: false,
    default: true,
    type: Boolean,
  });

  game.settings.register("pf2e-dorako-ui", "migration-version", {
    scope: "world",
    config: false,
    default: "0.0.0",
    type: String,
  });

  // game.settings.registerMenu("pf2e-dorako-ui", "theme", {
  //   name: "pf2e-dorako-ui.settings.theme.name",
  //   label: "pf2e-dorako-ui.settings.theme.label",
  //   hint: "pf2e-dorako-ui.settings.theme.hint",
  //   icon: "fas fa-adjust",
  //   type: ThemeSettings,
  //   restricted: false,
  // });
  ThemeSettings.registerSettings();

  // game.settings.registerMenu("pf2e-dorako-ui", "avatar", {
  //   name: "pf2e-dorako-ui.settings.avatar.name",
  //   label: "pf2e-dorako-ui.settings.avatar.label",
  //   hint: "pf2e-dorako-ui.settings.avatar.hint",
  //   icon: "fas fa-circle-user",
  //   type: AvatarSettings,
  //   restricted: false,
  // });
  AvatarSettings.registerSettings();

  // game.settings.registerMenu("pf2e-dorako-ui", "ux", {
  //   name: "pf2e-dorako-ui.settings.ux.name",
  //   label: "pf2e-dorako-ui.settings.ux.label",
  //   hint: "pf2e-dorako-ui.settings.ux.hint",
  //   icon: "fas fa-sliders",
  //   type: UXSettings,
  //   restricted: false,
  // });
  UXSettings.registerSettings();

  // game.settings.registerMenu("pf2e-dorako-ui", "misc", {
  //   name: "pf2e-dorako-ui.settings.misc.name",
  //   label: "pf2e-dorako-ui.settings.misc.label",
  //   hint: "pf2e-dorako-ui.settings.misc.hint",
  //   icon: "fas fa-question-circle",
  //   type: MiscSettings,
  //   restricted: false,
  // });
  MiscSettings.registerSettings();

  CustomizationSettings.registerSettings();

  util.debug("registered settings");

  injectCSS("dorako-ui");
  injectCSS("module-support");
  injectCSS("fonts");

  const root = document.querySelector(":root").style;

  root.setProperty("--avatar-size", game.settings.get("pf2e-dorako-ui", "avatar.size").toString() + "px");
  root.setProperty(
    "--chat-input-height",
    game.settings.get("pf2e-dorako-ui", "ux.chat-input-height").toString() + "px"
  );

  util.debug("injected sheets");
});

Hooks.once("ready", () => {
  let dorakoCustomCss = document.createElement("style");
  dorakoCustomCss.id = "dorako-custom-css";
  dorakoCustomCss.innerHTML = game.settings.get("pf2e-dorako-ui", "customization.custom-css");
  document.querySelector("head").appendChild(dorakoCustomCss);
});

Hooks.once("ready", () => {
  if (!game.settings.get("pf2e-dorako-ui", "ux.center-hotbar")) return;
  document.getElementById("ui-bottom").classList.add("centered");
});

Hooks.once("ready", () => {
  const frostedGlass = game.settings.get("pf2e-dorako-ui", "theme.frosted-glass");
  if (!frostedGlass) return;
  $("body").addClass("frosted-glass");
  const root = document.querySelector(":root").style;
  root.setProperty("--frosted-glass", frostedGlass);
});

Hooks.once("ready", () => {
  const compactUi = game.settings.get("pf2e-dorako-ui", "ux.compact-ui");
  if (!compactUi) return;
  var body = document.body;
  body.classList.add("compact-ui");
  body.addEventListener("mousemove", toggleActive);

  function toggleActive(e) {
    const offsetLeft = $("body").find("#ui-left")[0] ? $("body").find("#ui-left")[0].offsetLeft : 0;
    if (e.clientX < offsetLeft + 150) {
      $("body").find("#ui-left").addClass("active");
    }
    if (e.clientX > offsetLeft + 200) {
      $("body").find("#ui-left").removeClass("active");
    }
  }
});

Hooks.once("ready", () => {
  if (game.settings.get("pf2e-dorako-ui", "ux.no-logo")) {
    $("#logo")[0].style.setProperty("display", "none", "important");
  }
});

Hooks.once("ready", () => {
  if (game.settings.get("pf2e-dorako-ui", "ux.no-compendium-banner-images")) {
    $("#sidebar").addClass("no-compendium-banner-images");
  }
});

Hooks.on("renderChatLogPF2e", (app, html, data) => {
  if (game.settings.get("pf2e-dorako-ui", "ux.no-chat-control-icon")) {
    html.find("#chat-controls")[0].classList.add("no-chat-control-icon");
  }
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
