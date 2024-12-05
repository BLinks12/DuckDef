// ====================================
// 1. PumpFun Crypto Analyzer with DonaldAI Enhancements
// ====================================

// Elements
const linkForm = document.getElementById('link-form');
const pumpfunLinkInput = document.getElementById('pumpfun-link');
const consoleOutput = document.getElementById('console-output');
const visualizationContainer = document.getElementById('visualization-container');
const neuralCanvas = document.getElementById('neural-network-canvas');
const progressBar = document.getElementById('progress-bar');
const progressSteps = document.querySelectorAll('.step');
const downloadContainer = document.getElementById('download-container');
const errorMessage = document.getElementById('error-message');
const analysisReport = document.getElementById('analysis-report');

// Chart instances
let roiChart, riskChart;

// DonaldAI Analysis Template
function createDetailedAnalysis(link) {
    const riskScore = (Math.random() * 100).toFixed(2);
    const predictedROI = (Math.random() * 200 - 50).toFixed(2);
    const confidenceInterval = (Math.random() * 10 + 90).toFixed(2);

    const projectName = extractProjectName(link);

    return {
        text: `
🦆 **DonaldAI's Quacktastic Analysis Report** 🦆

🐤 **Project:** ${projectName}
🐤 **Risk Score:** ${riskScore}/100
💰 **Predicted ROI:** ${predictedROI}%
🔒 **Confidence Level:** ${confidenceInterval}%

🦆 **Key Findings:**
1. **Market Volatility:** ${riskScore > 50 ? 'High 🌀' : 'Low 🌊'} affecting potential returns.
2. **Sentiment Analysis:** ${predictedROI > 0 ? 'Positive 📈' : 'Negative 📉'} outlook.
3. **Algorithm Confidence:** ${confidenceInterval}% confidence in these results.

🦆 **Recommendations:**
${riskScore > 50 ? 'Proceed with caution. Swim carefully in these waters. 🦆' : 'The waters are calm. This could be a golden egg! 🥚'}

*This report was lovingly crafted by DonaldAI's AI feathers and webbed feet.*
        `,
        data: {
            roi: predictedROI,
            risk: riskScore
        }
    };
}

// Function to extract project name from the link
function extractProjectName(link) {
    try {
        const url = new URL(link);
        return url.pathname.replace('/', '') || 'Unknown Project';
    } catch {
        return 'Unknown Project';
    }
}

// Event Listener for Form Submission
linkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const link = pumpfunLinkInput.value.trim();
    if (link === '') {
        displayError('Please enter a PumpFun link.');
        return;
    }
    if (!validatePumpFunLink(link)) {
        displayError('Invalid PumpFun link. Please enter a valid link from https://pump.fun/.');
        return;
    }
    errorMessage.classList.add('hidden');
    startAnalysis(link);
});

// Function to display error messages
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Function to validate that the link is a PumpFun link
function validatePumpFunLink(link) {
    try {
        const url = new URL(link);
        return url.hostname === 'pump.fun' || url.hostname.endsWith('.pump.fun');
    } catch (e) {
        return false;
    }
}

// Start Analysis Function
function startAnalysis(link) {
    consoleOutput.innerHTML = '';
    visualizationContainer.classList.remove('hidden');
    analysisReport.classList.add('hidden');
    animateNeuralNetwork();
    animateProgressBar();
    downloadContainer.innerHTML = ''; // Clear previous download button

    const loadingMessages = [
        `🌐 Connecting to PumpFun pond...`,
        `🦆 DonaldAI is waddling through ${link}...`,
        `🔍 Diving deep into the data lake...`,
        `💡 Analyzing with AI quacks and neural networks...`,
        `📝 Preparing your quacktastic report...`
    ];

    function displayNextMessage(i) {
        if (i < loadingMessages.length) {
            updateProgressStep(i);
            displayConsoleMessage(loadingMessages[i] + '\n', () => {
                displayNextMessage(i + 1);
            });
        } else {
            setTimeout(() => {
                generateAnalysis(link);
            }, 1000);
        }
    }

    displayNextMessage(0);
}

// Function to update progress steps
function updateProgressStep(index) {
    progressSteps.forEach((step, i) => {
        if (i <= index) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
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
function generateAnalysis(link) {
    consoleOutput.innerHTML += '\n🦆 **Analysis Complete! 🦆**\n';
    const analysis = createDetailedAnalysis(link);
    consoleOutput.innerHTML += analysis.text + '\n';

    // Stop animations
    stopNeuralNetworkAnimation();
    stopProgressBar();

    // Show analysis report with charts
    displayAnalysisReport(analysis);

    // Create a download button for the analysis
    const downloadBtn = document.createElement('button');
    downloadBtn.id = 'download-btn';
    downloadBtn.textContent = 'Download Your Donaldport';
    downloadBtn.addEventListener('click', () => {
        downloadAnalysis(analysis.text);
    });
    downloadContainer.appendChild(downloadBtn);
}

// Function to display the analysis report with charts
function displayAnalysisReport(analysis) {
    analysisReport.classList.remove('hidden');
    document.getElementById('analysis-text').textContent = analysis.text;

    // Prepare data for ROI Chart
    const roiCtx = document.getElementById('roi-chart').getContext('2d');
    roiChart = new Chart(roiCtx, {
        type: 'bar',
        data: {
            labels: ['Predicted ROI (%)'],
            datasets: [{
                label: 'ROI',
                data: [analysis.data.roi],
                backgroundColor: ['#ff9800'],
                borderColor: ['#e68900'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Predicted Return on Investment'
                }
            }
        }
    });

    // Prepare data for Risk Chart
    const riskCtx = document.getElementById('risk-chart').getContext('2d');
    riskChart = new Chart(riskCtx, {
        type: 'doughnut',
        data: {
            labels: ['Risk Score', 'Remaining'],
            datasets: [{
                data: [analysis.data.risk, 100 - analysis.data.risk],
                backgroundColor: ['#d32f2f', '#b0bec5'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Risk Assessment'
                }
            }
        }
    });
}

// Download Analysis Function
function downloadAnalysis(analysisText) {
    const blob = new Blob([analysisText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'DonaldAI_Analysis.txt';
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
// 4. Initialize Particles.js for Background
// ====================================

particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js config loaded');
});
