// ====================================
// 1. PumpFun Crypto Analyzer with Ducky Enhancements
// ====================================

// Elements
const linkForm = document.getElementById('link-form');
const pumpfunLinkInput = document.getElementById('pumpfun-link');
const consoleOutput = document.getElementById('console-output');
const visualizationContainer = document.getElementById('visualization-container');
const neuralCanvas = document.getElementById('neural-network-canvas');
const progressBar = document.getElementById('progress-bar');
const chatbotContainer = document.getElementById('chatbot-container');
const downloadContainer = document.getElementById('download-container');

// Ducky Analysis Template
function createDetailedAnalysis() {
    const riskScore = (Math.random() * 100).toFixed(2);
    const predictedROI = (Math.random() * 200 - 50).toFixed(2);
    const confidenceInterval = (Math.random() * 10 + 90).toFixed(2);

    return `
🦆 DuckAI's Quacktastic Analysis Report 🦆

🐤 Risk Score: ${riskScore}/100
💰 Predicted ROI: ${predictedROI}%
🔒 Confidence Level: ${confidenceInterval}%

🦆 **Key Findings:**
1. Market volatility is ${riskScore > 50 ? 'high 🌀' : 'low 🌊'}, affecting potential returns.
2. Sentiment analysis indicates a ${predictedROI > 0 ? 'positive 📈' : 'negative 📉'} outlook.
3. DuckAI's algorithms quack a ${confidenceInterval}% confidence in these results.

🦆 **Recommendations:**
${riskScore > 50 ? 'Proceed with caution. Swim carefully in these waters. 🦆' : 'The waters are calm. This could be a golden egg! 🥚'}

*This report was lovingly crafted by DuckAI's AI feathers and webbed feet.*
`;
}

// Event Listener for Form Submission
linkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const link = pumpfunLinkInput.value.trim();
    if (link === '') {
        alert('Please enter a PumpFun link.');
        return;
    }
    startAnalysis(link);
});

// Start Analysis Function
function startAnalysis(link) {
    consoleOutput.innerHTML = '';
    visualizationContainer.classList.remove('hidden');
    animateNeuralNetwork();
    animateProgressBar();
    chatbotContainer.classList.add('hidden');
    downloadContainer.innerHTML = ''; // Clear previous download button

    const loadingMessages = [
        `🌐 Connecting to PumpFun pond...`,
        `🦆 DuckAI is waddling through ${link}...`,
        `🔍 Diving deep into the data lake...`,
        `💡 Analyzing with AI quacks and neural networks...`,
        `📝 Preparing your quacktastic report...`
    ];

    function displayNextMessage(i) {
        if (i < loadingMessages.length) {
            displayConsoleMessage(loadingMessages[i] + '\n', () => {
                displayNextMessage(i + 1);
            });
        } else {
            setTimeout(() => {
                generateAnalysis();
            }, 1000);
        }
    }

    displayNextMessage(0);
}

// Typing Effect for Console Messages
function displayConsoleMessage(message, callback) {
    let index = 0;
    const interval = setInterval(() => {
        consoleOutput.innerHTML += message.charAt(index);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        index++;
        if (index === message.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 50);
}

// Generate Analysis Function
function generateAnalysis() {
    consoleOutput.innerHTML += '\n🦆 Analysis complete! 🦆\n';
    const analysis = createDetailedAnalysis();
    consoleOutput.innerHTML += analysis + '\n';

    // Stop animations
    stopNeuralNetworkAnimation();
    stopProgressBar();

    // Create a download button for the analysis
    const downloadBtn = document.createElement('button');
    downloadBtn.id = 'download-btn';
    downloadBtn.textContent = 'Download Your Duckport';
    downloadBtn.addEventListener('click', () => {
        downloadAnalysis(analysis);
    });
    downloadContainer.appendChild(downloadBtn);

    // Show chatbot
    chatbotContainer.classList.remove('hidden');
}

// Download Analysis Function
function downloadAnalysis(analysisText) {
    const blob = new Blob([analysisText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'DuckAI_Analysis.txt';
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

// ====================================
// 2. Neural Network Animation
// ====================================

let neuralCtx = neuralCanvas.getContext('2d');
let neuralWidth, neuralHeight;
let nodes = [];
let neuralAnimationFrame;

function resizeNeuralCanvas() {
    neuralWidth = neuralCanvas.width = neuralCanvas.clientWidth;
    neuralHeight = neuralCanvas.height = neuralCanvas.clientHeight;
}
window.addEventListener('resize', resizeNeuralCanvas);
resizeNeuralCanvas();

function createNeuralNetworkNodes() {
    nodes = [];
    const nodeCount = 50;
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * neuralWidth,
            y: Math.random() * neuralHeight,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            size: Math.random() * 2 + 1
        });
    }
}

function animateNeuralNetwork() {
    createNeuralNetworkNodes();
    function drawNeuralNetwork() {
        neuralCtx.clearRect(0, 0, neuralWidth, neuralHeight);
        neuralCtx.fillStyle = '#ff9800';

        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Wrap around edges
            if (node.x < 0) node.x = neuralWidth;
            if (node.x > neuralWidth) node.x = 0;
            if (node.y < 0) node.y = neuralHeight;
            if (node.y > neuralHeight) node.y = 0;

            neuralCtx.beginPath();
            neuralCtx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            neuralCtx.fill();
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    neuralCtx.strokeStyle = `rgba(255, 152, 0, ${1 - distance / 100})`;
                    neuralCtx.beginPath();
                    neuralCtx.moveTo(nodes[i].x, nodes[i].y);
                    neuralCtx.lineTo(nodes[j].x, nodes[j].y);
                    neuralCtx.stroke();
                }
            }
        }

        neuralAnimationFrame = requestAnimationFrame(drawNeuralNetwork);
    }
    neuralAnimationFrame = requestAnimationFrame(drawNeuralNetwork);
}

function stopNeuralNetworkAnimation() {
    cancelAnimationFrame(neuralAnimationFrame);
}

// ====================================
// 3. Progress Bar Animation
// ====================================

let progress = 0;
let progressInterval;

function animateProgressBar() {
    progress = 0;
    progressBar.style.width = '0%';
    progressInterval = setInterval(() => {
        if (progress < 100) {
            progress += Math.random() * 5;
            progressBar.style.width = progress + '%';
        } else {
            clearInterval(progressInterval);
        }
    }, 200);
}

function stopProgressBar() {
    clearInterval(progressInterval);
    progressBar.style.width = '100%';
}

// ====================================
// 4. Chatbot Functionality
// ====================================

const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

chatbotInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const userMessage = this.value.trim();
        if (userMessage !== '') {
            addChatbotMessage('You', userMessage);
            this.value = '';
            generateChatbotResponse(userMessage);
        }
    }
});

function addChatbotMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function generateChatbotResponse(userMessage) {
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
