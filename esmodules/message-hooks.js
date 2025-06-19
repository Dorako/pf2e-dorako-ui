import { lookupThemeAndSchemeForKey } from "./ui-theme.js";
import { getPlayerOwners } from "./util.js";
import { i18n, titleCase } from "./util.js";
import { Avatar, ActorAvatar, TokenAvatar, CombatantAvatar, SubjectAvatar } from "./consts.js";

Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
  if (html[0].hasAttribute("style")) {
    html.css("border-color", "");
  }
});

// Chat cards
Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
  const isNarratorToolsMessage = chatMessage.flags["narrator-tools"];
  const isMLDRoundMarker = chatMessage.flags["monks-little-details"]?.roundmarker;
  const isMCDRoundMarker = chatMessage.flags["monks-combat-details"]?.roundmarker;
  const isRoundMarker = isMLDRoundMarker || isMCDRoundMarker;
  if (isNarratorToolsMessage || isRoundMarker) {
    return;
  }

  let html0 = html[0];
  html0.style.setProperty("--player-color", chatMessage?.author?.color ?? "#DAC0FB");

  const isSecretDisposition =
    game?.scenes?.get(chatMessage?.speaker?.scene)?.tokens?.get(chatMessage?.speaker?.token)?.disposition == -2;
  const isOpposition = chatMessage?.actor?.alliance === "opposition" && !isSecretDisposition;
  if (isOpposition && game.settings.get("pf2e-dorako-ui", "theme.chat-message-opposition-theme") === "no-theme") {
    return;
  }
  if (!isOpposition && game.settings.get("pf2e-dorako-ui", "theme.chat-message-standard-theme") === "no-theme") {
    return;
  }
  const { dorakoUiTheme, colorScheme } =
    chatMessage?.actor?.alliance === "opposition" && !isSecretDisposition
      ? lookupThemeAndSchemeForKey(game.settings.get("pf2e-dorako-ui", "theme.chat-message-opposition-theme"))
      : lookupThemeAndSchemeForKey(game.settings.get("pf2e-dorako-ui", "theme.chat-message-standard-theme"));
  // html0.dataset.theme = dorakoUiTheme;
  // html0.dataset.colorScheme = colorScheme;
  // html0.dataset.dorakoUiScope = "unlimited";
  // html0.dataset.theme = ""; // don't set this
  html0.dataset.chatMessageTheme = dorakoUiTheme;
  html0.dataset.chatMessageColorScheme = colorScheme;

  const headerStyle = game.settings.get("pf2e-dorako-ui", "theme.chat-message-header-style");
  if (dorakoUiTheme === "crb" && headerStyle !== "none") {
    html0.dataset.hasHeader = "";
  }
  themeHeader(html, chatMessage);
});

function themeHeader(html, message) {
  let messageHeader = html.find(".message-header")[0];
  const headerColor = getHeaderColor(html, message);
  messageHeader.style.setProperty("--header-color", headerColor);

  if (headerColor !== headerStyleColors.none) {
    let textColTheme = calcHeaderTextColor(headerColor);
    html[0].dataset.headerTextColorScheme = textColTheme;
  }

  // some modules add different timestamps and hide the original, like dfce-simple-timestamp
  let time = html.find("time")[0];
  if (time) {
    // time.classList.add("header-meta");
  }
}

const headerStyleColors = {
  none: "none",
  fallback: "#DAC0FB",
  blue: "#191F65",
  green: "#002A17",
  red: "#540C06",
};

function getHeaderColor(html, message) {
  const headerStyle = game.settings.get("pf2e-dorako-ui", "theme.chat-message-header-style");
  if (headerStyle === "tint") {
    return getPlayerOwners(message.actor)[0].color.css ?? message?.author?.color ?? headerStyleColors.fallback;
  }
  return headerStyleColors[headerStyle] ?? headerStyleColors.fallback;
}

function calcHeaderTextColor(headerColor) {
  var r = Color.fromString(headerColor).r;
  var g = Color.fromString(headerColor).g;
  var b = Color.fromString(headerColor).b;
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  if (yiq >= 0.8) {
    return "dark";
  } else {
    return "light";
  }
}

const rgb2hex = (rgb) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;

// Chat cards
Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
  const isNarratorToolsMessage = chatMessage.flags["narrator-tools"];
  const isMLDRoundMarker = chatMessage.flags["monks-little-details"]?.roundmarker;
  const isMCDRoundMarker = chatMessage.flags["monks-combat-details"]?.roundmarker;
  const isRoundMarker = isMLDRoundMarker || isMCDRoundMarker;
  if (isNarratorToolsMessage || isRoundMarker) {
    return;
  }

  // if (game.settings.get("pf2e-dorako-ui", "avatar.source") !== "system") {
  //   html[0].querySelector(".message-header").classList.add("dorako-ux");
  //   injectSenderWrapper(html, messageData);
  //   injectAuthorName(html, messageData);
  // }
  adjustWhisperParticipants(html, messageData);
  injectMessageTag(html, messageData);
  injectAvatar(html, getAvatar(chatMessage));

  // if (
  //   game.settings.get("pf2e-dorako-ui", "avatar.hide-when-token-hidden") &&
  //   chatMessage.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  //   // || (game.settings.get("pf2e-dorako-ui", "avatar.hide-gm-avatar-when-secret") && !chatMessage.isContentVisible)
  // ) {
  //   // do nothing
  // } else {
  //   // injectAvatar(html, getAvatar(chatMessage));
  // }
  moveFlavorTextToContents(html);
});

// // Is damage roll
// Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
//   // if (!game.settings.get("pf2e-dorako-ui", "hiding.remove-attack-info-from-damage-roll-messages")) return;

//   if (chatMessage?.isDamageRoll && chatMessage?.item?.type !== "spell") {
//     html[0].classList.add("dorako-damage-roll");
//     let flavor = html.find(".flavor-text");
//     flavor.each(function () {
//       $(this).contents().eq(1).wrap("<span/>");
//     });
//   }
// });

// // Is check roll
// Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
//   // if (!game.settings.get("pf2e-dorako-ui", "hiding.remove-attack-info-from-damage-roll-messages")) return;

//   if (chatMessage?.isCheckRoll) {
//     html.addClass("dorako-check-roll");
//   }
// });

// "Be last" magic trick. Should ensure that any other modules that modify, say, who spoke the message, have done so before you add the flags.
Hooks.once("ready", () => {
  Hooks.on("preCreateChatMessage", (message) => {
    addAvatarsToFlags(message);
    message.updateSource({
      "flags.pf2e-dorako-ui.wasTokenHidden": message?.token?.hidden,
    });
  });

  Hooks.on("updateChatMessage", (message) => {
    addAvatarsToFlags(message, false);
  });

  // Hooks.on("renderChatMessage", (app, html, data) => {
  //   const isKoboldWorksTurnAnnouncerMessage = app.flags["koboldworks-turn-announcer"];
  //   if (!isKoboldWorksTurnAnnouncerMessage) return;

  //   const avatar = html.find(".portrait.dorako");
  //   avatar.css("transform", `scale(${app.flags["pf2e-dorako-ui"]?.tokenAvatar.scale})`);
  //   avatar.css("mask-image", `radial-gradient(circle, black 56%, rgba(0, 0, 0, 0.2) 92%)`);
  //   avatar.css("flex", `0px 0px var(--avatar-size)`);
  //   avatar.css("height", `var(--avatar-size)`);
  //   avatar.css("width", `var(--avatar-size)`);
  // });
});

function moveFlavorTextToContents(html) {
  let flavor = html.find(".flavor-text")[0];
  let contents = html.find(".message-content")[0];
  if (flavor) contents.prepend(flavor);
}

function injectSenderWrapper(html, messageData) {
  if (messageData.author === undefined) return;
  var target = html.find(".message-sender")[0];
  var wrapper = document.createElement("div");
  wrapper.classList.add("sender-wrapper");
  target.parentNode.insertBefore(wrapper, target);
  wrapper.appendChild(target);
}

function injectAvatar(html, avatar) {
  if (!avatar) return;
  let messageHeader = html.find(".message-header")[0];
  let dorakoPortraitElem = document.createElement("div");
  dorakoPortraitElem.setAttribute("class", "portrait token dorako");
  // let portraitAndName = document.createElement("div");
  // portraitAndName.classList.add("portrait-and-name");
  // messageHeader.prepend(portraitAndName);
  // let wrapper = document.createElement("div");
  // wrapper.classList.add("portrait-wrapper");
  // let portrait = document.createElement("img");
  // portrait.classList.add("avatar");
  // portrait.classList.add("portrait");
  // let dynamicTokenRing = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // dynamicTokenRing.setAttribute("viewBox", "0 0 100 100");
  // dynamicTokenRing.setAttribute("style", "transform: scale(2.5); pointer-events: none;");
  // dynamicTokenRing.setAttribute("class", "dynamic-ring");

  messageHeader.prepend(dorakoPortraitElem);

  // wrapper.append(dynamicTokenRing);
  // portraitElem.append(dynamicTokenRing);
  // wrapper.append(portrait);
  // let senderWrapper = html.find(".sender-wrapper")[0];
  // portraitAndName.append(senderWrapper);
  // portraitAndName.prepend(wrapper);
}

function injectAuthorName(html, messageData) {
  if (messageData.author === undefined) return;
  if (game.settings.get("pf2e-dorako-ui", "other.enable-player-tags")) {
    const messageSenderElem = html.find(".sender-wrapper");
    const playerName = messageData.author.name;
    const playerNameElem = document.createElement("span");
    playerNameElem.appendChild(document.createTextNode(playerName));
    playerNameElem.classList.add("player-name");
    playerNameElem.classList.add("header-meta");
    if (playerName === messageData.alias) {
      html.find(".message-sender").addClass("dorako-display-none");
    }
    messageSenderElem.append(playerNameElem);
  }
}

function injectMessageTag(html, messageData) {
  // const setting = game.settings.get("pf2e-dorako-ui", "other.enable-rolltype-indication");
  // if (setting == false) {
  //   return;
  // }
  const messageMetadata = html.find(".message-header");

  const rolltype = $("<span>");
  rolltype.addClass("rolltype");
  // rolltype.addClass("header-meta");

  const whisperTargets = messageData.message.whisper;

  const isBlind = messageData.message.blind;
  if (isBlind) rolltype.addClass("blind");
  const isWhisper = messageData.isWhisper;
  if (isWhisper) rolltype.addClass("whisper");
  const isSelf = whisperTargets.length === 1 && whisperTargets[0] === messageData.message.author;
  const isRoll = messageData.message.rolls !== undefined && messageData.message.rolls.length > 0;

  if (isBlind) {
    rolltype.text(i18n("pf2e-dorako-ui.text.secret"));
    messageMetadata.prepend(rolltype);
    messageMetadata[0].classList.add("with-rolltype");
  } else if (isRoll && isSelf) {
    rolltype.text(i18n("pf2e-dorako-ui.text.self-roll"));
    messageMetadata.prepend(rolltype);
    messageMetadata[0].classList.add("with-rolltype");
  } else if (isRoll && whisperTargets.length > 0) {
    rolltype.text(i18n("pf2e-dorako-ui.text.gm-only"));
    rolltype.addClass("whisper");
    messageMetadata.prepend(rolltype);
    messageMetadata[0].classList.add("with-rolltype");
  } else if (isWhisper && whisperTargets.length > 0) {
    rolltype.text(i18n("pf2e-dorako-ui.text.whisper"));
    rolltype.addClass("whisper");
    messageMetadata.prepend(rolltype);
    messageMetadata[0].classList.add("with-rolltype");
  } else if (isWhisper) {
    rolltype.text(i18n("pf2e-dorako-ui.text.whisper"));
    messageMetadata.insertAdjacentHTML("beforeend", rolltype);
    messageMetadata[0].classList.add("with-rolltype");
  }

  // if (game.settings.get("pf2e-dorako-ui", "moving.animate-messages")) {
  //   // Draw attention to direct whispers from players to GM
  //   const isGmSpeaker = game.users.get(messageData.message.author)?.isGM;
  //   const isGmTarget = game.users.get(whisperTargets?.[0])?.isGM;
  //   if (!(isBlind || isSelf) && isWhisper && !isGmSpeaker && isGmTarget) {
  //     html[0].classList.add("attention");
  //   }
  // }
}

function adjustWhisperParticipants(html, messageData) {
  const whisperTargetIds = messageData.message.whisper;
  const isWhisper = messageData.isWhisper;
  const isRoll = messageData.message.rolls !== undefined && messageData.message.rolls > 0;

  const authorId = messageData.message.author;
  const userId = game.user.id;

  if (!isWhisper) return;
  if (userId !== authorId && !whisperTargetIds.includes(userId)) return;

  // remove the old whisper to content, if it exists
  html.find(".whisper-to").detach();

  if (messageData.message?.flags?.pf2e?.context?.type == "damage-taken") return;

  // if this is a roll
  if (isRoll) return;

  const messageHeader = html.find(".message-header");

  const whisperParticipants = $("<span>");
  whisperParticipants.addClass("dux");
  whisperParticipants.addClass("whisper-to");

  const whisperFrom = $("<span>");
  const fromText = titleCase(i18n("pf2e-dorako-ui.text.from"));
  whisperFrom.text(`${fromText}: ${messageData.author.name}`);
  whisperFrom.addClass("tag");

  const whisperTo = $("<span>");

  const whisperToLabel = $("<span>");
  const toText = titleCase(i18n("pf2e-dorako-ui.text.to"));
  whisperToLabel.text(`${toText}: `);
  // whisperToLabel.addClass("tag");
  whisperTo.append(whisperToLabel);
  whisperParticipants.append(whisperTo);

  const recipients = $("<span>");
  whisperParticipants.append(recipients);

  for (const whisperId of whisperTargetIds) {
    const recipient = $("<span>");
    recipient.text(game.users.get(whisperId)?.name);
    recipient.addClass("tag");
    recipient.addClass("whisper");

    recipients.append(recipient);
  }

  messageHeader.append(whisperParticipants);
}

function addAvatarsToFlags(message, local = true) {
  let combatantImg =
    game.modules.get("combat-tracker-images")?.active && message.actor
      ? message.actor.getFlag("combat-tracker-images", "trackerImage")
      : null;
  let speaker = message.speaker;
  const actor = game.actors.get(speaker.actor);
  let actorImg = actor?.img;
  const token = game.scenes.get(speaker.scene)?.tokens.get(speaker.token) ?? actor?.prototypeToken;
  let tokenImg = token?.texture.src;
  let userImg = message.author?.avatar;
  let subjectImg = token?.ring?.subject;

  let userAvatar = new Avatar(message.speaker.alias, userImg);

  let combatantAvatar = combatantImg ? new CombatantAvatar(message.speaker.alias, combatantImg) : null;

  let actorAvatar = actorImg ? new ActorAvatar(message.speaker.alias, actorImg) : null;

  let tokenAvatar = tokenImg
    ? new TokenAvatar(message.speaker.alias, tokenImg, token.texture.scaleX, actor.size == "sm")
    : null;

  let subjectAvatar =
    token?.ring?.enabled && subjectImg.texture
      ? new SubjectAvatar(message.speaker.alias, subjectImg.texture, subjectImg.scale * 1.25, actor.size == "sm")
      : null;

  if (local) {
    message.updateSource({
      "flags.pf2e-dorako-ui.userAvatar": userAvatar,
      "flags.pf2e-dorako-ui.combatantAvatar": combatantAvatar,
      "flags.pf2e-dorako-ui.tokenAvatar": tokenAvatar,
      "flags.pf2e-dorako-ui.actorAvatar": actorAvatar,
      "flags.pf2e-dorako-ui.subjectAvatar": subjectAvatar,
    });
  } else if (game.user.id == message.author.id) {
    message.update({
      "flags.pf2e-dorako-ui.userAvatar": userAvatar,
      "flags.pf2e-dorako-ui.combatantAvatar": combatantAvatar,
      "flags.pf2e-dorako-ui.tokenAvatar": tokenAvatar,
      "flags.pf2e-dorako-ui.actorAvatar": actorAvatar,
      "flags.pf2e-dorako-ui.subjectAvatar": subjectAvatar,
    });
  }
}

function getAvatar(message) {
  // return message.getFlag("pf2e-dorako-ui", "subjectAvatar");
  const source = game.settings.get("pf2e-dorako-ui", "avatar.source");
  if (source == "none" || source == "system") {
    return null;
  }

  let combatantAvatar = message.getFlag("pf2e-dorako-ui", "combatantAvatar");
  let tokenAvatar = message.getFlag("pf2e-dorako-ui", "tokenAvatar");
  let actorAvatar = message.getFlag("pf2e-dorako-ui", "actorAvatar");
  let subjectAvatar = message.getFlag("pf2e-dorako-ui", "subjectAvatar");
  let userAvatar = game.settings.get("pf2e-dorako-ui", "avatar.use-user-avatar")
    ? message.getFlag("pf2e-dorako-ui", "userAvatar")
    : null;

  if (
    game.settings.get("pf2e-dorako-ui", "avatar.hide-when-token-hidden") &&
    message.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  ) {
    return null;
  }

  if (combatantAvatar) return combatantAvatar;

  return source == "token"
    ? subjectAvatar || tokenAvatar || actorAvatar || userAvatar
    : actorAvatar || subjectAvatar || tokenAvatar || userAvatar;
}

// Add avatar if message contains avatar data
Hooks.on("renderChatMessage", (message, b) => {
  let avatar = getAvatar(message);
  if (!avatar) {
    let messageHeader = b[0].getElementsByClassName("message-header")[0];
    // messageHeader.classList.add("with-image");
    messageHeader.classList.add("no-image");
    return;
  }
  let html = b[0];
  let messageHeader = b[0].getElementsByClassName("message-header")[0];
  messageHeader.classList.add("with-image");

  let avatarElem = html.getElementsByClassName("portrait dorako")[0];
  if (!avatarElem) return;

  let avatarImgElement = document.createElement("img");
  avatarImgElement.src = avatar.image;
  avatarElem.append(avatarImgElement);
  // avatarElem.src = avatar.image;

  // const smallScale = game.settings.get("pf2e-dorako-ui", "avatar.small-creature-token-avatar-size");
  const smallScale = 1;
  let smallCorrection = avatar.isSmall ? 1.25 * smallScale : 1;
  const newScale = Math.abs(avatar.scale) * smallCorrection;
  if (avatar.scale > 2) {
    avatarImgElement.style.maskImage = `radial-gradient(circle, black 24%, rgba(0, 0, 0, 0.2) 30%)`;
  }

  if (avatar.type == "token") {
    avatarImgElement.style.transform = "scale(" + newScale * 1 + ")";
  }

  if (avatar.type == "subject-texture") {
    avatarImgElement.style.transform = "scale(" + newScale * 1 + ")";

    const svgCode = `
      <defs>
        <radialGradient id="outer-ring" cx="0.35" cy="0.25" r="0.9">
          <stop offset="0%" stop-color="var(--dynamic-token-outer-ring-top-left-color)" />
          <stop offset="20%" stop-color="var(--dynamic-token-outer-ring-top-left-color)" />
          <stop offset="100%" stop-color="var(--dynamic-token-outer-ring-color)" />
        </radialGradient>
        <radialGradient id="inner-ring" cx="0.4" cy="0.33" r="0.8">
          <stop offset="0%" stop-color="var(--dynamic-token-inner-ring-top-left-color)" />
          <stop offset="20%" stop-color="var(--dynamic-token-inner-ring-top-left-color)" />
          <stop offset="100%" stop-color="var(--dynamic-token-inner-ring-color)" />
        </radialGradient>
         <radialGradient id="bg">
          <stop offset="0%" stop-color="var(--dynamic-token-background-color)" />
          <stop offset="80%" stop-color="var(--dynamic-token-background-color)" />
          <stop offset="100%" stop-color="var(--dynamic-token-background-outer-color)" />
        </radialGradient>
      </defs>
      <circle cx="50%" cy="50%" r="19.75" fill="url(#outer-ring)"></circle>
      <circle cx="50%" cy="50%" r="18.75" fill="url(#inner-ring)"></circle>
      <circle cx="50%" cy="50%" r="17.75" fill="var(--dynamic-token-dynamic-color)"></circle>
      <circle cx="50%" cy="50%" r="16.75" fill="url(#bg)"></circle>`;
    // let dynamicTokenRing = html.getElementsByClassName("dynamic-ring")[0];
    let dynamicTokenRing = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // viewBox="0 0 100 100" style="transform: scale(2.5); pointer-events: none;" class="dynamic-ring">
    dynamicTokenRing.innerHTML = svgCode;
    dynamicTokenRing.setAttribute("viewBox", "0 0 40 40");
    dynamicTokenRing.style.transform = "scale(" + 1 + ")";
    dynamicTokenRing.style.pointerEvents = "none";
    avatarElem.prepend(dynamicTokenRing);
    // let wrapper = html.getElementsByClassName("portrait-wrapper")[0];
    // wrapper.style.setProperty("margin", "6px");
  }
  avatarElem.style.filter = `drop-shadow(0px 1px 2px black)`;

  const portraitDegreeSetting = game.settings.get("pf2e-dorako-ui", "avatar.reacts-to-degree-of-success");

  if (portraitDegreeSetting && message.isContentVisible) {
    let outcome = message?.flags?.pf2e?.context?.outcome;
    if (outcome === undefined) return;
    if (outcome === "criticalFailure") {
      avatarElem.style.filter = `saturate(0.2) drop-shadow(0px 0px 6px black)`;
      // let wrapper = html.getElementsByClassName("portrait token dorako")[0];
      // wrapper?.setAttribute("style", "filter: saturate(0.2) drop-shadow(0px 0px 6px black)");
    } else if (outcome === "criticalSuccess") {
      avatarElem.style.filter = `drop-shadow(0px 0px 6px lightgreen)`;
      // let wrapper = html.getElementsByClassName("portrait token dorako")[0];
      // wrapper?.setAttribute("style", "filter: drop-shadow(0px 0px 6px lightgreen)");
    }
  }
});

// Add .spell to spells
Hooks.on("renderChatMessage", (app, html, data) => {
  const item = app?.item;
  if (!item) return;
  if (!item.constructor.name.includes("SpellPF2e")) return;
  html[0].classList.add("spell");
});
