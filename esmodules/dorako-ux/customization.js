import * as util from "../util.js";
import { MODULE_NAME } from "../consts.js";
import ChatMerge from "../dorako-ux/chat-merge.js";
import ChatRollPrivacy from "../dorako-ux/chat-rolltype-buttons.js";

function injectCSS(filename) {
  const head = document.getElementsByTagName("head")[0];
  const mainCss = document.createElement("link");
  mainCss.setAttribute("rel", "stylesheet");
  mainCss.setAttribute("type", "text/css");
  mainCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/" + filename + ".css");
  mainCss.setAttribute("media", "all");
  head.insertBefore(mainCss, head.lastChild);
}

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

Hooks.once("init", async () => {
  util.debug(`${MODULE_NAME} | INIT`);
  util.debug(`${MODULE_NAME} | REGISTERING SETTINGS`);
  util.debug(`${MODULE_NAME} | INITIALIZING APPLICATIONS`);

  if (game.settings.get("pf2e-dorako-ui", "ux.chat-merge")) {
    ChatMerge.init();
  }

  if (game.settings.get("pf2e-dorako-ui", "ux.adjust-chat-controls")) {
    ChatRollPrivacy.setup();
    ChatRollPrivacy.init();
  }

  util.debug(`${MODULE_NAME} | INJECTING CSS`);

  //   injectCSS("dorako-ux/dorako-ux");
  injectCSS("fonts");

  util.debug(`${MODULE_NAME} | INJECTING CSS VARIABLES`);

  const root = document.querySelector(":root").style;

  root.setProperty("--avatar-size", game.settings.get("pf2e-dorako-ui", "avatar.size").toString() + "px");
  root.setProperty("--border-radius", game.settings.get("pf2e-dorako-ui", "ux.border-radius").toString() + "px");
  root.setProperty("--control-size", game.settings.get("pf2e-dorako-ui", "ux.control-size").toString() + "px");
  root.setProperty("--controls-alignment", game.settings.get("pf2e-dorako-ui", "ux.controls-alignment").toString());

  util.debug(`${MODULE_NAME} | INIT COMPLETE`);
});

Hooks.once("ready", (app, html, data) => {
  if (!game.settings.get(`${MODULE_NAME}`, "ux.start-sidebar-collapsed")) return;
  ui.sidebar.collapse();
});

Hooks.once("ready", (app, html, data) => {
  if (!game.settings.get(`${MODULE_NAME}`, "ux.start-navigation-collapsed")) return;
  ui.nav.collapse();
});

Hooks.on("closeCombatDock", (app, html, data) => {
  if (!game.settings.get(`${MODULE_NAME}`, "ux.compact-ui")) return;
  ui.nav.expand();
});

Hooks.on("getItemSheetPF2eHeaderButtons", (sheet, buttons) => {
  if (!game.settings.get(`${MODULE_NAME}`, "misc.send-to-chat")) {
    return;
  }

  buttons.unshift({
    label: `${MODULE_NAME}.text.send-to-chat`,
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

for (const appName of ["JournalSheet", "JournalPageSheet"]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const isDalvyn = game.settings.get("pf2e-dorako-ui", "misc.skin-crb-journal");
    if (!isDalvyn) return;
    if (app.id.includes("Compendium-pf2e-criticaldeck")) return;
    html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dalvyn-journal");
  });
}
