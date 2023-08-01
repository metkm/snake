import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { update } from "@tweenjs/tween.js";

import { wrap, createText, createSongCover, createCube, moveCubeRandom } from "./objects";
import { usePlaylistStore } from "./store/playlist";
import { didEat, velocity } from "./player";
import { getRandomItem } from "./utils";
import { setup } from "./setup";

import axios from "axios";
import ColorThief from "colorthief";
import { animate } from "./colors";

const {
  renderer,
  scene,
  camera,
  objects: {
    head,
    platform
  }
} = setup();

const food = createCube();
moveCubeRandom(food);
scene.add(food);

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
    playNextTrack();

    nextTick = true;
    nextBlock = trail[0].clone();
  }
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

const colorThief = new ColorThief();
const element = document.createElement("img");
element.crossOrigin = "anonymous";
element.addEventListener("load", () => {
  let colors = colorThief.getPalette(element);
  if (!colors) return;
  
  animate(scene.background as Color, colors[0]);
  animate(platform.material.color, colors[1]);

  for (let block of trail) {
    animate(block.material.color, colors[2]);
  }
})

export const updateSongObjects = async (name: string, uri: string) => {
  element.src = uri;

  scene.remove(songText);
  songText = await createText(name);
  scene.add(songText);

  scene.remove(songCover);
  songCover = await createSongCover(uri);
  scene.add(songCover);
}
