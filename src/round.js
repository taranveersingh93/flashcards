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
  round.feedback = evaluateGuess(guess, round.currentCard.correctAnswer);
  changeRoundData(round);
  // if (checkForEnd(round)) {
  //   endRound(proxyRound);
  // }
  return round.feedback;
};

const changeRoundData = round => {
  if (round.feedback === "incorrect!") {
    round.incorrectGuesses = [...round.incorrectGuesses, round.currentCard.id];
  }
  round.turns++;
  round.currentCard = round.deck[round.turns];
  round.percentCorrect = calculatePercentCorrect(round);
}

const calculatePercentCorrect = round => {
  const turns = round.turns;
  const incorrectAnswers = round.incorrectGuesses.length;
  const correctAnswers = turns - incorrectAnswers;
  return Math.floor((correctAnswers/turns)*100)
};

const endRound = round => {
    console.log(`**Round over!** You answered ${round.percentCorrect}% of the questions correctly!`);
}

module.exports = {
  createDeck,
  countCards,
  createRound,
  takeTurn,
  calculatePercentCorrect,
  endRound
}