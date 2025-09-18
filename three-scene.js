// Advanced 3D WebGL Scene with Three.js
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded, skipping 3D scene');
            return;
        }

        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createParticles();
        this.createGeometry();
        this.setupEventListeners();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x020617);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    createRenderer() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createParticles() {
        const particleCount = 300; // More particles for triangles
        this.triangleParticles = [];

        for (let i = 0; i < particleCount; i++) {
            // Create triangle geometry
            const triangleGeometry = new THREE.BufferGeometry();
            const triangleVertices = new Float32Array([
                0, 0.1, 0,      // Top vertex
                -0.05, -0.05, 0, // Bottom left
                0.05, -0.05, 0   // Bottom right
            ]);
            triangleGeometry.setAttribute('position', new THREE.BufferAttribute(triangleVertices, 3));

            // Random colors
            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.7);

            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.6
            });

            const triangle = new THREE.Mesh(triangleGeometry, material);
            
            // Random positions
            triangle.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );

            // Random rotation
            triangle.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

            // Store animation properties
            triangle.userData = {
                speed: 0.01 + Math.random() * 0.02, // Faster speed
                rotationSpeed: 0.02 + Math.random() * 0.03, // Faster rotation
                floatSpeed: 0.005 + Math.random() * 0.01, // Faster floating
                originalY: triangle.position.y
            };

            this.triangleParticles.push(triangle);
            this.scene.add(triangle);
        }
    }

    createGeometry() {
        // Create floating geometric shapes
        this.createFloatingShapes();
    }

    createFloatingShapes() {
        const shapes = [];
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.ConeGeometry(0.3, 0.8, 8),
            new THREE.TorusGeometry(0.3, 0.1, 8, 16)
        ];

        geometries.forEach((geometry, index) => {
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6 + index * 0.1, 0.8, 0.6),
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            shapes.push(mesh);
            this.scene.add(mesh);
        });

        this.floatingShapes = shapes;
    }


    setupEventListeners() {
        // Mouse movement
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize
        window.addEventListener('resize', () => {
            if (this.camera && this.renderer) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
    }

    animate() {
        if (!this.scene || !this.camera || !this.renderer) return;

        this.animationId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Animate triangle particles (faster paced)
        if (this.triangleParticles) {
            this.triangleParticles.forEach((triangle, index) => {
                // Fast rotation
                triangle.rotation.x += triangle.userData.rotationSpeed;
                triangle.rotation.y += triangle.userData.rotationSpeed * 0.7;
                triangle.rotation.z += triangle.userData.rotationSpeed * 0.5;
                
                // Fast floating movement
                triangle.position.y = triangle.userData.originalY + Math.sin(time * 2 + index) * 0.5;
                
                // Fast position drift
                triangle.position.x += Math.sin(time + index) * triangle.userData.speed;
                triangle.position.z += Math.cos(time + index) * triangle.userData.speed;
                
                // Reset position if it goes too far
                if (triangle.position.x > 15) triangle.position.x = -15;
                if (triangle.position.x < -15) triangle.position.x = 15;
                if (triangle.position.z > 15) triangle.position.z = -15;
                if (triangle.position.z < -15) triangle.position.z = 15;
            });
        }

        // Animate floating shapes (slowed down by 75% additional)
        if (this.floatingShapes) {
            this.floatingShapes.forEach((shape, index) => {
                shape.rotation.x += 0.0011 * (index + 1); // 0.0044 / 4 (75% slower)
                shape.rotation.y += 0.0011 * (index + 1); // 0.0044 / 4 (75% slower)
                shape.position.y += Math.sin(time + index) * 0.0002; // 0.0009 / 4 (75% slower)
            });
        }


        // Camera movement based on mouse
        if (this.camera) {
            this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
            this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
        }

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize 3D scene when Three.js is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
    const checkThreeJS = setInterval(() => {
        if (typeof THREE !== 'undefined') {
            clearInterval(checkThreeJS);
            new ThreeScene();
        }
    }, 100);
});
