import { MODULE_NAME } from "./consts.js";

export function getSetting(key, localize = false) {
  return game.settings.get(MODULE_NAME, key);
}

export function setSetting(key, value) {
  return game.settings.set(MODULE_NAME, key, value);
}

export function log(message) {
  message = `${MODULE_NAME} | ${message}`;
  console.log(message.replace("<br>", "\n"));
  return message;
}

export function debug(message) {
  message = `${MODULE_NAME} | ${message}`;
  console.debug(message.replace("<br>", "\n"));
  return message;
}

export function info(message, notify = false) {
  message = `${MODULE_NAME} | ${message}`;
  if (notify) ui.notifications?.info(message);
  console.log(message.replace("<br>", "\n"));
  return message;
}

export function warn(warning, notify = false) {
  warning = `${MODULE_NAME} | ${warning}`;
  if (notify) ui.notifications?.warn(warning);
  console.warn(warning.replace("<br>", "\n"));
  return warning;
}

export function error(error, notify = true) {
  error = `${MODULE_NAME} | ${error}`;
  if (notify) ui.notifications?.error(error);
  return new Error(error.replace("<br>", "\n"));
}

export function i18n(key) {
  return game.i18n.localize(key)?.trim();
}

export function i18nFormat(key, data) {
  return game.i18n.format(key, data)?.trim();
}

export function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function nonNullable(value) {
  return value !== null && value !== undefined;
}

// Stolen from MrVauxs
export function getPlayerOwners(actor) {
  if (actor == null) return game.users.filter((x) => x.isGM);
  const assigned = game.users.contents.find((user) => user.character?.id === actor.id);
  if (assigned) return [assigned];

  // If everyone owns it, nobody does.
  if (actor.ownership.default === 3) {
    return game.users.contents;
  }

  // Check the ownership IDs, check if there is a player owner, yes, ignore GMs, no, count only GMs.
  const owners = Object.keys(actor.ownership)
    .filter((x) => x !== "default")
    .filter((x) =>
      actor.hasPlayerOwner ? !game.users.get(x)?.hasRole("GAMEMASTER") : game.users.get(x)?.hasRole("GAMEMASTER")
    )
    .map((x) => game.users.get(x))
    .filter(nonNullable);

  if (owners.length) {
    return owners;
  } else {
    // If "nobody" owns it, whoever is the primaryUpdater (read: GM) does.
    // This should handle weirdos like { ownership: { default: 0 } }
    if (actor.primaryUpdater) {
      log("Could not determine owner, defaulting to primaryUpdater.");
      return [actor.primaryUpdater];
    } else {
      log("Could not determine owner nor found the primaryUpdater, defaulting to all GMs.");
      return game.users.filter((x) => x.isGM);
    }
  }
}
