import { getChatTheme, getDefaultColorScheme, lookupThemeAndSchemeForKey } from "./ui-theme.js";

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
  html0.style.setProperty("--player-color", chatMessage?.user?.color ?? "#DAC0FB");

  const isSecretDisposition =
    game?.scenes?.get(chatMessage?.speaker?.scene)?.tokens?.get(chatMessage?.speaker?.token)?.disposition == -2;
  const { dorakoUiTheme, colorScheme } =
    chatMessage?.actor?.alliance === "opposition" && !isSecretDisposition
      ? lookupThemeAndSchemeForKey(game.settings.get("pf2e-dorako-ui", "theme.chat-message-opposition-theme"))
      : lookupThemeAndSchemeForKey(game.settings.get("pf2e-dorako-ui", "theme.chat-message-standard-theme"));
  html0.dataset.dorakoUiTheme = dorakoUiTheme;
  html0.dataset.colorScheme = colorScheme;
  html0.dataset.dorakoUiScope = "unlimited";

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

  let textColTheme = calcHeaderTextColor(headerColor);
  html[0].dataset.headerTextColorScheme = textColTheme;

  // some modules add different timestamps and hide the original, like dfce-simple-timestamp
  let time = html.find("time")[0];
  if (time) {
    time.classList.add("header-meta");
  }
}

function getHeaderColor(html, message) {
  const headerStyle = game.settings.get("pf2e-dorako-ui", "theme.chat-message-header-style");
  if (headerStyle === "tint") {
    return message?.user?.color ?? "#DAC0FB";
  } else if (headerStyle === "blue") {
    return "#191F65";
  } else if (headerStyle === "red") {
    return "#540C06";
  } else if (headerStyle === "green") {
    return "#002A17";
  } else if (headerStyle === "none") {
    return null;
  }
  return "#DAC0FB";
}

function invertColor(color) {
  return color === "dark" ? "light" : "dark";
}

function calcHeaderTextColor(headerColor) {
  var r = parseInt(headerColor.substr(1, 2), 16);
  var g = parseInt(headerColor.substr(3, 2), 16);
  var b = parseInt(headerColor.substr(5, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  if (yiq >= 180) {
    return "dark";
  } else {
    return "light";
  }
}
