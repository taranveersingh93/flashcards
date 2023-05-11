const { 
  evaluateGuess
} = require('../src/card');

const createDeck = cards => cards;

const countCards = deck => deck.length;

const createRound = deck => {
  return {
    deck: deck,
    turns: 0,
    currentCard: deck[0],
    incorrectGuesses: [],
    feedback: '',
    percentCorrect: 0,
  }
}

const takeTurn = (guess, round) => {
  let proxyRound = {...round};
  proxyRound.feedback = evaluateGuess(guess, proxyRound.currentCard.correctAnswer);
  proxyRound = changeRoundData(proxyRound);
  if (checkForEnd(round)) {
    endRound(proxyRound);
  }
  return proxyRound;
};

const changeRoundData = round => {
  let proxyRound = {...round};
  if (proxyRound.feedback === "incorrect!") {
    proxyRound.incorrectGuesses = [...proxyRound.incorrectGuesses, proxyRound.currentCard.id];
  }
  proxyRound.turns++;
  proxyRound.currentCard = proxyRound.deck[proxyRound.turns];
  proxyRound = calculatePercentCorrect(proxyRound);
  return proxyRound;
}

const calculatePercentCorrect = round => {
  let proxyRound = {...round};
  const turns = proxyRound.turns;
  const incorrectAnswers = proxyRound.incorrectGuesses.length;
  const correctAnswers = turns - incorrectAnswers;
  proxyRound.percentCorrect = Math.floor((correctAnswers/turns)*100)
  return proxyRound;
};

const checkForEnd = round => round.turns === countCards(round.deck);

const endRound = round => {
    console.log(`**Round over!** You answered ${round.percentCorrect}% of the questions correctly!`);
}

module.exports = {
  createDeck,
  countCards,
  createRound,
  takeTurn,
  calculatePercentCorrect,
  checkForEnd
}