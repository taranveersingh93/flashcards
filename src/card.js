const createCard = (id, question, answers, correctAnswer) => (
  {
    id: id,
    question: question,
    answers: answers,
    correctAnswer: correctAnswer
  }
)

const evaluateGuess = (guess, correctAnswer) => {
  if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
    return 'correct!'
  } else {
    return 'incorrect!';
  }; 
}

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
  endRound(proxyRound);
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
  proxyRound = checkForEnd(proxyRound);
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

const checkForEnd = round => {
  let proxyRound = {...round};
  if (proxyRound.turns === countCards(proxyRound.deck)) {
    proxyRound.isComplete = true;
  }
  return proxyRound
}

const endRound = round => {
  if (round.isComplete) {
    console.log(`**Round over!** You answered ${round.percentCorrect}% of the questions correctly!`);
  }
}

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  countCards,
  createRound,
  takeTurn,
  calculatePercentCorrect
}