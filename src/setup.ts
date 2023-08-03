import { Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, PCFSoftShadowMap, Vector3, Color, GridHelper } from "three";
import { createCube } from "./objects";
import { setupKeyEvents } from "./player";

export const initScene = () => {
  const scene = new Scene();
  scene.background = new Color("#917C78");

  return scene;
}

export const initCamera = () => {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  camera.position.y = 8;
  camera.position.z = 7;
  camera.position.x = -4;
  camera.lookAt(new Vector3(0, 0, 0));

  return camera;
}

export const initRenderer = () => {
  const renderer = new WebGLRenderer({
    antialias: true,
  });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return renderer;
}

export const initLightning = () => {
  const light = new DirectionalLight("#ffffff", 2);
  light.position.x = 5;
  light.position.y = 10;
  light.position.z = -5;
  light.shadow.camera.left = -8;
  light.shadow.camera.right = 8;
  light.shadow.camera.top = 8;
  light.shadow.camera.bottom = -8;
  light.shadow.mapSize.height = 1024;
  light.shadow.mapSize.width = 1024;
  light.castShadow = true;
  
  return light;
}

export const setup = () => {
  const scene = initScene();
  const camera = initCamera();
  const renderer = initRenderer();
  const lightning = initLightning();

  const gridHelper = new GridHelper(10, 20, 0x808080, 0x808080);
  gridHelper.position.x = 0.25;
  gridHelper.position.y = -0.25;
  gridHelper.position.z = 0.25;

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  setupKeyEvents();

  const head = createCube(undefined, undefined, undefined, "#667761");
  const platform = createCube(50, 0.5, 50, "#9B8884");
  platform.position.y = -0.51;

  scene.add(head, platform, lightning, gridHelper);

  return {
    scene,
    camera,
    renderer,
    lightning,
    head,
    platform,
  };
};
