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
