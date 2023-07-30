import { BoxGeometry, MeshBasicMaterial, Mesh, Vector3 } from "three";
import { UNITSIZE } from "./game";

export let velocity = new Vector3(0, 0, 0);

export const createTailHead = () => {
  const geometry = new BoxGeometry(UNITSIZE, UNITSIZE, UNITSIZE);
  const material = new MeshBasicMaterial({ color: "blue" });
  const cube = new Mesh(geometry, material);

  return cube;
}

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
