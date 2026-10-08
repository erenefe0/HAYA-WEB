import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { makeDrone } from './models/drone';
import { makeControls } from './models/controls';

// Kaydırma ve hareket tercihini geri çağırımlarla okuyarak 3D sahneyi yönetir.
export function createFlightScene(
  container: HTMLElement,
  getProgress: () => number,
  getReducedMotion: () => boolean,
) {
  // WebGL desteklenmiyorsa sayfanın alternatif görünümünü kullan.
  let renderer: THREE.WebGLRenderer;
  const fallback = document.querySelector<HTMLElement>('.scene-fallback')!;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
  } catch {
    container.hidden = true;
    fallback.hidden = false;
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.set(6, 6.5, -8.5);
  camera.lookAt(0, 0.05, 0);
  // Oda ortamı, metal yüzeylerde gerçekçi yansımalar sağlar.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#e0e9ff', '#31446a', 2.1));
  const key = new THREE.DirectionalLight('#edf2ff', 3.6);
  key.position.set(-4, 8, -3);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#6297ff', 2.8);
  rim.position.set(5, 2, 4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight('#ffffff', 1.2);
  fill.position.set(1, -2, -5);
  scene.add(fill);
  const { drone, props } = makeDrone();
  scene.add(drone);
  const controls = makeControls();
  scene.add(controls);
  controls.visible = false;
  const pointer = { x: 0, y: 0 };
  function onPointer(e: PointerEvent) {
    const r = container.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }
  function onLeave() {
    pointer.x = 0;
    pointer.y = 0;
  }
  container.addEventListener('pointermove', onPointer);
  container.addEventListener('pointerleave', onLeave);
  // Dar ekranlarda kamerayı uzaklaştırarak modeli kadrajda tut.
  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    const distance = camera.aspect < 1.1 ? 1.14 : 1;
    camera.position.set(6, 6.5, -8.5).multiplyScalar(distance);
    camera.lookAt(0, 0.05, 0);
    camera.updateProjectionMatrix();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();
  let visible = true,
    frame = 0,
    last = 0,
    currentProgress = 0,
    disposed = false;
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !frame && !disposed) frame = requestAnimationFrame(render);
    },
    { rootMargin: '80px' },
  );
  visibilityObserver.observe(container);
  // Ekran dışındayken çizim durur; dar ekranlarda yaklaşık 30 FPS sınırı uygulanır.
  function render(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    frame = requestAnimationFrame(render);
    if (container.clientWidth < 500 && now - last < 32) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const reduced = getReducedMotion();
    // Üstel yumuşatma, kaydırma hızından bağımsız ve akıcı geçiş sağlar.
    currentProgress = reduced
      ? getProgress()
      : THREE.MathUtils.lerp(currentProgress, getProgress(), 1 - Math.exp(-dt * 8));
    // 0.40–0.64 aralığında drone küçülürken kumandalar görünür hâle gelir.
    const phase = THREE.MathUtils.smoothstep(currentProgress, 0.4, 0.64),
      t = now / 1000;
    const droneScale = Math.max(0.001, 1 - phase);
    drone.visible = phase < 0.995;
    drone.scale.setScalar(droneScale);
    drone.position.set(0, phase * 1.8 + (reduced ? 0 : Math.sin(t * 0.7) * 0.065), 0);
    drone.rotation.set(
      reduced ? 0.02 : Math.sin(t * 0.5) * 0.025,
      -0.3 + currentProgress * 0.95 + (reduced ? 0 : pointer.x * 0.09),
      -0.08 + (reduced ? 0 : pointer.y * 0.04),
    );
    props.forEach((p, i) => {
      if (!reduced) p.rotation.y += (i % 2 ? 1 : -1) * dt * 7;
    });
    controls.visible = phase > 0.005;
    controls.scale.setScalar(Math.max(0.001, phase) * 1.12);
    controls.position.y = 0.1 - (1 - phase) * 1.5;
    controls.rotation.set(
      0,
      -0.22 + (currentProgress - 0.64) * 0.48 + (reduced ? 0 : pointer.x * 0.07),
      reduced ? 0 : Math.sin(t * 0.4) * 0.008,
    );
    renderer.render(scene, camera);
    container.dataset.sceneReady = 'true';
    container.dataset.flightProgress = currentProgress.toFixed(3);
    container.dataset.model = phase > 0.5 ? 'controls' : 'drone';
    container.dataset.motionReduced = String(reduced);
  }
  function onVisibility() {
    if (!document.hidden && visible && !frame && !disposed) frame = requestAnimationFrame(render);
  }
  document.addEventListener('visibilitychange', onVisibility);
  renderer.domElement.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    container.hidden = true;
    fallback.hidden = false;
  });
  renderer.domElement.addEventListener('webglcontextrestored', () => {
    container.hidden = false;
    fallback.hidden = true;
    resize();
  });
  // GPU belleğindeki geometri, doku ve materyalleri sayfa kapanırken serbest bırak.
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    container.removeEventListener('pointermove', onPointer);
    container.removeEventListener('pointerleave', onLeave);
    const materials = new Set<THREE.Material>();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => materials.add(m));
      }
    });
    materials.forEach((m) => {
      if ('map' in m && m.map instanceof THREE.Texture) m.map.dispose();
      m.dispose();
    });
    environment.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }
  window.addEventListener(
    'pagehide',
    (e) => {
      if (!e.persisted) dispose();
    },
    { once: true },
  );
  if (import.meta.hot) import.meta.hot.dispose(dispose);
  frame = requestAnimationFrame(render);
}
