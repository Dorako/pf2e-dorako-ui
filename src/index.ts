import { PersistentDamagePF2e } from "./module/pf2e-persistent-damage";
import { MODULE_NAME, registerSettings } from "./module/settings";
import { overrideItemSheet } from "./module/item-sheet";
import { createPersistentTitle, typeImages } from "./module/persistent-effect";
import type { CombatantPF2e } from "@pf2e/module/combatant";
import type { ActorPF2e } from "@pf2e/module/actor/index";

// will be extracted by webpack
import "./styles/styles.scss";

Hooks.on("init", () => {
    registerSettings();
    loadTemplates(["modules/pf2e-persistent-damage/templates/persistent-details.html"]);
    window.PF2EPersistentDamage = new PersistentDamagePF2e();
    overrideEnricher();
});

Hooks.on("ready", () => {
    overrideItemSheet();
});

Hooks.on("renderChatMessage", async (message: ChatMessage, html: JQuery<HTMLElement>) => {
    if (message.flags.persistent) {
        html.find("button[data-action=check][data-check=flat]")
            .off()
            .on("click", (evt) => {
                evt.preventDefault();

                const card = html.find(".chat-card");
                const effectId = card.attr("data-effect-id");

                // Get the Actor from a synthetic Token
                let actor: ActorPF2e | null = null;
                const tokenKey = card.attr("data-token-id");
                if (tokenKey) {
                    const [sceneId, tokenId] = tokenKey.split(".");
                    const scene = game.scenes.get(sceneId);
                    const token = scene?.data.tokens.get(tokenId);
                    if (!token) return;
                    actor = token.actor as unknown as ActorPF2e;
                } else actor = game.actors.get(card.attr("data-actor-id"));

                const effect = actor?.items.get(effectId);
                PF2EPersistentDamage.rollRecoveryCheck(actor, effect);
            });
    }
});

/**
 * End of turn event.
 * Use to handle apply damage on turn end
 */
Hooks.on("pf2e.endTurn", (combatant: CombatantPF2e, _combat, userId: string) => {
    if (game.settings.get(MODULE_NAME, "auto-roll") && game.user.id === userId) {
        window.PF2EPersistentDamage.processPersistentDamage(combatant.token ?? combatant.actor);
    }
});

/**
 * If persistent damage is clicked, use this module instead.
 */
Hooks.on("renderTokenHUD", (_app, $html: JQuery, tokenData: foundry.data.TokenData) => {
    setTimeout(() => {
        const persistentEffect = $html.find("div.status-effects [data-status-id='persistent-damage']").get(0);
        persistentEffect.addEventListener(
            "click",
            (event) => {
                event.preventDefault();
                event.stopImmediatePropagation();

                if (event.button !== 0 || !canvas.ready) {
                    return;
                }

                const token = canvas.tokens.get(tokenData._id);
                if (token) {
                    PF2EPersistentDamage.showDialog({ actor: token.actor });
                }
            },
            { capture: true },
        );
    }, 0);
});

// Override the enrichHTML method to create persistent effect links from inline rolls
function overrideEnricher() {
    const persistentConditionId = "lDVqvLKA6eF3Df60";
    const originalEnrichHTML = TextEditor.enrichHTML;
    TextEditor.enrichHTML = game.pf2e.TextEditor.enrichHTML = function (...args) {
        const result = originalEnrichHTML.call(this, ...args) as Promise<string> | string;

        function transformResult(result: string) {
            const html = document.createElement("div");
            html.innerHTML = String(result);

            html.querySelectorAll<HTMLElement>(".inline-roll:not(.inline-result)").forEach((rollElement) => {
                // Attempt to pull persistent damage from the roll first
                const result = parseInlineRollHTML(rollElement);
                if (!result) return;

                const { formula, damageType } = result;

                // Remove the persistent effect condition image first
                const compendiumLink = rollElement.nextElementSibling as HTMLElement;
                const compendiumLinkIsEntityLink = compendiumLink?.classList.contains("content-link");
                if (compendiumLinkIsEntityLink && compendiumLink?.dataset.id === persistentConditionId) {
                    compendiumLink.remove();
                }

                const newTitle = createPersistentTitle({ damageType, value: formula, dc: 15 });
                rollElement.classList.add("persistent-link");
                rollElement.draggable = true;
                rollElement.dataset.value = formula;
                rollElement.dataset.damageType = damageType;
                rollElement.innerHTML = `<i class="fas fa-suitcase"></i> ${newTitle}`;
                rollElement.setAttribute("ondragstart", "PF2EPersistentDamage._startDrag(event)");
            });

            return html.innerHTML;
        }

        return result instanceof Promise ? result.then(transformResult) : transformResult(result);
    };
}


/** Pulls  */
function parseInlineRollHTML(rollElement: HTMLElement) {
    // Check if the roll formula already is marked as persistent
    const formula = rollElement.dataset.formula;
    try {
        const roll = new Roll(formula);
        if (roll.terms.length === 1 && "flavor" in roll.terms[0].options && roll.terms[0].options.flavor) {
            const term = roll.terms[0];
            const flavor = term.options.flavor as string;
            const types = new Set(flavor.split(",").map((t) => t.trim().toLowerCase()));
            if (term instanceof PoolTerm && types.has("persistent")) {
                const formula = term.terms[0].toString();
                const damageType = [...types.values()].find((type) => type in typeImages);
                if (damageType) {
                    return { formula, damageType };
                }
            }
        }

        // Fallback to the old message, parse the flavor text
        const flavor = rollElement.dataset.flavor;
        if (!flavor) return;
        const match = flavor.match(/^persistent ([A-Za-z]+)/i);
        if (!match) return;
        const damageType = match[1]?.toLowerCase();
        if (damageType in typeImages) {
            const formula = rollElement.dataset.formula;
            return { formula, damageType };
        }
    } catch (ex) {
        console.error(`PF2E Persistent | Error parsing formula in inline formula ${formula}`, ex);
    }
}

// Rendered chat messages strip out javascript events...so we need to add it back in
Hooks.on("renderChatMessage", (_message, html) => {
    html.find(".persistent-link:not([ondragstart])").attr("ondragstart", "PF2EPersistentDamage._startDrag(event)");
});
