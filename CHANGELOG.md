# 4.1.0

- (Feature) Re-added PF2e HUD colorization setting.
- (Feature) Re-added BG3 rarity coloration for item sheets.
- (Refinement) Adjusted BG3 chat message theme buttons.
- (Feature) Re-added rolltype indicators for chat messages.

# 4.0.5

- (Maintenance) Improved various stylings.
- (New) Re-added BG3 chat message themes.

# 4.0.4

- (Fix) Potentially fixed a performance issue by migrating to renderChatMessageHTML and removing an updateChatMessage hook.

# 4.0.3

- (Fix) Improved the first-launch experience by disabling some interactions when a theme has yet to be applied.
- (Fix) Excluded Quick Insert from styling.
- (Fix) Fixed an issue where themes with semi-opaque inputs would have illegible dropdowns.

# 4.0.2

- (Maintenance) Ensured .addendum styling is legible on dark backgrounds.
- (Fix) Ensured TAH is excluded from styling.
- (Maintenance) Preliminary support for PF2e HUD v13 edition.
- (Fix) Fixed an issue where the backplate would not be attached to dynamic token avatars.

# 4.0.1

- (Feature) Re-integrated chat merge from UX.
- (Fix) Mostly fixed NPC sheets.
- (Fix) Fixed some bad CSS-scoping such that PC sheets look normal when themes are disabled.

# 4.0.0

- (Overhaul) Initial support for FVTT v13.

# 3.7.19

- (Maintenance) Updated styling for Quick Insert.

# 3.7.18

- (Fix) _Actually_ ensure PF2e Toolbelt's roll tracker is legible in light themes.

# 3.7.17

- (Maintenance) Exclude PF2e Kingmaker Tools' applications from theming (though it's visually stuck in core dark theme).
- (Fix) Ensure PF2e Toolbelt's roll tracker is legible in light themes.
- (Refinement) Ensure `_reset.scss` is scoped to `[data-theme]`.

# 3.7.16

- (Maintenance) Updated styling of Quick Insert for the "app v3" rewrite...

# 3.7.15

- (Refinement) Improved legibility of 'disabled' keybinds in the keybind manager.
- (Refinement) Improved legibility of PF2e HUD's Recall Knowledge chat messages using dark themes.

# 3.7.14

- (Maintenance) Various minor tweaks mostly related to chat mesages.

# 3.7.13

- (Fix) Added the module 'Terminal' to the exclusion list.
- (Maintenance) Adjusted the styling for the new system Compendium Browser.

# 3.7.12

- (Fix) Removed some logspam.

# 3.7.11

- (Fix) Restore styling of applicationV2 apps.
- (Maintenance) Updated styling of Quick Insert for the app v2 rewrite.
- (New) Vue application support contributed by cuyima (@cuyeet).

# 3.7.10

- (Fix) Fixed an issue where the glass interface theme was too translucent.

# 3.7.9

- (Refinement) Added style support for the new dice tray provided by PF2e HUD.

# 3.7.8

- (New) New 'Brown' player sheet theme color contributed by @pinkflumph
- (Maintenance) Updated selectors for TAH.

# 3.7.7

- (Maintenance) Updated selectors for PF2e Chances.
- (Maintenance) Applies either core Foundry .dark-theme or .light-theme classes depending on sheet theme.
- (Refinement) Excluded the PF2e HUD 'note' dialog from styling.
- (New) Added support for the new ABCPicker dialogs.

# 3.7.6

- (Module) Added theme support for PF2e Chances.
- (Refinement) Adjusted the calculation for the selection of player for the Player Colored sheet theme so it should be correct for cases where multiple players have different ownership values for an actor.

# 3.7.5

- (Refinement) Adjusted the way the chat message header color is computed - it will now prefer the color of the user associated with the actor, rather than the user who is the author of the message.
- (Refinement) Updated whisper styling to be compatible with Dorako UX 1.5.7.
- (Refinement) Exclude whisper tags from 'damage-taken' style messages.

# 3.7.4

- (Refinement) Tweaked the color generation for the new 'Player Sheet Theme Color' feature again.
- (Refinement) Added override flag to force a certain sheet color despite the player color being different. Example: `game.users.get("qUNuApJti2nIgA6V").setFlag("pf2e-dorako-ui", "player-sheet-color-override", "#0000FF")`
- (Fix) Changed the way the primary owner of an actor is determined, snippet supplied by @MrVauxs

# 3.7.3

- (Refinement) Tweaked the color generation for the new 'Player Sheet Theme Color' feature.

# 3.7.2

- (New) Added a new "Player Color" option for the 'Sheet theme color' setting.

# 3.7.1

- (Module) Added theme support for PF2e Subsystem Helper.
- (Refinement) Made the colorize PF2e HUD setting apply to the Token HUD as well.
- (Refinement) Adjusted the styling for See Simple Scale Statistics.

# 3.7.0

- (New) Replaced the old 'colorize ITT' setting with 'colorize PF2e HUD'.
- (Refinement) Made a non-opaque background opaque when the Opaque interface theme is enabled.
- (Refinement) Several minor CSS adjustments.

# 3.6.2

- (Refinement) Added style support for the new inline flatcheck rolls provided by PF2e Utility Buttons.
- (Fix) Fixed an issue where CRB light theme would have illegible text in certain dialogs.

# 3.6.1

- (Maintenance) Restored some styling to Hazard sheets.
- (Maintenance) Restored some styling to form labels.
- (Refinement) Improved contrast for Discord (Light) theme.

# 3.6.0

- (Module) Added support for the PF2e Sheet Link ("Rolodex") module.
- (Refinement) Made the DND5e dark theme more closely resemble the dark theme provided by the 5e system.
- (Fix) Fixed an issue where the DND5e dark theme would not apply correctly to App v2 applications.
- (Fix) Fixed an issue where certain buttons on NPC sheets would look bad when active/hovered.

# 3.5.19

- (Fix) Updates to App v2 styling to unclobber some color variables.

# 3.5.18

- (Fix) Fixed an issue where certain theme styling would still be applied to the sidebar when interface theme was set to 'No theme'.
- (Refinement) Added Prey For Death to the list of premium modules.
- (Refinement) Styling improvements for NPC sheets.
- (Module) Excluded PF2E Bestiary Tracking from theming, as it ships with its own themes.

# 3.5.17

- (Fix) Fixed an issue where the CRB style colored chat message headers would always use light text.
- (Refinement) Excluded PF2eHudItemPopup from theming, as it implements custom styling.

# 3.5.16

- (Refinement) Removed some logspam.
- (Refinement) Excluded one more PF2e Graphics application from theming.

# 3.5.15

- (Refinement) Excluded the applications windows from PF2e Graphics from theming.

# 3.5.14

- (Fix) Made the _other_ check for sf2e-playtest-deluxe-adventure-pack nullsafe, which should fix rendering.

# 3.5.13

- (Fix) Made the check for sf2e-playtest-deluxe-adventure-pack nullsafe, which should fix rendering.
- (Fix) Fixed some logspam that happened when app V2 applications besides PF2e HUD rendered.

# 3.5.12

- (New) Added .curtaincall to the premium module selector.
- (New) Ensured Sigil adventure importers are categorized as premium.
- (Module) Ensured that the Character sheet is not affected by the Sheet Theme when sf2e-playtest-deluxe-adventure-pack is active.
- (Refinement) Used dark glass in Glass UI theme for TAH, similar to how PF2e HUD looks.

# 3.5.11

- (Fix) Added '.sf2eplaytest' to the premium module selector.

# 3.5.10

- (Refinement) Includede /sass in releases.
- (New) Added sf2eplaytest to the premium module selector.
- (Refinement) Improved legibility of Discord Light theme for NPC sheets.

# 3.5.9

- (Maintenance) Ensured gm-note text is legible on dark themes in loot actor sheets.
- (Refinement) Updated PF2e HUD styling to support the new effects display.
- (Refinement) Ensured that the resource tracking HUD in PF2e HUD is excluded from styling.

# 3.5.8

- (Refinement) Update use of .user with .author to avoid logspam, thanks to @Chasarooni
- (Fix) Actually resolved an issue with illegible text in dropdowns.

# 3.5.7

- (Fix) Maybe resolve issue with illegible text in dropdowns.

# 3.5.6

- (Fix) Restored color-coding to approximate health labels in PF2e HUD.
- (Fix) Fixed an issue where the exploded token HUD from PF2e HUD would look incorrect when excluded from styling.

# 3.5.5

- (Refinement) Styling support for new PF2e HUD functionality.

# 3.5.4

- (Fix) Fixed some log spam in relation to PF2e HUD.
- (Refinement) Expanded the exclusion system so App v2 apps can be excluded via regex (e.g. 'PF2eHud\*').

# 3.5.3

- (Fix) Fixed an issue where ApplicationV2 dialogs would be illegible using CRB (Light) theme.
- (Refinement) Updated styling for PF2e HUD.

# 3.5.2

- (Fix) Fixed an issue where a small bit of css was not scoped properly, resulting in illegible text on Psychic spells when using the 'no theme' option.
- (Fix) Updated styling for prosemirror inputs on character sheets, so they can be edited again.

# 3.5.1

- (Fix) Fixed some console spam.
- (Fix) Fixed an issue where take-damage buttons were hidden.

# 3.5.0

- (New) Added support for FVTT v12 and ApplicationV2. This is a breaking change and as such only supports V12.
- (New) Added better support for theming specific macro dialogs, such as the Spellstrike macro.
- (Fix) Fixed an issue where the theme-coloring of heal and block buttons was not working for buttons provided by PF2e Toolbelt.
- (Fix) Fixed an issue where PC theme color Blue was not working.
- (Refinement) Improved styling for AttackPopout applications (when you drag a strike to the hotbar).
- (Module) Added initial support for PF2e HUD.

# 3.4.11

- (Maintenance) Styling touchups for the Global Progress Clocks module.
- (Module) Added support for Theatre Inserts.

# 3.4.10

- (Maintenance) Added Wardens of Wildwood to the premium module exclusion system.
- (Meta) Updated the README to more accurately reflect the module as of v3+.

# 3.4.9

- (Maintenance) Ensured Vehicle sheets are styled properly again, with respect to sheet theme and PC theme color.
- (Refinement) Added styling for the in-archive search feature in Vauxs' Archives.
- (Refinement) Updated styling for inputs and selects in ITT, ensuring that they are legible regardless of theme.

# 3.4.8

- (Refinement) Added a color for linebreaks in journals for the CRB themes.
- (Fix) Fixed an issue where spell charges in ITT would be illegible in some themes.

# 3.4.7

- (Fix) Undo standardization of spacing between icosn and text in buttons, as certain buttons (notably in Workbench's heropoint handler) did not like it.

# 3.4.6

- (Refinement) Fixed an issue where nat 1/20's were not colored appropriately in chat messages.
- (Refinement) Updated styling for Speaking As.
- (Refinement) Standardized spacing between icons and text in buttons.
- (Fix) Fixed an issue where certain tags were illegible in the 5e light theme in Module Management+.

# 3.4.5

- (Refinement) Updated styling of certain secret labels to keep in track with the system.
- (Refinement) Added a border around icons in certain messages with small icons.

# 3.4.4

- Does not exist

# 3.4.3

- (Module) Added support for Vauxs' Archives.

# 3.4.2

- (Refinement) Excluded Automated Animations' menu from styling.
- (Refinement) Adjusted styling for PC sheet toggles to make active toggles more easily identifiable, regardless of theme.
- (Refinement) Fixed legibility of accented buttons in CRB (Dark) chat message theme.
- (Refinement) Fixed some instances of light text on light background in D&D 5e (Light) sheet theme.

# 3.4.1

- (Refinement) Added styling for new double barrel icon.
- (Refinement) Added D&D 5e to the debug buttons.
- (Refinement) Minor adjustments to D&D 5e theme.

# 3.4.0

- (Refinement) Colorized rolltype indicators in CRB themes.
- (New) New "D&D 5e" light/dark sheet and chat message themes, inspired by the recent 3.0 update. Note: You must have the D&D 5e system installed for the assets to load.

# 3.3.19

- (Maintenance) Updated styling of certain tags so they should be legible in any theme.

# 3.3.18

- (Maintenance) Updated styling to be compatible with system version 5.14.1.

# 3.3.17

- (Maintenance) Adjustments to tags.
- (Maintenance) Removed some hardcoded system backgrounds.

# 3.3.16

- (Module) Added integration with PF2e Mobile Sheets.

# 3.3.15

- (Fix) Fixed an issue where homebrew tags would be illegible in CRB light theme.
- (Refinement) Added proper support for Global Progress Clocks.

# 3.3.14

- (New) Excluded some upcoming premium module journals from styling.
- (Refinement) Added styling for targeted RK from ITT.
- (Refinement) Ensured simple NPC sheets are legible in CRB light theme.
- (Maintenance) Restored input-field style theming for certain PC sheet fields.

# 3.3.13

- (New) Exluded the new Rusthenge premium module journals from styling.

# 3.3.12

- (Refinement) Added styling for addendums in actor sheets.

# 3.3.11

- (Refinement) PC Sheet adjustments.
- (Refinement) Added styling for addendums in spell messages.

# 3.3.10

- (Maintenance) Updated Hazard sheet styling for newest System version.
- (Refinement) Improved gm vis styling for dice rolls.
- (Refinement) Improvements to PC Sheet color theme.

# 3.3.9

- (Fix) Fixed an issue where the sidebar in the default NPC sheet color theme would be affected by the sheet theme.
- (Refinement) Ensured that inactive icons in inventories are legible in dark themes.
- (Module compatibility) Changed some styling to play nice with PF2e Mobile Sheet.

# 3.3.8

- (Maintenance) Updated Familiar sheet styling to be compatible with newest System version.
- (Refinement) More updates to NPC sheet styling to be compatible with newest System version.
- (Refinement) Adjusted certain gm-visibility styling to be less obnoxious, and increased readability for pale/gray-ish damage types.

# 3.3.7

- (Maintenance) Updated NPC sheet styling to be compatible with newest System version.
- (Maintenance) Minor adjustments to PC sheet styling.
- (New) Adjusted styling to be compatible with new metagame dice roll setting.

# 3.3.6

- (Fix) Fixed an issue where the 'no theme' option for chat message theme didn't work.
- (Maintenance) Updated PC sheet styling to be compatible with newest System version.

# 3.3.5

- (Fix) Fixed logspam conflict with Force Client Settings (Courtesy of @JDCalvert)
- (Refinement) Improved navbar rendering.
- (Refinement) Added some styling for certain TAH menus.

# 3.3.4

- (Refinement) Various minor improvements.
- (Fix) Fixed an issue where the sheet theme would apply to ImagePopout applications.

# 3.3.3

- (Maintenance) Update certain selectors to keep in sync with System.
- (Refinement) Fixed rendering of degrees of success labels in Toolbelt for dark themes.

# 3.3.2

- (New) Added full theme support for the new Army sheets.

# 3.3.1

- (Fix) Fixed a chat header color issue (Courtesy of RobertBeilich).
- (Refinement) Various small tweaks to various themes.
- (BG3) Background is no longer tinted based on rolltype, instead the rolltype indicator is colored accordingly, and shown on hover for chat-merged messages.
- (Fix) Fixed an issue where RK chat messages from ITT would look bad on darker themes.
- (Maintenance) Reshuffled the migration code to the bottom of initialization, so if it breaks (due to conflict with FCS for example) the roundedness setting is still applied.

# 3.3.0

- (Custom CSS) Renamed some CSS variables for clarity.
- (Custom CSS) Check the new [Documentation](https://github.com/Dorako/pf2e-dorako-ui/wiki/Theme-Variables).
- (Foundry 2) Made the Foundry 2 chat message theme much more reactive to player color. Rolltype no longer influences background color, but instead colors the rolltype indicator in the header.
- (New) Added new "Do it Yourself" themes. These themes contain Dorako UI's theme framework, require you to supply your own custom CSS. Check the [Wiki](https://github.com/Dorako/pf2e-dorako-ui/wiki) for getting started.

# 3.2.4

- (BG3) Updated styling for BG3 theme NPC sheet and Familiar sheets.
- (Custom CSS) Breaking change due to rename `[data-dorako-ui-theme]` -> `[data-theme]`.
- (Refinement) Removed text-selection colors.
- (Refinement) Changed :hover style for compendium browser rows.

# 3.2.3

- (Fix) Fixed issue that broke Opaque interface theme.
- (Fix) Deleted migration code fully, to fix logspam.
- (Maintenance) Updated styling for Simple NPC sheets.

# 3.2.2

- (Fix) Fixed the Sheet theme color setting not applying at all.

# 3.2.1

- (Fix) Fixed an issue where CRB (Dark) sheet theme would be broken.

# 3.2.0

- (New) Excluded PFS premium module journals from styling.
- (New) Invalid settings from now on should be migrated to default values.
- (Refinement) Refactored the settings to hopefully increase clarity.
- (New) The old color-scheme-based-on-speaker setting has been replaced by two settings, one standard, and one for opposition.
- (New) Added BG3 blue variant chat message theme.
- (Refinement) Various fixes to various themes.

# 3.1.15

- (Fix) Excluded Party Overview module from theming.
- (Fix) Ecluded KingdomBuilder sheet from theming.
- (Fix) Fixed an issue where ITT would collapse before you could mouse over it, if it appeared on the left, with the BG3 app theme specifically.

# 3.1.14

- (Maintenance) Kept up to date with system styling for PC sheets.
- (Maintenance) Updated minimum required versions to be identical to Dorako UX. Running anything besides newest-everything is always unsupported.
- (New) New Discord chat message theme.

# 3.1.13

- (Refinement) Bunch of tweaks, including tweaks to crb-styled chat message headers.
- (Fix) Fixed certain themes not having toggle button variables.
- (Refinement) Found a way to still style the sidebar, without having styling from the sidebar trickle into the chat messages.
- (New) Added purple and black PC sheet color themes.

# 3.1.12

- (Refinement) Bunch of changes, including restyling of the navigation bar, and changes to toggles.
- (Fix) Fixed issue where the settings screen in CRB themes would be transparent if the Settings Extender module was activated.

# 3.1.11

- (Refinement) Lots of changes, especially to the BG3 theme. Some settings won't apply to the revised version just yet.

# 3.1.10

- (Refinement) Various improvements and fixes, including restoring nat 20/1 colors, un-styling the jump-to-bottom button, bright buttons.
- (New) New WIP Discord theme.

# 3.1.9

- (Refinement) Improved system that selects colors for chat message headers (or missing headers).
- (Refinement) Various small adjustments, including bg3 accent color, and giving opaque app theme an inline button theme which is relevant due to the effect panel.

# 3.1.8

- (Refinement) Bunch of small adjustments.
- (Fix) Fixed Opaque app theme's popped out sidebar windows being translucent.

# 3.1.7

- (Fix) Fixed BAM button text color.
- (Fix) Opaque app theme adjustments.
- (Fix) Various adjustments to CRB light theme.

# 3.1.5 + 3.1.6

- (Refinement) 3.1.4, but actually.

# 3.1.4

- (Fix) Fixed PC sheet lore input field text color on CRB light theme.
- (Refinement) Changed the gm vis color to be semi-transparent, so it fits a bit better with dark themes.
- (Fix) Adjusted selector for colored damage types.

# 3.1.3

- (Fix) Made Vehicle sheets use themes again.
- (Fix) Fixed inputs being grey rather than black on CRB dark color scheme.
- (Refinement) Removed the theme-colored backdrop for boxes on the PC sheet due to poor contrast.
- (Refinement) Made the red headers and blue buttons on the PC sheet theme follow PC sheet theme.
- (Refinement) Added new 'default' setting for PC sheet theme.
- (Fix) Fixed tox buttons.
- (Fix) Fixed contrast issue with unidentified effects on PC sheets.
- (Refinement) Increased contrast for colored headers on Dalvyn-styled journals.
- (Refinement) Re-enabled the colored text (rather than just glow) provided by See Simple Statistics Scale on appropriate themes.
- (Refinement) Adjusted navbar buttons.
- (Refinement) Further increased contrast of certain damage types on dark themes.

# 3.1.2

- (Fix) Fixed invalid default window app theme key.
- (Fix) Fixed color-inversion method for chat message headers.

# 3.1.1

- (New) Added compatibility with ripper's Taskbar module, courtesy of Kali.
- (Fix) Fixed the disabled chat message header setting resulting in poor contrast text.
- (Fix) Fixed the colored chat message header settings being less colorful than desired for CRB chat messages.
- (Fix) Fixed the foundry 2 theme having illegible text in gm-vis spans.
- (Fix) Added Levels to exclusion list.
- (Fix) Added FX Master to exclusion list.
- (Fix) Fixed button text color in CRB light theme.

# 3.1.0

- (New) Massive refactor. There's a high risk style issues, but once fixed it will apply to all themes.
- (New) New theme inspired by Baldur's Gate 3's UI.
- (New) All themes now have dark and light variant color schemes.
- (New) New setting where chat message color scheme is affected by the actor's Alliance.
- (New) Added support for the PF2e Exploit Vulnerability module.
- (Fix) Fixed custom css not working.
- (Removed) All legacy themes, and thousands upon thousands of lines of scss.
- (Removed) Several settings interacting with the legacy themes. Their functionality either doesn't make sense, or have been replaced.

# 3.0.6

- (Refinement) Adjusted styling for the daily crafting button and alt-weapon-usage hints on PC sheets.
- (Refinement) Reorganized theming structure to support future features. If you are using custom css to style Dorako UI, it might need updating.

# 3.0.5

- (Fix) Fixed the Foundry 2 theme not applying properly to Hazard and Familiar sheets.

# 3.0.4

- (Fix) Changed the window-app drop shadow to avoid rendering issue encountered when using the Electron client, electric boogaloo #2.

# 3.0.3

- (Fix) Changed the window-app drop shadow to avoid rendering issue encountered when using the Electron client, electric boogaloo.

# 3.0.2

- (New) Added support for Monk's Sound Enhancements.
- (New) Added support for Yendor's Scene Actors.
- (Fix) Changed the window-app drop shadow to avoid rendering issue encountered when using the Electron client.
- (Refinement) Reorganized theming structure to support future features. If you are using custom css to style Dorako UI, it might need updating.

# 3.0.1

- (Fix) Fixed an issue with chat message headers in CRB theme.

# 3.0.0

- (New) All non-UI functionality has been split to the new PF2e Dorako UX module.

# 2.11.22

- (Fix) Fixed certain input fields on NPC sheets being illegible.

# 2.11.21

- (Maintenance) Made adjustments to NPC sheet themes to keep up to date with system changes.
- (Maintenance) Kept up to date with system changes to system changes to add-gm-notes and editor buttons for dark theme.
- (Refinement) Adjusted Smalltime styling to account for date display.

# 2.11.20

- (New) Added support for Smalltime.
- (Refinement) Improvements to MATT colors in dark theme.
- (Refinement) Improved scoping of white background icons in compendium browser in Foundry 2 theme.

# 2.11.19

- (New) Added support for Quick Insert.
- (Refinement) Adjusted style of transparent tags on light theme NPC sheets.

# 2.11.18

- (Refinement) Various tweaks to light/dark/foundry2 NPC sheets.

# 2.11.17

- (New) Added support for Tagger.
- (Refinement) Refactored the NPC-sheet restructuring as a dorako-ux feature, meaning it works with Foundry 2 theme.
- (Refinement) Refactored the NPC-sheet styling so it is largely controlled by css variables.
- (Refinement) Re-implemented the Light/Dark Dorako themed NPC sheets using said simple variables.

# 2.11.16

- (Fix) Fixed an issue where Foundry2 theme did not get applied to ITT.

# 2.11.15

- (New) Added support for Monk's PF2e Encounter Aftermath module.
- (Fix) Fixed an issue where RK chat messages produced by ITT were illegible in Foundry 2 theme.

# 2.11.14

- (Maintenance) Update theming of spellcasting inputs and selects for NPC's for Foundry 2 to be compatible with recent system versions.
- (Refinement) Made PC-sheet theme setting influence more elements in Foundry 2 theme.

# 2.11.13

- (Refinement) Added styling for inline roll tooltips.

# 2.11.12

- (Maintenance) Update theming of damage-buttons to be compatible with system version 5.8.0.

# 2.11.11

- (Refinement) Added Foundry 2 styling for Speaking As.
- (Maintenance) Updated Foundry 2 styling for new version of Dice Tray.
- (Refinement) Impoved Foundry 2 styling for Journals using the CRB-styled journal setting.
- (Refinement) Rewrote exclusion logic to be more robust, so it doesn't falsely exclude things like the Camping sheet from the Kingmaker Tools (Unofficial) module.

# 2.11.10

- (Refinement) Added Foundry 2 styling for Item Piles.
- (Refinement) Made adjustments to degree of success colors in Foundry 2 theme.
- (Fix) Fixed some occurances of missing styles for Foundry 2 theme.

# 2.11.9

- (Refinement) Added Foundry 2 styling for Monk's TokenBar.
- (New) Added Foundry 2 styling for PF2e Toolbelt's heroic action stuff.
- (Maintenance) Changed localization in send-to-chat functionality.

# 2.11.8

- (Refinement) Improved Foundry 2 styling for TAH.
- (Refinement) Adjusted damage type colors for Foundry 2 theme.
- (Refinement) Made minor tweaks to certain pf2e chat messages in Foundry 2 theme.
- (New) Added Foundry 2 styling for Workbench's NPC roller journal.
- (Fix) Adjusted selector that adds white background to icons to be more cleanly scoped to compendium browser.

# 2.11.7

- (Refinement) Increased legibility of action-cost icons in Compendium Browser in Foundry 2 theme.
- (Fix) Fixed an issue where PF2e Perception would not be styled correctly.
- (Maintenance) Updated the remove-attack-info-from-damage-rolls setting to work in newer system versions.

# 2.11.6

- (Refinement) Introduced new Foundry 2 colors for toggled-off state, whisper messages, blind messages.
- (Refinement) Adjusted certain text color in Foundry 2 message theme to be more legible on colored backgrounds.
- (Refinement) Made disabled range inputs cool rather than warm in Foundry 2 theme.
- (Ugly Hack) Set the height of all dialogs to auto, to avoid scrollbars on small dialogs.
- (Ugly Hack) Set the height of the token-sheet to auto, to avoid nav buttons adjusting size.

# 2.11.5

- (Fix) Reverted to using relative file paths to fix an issue with servers with route prefix.
- (Refinement) Adjusted the inputs in the token HUD.
- (Refinement) Ensured that Year of Monsters journals are excluded from styling.

# 2.11.4

- (Refinement) Minor improvements to Foundry 2 theme for ITT.

# 2.11.3

- (Maintenance) Fixed a regression where rarity-colored labels from Workbench would be illegible in Foundry 2 theme.

# 2.11.2

- (Refinement) Foundry 2 theme now always removes application backgrounds, fixing legibility issues with applications that add their own (light) backgrounds.
- (Maintenance) Fixed a regression to PC sheets where certain elements would not be styled as expected with the Foundry 2 theme active.

# 2.11.1

- (New) Added Foundry 2 styling for Forien's Quest Log.

# 2.11.0

- (Refactor) Massive internal refactor.
- (Refinement) Added Foundry 2 styling for Token Action HUD.
- (Refinement) Allowed certain header input fields to inherit height in Foundry 2 theme.
- (Fix) Fixed a regression where PF2e See Simple Scale Statistics labels would be colored in the default Dorako theme.

# 2.10.11

- (Refinement) Ensured that Jewel of Indigo Isles and World of Indigo Isles journals are excluded from styling.
- (Refinement) Added Foundry 2 styling for Tokenizer.
- (Refinement) Added Foundry 2 styling for MLD's Token HUD.
- (Refinement) Added Foundry 2 styling for Monk's active token thingie.
- (Refinement) Fixed several Foundry 2 styling issues related to biography on PC sheets or spell prep.
- (Refinement) Ensured that Foundry 2 styling doesn't apply to .pf2e tables, like those in class descriptions.

# 2.10.10

- (Refinement) Ensured that Season of Ghosts journals are excluded from styling.
- (Refinement) Improved spell section for NPC sheets in Foundry2 styling.
- (Refinement) Made Foundry 2 styling compatible with Condition Manager from Workbench.
- (Refinement) Made Foundry 2 styling compatible with Monk's hotbar expansion.
- (Refinement) Improved Foundry 2 styling for dice tray.
- (Refinement) Adjusted how player colors blend fo Foundry 2 chat message headers.

# 2.10.9

- (Refinement) Made Foundry 2 theme play nice with Workbench setting that adds rarity colors to feats and spells.
- (Refinement) Improved Generate Check prompt in Foundry 2 and Dark theme.
- (Refinement) Improved styling for PF2e Perception.

# 2.10.8

- (Maintenance) Fixed an issue where the RE editor would have a white background with Foundry 2 or Dark theme active.
- (Maintenance) Fixed some regressions in the regular dark theme.
- (Fix) Fixed an issue where the PC color theme would not apply to character sheets.

# 2.10.7

- (Refinement) Added Foundry 2 styling for Vehicle sheet.
- (Refinement) Vehicle sheet now respects PC sheet color theme setting.

# 2.10.6

- (Refinement) Added Foundry 2 styling for PC sheets and Kingdom sheets. All sheets should now be styled.

# 2.10.5

- (Refinement) Added Foundry 2 styling for the Critical fumble deck journals also...

# 2.10.4

- (Refinement) Added Foundry 2 styling for the Critical hit deck journals.
- (Fix) Resolved an issue where the CRB styled journal styling would affect the Critical hit deck journals.
- (Refinement) Refactored the Foundry 2 styling to use more mixins.
- (Refinement) Various minor adjustsments to Foundry 2 styling.

# 2.10.3

- (Refinement) Made the new Foundry 2 sheets actually render automatically, rather than only via debug button...
- (New) Added Foundry 2 styling for new "Check Prompt Generator".

# 2.10.2

- (Refinement) Tonnes of adjustments and additions to Foundry 2 theme.
- (Refinement) Journals now work in Foundry 2 theme.
- (New) Foundry 2 application theme now applies to Party, NPC, Familiar, Hazard, and Loot sheets. PC and Kingdom sheets are rendered as Dorako UI's normal dark theme.

# 2.10.1

- (New) Added a new chat theme inspired by the modern Foundry design. Is automatically enabled when using the application theme, but can also be used on its own.

# 2.10.0

- (New) Added a new application theme inspired by the modern Foundry design. Sheets with no explicit support will render as system default.

# 2.9.1

- (Maintenance) Update Polygot styling to be compatible with new-new-new-new version.
- (Refinement) Adjust styling of inputs in sidebar to differentiate them better from buttons.

# 2.9.0

- (New) Added dark-theme styling for Code Mirror when editing Rule Elements.
- (Refinement) Added second generation glass styling to buttons and inputs in the sidebar. Feedback appreciated.

# 2.8.5

- (Maintenance) Update Polygot styling to be compatible with new-new-new version.
- (Maintenance) Update jump-to-button styling to be compatible with Core Foundry changes.

# 2.8.4

- (Maintenance) Updated to be compatible with new-new Polyglot version.

# 2.8.3

- (New) Updated Polyglot styling so it applies to the new elements. The player colors are made more prominent, and will use an extra row if needed.

# 2.8.2

- (Refinement) Adjust toggle-traits in Kingdom sheet to be blue to be consistent with general Dorako UI UX pattern.
- (Fix) Fixed a heading that was illegible in dark theme Kingdom sheets.

# 2.8.1

- (New) Add dark-theme support for Kingdom sheet.

# 2.8.0

- (Refinement) Signficant additions to "mark as premium" functionality to avoid conflicting with premium content styling.

# 2.7.6

- (New) Initial support for Kingdom sheet.

# 2.7.5

- (Maintenance) Fix NPC sheet breakage caused by 5.6.0.

# 2.7.4

- (Refinement) Made the circular effect HUD sharper, with less perceivable aliasing.
- (Fix?) Potentially fixed an issue where non-gamemasters would sometimes see the normal circular effect hud for npcs.

# 2.7.3

- (Fix) Fixed an issue where the glassy theme would use dark backgrounds even in light mode.

# 2.7.2

- (Fix) Exclude Journal Improvements sheets from dark-theme.
- (Refinement) Made tags in Hazard and Familiar sheets use the new styling.
- (Refinement) Made long text in tags (conditional IWR, etc.) not overflow the tag when wrapping.
- (Refinement) Extended the glassy sheet theme option to affect Hazard and Familiar sheets.

# 2.7.1

- (Refinement) Missed a spot when styling 'use' buttons for NPCs.

# 2.7.0

- (New) New setting that can be used to enable an experimental look for NPC sheets, that is more HUD-like.
- (New) Added styling for 'use' buttons for NPCs.

# 2.6.16

- (New) Make chat-merged messages show message-buttons on hover.
- (New) Make deletion of chat-merged messages update neighbouring messages appropriately.
- (Refinement) Adjusted tag styling in more interface elements.

# 2.6.15

- (Refinement) Made several changes to improve the styling of Token Action HUD PF2e, including making it react to the roundness setting, updating the styling of tags and inline links.
- (Refinement) Made TAH more snappy by disabling animations on certain buttons.
- (Fix) Added a white backdrop to the tagify editor in TAH, when using dark-theme.
- (Maintenance) Fixed some buttons in the compendium browser that looked real bad in dark-theme.

# 2.6.14

- (Maintenance) Removed the action-glyphs added by the system when "Restructure card info" setting is active, as it already did that.
- (Refinement) Improved and standardised styling of tags in chat messages.

# 2.6.13

- (New) Added styling for new Token HUD 'delay' button from Flatcheck Helper module.
- (Fix) Automatically expand scene navigation when Carousel Combat is dismissed, while Compact UI is enabled, to resolve an issue where scene navigation would be inaccessible.

# 2.6.12

- (Refinement) Added dark-theme styling for the 'click me' button indicator in chat messages, but for realsies.

# 2.6.11

- (Refinement) Added dark-theme styling for the 'click me' button indicator in chat messages.
- (Fix) Adjusted dark-theme styling worn/invested states of equipment on PC sheets.

# 2.6.10

- (Maintenance) Fixed dark-theme legibility issue with inventory buttons on loot sheets.

# 2.6.9

- (Refinement) Small improvements to dark-theme support for Party Sheet.

# 2.6.8

- (Fix) Fixed certain inline buttons in ITT having the wrong text color.
- (Refinement) Adjusted ITT styling to make certain labels more legible, and made headers go to the border.
- (Maintenance) Fixed dark-theme legibility issues with certain labels on items.
- (System) Low effort support for the Fabula Ultima system. Some stuff might work, some stuff might not.

# 2.6.7

- (Maintenance) Fixed some low-contrast dark-theme issues.
- (Maintenance) Fixed an issue where reload and range increments were unreadable on dark-theme.
- (Maintenance) Re-added missing ornamentation styling for expanded actions dark-theme PC sheets.

# 2.6.6

- (Maintenance) Kept up-to-date with system class names to fix an issue where saves on NPC sheets were cut short.

# 2.6.5

- (Fix) Fixed dark-theme styling for Spell Preparation sheets.

# 2.6.4

- (Refinement) Fixed a margin conflict with Button Feel.
- (Refinement) Improved dark theme styling for damage type buttons on PC sheet strikes.

# 2.6.3

- (Refinement) Further improvements to Party Sheet dark theme.
- (Refinement) Made adjustments to the jump-to-bottom chat button. It no longer overlaps with the chatbox, or other module buttons in that general area.
- (Fix) The jump-to-bottom button should no longer persist after clearing the chatlog.

# 2.6.2

- (Maintenance) Fix various dark-theme breakages introduced in system 5.4.1.
- (New) Initial Light and dark-theme support for Party Sheet.

# 2.6.1

- (New) Styling of Party Sheet's "clown car" button to make it fit with other control buttons.
- (Maintenance) Keeping up to date with system for PC sheets.
- (New) Initial support for Kineticist in PC sheets.
- (Maintenance) Minor adjustments to the "inline button"-family of buttons.

# 2.6.0

- (Refinement) Updated styling of Idle's Token Tooltip courtesy of Symon.
- (Refinement) Converted certain styling to variables to allow for easier changes.
- (New) Added a new UX setting for changing the roundedness of UI elements.
- (New) Added a new UX setting for changing the alignment of controls.
- (New) Added a new UX setting for changing the size of control and navigation elements.
- (Fix) Fixed an issue where Dorako UI and Forien's Easy Polls would result in an infinite loop when opening the dialog.

# 2.5.0.1

- (Bugfix) Removed Roll of Fate code that didn't work

# 2.5.0

- (New) Added a new experimental UX setting "Enable chat merge?" based on DFCE's chat merge functionality.
- (New) Added a new experimental UX setting "Adjust chat controls?" based on DFCE's privacy buttons functionality.
- (New) Added ability to set keybinds for specific rolltypes, or toggling between public and secret, when new chat controls feature is enabled.
- (Maintenance) Fixed an issue that caused certain buttons in the Effects Panel overlay to break.
- (Maintenance) Potentially fixed an issue where inline links in the new AP were unreadable.

# 2.4.0

- (New) Added a new "PC sheet theme" setting, which allows picking between three color themes.
- (Maintenance) Adjusted some styling to account for system changes.

# 2.3.9

- (Maintenance) Updated styling and code to account for renaming of Ability Scores to Attributes, to ensure compability with PF2e System 5.3.0

# 2.3.8

- (New) Added a new "green" option for chat message headers. The color is based on the "Remaster" color scheme.
- (Module) Added support for the Window Tabs module. The module provides its own style support for Dorako UI, this change just ensures it plays nice with dark theme.
- (Maintenance) Readded a padding the system had removed that caused vertical bars in spell footers to hug the text too tightly.
- (Maintenance) Removed a padding the system had added to template buttons that caused the 'repost' button to be offset from the edge.

# 2.3.7

- (Maintenance) Updated styling of effect panel information to avoid new solid background introduced by system change
- (Refinement) Styled the effect badges in the token HUD. They're now larger.
- (Maintenance) Fiddled with the inline buttons/checks/links again to resolve an issue in AV journals. Let me know if other premium module journals are affected.

# 2.3.6

- (Maintenance) Update styling so templates and broken links are legible in dark theme once again

# 2.3.5

- (Refinement) Added a new section in settings related to customizing other modules. The section only shows if you have a module with supported customizations active.
- (Refinement) Added a setting to customize whether PF2e Interactive Tooltip uses a monochrome or colorized suite of icons

# 2.3.4

- (Maintenance) Update styling so inline checks are legible in dark theme once again
- (Refinement) Update sidebar resizer functionality to also work for popped out journal directory and settings

# 2.3.3

- (Maintenance) Update to make Familiar sheets render correctly with dark theme enabled

# 2.3.2

- (Maintenance) Small adjustments to NPC sheet sidebar to keep up with system style changes
- (Maintenance) Keep up to date with renamed effect panel in 5.2.1

# 2.3.1

- (Refinement) Did a better job cleaning up the removal of the chat-height setting, which amongst other things caused the 'ux settings' header to disappear from settings. Note that the new 'sidebar resizer' functionality allows you to adjust the height of chatboxes by dragging from the top.
- (Refinement) Improved sidebar resizing functionality so it plays nicer with modules that need to know the width of the sidebar

# 2.3.0

- (Module) Added support for PF2e Utility Buttons (formerly flatcheck-helper)
- (New) :pacman:'d the Sidebar Resizer module, with some improvements to functionality
- (Refinement) Updated the jump-to chatlog button to be more visible, and is now properly centered even on wider chatlogs

# 2.2.5

- (SWADE) Fix a regression causing non-journal application windows to not be tagged as "premium" and thus render with incorrect backgrounds
- (Maintenance) Make v11-style file path favorites be legible in dark theme
- (Refinement) Styled the 'jump-to' chat button
- (Maintenance) Refactored rolltype-indication setting into a toggle
- (Maintenance) Removed the 'experimental' wording from the adjust-effect-hud setting and made it default to true

# 2.2.4

- (New) Adds a UX setting to remove compendium banner images in the sidebar

# 2.2.3

- (Maintenance) Fixed a small dark-theme PC sheet regression caused by system version 5.0.1
- (New) Now 100% more hotreloading

# 2.2.2

- (Maintenance) Initial V11 support
- (Maintenance) Updated Interactive Token Tooltip styling to be compatible with recent versions

# 2.2.1

- (Module) Support for Idle's PF2e Token Hud/Interactive Token Tooltip module

# 2.2.0

- (Maintenance) Update PC sheet styling to account for new versatile/modular buttons
- (New) Application windows from the Kingmaker unofficial module are now excluded from dark mode
- (New) Journals from Mercenary Marketplace Volume 1 are now treated similar to AV/BB journals
- (Refinement) Highlighted background in chat messages generated by Item Piles are now legible in dark theme

# 2.1.11

- (Refinement) Adjust starting angle of Token Effects HUD icons.

# 2.1.10

- (Refinement) Add anti-aliasing to Token Effects HUD icons, courtesy of @Wasp.

# 2.1.9.1

- (Maintenance) Removed console noise when rendering dialogs.

# 2.1.9

- (Maintenance) Unexciting improvements.

# 2.1.8

- (Fix) Removed debugger statement (whoops).

# 2.1.7

- (Refinement) Made the token effect setting evaluate its "activeness" during initialization. 'Disabled' should actually act as 'disabled'.

# 2.1.6

- (Refinement) Refactored token effect code to be more sane. Might have fixed issue where applying and effect for the first time would sometimes make it big and square.

# 2.1.5

- (Fix) Fix canvas rendering breaking due to skull overlay change in 2.14 when adjusted token setting was disabled.

# 2.1.4

- (Refinement) Adjusted token effect icons are now larger.
- (Fix) Skull overlay should be more reasonably sized when the adjusted token effect setting is enabled.

# 2.1.3

- (Module) Add support for Item Piles. The current implementation should also add support for other Svelte-based modules, but if that turns out to be too breaky I'll have to adjust.

# 2.1.2

- (Fix) Fixed an issue that messed up the token effects HUD when the new experimental setting was _not_ enabled.

# 2.1.1

- (Fix) Adjust token effects HUD setting now accounts for the scene's gridsize.
- (Refinement) Adjust token effects HUD setting now looks nicer.

# 2.1.0

- (New) New experimental setting that arranges token effects around the token, instead of covering the token up.

# 2.0.10

- (New) Add support for Pin Cushion tooltips.
- (New) Add support for Illandril's Token Tooltips courtesy of @Vesselchuck.
- (Fix) Fixed an issue where non-GM's viewing Monk's Enhanced Journals would see no background.

# 2.0.9

- (Fix) Actually compile the stylesheet from 2.0.8 so it is included (whoops).
- (New) zh-tw localization thanks to zeteticl.

# 2.0.8

- (Refinement) Adjustment to increase contrast of secondary labels for dark theme.

# 2.0.7

- (Refinement) Made the Compact UI setting account for Foundry's Audio/Video sidebar.

# 2.0.6

- (Maintenance) Ensure clickable elements in effect panel text descriptions are styled appropriately.

# 2.0.5

- (New) Added dark theme support for Dice Stats module.
- (Maintenance) Support MLD roundmarkers from the new splinter module Monk's Combat Details.

# 2.0.4

- (Maintenance) Fix some issues affecting dark theme PC sheets introduced by recent system update.
- (Refinement) Update Effect Panel styling so Auras look glowy and distinct from other effects.

# 2.0.3

- (Fix) Made sure that form button styling does not apply to prosemirror dropdowns, fixing an issue where dropdowns became illegible when hovered.
- (Refinement) Made Dalvyn's CRB styled journals' font apply to text in journals in MEJ.

# 2.0.2

- (Refinement) Improved Compact UI mode so canvas elements near controls are clickable

# 2.0.1

- (Fix) Fixed an issue where Dalvyn's CRB styled journals was applied regardless of setting
- (Fix) Fixed an issue where Module Management+'s export screen was illegible in dark theme
- (Fix) Fixed an issue where some text in the critical deck journal was illegible
- (Fix) Fixed an issue where dark theme support for Monk's Enhanced Journals was not working right, by blacklisting MEJ from dark theme until I have the energy to debug it again

# 2.0.0

- (New) Added screenshots to the github page; updated the FVTT module page description.
- (New) New feature that allows disabling Dorako UI for any supported Application, if you prefer the unstyled version.
- (New) New feature that allows you to use custom CSS for those nitpicky personal fixes.
- (New) Added dark theme support for Monk's Enhanced Journals.
- (New) Added dark journal support for Monk's Enhanced Journals.
- (New) New localization (Simplified Chinese) courtesy of sakusenerio.
- (Refinement) Overhauled the way the module handles fancy journals. The module now adds a .premium class to such journals and pages, and css has been updated to exclude any journal with that class.
- (Refinement) Overhauled Dalvyn's CRB-styling. Now also works while editing a journal. Should play nice with any combination of dark journals, MEJ, premium journals, etc.
- (Fix) Fixed an issue where spell cast time was using 'cost' label.
- (Refinement) Added Cost and Ritual-specific properties such as amount of secondary casters and primary and secondary check to the restructured spell cards section.
- (Maintenance) Slightly changed the logic for applying the Dorako UI window style. There should be no visual change, if you encounter regressions where window-app applications are missing their styling, please report them.
- (Refinement) Updated logic relating to settings that would cause the rerendering of many chat messages. A warning is now shown if you have 100+ messages, and you will be asked to reload manually once finished.
- (Maintenance) Update the 'animated cards' setting to be disabled by default.
- (Refinement) Updated the Effects Panel with styling for rolling persistent damage and recovery checks.
- (Refinement) Updated the dark theme styling to support the new GM notes functionality from the system.

# 1.12.7

- (Module) Add support for Monk's Active Tile Triggers.
- (Refinement) Extended Dalvyn's CRB-styling to also affect journals during editing.

# 1.12.6

- (Refinement) Treat pf2e-bb like pf2e-av, which should exclude its journals from Dalvyn's CRB-styling, but keep the Dorako UI journal frame.

# 1.12.5.1

- (SWADE) Finally for reals exluded SWPF sheets once and for all. Thanks, Pinnacle Entertainment Group!

# 1.12.5

- (SWADE) Finally exluded SWPF sheets once and for all. Thanks, Pinnacle Entertainment Group!

# 1.12.4

- (Fix) Rejiggered some css to fix an issue where certain window apps unintentionally got a sheet background. This also undoes the second SWADE bullet in 1.12.3.

# 1.12.3

- (SWADE) Added support for the Card Hand Mini Toolbar module. (Use 'above Players' position if used with centered hotbar)
- (SWADE) Probably exempted SWPF Premium Module character sheets from styling.
- (Refinement) Ensure that "avatars react to critical degree" setting does not apply for messages where players cannot see the roll.
- (Refinement) Improved styling for new Token Action HUD Core + Pathfinder.
- (Refinement) Improved styling of Monk's Scene Navigation when 'Back button' is disabled.
- (Refinement) Updated 'Dorako UI' settings menu styling.

# 1.12.2

- (Fix) Removed some WIP settings that had snuck into the last release.
- (Fix) Fixed an issue where Dalvyn's CRB styled journal styling was not applying to all journals.

# 1.12.1

- (Module) Added support for Chat Reactions.
- (Fix) Fixed an issue where Monk's Enhanced Journals would under some circumstances not have a background.
- (Refinement) Extended dark theme support for chat messages sent via Monk's Enhanced Journals.

# 1.12.0

- (Overhaul) Replaced the setting submenus with groups. This allows modules like Force Client Settings to easily work again.
- (Fix) Fixed an issue where critical hit deck journals were illegible in dark theme. Also excluded them from Dalvyn's CRB styling.
- (Maintenance) Fixed an issue where PF2e Dailies would sometimes show text on top of text.

# 1.11.25

- (SWADE) Made the token/portrait avatar setting functional.
- (SWADE) Possibly avoided style collision with SWPF premium module.
- (Fix) Fixed a regression that caused Damage Log messages to lose their background color.
- (Module) Added support for Monk's Scene Navigation.
- (Refinement) Updated support for new PF2e Target Damage features.

# 1.11.24

- (Fix) Fixed an issue where Token Action Hud Core integration was not working as expected due to TAHC registering its settings much later than expected.
- (Fix) Fixed an issue where some Journals were dark-themed regardles of the dark-theme journals setting.

# 1.11.23

- (SWADE) Blacklisted complex SWADE sheets from dark-theme.
- (SWADE) Rejiggered some things to make SWADE journals compatible with dark theme.
- (SWADE) Updated all instanced of 'red' (--primary) in SWADE to be the SWADE accent color.

# 1.11.22

- (Refinement) Updated the wrapping-behavior of long in-character and player names. In general more stuff should avoid reflowing.
- (SWADE) Added experimental compatability with SWADE. Lots of stuff expected to work not-quite-right.

# 1.11.21

- (Module) Added support for Monk's Enhanced Journals.

# 1.11.20

- (Fix) Fixed an issue where Monk's Enhanced Journals were unaffected by Dalvyn's CRB-styled journals.

# 1.11.19

- (Refinement) Ensure AV premium module journal entries are unaffected by dark-theme journal setting.
- (Refinement) Update Dalvyn's CRB-styled journals to work with dark-theme journal setting.

# 1.11.18

- (Module) Added support for Token Action Hud Core (+ Pathfinder).

# 1.11.17

- (Maintenance) Fixed regression in styling of PF2e Dailies.
- (New) Added a new setting for enabling dark-theme for journal entries. Note that you might have to make different color-choices in journal entries for them to be legible.

# 1.11.16

- (Refinement) [Cuingamehtar] Spell area types are now localizable.

# 1.11.15

- (New) Remade the styling for the Combat Carousel module, removed the old misc. setting.

# 1.11.14

- (Refinement) When player-tags are enabled, remove the non-tag speaker name if it is identical to the tag. This conserves space.
- (New) New UX setting that animates whispers from players to GM to draw attention to them.

# 1.11.13

- (Fix) Fixed an issue where TinyMCE text editors were illegible while editing in dark theme.

# 1.11.12

- (Maintenance) Mark Tokenizer as dark-theme incompatible.

# 1.11.11

- (Fix) Fixed an issue where rarity-colors were illegible in dark theme.
- (New) New UX setting to collapse the navigation bar by default.

# 1.11.10

- (Refinement) Improved dark-theme styling of the compendium browser.
- (New) New UX setting to collapse the sidebar by default.

# 1.11.9

- (New) Added dark-theme support for Party Overview.

# 1.11.8

- (Maintenance) Fixed a system regression that caused numbers in the effect panel to be missing.

# 1.11.7

- (Fix) Fixed modifier buttons in dark theme PC sheets' sidebars.

# 1.11.6

- (Fix) Ensured anti-premium module rules are also applied from dark theme styling.
- (Fix) Fixed an issue where the load order of style sheets was causing various regressions.

# 1.11.5

- (Maintenance) Re-organize sass files, update release flow

# 1.11.4

- (Fix) Fix Adventure Importers with fancy frames getting overwritten. The logic that was formerly used for only Journals is now applied to all windows.

# 1.11.3

- (Fix) Fixed illegible text in dark theme windows with sidebars
- (Fix) Fixed illegible buttons in TinyMCE journal sheets. Both default and TinyMCE journal editors are now excluded from dark theme.
- (Fix) Fixed a regression on dark theme PC sheets where input fields were illegible.

# 1.11.2

- (Fix) Made the TAH-nag actually go away forever if you tell it to
- (Fix) Limited scope of styling to avoid affecting prose-mirror dropdowns, to resolve an issue where the dropdowns because illegible on hover
- (New) Loot sheet now has dark theme compatibility
- (Fix) Maybe fixed migrations, we'll see
- (Fix) Made sure the module doesn't overwrite the background used in journals of the Abomination Vaults premium module v2
- (Maintenance) Extended the styling to affect the system version of persistent damage, not just the module version

# 1.11.1

- (Fix) Resolved an issue that caused scrollbars to appear on small dialogs
- (Module) Dark-theme applications have support for PF2e Workbench's new rarity colors
- (New) Styled Hazard sheets and Familiar sheets - also for dark theme
- (Refinement) Improved styling for Basic Action Macros
- (Module) Now notifies users of Token Action HUD that there is a Dorako UI style, if it is not currently selected
- (New) Attempted to migrate dark-theme settings to a new centralized 'application theme' setting

# 1.11.0

- (Refinement) Spell buttons in light theme chat messages are now colored
- (Refinement) Increased the scope of styling to affect various minor dialogs, and adding dark theme support
- (Refinement) Many small tweaks to various Applications and sheets, affecting both light theme and dark theme
- (Fix) Updated PC and NPC dark themes to be compatible with the new dark theme settings
- (New) Settings are now applied immediately when saved, and chat messages are re-rendered, allowing you to quickly find a look to suit your preferences
- (New) Chat bubbles are now styled
- (New) New debug setting allows you to quickly check the styling of a window with/without Dorako UI and in light/dark theme
- (Fix) Mystified text in NPC/PC dark theme sheets are now styled appropriately
- (Fix) The glow of mystified effects is now secret-purple and no longer clips the left edge
- (New) The crit/fumble deck is now styled
- (Module) The Gatewalkers premium module journals have been verified to be working fine. All premium modules with fancy journals are entirely excluded from being styled by Dorako UI.
- (New) New feature that notifies GM's of a conflict with a default-on setting for Monk's Little Details, and allows resolving it in multiple ways.
- (Fix) Re-implemented the "Hide avatar for secret rolls" setting.

# 1.10.2

- (Fix) Fix an issue where all settings were turned into world settings
- (Module) Made TAH's Dorako UI theme adhere to changes to glass-bg and frosted-glass
- (Fix) Fix optgroups in selects on Windows being illegible on dark theme

# 1.10.1

- (Fix) Fix selects on Windows being illegible on dark theme or Polyglot
- (Fix) Fix default values for some settings referring to non-existing keys
- (New) Made several settings apply on saving, thereby not requiring a refresh

# 1.10.0.1

- (Fix) Fix theme setting for NPC sheets not working

# 1.10.0

## The settings release

- (New) Split the module into four setting menus
- (New) By popular demand, added new setting to disable the Cards tab in the sidebar
- (Fix) Partially reverted fix to CGMP's re-styling of emotes, so now only the colors is resat, and only for dark theme messages
- (Fix) Potentially fixed issue where Polyglot's dropdown is illegible on certain browsers

# 1.9.14.1

- (Fix) Whoops, that text shadow crept into messages as well, which made light theme messages looks very weird

# 1.9.14

- (New) Glass background color is now user-configurable in settings
- (New) Frosted glass setting is back, and also user-configurable in settings
- (Fix) Filepicker+ apparently also has a sidebar - which is now fixed
- (Refinement) Added text shadows to sidebar to better support bright or very transparent background colors

# 1.9.13

- (New) Added support for chat bubbles
- (Fix) Fixed issue where mirrored tokens had their avatars upside down
- (Maintenance) Updated module-support for new classic styling of PF2e Target Damage
- (Fix) Fixed one of the familiar themes not working (and associated console error)
- (Fix) Fixed issue where nat 1/20 were not colored appropriately in dark mode messages
- (Refinement) Extend dark mode messages theme support to crit deck buttons

# 1.9.12

- (Refinement) Further expanded the scope of dark theme for app sheets
- (Refinement) Updated Token HUD and Navigation styling
- (Maintenance) Updated module-support for PF2e Target Damage 2.0
- (Fix) Fixed missing localization string

# 1.9.11

- (Module) Added compatibility with Forgotten Adventures Battlemaps module
- (Refinement) Updated styling of conditions with Monk's Little Details enabled
- (Fix) Fixed an issue where certain chat messages were illegible for dark chat messages with Cautious Gamemaster's Pack is enabled
- (Refinement) Further expanded the scope of dark theme for app sheets
- (Refactor) Massive refactor of the code, increasing maintainability

# 1.9.10

- (Refinement) Massively expanded scope of dark theme for app-sheets
- (New) Added a new setting for theming all Dialog sheets
- (Refinement) Improved changelog with proper linebreaks!

# 1.9.9

- (New) Added styling for the Monarch module
- (Fix) Fixed numerator of frequency skills being illegible on dark mode pc sheets
- (Fix) Fixed description of rolltable messages being illegible on dark mode chat messages
- (Refinement) Added a light background to rolltable images on dark mode chat message, to ensure good contrast
- (Refinement) Update sidebar tab styling to leave more room for modules that add buttons
- (New) Setting for dark-theme styling of Filepicker and Token Config
- (Fix) Style incompatability with Filepicker+ now actually fixed

# 1.9.8

- (Refinement) Make scrollbar track for effects panel invisible
- (Fix) Make collapsed sidebar not take up all the vertical height
- (Fix) Ensure module is not styling Monk's Little Details' roundmarker chat messages
- (Refinement) Fix double-shadowing of hotbar
- (Refinement) Improve styling of Monk's Tokenbar
- (Refinement) Minor updates to TAH styling

# 1.9.7

- (Refinement) Extended dark theme styling to affect variable-action cost spell buttons
- (Fix) Fixed poor contrast styling for dark chat messages from Monk's tokenbar

# 1.9.6

- (Refinement) Updated styling of status effects in the combat tracker
- (Refinement) Updated the hover-glow for links to be more visible
- (Refinement) Updated styling of effects panel, and ensure navigation doesn't overlap effect panel
- (Refinement) Updated styling of tooltips and context menus
- (Refinement) Added clickability affordances to the Players UI
- (Fix) Possibly fixed style incompatability with Filepicker+
- (New) Effect panel now scrolls vertically if there are too many effects to fit on screen

# 1.9.5

- (Refinement) Updated styling for token hud, and extended it to also affect tile hud
- (New) Compact controls setting is back
- (New) Added styling for status-effect messages for both light and dark mode
- (New) The glassy background can now be adjusted via the --glass-bg css variable

# 1.9.4

- (Fix) Option for removing redundant information from damage rolls now functional again
- (Refinement) Improve spacing around persistent damage button on chat light theme
- (Fix) Fixed chat functionality breaking when chat messages have origins where the uuid cannot be fetched synchronously (e.g. feats/spells linked from compendium actors)

# 1.9.3

- (Fix) Custom Hotbar now works without Monk's Hotbar also being enabled
- (Refinement) Scene controls that use images are now tinted a similar color as scene controls that use image-fonts
- (Refinement) Minor updates to TAH style
- (Refinement) Secret inline-rolls are now more saturated in dark theme chat messages

# 1.9.2

The hotbar patch!

- (Module) Support for Custom Hotbar
- (Module) Improved support for Monk's Hotbar expansion
- (Module) Updated styling for Token Action HUD
- (New) Support for 'centered hotbar' (once again)

# 1.9.1

This is kind of a 1.9.0++ release.

(Maintenance) Update css classes that were changed by the system
(Maintenance) Update npc sheet styling to use new IWR data locations
(New) Use modified colors for IWR for dark chat theme
(Removed) Various settings have been removed due to the refactor. If something you were using is gone, please create an issue for it.

# 1.9.0

Reimplemented much of the styling in Sass, which will make it easier to maintain and contribute to the project.

Fix to area styling of spells.
Fix to checks missing strike-through styling when degree of success is adjusted.
Fix coloring of adjusted AC/saves in new NPC sheets.

Several updates by @MrVauxs:

Uses v10 API for saving settings.
Updates to Damage Target module styling.

# 1.8.4

Added themes for NPC sheets.

Added a smol theme for Loot sheets.

Bugfix to jittery chatbox with "Show who's typing" turned on, courtesy of @MrVauxs.

Bugfix by @MrVauxs that causes Chat Avatars to be determined after other modules have had a chance to modify the message. This means that Cautious Gamemaster's Pack's settings to limit what actors the GM can 'speak' as will be consistent with the Avatar shown.

# 1.8.3

Fixed bug in which 'Avatars react to degree of success' setting did nothing due to roll changes in the system.

Added styling for the Speaking As module.

Added new option to hide the dice next to rollmodes, as it tends to crowd the UI.

Teeny tiny fix to adjust the margins of the button introduced by Chat Images.

# 1.8.2

Fixed display of DFCE 'in world' timestamps in messages.

Added a new option to remove attack information from damage rolls, to get a similar look to 1.7.4's combine-attacks-and-damage-rolls feature, when used with DFCE chat merge.

Fixed bug that caused action costs in restructured spell messages to render as numbers rather than icons.

# 1.8.1

Fixed display of combined messages with Avatars disabled.

Fixed flavor-text duplication for Request Roll messages in Monk's TokenBar module.

# 1.8.0

Fixed visual styling of Narrator Tools and Alpha Suit modules in the Controls.

Fixed effect tooltip going off-screen when using modules that increase the tooltip size.

Fixed nat 1/20 color support of inline rolls.

Fixed display of action cost for spells with cast time in minutes.

Removed combine-attacks-and-damage-rolls feature, instead improved support for DF Chat Enhancement's chat merge functionality. I recommend setting the combine setting to 'any'.

Removed TAH theme (or rather, made it simply add a gap). Use the 'Dorako UI' style option in TAH.

# 1.7.4

Added feature to combine weapon attack rolls with damage rolls visually.

# 1.7.3

Added feature that makes action cost more prominent, and restructures spells to be more easily readable.

Added partial support for Japanese localization by Ollie2304

# 1.7.2

Added theme override for Simple Calendar - remember to activate the 'Classic' theme in Simple Calendar.

# 1.7.1

Added 'Send to chat' feature.

Added support for @Dalvyn's CRB-styled journals.

Added full French localization by @rectulo.

Added partial support for German localization by @Allalinor ッ.

Added partial support for Portuguese localization by @Samir Sardinha.

Various style fixes to combat tracker in popped-out mode.

# 1.7.0

Localized all string, paving the way for translations.

Fixed 'fuzzy' sidebar text in Outlaws of Alkenstars premium module.

Fixed various system regressions to damage buttons.

Fixed accidentally shipping css that removed cards from the sidebar.

Added support for new PF2e Target Damage module.

# 1.6.9

Fixed a PC dark mode regression caused by a recent system update.

Updated PC dark mode for the system rarity colors.

Changed scope of text-box height back to client.

Fixed 'fuzzy' sidebar text in blood lords premium module.

Fixed 'disabled' setting for chat portraits not working.

# 1.6.8

Fixed artifact from FPS monitor showing even when disabled in core settings.

Changed scope of some settings to client, and others to world.

Fixed an issue where some text looked fuzzy.

# 1.6.7

Fixed secret roll-notes being unreadable on dark mode chat messages.

# 1.6.6

Fixed certain button labels having the wrong color on dark PC sheets.

Fixed horizontal scrollbar appearing on actor tab in sidebar.

# 1.6.5

Fixed damage buttons looking weird in dark mode due to system update.

# 1.6.4

Fix manifest...

# 1.6.3

Fixed an issue causing DF Chat Enhancement context menus to sometimes be inaccesible.

Rejiggered some css - possibly increased performance for low end machines.

# 1.6.2

Updated manifest _again_.

Removed some console log spam.

# 1.6.1

Updated manifest so it correctly reports v10 compability.

PC Dark mode sheet updated by @Vesselchuck, fixing text-color of bios for limited view sheets.

# 1.6.0 v10 compability update.

Added support for v10-style journals.

Reshuffled various things to get rid of deprecation warnings introduced in v10.

Fixed styling of Forgotten Adventures Battlemaps module.

Fixed close-button in Outlaws of Alkenstars premium module journals missing, when the 'Frosted glass' setting was turned on.

# 1.5.5

Fixed a whoopsie causing dragging application windows to act wonky.

# 1.5.4

Rolled back some recent changes, improved look of certain dark theme chat messages posted by Monk's Tokenbar module.

# 1.5.3

Fixed style creeping into combat tracker.

# 1.5.2

Fixed close-button in Outlaws of Alkenstars premium module journals missing.

Fixed hidden tokens showing chat portraits.

Minor fixes to Narrator Tools and CGP compability.

Changed the blending mode for colored chat headers, should look better for bright, saturated colors that people often use.

Changed application header styling - it now reacts to what kind of sheet it is showing.

Updates to dark PC/Familiar sheet, courtesy of @Vesselchuck.

# 1.5.1

Added settings for disabling the portraits-react-to-degree-of-success feature and the use-user-avatar-as-portrait-fallback feature.

Redid the way portrait sizing is stored, so you can now chose what size 'small' sized creature portraits should be rendered at.

# 1.5.0

Huge refactor - the code is a lot nicer now, and doesn't use template substitution.

New features:

- Messages from gamemaster as a speaker now include a chat portrait (Configure via the menu in the lower left corner of Foundry).

- Tokens in the combat tracker scale the same way as chat portraits, rendering 'pop out' tokens at their expected size.

- New chat theme where Player messages are light, and GM messages are dark.

- Chat portraits now react to critical success and failures.

Other changes:

- General maintenance update of several chat message stylings.

- Update of dark player sheet, courtesy of @Vesselchuck.

# 1.4.2

Fixed an issue that caused roundtrackers from Monk's Little Details to not show up.

# 1.4.1

Made the breaking change less breaking!

Also introduces persistency to chat portrait scaling and hiding thanks to @MrVauxs!

# 1.4.0

Made the 'pop out' portrait scaling work for tokens of different scaling factors.
Added some padding for the 'X is typing' feature from Cautious Gamemaster's Pack, and unbroke the animation.

This patch features a regression as well - the zoom-chat-portraits-on-hover feature lives no more. Better alternatives exist for showing creature art.

# 1.3.29

Implemented feature that allows for 'pop out' tokens to have 'pop out' chat portraits. Can be disabled in settings.
Implemented feature to hide chat portraits of speakers where the token is hidden.
Fixed issue with Lock View module that caused foundry logo to re-appear despite being disabled.

# 1.3.28

Remove circular cropping of chat portraits, unless outline setting is enabled.

# 1.3.27

Added a setting for hiding chat portraits for secret GM rolls (default ON).
Fixed Narrator tools toggle in the controls.
Fixed a bug where Storyteller Stories could not be opened after being closed.
Fixed a bug where tooltips/context menus were showing behind Monk's hotbar.
Updates to PC sheet dark mode by @Vesselchuck.

# 1.3.26

Fixed styling of voluntary flaw boost buttons. Darkmode PC sheet and familiar sheet maintenance updates from @Vesselchuck.

# 1.3.25

Fixed offset in the new ability score manager.

# 1.3.24

Fixed timestamps not updating. Fixed images failing to load on foundry instances with a route prefix. Minor update to dark mode sheets courtesy of @Vesselchuck.

# 1.3.23

Fixed damage-taken and healing-received messages not showing.

# 1.3.22

Fixed chat messages not showing up if PF2e Combat Tracker Images was not present.

# 1.3.21

Chat portrait support for Mark Pearce's PF2e Combat Tracker Images. Fixed links in dark mode chat messages.

# 1.3.20

Made sheet dark mode compatible with xdy's workbench rarity, courtesy of @Vesselchuck. Fixed bug that caused familiar sheets to always be dark.

# 1.3.19

Updates to dark themes, courtesy of @Vesselchuck.

# 1.3.18

Changes to familiar sheets, courtesy of @Vesselchuck. Add setting for increasing the size of the chat box.

# 1.3.17

New dark mode familiar sheets, courtesy of @Vesselchuck.

# 1.3.16

Update to dark mode, courtesy of @Vesselchuck. Made clickability of system buttons more obvious when hovered.

# 1.3.15

Dark-themed sheets are back, courtesy of @Vesselchuck. Disabling macrobar styling is better at its job. Fixed issue with centered macro bar being broken when app-ui styling was disabled.

# 1.3.14

Compatible with Combat Carousel using Actor images. Small fix for Monk's TokenBar.

# 1.3.13

Improvements for Combat Carousel support.

# 1.3.12

Added support for Combat Carousel.

# 1.3.11

Made chat portraits for blind rolls default to 'mystery man' so that perception checks or initiative rolls don't spoil the visual identity.
Made chat-portrait-hover into a setting that defaults to off.

# 1.3.10

Fixed support for Monk's hotbar. Fixed layout of Strike cards.

# 1.3.9

Fixed issue that caused degree-of-success colors to disappear. Added support for Damage Log's revert functionality. Removed sheet stylings, as the system changes them too frequently.

# 1.3.8

Added support for the new damage buttons on attack cards. Fixed issue causing multiple elements in chat messages to create newlines.

# 1.3.7

Fixed styling of worn-related buttons and crafting screen on dark mode pc sheets. Added minor support for Navigation Presets module.

# 1.3.6

Fixed top left controls that broke in recent core foundry patch.

# 1.3.5

Fixed dark player sheets that broke in recent system patch. Made macro bare never fade in compact mode, as it doesn't re-appear when hovering while dragging a macro.

# 1.3.4

Changed compact mode to client setting. Fixed issue in dark sheets. Themed foundry notifications.
Fixed styling that broke due to data visibility changes in the newest foundry release

# 1.3.3

Fixed navbar context menu issue. Fixed Confetti overlap with Dice Tray. Added 'Plain' theme for PC sheets. Fixed secret text in NPC sheets.

# 1.3.2

Fixed an issue that caused the module to be incompatible with hosting via the Forge.

# 1.3.1

Added support for Damage Log.
Fixed display for non-self-roll damage updates.

# 1.3.0

Made players box and macro bar fade out in compact mode, fix'd a variable overwriting issue affecting messages.
Renamed 'Player tint' header to 'Player color'. Made header text color change dynamically depending on player color, when header background is based on that. Made it so that bright colors affect the header more.
Fixed placeholder text shadow. Added highlight to active sidebar tab. Fixed styling of 'popped out' individual messages. Renamed 'Blind GM Rolls' to 'Secret' on the chat rolltype indicator.
Fixed a bug where some settings didn't apply after reload, because Foundry reloaded before the settings applied.
Added support for Koboldworks Turn Announcer (Remember to change its module settings appropriately).
Added support for Confetti.
Added support for Monarch.

# 1.2.7

Added UI to Monk's hotbar module, tuned the 're-appearance' zone of the compact UI.

# 1.2.6

Removed an unneccesary log statement, unbroke compact ui, unbroke dark sheet mode, made setting-changes force-refresh.

# 1.2.5

Unbroke the new hand buttons

# 1.2.4

# 1.2.3

Fixed a mystery man, added toggles for minimal-ui inspired compact controls, and an experimental toggle for dark sheets.

# 1.2.2

Fixed some errors, added support for Monk's hotbar module, partial support for Minimal UI, changed damage card button colors.

# 1.2.1

# 1.2.0

Huge release, :pacman:'d chat portraits and rolltype indicators, and added settings allowing users to customize the chat card theme.

# 1.1.1

Fixes for Token HUD resources, TAH spell buttons, Monk's Little Details round counter.
Did _a lot_ of groundwork for dark/light toggle, and managed to re-introduce the red header to light theme. This version ships with light theme "on".

# 1.1.0

Lots of changes to the card styling, the default styling is now a 'dark mode', options for 'light mode' coming later.

# 1.0.6

# 1.0.5

Centered hotbar setting, edge-margin setting, v-padding decrease in cards, navbar color swap + tweaks, SmallTime patch, Chat Portrait support, fix for 'flavor-text'

# 1.0.4

Added support for Combat Enhancements module

# 1.0.3

Fixes to navbar and chat header

# 1.0.2

# 1.0.1

# 1.0.0

Release - broken
