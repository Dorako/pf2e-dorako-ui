class SettingsMenuDorakoUI extends FormApplication {
  static namespace;

  static get defaultOptions() {
    const options = super.defaultOptions;
    options.classes.push("settings-menu");

    return mergeObject(options, {
      title: `pf2e-dorako-ui.settings.${this.namespace}.name`,
      id: `${this.namespace}-settings`,
      template: `modules/pf2e-dorako-ui/templates/menu.hbs`,
      width: 550,
      height: "auto",
      closeOnSubmit: false,
    });
  }

  static get prefix() {
    return `${this.namespace}.`;
  }

  get namespace() {
    return this.constructor.namespace;
  }

  get prefix() {
    return this.constructor.prefix;
  }

  static SETTINGS;

  /** Settings to be registered and also later referenced during user updates */
  static get settings() {
    return {};
  }

  static registerSettings() {
    const settings = this.settings;
    for (const setting of this.SETTINGS) {
      game.settings.register("pf2e-dorako-ui", `${this.prefix}${setting}`, {
        ...settings[setting],
        config: true,
      });
    }
  }

  async getData() {
    const settings = this.constructor.settings;
    const templateData = Object.entries(settings).map(([key, setting]) => {
      const value = game.settings.get("pf2e-dorako-ui", `${this.prefix}${key}`);
      return {
        ...setting,
        key,
        value,
        isSelect: !!setting.choices,
        isCheckbox: setting.type === Boolean,
        isFilepicker: setting.type === String && setting.filePicker,
        isNumber: setting.type === Number && !setting.range,
        isText: setting.type === String && !setting.filePicker,
        isRange: setting.type === Number && !!setting.range,
      };
    });
    return mergeObject(await super.getData(), {
      settings: templateData,
      instructions: `pf2e-dorako-ui.settings.${this.namespace}.hint`,
    });
  }

  async _updateObject(_event, data) {
    for (const key of this.constructor.SETTINGS) {
      const settingKey = `${this.prefix}${key}`;
      await game.settings.set("pf2e-dorako-ui", settingKey, data[key]);
    }
  }
}

export { SettingsMenuDorakoUI };
