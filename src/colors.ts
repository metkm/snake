import { Tween, Easing } from "@tweenjs/tween.js";
import { RGBColor } from "colorthief";
import { Color } from "three";

export const animate = (from: Color, to: RGBColor) => {
  new Tween(from)
    .to({
      r: to[0] / 500,
      g: to[1] / 500,
      b: to[2] / 500
    })
    .easing(Easing.Exponential.Out)
    .start();
}

export const toHex = (rgb: RGBColor) => {
  const [r, g, b] = rgb;
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}