import { Vector3 } from "three";
import { UNITSIZE } from "./game";

export let velocity = new Vector3(0, 0, 0);

export const setupKeyEvents = () => {
  document.addEventListener("keydown", keyEvents)
}

export const keyEvents = ({ code }: KeyboardEvent) => {
  switch (code) {
    case "KeyW":
      velocity.set(0, 0, -UNITSIZE);
      break;
    case "KeyS":
      velocity.set(0, 0, UNITSIZE);
      break;
    case "KeyA":
      velocity.set(-UNITSIZE, 0, 0);
      break;
    case "KeyD":
      velocity.set(UNITSIZE, 0, 0);
      break;
  }
}
