import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { update } from "@tweenjs/tween.js";

import { wrap, createText, createSongCover, createCube, moveCubeRandom } from "./objects";
import { usePlaylistStore } from "./store/playlist";
import { didEat, velocity } from "./player";
import { getRandomItem } from "./utils";
import { setup } from "./setup";

import axios from "axios";

const {
  renderer,
  scene,
  camera,
  objects: {
    head,
  }
} = setup();

const food = createCube();
moveCubeRandom(food);
scene.add(food);

// const { food, randomize } = createFood();
// randomize();
// scene.add(food);

export const start = () => {
  gameLoop(renderer, scene, camera);
  setInterval(gameMoveLoop, 1000 / 15);
}

export const gameLoop = (
  renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera
) => {
  update();
  renderer.render(scene, camera);
  requestAnimationFrame(() => gameLoop(renderer, scene, camera));
}

const history = [velocity];
const trail = [head];
let nextTick = false;
let nextBlock: typeof trail[0];

export const gameMoveLoop = () => {
  history.push(velocity.clone());
  
  while (history.length > trail.length) {
    history.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    const block = trail[i];
    const move = history[i];

    block.position.x += move.x;
    block.position.z += move.z;

    wrap(block);
  }

  if (nextTick) {
    scene.add(nextBlock);
    nextTick = false;
    trail.splice(0, 0, nextBlock);
  }

  if (didEat(head, food)) {
    moveCubeRandom(food);
    changeColors();

    nextTick = true;
    nextBlock = trail[0].clone();
  }
}

export const changeColors = async () => {
  const playlistStore = usePlaylistStore();

  if (playlistStore.selectedPlaylists.length === 0) return;
  
  const playlist = getRandomItem(playlistStore.selectedPlaylists);
  if (!playlist.items || playlist.items.length === 0) return;

  const track = getRandomItem(playlist.items);
  await axios.put("/me/player/play", { uris: [track.uri] });

  playlistStore.currentTrack = track;
  
  updateSongObjects(track.name, track.album.images[0].url)
}

let songText: Awaited<ReturnType<typeof createText>>;
let songCover: Mesh<BoxGeometry, MeshBasicMaterial>;

export const updateSongObjects = async (name: string, uri: string) => {
  scene.remove(songText);
  songText = await createText(name);
  scene.add(songText);

  scene.remove(songCover);
  songCover = await createSongCover(uri);
  scene.add(songCover);
}
