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
