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
    isComplete: false
  }
}

const takeTurn = (guess, round) => {
  let proxyRound = {...round};
  proxyRound.feedback = evaluateGuess(guess, proxyRound.currentCard.correctAnswer);
  proxyRound = changeRoundData(proxyRound);

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
  proxyRound.percentCorrect = (correctAnswers/turns)*100
  return proxyRound;
};

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  countCards,
  createRound,
  takeTurn,
  calculatePercentCorrect
}