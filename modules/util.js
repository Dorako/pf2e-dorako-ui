import { MODULE_NAME } from "./consts.js";

export function getSetting(key, localize = false) {
  // if(!localize) {
  //   const setting = CONSTANTS.DEFAULT_SETTINGS[key];
  //   if (setting?.moduleIntegration && !game.modules.get(setting.moduleIntegration.key)?.active) {
  //     return setting.default;
  //   }
  // }

  // const value = game.settings.get(MODULE_NAME, key);
  // if (localize) return game.i18n.localize(value);
  // return value;
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
