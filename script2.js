document.addEventListener("DOMContentLoaded", function () {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    let deck = creatDeck();
    shuffleDeck(deck);

    let tableau = [];
    for (let i = 1; i <= 7; i++) {
        tableau.push(deck.splice(0, i));
    }

    let stock = deck;
    let waste = [];

    function creatDeck() {
        let deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({suit, value});
            }
        }
        return deck;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function displayTableau() {
        for (let i = 0; i < 7; i++) {
            let pile = document.getElementById(`tableau${i + 1}`);
            pile.innerHTML = '';
            tableau[i].forEach((card, index) => {
                let cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.innerText = `${card.value} ${card.suit}`;
                cardElement.style.top = `${index * 30}px`;
                pile.appendChild(cardElement);
            })
        }
    }

    function displayStock() {
        let stockElement = document.getElementById('stock');
        stockElement.innerHTML = stock.length > 0 ? 'stock' : '';
    }

    function displayWaste () {
        let wasteElement = document.getElementById('waste');
        wasteElement.innerHTML = waste.length > 0 ? `${waste[waste.length - 1].value} ${waste[waste.length - 1].suit}` : '';
    }

    document.getElementById('stock').addEventListener('click', function () {
       if (stock.length > 0) {
           waste.push(stock.pop());
           displayTableau();
           displayStock();
           displayWaste();
       }
    });
});

