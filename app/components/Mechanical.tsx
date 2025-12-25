/** @format */

"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

class LightEmitterCurve extends THREE.Curve<THREE.Vector3> {
  radius: number;
  turns: number;
  height: number;
  constructor(radius: number, turns: number, height: number) {
    super();
    this.radius = radius;
    this.height = height;
    this.turns = turns;
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    return optionalTarget.setFromCylindricalCoords(
      this.radius,
      -Math.PI * 2 * this.turns * t,
      this.height * t
    );
  }
}

class LightEmitters extends THREE.Object3D {
  strands: THREE.Mesh[] = [];
  constructor(
    gu: any,
    count: number,
    maxR: number,
    height: number,
    turns: number,
    color: number
  ) {
    super();
    const gsBall: THREE.BufferGeometry[] = [];
    const start = maxR / 4;
    const step = (maxR * 0.9 - start) / (count - 1);
    const mEmitters = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: new THREE.Color(color),
    });

    mEmitters.onBeforeCompile = (shader) => {
      shader.uniforms.globalBloom = gu.globalBloom;
      shader.fragmentShader =
        `uniform float globalBloom; ${shader.fragmentShader}`.replace(
          `#include <dithering_fragment>`,
          `gl_FragColor.rgb = mix(vec3(0.01), gl_FragColor.rgb, globalBloom);
        #include <dithering_fragment>`
        );
    };

    for (let i = 0; i < count; i++) {
      const shift = start + step * i;
      const gBall = new THREE.SphereGeometry(
        0.04,
        24,
        12,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.5
      );
      gBall.translate(0, 0, shift);
      gsBall.push(gBall);
      const curve = new LightEmitterCurve(shift, turns, height);
      const gTube = new THREE.TubeGeometry(curve, 160, 0.012, 8);
      const mesh = new THREE.Mesh(gTube, mEmitters);
      this.add(mesh);
      this.strands.push(mesh);
    }
    const mBase = new THREE.MeshLambertMaterial({ color: 0x050505 });
    this.add(new THREE.Mesh(mergeGeometries(gsBall), mBase));
  }
}

export default function MechanicalScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const gu = { globalBloom: { value: 1 } };
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const createDevice = (xPos: number, color: number) => {
      const group = new THREE.Group();
      const emitters = new LightEmitters(gu, 20, 2.0, 22, 1.8, color);
      const core = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 0.2, 32),
        new THREE.MeshLambertMaterial({ color: 0x000000 })
      );
      group.add(core, emitters);
      group.position.set(xPos, -7, 0);
      return { group, emitters };
    };

    const leftDevice = createDevice(-12, 0x00ff88);
    const rightDevice = createDevice(12, 0x9d00ff);
    scene.add(leftDevice.group, rightDevice.group);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        2.2,
        0.4,
        0.8
      )
    );

    let animationFrameId: number;
    const animate = () => {
      const t = performance.now() * 0.0009;
      leftDevice.group.rotation.y = t * 0.4;
      leftDevice.emitters.strands.forEach(
        (s, i) => (s.rotation.y = t * (0.5 + i * 0.02))
      );
      rightDevice.group.rotation.y = -t * 0.4;
      rightDevice.emitters.strands.forEach(
        (s, i) => (s.rotation.y = -t * (0.5 + i * 0.02))
      );
      leftDevice.group.position.y = -7 + Math.sin(t) * 0.4;
      rightDevice.group.position.y = -7 + Math.cos(t) * 0.4;
      composer.render();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none bg-transparent"
    />
  );
}
