// Initialize AOS Library
AOS.init();

// ====================================
// 1. Three.js Hero Background Animation
// ====================================

const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Add Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffcc00, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Create Particles
const particlesCount = 5000;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffcc00,
    size: 1,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// ====================================
// 2. Tokenomics Chart
// ====================================

const ctx = document.getElementById('tokenomics-chart').getContext('2d');
const tokenomicsChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Liquidity Pool', 'Marketing', 'Development', 'Community Rewards', 'Team'],
        datasets: [{
            data: [50, 20, 15, 10, 5],
            backgroundColor: [
                '#ffcc00',
                '#e6b800',
                '#cccc00',
                '#b3a800',
                '#999900'
            ],
            borderColor: '#151515',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff',
                    font: {
                        size: 14
                    }
                }
            }
        }
    }
});

// ====================================
// 3. Smooth Scrolling for Navigation Links
// ====================================

document.querySelectorAll('nav .nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// ====================================
// 4. Connect Wallet Functionality (Placeholder)
// ====================================

document.getElementById('connect-wallet').addEventListener('click', () => {
    alert('Wallet connection functionality coming soon!');
});

// ====================================
// 5. Buy Now Buttons Functionality
// ====================================

document.querySelectorAll('#buy-now, #buy-now-2').forEach(button => {
    button.addEventListener('click', () => {
        alert('Redirecting to the exchange platform to buy $DUCKY!');
    });
});

// ====================================
// 6. Responsive Navigation Menu (For Mobile)
// ====================================

const nav = document.querySelector('nav');
const navLinks = document.querySelector('nav .nav-links');
const burger = document.createElement('div');
burger.classList.add('burger');
burger.innerHTML = '<div></div><div></div><div></div>';
nav.appendChild(burger);

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Add styles for mobile menu via JavaScript (since CSS is static)
const style = document.createElement('style');
style.innerHTML = `
    .burger {
        display: none;
        cursor: pointer;
    }
    .burger div {
        width: 25px;
        height: 3px;
        background-color: #ffffff;
        margin: 5px;
        transition: all 0.3s ease;
    }
    @media (max-width: 768px) {
        .burger {
            display: block;
        }
        .nav-links {
            position: absolute;
            right: 0;
            height: 100vh;
            top: 0;
            background-color: #151515;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 50%;
            transform: translateX(100%);
            transition: transform 0.5s ease-in;
        }
        .nav-links li {
            opacity: 0;
        }
        .nav-links.nav-active {
            transform: translateX(0%);
        }
        .nav-links.nav-active li {
            opacity: 1;
        }
        .toggle div:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .toggle div:nth-child(2) {
            opacity: 0;
        }
        .toggle div:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// ====================================
// 7. Load Event for Preloader (Optional)
// ====================================

window.addEventListener('load', () => {
    // Hide preloader if implemented
});

