const letters = ['A','B','C','D','E','F','G','H'];
let cards = [...letters, ...letters]; // Duplicate for pairs
cards.sort(() => 0.5 - Math.random()); // Shuffle

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function createCard(letter) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">${letter}</div>
    </div>
  `;

  card.addEventListener('click', () => {
    if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

    card.classList.add('flip');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  });

  return card;
}

function checkMatch() {
  const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    resetTurn();

    if (matchedPairs === 8) {
      setTimeout(() => {
        alert('🎉 You won the game!');
      }, 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  cards.forEach(letter => {
    const card = createCard(letter);
    gameBoard.appendChild(card);
  });
}

startGame();
