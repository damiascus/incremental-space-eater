"use client"; // Ensure this runs only on the client side

import { useEffect } from "react";
import * as THREE from "three";

const ThreeScene = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create a gravitational lens effect using a shader
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv - 0.5;
          float lensEffect = 1.0 / length(uv) * 0.05;
          gl_FragColor = vec4(vec3(lensEffect), 1.0);
        }
      `,
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null;
};

export default ThreeScene;
