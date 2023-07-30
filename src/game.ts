import {
  Scene,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  DirectionalLight,
  BufferGeometry,
  Material,
PCFSoftShadowMap,
} from "three";
import { createTailHead, setupKeyEvents } from "./player";

export const TILECOUNT = 10;
export const UNITSIZE = 0.5;
export const TILELIMIT = TILECOUNT * UNITSIZE;

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
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.y = 10;
  camera.position.z = 8;
  camera.lookAt(new Vector3(0, 0, 0));

  // Renderer stuff
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // Renderer stuff

  setupKeyEvents();
  const head = createTailHead();
  scene.add(head);

  // platform
  const platform = createCube(TILECOUNT, 0.5, TILECOUNT, "#d8b4fe");

  platform.position.y = -0.5;
  scene.add(platform);

  // lightning
  const light = new DirectionalLight("#ffffff", 2);
  light.position.x = 6;
  light.position.y = 20;
  light.position.z = -6;
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  // light.shadow.map.width = 1024;
  // light.shadow.map.height = 1024;
  scene.add(light);

  // const light2 = new HemisphereLight("white", 0xffffff, 0.5);
  // scene.add(light);
  // scene.add(light2);

  return {
    scene,
    camera,
    renderer,
    head,
  };
};

export const moveCubeRandom = <G extends BufferGeometry, M extends Material>(
  cube: Mesh<G, M>
) => {
  let foodX = Math.round(Math.random() * TILELIMIT);
  let foodZ = Math.round(Math.random() * TILELIMIT);

  cube.position.x = foodX;
  cube.position.z = foodZ;

  return cube;
};

export const createFood = () => {
  const cube = createCube(UNITSIZE, UNITSIZE, UNITSIZE, "red");
  moveCubeRandom(cube);

  return cube;
};

export const wrap = <G extends BufferGeometry, M extends Material>(
  block: Mesh<G, M>
) => {
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
