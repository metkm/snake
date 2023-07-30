<script setup lang="ts">
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, GridHelper, MeshBasicMaterial, Mesh } from "three";

import { setup, moveCubeRandom, createCube, wrap } from "../game";
import { velocity } from "../player";

let { camera, renderer, scene, head } = setup();

const orbit = new OrbitControls(camera, renderer.domElement);
const gridHelper = new GridHelper(10, 10);
scene.add(gridHelper);

const didEat = () => {
  return (
    head.position.x === food.position.x && head.position.z === food.position.z
  );
};

const food = createCube();
moveCubeRandom(food);
scene.add(food);

const trail = [head];
const history = [velocity];

let nextTick = false;
let nextBlock: Mesh<BoxGeometry, MeshBasicMaterial> | undefined = undefined;

const handleMoves = () => {
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

  if (didEat()) {
    nextBlock = trail[0].clone();
    nextTick = true;

    moveCubeRandom(food);
  }
};

setInterval(handleMoves, 1000 / 10);

const render = () => {
  requestAnimationFrame(render);
  orbit.update();
  renderer.render(scene, camera);
};

render();
</script>

<template></template>
