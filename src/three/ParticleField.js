import * as THREE from 'three';

export class ParticleField {
  constructor(quality = 'high') {
    this.group = new THREE.Group();
    this.quality = quality;
    this.init();
  }

  init() {
    let count = 600;
    if (this.quality === 'medium') count = 300;
    if (this.quality === 'low') count = 120;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xc084fc), // Violet
      new THREE.Color(0xffffff)  // Pure star
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.points = new THREE.Points(geometry, material);
    this.group.add(this.points);
  }

  update(delta = 0.016, speedMultiplier = 1.0) {
    if (!this.points) return;
    const s = delta * speedMultiplier;
    this.points.rotation.y += 0.04 * s;
    this.points.rotation.x += 0.02 * s;
  }

  dispose() {
    if (this.points) {
      if (this.points.geometry) this.points.geometry.dispose();
      if (this.points.material) this.points.material.dispose();
    }
  }
}
