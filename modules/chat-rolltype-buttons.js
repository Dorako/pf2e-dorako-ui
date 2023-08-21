import { MODULE_NAME } from "./consts.js";

const ICONS_FOR_KNOWN_ROLL_TYPES = {
  publicroll: "fas fa-dice-d20",
  gmroll: "fas fa-book-open-reader",
  blindroll: "fas fa-eye-slash",
  selfroll: "fas fa-user",
};

export default class ChatRollPrivacy {
  static setup() {
    game.keybindings.register(MODULE_NAME, "roll-mode.publicroll", {
      name: "Public Roll",
      editable: [{ key: "KeyQ", modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: "Roll Type Shortcuts",
      onDown: () => {
        $('#dorako-rt-buttons button[data-id="publicroll"]').trigger("click");
      },
    });
    game.keybindings.register(MODULE_NAME, "roll-mode.gmroll", {
      name: "Private GM Roll",
      editable: [{ key: "KeyW", modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: "Roll Type Shortcuts",
      onDown: () => {
        game.settings.set("core", "rollMode", "gmroll");
        $('#dorako-rt-buttons button[data-id="gmroll"]').trigger("click");
      },
    });
    game.keybindings.register(MODULE_NAME, "roll-mode.blindroll", {
      name: "Blind GM Roll",
      editable: [{ key: "KeyE", modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: "Roll Type Shortcuts",
      onDown: () => {
        game.settings.set("core", "rollMode", "blindroll");
        $('#dorako-rt-buttons button[data-id="blindroll"]').trigger("click");
      },
    });
    game.keybindings.register(MODULE_NAME, "roll-mode.selfroll", {
      name: "Self Roll",
      editable: [{ key: "KeyR", modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: "Roll Type Shortcuts",
      onDown: () => {
        game.settings.set("core", "rollMode", "selfroll");
        $('#dorako-rt-buttons button[data-id="selfroll"]').trigger("click");
      },
    });
    game.keybindings.register(MODULE_NAME, "roll-mode.toggle-secret-public", {
      name: "Toggle secret/public",
      editable: [{ key: "KeyS", modifiers: [KeyboardManager.MODIFIER_KEYS.ALT] }],
      namespace: "Roll Type Shortcuts",
      onDown: () => {
        if (game.settings.get("core", "rollMode") !== "blindroll") {
          game.settings.set("core", "rollMode", "blindroll");
          $('#dorako-rt-buttons button[data-id="blindroll"]').trigger("click");
        } else {
          game.settings.set("core", "rollMode", "publicroll");
          $('#dorako-rt-buttons button[data-id="publicroll"]').trigger("click");
        }
      },
    });
  }

  static init() {
    Hooks.on("renderChatLog", this._handleChatLogRendering);
  }

  static async _handleChatLogRendering(chat, html, data) {
    // setTimeout(() => {}, 2);
    const modes = Object.keys(data.rollModes);
    const buttons = [];
    for (let c = 0; c < modes.length; c++) {
      const rt = modes[c];
      if (!(rt in ICONS_FOR_KNOWN_ROLL_TYPES)) {
        console.warn(Error(`Unknown roll type '${rt}'`));
        continue;
      }
      buttons.push({
        rt: rt,
        name: data.rollModes[rt],
        active: data.rollMode === rt,
        icon: ICONS_FOR_KNOWN_ROLL_TYPES[rt],
      });
    }
    const buttonHtml = $(await renderTemplate("modules/pf2e-dorako-ui/templates/rt-buttons.hbs", { buttons }));
    buttonHtml.find("button").on("click", function () {
      const rollType = $(this).attr("data-id");
      game.settings.set("core", "rollMode", rollType);
      buttonHtml.find("button.active").removeClass("active");
      $(this).addClass("active");
    });
    html.find("select[name=rollMode]").after(buttonHtml);
    html.find("select[name=rollMode]").remove();

    const nonrolltype = $(`<div id="dorako-nonrt-buttons" class="buttons control-buttons"></div>`);

    html.find("#chat-controls div.control-buttons a").each(function () {
      const html = $(this).html();
      const classes = $(this).attr("class") ?? "";
      const title = $(this).attr("title") ?? "";
      const style = $(this).attr("style") ?? "";
      const button = $(`<button class="${classes}" title="${title}" style="${style}">${html}</button>`);
      const events = $._data(this, "events"); // Chat Reactions "a" doesn't have event handler configured yet at the time this runs
      if (events) {
        const click = events["click"][0].handler;
        button.on("click", click);
      }
      nonrolltype.append(button);
    });
    const fateButton = $(document).find("#chat-controls .chat-control-icon .FATE-button");
    if (fateButton) {
      const title = fateButton.attr("title") ?? "";
      const button = $(`<button class="fate" title="${title}"><i class="fas fa-yin-yang"></i></button>`);
      nonrolltype.append(button);
    }
    html.find("#chat-controls div.control-buttons").remove();
    html.find("#chat-controls").append(nonrolltype);
  }
}
