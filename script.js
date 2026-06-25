// 1. Expanded History Event Pool
const HISTORICAL_EVENTS = [
    { id: 1, title: "FALL OF ROME", year: 476, category: "Ancient", keyFigure: "Romulus Augustulus", clue: "The fall of this major empire in 476 A.D. marked the official end of ancient dominance in the West." },
    { id: 2, title: "MAGNA CARTA", year: 1215, category: "Medieval", keyFigure: "King John", clue: "This foundational legal document was signed in 1215 to curb the unchecked power of the monarchy." },
    { id: 3, title: "FRENCH REVOLUTION", year: 1789, category: "Modern", keyFigure: "Louis XVI", clue: "This massive social and political upheaval ignited in 1789, eventually toppling the absolute monarchy." },
    { id: 4, title: "MOON LANDING", year: 1969, category: "Modern", keyFigure: "Neil Armstrong", clue: "In 1969, humanity achieved a historic milestone by placing the first human beings on another celestial body." },
    { id: 5, title: "PRINTING PRESS INVENTED", year: 1440, category: "Medieval", keyFigure: "Johannes Gutenberg", clue: "Developed around 1440, this technological breakthrough fundamentally changed how information was recorded and shared." },
    { id: 6, title: "BATTLE OF WATERLOO", year: 1815, category: "Modern", keyFigure: "Napoleon Bonaparte", clue: "This decisive confrontation in 1815 effectively concluded a long-standing era of European imperial conquest." },
    { id: 7, title: "DECLARATION OF INDEPENDENCE", year: 1776, category: "Modern", keyFigure: "Thomas Jefferson", clue: "The 1776 ratification of this document signaled the birth of a new sovereign nation breaking away from colonial rule." }
];

let SECRET_EVENT = null;
let IS_ENDLESS = false;
let guessCount = 0;

const searchInput = document.getElementById("movie-search");
const dropdown = document.getElementById("dropdown-results");
const feed = document.getElementById("guesses-feed");
const endlessBtn = document.getElementById("endless-btn");

function initGame() {
    setDailyEvent();
}

function updateHintText(text) {
    const hintElement = document.getElementById("hint-text");
    if (hintElement) hintElement.innerText = text;
}

// Overhauled Clue System
function triggerProgressiveHint() {
    guessCount++;
    const mode = IS_ENDLESS ? "Endless" : "Daily";
    
    switch(guessCount) {
        case 1: updateHintText(`Hint: The primary historical figure associated with this event is ${SECRET_EVENT.keyFigure}.`); break;
        case 2: updateHintText(`Hint: This event took place during the ${Math.floor(SECRET_EVENT.year/100) * 100}s, within the ${SECRET_EVENT.category} era.`); break;
        case 3: updateHintText(`Final Hint: ${SECRET_EVENT.clue}`); break;
        default: break;
    }
}

function setDailyEvent() {
    IS_ENDLESS = false;
    guessCount = 0;
    feed.innerHTML = ""; // Clear board
    const today = new Date();
    const seed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
    SECRET_EVENT = HISTORICAL_EVENTS[seed % HISTORICAL_EVENTS.length];
    updateHintText(`Daily History Challenge: Can you identify this event?`);
}

function setEndlessEvent() {
    IS_ENDLESS = true;
    guessCount = 0;
    feed.innerHTML = ""; // Clear board
    SECRET_EVENT = HISTORICAL_EVENTS[Math.floor(Math.random() * HISTORICAL_EVENTS.length)];
    updateHintText(`Endless Mode: Identify the historical event!`);
}

// Fixed Endless Button Logic
if (endlessBtn) {
    endlessBtn.addEventListener("click", () => {
        if (!IS_ENDLESS) {
            setEndlessEvent();
            endlessBtn.innerText = "Back to Daily Mode 📅";
        } else {
            setDailyEvent();
            endlessBtn.innerText = "Endless Mode 🎲";
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        dropdown.innerHTML = "";
        if (query.length < 2) return;

        HISTORICAL_EVENTS.forEach(event => {
            if (event.title.toLowerCase().includes(query)) {
                let item = document.createElement("div");
                item.className = "dropdown-item";
                item.innerText = event.title;
                item.onclick = () => submitGuess(event);
                dropdown.appendChild(item);
            }
        });
    });
}

function submitGuess(guessedEvent) {
    searchInput.value = "";
    dropdown.innerHTML = "";
    let row = document.createElement("div");
    row.className = "guess-row";

    row.appendChild(createInfoBlock(guessedEvent.title, guessedEvent.title === SECRET_EVENT.title));
    
    let yearDisplay = guessedEvent.year + (guessedEvent.year < SECRET_EVENT.year ? " ⬆️" : guessedEvent.year > SECRET_EVENT.year ? " ⬇️" : "");
    row.appendChild(createInfoBlock(yearDisplay, guessedEvent.year === SECRET_EVENT.year));
    
    row.appendChild(createInfoBlock(guessedEvent.category, guessedEvent.category === SECRET_EVENT.category));
    row.appendChild(createInfoBlock(guessedEvent.keyFigure, guessedEvent.keyFigure === SECRET_EVENT.keyFigure));

    feed.insertBefore(row, feed.firstChild);

    if (guessedEvent.title === SECRET_EVENT.title) {
        alert("Correct! You have mastered history!");
    } else {
        triggerProgressiveHint();
    }
}

function createInfoBlock(text, isCorrect) {
    let block = document.createElement("div");
    block.className = "info-block " + (isCorrect === true ? "correct" : "absent");
    block.innerText = text;
    return block;
}

initGame();
