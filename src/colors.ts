import { Tween, Easing } from "@tweenjs/tween.js";
import ColorThief, { RGBColor } from "colorthief";
import { Color } from "three";
import { scene, platform, trail } from "./game";

const colorThief = new ColorThief();
const element = document.createElement("img");
element.crossOrigin = "anonymous";
element.addEventListener("load", () => {
  let colors = colorThief.getPalette(element);
  if (!colors) return;

  animate(scene.background as Color, colors[0]);
  animate(platform.material.color, colors[1]);

  // start color
  let [startR, startG, startB] = colors[2];

  let diffRed =   startR - 255;
  let diffGreen = startG - 255;
  let diffBlue =  startB - 255;

  let step = 1 / trail.length;

  trail.forEach((block, index) => {
    let newRed   = Math.floor((diffRed   * (step * index)) + startR);
    let newGreen = Math.floor((diffGreen * (step * index)) + startG);
    let newBlue  = Math.floor((diffBlue  * (step * index)) + startB);

    animate(block.material.color, [newRed, newGreen, newBlue]);
  });
});

export const updateElementImage = (uri: string) => {
  element.src = uri;
};

export const animate = (from: Color, to: RGBColor) => {
  new Tween(from)
    .to({
      r: to[0] / 500,
      g: to[1] / 500,
      b: to[2] / 500,
    })
    .easing(Easing.Exponential.Out)
    .start();
};

export const toHex = (rgb: RGBColor) => {
  const [r, g, b] = rgb;
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};
