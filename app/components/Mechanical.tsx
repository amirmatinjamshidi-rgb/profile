/** @format */

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export default function MechanicalScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const isMobile = window.innerWidth < 768;
    const DPR = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 4, 26);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(DPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const scroll = { value: 0 };
    const glow = { value: 4 };

    const onScroll = () => {
      scroll.value =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      glow.value = 1 + Math.sin(scroll.value * Math.PI * 6) * 0.6;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    scene.add(new THREE.AmbientLight(0x9d00ff, 1.45));
    scene.background = new THREE.Color("#05070c");

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uGlow = glow;
      shader.uniforms.uColorA = { value: new THREE.Color("#00ff88") };
      shader.uniforms.uColorB = { value: new THREE.Color("#9d00ff") };

      shader.vertexShader = `
        varying float vY;
        ${shader.vertexShader}
      `.replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>\nvY = position.y;`
      );

      shader.fragmentShader = `
        uniform float uTime;
        uniform float uGlow;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vY;
        ${shader.fragmentShader}
      `.replace(
        `#include <dithering_fragment>`,
        `
        float noise = sin(vY * 0.35 + uTime * 2.5) * 0.5 + 0.5;
        vec3 color = mix(uColorA, uColorB, noise);
        gl_FragColor.rgb = color * uGlow;
        #include <dithering_fragment>
        `
      );
      material.userData.shader = shader;
    };

    const makeSpiral = (x: number) => {
      const points = [];
      const steps = isMobile ? 25 : 42;
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        points.push(
          new THREE.Vector3(
            Math.cos(t * Math.PI * 4) * 2,
            t * 18,
            Math.sin(t * Math.PI * 4) * 2
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(
        curve,
        isMobile ? 70 : 160,
        isMobile ? 0.04 : 0.05,
        6,
        false
      );
      const mesh = new THREE.Mesh(geometry, material);
      const group = new THREE.Group();
      group.add(mesh);
      group.position.set(x, -9, 0);
      return group;
    };

    const left = makeSpiral(-10);
    const right = makeSpiral(10);
    scene.add(left, right);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      isMobile ? 0.7 : 1.0,
      0.3,
      0.4
    );
    composer.addPass(bloomPass);

    renderer.compile(scene, camera);
    composer.render();

    let raf = 0;
    const animate = () => {
      const t = performance.now() * 0.001;
      left.rotation.y = t * 0.45;
      right.rotation.y = -t * 0.45;
      left.position.y = -9 + Math.sin(t + scroll.value * 5) * 0.7;
      right.position.y = -9 + Math.cos(t + scroll.value * 5) * 0.7;
      const shader = material.userData.shader;
      if (shader) shader.uniforms.uTime.value = t;
      composer.render();
      raf = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.resolution.set(window.innerWidth / 2, window.innerHeight / 2);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);

      renderer.dispose();
      material.dispose();

      if (left.children[0]) {
        (left.children[0] as THREE.Mesh).geometry.dispose();
      }
      if (right.children[0]) {
        (right.children[0] as THREE.Mesh).geometry.dispose();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
