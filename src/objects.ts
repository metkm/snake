import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  BufferGeometry,
  Material,
  sRGBEncoding,
  TextureLoader,
} from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export const TILECOUNT = 10;
export const UNITSIZE = 0.5;
export const TILELIMIT = TILECOUNT * UNITSIZE;

const fontLoader = new FontLoader();
const textureLoader = new TextureLoader();

export const createSongCover = async (uri: string) => {
  const geometry = new BoxGeometry(3, 3, 0);
  const material = new MeshBasicMaterial();
  const songCover = new Mesh(geometry, material);

  const texture = await textureLoader.loadAsync(uri);
  texture.encoding = sRGBEncoding;
  songCover.material.map = texture;
  songCover.position.y = 2;
  songCover.position.z = -TILECOUNT / 2 - 2;
  songCover.position.x = -TILECOUNT / 2 + 1;
  return songCover;
};

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

export const createText = async (text: string) => {
  const font = await fontLoader.loadAsync("/src/assets/Inter_Regular.json");

  const songGeometry = new TextGeometry(text, {
    font,
    size: 0.5,
    height: 0.1,
  });
  const material = new MeshBasicMaterial({ color: "white" });
  const songMesh = new Mesh(songGeometry, material);
  songMesh.position.z = -TILECOUNT / 2 - 2;
  songMesh.position.x = -2;
  songMesh.position.y = 0.5;

  return songMesh;
};

type Fn = <G extends BufferGeometry, M extends Material>(
  block: Mesh<G, M>
) => void;

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

export const createFood = () => {
  const food = createCube();
  return {
    food,
  };
};
