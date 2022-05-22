// function cleanHTML() {
// 	document.getElementsByTagName("html")[0].style = null;
// 	$("head").children('link[href="css/style.css"]')[0].disabled = true;
// 	injectCSS("core-trim");
// 	injectCSS("dorako-trim");
// 	// document.getElementById("sidebar").style = null;
// }

// setTimeout(cleanHTML, 10000);

Hooks.on("ready", async function () {
  jQuery.fx.off = true;
});

const debouncedReload = foundry.utils.debounce(
  () => window.location.reload(),
  500
);

// document.addEventListener("DOMContentLoaded", function() {
// 	$("head").children('link[href="css/style.css"]')[0].disabled = true;
// 	injectCSS("core-trim");
// });

// document.addEventListener("DOMContentLoaded", function() {
// 	function myInject() {
// 		// ID add
// 		document.getElementById("hotbar-directory-controls").classList.add("app");
// 		document.getElementById("hotbar-page-controls").classList.add("app");
// 		document.getElementById("fps").classList.add("app");
// 		// ID remove
// 		document.getElementById("navigation").classList.remove("app")
// 		// Class remove
// 		document.getElementsByClassName("main-controls")[0].classList.remove('app');
// 		[ ...document.getElementsByClassName("sub-controls") ].forEach( x => x.classList.remove("app"));
// 		// Class add
// 		[ ...document.getElementsByClassName("control-tool") ].forEach( x => x.className += ' app control');
// 		[ ...document.getElementsByClassName("scene-control") ].forEach( x => x.className += ' app control');
// 		[ ...document.getElementsByClassName("nav-item") ].forEach( x => x.className += ' app');
// 		[ ...document.getElementsByClassName("control-icon") ].forEach( x => x.className += ' app');
// 		[ ...document.getElementsByClassName("macro") ].forEach( x => x.className += ' app');

// 		}
// 	  setTimeout(myInject, 10000);
// });

// Hooks.on("renderSettings", (e, a) => {
// 	const toInsert = $(`<button type="button" disabled style="cursor: wait" data-action="dorako-ui"><i class="fas fa-eye"></i> Dorako UI </button></div>`);
// 	 a.find("#settings-game").append(toInsert)
// });

Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
  injectMessageTag(html, messageData);
  injectWhisperParticipants(html, messageData);
  injectPlayerName(html, messageData);
});

function injectPlayerName(html, messageData) {
  if (messageData.author === undefined) return;
  if (game.settings.get("pf2e-dorako-ui", "enable-player-tags")) {
    const messageSenderElem = html.find(".sender-wrapper");
    const playerName = messageData.author.name;
    const playerNameElem = document.createElement("span");
    playerNameElem.appendChild(document.createTextNode(playerName));
    playerNameElem.classList.add("player-name");
    playerNameElem.classList.add("header-meta");
    messageSenderElem.append(playerNameElem);
  }
}

function injectMessageTag(html, messageData) {
  setting = game.settings.get("pf2e-dorako-ui", "rolltype-indication");
  if (setting == "none") {
    return;
  } else if (setting == "tags" || setting == "both") {
    const messageMetadata = html.find(".message-metadata");

    const rolltype = $("<span>");
    rolltype.addClass("rolltype");
    rolltype.addClass("header-meta");

    const whisperTargets = messageData.message.whisper;

    const isBlind = messageData.message.blind || false;
    const isWhisper = whisperTargets?.length > 0 || false;
    const isSelf =
      isWhisper &&
      whisperTargets.length === 1 &&
      whisperTargets[0] === messageData.message.user;
    const isRoll = messageData.message.roll !== undefined;

    // Inject tag to the left of the timestamp
    if (isBlind) {
      rolltype.text("Secret");
      messageMetadata.prepend(rolltype);
    } else if (isSelf && whisperTargets[0]) {
      rolltype.text(game.i18n.localize("CHAT.RollSelf"));
      messageMetadata.prepend(rolltype);
    } else if (isRoll && isWhisper) {
      rolltype.text(game.i18n.localize("CHAT.RollPrivate"));
      messageMetadata.prepend(rolltype);
    } else if (isWhisper) {
      rolltype.text("Whisper");
      messageMetadata.prepend(rolltype);
    }
  }
}

function injectWhisperParticipants(html, messageData) {
  const alias = messageData.alias;
  const whisperTargets = messageData.message.whisper;
  const whisperTargetString = messageData.whisperTo;
  const whisperTargetIds = messageData.message.whisper;
  const isWhisper = whisperTargetIds?.length > 0 || false;
  const isRoll = messageData.message.roll !== undefined;
  const isSelf =
    isWhisper &&
    whisperTargets.length === 1 &&
    whisperTargets[0] === messageData.message.user;

  const authorId = messageData.message.user;
  const userId = game.user.data._id;

  if (!isWhisper) return;
  if (userId !== authorId && !whisperTargetIds.includes(userId)) return;

  // remove the old whisper to content, if it exists
  html.find(".whisper-to").detach();

  // if this is a roll
  if (isRoll || isSelf) return;

  const messageHeader = html.find(".message-header");

  const whisperParticipants = $("<span>");
  whisperParticipants.addClass("whisper-to");

  const whisperFrom = $("<span>");
  whisperFrom.text(`From: ${alias}`);
  whisperFrom.addClass("header-meta");

  const whisperTo = $("<span>");
  whisperTo.text(`$to: ${whisperTargetString}`);
  whisperTo.addClass("header-meta");

  whisperParticipants.append(whisperFrom);
  whisperParticipants.append(whisperTo);
  messageHeader.append(whisperParticipants);
}

Hooks.once("init", async function () {
  CONFIG.ChatMessage.template =
    "modules/pf2e-dorako-ui/templates/base-chat-message.html";

  const combatImagesActive = game.modules.get("combat-tracker-images")?.active;

  Handlebars.registerHelper("getSpeakerImage", function (message) {
    // const blind = message.whisper && message.blind;
    // if (blind) return "icons/svg/mystery-man.svg";
    let combatantImg;
    let actorImg;
    let tokenImg;

    const speaker = message.speaker;
    if (speaker) {
      if (speaker.token) {
        const token = game.scenes
          .get(speaker.scene)
          ?.tokens?.get(speaker.token);
        tokenImg = token?.data.img;
      }
      if (speaker.actor) {
        const actor = Actors.instance.get(speaker.actor);
        combatantImg = combatImagesActive
          ? actor.getFlag("combat-tracker-images", "trackerImage")
          : null;
        actorImg = actor?.data.img;
      }
    }

    const main = game.settings.get("pf2e-dorako-ui", "insertSpeakerImage");
    if (main === "token") {
      return (
        combatantImg || tokenImg || actorImg || "icons/svg/mystery-man.svg"
      );
    }
    if (main === "actor") {
      return (
        combatantImg || actorImg || tokenImg || "icons/svg/mystery-man.svg"
      );
    }
  });

  Handlebars.registerHelper("determineImageKind", function (message) {
    let combatantImg;
    let actorImg;
    let tokenImg;

    const speaker = message.speaker;
    if (speaker) {
      if (speaker.token) {
        const token = game.scenes
          .get(speaker.scene)
          ?.tokens?.get(speaker.token);
        tokenImg = token?.data.img;
      }
      if (speaker.actor) {
        const actor = Actors.instance.get(speaker.actor);
        combatantImg = combatImagesActive
          ? actor.getFlag("combat-tracker-images", "trackerImage")
          : null;
        actorImg = actor?.data.img;
      }
    }

    const main = game.settings.get("pf2e-dorako-ui", "insertSpeakerImage");
    if (main === "token") {
      return (
        (combatantImg ? "combatant" : "") ||
        (tokenImg ? "token" : "") ||
        (actorImg ? "actor" : "")
      );
    }
    if (main === "actor") {
      return (
        (combatantImg ? "combatant" : "") ||
        (actorImg ? "actor" : "") ||
        (tokenImg ? "token" : "")
      );
    }
    return "no-img";
  });

  Handlebars.registerHelper("showSpeakerImage", function (message) {
    const chatPortraitSetting = game.settings.get(
      "pf2e-dorako-ui",
      "insertSpeakerImage"
    );

    if (chatPortraitSetting === "none") return false;

    let combatantImg;
    let actorImg;
    let tokenImg;

    const speaker = message.speaker;
    if (speaker) {
      if (speaker.token) {
        const token = game.scenes
          .get(speaker.scene)
          ?.tokens?.get(speaker.token);
        tokenImg = token?.data.img;
      }
      if (speaker.actor) {
        const actor = Actors.instance.get(speaker.actor);
        combatantImg = combatImagesActive
          ? actor.getFlag("combat-tracker-images", "trackerImage")
          : null;
        actorImg = actor?.data.img;
      }
    }

    console.log(combatantImg);
    console.log(actorImg);
    console.log(tokenImg);

    return combatantImg || actorImg || tokenImg;
  });

  Handlebars.registerHelper("showHeader", function (message) {
    const headerStyle = game.settings.get(
      "pf2e-dorako-ui",
      "insertSpeakerImage"
    );

    if (headerStyle === "none") return false;

    const speaker = message.speaker;
    if (
      speaker &&
      speaker.token &&
      game.scenes.get(speaker.scene)?.tokens?.get(speaker.token)
    ) {
      return true;
    }
  });

  Handlebars.registerHelper("getHeaderStyle", function (message) {
    const user = game.users.get(message.user);

    const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
    if (headerStyle === "tint") {
      return `background-color:${user.data.color}`;
    }
    return "";
  });

  Handlebars.registerHelper("playerId", function (message) {
    const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
    if (headerStyle === "tint") {
      const user = game.users.get(message.user);
      const hexColor = user.data.color.replace("#", "");
      var r = parseInt(hexColor.substr(0, 2), 16);
      var g = parseInt(hexColor.substr(2, 2), 16);
      var b = parseInt(hexColor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;

      const root = document.querySelector(":root").style;
      let textColor;
      if (yiq >= 128) {
        return "dark-header-text";
      } else {
        return "light-header-text";
      }
    } else if (headerStyle === "blue" || headerStyle === "red") {
      return "light-header-text";
    } else if (headerStyle === "none") {
      const theme = game.settings.get("pf2e-dorako-ui", "theme");
      if (theme === "light") {
        return "dark-header-text";
      } else if (theme === "dark" || theme === "rainbow") {
        return "light-header-text";
      } else {
        return "";
      }
    }
    return "";
  });

  Handlebars.registerHelper("baseTheme", function (message) {
    const theme = game.settings.get("pf2e-dorako-ui", "theme");
    if (theme === "light") {
      return "light-theme";
    } else if (theme === "dark" || theme === "rainbow") {
      return "dark-theme";
    } else {
      return "";
    }
  });

  Handlebars.registerHelper("isUsingHeaderTint", function (message) {
    const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
    if (headerStyle === "tint") {
      return true;
    }
    return false;
  });

  Handlebars.registerHelper("getUserColor", function (message) {
    const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
    if (headerStyle === "none") {
      return "transparent";
    }
    const user = game.users.get(message.user);
    return user.data.color;
  });

  Handlebars.registerHelper("getHeaderStyle", function () {
    const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
    return headerStyle;
  });

  game.settings.register("pf2e-dorako-ui", "theme", {
    name: "Theme",
    hint: "Theme affects chat messages.",
    scope: "client",
    config: true,
    default: "Light",
    type: String,
    choices: {
      light: "Light",
      dark: "Dark",
      rainbow: "???",
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "headerStyle", {
    name: "Header style",
    hint: "Pick between available presets.",
    scope: "client",
    config: true,
    default: "none",
    type: String,
    choices: {
      red: "Red",
      blue: "Blue",
      tint: "Player Color",
      none: "None",
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "insertSpeakerImage", {
    name: "Chat portrait style",
    hint: "Adds the image of the speaker to the chat card.",
    scope: "client",
    config: true,
    default: "token",
    type: String,
    choices: {
      token: "Prefer token image",
      actor: "Prefer actor image",
      none: "Disable",
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-portrait-size", {
    name: "Chat portrait size",
    hint: "Suggested size of 36px.",
    scope: "client",
    type: Number,
    default: 40,
    range: {
      min: 10,
      max: 60,
      step: 1,
    },
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-portrait-border", {
    name: "... and add a border?",
    hint: "Disable if your token art is fancy.",
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-portrait-hover", {
    name: "... and make portraits larger on hover?",
    hint: "Works best if you mouse-over from the left.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-input-height", {
    name: "Chatbox height",
    scope: "client",
    type: Number,
    default: 50,
    range: {
      min: 50,
      max: 300,
      step: 5,
    },
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "enable-player-tags", {
    name: "Add player tags?",
    hint: "Adds a tag containing the name of the player next to the speaker.",
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "rolltype-indication", {
    name: "Indicate rolltype by...",
    hint: "Secret rolls (Blind GM) are tinted pink and whispers are tinted blue.",
    scope: "client",
    type: String,
    default: "both",
    config: true,
    choices: {
      tags: "Tags",
      "bg-color": "Background color",
      both: "Tags and background color",
      none: "Nothing",
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "compact-ui", {
    name: "Use compact UI?",
    hint: "Resizes controls, and hides inactive controls and navigation elements unless hovered.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "no-logo", {
    name: "Disable logo?",
    hint: "Removes the Foundry logo in the top left.",
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "sheet", {
    name: "Theme used for PC sheets",
    hint: "",
    scope: "world",
    config: true,
    default: "red",
    type: String,
    choices: {
      red: "Default",
      dark: "Dark (@Vesselchuck)",
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "familiar-sheet", {
    name: "Theme used for familiar sheets",
    hint: "",
    scope: "world",
    config: true,
    default: "red",
    type: String,
    choices: {
      red: "Default",
      dark: "Dark (@Vesselchuck)",
      darkRedHeader: "Dark + Red Header (@Vesselchuck)",
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "backdrop-filter", {
    name: "Frosted glass?",
    hint: "WARNING: This setting only renders correctly on some browsers, and has a significant performance hit.",
    scope: "client",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  // game.settings.register("pf2e-dorako-ui", "primary-color", {
  //     name: "Primary color overwrite",
  //     hint: "Default is Red",
  //     scope: "client",
  //     config: true,
  //     type: String,
  //     default: "#FF0000",
  //     onChange: () => refresh()
  // });

  // const colorInput = window.document.createElement("input");
  // colorInput.setAttribute("type", "color");
  // colorInput.setAttribute("value", html.find(`input[name="primary-color"]`).val());
  // colorInput.setAttribute("data-edit", `${prefix}.monoVisionColor`);

  // html.find(`input[name="${prefix}.monoVisionColor"]`).after(colorInput);

  game.settings.register("pf2e-dorako-ui", "disable-all-styles", {
    name: "Disable all styles?",
    hint: "Ignore all the toggles and removes any effect of the module, without having to disable it.",
    scope: "client",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "center-hotbar", {
    name: "Center hotbar (macrobar)?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "edge-offset", {
    name: "Edge-offset",
    hint: "Offset from the edge of screen in pixels.",
    scope: "client",
    type: Number,
    default: 10,
    range: {
      min: 5,
      max: 30,
      step: 1,
    },
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-chat", {
    name: "Theme chat?",
    hint: "Applies theming to chat cards and sidebar content.",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-navigation", {
    name: "Theme scene navigation?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-hotbar", {
    name: "Theme the hotbar (macro bar)?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-controls", {
    name: "Theme scene controls?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-token-hud", {
    name: "Theme the token HUD?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-effect-panel", {
    name: "Theme the effect panel?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-sidebar", {
    name: "Theme the sidebar?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-app-ui", {
    name: "Theme app UI?",
    hint: "This includes the player box, window headers, and similar",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debounceReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-combat-tracker", {
    name: "Theme the combat tracker?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-custom-hotbar", {
    name: "Theme Custom Hotbar module?",
    hint: "Set the 'core hotbar' to 1px 1px offset in Custom Hotbar settings.",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-token-action-hud", {
    name: "Theme Token Action HUD?",
    hint: "Makes TAH more compact and fits in better with the rest of the UI.",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-window-controls", {
    name: "Theme Window Controls module?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-combat-carousel", {
    name: "Theme Combat Carousel?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-dice-tray", {
    name: "Theme Dice Tray module?",
    hint: "",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  if (!game.settings.get("pf2e-dorako-ui", "disable-all-styles")) {
    injectCSS("dorako-ui");

    const root = document.querySelector(":root").style;
    if (game.settings.get("pf2e-dorako-ui", "center-hotbar")) {
      root.setProperty("--hotbar-margin-left", "calc(50% - 300px)");
    } else {
      root.setProperty("--hotbar-margin-left", "10px");
    }

    if (game.settings.get("pf2e-dorako-ui", "backdrop-filter")) {
      root.setProperty(
        "--dorako-vibrancy",
        "brightness(1.5) contrast(1.2) saturate(1.5) blur(5px)"
      );
      root.setProperty("--dorako-bg-current", "var(--dorako-bg-glass)");
    }

    root.setProperty(
      "--edge-margin",
      game.settings.get("pf2e-dorako-ui", "edge-offset").toString() + "px"
    );
    // var sheet = document.styleSheets[0];
    // sheet.insertRule(":root{--chat-portrait-size: "+game.settings.get('pf2e-dorako-ui', 'chat-portrait-size').toString()+'px}');

    root.setProperty(
      "--chat-portrait-size",
      game.settings.get("pf2e-dorako-ui", "chat-portrait-size").toString() +
        "px"
    );

    root.setProperty(
      "--chat-input-height",
      game.settings.get("pf2e-dorako-ui", "chat-input-height").toString() + "px"
    );

    if (game.settings.get("pf2e-dorako-ui", "skin-navigation"))
      injectCSS("navigation");
    if (game.settings.get("pf2e-dorako-ui", "skin-controls"))
      injectCSS("controls");
    if (game.settings.get("pf2e-dorako-ui", "skin-token-hud"))
      injectCSS("token-hud");
    if (game.settings.get("pf2e-dorako-ui", "skin-chat")) injectCSS("chat");
    if (game.settings.get("pf2e-dorako-ui", "skin-sidebar"))
      injectCSS("sidebar");
    if (game.settings.get("pf2e-dorako-ui", "skin-combat-tracker"))
      injectCSS("combat-tracker");
    if (game.settings.get("pf2e-dorako-ui", "skin-effect-panel"))
      injectCSS("effect-panel");
    if (game.settings.get("pf2e-dorako-ui", "skin-app-ui")) injectCSS("app-ui");
    if (game.settings.get("pf2e-dorako-ui", "skin-hotbar")) injectCSS("hotbar");
    if (game.settings.get("pf2e-dorako-ui", "skin-window-controls"))
      injectCSS("window-control");
    if (game.settings.get("pf2e-dorako-ui", "skin-token-action-hud"))
      injectCSS("token-action-hud");
    if (game.settings.get("pf2e-dorako-ui", "skin-custom-hotbar"))
      injectCSS("custom-hotbar");
    if (game.settings.get("pf2e-dorako-ui", "skin-dice-tray"))
      injectCSS("dice-tray");
    let headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
    if (headerStyle == "tint" || headerStyle == "red") {
      enableRedHeader();
    } else if (headerStyle == "blue") {
      enableBlueHeader();
    } else if (headerStyle == "none") {
      // padding-bottom: 0px;
    }

    if (game.settings.get("pf2e-dorako-ui", "skin-combat-carousel"))
      injectCSS("combat-carousel");

    let theme = game.settings.get("pf2e-dorako-ui", "theme");
    if (theme == "light") {
      // do nothing
    } else if (theme == "dark") {
      enableDarkTheme();
    } else if (theme == "rainbow") {
      enableRainbowTheme();
    }
    setting = game.settings.get("pf2e-dorako-ui", "rolltype-indication");
    if (setting == "both" || setting == "bg-color")
      injectCSS("chat-blind-whisper");
    if (game.settings.get("pf2e-dorako-ui", "chat-portrait-border"))
      injectCSS("chat-portrait-border");
    if (game.settings.get("pf2e-dorako-ui", "chat-portrait-hover"))
      injectCSS("chat-portrait-hover");
    if (game.settings.get("pf2e-dorako-ui", "compact-ui"))
      injectCSS("compact-ui");
    if (game.settings.get("pf2e-dorako-ui", "no-logo")) injectCSS("no-logo");
    setting = game.settings.get("pf2e-dorako-ui", "sheet");
    if (setting == "dark") injectCSS("pc-sheet-dark");
    setting = game.settings.get("pf2e-dorako-ui", "familiar-sheet");
    if (setting == "dark" || setting == "darkRedHeader")
      injectCSS("familiar-sheet-dark");
    if (setting == "darkRedHeader") injectCSS("familiar-sheet-dark-red-header");
    // if (setting == "plain") injectCSS("sheet-plain");
  }
});

function addClassByQuerySelector(className, selector) {
  let navigation = document.querySelector(selector);
  navigation.classList.add(className);
}

// Base

function injectCSS(filename) {
  const head = document.getElementsByTagName("head")[0];
  const mainCss = document.createElement("link");
  mainCss.setAttribute("rel", "stylesheet");
  mainCss.setAttribute("type", "text/css");
  mainCss.setAttribute(
    "href",
    "modules/pf2e-dorako-ui/styles/" + filename + ".css"
  );
  mainCss.setAttribute("media", "all");
  head.insertBefore(mainCss, head.lastChild);
}

function injectBaseCss() {
  const head = document.getElementsByTagName("head")[0];
  const mainCss = document.createElement("link");
  mainCss.setAttribute("rel", "stylesheet");
  mainCss.setAttribute("type", "text/css");
  mainCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/dorako-ui.css");
  mainCss.setAttribute("media", "all");
  head.insertBefore(mainCss, head.lastChild);
}

// Chat cards
function enableRedHeader() {
  const head = document.getElementsByTagName("head")[0];
  const newCss = document.createElement("link");
  newCss.setAttribute("rel", "stylesheet");
  newCss.setAttribute("type", "text/css");
  newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/header-red.css");
  newCss.setAttribute("media", "all");
  head.insertBefore(newCss, head.lastChild);
}

function enableBlueHeader() {
  const head = document.getElementsByTagName("head")[0];
  const newCss = document.createElement("link");
  newCss.setAttribute("rel", "stylesheet");
  newCss.setAttribute("type", "text/css");
  newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/header-blue.css");
  newCss.setAttribute("media", "all");
  head.insertBefore(newCss, head.lastChild);
}

function enableDarkTheme() {
  const head = document.getElementsByTagName("head")[0];
  const newCss = document.createElement("link");
  newCss.setAttribute("rel", "stylesheet");
  newCss.setAttribute("type", "text/css");
  newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/chat-dark.css");
  newCss.setAttribute("media", "all");
  head.insertBefore(newCss, head.lastChild);
}

function enableRainbowTheme() {
  const head = document.getElementsByTagName("head")[0];
  const newCss = document.createElement("link");
  newCss.setAttribute("rel", "stylesheet");
  newCss.setAttribute("type", "text/css");
  newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/chat-rainbow.css");
  newCss.setAttribute("media", "all");
  head.insertBefore(newCss, head.lastChild);
}
