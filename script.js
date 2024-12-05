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
        const offset = document.querySelector('nav').offsetHeight;
        window.scrollTo({
            top: section.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

// ====================================
// 4. Connect Wallet Functionality (Placeholder)
// ====================================

document.getElementById('connect-wallet').addEventListener('click', () => {
    alert('Wallet connection functionality is not available on GitHub Pages.');
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
const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Burger Animation
burger.addEventListener('click', () => {
    burger.classList.toggle('toggle');
});

// ====================================
// 7. AI Chatbot Functionality (Simulated)
// ====================================

const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage !== '') {
        addChatbotMessage('You', userMessage);
        chatbotInput.value = '';
        generateChatbotResponse(userMessage);
    }
}

function addChatbotMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function generateChatbotResponse(userMessage) {
    // Simulated AI response
    const responses = [
        "Quack! Based on my analysis, this project looks promising!",
        "Hmm, the waters seem murky. Proceed with caution!",
        "Our feathers indicate potential for growth!",
        "The crypto pond is calm; might be a good time to dive in!",
        "Watch out for sharks! Risk factors are high!",
        "This could be a golden egg! Let's keep an eye on it!"
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    setTimeout(() => {
        addChatbotMessage('DuckAI', response);
    }, 1000);
}

// ====================================
// 8. AOS Initialization
// ====================================

AOS.init({
    duration: 1000,
    once: true
});
