import { Scene } from "phaser";
import * as THREE from "three";

export default class ThreeTest extends Scene {
    private threeCanvas!: HTMLCanvasElement;
    private threeRenderer!: THREE.WebGLRenderer;
    private threeScene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private planetGeometry!: THREE.SphereGeometry;
    private planetMaterial!: THREE.MeshStandardMaterial;
    private planet!: THREE.Mesh;
    private objects: Phaser.GameObjects.Arc[] = [];
    private planetSize: number = 1; // Default planet size
    private directionalLight!: THREE.DirectionalLight;

    constructor() {
        super({ key: "ThreeTest" });
    }

    create() {
        // === Phaser Objects ===
        this.objects.push(this.add.circle(300, 300, 10, 0xff0000));

        // === Initialize Three.js ===
        this.initThreeJS();
    }

    private initThreeJS() {
        // Create Three.js Renderer
        this.threeCanvas = document.createElement("canvas");
        document.body.appendChild(this.threeCanvas);
        this.threeRenderer = new THREE.WebGLRenderer({
            canvas: this.threeCanvas,
            alpha: true,
        });
        this.threeRenderer.setSize(window.innerWidth, window.innerHeight);

        // Create Three.js Scene
        this.threeScene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // === Space Background (Starry Skybox) ===
        const loader = new THREE.CubeTextureLoader();
        this.threeScene.background = loader.load([
            "https://threejs.org/examples/textures/cube/space/px.jpg", // Right
            "https://threejs.org/examples/textures/cube/space/nx.jpg", // Left
            "https://threejs.org/examples/textures/cube/space/py.jpg", // Top
            "https://threejs.org/examples/textures/cube/space/ny.jpg", // Bottom
            "https://threejs.org/examples/textures/cube/space/pz.jpg", // Front
            "https://threejs.org/examples/textures/cube/space/nz.jpg", // Back
        ]);

        // === Lighting ===
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        this.directionalLight.position.set(5, 5, 10);
        this.threeScene.add(this.directionalLight);

        const ambientLight = new THREE.AmbientLight(0x222222);
        this.threeScene.add(ambientLight);

        // === Starfield ===
        const starGeometry = new THREE.BufferGeometry();
        const starVertices = [];

        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(starVertices, 3)
        );

        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
        const stars = new THREE.Points(starGeometry, starMaterial);

        this.threeScene.add(stars);

        // === Create 3D Planet ===
        this.planetMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
        });
        this.createThreeJSPlanet();
    }

    private createThreeJSPlanet() {
        if (this.planet) {
            this.threeScene.remove(this.planet); // Remove old planet before creating a new one
        }

        this.planetGeometry = new THREE.SphereGeometry(this.planetSize, 32, 32);
        this.planet = new THREE.Mesh(this.planetGeometry, this.planetMaterial);
        this.threeScene.add(this.planet);
    }

    update() {
        // === Update Phaser Objects ===
        this.objects.forEach((obj, index) => {
            // Pull objects toward the planet (basic gravity simulation)
            const dx = 400 - obj.x;
            const dy = 300 - obj.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                obj.x += dx * 0.01;
                obj.y += dy * 0.01;
                obj.scale += 0.02;
            }

            // If object is close, "absorb" it
            if (distance < this.planetSize * 2) {
                obj.destroy();
                this.objects.splice(index, 1); // Remove from array
                this.planetSize += 0.1; // Increase planet size
                this.createThreeJSPlanet(); // Update Three.js
            }
        });

        // === Rotate the Planet Slightly for 3D Effect ===
        if (this.planet) {
            this.planet.rotation.y += 0.01;
        }

        // === Render Three.js Scene ===
        this.threeRenderer.render(this.threeScene, this.camera);
    }
}
