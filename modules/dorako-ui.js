import * as util from './util.js';

// second return value is whether the first value can be styled as pf2e-icon
function getActionGlyph(actionCost) {
  // console.log(actionCost);
  if (actionCost === "1 to 3") return ["1 / 2 / 3", true];
  if (actionCost === "1 or 2") return ["1 / 2", true];
  if (actionCost === "2 or 3") return ["2 / 3", true];
  if (actionCost.type === "action") {
    return [actionCost.value, true];
  } else if (actionCost.type === "reaction") return ["R", true];
  else if (actionCost.type === "free") return ["F", true];
  else if (actionCost.length === 1) return [actionCost, true];
  else return [actionCost, false];
}

function injectSheetTheme(sheet, html) {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.app-sheet-theme");
  if (theme === "default") return;
  
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(theme);
}

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

Hooks.on("renderNPCSheetPF2e", (sheet, html) => {
  const npcTheme = game.settings.get("pf2e-dorako-ui", "theme.npc-sheet-theme");
  if (npcTheme === "default") return;
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(npcTheme);
  // console.log(sheet);
  const acDetails = sheet.object.attributes.ac.details;
  const collapseAc = acDetails === "";
  // console.log({ collapseAc });
  const hpDetails = sheet.object.attributes.hp.details;
  const hpTemp = sheet.object.attributes.hp.temp;
  const collapseHp = hpDetails === "" && hpTemp === 0;
  // console.log({ collapseHp });
  const collapseInitiative = sheet.object.attributes.initiative.ability === "perception";
  // console.log({ collapseInitiative });
  const collapseToggles = sheet.object.system.toggles.length === 0;
  // console.log({ collapseToggles });
  const collapseSaves = sheet.object.system.attributes.allSaves.value === "";

  // console.log(sheet.object);
  const immunities = sheet.object.system.attributes.immunities;
  const collapseImmunities = immunities.length === 0 && immunities.custom === "";
  const weaknesses = sheet.object.system.attributes.weaknesses;
  const collapseWeaknesses = weaknesses.length === 0;
  const resistances = sheet.object.system.attributes.resistances;
  const collapseResistances = resistances.length === 0;

  // console.log({ immunities });
  // console.log({ weaknesses });
  // console.log({ resistances });

  if (collapseAc) {
    let section = html.find(".armor-section")[0];
    section.classList.add("collapsed");
  }

  if (collapseHp) {
    let section = html.find(".health-section")[0];
    section.classList.add("collapsed");
  }

  if (collapseInitiative) {
    let section = html.find(".initiative")[0];
    section.classList.add("collapsed");
  }

  if (collapseToggles) {
    let section = html.find(".toggles")[0];
    section.classList.add("dorako-display-none");
  }

  if (collapseImmunities) {
    let section = html.find(".immunities")[0];
    section.classList.add("collapsed", "empty");
  }

  if (collapseWeaknesses) {
    let section = html.find(".weaknesses")[0];
    section.classList.add("collapsed", "empty");
  }

  if (collapseResistances) {
    let section = html.find(".resistances")[0];
    section.classList.add("collapsed", "empty");
  }

  let saves = html.find(".saves")[0];
  let saveDetails = html.find(".save-details")[0];
  saveDetails.classList.remove("side-bar-section");

  let initiative = html.find(".initiative")[0];
  let newSaves = document.createElement("div");
  newSaves.classList.add("saves-section", "side-bar-section");
  newSaves.appendChild(saves);
  newSaves.appendChild(saveDetails);
  initiative.parentNode.insertBefore(newSaves, initiative.nextSibling);

  if (collapseSaves) {
    let section = html.find(".saves-section")[0];
    section.classList.add("collapsed");
  }
});

Hooks.on("renderLootSheetPF2e", (sheet, html) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.loot-sheet-theme");
  if (theme === "default") return;
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  html0.classList.add(theme);
});


Hooks.on("getItemSheetPF2eHeaderButtons", (sheet, buttons) => {
  if (!game.settings.get("pf2e-dorako-ui", "misc.send-to-chat")) {
    return;
  }

  buttons.unshift({
    label: util.i18n("pf2e-dorako-ui.text.send-to-chat"),
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

// Hooks
// Combat Tracker
Hooks.on("renderCombatTracker", addScalingToCombatTrackerAvatars);

// Chat cards
Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
  const isNarratorToolsMessage = chatMessage.flags["narrator-tools"];
  const isRoundMarker = chatMessage.flags["monks-little-details"]?.roundmarker;
  if (isNarratorToolsMessage || isRoundMarker) {
    return;
  }

  let html0 = html[0];

  if (game.settings.get("pf2e-dorako-ui", "ux.restructure-card-info")) {
      let uuid = chatMessage?.flags?.pf2e?.origin?.uuid;
      if (uuid) {
        try {
          let origin = fromUuidSync(uuid);
          let actionCost = origin?.actionCost;
          if (actionCost) injectActionCost(html, actionCost);
          if (origin?.type === "spell") injectSpellInfo(html, origin);
        } catch (error) {
          // An error is thrown if the UUID is a reference to something that is not loaded, like an actor in a compendium.
        }
      }
  }

  injectSenderWrapper(html, messageData);
  injectMessageTag(html, messageData);
  injectWhisperParticipants(html, messageData);
  injectAuthorName(html, messageData);

  if (
    game.settings.get("pf2e-dorako-ui", "avatar.hide-when-token-hidden") &&
    chatMessage.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  ) {
  } else {
    injectAvatar(html, getAvatar(chatMessage));
  }
  moveFlavorTextToContents(html);

  const theme = game.settings.get("pf2e-dorako-ui", "theme.chat-theme");

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

Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
  if (!game.settings.get("pf2e-dorako-ui", "ux.remove-attack-info-from-damage-roll-messages")) return;

  if (chatMessage?.isDamageRoll && chatMessage?._strike) {
    html[0].classList.add("dorako-damage-roll");
    let flavor = html.find(".flavor-text");
    flavor.each(function () {
      $(this).contents().eq(1).wrap("<span/>");
    });
  }
});

// "Be last" magic trick. Should ensure that any other modules that modify, say, who spoke the message, have done so before you add the flags.
Hooks.once("ready", () => {
  Hooks.on("preCreateChatMessage", (message) => {
    addAvatarsToFlags(message);
    message.updateSource({
      "flags.pf2e-dorako-ui.wasTokenHidden": message?.token?.hidden,
    });
  });
  Hooks.on("updateChatMessage", (message) => {
    addAvatarsToFlags(message);
  });
});

function themeHeader(html, message) {
  let messageHeader = html.find(".message-header")[0];

  const headerStyle = game.settings.get("pf2e-dorako-ui", "theme.header-style");
  if (headerStyle != "none") {
    let bgCol = getHeaderColor(html, message);
    messageHeader.setAttribute("style", "background-color: " + bgCol);
    messageHeader.classList.add("dorako-header");
  }

  let textColTheme = calcHeaderTextColor(html, message);
  messageHeader.classList.add(textColTheme);

  // some modules add different timestamps and hide the original, like dfce-simple-timestamp
  let time = html.find("time")[0];
  if (time) {
    time.classList.add("header-meta");
  }
}

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

function injectActionCost(html, actionCost) {
  if (!actionCost) return;
  const [actionGlyph, shouldBeStyled] = getActionGlyph(actionCost);
  if (!actionGlyph) return;

  // console.log("Injecting actionGlyph %s", actionGlyph);
  let messageHeader = html.find(".card-header")[0];
  let actionGlyphText = document.createElement("h3");
  if (shouldBeStyled) actionGlyphText.classList.add("pf2-icon");
  actionGlyphText.textContent = actionGlyph;
  messageHeader.append(actionGlyphText);
}

function localizeComponent(componentKey) {
  if (componentKey === "focus") return util.i18n("PF2E.SpellComponentF");
  if (componentKey === "material") return util.i18n("PF2E.SpellComponentM");
  if (componentKey === "somatic") return util.i18n("PF2E.SpellComponentS");
  if (componentKey === "verbal") return util.i18n("PF2E.SpellComponentV");
}

function spellComponentsToText(components) {
  // console.log(components);
  const asArray = Object.entries(components);
  // console.log(asArray);
  const filtered = asArray.filter(([key, value]) => value);
  // console.log(filtered);
  const localized = filtered.map(([key, value]) => localizeComponent(key));
  // console.log(localized);
  const combined = localized.join(", ");
  return " " + combined.toLowerCase();
}

function injectSpellInfo(html, spell) {
  if (!spell) return;
  let messageHeader = html.find(".card-content")[0];
  let spellInfo = document.createElement("div");
  spellInfo.classList.add("spell-info");
  // console.log(spell);

  // Cast info
  let castInfo = document.createElement("p");
  let castInfoLabel = document.createElement("strong");
  castInfoLabel.textContent = util.i18n("PF2E.SpellCostLabel") + " ";
  let castTime = document.createElement("span");
  const [cost, shouldBeGlyph] = getActionGlyph(spell?.system?.time?.value);
  castTime.textContent = cost;
  if (shouldBeGlyph) castTime.classList.add("pf2-icon");
  let castComponents = document.createElement("span");
  castComponents.textContent = spellComponentsToText(spell?.system?.components);
  castInfo.append(castInfoLabel);
  castInfo.append(castTime);
  castInfo.append(castComponents);
  spellInfo.append(castInfo);

  // Duration info
  let duration = spell?.system?.duration?.value;
  if (duration) {
    // console.log(duration);
    let durationInfo = document.createElement("p");
    let durationInfoLabel = document.createElement("strong");
    durationInfoLabel.textContent = util.i18n("PF2E.SpellDurationLabel") + " ";
    let durationValue = document.createElement("span");
    durationValue.textContent = duration;
    durationInfo.append(durationInfoLabel);
    durationInfo.append(durationValue);
    spellInfo.append(durationInfo);
  }

  // Target info
  let target = spell?.system?.target?.value;
  if (target) {
    // console.log(target);
    let targetInfo = document.createElement("p");
    let targetInfoLabel = document.createElement("strong");
    targetInfoLabel.textContent = util.i18n("PF2E.SpellTargetLabel") + " ";
    let targetValue = document.createElement("span");
    targetValue.textContent = target;
    targetInfo.append(targetInfoLabel);
    targetInfo.append(targetValue);
    spellInfo.append(targetInfo);
  }

  // Range info
  let range = spell?.system?.range?.value;
  if (range) {
    // console.log(range);
    let rangeInfo = document.createElement("p");
    let rangeInfoLabel = document.createElement("strong");
    rangeInfoLabel.textContent = util.i18n("PF2E.SpellRangeLabel") + " ";
    let rangeValue = document.createElement("span");
    rangeValue.textContent = range;
    rangeInfo.append(rangeInfoLabel);
    rangeInfo.append(rangeValue);
    spellInfo.append(rangeInfo);
  }

  // Area info
  let area = spell?.system?.area?.value;
  if (area) {
    // console.log(area);
    let areaInfo = document.createElement("p");
    let areaInfoLabel = document.createElement("strong");
    areaInfoLabel.textContent = util.i18n("PF2E.AreaLabel") + " ";
    let areaValue = document.createElement("span");
    areaValue.textContent = area + " " + util.i18n("PF2E.Foot").toLowerCase() + " " + spell?.system?.area?.type;
    areaInfo.append(areaInfoLabel);
    areaInfo.append(areaValue);
    spellInfo.append(areaInfo);
  }

  let hr = document.createElement("hr");

  // Heightening info
  let spellRightInfo = html.find(".card-header").find("h4")[0];
  let originalText = spellRightInfo.textContent;
  const [_, spellType, parsedLevel] = originalText.split(/(.*) (\d+)/);

  const baseLevel = spell?.baseLevel;
  const actualLevel = spell?.level;
  if (baseLevel != parsedLevel) {
    let heighteningInfo = document.createElement("h4");
    let spellTypeSpan = document.createElement("span");
    spellTypeSpan.textContent = spellType + " ";

    let originalLevel = document.createElement("s");
    originalLevel.textContent = baseLevel;

    let heightenedLevel = document.createElement("span");
    heightenedLevel.classList.add("heightened");
    heightenedLevel.textContent = " " + parsedLevel;

    heighteningInfo.append(spellTypeSpan);
    heighteningInfo.append(originalLevel);
    heighteningInfo.append(heightenedLevel);

    spellRightInfo.parentNode.replaceChild(heighteningInfo, spellRightInfo);
  }

  // Footer
  let footer = html.find(".card-footer")[0];
  if (footer) footer.classList.add("dorako-display-none");

  messageHeader.prepend(hr);
  messageHeader.prepend(spellInfo);
}

function injectAuthorName(html, messageData) {
  if (messageData.author === undefined) return;
  if (game.settings.get("pf2e-dorako-ui", "ux.enable-player-tags")) {
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
  const setting = game.settings.get("pf2e-dorako-ui", "ux.rolltype-indication");
  if (setting == "none") {
    return;
  } else if (setting == "tags" || setting == "both") {
    const messageMetadata = html.find(".message-metadata");

    const rolltype = $("<span>");
    rolltype.addClass("rolltype");
    rolltype.addClass("header-meta");

    const whisperTargets = messageData.message.whisper;

    const isBlind = messageData.message.blind;
    const isWhisper = whisperTargets?.length > 0;
    const isSelf = isWhisper && whisperTargets.length === 1 && whisperTargets[0] === messageData.message.user;
    const isRoll = messageData.message.rolls !== undefined;

    if (isBlind) {
      rolltype.text(util.i18n("pf2e-dorako-ui.text.secret"));
      messageMetadata.prepend(rolltype);
    } else if (isSelf && whisperTargets[0]) {
      rolltype.text(util.i18n("pf2e-dorako-ui.text.self-roll"));
      messageMetadata.prepend(rolltype);
    } else if (isRoll && isWhisper) {
      rolltype.text(util.i18n("pf2e-dorako-ui.text.gm-only"));
      messageMetadata.prepend(rolltype);
    } else if (isWhisper) {
      rolltype.text(util.i18n("pf2e-dorako-ui.text.whisper"));
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
    (isWhisper && whisperTargets.length === 1 && whisperTargets[0] === messageData.message.user) ||
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
  const fromText = titleCase(util.i18n("pf2e-dorako-ui.text.from"));
  whisperFrom.text(`${fromText}: ${alias}`);
  whisperFrom.addClass("header-meta");

  const whisperTo = $("<span>");
  const toText = titleCase(util.i18n("pf2e-dorako-ui.text.to")).toLowerCase();
  whisperTo.text(`${toText}: ${whisperTargetString}`);
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
    if (scale < 1 || (combatImagesActive && combatant.actor.getFlag("combat-tracker-images", "trackerImage"))) {
      scale = 1;
    }
    tokenImageElem.setAttribute("style", "transform: scale(" + Math.abs(scale) + ")");
  });
}

function getHeaderColor(html, message) {
  const headerStyle = game.settings.get("pf2e-dorako-ui", "theme.header-style");
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
  const headerStyle = game.settings.get("pf2e-dorako-ui", "theme.header-style");
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

  let combatantAvatar = combatantImg ? new CombatantAvatar(message.speaker.alias, combatantImg) : null;

  let actorAvatar = actorImg ? new ActorAvatar(message.speaker.alias, actorImg) : null;

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
  const source = game.settings.get("pf2e-dorako-ui", "avatar.source");
  if (source == "none") {
    return null;
  }

  let combatantAvatar = message.getFlag("pf2e-dorako-ui", "combatantAvatar");
  let tokenAvatar = message.getFlag("pf2e-dorako-ui", "tokenAvatar");
  let actorAvatar = message.getFlag("pf2e-dorako-ui", "actorAvatar");
  let userAvatar = game.settings.get("pf2e-dorako-ui", "avatar.use-user-avatar")
    ? message.getFlag("pf2e-dorako-ui", "userAvatar")
    : null;

  if (combatantAvatar) return combatantAvatar;

  if (
    game.settings.get("pf2e-dorako-ui", "avatar.hide-when-token-hidden") &&
    message.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  ) {
    return null;
  }

  return source == "token" ? tokenAvatar || actorAvatar || userAvatar : actorAvatar || tokenAvatar || userAvatar;
}

Hooks.on("renderChatMessage", (message, b) => {
  let avatar = getAvatar(message);
  if (!avatar) return;
  let html = b[0];

  let avatarElem = html.getElementsByClassName("avatar")[0];
  if (!avatarElem) return;

  avatarElem.src = avatar.image;

  if (avatar.type == "token") {
    const smallScale = game.settings.get("pf2e-dorako-ui", "avatar.small-creature-token-avatar-size");
    let smallCorrection = avatar.isSmall ? 1.25 * smallScale : 1;
    avatarElem?.setAttribute("style", "transform: scale(" + Math.abs(avatar.scale) * smallCorrection + ")");
  }

  const portraitDegreeSetting = game.settings.get("pf2e-dorako-ui", "avatar.reacts-to-degree-of-success");

  if (portraitDegreeSetting) {
    // console.log(message);
    let outcome = message?.flags?.pf2e?.context?.outcome;
    if (outcome == undefined) return;
    if (outcome === "criticalFailure") {
      let wrapper = html.getElementsByClassName("portrait-wrapper")[0];
      wrapper?.setAttribute("style", "filter: saturate(0.2) drop-shadow(0px 0px 6px black)");
    } else if (outcome === "criticalSuccess") {
      let wrapper = html.getElementsByClassName("portrait-wrapper")[0];
      wrapper?.setAttribute("style", "filter: drop-shadow(0px 0px 6px lightgreen)");
    }
  }
});