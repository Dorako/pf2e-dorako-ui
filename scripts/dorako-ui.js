function log(message) {
  message = `${CONSTANTS.MODULE_NAME} | ${message}`;
  console.log(message.replace("<br>", "\n"));
  return message;
}

function notify(message) {
  message = `${CONSTANTS.MODULE_NAME} | ${message}`;
  ui.notifications?.notify(message);
  console.log(message.replace("<br>", "\n"));
  return message;
}

function info(info, notify = false) {
  info = `${CONSTANTS.MODULE_NAME} | ${info}`;
  if (notify) ui.notifications?.info(info);
  console.log(info.replace("<br>", "\n"));
  return info;
}

function warn(warning, notify = false) {
  warning = `${CONSTANTS.MODULE_NAME} | ${warning}`;
  if (notify) ui.notifications?.warn(warning);
  console.warn(warning.replace("<br>", "\n"));
  return warning;
}

function error(error, notify = true) {
  error = `${CONSTANTS.MODULE_NAME} | ${error}`;
  if (notify) ui.notifications?.error(error);
  return new Error(error.replace("<br>", "\n"));
}

const i18n = (key) => {
  return game.i18n.localize(key)?.trim();
};

const i18nFormat = (key, data) => {
  return game.i18n.format(key, data)?.trim();
};

function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

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

const debouncedReload = foundry.utils.debounce(() => window.location.reload(), 500);

function addClassByQuerySelector(className, selector) {
  let navigation = document.querySelector(selector);
  navigation.classList.add(className);
}

function injectCSS(filename) {
  const head = document.getElementsByTagName("head")[0];
  const mainCss = document.createElement("link");
  mainCss.setAttribute("rel", "stylesheet");
  mainCss.setAttribute("type", "text/css");
  mainCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/" + filename + ".css");
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

Hooks.on("renderNPCSheetPF2e", (sheet, html) => {
  const npcTheme = game.settings.get("pf2e-dorako-ui", "npc-sheet-theme");
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

  // console.log(sheet.object.system.traits);
  const immunities = sheet.object.system.traits.di;
  const collapseImmunities = immunities.value.length === 0 && immunities.custom === "";
  const weaknesses = sheet.object.system.traits.dv;
  const collapseWeaknesses = weaknesses.length === 0;
  const resistances = sheet.object.system.traits.dr;
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
  // console.log({ saves });
  // console.log({ saveDetails });

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
  const theme = game.settings.get("pf2e-dorako-ui", "loot-sheet-theme");
  if (theme === "default") return;
  let html0 = html[0];
  html0.classList.add("dorako-theme");
  // html0.classList.add(npcTheme);
});

// Hooks.on("renderItemSheetPF2e", (sheet, html) => {
// });

Hooks.on("getItemSheetPF2eHeaderButtons", (sheet, buttons) => {
  if (!game.settings.get("pf2e-dorako-ui", "send-to-chat")) {
    return;
  }

  buttons.unshift({
    label: i18n("dorako-ui.text.send-to-chat"),
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

  if (game.settings.get("pf2e-dorako-ui", "restructure-card-info")) {
    if (!chatMessage.isRoll) {
      let uuid = chatMessage?.flags?.pf2e?.origin?.uuid;
      // console.log(uuid);
      if (uuid) {
        let origin = fromUuidSync(uuid);
        // console.log(origin);
        let actionCost = origin?.actionCost;
        if (actionCost) injectActionCost(html, actionCost);
        if (origin?.type === "spell") injectSpellInfo(html, origin);
      }
    }
  }

  injectSenderWrapper(html, messageData);
  injectMessageTag(html, messageData);
  injectWhisperParticipants(html, messageData);
  injectAuthorName(html, messageData);

  if (
    game.settings.get("pf2e-dorako-ui", "hide-avatar-when-hidden") &&
    chatMessage.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  ) {
  } else {
    injectAvatar(html, getAvatar(chatMessage));
  }
  moveFlavorTextToContents(html);

  const theme = game.settings.get("pf2e-dorako-ui", "chat-theme");

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
  if (!game.settings.get("pf2e-dorako-ui", "remove-attack-info-from-damage-roll-messages")) return;

  if (chatMessage?.isDamageRoll && chatMessage?._strike) {
    html[0].classList.add("dorako-damage-roll");
    let flavor = html.find(".flavor-text");
    flavor.each(function () {
      $(this).contents().eq(1).wrap("<span/>");
    });
  }
});

// // Combine attack and damage rolls from same source
// Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
//   if (!game.settings.get("pf2e-dorako-ui", "combine-attack-and-damage-roll-messages")) return;

//   if (chatMessage.flags["narrator-tools"]) {
//     return;
//   }

//   const chatLength = game.messages?.contents.length ?? 0;
//   if (chatLength <= 1) return;
//   if (chatMessage?.isDamageRoll) {
//     let recentIndex = -2;
//     let mostRecent = game.messages?.contents.at(recentIndex);
//     while (
//       mostRecent?.flags?.["pf2-flat-check"] ||
//       mostRecent?.flags?.["pf2e-flat-check"] ||
//       mostRecent?.flags?.["pf2e-ranged-combat"]
//     ) {
//       recentIndex -= 1;
//       mostRecent = game.messages?.contents.at(recentIndex);
//     }
//     const isDamageAfterAttack = mostRecent?.flags?.pf2e?.context?.type === "attack-roll";
//     if (isDamageAfterAttack) {
//       const mostRecentSource = mostRecent?.flags?.pf2e?.origin?.uuid ?? "a";
//       const currentSource = chatMessage?.flags?.pf2e?.origin?.uuid ?? "b";
//       const isSameSource = mostRecentSource === currentSource;
//       if (isSameSource) {
//         html[0].classList.add("dorako-damage-roll");
//         let header = html.find(".message-header")[0];
//         if (header) header.classList.add("dorako-display-none");
//         let tags = html.find(".tags")[0];
//         if (tags) tags.remove();

//         // let flavorText = html.find(".flavor-text")[0];
//         // flavorText.innerHTML = tags.outerHTML;
//       }
//     }
//   }
// });

// Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
//   if (!game.settings.get("pf2e-dorako-ui", "combine-attack-and-damage-roll-messages")) return;

//   if (chatMessage.flags["narrator-tools"]) {
//     return;
//   }

//   if (chatMessage?.flags?.pf2e?.context?.type === "attack-roll") {
//     html[0].classList.add("dorako-attack-roll");
//   }
// });

// Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
//   if (!game.settings.get("pf2e-dorako-ui", "combine-attack-and-damage-roll-messages")) return;
//   if (chatMessage.flags["narrator-tools"]) return;

//   const chatLength = game.messages?.contents.length ?? 0;
//   if (chatLength <= 2) return;
//   let mostRecent2 = game.messages?.contents.at(-2); // -1 is newest, -2 should be 'one earlier', not sure why -3 is needed for it to work
//   let mostRecent3 = game.messages?.contents.at(-3); // -1 is newest, -2 should be 'one earlier', not sure why -3 is needed for it to work
//   // console.log({ mostRecent2 });
//   // console.log({ mostRecent3 });
//   const mostRecentIsAttack =
//     mostRecent2?.flags?.pf2e?.context?.type === "attack-roll" ||
//     mostRecent3?.flags?.pf2e?.context?.type === "attack-roll";
//   // console.log({ mostRecentIsAttack });
//   const isFlatCheck = chatMessage?.flags?.["pf2-flat-check"] || chatMessage?.flags?.["pf2e-flat-check"];
//   // console.log({ isFlatCheck });

//   if (isFlatCheck && mostRecentIsAttack) {
//     html[0].classList.add("dorako-flat-check");
//     let header = html.find(".message-header")[0];
//     if (header) header.classList.add("dorako-display-none");
//   }
// });

// Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
//   if (!game.settings.get("pf2e-dorako-ui", "combine-attack-and-damage-roll-messages")) return;
//   if (chatMessage.flags["narrator-tools"]) return;

//   const chatLength = game.messages?.contents.length ?? 0;
//   if (chatLength <= 4) return;
//   let mostRecent2 = game.messages?.contents.at(-2); // -1 is newest, -2 should be 'one earlier', not sure why -3 is needed for it to work
//   let mostRecent3 = game.messages?.contents.at(-3); // -1 is newest, -2 should be 'one earlier', not sure why -3 is needed for it to work
//   let mostRecent4 = game.messages?.contents.at(-4); // -1 is newest, -2 should be 'one earlier', not sure why -3 is needed for it to work

//   // console.log({ mostRecent2 });
//   // console.log({ mostRecent3 });
//   const mostRecentIsAttack =
//     mostRecent2?.flags?.pf2e?.context?.type === "attack-roll" ||
//     mostRecent3?.flags?.pf2e?.context?.type === "attack-roll" ||
//     mostRecent4?.flags?.pf2e?.context?.type === "attack-roll";

//   // console.log({ mostRecentIsAttack });
//   const isRangedCombat = chatMessage?.flags?.["pf2e-ranged-combat"];
//   // console.log({ isRangedCombat });

//   if (isRangedCombat && mostRecentIsAttack) {
//     html[0].classList.add("dorako-ranged-combat");
//     let header = html.find(".message-header")[0];
//     if (header) header.classList.add("dorako-display-none");
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
});

function themeHeader(html, message) {
  let messageHeader = html.find(".message-header")[0];

  const headerStyle = game.settings.get("pf2e-dorako-ui", "header-style");
  if (headerStyle != "none") {
    let bgCol = getHeaderColor(html, message);
    messageHeader.setAttribute("style", "background-color: " + bgCol);
  }

  let textColTheme = calcHeaderTextColor(html, message);
  messageHeader.classList.add(textColTheme);

  // some modules add different timestamps and hide the original, like dfce-simple-timestamp
  let time = html.find("time")[0];
  if (time) {
    time.classList.add("header-meta");
  }
  // let dfceTime = html.find(".dfce-simple-timestamp")[0];
  // if (dfceTime) {
  //   dfceTime.classList.add("header-meta");
  // }
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
  if (componentKey === "focus") return i18n("PF2E.SpellComponentF");
  if (componentKey === "material") return i18n("PF2E.SpellComponentM");
  if (componentKey === "somatic") return i18n("PF2E.SpellComponentS");
  if (componentKey === "verbal") return i18n("PF2E.SpellComponentV");
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
  castInfoLabel.textContent = i18n("PF2E.SpellCostLabel") + " ";
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
    durationInfoLabel.textContent = i18n("PF2E.SpellDurationLabel") + " ";
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
    targetInfoLabel.textContent = i18n("PF2E.SpellTargetLabel") + " ";
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
    rangeInfoLabel.textContent = i18n("PF2E.SpellRangeLabel") + " ";
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
    areaInfoLabel.textContent = i18n("PF2E.AreaLabel") + " ";
    let areaValue = document.createElement("span");
    areaValue.textContent = area + " " + i18n("PF2E.Foot").toLowerCase() + " " + spell?.system?.area?.type;
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

    const isBlind = messageData.message.blind;
    const isWhisper = whisperTargets?.length > 0;
    const isSelf = isWhisper && whisperTargets.length === 1 && whisperTargets[0] === messageData.message.user;
    const isRoll = messageData.message.rolls !== undefined;

    if (isBlind) {
      rolltype.text(i18n("dorako-ui.text.secret"));
      messageMetadata.prepend(rolltype);
    } else if (isSelf && whisperTargets[0]) {
      rolltype.text(i18n("dorako-ui.text.self-roll"));
      messageMetadata.prepend(rolltype);
    } else if (isRoll && isWhisper) {
      rolltype.text(i18n("dorako-ui.text.gm-only"));
      messageMetadata.prepend(rolltype);
    } else if (isWhisper) {
      rolltype.text(i18n("dorako-ui.text.whisper"));
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
  const fromText = titleCase(i18n("dorako-ui.text.from"));
  whisperFrom.text(`${fromText}: ${alias}`);
  whisperFrom.addClass("header-meta");

  const whisperTo = $("<span>");
  const toText = titleCase(i18n("dorako-ui.text.to")).toLowerCase();
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
    tokenImageElem.setAttribute("style", "transform: scale(" + scale + ")");
  });
}

function getHeaderColor(html, message) {
  const headerStyle = game.settings.get("pf2e-dorako-ui", "header-style");
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
  const headerStyle = game.settings.get("pf2e-dorako-ui", "header-style");
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
  const main = game.settings.get("pf2e-dorako-ui", "use-avatars");
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
    game.settings.get("pf2e-dorako-ui", "hide-avatar-when-hidden") &&
    message.getFlag("pf2e-dorako-ui", "wasTokenHidden")
  ) {
    return null;
  }

  return main == "token" ? tokenAvatar || actorAvatar || userAvatar : actorAvatar || tokenAvatar || userAvatar;
}

Hooks.on("renderChatMessage", (message, b) => {
  let avatar = getAvatar(message);
  if (!avatar) return;
  let html = b[0];

  const avatarElem = html.getElementsByClassName("avatar")[0];
  avatarElem.src = avatar.image;

  if (avatar.type == "token") {
    const smallScale = game.settings.get("pf2e-dorako-ui", "small-creature-token-avatar-size");
    let smallCorrection = avatar.isSmall ? 1.25 * smallScale : 1;
    avatarElem?.setAttribute("style", "transform: scale(" + avatar.scale * smallCorrection + ")");
  }

  const portraitDegreeSetting = game.settings.get("pf2e-dorako-ui", "avatar-reacts-to-degree-of-success");

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

function registerColorSettings() {
  const backgroundColor = {
    key: "background",
    name: "background-color",
    hint: "color of the background",
    scope: "client",
    restricted: false,
    default: "rgba(20, 20, 20, 0.60)",
    onChange: (value) => {
      document.querySelector(":root").style.setProperty("--dorako-bg-current", value);
      updateFunc(value);
    },
  };

  // const primaryColor = {
  //   key: "primary",
  //   name: "primary-color",
  //   hint: "primary accent color",
  //   scope: "client",
  //   restricted: false,
  //   default: "rgba(20, 20, 20, 0.60)",
  //   onChange: (value) => {
  //     document
  //       .querySelector(":root")
  //       .style.setProperty("--dorako-bg-current", value);
  //     updateFunc(value);
  //   },
  // };

  // const secondaryColor = {
  //   key: "secondary",
  //   name: "secondary-color",
  //   hint: "secondary accent color",
  //   scope: "client",
  //   restricted: false,
  //   default: "#00000000",
  //   onChange: (value) => {
  //     document
  //       .querySelector(":root")
  //       .style.setProperty("--dorako-bg-current", value);
  //     updateFunc(value);
  //   },
  // };

  const pickerOptions = {
    format: "hexa",
    alphaChannel: true,
  };

  ColorPicker.register(
    "pf2e-dorako-ui",
    backgroundColor.key,
    {
      name: backgroundColor.name,
      hint: backgroundColor.hint,
      scope: backgroundColor.scope,
      restricted: backgroundColor.restricted,
      default: backgroundColor.default,
      onChange: backgroundColor.onChange,
    },
    pickerOptions
  );
}

// "requires": [
//   {
//     "id": "color-picker",
//     "reason": "To set colors within this module's settings.",
//     "type": "module",
//     "compatibility": {}
//   }
// ]

// Hooks.once("colorPickerReady", () => {
//   registerColorSettings();
// });

Hooks.once("init", async () => {
  // game.settings.register("pf2e-dorako-ui", "primary-hue", {
  //   name: "primary hue",
  //   hint: "Default is 0 (red)",
  //   scope: "client",
  //   config: true,
  //   type: Number,
  //   default: 0,
  //   range: {
  //     min: 00,
  //     max: 360,
  //     step: 1,
  //   },
  //   onChange: (value) => {
  //     document.querySelector(":root").style.setProperty("--primary-hue", value);
  //     updateFunc(value);
  //   },
  // });

  // game.settings.register("pf2e-dorako-ui", "secondary-hue", {
  //   name: "secondary hue",
  //   hint: "Default is 234 (blue)",
  //   scope: "client",
  //   config: true,
  //   type: Number,
  //   default: 234,
  //   range: {
  //     min: 0,
  //     max: 360,
  //     step: 1,
  //   },
  //   onChange: (value) => {
  //     document.querySelector(":root").style.setProperty("--secondary-hue", value);
  //     updateFunc(value);
  //   },
  // });

  game.settings.register("pf2e-dorako-ui", "pc-sheet-theme", {
    name: i18n("dorako-ui.settings.pc-sheet-theme.name"),
    hint: i18n("dorako-ui.settings.pc-sheet-theme.hint"),
    scope: "client",
    config: true,
    default: "red",
    type: String,
    choices: {
      red: i18n("dorako-ui.settings.pc-sheet-theme.choice.red"),
      dark: i18n("dorako-ui.settings.pc-sheet-theme.choice.dark"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "npc-sheet-theme", {
    name: i18n("dorako-ui.settings.npc-sheet-theme.name"),
    hint: i18n("dorako-ui.settings.npc-sheet-theme.hint"),
    scope: "client",
    config: true,
    default: "light-theme",
    type: String,
    choices: {
      default: i18n("dorako-ui.settings.npc-sheet-theme.choice.default"),
      "light-theme": i18n("dorako-ui.settings.npc-sheet-theme.choice.light"),
      "dark-theme": i18n("dorako-ui.settings.npc-sheet-theme.choice.dark"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "loot-sheet-theme", {
    name: i18n("dorako-ui.settings.loot-sheet-theme.name"),
    hint: i18n("dorako-ui.settings.loot-sheet-theme.hint"),
    scope: "client",
    config: true,
    default: "light-theme",
    type: String,
    choices: {
      default: i18n("dorako-ui.settings.loot-sheet-theme.choice.default"),
      "light-theme": i18n("dorako-ui.settings.loot-sheet-theme.choice.light"),
      // "dark-theme": i18n("dorako-ui.settings.loot-sheet-theme.choice.dark"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "familiar-sheet-theme", {
    name: i18n("dorako-ui.settings.familiar-sheet-theme.name"),
    hint: i18n("dorako-ui.settings.familiar-sheet-theme.hint"),
    scope: "client",
    config: true,
    default: "red",
    type: String,
    choices: {
      red: i18n("dorako-ui.settings.familiar-sheet-theme.choice.red"),
      dark: i18n("dorako-ui.settings.familiar-sheet-theme.choice.dark"),
      darkRedHeader: i18n("dorako-ui.settings.familiar-sheet-theme.choice.dark-red-header"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-theme", {
    name: i18n("dorako-ui.settings.chat-theme.name"),
    hint: i18n("dorako-ui.settings.chat-theme.hint"),
    scope: "client",
    config: true,
    default: "Light",
    type: String,
    choices: {
      light: i18n("dorako-ui.settings.chat-theme.choice.light"),
      dark: i18n("dorako-ui.settings.chat-theme.choice.dark"),
      factions: i18n("dorako-ui.settings.chat-theme.choice.factions"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "header-style", {
    name: i18n("dorako-ui.settings.header-style.name"),
    hint: i18n("dorako-ui.settings.header-style.hint"),
    scope: "client",
    config: true,
    default: "none",
    type: String,
    choices: {
      red: i18n("dorako-ui.settings.header-style.choice.red"),
      blue: i18n("dorako-ui.settings.header-style.choice.blue"),
      tint: i18n("dorako-ui.settings.header-style.choice.tint"),
      none: i18n("dorako-ui.settings.header-style.choice.none"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "use-avatars", {
    name: i18n("dorako-ui.settings.use-avatars.name"),
    hint: i18n("dorako-ui.settings.use-avatars.hint"),
    scope: "client",
    config: true,
    default: "token",
    type: String,
    choices: {
      token: i18n("dorako-ui.settings.use-avatars.choice.token"),
      actor: i18n("dorako-ui.settings.use-avatars.choice.actor"),
      none: i18n("dorako-ui.settings.use-avatars.choice.none"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "hide-gm-avatar-when-secret", {
    name: i18n("dorako-ui.settings.hide-gm-avatar-when-secret.name"),
    hint: i18n("dorako-ui.settings.hide-gm-avatar-when-secret.hint"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "hide-avatar-when-hidden", {
    name: i18n("dorako-ui.settings.hide-avatar-when-hidden.name"),
    hint: i18n("dorako-ui.settings.hide-avatar-when-hidden.hint"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "avatar-size", {
    name: i18n("dorako-ui.settings.avatar-size.name"),
    hint: i18n("dorako-ui.settings.avatar-size.hint"),
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

  game.settings.register("pf2e-dorako-ui", "popout-token-avatars", {
    name: i18n("dorako-ui.settings.popout-token-avatars.name"),
    hint: i18n("dorako-ui.settings.popout-token-avatars.hint"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "avatar-reacts-to-degree-of-success", {
    name: i18n("dorako-ui.settings.avatar-reacts-to-degree-of-success.name"),
    hint: i18n("dorako-ui.settings.avatar-reacts-to-degree-of-success.hint"),
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "small-creature-token-avatar-size", {
    name: i18n("dorako-ui.settings.small-creature-token-avatar-size.name"),
    hint: i18n("dorako-ui.settings.small-creature-token-avatar-size.hint"),
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
  });

  game.settings.register("pf2e-dorako-ui", "use-user-avatar", {
    name: i18n("dorako-ui.settings.use-user-avatar.name"),
    hint: i18n("dorako-ui.settings.use-user-avatar.hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "avatar-border", {
    name: i18n("dorako-ui.settings.avatar-border.name"),
    hint: i18n("dorako-ui.settings.avatar-border.hint"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "chat-input-height", {
    name: i18n("dorako-ui.settings.chat-input-height.name"),
    hint: game.modules.get("CautiousGamemastersPack")?.active
      ? i18n("dorako-ui.settings.chat-input-height.CGMPhint")
      : i18n("dorako-ui.settings.chat-input-height.hint"),
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
    name: i18n("dorako-ui.settings.enable-player-tags.name"),
    hint: i18n("dorako-ui.settings.enable-player-tags.hint"),
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "rolltype-indication", {
    name: i18n("dorako-ui.settings.rolltype-indication.name"),
    hint: i18n("dorako-ui.settings.rolltype-indication.hint"),
    scope: "client",
    type: String,
    default: "both",
    config: true,
    choices: {
      tags: i18n("dorako-ui.settings.rolltype-indication.choice.tags"),
      "bg-color": i18n("dorako-ui.settings.rolltype-indication.choice.bg-color"),
      both: i18n("dorako-ui.settings.rolltype-indication.choice.both"),
      none: i18n("dorako-ui.settings.rolltype-indication.choice.none"),
    },
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "send-to-chat", {
    name: i18n("dorako-ui.settings.send-to-chat.name"),
    hint: i18n("dorako-ui.settings.send-to-chat.hint"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "restructure-card-info", {
    name: i18n("dorako-ui.settings.restructure-card-info.name"),
    hint: i18n("dorako-ui.settings.restructure-card-info.hint"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  // game.settings.register("pf2e-dorako-ui", "combine-attack-and-damage-roll-messages", {
  //   name: i18n("dorako-ui.settings.combine-attack-and-damage-roll-messages.name"),
  //   hint: i18n("dorako-ui.settings.combine-attack-and-damage-roll-messages.hint"),
  //   scope: "world",
  //   type: Boolean,
  //   default: true,
  //   config: true,
  //   onChange: () => {
  //     debouncedReload();
  //   },
  // });

  game.settings.register("pf2e-dorako-ui", "remove-attack-info-from-damage-roll-messages", {
    name: i18n("dorako-ui.settings.remove-attack-info-from-damage-roll-messages.name"),
    hint: i18n("dorako-ui.settings.remove-attack-info-from-damage-roll-messages.hint"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "compact-ui", {
    name: i18n("dorako-ui.settings.compact-ui.name"),
    hint: i18n("dorako-ui.settings.compact-ui.hint"),
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "no-logo", {
    name: i18n("dorako-ui.settings.no-logo.name"),
    hint: i18n("dorako-ui.settings.no-logo.hint"),
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "no-chat-control-icon", {
    name: i18n("dorako-ui.settings.no-chat-control-icon.name"),
    hint: i18n("dorako-ui.settings.no-chat-control-icon.hint"),
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "backdrop-filter", {
    name: i18n("dorako-ui.settings.backdrop-filter.name"),
    hint: i18n("dorako-ui.settings.backdrop-filter.hint"),
    scope: "client",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "center-hotbar", {
    name: i18n("dorako-ui.settings.center-hotbar.name"),
    hint: i18n("dorako-ui.settings.center-hotbar.hint"),
    scope: "client",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "edge-offset", {
    name: i18n("dorako-ui.settings.edge-offset.name"),
    hint: i18n("dorako-ui.settings.edge-offset.hint"),
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
    name: i18n("dorako-ui.settings.skin-chat.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-navigation", {
    name: i18n("dorako-ui.settings.skin-navigation.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-hotbar", {
    name: i18n("dorako-ui.settings.skin-hotbar.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-controls", {
    name: i18n("dorako-ui.settings.skin-controls.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-token-hud", {
    name: i18n("dorako-ui.settings.skin-token-hud.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-effect-panel", {
    name: i18n("dorako-ui.settings.skin-effect-panel.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-sidebar", {
    name: i18n("dorako-ui.settings.skin-sidebar.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-app-ui", {
    name: i18n("dorako-ui.settings.skin-app-ui.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debounceReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-combat-tracker", {
    name: i18n("dorako-ui.settings.skin-combat-tracker.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-custom-hotbar", {
    name: i18n("dorako-ui.settings.skin-custom-hotbar.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-token-action-hud", {
    name: i18n("dorako-ui.settings.skin-token-action-hud.name"),
    hint: i18n("dorako-ui.settings.skin-token-action-hud.hint"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-window-controls", {
    name: i18n("dorako-ui.settings.skin-window-controls.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-combat-carousel", {
    name: i18n("dorako-ui.settings.skin-combat-carousel.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-dice-tray", {
    name: i18n("dorako-ui.settings.skin-dice-tray.name"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-simple-calendar", {
    name: i18n("dorako-ui.settings.skin-simple-calendar.name"),
    hint: i18n("dorako-ui.settings.skin-simple-calendar.hint"),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  game.settings.register("pf2e-dorako-ui", "skin-crb-journal", {
    name: i18n("dorako-ui.settings.skin-crb-journal.name"),
    hint: i18n("dorako-ui.settings.skin-crb-journal.hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    onChange: () => {
      debouncedReload();
    },
  });

  injectCSS("dorako-ui");
  injectCSS("reset");
  injectCSS("npc-sheet");
  injectCSS("loot-sheet");
  injectCSS("chat-dark");
  injectCSS("module-support");
  injectCSS("new-chat");

  const root = document.querySelector(":root").style;
  if (game.settings.get("pf2e-dorako-ui", "center-hotbar")) {
    root.setProperty("--hotbar-margin-left", "calc(50% - 300px)");
  } else {
    root.setProperty("--hotbar-margin-left", "10px");
  }

  if (game.settings.get("pf2e-dorako-ui", "backdrop-filter")) {
    injectCSS("backdrop-filter");
    root.setProperty("--dorako-vibrancy", "brightness(1.5) contrast(1.2) saturate(1.5) blur(5px)");
    root.setProperty("--dorako-bg-current", "var(--dorako-bg-glass)");
  }

  root.setProperty("--edge-margin", game.settings.get("pf2e-dorako-ui", "edge-offset").toString() + "px");

  root.setProperty("--avatar-size", game.settings.get("pf2e-dorako-ui", "avatar-size").toString() + "px");

  root.setProperty("--chat-input-height", game.settings.get("pf2e-dorako-ui", "chat-input-height").toString() + "px");

  // if (game.settings.get("pf2e-dorako-ui", "skin-navigation")) injectCSS("navigation");
  // if (game.settings.get("pf2e-dorako-ui", "skin-controls")) injectCSS("controls");
  // if (game.settings.get("pf2e-dorako-ui", "skin-token-hud")) injectCSS("token-hud");
  // if (game.settings.get("pf2e-dorako-ui", "skin-sidebar")) injectCSS("sidebar");
  // if (game.settings.get("pf2e-dorako-ui", "skin-combat-tracker")) injectCSS("combat-tracker");
  // if (game.settings.get("pf2e-dorako-ui", "skin-effect-panel")) injectCSS("effect-panel");
  // if (game.settings.get("pf2e-dorako-ui", "skin-app-ui")) injectCSS("app-ui");
  // if (game.settings.get("pf2e-dorako-ui", "skin-hotbar")) injectCSS("hotbar");
  // if (game.settings.get("pf2e-dorako-ui", "skin-window-controls")) injectCSS("window-control");
  // if (game.settings.get("pf2e-dorako-ui", "skin-token-action-hud")) injectCSS("token-action-hud");
  // if (game.settings.get("pf2e-dorako-ui", "skin-custom-hotbar")) injectCSS("custom-hotbar");
  // if (game.settings.get("pf2e-dorako-ui", "skin-dice-tray")) {
  //   const diceTrayEnabled = game.modules.get("dice-calculator")?.active;
  //   if (diceTrayEnabled) injectCSS("dice-tray");
  // }
  if (game.settings.get("pf2e-dorako-ui", "skin-simple-calendar")) injectCSS("simple-calendar");
  if (game.settings.get("pf2e-dorako-ui", "skin-crb-journal")) {
    injectCSS("crb-journal");
    injectCSS("fonts");
  }
  let headerStyle = game.settings.get("pf2e-dorako-ui", "header-style");
  if (headerStyle != "none") {
    injectCSS("header");
  }

  // if (game.settings.get("pf2e-dorako-ui", "skin-combat-carousel")) injectCSS("combat-carousel");

  setting = game.settings.get("pf2e-dorako-ui", "rolltype-indication");
  if (setting == "both" || setting == "bg-color") injectCSS("chat-blind-whisper");
  // if (game.settings.get("pf2e-dorako-ui", "avatar-border")) injectCSS("chat-portrait-border");
  // if (game.settings.get("pf2e-dorako-ui", "compact-ui")) injectCSS("compact-ui");
  if (game.settings.get("pf2e-dorako-ui", "no-logo")) injectCSS("no-logo");
  if (game.settings.get("pf2e-dorako-ui", "no-chat-control-icon")) injectCSS("no-chat-control-icon");
  setting = game.settings.get("pf2e-dorako-ui", "pc-sheet-theme");
  if (setting == "dark") injectCSS("pc-sheet-dark");
  setting = game.settings.get("pf2e-dorako-ui", "familiar-sheet-theme");
  if (setting == "dark" || setting == "darkRedHeader") injectCSS("familiar-sheet-dark");
  if (setting == "darkRedHeader") injectCSS("familiar-sheet-dark-red-header");
});