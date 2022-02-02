console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
});

Hooks.on('init', () => {
	// Register module settings.

	game.settings.register('dorako-ui', 'myToggle', {
		name: "My Toggle Name",
		hint: "My Toggle Hint",
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('dorako-ui', 'skin-custom-hotbar', {
		name: "Skin Custom Hotbar module?",
		hint: "Applies a similar styling to the hotbar provided by the Custom Hotbar module.",
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	game.settings.register('dorako-ui', 'disable-all-styles', {
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

	if (!game.settings.get('dorako-ui', 'disable-all-styles')) {
		injectBaseCss()

		if (game.settings.get('dorako-ui', 'highlightGmOwnerText')) { injectOptionalCss() }
		if (game.settings.get('dorako-ui', 'skin-custom-hotbar')) { injectCustomHotbarCss() }

		if (game.settings.get('dorako-ui', 'myToggle')) {
			console.log("myToggle was turned ON when script loaded")
		} else {
				console.log("myToggle was turned OFF when script loaded")
		}
	}

});

Hooks.on('getSceneNavigationContext', () => {
	if (!game.settings.get('dorako-ui', 'navigationVerticalToggle')) {
		navigation = document.querySelector("nav.app > ol#scene-list");
		if (navigation) {
			navigation.classList.add("vertical")
		}
	}
	if (game.settings.get('dorako-ui', 'myToggle')) {
		addClassByQuerySelector("compact-mode", "body")
	}
});

Hooks.on('renderCombatCarousel', () => {
	let carouselSize = game.settings.get('combat-carousel', 'carouselSize')
	if (carouselSize !== "") {
		addClassByQuerySelector(carouselSize, "#combat-carousel")
	}
});

Hooks.on('renderSidebarTab', async (object, html) => {
	if (object instanceof Settings) {
	  const details = html.find('#game-details')
	  const list = document.createElement('ul')
	  list.innerHTML = await renderTemplate('modules/dorako-ui/templates/settings-info.hbs')
	  details.append(list.firstChild)
	}
  })


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
	mainCss.setAttribute("href", "modules/dorako-ui/css/dorako-ui.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

// Core UI

function skinControls() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/dorako-ui/css/controls.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinChat() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/dorako-ui/css/chat.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

// Modules

function skinCustomHotbarCss() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/dorako-ui/css/custom-hotbar.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinTokenActionHudCss() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/dorako-ui/css/token-action-hud.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}

function skinWindowControl() {
	const head = document.getElementsByTagName("head")[0];
	const newCss = document.createElement("link");
	newCss.setAttribute("rel", "stylesheet")
	newCss.setAttribute("type", "text/css")
	newCss.setAttribute("href", "modules/dorako-ui/css/window-control.css")
	newCss.setAttribute("media", "all")
	head.insertBefore(newCss, head.lastChild);
}



