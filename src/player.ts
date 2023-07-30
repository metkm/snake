import { BoxGeometry, MeshBasicMaterial, Mesh, Vector3 } from "three";
import { SPEED } from "./game";

export let velocity = new Vector3(0, 0, 0);

export const createTailHead = () => {
  const geometry = new BoxGeometry(1, 1, 1);
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
      velocity.set(0, 0, -SPEED);
      break;
    case "KeyS":
      velocity.set(0, 0, SPEED);
      break;
    case "KeyA":
      velocity.set(-SPEED, 0, 0);
      break;
    case "KeyD":
      velocity.set(SPEED, 0, 0);
      break;
  }
}
