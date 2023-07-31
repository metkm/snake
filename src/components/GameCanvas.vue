<script setup lang="ts">
import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import { update } from "@tweenjs/tween.js";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import axios from "axios";

import { velocity } from "../player";
import { usePlaylistStore } from "../store/playlist";
import { setup, moveCubeRandom, createCube, wrap } from "../game";
import { Track } from "../models/Playlists";
import { animate } from "../colors";

const { camera, renderer, scene, objects: { head, platform } } = setup();

const playlistStore = usePlaylistStore();
const { selectedPlaylists, currentTrack, currentColors } = storeToRefs(playlistStore);

const food = createCube();
moveCubeRandom(food);
scene.add(food);

const trail = [head];
const history = [velocity];

let nextTick = false;
let nextBlock: Mesh<BoxGeometry, MeshStandardMaterial> | undefined = undefined;

const handleMoves = async () => {
  history.push(velocity.clone());

  while (history.length > trail.length) {
    history.shift();
  }

  for (let index = 0; index < trail.length; index++) {
    let block = trail[index];
    let move = history[index];

    block.position.x += move.x;
    block.position.z += move.z;

    wrap(block);
  }

  if (nextTick && nextBlock) {
    scene.add(nextBlock);
    trail.splice(0, 0, nextBlock);
    nextTick = false;
  }

  // check if food is eaten
  if (
    head.position.x === food.position.x &&
    head.position.z === food.position.z
  ) {
    nextBlock = trail[0].clone();
    nextTick = true;

    moveCubeRandom(food);

    // select random playlist and song to play
    if (selectedPlaylists.value.length > 0) {
      let randomList =
        selectedPlaylists.value[
          Math.floor(Math.random() * selectedPlaylists.value.length)
        ];

      let items = randomList.items;
      if (!items || items.length === 0) return;

      let randomItem: Track = items[Math.floor(Math.random() * items.length)];
      await axios.put("/me/player/play", {
        uris: [randomItem.uri],
      });

      currentTrack.value = randomItem;
    }
  }
};

// change colors of objects when the song changes
watch(currentColors, () => {
  if (!currentColors.value) return;
  animate(scene.background as Color, currentColors.value[0]);
  animate(platform.material.color, currentColors.value[1]);

  for (let block of trail) {
    animate(block.material.color, currentColors.value[2]);
  }
});

setInterval(handleMoves, 1000 / 10);
const render = () => {
  requestAnimationFrame(render);
  update();
  renderer.render(scene, camera);
};

render();
</script>

<template></template>
