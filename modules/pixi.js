const origRefreshEffects = Token.prototype._refreshEffects;
Token.prototype._refreshEffects = function (...args) {
  const enabled = game.settings.get("pf2e-dorako-ui", "ux.adjust-token-effects-hud");
  // Draw the icons the way the system wants them drawn first. For most systems this is wasteful, but for some it might be
  // adjusting the icon positions based on something special, which we want to continue to respect.
  if (!enabled) {
    origRefreshEffects.apply(this, args);
    return;
  }
  if (this) {
    updateEffectScales(this);
  }
};

const origDrawOverlay = Token.prototype._drawOverlay;
Token.prototype._drawOverlay = async function (src, tint) {
  const enabled = game.settings.get("pf2e-dorako-ui", "ux.adjust-token-effects-hud");
  if (!enabled) {
    origDrawOverlay.apply(this, args);
    return;
  }
  const icon = await this._drawEffect(src, tint);
  if (icon) {
    const gridSize = this.scene?.grid?.size ?? 100;
    const gridScale = gridSize / 100;
    const tile = this.document.width;
    icon.alpha = 0.8;
    icon.x = 24 * gridScale * tile;
    icon.y = 24 * gridScale * tile;
    icon.width = 48 * gridScale * tile;
    icon.height = 48 * gridScale * tile;
  }
  // icon.anchor.set(0.5);
  // debugger;
  return icon;
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
//   const gridSize = this.scene?.grid?.size ?? 100;
//   const gridScale = gridSize / 100;
//   const scale = isSmall ? 0.8 : 1;
//   const h = Math.round(t / 2);
//   const o = Math.round(h / 2);

//   this.border
//     .lineStyle(t, 0x956d58, 1)
//     .drawCircle((this.document.width * gridSize) / 2, (this.document.height * gridSize) / 2, gridScale * 104 * scale);
//   this.border
//     .lineStyle(t, 0xe9d7a1, 1)
//     .drawCircle((this.document.width * gridSize) / 2, (this.document.height * gridSize) / 2, gridScale * 100 * scale);
//   this.border
//     .lineStyle(t, 0x956d58, 1)
//     .drawCircle((this.document.width * gridSize) / 2, (this.document.height * gridSize) / 2, gridScale * 94 * scale);
//   // this.border
//   //   .lineStyle(t, 0x23261a, 1)
//   //   .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 104 * scale);
//   // this.border
//   //   .lineStyle(t, 0xeceec5, 1)
//   //   .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 100 * scale);
//   // this.border
//   //   .lineStyle(t, 0x3e4031, 1)
//   //   .drawCircle((this.document.width * 200) / 2, (this.document.height * 200) / 2, 94 * scale);
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

const updateIconSize = (effectIcon, size) => {
  effectIcon.width = size;
  effectIcon.height = size;
};

function polar_to_cartesian(r, theta) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  };
}

const updateIconPosition = (effectIcon, i, effectIcons, token) => {
  const actorSize = token?.actor?.size;
  let max = 20;
  if (actorSize == "tiny") max = 10;
  if (actorSize == "sm") max = 14;
  if (actorSize == "med") max = 16;
  const ratio = i / max;
  // const angularOffset = i < max ? 0 : ratio / 2;
  const gridSize = token?.scene?.grid?.size ?? 100;
  const tokenTileFactor = token?.document?.width ?? 1;
  const sizeOffset = sizeToOffset(actorSize);
  const offset = sizeOffset * tokenTileFactor * gridSize;
  const quarterRotation = 0.5 * Math.PI;
  const { x, y } = polar_to_cartesian(offset, (ratio + 0) * 2 * Math.PI + quarterRotation);
  console.log({ x, y });
  // debugger;
  effectIcon.position.x = x / 2 + (gridSize * tokenTileFactor) / 2;
  effectIcon.position.y = (-1 * y) / 2 + (gridSize * tokenTileFactor) / 2;
};

// Nudge icons to be on the token ring or slightly outside
function sizeToOffset(size) {
  if (size == "tiny") {
    return 1.4;
  } else if (size == "sm") {
    return 1.0;
  } else if (size == "med") {
    return 1.2;
  } else if (size == "lg") {
    return 0.925;
  } else if (size == "huge") {
    return 0.925;
  } else if (size == "grg") {
    return 0.925;
  }
  return 1.0;
}

function sizeToIconScale(size) {
  if (size == "tiny") {
    return 1.4;
  } else if (size == "sm") {
    return 1.4;
  } else if (size == "med") {
    return 1.4;
  } else if (size == "lg") {
    return 1.25;
  } else if (size == "huge") {
    return 1.55;
  } else if (size == "grg") {
    return 2.2;
  }
  return 1.0;
}

const drawBG = (effectIcon, background, gridScale) => {
  const r = effectIcon.width / 2;
  background.lineStyle((1 * gridScale) / 2, 0x956d58, 1, 0);
  background.drawCircle(effectIcon.position.x, effectIcon.position.y, r + 1 * gridScale);
  background.beginFill(0xe9d7a1);
  background.drawCircle(effectIcon.position.x, effectIcon.position.y, r + 1 * gridScale);
  background.endFill();
};

const updateEffectScales = (token) => {
  // if (token?.actor?.size == "sm") return;
  const numEffects = countEffects(token);
  // debugger;
  if (numEffects > 0 && token.effects.children.length > 0) {
    const background = token.effects.children[0];
    if (!(background instanceof PIXI.Graphics)) {
      return;
    }
    // background.clear().beginFill(0x956d58, 1).lineStyle(1.0, 0xe9d7a1);
    background.clear();

    // Exclude the background and overlay
    const effectIcons = token.effects.children.slice(1, 1 + numEffects);
    const tokenSize = token?.actor?.size;
    // if (tokenSize != "tiny" && effectIcons.length <= 5) return;

    const gridSize = token?.scene?.grid?.size ?? 100;
    // Reposition and scale them
    effectIcons.forEach((effectIcon, i, effectIcons) => {
      if (!(effectIcon instanceof PIXI.Sprite)) {
        return;
      }
      // debugger;

      // Overlay effect
      if (effectIcon === token.effects.overlay) {
        const size = Math.min(token.w * 0.1, token.h * 0.1);
        effectIcon.width = effectIcon.height = size;
        effectIcon.position.set((token.w - size) / 2, (token.h - size) / 2);
      }

      effectIcon.anchor.set(0.5);

      const iconScale = sizeToIconScale(tokenSize);
      const gridScale = gridSize / 100;
      const scaledSize = 12 * iconScale * gridScale;
      updateIconSize(effectIcon, scaledSize);
      updateIconPosition(effectIcon, i, effectIcons, token);
      drawBG(effectIcon, background, gridScale);
      const myMask = new PIXI.Graphics()
        .beginFill(0xffffff, 0.001)
        .drawCircle(0, 0, Math.min(effectIcon.width, effectIcon.height) / 2)
        .endFill();
      myMask.x = effectIcon.x;
      myMask.y = effectIcon.y;
      effectIcon.mask = myMask;
      effectIcon.parent.addChild(myMask);
      // debugger;
    });
  }
};
