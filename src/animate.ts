import { Tween, Easing } from "@tweenjs/tween.js";
import { RGBColor } from "colorthief";
import { Color } from "three";

export const animate = (from: Color, to: RGBColor) => {
  new Tween(from)
    .to({
      r: to[0] / 100,
      g: to[1] / 100,
      b: to[2] / 100
    })
    .easing(Easing.Exponential.Out)
    .start();
}
