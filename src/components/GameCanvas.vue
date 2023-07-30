<script setup lang="ts">
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, GridHelper, MeshBasicMaterial, Mesh } from "three";

import { setup, createFood, moveFood, TILECOUNT } from "../game";
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

const food = createFood();
scene.add(food);

const handleMoves = () => {
  head.position.x += velocity.x;
  head.position.z += velocity.z;
  wrap(head);

  if (
    head.position.x === food.position.x &&
    head.position.z === food.position.z
  ) {
    moveFood(food);
  }
}

setInterval(handleMoves, 1000 / 5);

const render = () => {
  requestAnimationFrame(render);
  orbit.update();
  renderer.render(scene, camera);
}

render();
</script>

<template>
</template>
