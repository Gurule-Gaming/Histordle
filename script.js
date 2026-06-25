// 1. Data Library
const HISTORICAL_EVENTS = [
    { id: 1, title: "FALL OF ROME", year: 476, category: "Ancient", keyFigure: "Romulus Augustulus", isPerson: false, clue: "The fall of this major empire in 476 A.D. marked the official end of ancient dominance in the West." },
    { id: 2, title: "JOSEPH STALIN", year: 1953, category: "Modern", keyFigure: "Joseph Stalin", isPerson: true, clue: "This leader served as the General Secretary of the Communist Party and ruler of the Soviet Union." },
    { id: 3, title: "BATTLE OF WATERLOO", year: 1815, category: "Modern", keyFigure: "Napoleon Bonaparte", isPerson: false, clue: "The decisive 1815 battle that brought an end to an era of European conquest." }
];

let SECRET_EVENT = null;
let IS_ENDLESS = false;
let guessCount = 0;

const searchInput = document.getElementById("movie-search");
const dropdown = document.getElementById("dropdown-results");
const feed = document.getElementById("guesses-feed");
const endlessBtn = document.getElementById("endless-btn");

// 2. Initialize
document.addEventListener("DOMContentLoaded", () => {
    setDailyEvent();
});

function updateHintText(text) {
    const hintElement = document.getElementById("hint-text");
    if (hintElement) hintElement.innerText = text;
}

function triggerProgressiveHint() {
    guessCount++;
    const mode = IS_ENDLESS ? "Endless" : "Daily";
    
    switch(guessCount) {
        case 1: 
            updateHintText(`${mode} Hint: ${SECRET_EVENT.clue}`); 
            break;
        case 2: 
            if (SECRET_EVENT.isPerson) {
                guessCount++; 
                updateHintText(`${mode} Hint: This figure was active in the ${Math.floor(SECRET_EVENT.year/100) * 100}s within the ${SECRET_EVENT.category} era.`);
            } else {
                updateHintText(`${mode} Hint: The key figure involved is ${SECRET_EVENT.keyFigure}.`);
            }
            break;
        case 3: 
            updateHintText(`${mode} Hint: This took place in the ${Math.floor(SECRET_EVENT.year/100) * 100}s within the ${SECRET_EVENT.category} era.`); 
            break;
        default: 
            updateHintText(`${mode} Hint: No more hints available!`); 
            break;
    }
}

function setDailyEvent() {
    IS_ENDLESS = false;
    guessCount = 0;
    if (feed) feed.innerHTML = "";
    const today = new Date();
    const seed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
    SECRET_EVENT = HISTORICAL_EVENTS[seed % HISTORICAL_EVENTS.length];
    updateHintText("Daily Challenge: Guess the historical event!");
}

function setEndlessEvent() {
    IS_ENDLESS = true;
    guessCount = 0;
    if (feed) feed.innerHTML = "";
    SECRET_EVENT = HISTORICAL_EVENTS[Math.floor(Math.random() * HISTORICAL_EVENTS.length)];
    updateHintText("Endless Mode: Guess the historical event!");
}

// 3. Listeners
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
                item.style.cursor = "pointer";
                item.onclick = () => submitGuess(event);
                dropdown.appendChild(item);
            }
        });
    });
}

// 4. Game Loop
function submitGuess(guessedEvent) {
    searchInput.value = "";
    dropdown.innerHTML = "";
    let row = document.createElement("div");
    row.className = "guess-row";
    row.style.display = "flex";

    row.appendChild(createInfoBlock(guessedEvent.title, guessedEvent.title === SECRET_EVENT.title));
    let yearDisplay = guessedEvent.year + (guessedEvent.year < SECRET_EVENT.year ? " ⬆️" : guessedEvent.year > SECRET_EVENT.year ? " ⬇️" : "");
    row.appendChild(createInfoBlock(yearDisplay, guessedEvent.year === SECRET_EVENT.year));
    row.appendChild(createInfoBlock(guessedEvent.category, guessedEvent.category === SECRET_EVENT.category));
    row.appendChild(createInfoBlock(guessedEvent.keyFigure, guessedEvent.keyFigure === SECRET_EVENT.keyFigure));

    feed.insertBefore(row, feed.firstChild);

    if (guessedEvent.title === SECRET_EVENT.title) {
        alert("Correct! You mastered history.");
    } else {
        triggerProgressiveHint();
    }
}

function createInfoBlock(text, isCorrect) {
    let block = document.createElement("div");
    block.className = "info-block " + (isCorrect === true ? "correct" : "absent");
    block.style.padding = "10px";
    block.style.border = "1px solid #ccc";
    block.innerText = text;
    return block;
}
