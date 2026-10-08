import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { silver, rubber } from './materials';

// Geometriyi belirtilen konuma yerleştirir ve üst gruba ekler.
// Koordinatlar: X sağ/sol, Y yükseklik, Z ön/arka; ölçüler sahnenin yerel birimindedir.
export function add(
  parent: THREE.Group,
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}
// Boyutlar sırasıyla genişlik, yükseklik ve derinliktir; son değer köşe yarıçapıdır.
export const box = (
  parent: THREE.Group,
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
  radius = 0.04,
) => add(parent, new RoundedBoxGeometry(w, h, d, 2, radius), mat, x, y, z);
export function screw(parent: THREE.Group, x: number, y: number, z: number) {
  add(parent, new THREE.CylinderGeometry(0.035, 0.035, 0.035, 8), silver, x, y, z);
  box(parent, 0.045, 0.003, 0.008, rubber, x, y + 0.019, z, 0.001);
}
// Canvas üzerindeki yazıyı, modelin üst yüzeyine yapıştırılan bir dokuya dönüştürür.
export function textLabel(
  parent: THREE.Group,
  text: string,
  w: number,
  h: number,
  x: number,
  y: number,
  z: number,
  color = '#c8d4ef',
) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.font = '600 60px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 256, 83);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  const mesh = add(
    parent,
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false }),
    x,
    y,
    z,
  );
  mesh.rotation.x = -Math.PI / 2;
}
