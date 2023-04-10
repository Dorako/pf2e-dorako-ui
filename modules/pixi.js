const origRefreshEffects = Token.prototype._refreshEffects;
Token.prototype._refreshEffects = function (...args) {
  const enabled = game.settings.get("pf2e-dorako-ui", "ux.adjust-token-effects-hud");
  // Draw the icons the way the system wants them drawn first. For most systems this is wasteful, but for some it might be
  // adjusting the icon positions based on something special, which we want to continue to respect.
  origRefreshEffects.apply(this, args);
  if (!enabled) return;
  if (this) {
    updateEffectScales(this);
  }
};

// const origDrawEffect = Token.prototype._drawEffect;
// Token.prototype._drawEffect = async function (...args) {
//   // origDrawEffect.apply(this, args);
//   if (this) {
//     const src = args.src;
//     const tint = args.tint;
//     if (!src) return;
//     let tex = await loadTexture(src, { fallback: "icons/svg/hazard.svg" });
//     let icon = new PIXI.Sprite(tex);
//     const mask = new PIXI.Graphics();
//     mask.beginFill(0x000000);
//     mask.drawCircle(icon.position.x, icon.position.y, icon.width / 2);
//     mask.endFill();
//     icon.mask = mask;
//     icon.tint = 0xaa0000;
//     if (tint) icon.tint = tint;
//     // debugger;
//     return this.effects.addChild(icon);
//   }
// };

// Token.prototype._drawEffect = async function (...args) {
//   if (this) {
//     const src = args.src;
//     const tint = args.tint;
//     if (!src) return;
//     let tex = await loadTexture(src, { fallback: "icons/svg/hazard.svg" });
//     let icon = new PIXI.Sprite(tex);
//     if (tint) icon.tint = tint;
//     return this.effects.addChild(icon);
//   }
// };

// Token.prototype._refreshBorder = function (...args) {
//   this.border.clear();
//   this.border.position.set(this.document.x, this.document.y);
//   if (!this.visible) return;
//   const borderColor = this._getBorderColor();
//   if (!borderColor) return;
//   const t = 16; //CONFIG.Canvas.objectBorderThickness

//   // Draw Hex border for size 1 tokens on a hex grid
//   if (canvas.grid.isHex) {
//     const polygon = canvas.grid.grid.getBorderPolygon(this.document.width, this.document.height, t);
//     if (polygon) {
//       this.border.lineStyle(t, 0x000000, 0.8).drawPolygon(polygon);
//       this.border.lineStyle(t / 2, borderColor, 1.0).drawPolygon(polygon);
//       return;
//     }
//   }

//   const isSmall = this.document.actor.size === "sm";
//   const scale = isSmall ? 0.8 : 1;
//   const h = Math.round(t / 2);
//   const o = Math.round(h / 2);

//   // this.border
//   //   .lineStyle(t, 0x956d58, 1)
//   //   .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 104 * scale);
//   // this.border
//   //   .lineStyle(t, 0xe9d7a1, 1)
//   //   .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 100 * scale);
//   // this.border
//   //   .lineStyle(t, 0x956d58, 1)
//   //   .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 94 * scale);
//   this.border
//     .lineStyle(t, 0x23261a, 1)
//     .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 104 * scale);
//   this.border
//     .lineStyle(t, 0xeceec5, 1)
//     .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 100 * scale);
//   this.border
//     .lineStyle(t, 0x3e4031, 1)
//     .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 94 * scale);
// };

const countEffects = (token) => {
  if (!token) {
    return 0;
  }
  let numEffects = token.document.effects?.length || 0;
  token.actor?.temporaryEffects?.forEach((actorEffect) => {
    if (!actorEffect.getFlag("core", "overlay")) {
      numEffects++;
    }
  });
  return numEffects;
};

const sortIcons = (e1, e2) => {
  if (e1.position.x === e2.position.x) {
    return e1.position.y - e2.position.y;
  }
  return e1.position.x - e2.position.x;
};

const updateIconSize = (effectIcon, width) => {
  effectIcon.width = width;
  effectIcon.height = width;
};

function polar_to_cartesian(r, theta) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  };
}

const updateIconPosition = (effectIcon, i, effectIcons, token) => {
  const ratio = i / effectIcons.length;
  const offset = sizeToOffset(token?.actor?.size);
  const { x, y } = polar_to_cartesian(offset, ratio * 2 * Math.PI);
  effectIcon.position.x = x + (token.document.width * 200) / 2;
  effectIcon.position.y = y + (token.document.height * 200) / 2;
};

function sizeToOffset(size) {
  if (size == "tiny") {
    return 65;
  } else if (size == "sm") {
    return 90;
  } else if (size == "med") {
    return 115;
  } else if (size == "lg") {
    return 200;
  } else if (size == "huge") {
    return 300;
  } else if (size == "grg") {
    return 400;
  }
  return 100;
}

const drawBG = (effectIcon, background) => {
  const r = effectIcon.width / 2;
  background.drawCircle(effectIcon.position.x, effectIcon.position.y, r);
};

const updateEffectScales = (token) => {
  // if (token?.actor?.size == "sm") return;
  const numEffects = countEffects(token);
  if (numEffects > 0 && token.effects.children.length > 0) {
    const background = token.effects.children[0];
    if (!(background instanceof PIXI.Graphics)) {
      return;
    }
    // background.clear().beginFill(0x956d58, 1).lineStyle(1.0, 0xe9d7a1);
    background.clear();

    // Exclude the background and overlay
    const effectIcons = token.effects.children.slice(1, 1 + numEffects);
    if (token?.actor?.size != "tiny" && effectIcons.length <= 5) return;

    // Reposition and scale them
    effectIcons.forEach((effectIcon, i, effectIcons) => {
      if (!(effectIcon instanceof PIXI.Sprite)) {
        return;
      }
      effectIcon.anchor.set(0.5);
      updateIconSize(effectIcon, 24);
      updateIconPosition(effectIcon, i, effectIcons, token);
      drawBG(effectIcon, background);
    });
  }
};
