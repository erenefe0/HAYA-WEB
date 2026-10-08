import * as THREE from 'three';
import { add, box, screw, textLabel } from './helpers';
import {
  carbon,
  edge,
  silver,
  pale,
  blue,
  rubber,
  red,
  yellow,
  green,
  brandBlue,
  lens,
  led,
} from './materials';

// Yerel geometrilerden üretilen tanıtım modeli; tamamlanmış bir ürünün CAD çizimi değildir.
export function makeDrone() {
  const drone = new THREE.Group();
  const props: THREE.Group[] = [];
  box(drone, 1.2, 0.11, 2.0, edge, 0, 0, 0, 0.06);
  box(drone, 1.12, 0.08, 1.88, carbon, 0, 0.065, 0, 0.05);
  box(drone, 0.98, 0.1, 1.64, carbon, 0, 0.41, 0, 0.07);
  for (const x of [-0.45, 0.45])
    for (const z of [-0.58, 0.58]) {
      add(drone, new THREE.CylinderGeometry(0.045, 0.045, 0.32, 12), silver, x, 0.24, z);
      screw(drone, x, 0.48, z);
    }
  // Batarya ve bataryayı gövdeye sabitleyen kayışlar.
  box(drone, 0.8, 0.42, 1.22, pale, 0, 0.66, 0.12, 0.06);
  for (const z of [-0.24, 0.47]) box(drone, 0.83, 0.065, 0.14, rubber, 0, 0.9, z, 0.02);
  box(drone, 0.34, 0.012, 0.65, blue, 0, 0.885, 0.1, 0.015);
  textLabel(drone, 'HAYA', 0.32, 0.085, 0, 0.913, 0.14, '#f5f7fc');
  for (let i = 0; i < 4; i++)
    box(drone, 0.18, 0.007, 0.02, silver, 0, 0.902, -0.05 + i * 0.1, 0.003);
  const rotorPositions = [
    [-1.65, -1.55, yellow],
    [1.65, -1.55, red],
    [-1.65, 1.55, green],
    [1.65, 1.55, brandBlue],
  ] as const;
  for (const [x, z, accent] of rotorPositions) {
    const length = Math.hypot(x, z);
    const arm = box(drone, length, 0.12, 0.24, carbon, x / 2, -0.04, z / 2, 0.025);
    arm.rotation.y = -Math.atan2(z, x);
    const armEdge = box(drone, length * 0.75, 0.02, 0.04, edge, x * 0.48, 0.035, z * 0.48, 0.006);
    armEdge.rotation.y = arm.rotation.y;
    const sleeve = box(drone, 0.46, 0.025, 0.22, accent, x * 0.79, 0.039, z * 0.79, 0.025);
    sleeve.rotation.y = arm.rotation.y;
    add(drone, new THREE.CylinderGeometry(0.21, 0.19, 0.17, 32), silver, x, 0.035, z);
    add(drone, new THREE.CylinderGeometry(0.19, 0.19, 0.18, 32), carbon, x, 0.2, z);
    add(drone, new THREE.CylinderGeometry(0.2, 0.2, 0.025, 32), accent, x, 0.302, z);
    add(drone, new THREE.CylinderGeometry(0.14, 0.14, 0.035, 24), silver, x, 0.33, z);
    // Motor havalandırma boşlukları ve alt koruyucu ayak.
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5;
      const vent = box(
        drone,
        0.032,
        0.095,
        0.018,
        rubber,
        x + Math.cos(a) * 0.191,
        0.2,
        z + Math.sin(a) * 0.191,
        0.003,
      );
      vent.rotation.y = -a;
    }
    box(drone, 0.27, 0.18, 0.27, rubber, x, -0.15, z, 0.06);
    const rotor = new THREE.Group();
    rotor.position.set(x, 0.37, z);
    drone.add(rotor);
    props.push(rotor);
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.04, -0.075);
    bladeShape.bezierCurveTo(0.36, -0.17, 0.83, -0.28, 1.04, -0.16);
    bladeShape.bezierCurveTo(1.12, -0.05, 0.89, 0.065, 0.46, 0.095);
    bladeShape.lineTo(0.06, 0.075);
    bladeShape.closePath();
    for (const angle of [0, Math.PI]) {
      const blade = add(
        rotor,
        new THREE.ExtrudeGeometry(bladeShape, {
          depth: 0.015,
          bevelEnabled: true,
          bevelThickness: 0.006,
          bevelSize: 0.008,
          bevelSegments: 1,
        }),
        edge,
      );
      blade.rotation.x = -Math.PI / 2;
      blade.rotation.z = angle;
    }
    add(rotor, new THREE.CylinderGeometry(0.065, 0.065, 0.07, 12), silver, 0, 0.02, 0);
    rotor.rotation.y = x * z > 0 ? 0.6 : 1.5;
  }
  // Kamera gövdesi, lens ve koruma rayları ön tarafa (-Z eksenine) bakar.
  box(drone, 0.58, 0.46, 0.42, blue, 0, 0.22, -0.95, 0.1);
  const camera = add(drone, new THREE.CylinderGeometry(0.2, 0.2, 0.13, 32), silver, 0, 0.24, -1.21);
  camera.rotation.x = Math.PI / 2;
  const glass = add(
    drone,
    new THREE.CylinderGeometry(0.158, 0.158, 0.026, 40),
    lens,
    0,
    0.24,
    -1.295,
  );
  glass.rotation.x = Math.PI / 2;
  const lensRing = add(drone, new THREE.TorusGeometry(0.145, 0.012, 8, 40), edge, 0, 0.24, -1.313);
  lensRing.rotation.z = 0.2;
  const innerLens = add(drone, new THREE.SphereGeometry(0.11, 24, 16), lens, 0, 0.24, -1.325);
  innerLens.scale.z = 0.22;
  for (const x of [-0.35, 0.35]) box(drone, 0.065, 0.45, 0.65, carbon, x, 0.24, -0.95, 0.025);
  for (const x of [-0.29, 0.29])
    add(drone, new THREE.SphereGeometry(0.028, 10, 8), led, x, 0.43, -0.86);
  // Arka anten ve elektronik kart grubu.
  box(drone, 0.65, 0.1, 0.54, green, 0, 0.17, 0.47, 0.025);
  for (let i = 0; i < 6; i++)
    box(drone, 0.015, 0.08, 0.15, silver, -0.22 + i * 0.085, 0.25, 0.49, 0.003);
  const antenna = add(
    drone,
    new THREE.CylinderGeometry(0.023, 0.028, 0.73, 12),
    rubber,
    0,
    0.57,
    0.84,
  );
  antenna.rotation.x = 0.3;
  add(drone, new THREE.SphereGeometry(0.11, 16, 12), carbon, 0, 0.92, 0.94);
  return { drone, props };
}
