// 1. Setup Historical Data Pool
const HISTORICAL_EVENTS = [
    { id: 1, title: "FALL OF ROME", year: 476, category: "Ancient", keyFigure: "Romulus Augustulus" },
    { id: 2, title: "MAGNA CARTA", year: 1215, category: "Medieval", keyFigure: "King John" },
    { id: 3, title: "FRENCH REVOLUTION", year: 1789, category: "Modern", keyFigure: "Louis XVI" },
    { id: 4, title: "MOON LANDING", year: 1969, category: "Modern", keyFigure: "Neil Armstrong" },
    { id: 5, title: "PRINTING PRESS INVENTED", year: 1440, category: "Medieval", keyFigure: "Johannes Gutenberg" }
];

let SECRET_EVENT = null;
let guessCount = 0;

const searchInput = document.getElementById("movie-search");
const dropdown = document.getElementById("dropdown-results");
const feed = document.getElementById("guesses-feed");

// 2. Initialize Game
function initGame() {
    setDailyEvent();
}

function updateHintText(text) {
    const hintElement = document.getElementById("hint-text");
    if (hintElement) hintElement.innerText = text;
}

function setDailyEvent() {
    guessCount = 0;
    // Pick based on date seed
    const today = new Date();
    const seed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
    SECRET_EVENT = HISTORICAL_EVENTS[seed % HISTORICAL_EVENTS.length];
    
    updateHintText(`Clue: Guess the historical event! (Category: ${SECRET_EVENT.category})`);
}

function triggerProgressiveHint() {
    guessCount++;
    switch(guessCount) {
        case 1: updateHintText(`Hint: Key Figure involved: ${SECRET_EVENT.keyFigure}.`); break;
        case 2: updateHintText(`Hint: Occurred in the ${Math.floor(SECRET_EVENT.year/100) * 100}s.`); break;
        default: break;
    }
}

// 4. Handle Input (Search through static array)
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

// 5. Submit Guess Logic
function submitGuess(guessedEvent) {
    searchInput.value = "";
    dropdown.innerHTML = "";

    let row = document.createElement("div");
    row.className = "guess-row";

    // Comparison Logic
    row.appendChild(createInfoBlock(guessedEvent.title, guessedEvent.title === SECRET_EVENT.title));
    
    let yearDisplay = guessedEvent.year + (guessedEvent.year < SECRET_EVENT.year ? " ⬆️" : guessedEvent.year > SECRET_EVENT.year ? " ⬇️" : "");
    row.appendChild(createInfoBlock(yearDisplay, guessedEvent.year === SECRET_EVENT.year));
    
    row.appendChild(createInfoBlock(guessedEvent.category, guessedEvent.category === SECRET_EVENT.category));
    row.appendChild(createInfoBlock(guessedEvent.keyFigure, guessedEvent.keyFigure === SECRET_EVENT.keyFigure));

    feed.insertBefore(row, feed.firstChild);

    if (guessedEvent.title === SECRET_EVENT.title) {
        alert("Victory! You uncovered the history!");
    } else {
        triggerProgressiveHint();
    }
}

function createInfoBlock(text, isCorrect) {
    let block = document.createElement("div");
    block.className = "info-block " + (isCorrect ? "correct" : "absent");
    block.innerText = text;
    return block;
}

initGame();
