import { Scene, PerspectiveCamera, Vector3, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import { createTailHead, setupKeyEvents } from "./player";

export const TILECOUNT = 10;
export const UNITSIZE = TILECOUNT / 20;

export const setup = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.y = 10;
  camera.position.z = 8;
  camera.lookAt(new Vector3(0, 0, 0));

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  setupKeyEvents();
  const head = createTailHead();
  scene.add(head);

  return {
    scene,
    camera,
    renderer,
    head
  }
}

export const createCube = () => {
  const geometry = new BoxGeometry(UNITSIZE, UNITSIZE, UNITSIZE);
  const material = new MeshBasicMaterial({ color: "red" });
  const cube = new Mesh(geometry, material);

  return cube;
}

export const moveCubeRandom = (cube: Mesh<BoxGeometry, MeshBasicMaterial>) => {
  let foodX = Math.round(Math.random() * TILECOUNT);
  let foodZ = Math.round(Math.random() * TILECOUNT);

  cube.position.x = foodX;
  cube.position.z = foodZ;

  return cube;
}

export const createFood = () => {
  const geometry = new BoxGeometry(UNITSIZE, UNITSIZE, UNITSIZE);
  const material = new MeshBasicMaterial({ color: "red" });
  const cube = new Mesh(geometry, material);

  moveCubeRandom(cube);

  return cube;
}
