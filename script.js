const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = 0;
let moveCount = 0;  // Contatore delle mosse

// Funzione per mescolare le carte
function shuffleCards() {
    const cardArray = Array.from(cards); // Converte il NodeList in array
    const shuffledArray = shuffle(cardArray); // Mescola l'array
    shuffledArray.forEach(card => {
        document.querySelector('.memory-game').appendChild(card); // Riordina le carte nel DOM
    });
}

// Algoritmo di Fisher-Yates Shuffle
function shuffle(array) {
    let currentIndex = array.length, randomIndex, temporaryValue;

    // Finché ci sono elementi da mescolare
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Scambia gli elementi
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Funzione per aggiornare il contatore delle mosse e la barra di progresso
function updateMoveCounter() {
    const moveCounterElement = document.getElementById('move-counter');
    moveCounterElement.textContent = moveCount;  // Mostra il numero di mosse
    
    // Aggiorna la barra di progresso
    const progressBar = document.getElementById('move-progress');
    progressBar.value = moveCount;  // Aggiorna il valore della barra

    // Se il numero di mosse è maggiore di 50, il gioco termina
    if (moveCount > 50) {
        setTimeout(() => {
            alert("Hai perso. Riprova!");  // Mostra il messaggio di fine gioco
            restartGame();  // Riavvia il gioco
        }, 500);
    }
}

// Funzione per verificare se le carte selezionate corrispondono
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cards.length) {
            setTimeout(() => alert('Hai vinto!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Funzione per assegnare i valori alle carte e aggiungere le immagini
function assignCardValues() {
    const cardValues = [
        "A", "A", "B", "B", "C", "C", "D", "D", "E", "E",
        "F", "F", "G", "G", "H", "H", "I", "I", "J", "J"
    ];

    const cardArray = Array.from(cards);
    cardArray.forEach((card, index) => {
        // Assegna un valore al dataset della carta
        card.dataset.card = cardValues[index];
        // Assegna l'immagine al lato frontale della carta in base al suo valore
        const frontFace = card.querySelector('.card-front');
        frontFace.style.backgroundImage = `url('images/${cardValues[index].toLowerCase()}.png')`; // Imposta l'immagine frontale
    });
}

// Aggiungi eventi clic alle carte
cards.forEach(card => {
    card.addEventListener('click', () => {
        // Se la carta non è già girata e ne abbiamo meno di due girate
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped'); // La carta viene girata
            flippedCards.push(card);
            moveCount++;  // Incrementa il contatore delle mosse
            updateMoveCounter();  // Aggiorna il contatore delle mosse e la barra di progresso
            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    });
});

// Funzione per riavviare il gioco
function restartGame() {
    moveCount = 0;  // Reset delle mosse
    matchedCards = 0;  // Reset delle carte abbinate
    flippedCards = [];  // Resetta le carte girate

    // Rimuove la classe 'flipped' da tutte le carte per girarle sul retro
    cards.forEach(card => {
        card.classList.remove('flipped');
    });

    updateMoveCounter();  // Reset del contatore delle mosse e della barra di progresso
    shuffleCards();  // Mescola di nuovo le carte
    assignCardValues();  // Riassegna i valori alle carte
}

// Inizializza il gioco
assignCardValues();
shuffleCards();
