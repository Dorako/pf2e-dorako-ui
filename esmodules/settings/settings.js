import * as util from "../util.js";
import { ThemeSettings } from "./theme-settings.js";
import { UXSettings } from "./ux-settings.js";
import { AvatarSettings } from "./avatar-settings.js";
import { MiscSettings } from "./misc-settings.js";
import { CustomizationSettings } from "./customization-settings.js";
import { ExternalModuleSettings } from "./external-module-settings.js";

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

  ThemeSettings.registerSettings();
  AvatarSettings.registerSettings();
  UXSettings.registerSettings();
  MiscSettings.registerSettings();
  CustomizationSettings.registerSettings();
  ExternalModuleSettings.registerSettings();

  util.debug("registered settings");

  // if (game.settings.get("pf2e-dorako-ui", "ux.chat-merge")) {
  //   ChatMerge.init();
  // }

  // if (game.settings.get("pf2e-dorako-ui", "ux.adjust-chat-controls")) {
  //   ChatRollPrivacy.setup();
  //   ChatRollPrivacy.init();
  // }

  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "foundry2-theme") {
    $("#tooltip").attr("data-theme", "foundry2");
    $("#fps").attr("data-theme", "foundry2");
    game.settings.set("pf2e-dorako-ui", "theme.chat-theme", "foundry2");
  } else if (theme !== "no-theme") {
    $("#tooltip").attr("data-theme", "dorako-ui");
    $("#fps").attr("data-theme", "dorako-ui");
  }

  // injectCSS("dorako-theme/dorako-theme");
  // injectCSS("foundry2-theme/foundry2-theme");
  // injectCSS("dorako-ux/dorako-ux");
  injectCSS("fonts");

  // const root = document.querySelector(":root").style;

  // root.setProperty("--avatar-size", game.settings.get("pf2e-dorako-ui", "avatar.size").toString() + "px");
  // root.setProperty("--border-radius", game.settings.get("pf2e-dorako-ui", "ux.border-radius").toString() + "px");
  // root.setProperty("--control-size", game.settings.get("pf2e-dorako-ui", "ux.control-size").toString() + "px");
  // root.setProperty("--controls-alignment", game.settings.get("pf2e-dorako-ui", "ux.controls-alignment").toString());

  util.debug("initialized properties");
});
