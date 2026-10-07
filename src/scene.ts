import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const material = (color: string, metalness = .5, roughness = .4) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
const carbon = material('#1c273c', .65, .43);
const edge = material('#445371', .65, .3);
const silver = material('#c7cddb', .8, .25);
const pale = material('#e4e6ec', .45, .36);
const blue = material('#4169b0', .45, .36);
const rubber = material('#101723', .1, .62);
const red = material('#e84245', .25, .35);
const yellow = material('#f1bd2d', .3, .35);
const green = material('#36a568', .3, .35);
const brandBlue = material('#528be4', .3, .35);
const lens = material('#111d39', .95, .1);
const led = new THREE.MeshStandardMaterial({ color:'#72c5f5', emissive:'#2774cb', emissiveIntensity:2, metalness:.2, roughness:.3 });

function add(parent: THREE.Group, geo: THREE.BufferGeometry, mat: THREE.Material, x=0, y=0, z=0) {
  const mesh = new THREE.Mesh(geo, mat); mesh.position.set(x,y,z); parent.add(mesh); return mesh;
}
const box = (parent: THREE.Group, w:number, h:number, d:number, mat:THREE.Material, x=0, y=0, z=0, radius=.04) => add(parent,new RoundedBoxGeometry(w,h,d,2,radius),mat,x,y,z);
function screw(parent: THREE.Group, x:number, y:number, z:number) {
  add(parent,new THREE.CylinderGeometry(.035,.035,.035,8),silver,x,y,z);
  box(parent,.045,.003,.008,rubber,x,y+.019,z,.001);
}
function textLabel(parent:THREE.Group, text:string, w:number, h:number, x:number, y:number, z:number, color='#c8d4ef') {
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;
  const ctx=canvas.getContext('2d')!;ctx.fillStyle=color;ctx.font='600 60px sans-serif';ctx.textAlign='center';ctx.fillText(text,256,83);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  const mesh=add(parent,new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map,transparent:true,depthWrite:false}),x,y,z);mesh.rotation.x=-Math.PI/2;
}

/** Concept models built locally; not CAD representations of finished HAYA products. */
function makeDrone() {
  const drone=new THREE.Group();
  const props:THREE.Group[]=[];
  box(drone,1.2,.11,2.0,edge,0,0,0,.06);
  box(drone,1.12,.08,1.88,carbon,0,.065,0,.05);
  box(drone,.98,.1,1.64,carbon,0,.41,0,.07);
  for(const x of [-.45,.45])for(const z of [-.58,.58]){
    add(drone,new THREE.CylinderGeometry(.045,.045,.32,12),silver,x,.24,z);
    screw(drone,x,.48,z);
  }
  // Battery and retaining straps.
  box(drone,.8,.42,1.22,pale,0,.66,.12,.06);
  for(const z of [-.24,.47])box(drone,.83,.065,.14,rubber,0,.9,z,.02);
  box(drone,.34,.012,.65,blue,0,.885,.10,.015);
  textLabel(drone,'HAYA',.32,.085,0,.913,.14,'#f5f7fc');
  for(let i=0;i<4;i++)box(drone,.18,.007,.02,silver,0,.902,-.05+i*.10,.003);
  const rotorPositions=[[-1.65,-1.55,yellow],[1.65,-1.55,red],[-1.65,1.55,green],[1.65,1.55,brandBlue]] as const;
  for(const [x,z,accent] of rotorPositions){
    const length=Math.hypot(x,z);
    const arm=box(drone,length,.12,.24,carbon,x/2,-.04,z/2,.025);arm.rotation.y=-Math.atan2(z,x);
    const armEdge=box(drone,length*.75,.02,.04,edge,x*.48,.035,z*.48,.006);armEdge.rotation.y=arm.rotation.y;
    const sleeve=box(drone,.46,.025,.22,accent,x*.79,.039,z*.79,.025);sleeve.rotation.y=arm.rotation.y;
    add(drone,new THREE.CylinderGeometry(.21,.19,.17,32),silver,x,.035,z);
    add(drone,new THREE.CylinderGeometry(.19,.19,.18,32),carbon,x,.20,z);
    add(drone,new THREE.CylinderGeometry(.2,.2,.025,32),accent,x,.302,z);
    add(drone,new THREE.CylinderGeometry(.14,.14,.035,24),silver,x,.33,z);
    // Rotor bell vents and bottom skid.
    for(let i=0;i<10;i++){const a=i*Math.PI/5;const vent=box(drone,.032,.095,.018,rubber,x+Math.cos(a)*.191,.2,z+Math.sin(a)*.191,.003);vent.rotation.y=-a;}
    box(drone,.27,.18,.27,rubber,x,-.15,z,.06);
    const rotor=new THREE.Group();rotor.position.set(x,.37,z);drone.add(rotor);props.push(rotor);
    const bladeShape=new THREE.Shape();bladeShape.moveTo(.04,-.075);bladeShape.bezierCurveTo(.36,-.17,.83,-.28,1.04,-.16);bladeShape.bezierCurveTo(1.12,-.05,.89,.065,.46,.095);bladeShape.lineTo(.06,.075);bladeShape.closePath();
    for(const angle of [0,Math.PI]){
      const blade=add(rotor,new THREE.ExtrudeGeometry(bladeShape,{depth:.015,bevelEnabled:true,bevelThickness:.006,bevelSize:.008,bevelSegments:1}),edge);blade.rotation.x=-Math.PI/2;blade.rotation.z=angle;
    }
    add(rotor,new THREE.CylinderGeometry(.065,.065,.07,12),silver,0,.02,0);
    rotor.rotation.y=x*z>0?.6:1.5;
  }
  // FPV camera housing, lens and protection rails, facing forward (-Z).
  box(drone,.58,.46,.42,blue,0,.22,-.95,.10);
  const camera=add(drone,new THREE.CylinderGeometry(.20,.20,.13,32),silver,0,.24,-1.21);camera.rotation.x=Math.PI/2;
  const glass=add(drone,new THREE.CylinderGeometry(.158,.158,.026,40),lens,0,.24,-1.295);glass.rotation.x=Math.PI/2;
  const lensRing=add(drone,new THREE.TorusGeometry(.145,.012,8,40),edge,0,.24,-1.313);
  lensRing.rotation.z=.2;
  const innerLens=add(drone,new THREE.SphereGeometry(.11,24,16),lens,0,.24,-1.325);innerLens.scale.z=.22;
  for(const x of [-.35,.35])box(drone,.065,.45,.65,carbon,x,.24,-.95,.025);
  for(const x of [-.29,.29])add(drone,new THREE.SphereGeometry(.028,10,8),led,x,.43,-.86);
  // Rear antenna and electronic stack.
  box(drone,.65,.10,.54,green,0,.17,.47,.025);
  for(let i=0;i<6;i++)box(drone,.015,.08,.15,silver,-.22+i*.085,.25,.49,.003);
  const antenna=add(drone,new THREE.CylinderGeometry(.023,.028,.73,12),rubber,0,.57,.84);antenna.rotation.x=.30;
  add(drone,new THREE.SphereGeometry(.11,16,12),carbon,0,.92,.94);
  return { drone, props };
}

function makeControls(){
  const controls=new THREE.Group();
  // Flight stick base and removable faceplate.
  box(controls,2.25,.40,2.10,carbon,-1,-.75,0,.13);
  box(controls,2.12,.075,1.96,blue,-1,-.51,0,.08);
  for(const x of [-1.9,-.1])for(const z of [-.80,.80]){screw(controls,x,-.46,z);box(controls,.25,.12,.25,rubber,x,-1.01,z,.035);}
  for(let i=0;i<4;i++)box(controls,.57,.025,.03,edge,-1,-.45,.52+i*.09,.003);
  textLabel(controls,'HAYA  /  FLIGHT',1.05,.14,-1,-.458,-.72);
  add(controls,new THREE.CylinderGeometry(.51,.63,.14,40),rubber,-1,-.38,0);
  for(let i=0;i<4;i++)add(controls,new THREE.TorusGeometry(.29+i*.054,.027,8,32),rubber,-1,-.22-i*.042,0).rotation.x=Math.PI/2;
  const shaftCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-1,-.25,0),new THREE.Vector3(-1,.35,0),new THREE.Vector3(-.88,.72,-.12),new THREE.Vector3(-.77,1.12,-.21)]);
  add(controls,new THREE.TubeGeometry(shaftCurve,20,.085,12,false),silver);
  const grip=new THREE.Group();grip.position.set(-.77,1.08,-.21);grip.rotation.x=-.14;grip.rotation.z=-.12;controls.add(grip);
  box(grip,.47,.94,.49,rubber,0,.19,0,.14);
  box(grip,.52,.18,.51,carbon,0,.66,-.015,.10);
  for(let i=0;i<4;i++)box(grip,.44,.037,.05,edge,0,-.05+i*.13,-.257,.012);
  box(grip,.27,.17,.13,red,0,.58,-.31,.04);
  add(grip,new THREE.CylinderGeometry(.09,.09,.04,20),yellow,-.10,.79,-.05);
  add(grip,new THREE.CylinderGeometry(.074,.074,.045,16),edge,.12,.79,.06);
  box(grip,.34,.12,.11,silver,0,.43,.25,.03);
  // Twin throttle quadrant, axes, switches and panel indicators.
  box(controls,1.75,.39,2.10,carbon,1.48,-.74,0,.12);
  box(controls,1.64,.07,1.98,blue,1.48,-.51,0,.06);
  for(const x of [.84,2.12])for(const z of [-.81,.81])screw(controls,x,-.45,z);
  box(controls,1.39,.04,.84,rubber,1.48,-.45,-.13,.07);
  for(const x of [1.14,1.77]){
    box(controls,.10,.025,.72,edge,x,-.415,-.10,.018);
    const lever=add(controls,new THREE.CylinderGeometry(.045,.045,.92,12),silver,x,.02,-.14);lever.rotation.x=-.4;
    box(controls,.44,.20,.48,rubber,x,.47,-.31,.065);
    box(controls,.45,.022,.09,silver,x,.58,-.29,.012);
  }
  for(let i=0;i<3;i++){
    const x=1.01+i*.43;
    add(controls,new THREE.CylinderGeometry(.065,.065,.03,16),silver,x,-.448,.65);
    const toggle=add(controls,new THREE.CylinderGeometry(.018,.02,.16,8),silver,x,-.36,.65);toggle.rotation.x=i%2?.3:-.3;
  }
  textLabel(controls,'SIMULATION',.83,.11,1.48,-.458,-.78);
  box(controls,.28,.023,.09,carbon,2.02,-.444,-.73,.015);
  add(controls,new THREE.SphereGeometry(.028,10,8),led,2.02,-.426,-.73);
  controls.position.y=.10;
  return controls;
}

export function createFlightScene(container:HTMLElement,getProgress:()=>number,getReducedMotion:()=>boolean){
  let renderer:THREE.WebGLRenderer;
  const fallback=document.querySelector<HTMLElement>('.scene-fallback')!;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{container.hidden=true;fallback.hidden=false;return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  container.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(35,1,.1,60);camera.position.set(6,6.5,-8.5);camera.lookAt(0,.05,0);
  const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#e0e9ff','#31446a',2.1));
  const key=new THREE.DirectionalLight('#edf2ff',3.6);key.position.set(-4,8,-3);scene.add(key);
  const rim=new THREE.DirectionalLight('#6297ff',2.8);rim.position.set(5,2,4);scene.add(rim);
  const fill=new THREE.DirectionalLight('#ffffff',1.2);fill.position.set(1,-2,-5);scene.add(fill);
  const {drone,props}=makeDrone();scene.add(drone);
  const controls=makeControls();scene.add(controls);controls.visible=false;
  const pointer={x:0,y:0};
  function onPointer(e:PointerEvent){const r=container.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width-.5)*2;pointer.y=((e.clientY-r.top)/r.height-.5)*2;}
  function onLeave(){pointer.x=0;pointer.y=0;}
  container.addEventListener('pointermove',onPointer);container.addEventListener('pointerleave',onLeave);
  function resize(){const {width,height}=container.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;const distance=camera.aspect<1.1?1.14:1;camera.position.set(6,6.5,-8.5).multiplyScalar(distance);camera.lookAt(0,.05,0);camera.updateProjectionMatrix();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);resize();
  let visible=true,frame=0,last=0,currentProgress=0,disposed=false;
  const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!frame&&!disposed)frame=requestAnimationFrame(render);},{rootMargin:'80px'});visibilityObserver.observe(container);
  function render(now:number){
    frame=0;if(disposed||!visible||document.hidden)return;frame=requestAnimationFrame(render);
    if(container.clientWidth<500&&now-last<32)return;
    const dt=Math.min((now-last)/1000,.05);last=now;const reduced=getReducedMotion();
    currentProgress=reduced?getProgress():THREE.MathUtils.lerp(currentProgress,getProgress(),1-Math.exp(-dt*8));
    const phase=THREE.MathUtils.smoothstep(currentProgress,.40,.64),t=now/1000;
    const droneScale=Math.max(.001,1-phase);drone.visible=phase<.995;drone.scale.setScalar(droneScale);
    drone.position.set(0,phase*1.8+(reduced?0:Math.sin(t*.7)*.065),0);
    drone.rotation.set(reduced?.02:Math.sin(t*.5)*.025,-.30+currentProgress*.95+(reduced?0:pointer.x*.09),-.08+(reduced?0:pointer.y*.04));
    props.forEach((p,i)=>{if(!reduced)p.rotation.y+=(i%2?1:-1)*dt*7;});
    controls.visible=phase>.005;controls.scale.setScalar(Math.max(.001,phase)*1.12);controls.position.y=.1-(1-phase)*1.5;
    controls.rotation.set(0,-.22+(currentProgress-.64)*.48+(reduced?0:pointer.x*.07),reduced?0:Math.sin(t*.4)*.008);
    renderer.render(scene,camera);container.dataset.sceneReady='true';container.dataset.flightProgress=currentProgress.toFixed(3);container.dataset.model=phase>.5?'controls':'drone';container.dataset.motionReduced=String(reduced);
  }
  function onVisibility(){if(!document.hidden&&visible&&!frame&&!disposed)frame=requestAnimationFrame(render);}
  document.addEventListener('visibilitychange',onVisibility);
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();container.hidden=true;fallback.hidden=false;});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{container.hidden=false;fallback.hidden=true;resize();});
  function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();visibilityObserver.disconnect();document.removeEventListener('visibilitychange',onVisibility);container.removeEventListener('pointermove',onPointer);container.removeEventListener('pointerleave',onLeave);const materials=new Set<THREE.Material>();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));}});materials.forEach(m=>{if('map'in m&&m.map instanceof THREE.Texture)m.map.dispose();m.dispose();});environment.dispose();renderer.dispose();renderer.domElement.remove();}
  window.addEventListener('pagehide',e=>{if(!e.persisted)dispose();},{once:true});
  if(import.meta.hot)import.meta.hot.dispose(dispose);
  frame=requestAnimationFrame(render);
}
