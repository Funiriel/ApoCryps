import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const container = document.querySelector(".mars-map");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene"), antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// ─── ПЛАНЕТА ───────────────────────────────────────────
const geometry = new THREE.SphereGeometry(0.8, 64, 64);
const loader = new THREE.TextureLoader();
const texture = loader.load("image.png");
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.85, metalness: 0.0 });
const mars = new THREE.Mesh(geometry, material);
scene.add(mars);
mars.position.x = 0.0;

// ─── АТМОСФЕРА ─────────────────────────────────────────
const atmGeo = new THREE.SphereGeometry(0.84, 64, 64);
const atmMat = new THREE.MeshBasicMaterial({
  color: 0xff5522,
  transparent: true,
  opacity: 0.045,
  depthWrite: false,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending
});
const atmosphere = new THREE.Mesh(atmGeo, atmMat);
scene.add(atmosphere);

const atmGeo2 = new THREE.SphereGeometry(0.89, 64, 64);
const atmMat2 = new THREE.MeshBasicMaterial({
  color: 0xff3300,
  transparent: true,
  opacity: 0.02,
  depthWrite: false,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending
});
const atmosphere2 = new THREE.Mesh(atmGeo2, atmMat2);
scene.add(atmosphere2);

// ─── МАРКЕРИ ───────────────────────────────────────────
function latLngToVec3(lat, lng, radius = 0.80) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 190) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

const bases = [
  { name: 'База Альфа', lat: 18.4,  lng: -77.5, info: 'Головна станція, 6 осіб', file: 'Logika.html' },
  { name: 'База Бета',  lat: -14.6, lng: 41.3,  info: 'Геологічний аванпост, 2 особи', file: 'Ferma.html' },
];

const dotMeshes = [];
const glowMeshes = []; // ← було забуто

bases.forEach(base => {
  const pos = latLngToVec3(base.lat, base.lng); // ← було забуто

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.010, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff8c6b })
  );
  dot.position.copy(pos);
  mars.add(dot);

  const hitbox = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 8, 8),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitbox.position.copy(pos);
  hitbox.userData = base;
  mars.add(hitbox);
  dotMeshes.push(hitbox);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.022, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff4422, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  glow.position.copy(pos);
  mars.add(glow);
  glowMeshes.push(glow);

  const ring = new THREE.Mesh(
    new THREE.SphereGeometry(0.038, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  ring.position.copy(pos);
  mars.add(ring);
  glowMeshes.push(ring);
});

// ─── TOOLTIP ───────────────────────────────────────────
const tooltip = document.getElementById('tooltip');
const tipName = tooltip.querySelector('.tip-name');
const tipInfo = tooltip.querySelector('.tip-info');

// ─── RAYCASTING ────────────────────────────────────────
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

container.addEventListener('mousemove', e => {
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(dotMeshes);

  if (hits.length > 0) {
    const base = hits[0].object.userData;
    container.style.cursor = 'pointer';
    tipName.textContent = base.name;
    tipInfo.textContent = base.info;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tooltip.style.display = 'block';
    tooltip.style.left = (x > rect.width / 2 ? x - 16 - tooltip.offsetWidth : x + 16) + 'px';
    tooltip.style.top = (y - 8) + 'px';
  } else {
    container.style.cursor = isDragging ? 'grabbing' : 'grab';
    tooltip.style.display = 'none';
  }
});

container.addEventListener('click', e => {
  if (isDragging) return;
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(dotMeshes);
  if (hits.length > 0 && hits[0].object.userData.file) {
    window.location.href = hits[0].object.userData.file;
  }
});

// ─── ОСВІТЛЕННЯ ───────────────────────────────────────
const sunLight = new THREE.DirectionalLight(0xfff0e0, 3.5);
sunLight.position.set(5, 5, 5);
mars.add(sunLight);
const warmFill = new THREE.DirectionalLight(0xffddcc, 0.2);
warmFill.position.set(-3, 2, -2);
mars.add(warmFill);
scene.add(new THREE.AmbientLight(0xffffff, 0.15));

// ─── DRAG ─────────────────────────────────────────────
let isMouseDown = false;
let isDragging = false;
let prevX = 0, prevY = 0;
container.style.cursor = 'grab';
container.addEventListener('mousedown', e => {
  isMouseDown = true;
  isDragging = false;
  prevX = e.clientX;
  prevY = e.clientY;
  container.style.cursor = 'grabbing';
});
window.addEventListener('mouseup', () => {
  isMouseDown = false;
  isDragging = false;
  container.style.cursor = 'grab';
});
window.addEventListener('mousemove', e => {
  if (!isMouseDown) return; // ← ключова перевірка
  const dx = e.clientX - prevX;
  const dy = e.clientY - prevY;
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) isDragging = true;
  if (isDragging) {
    mars.rotation.y += dx * 0.003;
    mars.rotation.x += dy * 0.003;
    prevX = e.clientX;
    prevY = e.clientY;
  }
});

// ─── РЕНДЕР ───────────────────────────────────────────
const AUTO_SPEED = 0.0008;
let clock = 0;
function animate() {
  requestAnimationFrame(animate);
  clock += 0.016;

  if (!isDragging) mars.rotation.y += AUTO_SPEED;

  // Sync atmosphere with mars position
  atmosphere.rotation.y = mars.rotation.y;
  atmosphere.rotation.x = mars.rotation.x;
  atmosphere2.rotation.y = mars.rotation.y;
  atmosphere2.rotation.x = mars.rotation.x;

  // Pulse glow markers
  glowMeshes.forEach((g, i) => {
    const phase = clock * 1.8 + i * 1.2;
    g.material.opacity = 0.18 + Math.sin(phase) * 0.14;
    const s = 1 + Math.sin(phase * 0.9) * 0.08;
    g.scale.setScalar(s);
  });

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
});
// ─── ЗІРКИ ─────────────────────────────────────────────
const starGeo = new THREE.BufferGeometry();
const starCount = 2500;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  starPos[i * 3]     = (Math.random() - 0.5) * 200;
  starPos[i * 3 + 1] = (Math.random() - 0.5) * 200;
  starPos[i * 3 + 2] = (Math.random() - 0.5) * 200;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, sizeAttenuation: true })
);
scene.add(stars);
