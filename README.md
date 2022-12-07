# PF2E Persistent Damage
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FCarlosFdez%2Fpf2e-persistent-damage%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)

Small module to keep track of persistent damage for pathfinder 2E using the effects system. Accessed via macros in the compendium, dragging and dropping certain inline rolls, and the condition hud. If certain settings are enabled, they will be automatically calculated and/or removed when the actor's turn has finished.

Derived from the condition setter macro from mothringer. If you're feeling generous, you can send something through [Paypal](https://paypal.me/carlosfernandez1779?locale.x=en_US) if you want.

## How to Install

### Manual Install
In Foundry setup, click on the Install Module button and put the following path in the Manifest URL. You could also use a path from a specific release.

`https://github.com/CarlosFdez/pf2e-persistent-damage/releases/latest/download/module.json`

## Persistent Damage
The module comes with a compendium with two macros, Add Persistent Damage and Process Persistent Damage.

### Add Persistent Damage
Use to add persistent damage effects to selected tokens. These effects can be removed either in the sheet or by right clicking in the "effects panel". Make sure the effects panel is enabled in the left toolbar to see it.

![image](https://user-images.githubusercontent.com/1286721/116132472-9a12d800-a69b-11eb-8605-57f4e67763c5.png)

Once added, persistent damage value can be edited via the effect:

![image](https://user-images.githubusercontent.com/1286721/111926202-400e6980-8a82-11eb-903d-6ee8fac8f921.png)

### Process Persistent Damage
Use to inspect selected tokens for all persistent damage effects and create chat messages for them. On each chat message, clicking on the crosshair button will select the token, making it easier to use the chat damage buttons to apply damage.

![image](https://user-images.githubusercontent.com/1286721/111949776-b24d7100-8ab7-11eb-86d1-3270c4f138dc.png)

### Inline Roll Dragging
Any inline roll with `persistent damageType` flavor text such as [[/r 1d6 #persistent mental]] will be converted to draggable links that apply persistent damage. Many compendium entries in PF2e already have these inline rolls.

https://user-images.githubusercontent.com/1286721/122157689-4ae65980-ce39-11eb-85b5-dbf789dfbd29.mp4

## Fast Healing
There are some sample fast healing effects in the compendium, but fast healing itself is supported in the core pf2e system, and this module is no longer required to perform fast healing.

## Incompatibilities
Modules known to cause issues running alongside this one.

* Status Icon Counters - removed effects will leave icons behind if you're running this

## How to Build
It is recommended to use VSCode for the project, but anything else that can handle typescript will work. Node 14 or higher is required.

1) Open a terminal in the root folder
2) `npm install`
3) `npm run watch` for development or `npm run build` for a one time build
4) Build will be in the `dist` folder. Create a symlink to the foundry modules folder for development.
