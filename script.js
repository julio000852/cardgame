// JOGO DA MEMORIA

const cards = [
    '🕷️', '🕷️',
    '🕸️', '🕸️',
    '🦟', '🦟',
    '🦗', '🦗',
    '🦋', '🦋',
    '🐝', '🐝',
    '🐞', '🐞',
    '🐜', '🐜'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const board = document.getElementById('game-board');
    shuffle(cards);
    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
        resetBoard();
    } else {
        unflipCard();
    }
}

function unflipCard() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.addEventListener("DOMContentLoaded", createBoard)


// JOGO PACIÊNCIA

// const suits = ['♠', '♠', '♠', '♠'];
// const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
// let deck = [];
// let columns = [[], [], [], [], [], [], [], [], [], []];

// function creatDeck() {
//     deck = [];
//     suits.forEach(suits => {
//         rank.forEach(rank => {
//             deck.push({suits, rank, isHidden: true});
//         });
//     });
// }

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// function dealCard() {
//     for (let i = 0; i < 10; i++) {
//         for (let j = 0; j < 5; j++) {
//             const card = deck.pop();
//             columns[i].push(card);
//         }
//     }
//     for (let i = 0; i < 4; i++) {
//         if (deck === 0) return;
//         const card = deck.pop();
//         columns[i].push(card);
//     }

//     columns.forEach(col => {
//         if (col.length > 0) {
//             const lastCard = col[col.length - 1];
//             if (lastCard) lastCard.isHidden = false;
//         }
//     })
// }


// function createBoard2() {
//     const board = document.getElementById('game2-board');
//     board.innerHTML = '';
//     columns.forEach((columns, colIndex) => {
//         const columnElement = document.createElement('div');
//         columnElement.classList.add('column');
//         columns.forEach(card => {
//             const cardElement = document.createElement('div');
//             cardElement.classList.add('card');
//             cardElement.classList.toggle('hidden', card.isHidden);
//             cardElement.textContent = card.isHidden ? '' : `${card.rank}${card.suits}`;
//             cardElement.addEventListener('click', () => selectCard(colIdex, card));
//             columnElement.appendChild(cardElement);
//         });
//         board.appendChild(columnElement);
//     });
// }

// let selectedCard = null;
// let selectedColumn = null;

// function selectCard(colIndex, card) {
//     if (card.isHidden) return;

//     if (selectedCard) {
//         if (isValidMove(selectedCard, card)) {
//             moveCard(selectedColumn, colIndex, selectedCard);
//             selectedCard = null;
//             selectedColumn = null;
//             createBoard2();
//             checkForWin();
//         } else {
//             alert('movimento inválido');
//             selectedCard = null;
//             selectedColumn = null;
//         }
//     } else {
//         selectedCard = card;
//         selectedColumn = colIndex;
//     }
// }

// function isValidMove(card1, card2) {
//     const rankIndex1 = rank.indexOf(card1.rank);
//     const rankIndex2 = rank.indexOf(card2.rank);
//     return rankIndex1 === rankIndex2 + 1;
// }

// function moveCard(fromCol, toCol, card) {
//     const fromColumn = columns[fromCol];
//     const toColumn = columns[toCol];
//     const cardIndex = fromColumn.indexOf(card);

//     const movingCards = fromColumn.slice(cardIndex);

//     toColumn.push(...movingCards);

//     if (fromColumn.length > 0 && fromColumn[fromColumn.length - 1].isHidden) {
//         fromColumn[fromColumn.length -1].isHidden = false;
//     }
// }

// function checkForWin(){
//     if (columns.every(columns => columns.length === 0)) {
//         alert('Você Venceu!!');
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     creatDeck();
//     shuffle(deck);
//     dealCard();
//     createBoard2();
// });

