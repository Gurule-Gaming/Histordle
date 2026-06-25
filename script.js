// 1. Expanded History Event Pool
const HISTORICAL_EVENTS = [
    { id: 1, title: "FALL OF ROME", year: 476, category: "Ancient", keyFigure: "Romulus Augustulus", clue: "The collapse of this major empire in 476 A.D. marked the end of ancient dominance." },
    { id: 2, title: "MAGNA CARTA", year: 1215, category: "Medieval", keyFigure: "King John", clue: "A foundational document signed in 1215 that limited royal power." },
    { id: 3, title: "FRENCH REVOLUTION", year: 1789, category: "Modern", keyFigure: "Louis XVI", clue: "A massive political upheaval beginning in 1789 that ended the absolute monarchy." },
    { id: 4, title: "MOON LANDING", year: 1969, category: "Modern", keyFigure: "Neil Armstrong", clue: "The historic 1969 mission that put the first human on another celestial body." },
    { id: 5, title: "PRINTING PRESS INVENTED", year: 1440, category: "Medieval", keyFigure: "Johannes Gutenberg", clue: "The 1440 innovation that revolutionized how knowledge was spread across the globe." },
    { id: 6, title: "BATTLE OF WATERLOO", year: 1815, category: "Modern", keyFigure: "Napoleon Bonaparte", clue: "The decisive 1815 battle that brought an end to an era of European conquest." },
    { id: 7, title: "SIGNING OF THE DECLARATION OF INDEPENDENCE", year: 1776, category: "Modern", keyFigure: "Thomas Jefferson", clue: "The 1776 act that solidified the formation of a new sovereign nation." }
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

function triggerProgressiveHint() {
    guessCount++;
    const mode = IS_ENDLESS ? "Endless" : "Daily";
    switch(guessCount) {
        case 1: updateHintText(`${mode} Hint: Key historical figure: ${SECRET_EVENT.keyFigure}.`); break;
        case 2: updateHintText(`${mode} Hint: This event took place during the ${Math.floor(SECRET_EVENT.year/100) * 100}s.`); break;
        case 3: updateHintText(`${mode} Hint: Full context: ${SECRET_EVENT.clue}`); break;
        default: break;
    }
}

function setDailyEvent() {
    IS_ENDLESS = false;
    guessCount = 0;
    const today = new Date();
    const seed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
    SECRET_EVENT = HISTORICAL_EVENTS[seed % HISTORICAL_EVENTS.length];
    updateHintText(`Daily History Challenge: Guess the event! (Category: ${SECRET_EVENT.category})`);
}

function setEndlessEvent() {
    IS_ENDLESS = true;
    guessCount = 0;
    feed.innerHTML = "";
    SECRET_EVENT = HISTORICAL_EVENTS[Math.floor(Math.random() * HISTORICAL_EVENTS.length)];
    updateHintText(`Endless Mode: Guess the historical event! (Category: ${SECRET_EVENT.category})`);
}

// Endless Button Listener
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

// Search Logic
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
    block.className = "info-block " + (isCorrect ? "correct" : "absent");
    block.innerText = text;
    return block;
}

initGame();
