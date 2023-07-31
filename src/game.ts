import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  BufferGeometry,
  Material,
MeshBasicMaterial,
} from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
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

let font: Font;
export const createText = (text: string) => {
  const songGeometry = new TextGeometry(text, {
    font,
    size: 0.5,
    height: 0.1,
  });
  const material = new MeshBasicMaterial({ color: 'white' });
  const songMesh = new Mesh(songGeometry, material);
  songMesh.position.z = (-TILECOUNT / 2) - 2;
  songMesh.position.x = -2;
  songMesh.position.y = 0.5;

  return songMesh;
}

export const setup = async () => {
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

  const head = createCube(UNITSIZE, UNITSIZE, UNITSIZE, "#667761");
  const platform = createCube(TILECOUNT + 2, 0.5, TILECOUNT + 2, "#9B8884");
  platform.position.y = -0.51;
  
  const loader = new FontLoader();
  font = await loader.loadAsync("/src/assets/Inter_Regular.json");

  scene.add(head, platform, lightning);

  return {
    scene,
    camera,
    renderer,
    lightning,
    objects: {
      head,
      platform,
      // songMesh
    }
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
