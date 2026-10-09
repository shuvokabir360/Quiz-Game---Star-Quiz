import * as THREE from 'three';

export class Lighting {
  constructor() {
    this.group = new THREE.Group();
    this.init();
  }

  init() {
    // Ambient soft midnight light
    this.ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.2);
    this.group.add(this.ambientLight);

    // Cyan key light
    this.dirLight1 = new THREE.DirectionalLight(0x00f2fe, 1.5);
    this.dirLight1.position.set(5, 8, 4);
    this.group.add(this.dirLight1);

    // Violet rim light
    this.dirLight2 = new THREE.DirectionalLight(0x9333ea, 1.2);
    this.dirLight2.position.set(-5, -6, 2);
    this.group.add(this.dirLight2);

    // Moving point light for dynamic illumination
    this.pointLight = new THREE.PointLight(0x38bdf8, 2, 12);
    this.pointLight.position.set(0, 0, 1);
    this.group.add(this.pointLight);
  }

  update(time = 0) {
    if (this.pointLight) {
      this.pointLight.position.x = Math.sin(time * 0.5) * 3;
      this.pointLight.position.y = Math.cos(time * 0.7) * 2;
    }
  }

  dispose() {
    // Lights don't have buffer geometries to dispose, but clear references
  }
}
