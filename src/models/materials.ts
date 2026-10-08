import * as THREE from 'three';

// İki konsept modelin ortak renk, metal ve yüzey pürüzlülüğü ayarları.
const material = (color: string, metalness = 0.5, roughness = 0.4) =>
  new THREE.MeshStandardMaterial({ color, metalness, roughness });
export const carbon = material('#1c273c', 0.65, 0.43);
export const edge = material('#445371', 0.65, 0.3);
export const silver = material('#c7cddb', 0.8, 0.25);
export const pale = material('#e4e6ec', 0.45, 0.36);
export const blue = material('#4169b0', 0.45, 0.36);
export const rubber = material('#101723', 0.1, 0.62);
export const red = material('#e84245', 0.25, 0.35);
export const yellow = material('#f1bd2d', 0.3, 0.35);
export const green = material('#36a568', 0.3, 0.35);
export const brandBlue = material('#528be4', 0.3, 0.35);
export const lens = material('#111d39', 0.95, 0.1);
export const led = new THREE.MeshStandardMaterial({
  color: '#72c5f5',
  emissive: '#2774cb',
  emissiveIntensity: 2,
  metalness: 0.2,
  roughness: 0.3,
});
