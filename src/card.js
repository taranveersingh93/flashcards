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

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  countCards
}