import { Scene, PerspectiveCamera, Vector3, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import { createTailHead, setupKeyEvents } from "./player";

export const SIZE = 8;
export const SPEED = 0.05;

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

export const moveFood = (cube: Mesh<BoxGeometry, MeshBasicMaterial>) => {
  let foodX = Math.floor(Math.random() * SIZE);
  let foodZ = Math.floor(Math.random() * SIZE);

  cube.position.x = foodX;
  cube.position.z = foodZ;
}

export const createFood = () => {
  const geometry = new BoxGeometry(0.5, 0.5, 0.5);
  const material = new MeshBasicMaterial({ color: "red" });
  const cube = new Mesh(geometry, material);

  moveFood(cube);

  return cube;
}
