import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { update } from "@tweenjs/tween.js";

import { wrap, createText, createSongCover, createCube, moveCubeRandom } from "./objects";
import { usePlaylistStore } from "./store/playlist";
import { updateElementImage } from "./colors";
import { didEat, velocity } from "./player";
import { getRandomItem } from "./utils";
import { setup } from "./setup";

import axios from "axios";

export const {
  renderer,
  scene,
  camera,
  head,
  platform
} = setup();

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

export let history = [velocity];
export let trail = [head];
let nextTick = false;
let nextBlock: typeof trail[0];
let gamescore = 0;

let gamescoreText: ReturnType<typeof createText>;

const food = createCube();
moveCubeRandom(food);
scene.add(food);

export const gameMoveLoop = () => {
  history.push(velocity.clone());
  
  while (history.length > trail.length) {
    history.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    const block = trail[i];
    const move = history[i];

    // check if crashed to itself
    if (
      head.id !== block.id &&
      block.position.x === head.position.x &&
      block.position.z === head.position.z
    ) {
      resetGame();
    }

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
    const playlistStore = usePlaylistStore();
    gamescore++;

    scene.remove(gamescoreText);
    gamescoreText = createText(gamescore.toString());
    gamescoreText.position.y = 3;
    scene.add(gamescoreText);

    if (gamescore % 10 === 0 || !playlistStore.currentTrack) {
      playNextTrack();
    }
    moveCubeRandom(food);

    nextTick = true;
    nextBlock = trail[0].clone();
    nextBlock.material = trail[0].material.clone();
  }
}

export const resetGame = () => {
  velocity.set(0, 0, 0);

  for (let i = trail.length - 2; i >= 0; i--) {
    const block = trail[i];
    block.removeFromParent();
  }

  history = [velocity];
  trail = [head];

  head.position.z = 0;
  head.position.x = 0;
}

export const playNextTrack = async () => {
  const playlistStore = usePlaylistStore();
  if (playlistStore.selectedPlaylists.length === 0) return;
  
  const playlistId = getRandomItem(playlistStore.selectedPlaylists);
  const playlistTracks = playlistStore.playlistTracks[playlistId];

  const track = getRandomItem(playlistTracks.tracks);
  await axios.put("/me/player/play", { uris: [track.uri] });

  playlistStore.currentTrack = track;
  updateSongObjects(track.name, track.album.images[0].url);
}

let songText: Awaited<ReturnType<typeof createText>>;
let songCover: Mesh<BoxGeometry, MeshBasicMaterial>;

export const updateSongObjects = async (name: string, uri: string) => {
  updateElementImage(uri);

  scene.remove(songText);
  songText = createText(name);
  scene.add(songText);

  scene.remove(songCover);
  songCover = await createSongCover(uri);
  scene.add(songCover);
}
