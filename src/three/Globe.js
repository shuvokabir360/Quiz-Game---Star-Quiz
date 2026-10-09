import * as THREE from 'three';

/**
 * Creates an ultra-sleek futuristic 3D wireframe & glowing cyber globe with orbital rings.
 */
export class Globe {
  constructor() {
    this.group = new THREE.Group();
    this.init();
  }

  init() {
    // 1. Core Sphere (Dark oceanic body)
    const coreGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x071126,
      transparent: true,
      opacity: 0.85
    });
    this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.group.add(this.coreMesh);

    // 2. Wireframe / Latitude-Longitude Grid
    const wireGeo = new THREE.SphereGeometry(2.42, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    this.wireMesh = new THREE.Mesh(wireGeo, wireMat);
    this.group.add(this.wireMesh);

    // 3. Dot Matrix / Constellation points on surface
    const pointCount = 600;
    const pointGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.44;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    this.pointsMesh = new THREE.Points(pointGeo, pointMat);
    this.group.add(this.pointsMesh);

    // 4. Subtle Orbital Rings
    const ringGeo1 = new THREE.RingGeometry(3.1, 3.14, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    this.ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI / 2.5;
    this.ring1.rotation.y = Math.PI / 6;
    this.group.add(this.ring1);

    const ringGeo2 = new THREE.RingGeometry(3.5, 3.53, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.x = -Math.PI / 3;
    this.ring2.rotation.z = Math.PI / 4;
    this.group.add(this.ring2);

    // Position globe lower in background so it frames the portrait nicely
    this.group.position.set(0, -1.8, -4.5);
  }

  update(delta = 0.016, speedMultiplier = 1.0) {
    const s = delta * speedMultiplier;
    this.coreMesh.rotation.y += 0.15 * s;
    this.wireMesh.rotation.y += 0.25 * s;
    this.pointsMesh.rotation.y += 0.2 * s;
    this.ring1.rotation.z += 0.12 * s;
    this.ring2.rotation.z -= 0.08 * s;
  }

  dispose() {
    this.group.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }
}
