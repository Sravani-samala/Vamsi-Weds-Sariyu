import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type CharacterType = 'groom' | 'bride';
export type AttireType = 'wedding' | 'haldi' | 'dj';
export type AnimationState = 
  | 'idle' 
  | 'walk' 
  | 'namaskaram' 
  | 'namaste' 
  | 'bow' 
  | 'dance' 
  | 'hold_garland' 
  | 'exchange_garland' 
  | 'celebrate' 
  | 'wave';

export interface Character3DHandle {
  setAnimation: (anim: AnimationState) => void;
  setAttire: (attire: AttireType) => void;
  setProgress?: (progress: number) => void;
}

interface Character3DProps {
  type: CharacterType;
  attire?: AttireType;
  animation?: AnimationState;
  animationProgress?: number; // 0 to 1 for scroll-driven keyframing
  interactive?: boolean;
  className?: string;
  cameraPosition?: [number, number, number];
  height?: string | number;
  showFloorShadow?: boolean;
  onLoaded?: () => void;
}

// Hierarchical Joint Skeleton for Procedural Rig
interface HumanRig {
  root: THREE.Group;
  pelvis: THREE.Group;
  torso: THREE.Group;
  chest: THREE.Group;
  neck: THREE.Group;
  head: THREE.Group;
  leftShoulder: THREE.Group;
  leftUpperArm: THREE.Group;
  leftForearm: THREE.Group;
  leftHand: THREE.Group;
  rightShoulder: THREE.Group;
  rightUpperArm: THREE.Group;
  rightForearm: THREE.Group;
  rightHand: THREE.Group;
  leftHip: THREE.Group;
  leftThigh: THREE.Group;
  leftCalf: THREE.Group;
  rightHip: THREE.Group;
  rightThigh: THREE.Group;
  rightCalf: THREE.Group;
  garland?: THREE.Group;
  materials: Record<string, THREE.Material>;
}

export const Character3D = forwardRef<Character3DHandle, Character3DProps>(({
  type,
  attire = 'wedding',
  animation = 'idle',
  animationProgress,
  interactive = false,
  className = '',
  cameraPosition = [0, 1.2, 3.2],
  height = '100%',
  showFloorShadow = true,
  onLoaded,
}, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentAnim, setCurrentAnim] = useState<AnimationState>(animation);
  const [currentAttire, setCurrentAttire] = useState<AttireType>(attire);
  const [isGLBLoaded, setIsGLBLoaded] = useState(false);
  const rigRef = useRef<HumanRig | null>(null);
  const gltfSceneRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const animActionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const clockRef = useRef(new THREE.Clock());
  const reqIdRef = useRef<number>(0);
  const scrollProgRef = useRef<number | undefined>(animationProgress);

  useEffect(() => {
    setCurrentAnim(animation);
  }, [animation]);

  useEffect(() => {
    setCurrentAttire(attire);
  }, [attire]);

  useEffect(() => {
    scrollProgRef.current = animationProgress;
  }, [animationProgress]);

  useImperativeHandle(ref, () => ({
    setAnimation: (anim: AnimationState) => setCurrentAnim(anim),
    setAttire: (newAttire: AttireType) => setCurrentAttire(newAttire),
    setProgress: (p: number) => {
      scrollProgRef.current = p;
    }
  }));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per skill guide
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const heightPx = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(38, width / heightPx, 0.1, 50);
    camera.position.set(...cameraPosition);
    camera.lookAt(0, 0.95, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Warm studio lighting tailored for Indian wedding attire
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0d6, 1.4);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a064, 1.2);
    rimLight.position.set(-2.5, 3, -2);
    scene.add(rimLight);

    const softFill = new THREE.HemisphereLight(0xffffff, 0x38241c, 0.6);
    scene.add(softFill);

    // Soft grounded contact shadow
    if (showFloorShadow) {
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 128;
      shadowCanvas.height = 128;
      const ctx = shadowCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
        gradient.addColorStop(0, 'rgba(56, 36, 28, 0.45)');
        gradient.addColorStop(0.5, 'rgba(56, 36, 28, 0.18)');
        gradient.addColorStop(1, 'rgba(56, 36, 28, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
      }
      const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
      const shadowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 1.4),
        new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          depthWrite: false,
        })
      );
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = 0.005;
      scene.add(shadowPlane);
    }

    // Try loading realistic GLB if available, otherwise build procedural realistic South Indian human model
    const loader = new GLTFLoader();
    const modelPath = type === 'groom' 
      ? (currentAttire === 'wedding' ? '/models/groom-wedding.glb' : '/models/groom.glb')
      : (currentAttire === 'wedding' ? '/models/bride-wedding.glb' : '/models/bride.glb');

    loader.load(
      modelPath,
      (gltf) => {
        const root = gltf.scene;
        root.scale.set(1, 1, 1);
        root.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
        scene.add(root);
        gltfSceneRef.current = root;
        setIsGLBLoaded(true);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(root);
          mixerRef.current = mixer;
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            animActionsRef.current[clip.name.toLowerCase()] = action;
          });
          const idleAction = animActionsRef.current['idle'] || animActionsRef.current[gltf.animations[0].name.toLowerCase()];
          if (idleAction) idleAction.play();
        }
        onLoaded?.();
      },
      undefined,
      () => {
        // Fallback: build procedural realistic 3D human character
        const rig = buildProceduralCharacter(type, currentAttire);
        scene.add(rig.root);
        rigRef.current = rig;
        onLoaded?.();
      }
    );

    // Interactive subtle mouse tracking
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetRotY = x * 0.35;
    };
    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation render loop
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      // Smooth mouse rotation
      if (interactive) {
        if (gltfSceneRef.current) {
          gltfSceneRef.current.rotation.y = THREE.MathUtils.damp(gltfSceneRef.current.rotation.y, targetRotY, 4, delta);
        } else if (rigRef.current) {
          rigRef.current.root.rotation.y = THREE.MathUtils.damp(rigRef.current.root.rotation.y, targetRotY, 4, delta);
        }
      }

      // Update GLTF mixer if present
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Update procedural skeleton animation
      if (rigRef.current) {
        updateRigAnimation(
          rigRef.current,
          currentAnim,
          type,
          time,
          scrollProgRef.current
        );
      }

      renderer.render(scene, camera);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqIdRef.current);
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type, cameraPosition, interactive, showFloorShadow, onLoaded]);

  // Handle Attire changes on procedural rig
  useEffect(() => {
    if (rigRef.current) {
      updateRigAttire(rigRef.current, type, currentAttire);
    }
  }, [currentAttire, type]);

  return (
    <div 
      ref={mountRef} 
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      {/* Discreet asset status indicator for transparency without clutter */}
      <div className="absolute bottom-2 right-2 text-[10px] text-[#C5A064]/60 tracking-wider font-jost pointer-events-none select-none">
        {isGLBLoaded ? '3D GLTF ACTIVE' : '3D PROCEDURAL RIG ACTIVE'}
      </div>
    </div>
  );
});

Character3D.displayName = 'Character3D';

// Build Realistic South Indian Human Rig
function buildProceduralCharacter(type: CharacterType, attire: AttireType): HumanRig {
  const root = new THREE.Group();
  root.position.y = 0;

  // Realistic human skin and fabric materials
  const skinTone = type === 'groom' ? 0xb57a53 : 0xc78a63;
  const skinMat = new THREE.MeshStandardMaterial({
    color: skinTone,
    roughness: 0.6,
    metalness: 0.05,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.2,
  });

  const rubyMat = new THREE.MeshStandardMaterial({
    color: 0x8b0000,
    metalness: 0.3,
    roughness: 0.3,
  });

  const pearlMat = new THREE.MeshStandardMaterial({
    color: 0xfffaf0,
    metalness: 0.1,
    roughness: 0.25,
  });

  // Clothing Materials based on Attire
  const fabricMat = getFabricMaterial(type, attire);
  const borderMat = new THREE.MeshStandardMaterial({
    color: 0xc5a064,
    metalness: 0.75,
    roughness: 0.3,
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x1a120c,
    roughness: 0.85,
  });

  const jasmineMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
  });

  // Base Root Pivot (ground centered)
  const pelvis = new THREE.Group();
  pelvis.position.y = 0.98; // Pelvis height (~1 meter on 1.75m human)
  root.add(pelvis);

  // Torso / Spine
  const torso = new THREE.Group();
  pelvis.add(torso);

  // Pelvis / Dhoti or Saree Waist Mesh
  const pelvisGeo = new THREE.CylinderGeometry(0.16, 0.15, 0.2, 16);
  const pelvisMesh = new THREE.Mesh(pelvisGeo, fabricMat);
  pelvis.add(pelvisMesh);

  // Vaddanam (Gold Waist Belt) for Bride
  if (type === 'bride') {
    const vaddanam = new THREE.Mesh(
      new THREE.TorusGeometry(0.162, 0.015, 12, 24),
      goldMat
    );
    vaddanam.rotation.x = Math.PI / 2;
    pelvis.add(vaddanam);
  }

  // Chest / Upper Torso
  const chest = new THREE.Group();
  chest.position.y = 0.22;
  torso.add(chest);

  const chestGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.25, 16);
  const chestMesh = new THREE.Mesh(chestGeo, type === 'groom' && attire === 'wedding' ? skinMat : fabricMat);
  chest.add(chestMesh);

  // Groom Angavastram (Ivory Silk Stole draped across shoulder)
  if (type === 'groom') {
    const stoleGeo = new THREE.TorusGeometry(0.22, 0.035, 8, 24, Math.PI * 1.5);
    const stoleMesh = new THREE.Mesh(stoleGeo, borderMat);
    stoleMesh.rotation.z = 0.5;
    chest.add(stoleMesh);

    // Kanthi (Gold Wedding Necklace)
    const groomNecklace = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.01, 8, 20, Math.PI),
      goldMat
    );
    groomNecklace.position.set(0, 0.08, 0.1);
    groomNecklace.rotation.x = 0.5;
    chest.add(groomNecklace);
  }

  // Bride Kasu Mala (South Indian Coin Necklace) & Temple Choker
  if (type === 'bride') {
    const choker = new THREE.Mesh(
      new THREE.TorusGeometry(0.11, 0.015, 8, 24, Math.PI),
      goldMat
    );
    choker.position.set(0, 0.1, 0.1);
    choker.rotation.x = 0.5;
    chest.add(choker);

    const longMala = new THREE.Mesh(
      new THREE.TorusGeometry(0.15, 0.012, 8, 24, Math.PI),
      goldMat
    );
    longMala.position.set(0, 0.02, 0.12);
    longMala.rotation.x = 0.6;
    chest.add(longMala);
  }

  // Neck
  const neck = new THREE.Group();
  neck.position.y = 0.16;
  chest.add(neck);

  const neckGeo = new THREE.CylinderGeometry(0.065, 0.08, 0.1, 16);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neck.add(neckMesh);

  // Head
  const head = new THREE.Group();
  head.position.y = 0.12;
  neck.add(head);

  // Realistic Head Mesh
  const headGeo = new THREE.SphereGeometry(0.11, 20, 20);
  headGeo.scale(1, 1.25, 1.1);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  head.add(headMesh);

  // Hair & Hair Ornaments
  if (type === 'groom') {
    const hairGeo = new THREE.SphereGeometry(0.115, 16, 16);
    hairGeo.scale(1.02, 1.05, 1.05);
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(0, 0.04, -0.02);
    head.add(hairMesh);

    // Traditional Tilakam on Forehead
    const tilak = new THREE.Mesh(
      new THREE.BoxGeometry(0.012, 0.03, 0.005),
      rubyMat
    );
    tilak.position.set(0, 0.05, 0.12);
    head.add(tilak);
  } else {
    // Bride: Elegant Chignon & Traditional Long Braid with Jasmine
    const hairCrown = new THREE.Mesh(
      new THREE.SphereGeometry(0.118, 18, 18),
      hairMat
    );
    hairCrown.position.set(0, 0.03, -0.02);
    head.add(hairCrown);

    // Jasmine Floral Poola Jada (Garland woven along braid)
    const jasmineWreath = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.02, 8, 16),
      jasmineMat
    );
    jasmineWreath.position.set(0, 0.05, -0.08);
    head.add(jasmineWreath);

    // Long Braid down back
    const braidCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.02, -0.1),
      new THREE.Vector3(0, -0.18, -0.12),
      new THREE.Vector3(0, -0.4, -0.1),
    ]);
    const braidGeo = new THREE.TubeGeometry(braidCurve, 12, 0.025, 8, false);
    const braidMesh = new THREE.Mesh(braidGeo, hairMat);
    head.add(braidMesh);

    // Maang Tikka (Forehead gold jewel)
    const tikka = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 8, 8),
      goldMat
    );
    tikka.position.set(0, 0.06, 0.12);
    head.add(tikka);

    // Jhumkas (Earrings)
    [-0.11, 0.11].forEach((xSide) => {
      const jhumka = new THREE.Mesh(
        new THREE.ConeGeometry(0.018, 0.03, 8),
        goldMat
      );
      jhumka.position.set(xSide, -0.02, 0);
      head.add(jhumka);
    });
  }

  // Arms and Hands
  // Left Shoulder & Arm
  const leftShoulder = new THREE.Group();
  leftShoulder.position.set(0.2, 0.1, 0);
  chest.add(leftShoulder);

  const leftUpperArm = new THREE.Group();
  leftShoulder.add(leftUpperArm);
  const upperArmGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.24, 12);
  upperArmGeo.translate(0, -0.12, 0);
  const leftUpperArmMesh = new THREE.Mesh(upperArmGeo, type === 'groom' && attire === 'wedding' ? skinMat : fabricMat);
  leftUpperArm.add(leftUpperArmMesh);

  const leftForearm = new THREE.Group();
  leftForearm.position.y = -0.24;
  leftUpperArm.add(leftForearm);
  const forearmGeo = new THREE.CylinderGeometry(0.038, 0.032, 0.22, 12);
  forearmGeo.translate(0, -0.11, 0);
  const leftForearmMesh = new THREE.Mesh(forearmGeo, skinMat);
  leftForearm.add(leftForearmMesh);

  // Left Hand
  const leftHand = new THREE.Group();
  leftHand.position.y = -0.22;
  leftForearm.add(leftHand);
  const handGeo = new THREE.BoxGeometry(0.04, 0.08, 0.02);
  handGeo.translate(0, -0.04, 0);
  const leftHandMesh = new THREE.Mesh(handGeo, skinMat);
  leftHand.add(leftHandMesh);

  // Right Shoulder & Arm
  const rightShoulder = new THREE.Group();
  rightShoulder.position.set(-0.2, 0.1, 0);
  chest.add(rightShoulder);

  const rightUpperArm = new THREE.Group();
  rightShoulder.add(rightUpperArm);
  const rightUpperArmMesh = new THREE.Mesh(upperArmGeo.clone(), type === 'groom' && attire === 'wedding' ? skinMat : fabricMat);
  rightUpperArm.add(rightUpperArmMesh);

  const rightForearm = new THREE.Group();
  rightForearm.position.y = -0.24;
  rightUpperArm.add(rightForearm);
  const rightForearmMesh = new THREE.Mesh(forearmGeo.clone(), skinMat);
  rightForearm.add(rightForearmMesh);

  // Right Hand
  const rightHand = new THREE.Group();
  rightHand.position.y = -0.22;
  rightForearm.add(rightHand);
  const rightHandMesh = new THREE.Mesh(handGeo.clone(), skinMat);
  rightHand.add(rightHandMesh);

  // Gold Bangles / Kadas on wrists
  [-1, 1].forEach((side) => {
    const bangle = new THREE.Mesh(
      new THREE.TorusGeometry(0.038, 0.008, 8, 16),
      goldMat
    );
    bangle.rotation.x = Math.PI / 2;
    if (side === 1) leftHand.add(bangle);
    else rightHand.add(bangle);
  });

  // Lower Body (Legs & Dhoti / Saree)
  const leftHip = new THREE.Group();
  leftHip.position.set(0.09, -0.1, 0);
  pelvis.add(leftHip);

  const leftThigh = new THREE.Group();
  leftHip.add(leftThigh);

  const rightHip = new THREE.Group();
  rightHip.position.set(-0.09, -0.1, 0);
  pelvis.add(rightHip);

  const rightThigh = new THREE.Group();
  rightHip.add(rightThigh);

  const leftCalf = new THREE.Group();
  leftCalf.position.y = -0.42;
  leftThigh.add(leftCalf);

  const rightCalf = new THREE.Group();
  rightCalf.position.y = -0.42;
  rightThigh.add(rightCalf);

  // South Indian Dhoti / Saree lower drape mesh
  const lowerDrapeGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.88, 18);
  lowerDrapeGeo.translate(0, -0.44, 0);
  const lowerDrapeMesh = new THREE.Mesh(lowerDrapeGeo, fabricMat);
  pelvis.add(lowerDrapeMesh);

  // Traditional Gold Zari Border at bottom of Dhoti/Saree
  const borderRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.242, 0.02, 10, 24),
    borderMat
  );
  borderRing.position.y = -0.87;
  borderRing.rotation.x = Math.PI / 2;
  pelvis.add(borderRing);

  // 3D Wedding Garland (Varmala) Object attached to Chest
  const garlandGroup = new THREE.Group();
  garlandGroup.position.set(0, 0.06, 0.12);
  garlandGroup.visible = false; // toggled on during hold_garland / exchange_garland
  chest.add(garlandGroup);

  // Beautiful Rose & Jasmine garland loop
  const garlandCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.16, 0.08, 0),
    new THREE.Vector3(-0.18, -0.12, 0.1),
    new THREE.Vector3(0, -0.32, 0.14),
    new THREE.Vector3(0.18, -0.12, 0.1),
    new THREE.Vector3(0.16, 0.08, 0),
  ]);
  const garlandGeo = new THREE.TubeGeometry(garlandCurve, 24, 0.028, 8, false);
  const garlandMat = new THREE.MeshStandardMaterial({
    color: 0xc82a38, // Vermilion red roses
    roughness: 0.5,
  });
  const garlandMesh = new THREE.Mesh(garlandGeo, garlandMat);
  garlandGroup.add(garlandMesh);

  // Golden bell pendant at bottom of garland
  const garlandPendant = new THREE.Mesh(
    new THREE.ConeGeometry(0.025, 0.05, 8),
    goldMat
  );
  garlandPendant.position.set(0, -0.35, 0.14);
  garlandPendant.rotation.x = Math.PI;
  garlandGroup.add(garlandPendant);

  return {
    root,
    pelvis,
    torso,
    chest,
    neck,
    head,
    leftShoulder,
    leftUpperArm,
    leftForearm,
    leftHand,
    rightShoulder,
    rightUpperArm,
    rightForearm,
    rightHand,
    leftHip,
    leftThigh,
    leftCalf,
    rightHip,
    rightThigh,
    rightCalf,
    garland: garlandGroup,
    materials: {
      fabric: fabricMat,
      border: borderMat,
      skin: skinMat,
      gold: goldMat,
      ruby: rubyMat,
    }
  };
}

// Generate PBR Material based on character and ceremony attire
function getFabricMaterial(type: CharacterType, attire: AttireType): THREE.MeshStandardMaterial {
  if (attire === 'haldi') {
    // Festive turmeric yellow silk
    return new THREE.MeshStandardMaterial({
      color: 0xf5b014,
      roughness: 0.45,
      metalness: 0.1,
    });
  }

  if (attire === 'dj') {
    // Sangeet / DJ night royal deep tones
    return new THREE.MeshStandardMaterial({
      color: type === 'groom' ? 0x1b2845 : 0x720948,
      roughness: 0.4,
      metalness: 0.2,
    });
  }

  // Traditional South Indian Wedding
  if (type === 'groom') {
    // Cream Kanchipuram silk dhoti
    return new THREE.MeshStandardMaterial({
      color: 0xfff8eb,
      roughness: 0.5,
      metalness: 0.08,
    });
  } else {
    // Traditional rich vermilion red / emerald green bridal silk saree
    return new THREE.MeshStandardMaterial({
      color: 0x941b29,
      roughness: 0.45,
      metalness: 0.15,
    });
  }
}

function updateRigAttire(rig: HumanRig, type: CharacterType, attire: AttireType) {
  const newFabricMat = getFabricMaterial(type, attire);
  rig.materials.fabric.copy(newFabricMat);
}

// Coordinate Skeletal Kinematics & 10 Animation States
function updateRigAnimation(
  rig: HumanRig, 
  anim: AnimationState, 
  type: CharacterType, 
  time: number,
  progress?: number
) {
  const {
    torso, chest, head,
    leftUpperArm, leftForearm,
    rightUpperArm, rightForearm,
    leftThigh, rightThigh,
    garland
  } = rig;

  // Base subtle breathing on all poses
  const breath = Math.sin(time * 2.5) * 0.015;
  chest.position.y = 0.22 + breath;

  // Default neutral reset
  head.rotation.set(0, 0, 0);
  torso.rotation.set(0, 0, 0);

  switch (anim) {
    case 'idle': {
      // Natural idle posture with subtle weight shift
      const sway = Math.sin(time * 1.5) * 0.02;
      torso.rotation.y = sway;
      head.rotation.y = -sway * 0.5;

      // Relaxed arms
      leftUpperArm.rotation.set(0.1, 0, 0.12);
      leftForearm.rotation.set(-0.15, 0, 0);
      rightUpperArm.rotation.set(0.1, 0, -0.12);
      rightForearm.rotation.set(-0.15, 0, 0);

      leftThigh.rotation.set(0, 0, 0);
      rightThigh.rotation.set(0, 0, 0);
      if (garland) garland.visible = false;
      break;
    }

    case 'walk': {
      // Natural 3D walk cycle
      const walkSpeed = 4.5;
      const walkCycle = time * walkSpeed;
      const legStride = Math.sin(walkCycle) * 0.35;
      const armSwing = Math.cos(walkCycle) * 0.35;

      leftThigh.rotation.x = legStride;
      rightThigh.rotation.x = -legStride;

      leftUpperArm.rotation.set(-armSwing, 0, 0.12);
      leftForearm.rotation.set(-0.25, 0, 0);

      rightUpperArm.rotation.set(armSwing, 0, -0.12);
      rightForearm.rotation.set(-0.25, 0, 0);

      // Spine vertical bounce
      rig.pelvis.position.y = 0.98 + Math.abs(Math.sin(walkCycle)) * 0.03;
      torso.rotation.y = Math.sin(walkCycle) * 0.08;
      if (garland) garland.visible = false;
      break;
    }

    case 'namaskaram': {
      // Groom traditional namaskaram (respectful reverence with joined hands)
      // Hands meet at chest level in Anjali Mudra
      const bowT = progress !== undefined ? progress : (0.5 + 0.5 * Math.sin(time * 2));
      const bowAngle = 0.18 * bowT;

      torso.rotation.x = bowAngle;
      head.rotation.x = bowAngle * 0.8;

      // Left arm folded to center
      leftUpperArm.rotation.set(0.7, -0.4, 0.7);
      leftForearm.rotation.set(-1.8, 0.3, 0.4);

      // Right arm folded to center
      rightUpperArm.rotation.set(0.7, 0.4, -0.7);
      rightForearm.rotation.set(-1.8, -0.3, -0.4);

      if (garland) garland.visible = false;
      break;
    }

    case 'namaste': {
      // Bride traditional graceful namaste
      const bowT = progress !== undefined ? progress : (0.5 + 0.5 * Math.sin(time * 2));
      const bowAngle = 0.14 * bowT;

      torso.rotation.x = bowAngle;
      head.rotation.set(bowAngle * 0.6, 0.05 * Math.sin(time * 1.5), 0);

      leftUpperArm.rotation.set(0.65, -0.35, 0.65);
      leftForearm.rotation.set(-1.85, 0.3, 0.4);

      rightUpperArm.rotation.set(0.65, 0.35, -0.65);
      rightForearm.rotation.set(-1.85, -0.3, -0.4);

      if (garland) garland.visible = false;
      break;
    }

    case 'bow': {
      // Respectful deep bow
      const deepBow = 0.28;
      torso.rotation.x = deepBow;
      head.rotation.x = 0.22;

      leftUpperArm.rotation.set(0.6, -0.3, 0.5);
      leftForearm.rotation.set(-1.7, 0.2, 0.3);
      rightUpperArm.rotation.set(0.6, 0.3, -0.5);
      rightForearm.rotation.set(-1.7, -0.2, -0.3);
      break;
    }

    case 'dance': {
      // Upbeat South Indian festive sangeet rhythm
      const beat = time * 5;
      const sway = Math.sin(beat) * 0.15;
      torso.rotation.z = sway;
      torso.rotation.y = Math.cos(beat * 0.5) * 0.18;

      leftUpperArm.rotation.set(0.9 + Math.sin(beat) * 0.3, 0.2, 0.6);
      leftForearm.rotation.set(-1.2 + Math.cos(beat) * 0.4, 0, 0);

      rightUpperArm.rotation.set(0.9 - Math.sin(beat) * 0.3, -0.2, -0.6);
      rightForearm.rotation.set(-1.2 - Math.cos(beat) * 0.4, 0, 0);

      rig.pelvis.position.y = 0.98 + Math.abs(Math.sin(beat)) * 0.04;
      break;
    }

    case 'hold_garland': {
      // Holding floral garland ready for exchange
      leftUpperArm.rotation.set(0.85, -0.2, 0.3);
      leftForearm.rotation.set(-1.3, 0.2, 0);

      rightUpperArm.rotation.set(0.85, 0.2, -0.3);
      rightForearm.rotation.set(-1.3, -0.2, 0);

      if (garland) {
        garland.visible = true;
        garland.position.set(0, 0.08, 0.24);
      }
      break;
    }

    case 'exchange_garland': {
      // Reaching forward to garland partner
      const t = progress !== undefined ? progress : 0.8;
      const reach = THREE.MathUtils.lerp(0.85, 1.25, t);
      leftUpperArm.rotation.set(reach, -0.15, 0.2);
      leftForearm.rotation.set(-0.85, 0.1, 0);

      rightUpperArm.rotation.set(reach, 0.15, -0.2);
      rightForearm.rotation.set(-0.85, -0.1, 0);

      torso.rotation.x = 0.12 * t;

      if (garland) {
        garland.visible = true;
        garland.position.set(0, 0.12, 0.35 * t);
      }
      break;
    }

    case 'celebrate': {
      // Radiant celebration pose
      leftUpperArm.rotation.set(1.4, 0.2, 0.7);
      leftForearm.rotation.set(-0.6, 0.3, 0);

      rightUpperArm.rotation.set(1.4, -0.2, -0.7);
      rightForearm.rotation.set(-0.6, -0.3, 0);

      head.rotation.set(-0.15, 0, 0);
      if (garland) {
        garland.visible = true;
        garland.position.set(0, 0.06, 0.12);
      }
      break;
    }

    case 'wave': {
      // Warm goodbye wave
      rightUpperArm.rotation.set(1.5, -0.2, -0.3);
      rightForearm.rotation.set(-0.7, 0, Math.sin(time * 6) * 0.3);

      leftUpperArm.rotation.set(0.1, 0, 0.12);
      leftForearm.rotation.set(-0.15, 0, 0);

      head.rotation.set(0, 0.08, 0);
      break;
    }
  }
}
