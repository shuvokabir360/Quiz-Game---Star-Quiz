import * as THREE from 'three';
import { Globe } from './Globe.js';
import { ParticleField } from './ParticleField.js';
import { Lighting } from './Lighting.js';
import { CameraController } from './CameraController.js';

export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.isSupported = this.checkWebGLSupport();
    this.isPaused = false;
    this.isPageHidden = false;
    this.animFrameId = null;
    this.clock = new THREE.Clock();
    this.reducedMotion = false;
    this.quality = 'high';

    if (!this.isSupported) {
      console.warn('WebGL is not supported or context lost. Using stylish CSS backdrop fallback.');
      this.container.classList.add('webgl-fallback');
      return;
    }

    this.init();
  }

  checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050b18, 0.05);

    // 2. Camera Controller
    this.cameraController = new CameraController(this.container);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setClearColor(0x050b18, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    // 4. Sub-systems
    this.globe = new Globe();
    this.scene.add(this.globe.group);

    this.particles = new ParticleField(this.quality);
    this.scene.add(this.particles.group);

    this.lighting = new Lighting();
    this.scene.add(this.lighting.group);

    // 5. Events
    this.onResize = this.onResize.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    window.addEventListener('resize', this.onResize);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // 6. Start Loop
    this.animate();
  }

  setQuality(quality) {
    if (this.quality === quality || !this.isSupported) return;
    this.quality = quality;

    if (this.particles) {
      this.scene.remove(this.particles.group);
      this.particles.dispose();
      this.particles = new ParticleField(this.quality);
      this.scene.add(this.particles.group);
    }

    if (this.renderer) {
      const pixelRatio = quality === 'low' ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      this.renderer.setPixelRatio(pixelRatio);
    }
  }

  setReducedMotion(enabled) {
    this.reducedMotion = !!enabled;
    if (this.cameraController) {
      this.cameraController.setReducedMotion(enabled);
    }
  }

  onResize() {
    if (!this.renderer || !this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.renderer.setSize(width, height);
    if (this.cameraController) {
      this.cameraController.onResize(width, height);
    }
  }

  onVisibilityChange() {
    this.isPageHidden = document.hidden;
    if (this.isPageHidden) {
      this.pause();
    } else {
      this.resume();
    }
  }

  pause() {
    this.isPaused = true;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  resume() {
    if (!this.isSupported) return;
    this.isPaused = false;
    if (!this.animFrameId && !this.isPageHidden) {
      this.clock.getDelta(); // flush delta
      this.animate();
    }
  }

  animate = () => {
    if (this.isPaused || this.isPageHidden || !this.renderer) return;

    this.animFrameId = requestAnimationFrame(this.animate);
    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    const speedMultiplier = this.reducedMotion ? 0.2 : 1.0;

    if (this.globe) this.globe.update(delta, speedMultiplier);
    if (this.particles) this.particles.update(delta, speedMultiplier);
    if (this.lighting) this.lighting.update(elapsedTime);
    if (this.cameraController) this.cameraController.update(delta);

    this.renderer.render(this.scene, this.cameraController.camera);
  };

  dispose() {
    this.pause();
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.globe) this.globe.dispose();
    if (this.particles) this.particles.dispose();
    if (this.lighting) this.lighting.dispose();
    if (this.cameraController) this.cameraController.dispose();

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
  }
}
