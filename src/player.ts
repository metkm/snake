import { BoxGeometry, MeshStandardMaterial, Vector3, Mesh } from "three";
import { UNITSIZE } from "./objects";

export let velocity = new Vector3(0, 0, 0);

export const setupKeyEvents = () => {
  document.addEventListener("keydown", keyEvents)
}

export const keyEvents = ({ code }: KeyboardEvent) => {
  switch (code) {
    case "KeyW":
      if (velocity.z !== UNITSIZE) {
        velocity.set(0, 0, -UNITSIZE);
      }
      break;
    case "KeyS":
      if (velocity.z !== -UNITSIZE) {
        velocity.set(0, 0, UNITSIZE);
      }
      break;
    case "KeyA":
      if (velocity.x !== UNITSIZE) {
        velocity.set(-UNITSIZE, 0, 0);
      }
      break;
    case "KeyD":
      if (velocity.x !== -UNITSIZE) {
        velocity.set(UNITSIZE, 0, 0);
      }
      break;
  }
}

type Block = Mesh<BoxGeometry, MeshStandardMaterial>;

export const didEat = (head: Block, food: Block) => {
  return head.position.x === food.position.x &&
         head.position.z === food.position.z
}
