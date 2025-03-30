"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const IronManCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Iron Man head groups
    const ironManHead = new THREE.Group();
    scene.add(ironManHead);

    // Head base (helmet)
    const headGeometry = new THREE.SphereGeometry(
      1,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.8
    );
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc0000, // Iron Man red
      metalness: 0.8,
      roughness: 0.2,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.scale.z = 1.2;
    ironManHead.add(head);

    // Face plate (slightly different material)
    const faceGeometry = new THREE.SphereGeometry(
      1.01,
      32,
      32,
      Math.PI * 0.8,
      Math.PI * 0.4,
      Math.PI * 0.1,
      Math.PI * 0.5
    );
    const faceMaterial = new THREE.MeshStandardMaterial({
      color: 0xdd0000, // Slightly brighter red
      metalness: 0.9,
      roughness: 0.1,
    });
    const face = new THREE.Mesh(faceGeometry, faceMaterial);
    face.position.z = 0.1;
    ironManHead.add(face);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 32, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ccff, // Bright blue glow
      emissive: 0x00ccff,
      emissiveIntensity: 1,
    });

    // Left Eye
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 0.2, 0.85);
    leftEye.scale.set(1, 0.5, 0.2);
    ironManHead.add(leftEye);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 0.2, 0.85);
    rightEye.scale.set(1, 0.5, 0.2);
    ironManHead.add(rightEye);

    // Mouth slit
    const mouthGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.1);
    const mouthMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.3, 0.9);
    ironManHead.add(mouth);

    // Neck/shoulder connection
    const neckGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.4, 32);
    const neckMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc0000,
      metalness: 0.8,
      roughness: 0.2,
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.y = -0.8;
    ironManHead.add(neck);

    // Face details - add some gold accents
    const detailMaterial = new THREE.MeshStandardMaterial({
      color: 0xffcc00, // Gold color
      metalness: 1,
      roughness: 0.2,
    });

    // Forehead detail
    const foreheadGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
    const forehead = new THREE.Mesh(foreheadGeometry, detailMaterial);
    forehead.position.set(0, 0.5, 0.9);
    ironManHead.add(forehead);

    // Cheek details
    const cheekGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);

    const leftCheek = new THREE.Mesh(cheekGeometry, detailMaterial);
    leftCheek.position.set(-0.6, 0, 0.7);
    leftCheek.rotation.y = Math.PI * 0.2;
    ironManHead.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeometry, detailMaterial);
    rightCheek.position.set(0.6, 0, 0.7);
    rightCheek.rotation.y = -Math.PI * 0.2;
    ironManHead.add(rightCheek);

    // Position the head and camera
    ironManHead.position.set(0, 0, 0);
    camera.position.z = 5;

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;

      targetRotationY = mouseX * 0.2;
      targetRotationX = -mouseY * 0.2;
    };

    document.addEventListener("mousemove", onDocumentMouseMove);

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smoothly interpolate toward target rotation
      ironManHead.rotation.y +=
        (targetRotationY - ironManHead.rotation.y) * 0.05;
      ironManHead.rotation.x +=
        (targetRotationX - ironManHead.rotation.x) * 0.05;

      // Add subtle floating animation
      ironManHead.position.y = Math.sin(Date.now() * 0.001) * 0.1;

      // Animate eye glow
      const pulseIntensity = (Math.sin(Date.now() * 0.003) + 1) * 0.5 + 0.5;
      eyeMaterial.emissiveIntensity = pulseIntensity;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);

      // Clean up Three.js resources
      scene.traverse((object: any) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material: any) => material.dispose());
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-800">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default IronManCanvas;
