// 1. Updated Data Structure
const HISTORICAL_EVENTS = [
    { 
        id: 1, title: "FALL OF ROME", year: 476, category: "Ancient", keyFigure: "Romulus Augustulus", 
        isPersonQuestion: false, 
        clue1: "The fall of this major empire in 476 A.D. marked the official end of ancient dominance in the West." 
    },
    { 
        id: 2, title: "JOSEPH STALIN", year: 1953, category: "Modern", keyFigure: "Joseph Stalin", 
        isPersonQuestion: true, 
        clue1: "This leader served as the General Secretary of the Communist Party and ruler of the Soviet Union." 
    },
    { 
        id: 3, title: "BATTLE OF WATERLOO", year: 1815, category: "Modern", keyFigure: "Napoleon Bonaparte", 
        isPersonQuestion: false, 
        clue1: "The decisive 1815 battle that brought an end to an era of European conquest." 
    }
];

// ... [Keep your existing variable declarations here] ...

function triggerProgressiveHint() {
    guessCount++;
    const mode = IS_ENDLESS ? "Endless" : "Daily";
    
    // Logic: First reveal specific clue, then the key figure, then the date/era
    switch(guessCount) {
        case 1: 
            updateHintText(`${mode} Hint: ${SECRET_EVENT.clue1}`); 
            break;
        case 2: 
            updateHintText(`${mode} Hint: The key figure involved is ${SECRET_EVENT.keyFigure}.`); 
            break;
        case 3: 
            updateHintText(`${mode} Hint: This event took place in the ${Math.floor(SECRET_EVENT.year/100) * 100}s within the ${SECRET_EVENT.category} era.`); 
            break;
        default: 
            updateHintText(`${mode} Hint: No more hints available!`); 
            break;
    }
}

// ... [Keep your existing initGame, setDailyEvent, and setEndlessEvent functions] ...

function submitGuess(guessedEvent) {
    searchInput.value = "";
    dropdown.innerHTML = "";
    let row = document.createElement("div");
    row.className = "guess-row";

    // Build the board row
    row.appendChild(createInfoBlock(guessedEvent.title, guessedEvent.title === SECRET_EVENT.title));
    
    // Year comparison
    let yearDisplay = guessedEvent.year + (guessedEvent.year < SECRET_EVENT.year ? " ⬆️" : guessedEvent.year > SECRET_EVENT.year ? " ⬇️" : "");
    row.appendChild(createInfoBlock(yearDisplay, guessedEvent.year === SECRET_EVENT.year));
    
    // Category/KeyFigure blocks
    row.appendChild(createInfoBlock(guessedEvent.category, guessedEvent.category === SECRET_EVENT.category));
    row.appendChild(createInfoBlock(guessedEvent.keyFigure, guessedEvent.keyFigure === SECRET_EVENT.keyFigure));

    feed.insertBefore(row, feed.firstChild);

    if (guessedEvent.title === SECRET_EVENT.title) {
        alert("Correct! You have mastered history!");
    } else {
        triggerProgressiveHint();
    }
}
