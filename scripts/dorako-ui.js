// function cleanHTML() {
// 	document.getElementsByTagName("html")[0].style = null;
// 	$("head").children('link[href="css/style.css"]')[0].disabled = true;
// 	injectCSS("core-trim");
// 	injectCSS("dorako-trim");
// 	// document.getElementById("sidebar").style = null;
// }

// setTimeout(cleanHTML, 10000);

// Hooks.on("ready", async function () {
//   jQuery.fx.off = true;
// });

const rgb2hex = (rgb) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;

class Avatar {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.type = "avatar";
  }
}

class CombatantAvatar extends Avatar {
  constructor(name, image) {
    super(name, image);
    this.type = "combatant";
  }
}

class ActorAvatar extends Avatar {
  constructor(name, image) {
    super(name, image);
    this.type = "actor";
  }
}

class TokenAvatar extends Avatar {
  constructor(name, image, scale, isSmall) {
    super(name, image);
    this.type = "token";
    this.scale = scale;
    this.isSmall = isSmall;
  }
}

const debouncedReload = foundry.utils.debounce(
  () => window.location.reload(),
  500
);

function addClassByQuerySelector(className, selector) {
  let navigation = document.querySelector(selector);
  navigation.classList.add(className);
}

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

// Timestamp
// Hooks.once("init", async () => {
//   let chatTimeStamp = (timestamp) => {
//     return new Date(timestamp).toLocaleTimeString();
//   };
//   let chatDateStamp = (timestamp) => {
//     return new Date(timestamp).toLocaleDateString();
//   };

//   Handlebars.registerHelper({ chatTimeStamp: chatTimeStamp });
//   Handlebars.registerHelper({ chatDateStamp: chatDateStamp });
// });

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

// Hooks
// Combat Tracker
Hooks.on("renderCombatTracker", addScalingToCombatTrackerAvatars);

// // Test
// Check DF manual rolls for inspiration
// Hooks.on("renderUserConfig", (user, html, c) => {
//   console.log(user);
//   console.log(html);
//   console.log(c);

//   let group0 = html.find(".form-group")[0];
//   console.log(group0);
// });

// Hooks.on("updateUser", (user) => {
//   console.log(user);
// });

// Chat cards
Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
  if (chatMessage.flags["narrator-tools"]) {
    return;
  }

  let html0 = html[0];

  // console.log("renderChatMessage Hook");
  // console.log("chatMessage");
  // console.log(chatMessage);
  // console.log("html");
  // console.log(html);
  // console.log("messageData");
  // console.log(messageData);

  injectSenderWrapper(html, messageData);
  injectMessageTag(html, messageData);
  injectWhisperParticipants(html, messageData);
  injectAuthorName(html, messageData);

  if (
    game.settings.get("pf2e-dorako-ui", "hidePortraitWhenHidden") &&
    chatMessage.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  ) {
  } else {
    injectChatPortrait(html, getAvatar(chatMessage));
  }
  moveFlavorTextToContents(html);

  const theme = game.settings.get("pf2e-dorako-ui", "theme");

  if (theme == "dark") html0.classList.add("dark-theme");
  if (theme == "light") html0.classList.add("light-theme");
  if (theme == "factions") {
    if (chatMessage.user.isGM) {
      html0.classList.add("dark-theme");
    } else {
      html0.classList.add("light-theme");
    }
  }

  themeHeader(html, chatMessage);
});

Hooks.on("preCreateChatMessage", (message) => {
  addAvatarsToFlags(message);

  message.updateSource({
    "flags.pf2e-dorako-ui.wasTokenHidden": message?.token?.hidden,
  });
});

function themeHeader(html, message) {
  let messageHeader = html.find(".message-header")[0];

  const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
  if (headerStyle != "none") {
    let bgCol = getHeaderColor(html, message);
    messageHeader.setAttribute("style", "background-color: " + bgCol);
  }

  let textColTheme = calcHeaderTextColor(html, message);
  messageHeader.classList.add(textColTheme);

  let time = html.find("time")[0];
  time.classList.add("header-meta");
}

function moveFlavorTextToContents(html) {
  let flavor = html.find(".flavor-text")[0];
  let contents = html.find(".message-content");
  contents.prepend(flavor);
}

function injectSenderWrapper(html, messageData) {
  if (messageData.author === undefined) return;
  var target = html.find(".message-sender")[0];
  var wrapper = document.createElement("div");
  wrapper.classList.add("sender-wrapper");
  target.parentNode.insertBefore(wrapper, target);
  wrapper.appendChild(target);
}

function injectChatPortrait(html, avatar) {
  if (!avatar) return;
  // if cautious game master is enabled and setting is on, return immediately
  let messageHeader = html.find(".message-header")[0];
  let portraitAndName = document.createElement("div");
  portraitAndName.classList.add("portrait-and-name");
  messageHeader.prepend(portraitAndName);
  let wrapper = document.createElement("div");
  wrapper.classList.add("portrait-wrapper");
  let portrait = document.createElement("img");
  portrait.classList.add("avatar");
  portrait.classList.add("portrait");
  wrapper.append(portrait);
  let senderWrapper = html.find(".sender-wrapper")[0];
  portraitAndName.append(senderWrapper);
  portraitAndName.prepend(wrapper);
}

function injectAuthorName(html, messageData) {
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
    const isRoll = messageData.message.rolls !== undefined;

    if (isBlind) {
      rolltype.text("Secret");
      messageMetadata.prepend(rolltype);
    } else if (isSelf && whisperTargets[0]) {
      rolltype.text("Self roll");
      messageMetadata.prepend(rolltype);
    } else if (isRoll && isWhisper) {
      rolltype.text("GM only");
      messageMetadata.prepend(rolltype);
    } else if (isWhisper) {
      rolltype.text("Whisper");
      messageMetadata.prepend(rolltype);
    }
  }
}

function injectWhisperParticipants(html, messageData) {
  const alias = messageData.alias;
  const author = messageData.author;
  const whisperTargets = messageData.message.whisper;
  const whisperTargetString = messageData.whisperTo;
  const whisperTargetIds = messageData.message.whisper;
  const isWhisper = whisperTargetIds?.length > 0 || false;
  const isRoll = messageData.message.rolls !== undefined;
  const isSelf =
    (isWhisper &&
      whisperTargets.length === 1 &&
      whisperTargets[0] === messageData.message.user) ||
    (isWhisper &&
      whisperTargets.length === 2 &&
      whisperTargets[0] === "null" &&
      whisperTargets[1] === messageData.message.user);

  const authorId = messageData.message.user;
  const userId = game.user.id;

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
  whisperTo.text(`to: ${whisperTargetString}`);
  whisperTo.addClass("header-meta");

  whisperParticipants.append(whisperFrom);
  whisperParticipants.append(whisperTo);
  messageHeader.append(whisperParticipants);
}

function addScalingToCombatTrackerAvatars(app, html, data) {
  const combatImagesActive = game.modules.get("combat-tracker-images")?.active;
  $(".combatant", html).each(function () {
    let id = this.dataset.combatantId;
    let combatant = game.combat.combatants.get(id);
    // console.log(combatant);
    let scale = combatant.token.texture.scaleX;
    let tokenImageElem = this.getElementsByClassName("token-image")[0];
    if (
      scale < 1 ||
      (combatImagesActive &&
        combatant.actor.getFlag("combat-tracker-images", "trackerImage"))
    ) {
      scale = 1;
    }
    tokenImageElem.setAttribute("style", "transform: scale(" + scale + ")");
  });
}

function getHeaderColor(html, message) {
  const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
  if (headerStyle === "tint") {
    return message?.user?.color ?? "#DAC0FB";
  } else if (headerStyle === "blue") {
    return "#191F65";
  } else if (headerStyle === "red") {
    return "#540C06";
  } else if (headerStyle === "none") {
    return null;
  }
  return "#DAC0FB";
}

function calcHeaderTextColor(html, message) {
  const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
  const messageHeader = html.find(".message-header")[0];
  if (headerStyle === "none") {
    if (html[0].classList.contains("dark-theme")) {
      return "light-header-text";
    } else {
      return "dark-header-text";
    }
  }

  let bgCol = messageHeader.style.backgroundColor;
  bgCol = rgb2hex(bgCol);
  var r = parseInt(bgCol.substr(1, 2), 16);
  var g = parseInt(bgCol.substr(3, 2), 16);
  var b = parseInt(bgCol.substr(5, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  if (yiq >= 128) {
    return "dark-header-text";
  } else {
    return "light-header-text";
  }
}

function addAvatarsToFlags(message) {
  let combatantImg =
    game.modules.get("combat-tracker-images")?.active && message.actor
      ? message.actor.getFlag("combat-tracker-images", "trackerImage")
      : null;
  let actorImg = message.actor?.img;
  let tokenImg = message.token?.texture.src;
  let userImg = message.user?.avatar;

  // console.log(message.token);
  // console.log(message.token?.texture);
  // console.log(message.token?.texture.src);

  let userAvatar = new Avatar(message.speaker.alias, userImg);

  let combatantAvatar = combatantImg
    ? new CombatantAvatar(message.speaker.alias, combatantImg)
    : null;

  let actorAvatar = actorImg
    ? new ActorAvatar(message.speaker.alias, actorImg)
    : null;

  let tokenAvatar = null;
  if (tokenImg) {
    tokenAvatar = new TokenAvatar(
      message.speaker.alias,
      tokenImg,
      message.token.texture.scaleX,
      message.actor.size == "sm"
    );
  }

  message.updateSource({
    "flags.pf2e-dorako-ui.userAvatar": userAvatar,
    "flags.pf2e-dorako-ui.combatantAvatar": combatantAvatar,
    "flags.pf2e-dorako-ui.tokenAvatar": tokenAvatar,
    "flags.pf2e-dorako-ui.actorAvatar": actorAvatar,
  });
}

function getAvatar(message) {
  const main = game.settings.get("pf2e-dorako-ui", "insertSpeakerImage");
  if (main == "none") {
    return null;
  }

  let combatantAvatar = message.getFlag("pf2e-dorako-ui", "combatantAvatar");
  let tokenAvatar = message.getFlag("pf2e-dorako-ui", "tokenAvatar");
  let actorAvatar = message.getFlag("pf2e-dorako-ui", "actorAvatar");
  let userAvatar = game.settings.get("pf2e-dorako-ui", "use-user-avatar")
    ? message.getFlag("pf2e-dorako-ui", "userAvatar")
    : null;

  if (combatantAvatar) return combatantAvatar;

  if (
    game.settings.get("pf2e-dorako-ui", "hidePortraitWhenHidden") &&
    message.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  ) {
    return null;
  }

  return main == "token"
    ? tokenAvatar || actorAvatar || userAvatar
    : actorAvatar || tokenAvatar || userAvatar;
}

Hooks.on("renderChatMessage", (message, b) => {
  let avatar = getAvatar(message);
  if (!avatar) return;
  let html = b[0];

  const avatarElem = html.getElementsByClassName("avatar")[0];
  avatarElem.src = avatar.image;

  if (avatar.type == "token") {
    const smallScale = game.settings.get(
      "pf2e-dorako-ui",
      "small-creature-token-portrait-size"
    );
    let smallCorrection = avatar.isSmall ? 1.25 * smallScale : 1;
    avatarElem?.setAttribute(
      "style",
      "transform: scale(" + avatar.scale * smallCorrection + ")"
    );
  }

  const portraitDegreeSetting = game.settings.get(
    "pf2e-dorako-ui",
    "portrait-reacts-to-degree-of-success"
  );

  if (portraitDegreeSetting) {
    let degree = message?.rolls?.degreeOfSuccess;
    if (degree == undefined) return;
    if (degree == 0) {
      let wrapper = html.getElementsByClassName("portrait-wrapper")[0];
      wrapper?.setAttribute(
        "style",
        "filter: saturate(0.2) drop-shadow(0px 0px 6px black)"
      );
    } else if (degree == 3) {
      let wrapper = html.getElementsByClassName("portrait-wrapper")[0];
      wrapper?.setAttribute(
        "style",
        "filter: drop-shadow(0px 0px 6px lightgreen)"
      );
    }
  }
});

Hooks.once("init", async () => {
  game.settings.register("pf2e-dorako-ui", "sheet", {
    name: "Theme used for PC sheets",
    hint: "",
    scope: "client",
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
    scope: "client",
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
      factions: "Players light, GM dark",
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

  game.settings.register("pf2e-dorako-ui", "hideGmIconWhenSecret", {
    name: "Hide chat portrait when secret?",
    hint: "Hides the chat portrait whenever GM rolls secret/private rolls.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "hidePortraitWhenHidden", {
    name: "Hide chat portrait when token hidden?",
    hint: "Hides the chat portrait whenever the token of the speaker is hidden",
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-portrait-size", {
    name: "Chat portrait size",
    hint: "Suggested size of 40px.",
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

  game.settings.register("pf2e-dorako-ui", "popout-token-portraits", {
    name: "Chat portrait token popout",
    hint: "Scales the chat portraits of BB/AV-style tokens to allow for 'pop out'.",
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register(
    "pf2e-dorako-ui",
    "portrait-reacts-to-degree-of-success",
    {
      name: "Should the portraits react to critical success/failure?",
      hint: "A critical success will glow green, and a critical failure will become muted and dark.",
      scope: "client",
      type: Boolean,
      default: true,
      config: true,
      onChange: () => {
        debouncedReload();
      },
    }
  );

  game.settings.register(
    "pf2e-dorako-ui",
    "small-creature-token-portrait-size",
    {
      name: "Chat portrait small creature scale",
      hint: "Default is 0.8",
      scope: "world",
      type: Number,
      default: 0.8,
      range: {
        min: 0.7,
        max: 1.0,
        step: 0.1,
      },
      config: true,
      onChange: () => {
        debouncedReload();
      },
    }
  );

  game.settings.register("pf2e-dorako-ui", "use-user-avatar", {
    name: "Use user avatar as fallback for chat potraits?",
    hint: "Configure user avatars by right-clicking users in the lower left area of Foundry.",
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-portrait-border", {
    name: "... and add a border?",
    hint: "Disable if your token art is fancy.",
    scope: "world",
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
    default: 90,
    range: {
      min: 20,
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
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
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  injectCSS("dorako-ui");

  const root = document.querySelector(":root").style;
  if (game.settings.get("pf2e-dorako-ui", "center-hotbar")) {
    root.setProperty("--hotbar-margin-left", "calc(50% - 300px)");
  } else {
    root.setProperty("--hotbar-margin-left", "10px");
  }

  if (game.settings.get("pf2e-dorako-ui", "backdrop-filter")) {
    injectCSS("backdrop-filter");
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

  root.setProperty(
    "--chat-portrait-size",
    game.settings.get("pf2e-dorako-ui", "chat-portrait-size").toString() + "px"
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
  if (game.settings.get("pf2e-dorako-ui", "skin-sidebar")) injectCSS("sidebar");
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
  if (headerStyle != "none") {
    injectCSS("header");
  }
  injectCSS("chat-dark");

  if (game.settings.get("pf2e-dorako-ui", "skin-combat-carousel"))
    injectCSS("combat-carousel");

  setting = game.settings.get("pf2e-dorako-ui", "rolltype-indication");
  if (setting == "both" || setting == "bg-color")
    injectCSS("chat-blind-whisper");
  if (game.settings.get("pf2e-dorako-ui", "chat-portrait-border"))
    injectCSS("chat-portrait-border");
  if (game.settings.get("pf2e-dorako-ui", "compact-ui"))
    injectCSS("compact-ui");
  if (game.settings.get("pf2e-dorako-ui", "no-logo")) injectCSS("no-logo");
  setting = game.settings.get("pf2e-dorako-ui", "sheet");
  if (setting == "dark") injectCSS("pc-sheet-dark");
  setting = game.settings.get("pf2e-dorako-ui", "familiar-sheet");
  if (setting == "dark" || setting == "darkRedHeader")
    injectCSS("familiar-sheet-dark");
  if (setting == "darkRedHeader") injectCSS("familiar-sheet-dark-red-header");
});
