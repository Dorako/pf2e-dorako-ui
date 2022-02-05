
Hooks.on("ready", async function () {
    jQuery.fx.off = true;
});


// Hooks.on('getSceneControlButtons', (controls) => {
// 	const isGM = game.user.isGM;
// 	controls.push({
// 		name: 'myName',
// 		title: "Dorako Button",
// 		icon: 'fas fa-adjust',
// 		visible: isGM,
// 		layer: 'myLayer',
// 		activeTool: 'select',
// 		flags: {
// 		},
// 		tools: [
// 			{
// 				name: 'select',
// 				title: 'mySelect',
// 				icon: 'fas fa-eye'
// 			}
// 		]
// 	});
// });

// Hooks.on('renderSceneControls', (controls) => {
// 	if (canvas != null && canvas.terrain) {
// 		canvas.terrain.visible = (canvas.terrain.showterrain || controls.activeControl == 'terrain');

// 		if (controls.activeControl == 'terrain') {
// 			if (canvas.terrain.toolbar == undefined)
// 				canvas.terrain.toolbar = new TerrainLayerToolBar();
// 			canvas.terrain.toolbar.render(true);
// 			//$('#terrainlayer-tools').toggle(controls.activeTool == 'addterrain');
// 		} else {
// 			if (!canvas.terrain.toolbar)
// 				return;
// 			canvas.terrain.toolbar.close();
// 		}
// 	}
// });
// Hooks.on('renderTerrainLayerToolBar', () => {
// 	const tools = $(canvas.terrain.toolbar.form).parent();
// 	if (!tools)
// 		return;
// 	if (isNewerVersion(game.version, "9")) {
// 		const controltools = $('li[data-tool="addterrain"]').closest('.sub-controls');
// 		const offset = controltools.offset();
// 		tools.css({ top: `${offset.top}px`, left: `${offset.left + controltools.width()}px` });
// 	} else {
// 		const controltools = $('li[data-control="terrain"] ol.control-tools');
// 		const offset = controltools.offset();
// 		tools.css({ top: `${offset.top}px`, left: `${offset.left + controltools.width() + 6}px` });
//     }
// });


Hooks.on('init', () => {
	// Register module settings.

	// game.settings.register("pf2e-dorako-ui", "stockColor", {
    //     name: "Stock Color",
    //     hint: "Stock Color Picker Hunt",
	// 	scope: "world",
    //     config: true,
    //     type: String,
    //     default: "#ffffff",
    //     onChange: () => refresh()
    // });

	// new window.Ardittristan.ColorSetting("pf2e-dorako-ui", "primaryColor", {
	// 	name: "Primary Color",      // The name of the setting in the settings menu
	// 	hint: "Used for active controls and player-accesible scenes",   // A description of the registered setting and its behavior
	// 	label: "Click",         // The text label used in the button
	// 	restricted: false,             // Restrict this setting to gamemaster only?
	// 	defaultColor: "rgb(94, 0, 0)",     // The default color of the setting
	// 	scope: "client",               // The scope of the setting
	// 	onChange: (value) => {
	// 		let newColor = game.settings.get("pf2e-dorako-ui", "primaryColor")
	// 		console.log(newColor);
	// 		const root = document.querySelector(':root').style;
	// 		root.setProperty("--paizo-red", newColor);
	// 	}
	// })

	// new window.Ardittristan.ColorSetting("pf2e-dorako-ui", "secondaryColor", {
	// 		name: "Secondary Color",      // The name of the setting in the settings menu
	// 		hint: "Used for toggles and hidden scenes",   // A description of the registered setting and its behavior
	// 		label: "Click",         // The text label used in the button
	// 		restricted: false,             // Restrict this setting to gamemaster only?
	// 		defaultColor: "rgb(23, 31, 105)",     // The default color of the setting
	// 		scope: "client",               // The scope of the setting
	// 		onChange: (value) => {
	// 			let newColor = game.settings.get("pf2e-dorako-ui", "secondaryColor")
	// 			console.log(newColor);
	// 			const root = document.querySelector(':root').style;
	// 			root.setProperty("--paizo-blue", newColor);
	// 		}        // A callback function which triggers when the setting is changed
	// 	})

	// game.settings.register('pf2e-dorako-ui', 'myToggle', {
	// 	name: "Dark Theme",
	// 	hint: "My Toggle Hint",
	// 	scope: "world",
	// 	type: Boolean,
	// 	default: false,
	// 	config: true,
	// 	onChange: () => {
	// 		location.reload();
	// 	}
	// });



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




	// game.settings.register('dorako-ui', 'highlightGmOwnerText', {
	// 	name: game.i18n.localize('RPGUI.SETTINGS.HIGHLIGHT_GM_OWNER_TEXT'),
	// 	hint: game.i18n.localize('RPGUI.SETTINGS.HIGHLIGHT_GM_OWNER_TEXT_HINT'),
	// 	scope: "client",
	// 	type: Boolean,
	// 	default: false,
	// 	config: true,
	// 	onChange: () => {
	// 		location.reload();
	// 	}
	// });

	// if (!game.settings.get('dorako-ui', 'compactModeToggle')) {
	// 	if (!game.settings.get('dorako-ui', 'standardLogoToggle')) {
	// 		addClassByQuerySelector("hide", "img#logo")

	// 		let newLogo = document.createElement('div');
	// 		let uiLeft = document.getElementById('ui-left')
	// 		newLogo.classList.add("new-logo")
	// 		newLogo.innerText = "Pathfinder \n2e"
	// 		uiLeft.prepend(newLogo)
	// 	}
	// }

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

	}

});

// Hooks.on('getSceneNavigationContext', () => {
// 	if (!game.settings.get('dorako-ui', 'navigationVerticalToggle')) {
// 		navigation = document.querySelector("nav.app > ol#scene-list");
// 		if (navigation) {
// 			navigation.classList.add("vertical")
// 		}
// 	}
// 	if (game.settings.get('dorako-ui', 'myToggle')) {
// 		addClassByQuerySelector("compact-mode", "body")
// 	}
// });

// Hooks.on('renderCombatCarousel', () => {
// 	let carouselSize = game.settings.get('combat-carousel', 'carouselSize')
// 	if (carouselSize !== "") {
// 		addClassByQuerySelector(carouselSize, "#combat-carousel")
// 	}
// });

// Hooks.on('renderSidebarTab', async (object, html) => {
// 	if (object instanceof Settings) {
// 	  const details = html.find('#game-details')
// 	  const list = document.createElement('ul')
// 	  list.innerHTML = await renderTemplate('modules/pd2e-dorako-ui/templates/settings-info.hbs')
// 	  details.append(list.firstChild)
// 	}
//   })


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