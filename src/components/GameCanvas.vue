<script setup lang="ts">
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, GridHelper, MeshBasicMaterial, Mesh } from "three";

import { setup, createFood, moveFood, SIZE } from "../game";
import { velocity } from "../player";

const { camera, renderer, scene, head } = setup();

const orbit = new OrbitControls(camera, renderer.domElement);
const gridHelper = new GridHelper(10, 10);
scene.add(gridHelper);

const wrap = (head: Mesh<BoxGeometry, MeshBasicMaterial>) => {
  if (head.position.x < -SIZE) {
    head.position.x = SIZE;
  } else if (head.position.x > SIZE) {
    head.position.x = -SIZE;
  }

  if (head.position.z < -SIZE) {
    head.position.z = SIZE;
  } else if (head.position.z > SIZE) {
    head.position.z = -SIZE;
  }

}

const food = createFood();
scene.add(food);

const render = () => {
  requestAnimationFrame(render);
  orbit.update();

  head.position.x += velocity.x;
  head.position.z += velocity.z;
  wrap(head);

  if (
    Math.floor(head.position.x) === food.position.x &&
    Math.floor(head.position.z) === food.position.z
  ) {
    moveFood(food);
  }

  renderer.render(scene, camera);
}

render();
</script>

<template>
</template>
