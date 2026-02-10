// DOM Elements
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const heartsContainer = document.getElementById('hearts');
const heartsBurst = document.getElementById('hearts-burst');

// Track how many times they tried to click No
let noAttempts = 0;
const yesMessages = [
    "Yes! 💖",
    "Yes!! 💕",
    "YES!!! 🥰",
    "YESSS!!!! 💗",
    "SAY YESSSS 💘",
    "PLEASE YES 🥺💖",
    "PRETTY PLEASE 💝",
    "I'M BEGGING 😭💕"
];

// Create floating hearts background
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🩷', '🤍'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (4 + Math.random() * 4) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.fontSize = (15 + Math.random() * 20) + 'px';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => heart.remove(), 10000);
        }, i * 300);
    }
}

// Continuously create hearts
function startFloatingHearts() {
    createFloatingHearts();
    setInterval(createFloatingHearts, 5000);
}

// Get random position for the No button to run away to
function getRandomPosition() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    // Get viewport dimensions with padding
    const padding = 100;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    // Random position anywhere on screen
    const randomX = padding + Math.random() * (maxX - padding);
    const randomY = padding + Math.random() * (maxY - padding);
    
    return { x: randomX, y: randomY };
}

// Make the No button run away!
function runAway() {
    noAttempts++;
    
    // Make Yes button grow and update text
    if (noAttempts < yesMessages.length) {
        yesBtn.textContent = yesMessages[noAttempts];
        yesBtn.classList.add('growing');
        yesBtn.style.transform = `scale(${1 + noAttempts * 0.1})`;
        setTimeout(() => yesBtn.classList.remove('growing'), 300);
    }
    
    // Make No button smaller
    const newScale = Math.max(0.5, 1 - noAttempts * 0.1);
    
    // Get new random position
    const pos = getRandomPosition();
    
    // Apply new position - make it fixed so it can go anywhere
    noBtn.style.position = 'fixed';
    noBtn.style.left = pos.x + 'px';
    noBtn.style.top = pos.y + 'px';
    noBtn.style.transform = `scale(${newScale})`;
    
    // Change No button text to be more desperate
    const noTexts = [
        "No 💔", "Nope 😢", "Still no? 🥺", 
        "Why?! 😭", "Catch me! 🏃", "Too slow! 😜",
        "Can't touch this! 💃", "Giving up? 😏"
    ];
    noBtn.textContent = noTexts[Math.min(noAttempts, noTexts.length - 1)];
    
    // Add a little shake effect
    noBtn.style.animation = 'none';
    noBtn.offsetHeight; // Trigger reflow
    noBtn.style.animation = 'shake 0.3s ease';
}

// Handle Yes button click
function sayYes() {
    // Hide question, show success
    questionContainer.style.display = 'none';
    successContainer.style.display = 'block';
    
    // Create heart burst celebration!
    createHeartBurst();
    
    // Play more heart bursts
    setTimeout(createHeartBurst, 500);
    setTimeout(createHeartBurst, 1000);
}

// Create heart burst celebration effect
function createHeartBurst() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🥰', '😍', '💐', '🌹'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random direction
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.animationDelay = Math.random() * 0.3 + 's';
        
        heartsBurst.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => heart.remove(), 1500);
    }
}

// Event Listeners
yesBtn.addEventListener('click', sayYes);

// Multiple ways to trigger run away for the No button
noBtn.addEventListener('mouseenter', runAway);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    runAway();
});
noBtn.addEventListener('focus', runAway);

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0); }
        25% { transform: translateX(-5px) rotate(-5deg); }
        75% { transform: translateX(5px) rotate(5deg); }
    }
`;
document.head.appendChild(style);

// Start the magic!
startFloatingHearts();

// Add some sparkle to the cursor
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            font-size: 20px;
            z-index: 1000;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
});

// Add sparkle fade animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-fade {
        0% { opacity: 1; transform: scale(1) translateY(0); }
        100% { opacity: 0; transform: scale(0.5) translateY(-30px); }
    }
`;
document.head.appendChild(sparkleStyle);

console.log('💕 Good luck! Sarah will definitely say yes! 💕');
