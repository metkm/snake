import { Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, PCFSoftShadowMap, Vector3, Color } from "three";

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
