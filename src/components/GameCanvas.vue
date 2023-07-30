<script setup lang="ts">
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, GridHelper, MeshBasicMaterial, Mesh } from "three";

import { setup, moveCubeRandom, TILECOUNT, createCube } from "../game";
import { velocity } from "../player";

const { camera, renderer, scene, head } = setup();

const orbit = new OrbitControls(camera, renderer.domElement);
const gridHelper = new GridHelper(10, 10);
scene.add(gridHelper);

const wrap = (head: Mesh<BoxGeometry, MeshBasicMaterial>) => {
  if (head.position.x < -TILECOUNT) {
    head.position.x = TILECOUNT;
  } else if (head.position.x > TILECOUNT) {
    head.position.x = -TILECOUNT;
  }

  if (head.position.z < -TILECOUNT) {
    head.position.z = TILECOUNT;
  } else if (head.position.z > TILECOUNT) {
    head.position.z = -TILECOUNT;
  }
}

const food = createCube();
moveCubeRandom(food);
scene.add(food);

const trail = [head];
const history = [velocity];

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

  if (
    head.position.x === food.position.x &&
    head.position.z === food.position.z
  ) {
    let block = head.clone();
    block.position.x -= velocity.x * trail.length;
    block.position.z -= velocity.z * trail.length;

    scene.add(block);
    trail.splice(0, 0, block);

    moveCubeRandom(food);
  }
  
}

setInterval(handleMoves, 1000 / 8);

const render = () => {
  requestAnimationFrame(render);
  orbit.update();
  renderer.render(scene, camera);
}

render();
</script>

<template>
</template>
