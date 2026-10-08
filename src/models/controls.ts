import * as THREE from 'three';
import { add, box, screw, textLabel } from './helpers';
import { carbon, edge, silver, blue, rubber, red, yellow, led } from './materials';

// Kumanda kolu ve çift gaz kolundan oluşan simülasyon donanımı konsepti.
export function makeControls() {
  const controls = new THREE.Group();
  // Kumanda kolunun tabanı ve sökülebilir üst paneli.
  box(controls, 2.25, 0.4, 2.1, carbon, -1, -0.75, 0, 0.13);
  box(controls, 2.12, 0.075, 1.96, blue, -1, -0.51, 0, 0.08);
  for (const x of [-1.9, -0.1])
    for (const z of [-0.8, 0.8]) {
      screw(controls, x, -0.46, z);
      box(controls, 0.25, 0.12, 0.25, rubber, x, -1.01, z, 0.035);
    }
  for (let i = 0; i < 4; i++)
    box(controls, 0.57, 0.025, 0.03, edge, -1, -0.45, 0.52 + i * 0.09, 0.003);
  textLabel(controls, 'HAYA  /  FLIGHT', 1.05, 0.14, -1, -0.458, -0.72);
  add(controls, new THREE.CylinderGeometry(0.51, 0.63, 0.14, 40), rubber, -1, -0.38, 0);
  for (let i = 0; i < 4; i++)
    add(
      controls,
      new THREE.TorusGeometry(0.29 + i * 0.054, 0.027, 8, 32),
      rubber,
      -1,
      -0.22 - i * 0.042,
      0,
    ).rotation.x = Math.PI / 2;
  const shaftCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1, -0.25, 0),
    new THREE.Vector3(-1, 0.35, 0),
    new THREE.Vector3(-0.88, 0.72, -0.12),
    new THREE.Vector3(-0.77, 1.12, -0.21),
  ]);
  add(controls, new THREE.TubeGeometry(shaftCurve, 20, 0.085, 12, false), silver);
  const grip = new THREE.Group();
  grip.position.set(-0.77, 1.08, -0.21);
  grip.rotation.x = -0.14;
  grip.rotation.z = -0.12;
  controls.add(grip);
  box(grip, 0.47, 0.94, 0.49, rubber, 0, 0.19, 0, 0.14);
  box(grip, 0.52, 0.18, 0.51, carbon, 0, 0.66, -0.015, 0.1);
  for (let i = 0; i < 4; i++)
    box(grip, 0.44, 0.037, 0.05, edge, 0, -0.05 + i * 0.13, -0.257, 0.012);
  box(grip, 0.27, 0.17, 0.13, red, 0, 0.58, -0.31, 0.04);
  add(grip, new THREE.CylinderGeometry(0.09, 0.09, 0.04, 20), yellow, -0.1, 0.79, -0.05);
  add(grip, new THREE.CylinderGeometry(0.074, 0.074, 0.045, 16), edge, 0.12, 0.79, 0.06);
  box(grip, 0.34, 0.12, 0.11, silver, 0, 0.43, 0.25, 0.03);
  // Çift gaz kolu, eksenleri, anahtarları ve panel göstergeleri.
  box(controls, 1.75, 0.39, 2.1, carbon, 1.48, -0.74, 0, 0.12);
  box(controls, 1.64, 0.07, 1.98, blue, 1.48, -0.51, 0, 0.06);
  for (const x of [0.84, 2.12]) for (const z of [-0.81, 0.81]) screw(controls, x, -0.45, z);
  box(controls, 1.39, 0.04, 0.84, rubber, 1.48, -0.45, -0.13, 0.07);
  for (const x of [1.14, 1.77]) {
    box(controls, 0.1, 0.025, 0.72, edge, x, -0.415, -0.1, 0.018);
    const lever = add(
      controls,
      new THREE.CylinderGeometry(0.045, 0.045, 0.92, 12),
      silver,
      x,
      0.02,
      -0.14,
    );
    lever.rotation.x = -0.4;
    box(controls, 0.44, 0.2, 0.48, rubber, x, 0.47, -0.31, 0.065);
    box(controls, 0.45, 0.022, 0.09, silver, x, 0.58, -0.29, 0.012);
  }
  for (let i = 0; i < 3; i++) {
    const x = 1.01 + i * 0.43;
    add(controls, new THREE.CylinderGeometry(0.065, 0.065, 0.03, 16), silver, x, -0.448, 0.65);
    const toggle = add(
      controls,
      new THREE.CylinderGeometry(0.018, 0.02, 0.16, 8),
      silver,
      x,
      -0.36,
      0.65,
    );
    toggle.rotation.x = i % 2 ? 0.3 : -0.3;
  }
  textLabel(controls, 'SIMULATION', 0.83, 0.11, 1.48, -0.458, -0.78);
  box(controls, 0.28, 0.023, 0.09, carbon, 2.02, -0.444, -0.73, 0.015);
  add(controls, new THREE.SphereGeometry(0.028, 10, 8), led, 2.02, -0.426, -0.73);
  controls.position.y = 0.1;
  return controls;
}
