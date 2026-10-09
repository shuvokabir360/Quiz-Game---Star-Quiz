import * as THREE from 'three';

export class CameraController {
  constructor(container) {
    this.container = container;
    const aspect = container.clientWidth / (container.clientHeight || 1);
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 6.5);

    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.reducedMotion = false;

    this.onPointerMove = this.onPointerMove.bind(this);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
  }

  setReducedMotion(enabled) {
    this.reducedMotion = !!enabled;
    if (this.reducedMotion) {
      this.targetX = 0;
      this.targetY = 0;
      this.camera.position.set(0, 0, 6.5);
    }
  }

  onPointerMove(e) {
    if (this.reducedMotion) return;
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    this.targetX = ((e.clientX - halfW) / halfW) * 0.4;
    this.targetY = (-(e.clientY - halfH) / halfH) * 0.4;
  }

  onResize(width, height) {
    this.camera.aspect = width / (height || 1);
    this.camera.updateProjectionMatrix();
  }

  update(delta = 0.016) {
    if (this.reducedMotion) return;

    // Smooth damping
    this.currentX += (this.targetX - this.currentX) * 0.05;
    this.currentY += (this.targetY - this.currentY) * 0.05;

    this.camera.position.x = this.currentX;
    this.camera.position.y = this.currentY;
    this.camera.lookAt(0, 0, -2);
  }

  dispose() {
    window.removeEventListener('pointermove', this.onPointerMove);
  }
}
