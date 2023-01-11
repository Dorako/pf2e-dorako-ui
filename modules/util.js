export function log(message) {
    message = `${CONSTANTS.MODULE_NAME} | ${message}`;
    console.log(message.replace("<br>", "\n"));
    return message;
  }
  
export function notify(message) {
    message = `${CONSTANTS.MODULE_NAME} | ${message}`;
    ui.notifications?.notify(message);
    console.log(message.replace("<br>", "\n"));
    return message;
  }
  
  export function info(info, notify = false) {
    info = `${CONSTANTS.MODULE_NAME} | ${info}`;
    if (notify) ui.notifications?.info(info);
    console.log(info.replace("<br>", "\n"));
    return info;
  }
  
  export function warn(warning, notify = false) {
    warning = `${CONSTANTS.MODULE_NAME} | ${warning}`;
    if (notify) ui.notifications?.warn(warning);
    console.warn(warning.replace("<br>", "\n"));
    return warning;
  }
  
  export function error(error, notify = true) {
    error = `${CONSTANTS.MODULE_NAME} | ${error}`;
    if (notify) ui.notifications?.error(error);
    return new Error(error.replace("<br>", "\n"));
  }
  
  export function i18n(key) {
    return game.i18n.localize(key)?.trim();
  };
  
  export function i18nFormat(key, data) {
    return game.i18n.format(key, data)?.trim();
  };
  
  export function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }