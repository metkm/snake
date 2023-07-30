import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  BufferGeometry,
  Material,
} from "three";
import { setupKeyEvents } from "./player";
import { initScene, initCamera, initRenderer, initLightning } from "./setup";

export const TILECOUNT = 10;
export const UNITSIZE = 0.5;
export const TILELIMIT = TILECOUNT * UNITSIZE;

type Fn = <G extends BufferGeometry, M extends Material>(block: Mesh<G, M>) => void;

export const createCube = (
  width: number = UNITSIZE,
  height: number = UNITSIZE,
  depth: number = UNITSIZE,
  color: string = "red"
) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = new MeshStandardMaterial({ color });
  const cube = new Mesh(geometry, material);

  cube.castShadow = true;
  cube.receiveShadow = true;

  return cube;
};

export const setup = () => {
  const scene = initScene();
  const camera = initCamera();
  const renderer = initRenderer();
  const lightning = initLightning();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })

  setupKeyEvents();

  const head = createCube(UNITSIZE, UNITSIZE, UNITSIZE, "#be185d");
  const platform = createCube(TILECOUNT + 2, 0.5, TILECOUNT + 2, "#d8b4fe");
  platform.position.y = -0.51;

  scene.add(head, platform, lightning);

  return {
    scene,
    camera,
    renderer,
    lightning,
    head
  }
};

export const moveCubeRandom: Fn = (cube) => {
  let foodX = Math.round(Math.random() * TILELIMIT);
  let foodZ = Math.round(Math.random() * TILELIMIT);

  cube.position.x = foodX;
  cube.position.z = foodZ;

  return cube;
};

export const wrap: Fn = (block) => {
  if (block.position.x < -TILELIMIT) {
    block.position.x = TILELIMIT;
  }

  if (block.position.x > TILELIMIT) {
    block.position.x = -TILELIMIT;
  }

  if (block.position.z > TILELIMIT) {
    block.position.z = -TILELIMIT;
  }

  if (block.position.z < -TILELIMIT) {
    block.position.z = TILELIMIT;
  }
};
