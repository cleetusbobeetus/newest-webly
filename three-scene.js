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
        const spaceshipCount = 20; // Fewer but more detailed spaceships
        this.spaceships = [];
        this.lasers = [];
        this.explosions = [];
        this.lastLaserTime = 0;

        for (let i = 0; i < spaceshipCount; i++) {
            // Create spaceship geometry (more detailed triangle)
            const spaceshipGeometry = new THREE.BufferGeometry();
            const spaceshipVertices = new Float32Array([
                // Main body
                0, 0.08, 0,      // Nose
                -0.03, -0.04, 0, // Left wing
                0.03, -0.04, 0,  // Right wing
                0, -0.08, 0,     // Tail
                // Engine details
                -0.02, -0.06, 0, // Left engine
                0.02, -0.06, 0   // Right engine
            ]);
            
            const spaceshipIndices = new Uint16Array([
                0, 1, 2,  // Main triangle
                1, 3, 2,  // Body
                1, 4, 3,  // Left engine
                2, 3, 5   // Right engine
            ]);
            
            spaceshipGeometry.setAttribute('position', new THREE.BufferAttribute(spaceshipVertices, 3));
            spaceshipGeometry.setIndex(new THREE.BufferAttribute(spaceshipIndices, 1));

            // Spaceship colors (different teams)
            const color = new THREE.Color();
            const team = Math.random() > 0.5 ? 0 : 1; // Two teams
            if (team === 0) {
                color.setHSL(0.6, 0.8, 0.7); // Blue team
            } else {
                color.setHSL(0.0, 0.8, 0.7); // Red team
            }

            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });

            const spaceship = new THREE.Mesh(spaceshipGeometry, material);
            
            // Random positions
            spaceship.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );

            // Random rotation
            spaceship.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

            // Store spaceship properties
            spaceship.userData = {
                speed: 0.02 + Math.random() * 0.03,
                rotationSpeed: 0.01 + Math.random() * 0.02,
                team: team,
                health: 100,
                lastShot: 0,
                target: null,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                )
            };

            this.spaceships.push(spaceship);
            this.scene.add(spaceship);
        }
    }

    createGeometry() {
        // Create floating geometric shapes
        this.createFloatingShapes();
    }

    createLaser(shooter, target) {
        // Create laser geometry
        const laserGeometry = new THREE.BufferGeometry();
        const laserVertices = new Float32Array([
            0, 0, 0,      // Start point
            0, 0, -0.3    // End point
        ]);
        laserGeometry.setAttribute('position', new THREE.BufferAttribute(laserVertices, 3));

        // Laser color based on team
        const laserColor = new THREE.Color();
        if (shooter.userData.team === 0) {
            laserColor.setHSL(0.6, 1.0, 0.8); // Blue laser
        } else {
            laserColor.setHSL(0.0, 1.0, 0.8); // Red laser
        }

        const laserMaterial = new THREE.LineBasicMaterial({
            color: laserColor,
            transparent: true,
            opacity: 0.9
        });

        const laser = new THREE.Line(laserGeometry, laserMaterial);
        
        // Position laser at shooter
        laser.position.copy(shooter.position);
        
        // Calculate direction to target
        const direction = new THREE.Vector3();
        direction.subVectors(target.position, shooter.position).normalize();
        
        // Point laser at target
        laser.lookAt(target.position);
        
        // Store laser properties
        laser.userData = {
            velocity: direction.multiplyScalar(0.3), // Fast laser speed
            team: shooter.userData.team,
            life: 3.0 // 3 seconds lifetime
        };

        this.lasers.push(laser);
        this.scene.add(laser);
    }

    createExplosion(position, type) {
        // Create explosion geometry
        const explosionGeometry = new THREE.SphereGeometry(0.1, 8, 6);
        
        // Explosion color based on type
        const explosionColor = new THREE.Color();
        if (type === 'spaceship') {
            explosionColor.setHSL(0.1, 1.0, 0.8); // Orange explosion for spaceships
        } else {
            explosionColor.setHSL(0.6, 1.0, 0.8); // Blue explosion for objects
        }

        const explosionMaterial = new THREE.MeshBasicMaterial({
            color: explosionColor,
            transparent: true,
            opacity: 1.0,
            wireframe: true
        });

        const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
        explosion.position.copy(position);
        
        // Store explosion properties
        explosion.userData = {
            life: 1.0, // 1 second lifetime
            type: type
        };

        this.explosions.push(explosion);
        this.scene.add(explosion);
        
        // Create particle burst effect
        this.createExplosionParticles(position, type);
    }

    createExplosionParticles(position, type) {
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.02, 4, 4);
            
            const particleColor = new THREE.Color();
            if (type === 'spaceship') {
                particleColor.setHSL(0.1 + Math.random() * 0.1, 1.0, 0.7); // Orange particles
            } else {
                particleColor.setHSL(0.6 + Math.random() * 0.1, 1.0, 0.7); // Blue particles
            }

            const particleMaterial = new THREE.MeshBasicMaterial({
                color: particleColor,
                transparent: true,
                opacity: 0.8
            });

            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.copy(position);
            
            // Random velocity for particles
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3
            );
            
            particle.userData = {
                velocity: velocity,
                life: 0.8
            };

            this.scene.add(particle);
            
            // Animate particle
            const animateParticle = () => {
                particle.position.add(particle.userData.velocity);
                particle.userData.velocity.multiplyScalar(0.98); // Slow down
                particle.userData.life -= 0.016;
                particle.material.opacity = particle.userData.life;
                
                if (particle.userData.life > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    this.scene.remove(particle);
                }
            };
            
            animateParticle();
        }
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

        // Animate spaceships and handle combat
        if (this.spaceships) {
            this.spaceships.forEach((spaceship, index) => {
                // Move spaceship
                spaceship.position.add(spaceship.userData.velocity);
                
                // Rotate spaceship
                spaceship.rotation.x += spaceship.userData.rotationSpeed;
                spaceship.rotation.y += spaceship.userData.rotationSpeed * 0.7;
                spaceship.rotation.z += spaceship.userData.rotationSpeed * 0.5;
                
                // Find nearest enemy
                let nearestEnemy = null;
                let nearestDistance = Infinity;
                
                this.spaceships.forEach((other, otherIndex) => {
                    if (otherIndex !== index && other.userData.team !== spaceship.userData.team) {
                        const distance = spaceship.position.distanceTo(other.position);
                        if (distance < nearestDistance) {
                            nearestDistance = distance;
                            nearestEnemy = other;
                        }
                    }
                });
                
                spaceship.userData.target = nearestEnemy;
                
                // Shoot at target
                if (nearestEnemy && time - spaceship.userData.lastShot > 1) {
                    this.createLaser(spaceship, nearestEnemy);
                    spaceship.userData.lastShot = time;
                }
                
                // Keep spaceships in bounds
                if (spaceship.position.x > 15) spaceship.position.x = -15;
                if (spaceship.position.x < -15) spaceship.position.x = 15;
                if (spaceship.position.y > 15) spaceship.position.y = -15;
                if (spaceship.position.y < -15) spaceship.position.y = 15;
                if (spaceship.position.z > 15) spaceship.position.z = -15;
                if (spaceship.position.z < -15) spaceship.position.z = 15;
            });
        }
        
        // Animate lasers
        if (this.lasers) {
            for (let i = this.lasers.length - 1; i >= 0; i--) {
                const laser = this.lasers[i];
                laser.position.add(laser.userData.velocity);
                laser.userData.life -= 0.016; // 60fps
                
                let laserHit = false;
                
                // Check for hits with spaceships
                this.spaceships.forEach((spaceship) => {
                    if (spaceship.userData.team !== laser.userData.team) {
                        const distance = laser.position.distanceTo(spaceship.position);
                        if (distance < 0.5) {
                            spaceship.userData.health -= 10;
                            this.createExplosion(spaceship.position, 'spaceship');
                            laserHit = true;
                        }
                    }
                });
                
                // Check for hits with 3D objects
                if (this.floatingShapes && !laserHit) {
                    this.floatingShapes.forEach((shape) => {
                        const distance = laser.position.distanceTo(shape.position);
                        if (distance < 1.0) { // Larger hit radius for objects
                            this.createExplosion(shape.position, 'object');
                            // Make the object flash and shake
                            shape.userData.hit = true;
                            shape.userData.hitTime = time;
                            laserHit = true;
                        }
                    });
                }
                
                if (laserHit) {
                    this.scene.remove(laser);
                    this.lasers.splice(i, 1);
                }
                
                // Remove old lasers
                if (laser.userData.life <= 0) {
                    this.scene.remove(laser);
                    this.lasers.splice(i, 1);
                }
            }
        }

        // Animate floating shapes (slowed down by 75% additional)
        if (this.floatingShapes) {
            this.floatingShapes.forEach((shape, index) => {
                // Normal rotation
                shape.rotation.x += 0.0011 * (index + 1); // 0.0044 / 4 (75% slower)
                shape.rotation.y += 0.0011 * (index + 1); // 0.0044 / 4 (75% slower)
                shape.position.y += Math.sin(time + index) * 0.0002; // 0.0009 / 4 (75% slower)
                
                // Hit effects
                if (shape.userData.hit) {
                    const hitDuration = time - shape.userData.hitTime;
                    if (hitDuration < 0.5) { // Flash for 0.5 seconds
                        // Flash effect
                        const flashIntensity = Math.sin(hitDuration * 20) * 0.5 + 0.5;
                        shape.material.opacity = 0.3 + flashIntensity * 0.7;
                        
                        // Shake effect
                        shape.position.x += (Math.random() - 0.5) * 0.1;
                        shape.position.z += (Math.random() - 0.5) * 0.1;
                        
                        // Scale effect
                        const scale = 1 + Math.sin(hitDuration * 15) * 0.2;
                        shape.scale.setScalar(scale);
                    } else {
                        // Reset after hit
                        shape.userData.hit = false;
                        shape.material.opacity = 0.3;
                        shape.scale.setScalar(1);
                    }
                }
            });
        }
        
        // Animate explosions
        if (this.explosions) {
            for (let i = this.explosions.length - 1; i >= 0; i--) {
                const explosion = this.explosions[i];
                explosion.userData.life -= 0.016; // 60fps
                
                // Scale explosion
                const scale = 1 + (1 - explosion.userData.life) * 3;
                explosion.scale.setScalar(scale);
                
                // Fade explosion
                explosion.material.opacity = explosion.userData.life;
                
                // Remove old explosions
                if (explosion.userData.life <= 0) {
                    this.scene.remove(explosion);
                    this.explosions.splice(i, 1);
                }
            }
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
