// 1. Data Library
const HISTORICAL_EVENTS = [
    { id: 1, title: "FALL OF ROME", year: 476, category: "Ancient", keyFigure: "Romulus Augustulus", isPerson: false, clue: "The fall of this major empire in 476 A.D. marked the official end of ancient dominance in the West." },
    { id: 2, title: "JOSEPH STALIN", year: 1953, category: "Modern", keyFigure: "Joseph Stalin", isPerson: true, clue: "This leader served as the General Secretary of the Communist Party and ruler of the Soviet Union." },
    { id: 3, title: "BATTLE OF WATERLOO", year: 1815, category: "Modern", keyFigure: "Napoleon Bonaparte", isPerson: false, clue: "The decisive 1815 battle that brought an end to an era of European conquest." }
];

let SECRET_EVENT = null;
let IS_ENDLESS = false;
let guessCount = 0;

// Use DOMContentLoaded to ensure elements exist before script runs
document.addEventListener("DOMContentLoaded", () => {
    initGame();
});

function initGame() {
    setDailyEvent();
}

function updateHintText(text) {
    const hintElement = document.getElementById("hint-text");
    if (hintElement) {
        hintElement.innerText = text;
    } else {
        console.error("Error: Element #hint-text not found in your HTML!");
    }
}

function triggerProgressiveHint() {
    guessCount++;
    const mode = IS_ENDLESS ? "Endless" : "Daily";
    
    switch(guessCount) {
        case 1: 
            updateHintText(`Hint: ${SECRET_EVENT.clue}`); 
            break;
        case 2: 
            if (SECRET_EVENT.isPerson) {
                guessCount++; // Skip to case 3
                updateHintText(`Hint: This figure was active in the ${Math.floor(SECRET_EVENT.year/100) * 100}s within the ${SECRET_EVENT.category} era.`);
            } else {
                updateHintText(`Hint: The key figure involved is ${SECRET_EVENT.keyFigure}.`);
            }
            break;
        case 3: 
            updateHintText(`Hint: This took place in the ${Math.floor(SECRET_EVENT.year/100) * 100}s within the ${SECRET_EVENT.category} era.`); 
            break;
        default: 
            updateHintText(`No more hints available!`); 
            break;
    }
}

function setDailyEvent() {
    IS_ENDLESS = false;
    guessCount = 0;
    const today = new Date();
    const seed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
    SECRET_EVENT = HISTORICAL_EVENTS[seed % HISTORICAL_EVENTS.length];
    
    // Explicitly set the initial text
    updateHintText("Daily Challenge: Guess the historical event!");
}

function setEndlessEvent() {
    IS_ENDLESS = true;
    guessCount = 0;
    SECRET_EVENT = HISTORICAL_EVENTS[Math.floor(Math.random() * HISTORICAL_EVENTS.length)];
    updateHintText("Endless Mode: Guess the historical event!");
}

// ... (Rest of your Event Listeners and Functions remain the same) ...
