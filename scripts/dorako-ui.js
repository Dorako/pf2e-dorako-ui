Hooks.on("ready", async function () {
    jQuery.fx.off = true;
});

Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {
    injectMessageTag(html, messageData);
    injectWhisperParticipants(html, messageData);
});

function injectMessageTag(html, messageData) {
    const messageMetadata = html.find(".message-metadata");

    const rolltype = $("<span>");
    rolltype.addClass("rolltype");

    const whisperTargets = messageData.message.whisper;

    const isBlind = messageData.message.blind || false;
    const isWhisper = whisperTargets?.length > 0 || false;
    const isSelf = isWhisper && whisperTargets.length === 1 && whisperTargets[0] === messageData.message.user;
    const isRoll = messageData.message.roll !== undefined;

    // Inject tag to the left of the timestamp
    if (isBlind) {
        rolltype.text(game.i18n.localize("CHAT.RollBlind"));
        messageMetadata.prepend(rolltype);
    } else if (isSelf && whisperTargets[0]) {
        rolltype.text(game.i18n.localize("CHAT.RollSelf"));
        messageMetadata.prepend(rolltype);
    } else if (isRoll && isWhisper) {
        rolltype.text(game.i18n.localize("CHAT.RollPrivate"));
        messageMetadata.prepend(rolltype);
    } else if (isWhisper) {
        rolltype.text(game.i18n.localize("chat-indicators.Whisper"));
        messageMetadata.prepend(rolltype);
    }
}

function injectWhisperParticipants(html, messageData) {
    const alias = messageData.alias;
    const whisperTargetString = messageData.whisperTo;
    const whisperTargetIds = messageData.message.whisper;
    const isWhisper = whisperTargetIds?.length > 0 || false;
    const isRoll = messageData.message.roll !== undefined;

    const authorId = messageData.message.user;
    const userId = game.user.data._id;

    if (!isWhisper) return;
    if (userId !== authorId && !whisperTargetIds.includes(userId) ) return;

    // remove the old whisper to content, if it exists
    html.find(".whisper-to").detach();

    // if this is a roll
    if (isRoll) return;

    // add new content
    // const messageHeader = html.find(".message-header");

    const messageHeader = html.find(".message-header");

    const whisperParticipants = $("<span>");
    whisperParticipants.addClass("whisper-to");

    const whisperFrom = $("<span>");
    whisperFrom.text(`From: ${alias}`);

    const whisperTo = $("<span>");
    whisperTo.text(`${game.i18n.localize("CHAT.To")}: ${whisperTargetString}`);

    whisperParticipants.append(whisperFrom);
    whisperParticipants.append(whisperTo);
    messageHeader.append(whisperParticipants);
}


Hooks.once('init', async function () {
    CONFIG.ChatMessage.template = "modules/pf2e-dorako-ui/templates/base-chat-message.html";

    game.settings.register("pf2e-dorako-ui", "displaySetting", {
        name: "Display setting",
        hint: "Configure which cards should receive custom styling, and which ones should be left as default. Changing this may require you to refresh your window.",
        scope: "client",
        config: true,
        default: "allCards",
        type: String,
        choices: {
            "allCards": "Affect every message.",
            "selfAndGM": "Affect own messages and GM messages.",
            "self": "Only affect own messages.",
            "gm": "Only affect GM messages.",
            "player": "Only affect player messages.",
            "none": "Don't affect any messages."
        }
    });

    game.settings.register("pf2e-dorako-ui", "theme", {
        name: "Theme",
        hint: "Select between light and dark theme",
        scope: "client",
        config: true,
        default: "Light",
        type: String,
        choices: {
            "light": "Light",
            "dark": "Dark",
            "rainbow": "???"
        }
    });

    game.settings.register("pf2e-dorako-ui", "headerStyle", {
        name: "Header style",
        hint: "Select between three header styles",
        scope: "client",
        config: true,
        default: "header",
        type: String,
        choices: {
            "red": "Red",
            "tint": "Player tint",
            "none": "None"
        }
    });

    game.settings.register("pf2e-dorako-ui", "borderOverride", {
        name: "Override border",
        hint: "Enables border colour override. This will colour the border of the chat card with the player's colour.",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("pf2e-dorako-ui", "insertSpeakerImage", {
        name: "Insert Speaker Image",
        hint: "Adds the image of the speaker to the chat card.",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });
});


Hooks.on('init', () => {
	function shouldOverrideMessage(message) {
    const setting = game.settings.get("pf2e-dorako-ui", "displaySetting");
    if (setting !== "none") {
        const user = game.users.get(message.user);
        if (user) {
            const isSelf = user.data._id === game.user.data._id;
            const isGM = user.isGM;

            if ((setting === "allCards")
                || (setting === "self" && isSelf)
                || (setting === "selfAndGM" && (isSelf || isGM))
                || (setting === "gm" && isGM)
                || (setting === "player" && !isGM)
            ) {
                return true;
            }
        }
    }
    return false;
}


Hooks.once("setup", function () {
    Handlebars.registerHelper("getSpeakerImage", function (message) {
        const speaker = message.speaker;
        if (speaker) {
            if (speaker.token) {
                const token = game.scenes.get(speaker.scene)?.tokens?.get(speaker.token);
                if (token) {
                    return token.data.img;
                }
            }

            if (speaker.actor) {
                const actor = Actors.instance.get(speaker.actor);
                if (actor) {
                    return actor.data.img;
                }
            }
        }

        return "icons/svg/mystery-man.svg";
    });

    Handlebars.registerHelper("showSpeakerImage", function (message) {
        const insertSpeakerImage = game.settings.get("pf2e-dorako-ui", "insertSpeakerImage");
        if (!insertSpeakerImage) {
            return false;
        }

        const speaker = message.speaker;
        if (!speaker) {
            return false;
        } else {
            let bHasImage = false;
            if (speaker.token) {
                const token = game.scenes.get(speaker.scene)?.tokens?.get(speaker.token);
                if (token) {
                    bHasImage = bHasImage || token.data.img != null;
                }
            }

            if (speaker.actor) {
                const actor = Actors.instance.get(speaker.actor);
                if (actor) {
                    bHasImage = bHasImage || actor.data.img != null;
                }
            }

            if (!bHasImage) {
                return false;
            }
        }

        return shouldOverrideMessage(message);
    });

    Handlebars.registerHelper("useVideoForSpeakerImage", function (message) {
        const speaker = message.speaker;
        if (!speaker) {
            return false;
        } else {
            let imageName = "";
            if (speaker.token) {
                const token = game.scenes.get(speaker.scene)?.tokens?.get(speaker.token);
                if (token) {
                    imageName = token.data.img;
                }
            }

            if (!imageName && speaker.actor) {
                const actor = Actors.instance.get(speaker.actor);
                if (actor) {
                    imageName = actor.data.img;
                }
            }

            return imageName?.endsWith("webm") || imageName?.endsWith("mp4") || imageName?.endsWith("ogg") || false;
        }

        return false;
    });

    Handlebars.registerHelper("getBorderStyle", function (message, foundryBorder) {
        const borderOverride = game.settings.get("pf2e-dorako-ui", "borderOverride");
        if (borderOverride && shouldOverrideMessage(message)) {
            const user = game.users.get(message.user);
            return `border-color: ${user.data.color}`;
        }

        if (foundryBorder) {
            return `border-color: ${foundryBorder}`;
        }
        return "";
    });

    Handlebars.registerHelper("getHeaderStyle", function (message) {
        if (shouldOverrideMessage(message)) {
            const user = game.users.get(message.user);

            const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
            if (headerStyle === "tint") {
                const hexColor = user.data.color.replace("#", "");
                var r = parseInt(hexColor.substr(0,2),16);
                var g = parseInt(hexColor.substr(2,2),16);
                var b = parseInt(hexColor.substr(4,2),16);
                var yiq = ((r*299)+(g*587)+(b*114))/1000;
                const textColor = (yiq >= 128) ? '#333' : '#E7E7E7';

                return `background-color:${user.data.color}; color: ${textColor};`;
            }
        }
        return "";
    });

    Handlebars.registerHelper("getTitleStyle", function (message) {
        if (shouldOverrideMessage(message)) {
            const user = game.users.get(message.user);

            const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
            if (headerStyle === "none") {
                return "";
            } else if (headerStyle === "topBar") {
                return "";
            }
        }
        return "";
    });

    Handlebars.registerHelper("getUserColor", function (message) {
        if (shouldOverrideMessage(message)) {
            const user = game.users.get(message.user);
            return user.data.color;
        }
        return "";
    });

    Handlebars.registerHelper("getheaderStyle", function () {
        const headerStyle = game.settings.get("pf2e-dorako-ui", "headerStyle");
        return headerStyle;
    });
});




	game.settings.register('pf2e-dorako-ui', 'disable-all-styles', {
		name: "Disable all styles?",
		hint: "Ignore all the toggles and removes any effect of the module, without having to disable it.",
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'center-hotbar', {
		name: "Center hotbar (macrobar)?",
		hint: "",
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register("pf2e-dorako-ui", "edge-offset", {
        name: "Offset from the edge of screen in pixels",
        hint: "",
        scope: "client",
        type: Number,
        default: 10,
        range: {
            min: 5,
            max: 30,
            step: 1
        },
        config: true,
		onChange: () => {
			location.reload();
		}
    });


	game.settings.register('pf2e-dorako-ui', 'skin-chat', {
		name: "Apply skin to chat?",
		hint: "Applies theming to chat cards and sidebar content.",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-navigation', {
		name: "Apply skin to scene navigation?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-hotbar', {
		name: "Apply skin to the hotbar (macro bar)?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-controls', {
		name: "Apply skin to scene controls?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-token-hud', {
		name: "Apply skin to the token HUD?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-effect-panel', {
		name: "Apply skin to the effect panel?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-sidebar', {
		name: "Apply skin to the sidebar?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-app-ui', {
		name: "Apply skin to app UI?",
		hint: "This includes the player box, window headers, and similar",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-combat-tracker', {
		name: "Apply skin to the combat tracker?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-custom-hotbar', {
		name: "Apply skin to Custom Hotbar module?",
		hint: "Suggested offsets of (845px horizontally and 10px vertically) for vertical extension, or (0px horizontally and 75px vertically) for stacked bars.",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-token-action-hud', {
		name: "Apply skin to Token Action HUD?",
		hint: "Makes TAH more compact and fits in better with the rest of the UI.",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-window-controls', {
		name: "Apply skin to Window Controls module?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('pf2e-dorako-ui', 'skin-dice-tray', {
		name: "Apply skin to Dice Tray module?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

    game.settings.register('pf2e-dorako-ui', 'skin-message-header', {
		name: "Apply skin to message header?",
		hint: "",
		scope: "world",
		type: Boolean,
		default: true,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	if (!game.settings.get('pf2e-dorako-ui', 'disable-all-styles')) {
		injectBaseCss()

		const root = document.querySelector(':root').style;
		if (game.settings.get('pf2e-dorako-ui', 'center-hotbar')) {
			root.setProperty("--hotbar-margin-left", 'calc(50% - 300px)');
		} else {
			root.setProperty("--hotbar-margin-left", '10px');
		}

		root.setProperty("--edge-margin", game.settings.get('pf2e-dorako-ui', 'edge-offset').toString()+'px');

		if (game.settings.get('pf2e-dorako-ui', 'skin-navigation')) {
			skinNavigation()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-controls')) {
			skinControls()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-token-hud')) {
			skinTokenHud()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-chat')) {
			skinChat()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-sidebar')) {
			skinSidebar()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-combat-tracker')) {
			skinCombatTracker()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-effect-panel')) {
			skinEffectPanel()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-app-ui')) {
			skinAppUi()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-hotbar')) {
			skinHotbar()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-window-controls')) {
			skinWindowControls()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-token-action-hud')) {
			skinTokenActionHud()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-custom-hotbar')) {
			skinCustomHotbar()
		}
		if (game.settings.get('pf2e-dorako-ui', 'skin-dice-tray')) {
			skinDiceTray()
		}
        let headerStyle = game.settings.get('pf2e-dorako-ui', 'headerStyle');
        if (headerStyle == "tint" || headerStyle == "red") {
			skinMessageHeader()
		} else if (headerStyle == "none") {
            // padding-bottom: 0px;
        } 
        let theme = game.settings.get('pf2e-dorako-ui', 'theme');
        if (theme == "light") {
            // do nothing
        } else if (theme == "dark") {
			enableDarkTheme()
		} else if (theme == "rainbow") {
            enableRainbowTheme();
        }

	}

});


function shouldOverrideMessage(message) {
    const setting = game.settings.get("pf2e-dorako-ui", "displaySetting");
    if (setting !== "none") {
        const user = game.users.get(message.user);
        if (user) {
            const isSelf = user.data._id === game.user.data._id;
            const isGM = user.isGM;

            if ((setting === "allCards")
                || (setting === "self" && isSelf)
                || (setting === "selfAndGM" && (isSelf || isGM))
                || (setting === "gm" && isGM)
                || (setting === "player" && !isGM)
            ) {
                return true;
            }
        }
    }
    return false;
}


function addClassByQuerySelector(className, selector) {
	let navigation = document.querySelector(selector);
	navigation.classList.add(className)
}

// Base

function injectBaseCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/dorako-ui.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

// Chat cards
function skinMessageHeader() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/header.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function enableDarkTheme() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/chat-dark.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function enableRainbowTheme() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/chat-rainbow.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

// Core UI

function skinChat() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/chat.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinHotbar() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/hotbar.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinControls() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/controls.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinNavigation() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/navigation.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinAppUi() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/app-ui.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinTokenHud() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/token-hud.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinEffectPanel() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/effect-panel.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinSidebar() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/sidebar.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinCombatTracker() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/combat-tracker.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}


// Modules

function skinCustomHotbar() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/custom-hotbar.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinTokenActionHud() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/token-action-hud.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinWindowControls() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/window-control.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinDiceTray() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/dice-tray.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}